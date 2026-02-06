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
      pushLocalHistory();
      startListening();
      console.log('CloudSync: initialized');
    } catch (e) {
      console.error('CloudSync: init failed', e);
    }
  }

  function pushLocalHistory() {
    try {
      var historyRaw = localStorage.getItem('ccr_inspection_history');
      var history = historyRaw ? JSON.parse(historyRaw) : [];
      var count = 0;
      for (var i = 0; i < history.length; i++) {
        var item = history[i];
        if (item.inspectionId && item.status === 'completed' && !item.syncedAt) {
          pushInspection(item);
          count++;
        }
      }
      if (count > 0) {
        console.log('CloudSync: uploading', count, 'existing archived inspections');
      }
    } catch (e) {
      console.warn('CloudSync: pushLocalHistory error', e);
    }
  }

  function pushInspection(data) {
    if (!initialized || !db) return;
    if (!data || !data.inspectionId) return;

    try {
      var doc = JSON.parse(JSON.stringify(data));
      doc.deviceId = getDeviceId();
      doc.syncedAt = new Date().toISOString();

      db.collection(COLLECTION).doc(data.inspectionId).set(doc)
        .then(function() {
          console.log('CloudSync: pushed', data.inspectionId);
        })
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
      .then(function() {
        console.log('CloudSync: deleted', inspectionId);
      })
      .catch(function(e) {
        console.warn('CloudSync: delete failed', e.message);
      });
  }

  function startListening() {
    if (!initialized || !db) return;
    if (unsubscribe) unsubscribe();

    unsubscribe = db.collection(COLLECTION)
      .onSnapshot(function(snapshot) {
        console.log('CloudSync: snapshot received,', snapshot.size, 'docs');
        var cloudInspections = [];
        snapshot.forEach(function(doc) {
          cloudInspections.push(doc.data());
        });
        mergeFromCloud(cloudInspections);
      }, function(err) {
        console.error('CloudSync: listener error', err);
      });
  }

  function mergeFromCloud(cloudInspections) {
    try {
      var localHistoryRaw = localStorage.getItem('ccr_inspection_history');
      var localHistory = localHistoryRaw ? JSON.parse(localHistoryRaw) : [];
      var changed = false;

      // Build map of local inspections by ID
      var localMap = {};
      for (var i = 0; i < localHistory.length; i++) {
        if (localHistory[i].inspectionId) {
          localMap[localHistory[i].inspectionId] = i;
        }
      }

      // Build set of cloud IDs for delete detection
      var cloudIds = {};
      for (var k = 0; k < cloudInspections.length; k++) {
        if (cloudInspections[k].inspectionId) {
          cloudIds[cloudInspections[k].inspectionId] = true;
        }
      }

      // Log status breakdown for debugging
      var statusCounts = {};
      for (var s = 0; s < cloudInspections.length; s++) {
        var st = cloudInspections[s].status || 'unknown';
        statusCounts[st] = (statusCounts[st] || 0) + 1;
      }
      console.log('CloudSync: doc statuses:', JSON.stringify(statusCounts));

      // Add or update from cloud
      for (var j = 0; j < cloudInspections.length; j++) {
        var cloud = cloudInspections[j];
        if (!cloud.inspectionId) continue;
        // Only sync completed inspections to other devices' history
        if (cloud.status !== 'completed') continue;

        var localIdx = localMap[cloud.inspectionId];

        if (localIdx === undefined) {
          // New inspection from cloud — add to local
          localHistory.push(cloud);
          localMap[cloud.inspectionId] = localHistory.length - 1;
          changed = true;
        } else {
          // Exists locally — update if cloud is newer
          var local = localHistory[localIdx];
          var cloudTime = cloud.lastModified || cloud.syncedAt || '';
          var localTime = local.lastModified || '';
          if (cloudTime > localTime) {
            localHistory[localIdx] = cloud;
            changed = true;
          }
        }
      }

      // Remove local items that were deleted from cloud
      // Only remove if the item was previously synced (has syncedAt)
      var newHistory = [];
      for (var m = 0; m < localHistory.length; m++) {
        var item = localHistory[m];
        var wasFromCloud = item.syncedAt || item.deviceId;
        var stillInCloud = cloudIds[item.inspectionId];
        if (wasFromCloud && !stillInCloud) {
          // Was synced but no longer in cloud — deleted remotely
          changed = true;
        } else {
          newHistory.push(item);
        }
      }
      localHistory = newHistory;

      if (changed) {
        // Sort newest first
        localHistory.sort(function(a, b) {
          var aTime = a.completedAt || a.lastModified || '';
          var bTime = b.completedAt || b.lastModified || '';
          return bTime.localeCompare(aTime);
        });

        if (localHistory.length > 50) {
          localHistory = localHistory.slice(0, 50);
        }

        localStorage.setItem('ccr_inspection_history', JSON.stringify(localHistory));
        console.log('CloudSync: merged', localHistory.length, 'inspections to local');
        document.dispatchEvent(new CustomEvent('cloud-sync-updated'));
      }
    } catch (e) {
      console.error('CloudSync: merge error', e);
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
