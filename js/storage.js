/* ============================================
   LocalStorage Persistence Layer
   Save, load, resume, and clear inspections
   ============================================ */

var InspectionStorage = (function() {
  var STORAGE_KEY = 'ccr_current_inspection';
  var HISTORY_KEY = 'ccr_inspection_history';
  var autoSaveTimer = null;
  var hasUnsavedChanges = false;
  var lastSaveTime = null;

  function generateId() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0;
      var v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function saveInspection(data) {
    try {
      data.lastModified = new Date().toISOString();
      if (!data.inspectionId) {
        // Preserve ID from existing draft before generating a new one
        var existing = loadInspection();
        if (existing && existing.inspectionId) {
          data.inspectionId = existing.inspectionId;
          data.timestamp = existing.timestamp || data.timestamp;
        } else {
          data.inspectionId = generateId();
        }
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      hasUnsavedChanges = false;
      lastSaveTime = new Date();
      if (typeof CloudSync !== 'undefined') {
        CloudSync.pushInspection(data);
      }
      return true;
    } catch (e) {
      if (e.name === 'QuotaExceededError' || e.code === 22) {
        alert('Storage is full. Please clear old inspections to continue saving.');
      }
      console.error('Save failed:', e);
      return false;
    }
  }

  function loadInspection() {
    try {
      var data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Load failed:', e);
      return null;
    }
  }

  function hasInProgressInspection() {
    try {
      var data = localStorage.getItem(STORAGE_KEY);
      if (!data) return false;
      var parsed = JSON.parse(data);
      return parsed && parsed.status === 'in_progress';
    } catch (e) {
      return false;
    }
  }

  function getInProgressSummary() {
    try {
      var data = loadInspection();
      if (!data || data.status !== 'in_progress') return null;
      var equipmentName = '';
      if (data.equipmentType && typeof EQUIPMENT_TYPES !== 'undefined' && EQUIPMENT_TYPES[data.equipmentType]) {
        equipmentName = EQUIPMENT_TYPES[data.equipmentType].name;
      }
      return {
        equipmentType: data.equipmentType,
        equipmentName: equipmentName,
        customerName: data.customerInfo ? data.customerInfo.customerName : '',
        lastModified: data.lastModified
      };
    } catch (e) {
      return null;
    }
  }

  function clearInspection() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      hasUnsavedChanges = false;
      lastSaveTime = null;
      return true;
    } catch (e) {
      console.error('Clear failed:', e);
      return false;
    }
  }

  function archiveInspection(data) {
    try {
      // Ensure inspectionId from current draft carries over
      if (!data.inspectionId) {
        var current = loadInspection();
        if (current && current.inspectionId) {
          data.inspectionId = current.inspectionId;
        } else {
          data.inspectionId = generateId();
        }
      }
      data.lastModified = new Date().toISOString();
      var history = getInspectionList();
      data.status = 'completed';
      data.completedAt = new Date().toISOString();
      history.unshift(data);
      // Keep last 50 inspections
      if (history.length > 50) {
        history = history.slice(0, 50);
      }
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
      clearInspection();
      if (typeof CloudSync !== 'undefined') {
        CloudSync.pushInspection(data);
      }
      return true;
    } catch (e) {
      console.error('Archive failed:', e);
      return false;
    }
  }

  function getInspectionList() {
    try {
      var data = localStorage.getItem(HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('History load failed:', e);
      return [];
    }
  }

  function markUnsaved() {
    hasUnsavedChanges = true;
  }

  function getHasUnsavedChanges() {
    return hasUnsavedChanges;
  }

  function getLastSaveTime() {
    return lastSaveTime;
  }

  function getTimeSinceLastSave() {
    if (!lastSaveTime) return null;
    var seconds = Math.floor((new Date() - lastSaveTime) / 1000);
    if (seconds < 60) return 'just now';
    var minutes = Math.floor(seconds / 60);
    if (minutes === 1) return '1 min ago';
    return minutes + ' min ago';
  }

  function startAutoSave(collectDataFn) {
    stopAutoSave();
    autoSaveTimer = setInterval(function() {
      if (hasUnsavedChanges && typeof collectDataFn === 'function') {
        var data = collectDataFn();
        if (data) {
          saveInspection(data);
          document.dispatchEvent(new CustomEvent('inspection-autosaved'));
        }
      }
    }, 30000);
  }

  function stopAutoSave() {
    if (autoSaveTimer) {
      clearInterval(autoSaveTimer);
      autoSaveTimer = null;
    }
  }

  function setupBeforeUnload() {
    window.addEventListener('beforeunload', function(e) {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
      }
    });
  }

  // --- Job Storage (Feature 6) ---

  var JOB_CURRENT_KEY = 'ccr_current_job';
  var JOB_HISTORY_KEY = 'ccr_job_history';

  function saveJob(job) {
    try {
      job.lastModified = new Date().toISOString();
      if (!job.jobId) job.jobId = generateId();
      localStorage.setItem(JOB_CURRENT_KEY, JSON.stringify(job));
      return true;
    } catch(e) {
      console.error('Job save failed:', e);
      return false;
    }
  }

  function loadJob() {
    try {
      var data = localStorage.getItem(JOB_CURRENT_KEY);
      return data ? JSON.parse(data) : null;
    } catch(e) {
      return null;
    }
  }

  function hasInProgressJob() {
    try {
      var data = localStorage.getItem(JOB_CURRENT_KEY);
      if (!data) return false;
      var parsed = JSON.parse(data);
      return parsed && parsed.status === 'in_progress';
    } catch(e) {
      return false;
    }
  }

  function clearJob() {
    try {
      localStorage.removeItem(JOB_CURRENT_KEY);
      return true;
    } catch(e) {
      return false;
    }
  }

  function archiveJob(job) {
    try {
      if (!job.jobId) job.jobId = generateId();
      job.status = 'completed';
      job.completedAt = new Date().toISOString();
      job.lastModified = job.completedAt;
      var history = getJobList();
      history.unshift(job);
      if (history.length > 50) history = history.slice(0, 50);
      localStorage.setItem(JOB_HISTORY_KEY, JSON.stringify(history));
      clearJob();
      return true;
    } catch(e) {
      console.error('Job archive failed:', e);
      return false;
    }
  }

  function getJobList() {
    try {
      var data = localStorage.getItem(JOB_HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch(e) {
      return [];
    }
  }

  return {
    generateId: generateId,
    saveInspection: saveInspection,
    loadInspection: loadInspection,
    hasInProgressInspection: hasInProgressInspection,
    getInProgressSummary: getInProgressSummary,
    clearInspection: clearInspection,
    archiveInspection: archiveInspection,
    getInspectionList: getInspectionList,
    markUnsaved: markUnsaved,
    getHasUnsavedChanges: getHasUnsavedChanges,
    getLastSaveTime: getLastSaveTime,
    getTimeSinceLastSave: getTimeSinceLastSave,
    startAutoSave: startAutoSave,
    stopAutoSave: stopAutoSave,
    setupBeforeUnload: setupBeforeUnload,
    saveJob: saveJob,
    loadJob: loadJob,
    hasInProgressJob: hasInProgressJob,
    clearJob: clearJob,
    archiveJob: archiveJob,
    getJobList: getJobList
  };
})();
