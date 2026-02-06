/* ============================================
   Cloud Sync Layer (Firebase Firestore)
   Background sync for cross-device inspection data
   ============================================ */

var CloudSync = (function() {
  var db = null;
  var initialized = false;
  var unsubscribe = null;
  var COLLECTION = 'inspections';
  var deviceId = null;

  function getDeviceId() {
    if (deviceId) return deviceId;
    deviceId = localStorage.getItem('ccr_device_id');
    if (!deviceId) {
      deviceId = 'dev_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
      localStorage.setItem('ccr_device_id', deviceId);
    }
    return deviceId;
  }

  function init() {
    try {
      if (typeof firebase === 'undefined' || typeof FIREBASE_CONFIG === 'undefined') {
        console.warn('CloudSync: Firebase SDK or config not available');
        return;
      }

      if (!firebase.apps.length) {
        firebase.initializeApp(FIREBASE_CONFIG);
      }

      db = firebase.firestore();
      initialized = true;
      startListening();
      console.log('CloudSync: initialized');
    } catch (e) {
      console.error('CloudSync: init failed', e);
    }
  }

  function pushInspection(data) {
    if (!initialized || !db) return;
    if (!data || !data.inspectionId) return;

    try {
      var doc = JSON.parse(JSON.stringify(data));
      doc.deviceId = getDeviceId();
      doc.syncedAt = new Date().toISOString();

      db.collection(COLLECTION).doc(data.inspectionId).set(doc, { merge: true })
        .catch(function(e) {
          console.warn('CloudSync: push failed', e.message);
        });
    } catch (e) {
      console.warn('CloudSync: push error', e);
    }
  }

  function deleteInspection(inspectionId) {
    if (!initialized || !db) return;
    if (!inspectionId) return;

    db.collection(COLLECTION).doc(inspectionId).delete()
      .catch(function(e) {
        console.warn('CloudSync: delete failed', e.message);
      });
  }

  function startListening() {
    if (!initialized || !db) return;
    if (unsubscribe) unsubscribe();

    unsubscribe = db.collection(COLLECTION)
      .orderBy('lastModified', 'desc')
      .onSnapshot(function(snapshot) {
        var cloudInspections = [];
        snapshot.forEach(function(doc) {
          cloudInspections.push(doc.data());
        });
        mergeFromCloud(cloudInspections);
      }, function(err) {
        console.warn('CloudSync: listener error', err.message);
      });
  }

  function mergeFromCloud(cloudInspections) {
    if (!cloudInspections || cloudInspections.length === 0) return;

    try {
      var localHistoryRaw = localStorage.getItem('ccr_inspection_history');
      var localHistory = localHistoryRaw ? JSON.parse(localHistoryRaw) : [];
      var localMap = {};
      var changed = false;

      for (var i = 0; i < localHistory.length; i++) {
        if (localHistory[i].inspectionId) {
          localMap[localHistory[i].inspectionId] = i;
        }
      }

      for (var j = 0; j < cloudInspections.length; j++) {
        var cloud = cloudInspections[j];
        if (!cloud.inspectionId) continue;
        if (cloud.status === 'in_progress') continue;

        var localIdx = localMap[cloud.inspectionId];

        if (localIdx === undefined) {
          localHistory.push(cloud);
          changed = true;
        } else {
          var local = localHistory[localIdx];
          var cloudTime = cloud.lastModified || cloud.syncedAt || '';
          var localTime = local.lastModified || '';
          if (cloudTime > localTime) {
            localHistory[localIdx] = cloud;
            changed = true;
          }
        }
      }

      var cloudIds = {};
      for (var k = 0; k < cloudInspections.length; k++) {
        if (cloudInspections[k].inspectionId) {
          cloudIds[cloudInspections[k].inspectionId] = true;
        }
      }
      var filtered = [];
      for (var m = 0; m < localHistory.length; m++) {
        var item = localHistory[m];
        if (!item.syncedAt && !cloudIds[item.inspectionId]) {
          filtered.push(item);
        } else if (cloudIds[item.inspectionId]) {
          filtered.push(item);
        }
      }
      if (filtered.length !== localHistory.length) {
        localHistory = filtered;
        changed = true;
      }

      if (changed) {
        localHistory.sort(function(a, b) {
          var aTime = a.completedAt || a.lastModified || '';
          var bTime = b.completedAt || b.lastModified || '';
          return bTime.localeCompare(aTime);
        });

        if (localHistory.length > 50) {
          localHistory = localHistory.slice(0, 50);
        }

        localStorage.setItem('ccr_inspection_history', JSON.stringify(localHistory));
        document.dispatchEvent(new CustomEvent('cloud-sync-updated'));
      }
    } catch (e) {
      console.warn('CloudSync: merge error', e);
    }
  }

  function isOnline() {
    return initialized && db !== null;
  }

  return {
    init: init,
    pushInspection: pushInspection,
    deleteInspection: deleteInspection,
    isOnline: isOnline
  };
})();
