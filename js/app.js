/* ============================================
   Main Application Logic
   State management, navigation, event wiring
   Phase 2: photos, signatures, history, email
   ============================================ */

var App = (function() {
  var state = {
    currentScreen: 'landing',
    currentEquipmentType: null,
    historyViewIndex: -1,
    units: [],
    activeUnitIndex: 0,
    currentJob: null,
    editingJobEquipmentIndex: -1
  };

  var elements = {};
  var signaturePadInstance = null;
  var signatureTarget = null;

  function init() {
    cacheElements();
    renderLanding();
    bindEvents();
    checkForResume();
    InspectionStorage.setupBeforeUnload();
    updateSaveStatus();

    if (typeof CloudSync !== 'undefined') {
      CloudSync.init();
      document.addEventListener('cloud-sync-updated', function() {
        if (state.currentScreen === 'history') {
          renderHistoryList();
        }
      });
    }
  }

  function cacheElements() {
    elements.landingScreen = document.getElementById('screen-landing');
    elements.formScreen = document.getElementById('screen-form');
    elements.historyScreen = document.getElementById('screen-history');
    elements.historyDetailScreen = document.getElementById('screen-history-detail');
    elements.equipmentGrid = document.getElementById('equipment-grid');
    elements.resumeBanner = document.getElementById('resume-banner');
    elements.resumeInfo = document.getElementById('resume-info');
    elements.customerInfoContainer = document.getElementById('customer-info-container');
    elements.formSectionsContainer = document.getElementById('form-sections-container');
    elements.formTitle = document.getElementById('form-title');
    elements.btnBack = document.getElementById('btn-back');
    elements.btnSave = document.getElementById('btn-save');
    elements.btnGeneratePdf = document.getElementById('btn-generate-pdf');
    elements.btnClear = document.getElementById('btn-clear');
    elements.saveStatus = document.getElementById('save-status');
    elements.toast = document.getElementById('toast');
    elements.modalOverlay = document.getElementById('modal-overlay');
    elements.modalTitle = document.getElementById('modal-title');
    elements.modalMessage = document.getElementById('modal-message');
    elements.modalConfirm = document.getElementById('modal-confirm');
    elements.modalCancel = document.getElementById('modal-cancel');
    elements.signatureModal = document.getElementById('signature-modal');
    elements.signatureCanvas = document.getElementById('signature-canvas');
    elements.historyListContainer = document.getElementById('history-list-container');
    elements.historyDetailContainer = document.getElementById('history-detail-container');
    elements.historySearch = document.getElementById('history-search');
    elements.postPdfActions = document.getElementById('post-pdf-actions');
    elements.unitSwitcherContainer = document.getElementById('unit-switcher-container');
    elements.btnDuplicateUnit = document.getElementById('btn-duplicate-unit');
    elements.jobScreen = document.getElementById('screen-job');
    elements.jobHeaderTitle = document.getElementById('job-header-title');
    elements.jobHeaderMeta = document.getElementById('job-header-meta');
    elements.jobEquipmentList = document.getElementById('job-equipment-list');
  }

  function renderLanding() {
    FormRenderer.renderEquipmentSelector(EQUIPMENT_TYPES, elements.equipmentGrid);
  }

  function checkForResume() {
    var summary = InspectionStorage.getInProgressSummary();
    if (summary) {
      elements.resumeBanner.classList.add('resume-banner--visible');
      var infoText = '';
      if (summary.equipmentName) infoText += summary.equipmentName;
      if (summary.customerName) infoText += ' \u2014 ' + summary.customerName;
      if (summary.lastModified) {
        var date = new Date(summary.lastModified);
        infoText += ' \u2022 Last saved: ' + formatDate(date);
      }
      elements.resumeInfo.textContent = infoText;
    } else {
      elements.resumeBanner.classList.remove('resume-banner--visible');
    }
  }

  function bindEvents() {
    // Equipment card selection
    elements.equipmentGrid.addEventListener('click', function(e) {
      var card = e.target.closest('.equipment-card');
      if (card) {
        var type = card.getAttribute('data-type');
        startNewInspection(type);
      }
    });

    // New Job
    document.getElementById('btn-new-job').addEventListener('click', function() {
      createNewJob();
    });

    // Resume
    document.getElementById('btn-resume').addEventListener('click', function() {
      resumeInspection();
    });

    // Discard
    document.getElementById('btn-discard').addEventListener('click', function() {
      showModal('Discard Inspection?', 'This will permanently delete the saved inspection. This cannot be undone.', function() {
        InspectionStorage.clearInspection();
        checkForResume();
        showToast('Inspection discarded', 'warning');
      });
    });

    // Back button
    elements.btnBack.addEventListener('click', function() {
      navigateBack();
    });

    // Manual save
    elements.btnSave.addEventListener('click', function() {
      manualSave();
    });

    // Generate PDF
    elements.btnGeneratePdf.addEventListener('click', function() {
      generatePdf();
    });

    // Clear inspection
    elements.btnClear.addEventListener('click', function() {
      showModal('Clear Inspection?', 'This will clear all data from the current inspection. This cannot be undone.', function() {
        InspectionStorage.clearInspection();
        FormRenderer.resetState();
        navigateToLanding();
        showToast('Inspection cleared');
      });
    });

    // View History
    document.getElementById('btn-history').addEventListener('click', function() {
      navigateToHistory();
    });

    // Section collapse/expand
    document.addEventListener('click', function(e) {
      var header = e.target.closest('.section-header');
      if (header) {
        var section = header.closest('.inspection-section');
        section.classList.toggle('inspection-section--open');
        var isOpen = section.classList.contains('inspection-section--open');
        header.setAttribute('aria-expanded', isOpen);
      }
    });

    // Photo file input
    document.addEventListener('change', function(e) {
      if (e.target.matches('.photo-file-input')) {
        var sectionId = e.target.getAttribute('data-photo-for');
        var file = e.target.files[0];
        if (file && sectionId) {
          FormRenderer.compressImage(file, function(dataUrl) {
            FormRenderer.addPhotoToSection(sectionId, dataUrl);
          });
          e.target.value = '';
        }
      }

      // General change tracking
      if (state.currentScreen === 'form') {
        InspectionStorage.markUnsaved();
        updateSaveStatus();
      }
    });

    // Photo delete
    document.addEventListener('click', function(e) {
      var deleteBtn = e.target.closest('[data-delete-photo]');
      if (deleteBtn) {
        var photoId = deleteBtn.getAttribute('data-delete-photo');
        var sectionId = deleteBtn.getAttribute('data-photo-section');
        FormRenderer.removePhotoFromSection(sectionId, photoId);
      }
    });

    // Photo caption update
    document.addEventListener('change', function(e) {
      if (e.target.matches('.photo-caption-input')) {
        var photoId = e.target.getAttribute('data-photo-id');
        var sectionId = e.target.getAttribute('data-photo-section');
        FormRenderer.updatePhotoCaption(sectionId, photoId, e.target.value);
      }
    });

    // Add cost row
    document.addEventListener('click', function(e) {
      var addBtn = e.target.closest('[data-add-cost-row]');
      if (addBtn) {
        var sectionId = addBtn.getAttribute('data-add-cost-row');
        FormRenderer.addCostRow(sectionId);
      }
    });

    // Delete cost row
    document.addEventListener('click', function(e) {
      var delBtn = e.target.closest('[data-delete-cost-row]');
      if (delBtn) {
        var rowId = delBtn.getAttribute('data-delete-cost-row');
        var sectionId = delBtn.getAttribute('data-cost-section');
        var row = document.getElementById(rowId);
        if (row) row.parentNode.removeChild(row);
        FormRenderer.recalcCostTotal(sectionId);
      }
    });

    // Recalc cost totals on input
    document.addEventListener('input', function(e) {
      if (e.target.matches('.cost-parts') || e.target.matches('.cost-labor-hrs')) {
        var row = e.target.closest('.cost-row');
        if (row) {
          var container = row.parentNode;
          if (container) {
            var sectionId = container.id.replace('cost-rows-', '');
            FormRenderer.recalcCostTotal(sectionId);
          }
        }
      }
    });

    // Job screen buttons
    document.getElementById('btn-job-save').addEventListener('click', function() {
      saveCurrentJob();
    });
    document.getElementById('btn-job-add-equipment').addEventListener('click', function() {
      showJobEquipmentSelector();
    });
    document.getElementById('btn-job-generate-pdf').addEventListener('click', function() {
      generateJobPdf();
    });
    document.getElementById('btn-job-discard').addEventListener('click', function() {
      showModal('Discard Job?', 'This will permanently delete the current job. This cannot be undone.', function() {
        InspectionStorage.clearJob();
        state.currentJob = null;
        navigateToLanding();
        showToast('Job discarded', 'warning');
      });
    });

    // Job equipment card clicks
    document.addEventListener('click', function(e) {
      var card = e.target.closest('.job-equipment-card');
      if (card && state.currentScreen === 'job') {
        var idx = parseInt(card.getAttribute('data-equip-index'), 10);
        if (!isNaN(idx)) editJobEquipment(idx);
      }
    });

    // Unit tab switching
    document.addEventListener('click', function(e) {
      var tab = e.target.closest('.unit-tab');
      if (tab) {
        var idx = parseInt(tab.getAttribute('data-unit-index'), 10);
        if (!isNaN(idx)) switchToUnit(idx);
      }
    });

    // Duplicate unit
    if (elements.btnDuplicateUnit) {
      elements.btnDuplicateUnit.addEventListener('click', function() {
        duplicateUnit();
      });
    }

    // Signature pad click (open modal)
    document.addEventListener('click', function(e) {
      var pad = e.target.closest('.signature-block__pad');
      if (pad && !e.target.closest('.signature-block__clear')) {
        var sigType = pad.getAttribute('data-sig');
        if (sigType) openSignatureModal(sigType);
      }
    });

    // Signature clear button
    document.addEventListener('click', function(e) {
      var clearBtn = e.target.closest('[data-clear-sig]');
      if (clearBtn) {
        var sigType = clearBtn.getAttribute('data-clear-sig');
        FormRenderer.clearSignatureData(sigType);
      }
    });

    // Signature modal buttons
    document.getElementById('sig-cancel').addEventListener('click', function() {
      closeSignatureModal();
    });

    document.getElementById('sig-clear').addEventListener('click', function() {
      if (signaturePadInstance) signaturePadInstance.clear();
    });

    document.getElementById('sig-done').addEventListener('click', function() {
      if (signaturePadInstance && !signaturePadInstance.isEmpty()) {
        var dataUrl = signaturePadInstance.toDataURL();
        FormRenderer.setSignatureData(signatureTarget, dataUrl);
      }
      closeSignatureModal();
    });

    // Close signature modal on overlay click
    elements.signatureModal.addEventListener('click', function(e) {
      if (e.target === elements.signatureModal) closeSignatureModal();
    });

    // Input tracking
    document.addEventListener('input', function(e) {
      if (state.currentScreen === 'form' && (e.target.matches('.form-input') || e.target.matches('.form-textarea'))) {
        InspectionStorage.markUnsaved();
        updateSaveStatus();
      }
    });

    // Save on blur
    document.addEventListener('focusout', function(e) {
      if (state.currentScreen === 'form' && InspectionStorage.getHasUnsavedChanges()) {
        var data = buildSaveData();
        InspectionStorage.saveInspection(data);
        updateSaveStatus();
      }
    });

    // Auto-save feedback
    document.addEventListener('inspection-autosaved', function() {
      updateSaveStatus();
      showToast('Auto-saved', 'success');
    });

    setInterval(function() {
      if (state.currentScreen === 'form') updateSaveStatus();
    }, 15000);

    // Modal cancel
    elements.modalCancel.addEventListener('click', function() {
      hideModal();
    });

    elements.modalOverlay.addEventListener('click', function(e) {
      if (e.target === elements.modalOverlay) hideModal();
    });

    // History search
    if (elements.historySearch) {
      elements.historySearch.addEventListener('input', function() {
        renderHistoryList(this.value);
      });
    }

    // History card clicks
    document.addEventListener('click', function(e) {
      var card = e.target.closest('.history-card');
      if (card && state.currentScreen === 'history') {
        var index = parseInt(card.getAttribute('data-history-index'), 10);
        var histType = card.getAttribute('data-history-type');
        if (histType === 'job') {
          navigateToJobHistoryDetail(index);
        } else {
          navigateToHistoryDetail(index);
        }
      }
    });

    // History detail buttons
    document.addEventListener('click', function(e) {
      if (e.target.id === 'btn-history-pdf') {
        downloadHistoryPdf();
      }
      if (e.target.id === 'btn-history-email') {
        emailFromHistory();
      }
      if (e.target.id === 'btn-history-delete') {
        deleteHistoryItem();
      }
    });

    // Post-PDF actions
    document.addEventListener('click', function(e) {
      if (e.target.id === 'btn-archive') {
        archiveCurrentInspection();
      }
      if (e.target.id === 'btn-email-report') {
        emailCurrentInspection();
      }
    });
  }

  // --- Inspection Flow ---

  function startNewInspection(equipmentType) {
    if (InspectionStorage.hasInProgressInspection()) {
      showModal('Start New Inspection?', 'You have an inspection in progress. Starting a new one will replace it. Continue?', function() {
        InspectionStorage.clearInspection();
        FormRenderer.resetState();
        loadForm(equipmentType, null);
      });
    } else {
      FormRenderer.resetState();
      loadForm(equipmentType, null);
    }
  }

  function resumeInspection() {
    var data = InspectionStorage.loadInspection();
    if (data && data.equipmentType) {
      loadForm(data.equipmentType, data);
    } else {
      showToast('Could not resume inspection', 'error');
    }
  }

  function loadForm(equipmentType, existingData) {
    var config = EQUIPMENT_TYPES[equipmentType];
    if (!config) {
      showToast('Unknown equipment type', 'error');
      return;
    }

    state.currentEquipmentType = equipmentType;
    elements.formTitle.innerHTML = '<span>' + config.icon + '</span> ' + escapeHtml(config.name) + ' Inspection';

    initUnits(existingData);

    FormRenderer.renderCustomerInfo(elements.customerInfoContainer);
    FormRenderer.renderInspectionForm(equipmentType, config, elements.formSectionsContainer);
    renderUnitSwitcher();

    // Hide post-PDF actions on form load
    if (elements.postPdfActions) elements.postPdfActions.classList.remove('post-pdf-actions--visible');

    if (existingData) {
      var activeUnit = state.units[state.activeUnitIndex];
      var populateData = existingData;
      if (activeUnit && activeUnit.data) {
        populateData = {
          equipmentType: existingData.equipmentType,
          customerInfo: existingData.customerInfo,
          sections: activeUnit.data.sections,
          technicianSummary: activeUnit.data.technicianSummary,
          signatures: activeUnit.data.signatures || existingData.signatures
        };
      }
      FormRenderer.populateForm(populateData);
    } else {
      var newData = buildSaveData();
      newData.inspectionId = InspectionStorage.generateId();
      newData.timestamp = new Date().toISOString();
      InspectionStorage.saveInspection(newData);
    }

    InspectionStorage.startAutoSave(function() {
      return buildSaveData();
    });

    navigateToForm();
  }

  // --- Multi-Unit Helpers ---

  function initUnits(existingData) {
    if (existingData && existingData.units && existingData.units.length > 0) {
      state.units = existingData.units;
    } else {
      state.units = [{ label: 'Unit 1', data: null }];
    }
    state.activeUnitIndex = 0;
  }

  function renderUnitSwitcher() {
    if (!elements.unitSwitcherContainer) return;
    if (state.units.length <= 1) {
      elements.unitSwitcherContainer.innerHTML = '';
      return;
    }
    var html = '<div class="unit-switcher">';
    for (var i = 0; i < state.units.length; i++) {
      var active = i === state.activeUnitIndex;
      html += '<button class="unit-tab' + (active ? ' unit-tab--active' : '') + '" data-unit-index="' + i + '" type="button">' +
        escapeHtml(state.units[i].label) + '</button>';
    }
    html += '</div>';
    elements.unitSwitcherContainer.innerHTML = html;
  }

  function switchToUnit(index) {
    if (index === state.activeUnitIndex || index < 0 || index >= state.units.length) return;
    // Save current unit
    var currentData = FormRenderer.collectFormData(state.currentEquipmentType);
    state.units[state.activeUnitIndex].data = {
      sections: currentData.sections,
      technicianSummary: currentData.technicianSummary,
      signatures: currentData.signatures
    };
    state.activeUnitIndex = index;
    // Re-render sections with new unit data
    var config = EQUIPMENT_TYPES[state.currentEquipmentType];
    FormRenderer.renderInspectionForm(state.currentEquipmentType, config, elements.formSectionsContainer);
    var unitData = state.units[index].data;
    if (unitData) {
      FormRenderer.populateForm({
        equipmentType: state.currentEquipmentType,
        customerInfo: currentData.customerInfo,
        sections: unitData.sections,
        technicianSummary: unitData.technicianSummary,
        signatures: unitData.signatures
      });
    }
    renderUnitSwitcher();
    window.scrollTo(0, 0);
  }

  function duplicateUnit() {
    var currentData = FormRenderer.collectFormData(state.currentEquipmentType);
    state.units[state.activeUnitIndex].data = {
      sections: currentData.sections,
      technicianSummary: currentData.technicianSummary,
      signatures: currentData.signatures
    };
    var cloneData = JSON.parse(JSON.stringify(state.units[state.activeUnitIndex].data));
    var newIndex = state.units.length;
    state.units.push({ label: 'Unit ' + (newIndex + 1), data: cloneData });
    state.activeUnitIndex = newIndex;
    // Re-render sections with cloned data
    var config = EQUIPMENT_TYPES[state.currentEquipmentType];
    FormRenderer.renderInspectionForm(state.currentEquipmentType, config, elements.formSectionsContainer);
    FormRenderer.populateForm({
      equipmentType: state.currentEquipmentType,
      customerInfo: currentData.customerInfo,
      sections: cloneData.sections,
      technicianSummary: cloneData.technicianSummary,
      signatures: cloneData.signatures
    });
    renderUnitSwitcher();
    showToast('Unit ' + (newIndex + 1) + ' added!', 'success');
    window.scrollTo(0, 0);
  }

  function buildSaveData() {
    var currentData = FormRenderer.collectFormData(state.currentEquipmentType);
    if (state.units.length > 0) {
      state.units[state.activeUnitIndex].data = {
        sections: currentData.sections,
        technicianSummary: currentData.technicianSummary,
        signatures: currentData.signatures
      };
    }
    return {
      equipmentType: state.currentEquipmentType,
      status: 'in_progress',
      customerInfo: currentData.customerInfo,
      units: state.units.map(function(u) { return { label: u.label, data: u.data }; }),
      sections: currentData.sections,
      technicianSummary: currentData.technicianSummary,
      signatures: currentData.signatures
    };
  }

  function manualSave() {
    var data = buildSaveData();
    if (InspectionStorage.saveInspection(data)) {
      showToast('Inspection saved!', 'success');
      updateSaveStatus();
    } else {
      showToast('Save failed', 'error');
    }
  }

  function generatePdf() {
    var data = buildSaveData();
    InspectionStorage.saveInspection(data);

    var missing = PDFGenerator.validateRequiredFields(data);
    if (missing.length > 0) {
      showToast('Required: ' + missing.join(', '), 'error');
      highlightRequiredFields(missing);
      return;
    }

    showToast('Generating PDF...', '');
    PDFGenerator.generate(data).then(function(filename) {
      showToast('PDF saved: ' + filename, 'success');
      // Show post-PDF actions
      if (elements.postPdfActions) {
        elements.postPdfActions.classList.add('post-pdf-actions--visible');
        elements.postPdfActions.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }).catch(function(err) {
      showToast(typeof err === 'string' ? err : 'PDF generation failed', 'error');
    });
  }

  function highlightRequiredFields(missing) {
    var fieldMap = {
      'Customer Name': 'ci-customer-name',
      'Location': 'ci-location',
      'Inspection Date': 'ci-date',
      'Technician Name': 'ci-technician'
    };
    for (var i = 0; i < missing.length; i++) {
      var id = fieldMap[missing[i]];
      if (id) {
        var el = document.getElementById(id);
        if (el) {
          el.style.borderColor = 'var(--color-error)';
          el.addEventListener('input', function() {
            this.style.borderColor = '';
          }, { once: true });
        }
      }
    }
    var firstId = fieldMap[missing[0]];
    if (firstId) {
      var firstEl = document.getElementById(firstId);
      if (firstEl) firstEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function archiveCurrentInspection() {
    var data = buildSaveData();
    if (InspectionStorage.archiveInspection(data)) {
      FormRenderer.resetState();
      navigateToLanding();
      showToast('Inspection archived!', 'success');
    } else {
      showToast('Archive failed', 'error');
    }
  }

  function emailCurrentInspection() {
    var data = buildSaveData();
    sendEmailReport(data);
  }

  // --- Signature Modal ---

  function openSignatureModal(type) {
    signatureTarget = type;
    elements.signatureModal.classList.add('modal-overlay--visible');
    document.getElementById('sig-modal-title').textContent =
      (type === 'technician' ? 'Technician' : 'Customer') + ' Signature';

    // Create/recreate signature pad after modal is visible
    setTimeout(function() {
      signaturePadInstance = SignaturePad.create(elements.signatureCanvas);
    }, 50);
  }

  function closeSignatureModal() {
    elements.signatureModal.classList.remove('modal-overlay--visible');
    signaturePadInstance = null;
    signatureTarget = null;
  }

  // --- Job / Assessment Flow (Feature 6) ---

  function createNewJob() {
    if (InspectionStorage.hasInProgressJob()) {
      showModal('Resume Existing Job?', 'You have a job in progress. Do you want to resume it, or start a new one?', function() {
        InspectionStorage.clearJob();
        initNewJob();
      });
      // Also offer resume path — we'll just resume here if user hits Cancel
      var existing = InspectionStorage.loadJob();
      if (existing) {
        state.currentJob = existing;
        navigateToJob();
        return;
      }
    }
    initNewJob();
  }

  function initNewJob() {
    state.currentJob = {
      jobId: InspectionStorage.generateId(),
      jobType: 'pre_purchase',
      propertyAddress: '',
      preparedFor: '',
      assessmentDate: new Date().toISOString().split('T')[0],
      technician: 'Kris',
      techCredentials: 'EPA 608 Universal | NFPA 70E | OSHA 10',
      notes: '',
      status: 'in_progress',
      equipment: []
    };
    InspectionStorage.saveJob(state.currentJob);
    navigateToJob();
  }

  function navigateToJob() {
    hideAllScreens();
    state.currentScreen = 'job';
    elements.jobScreen.classList.add('screen--active');
    elements.btnBack.classList.add('btn-back--visible');
    renderJobScreen();
    window.scrollTo(0, 0);
  }

  function renderJobScreen() {
    var job = state.currentJob;
    if (!job) return;

    elements.jobHeaderTitle.textContent = job.propertyAddress || 'Property Assessment';
    elements.jobHeaderMeta.textContent =
      (job.preparedFor ? 'For: ' + job.preparedFor + '  ' : '') +
      (job.assessmentDate ? 'Date: ' + job.assessmentDate : '') +
      (job.technician ? '  |  Tech: ' + job.technician : '');

    if (!job.equipment || job.equipment.length === 0) {
      elements.jobEquipmentList.innerHTML =
        '<div class="job-empty">No equipment added yet. Tap &ldquo;+ Add Equipment&rdquo; to start.</div>';
      return;
    }

    var html = '';
    for (var i = 0; i < job.equipment.length; i++) {
      var equip = job.equipment[i];
      var config = EQUIPMENT_TYPES[equip.equipmentType];
      var icon = config ? config.icon : '';
      var typeName = config ? config.name : equip.equipmentType;
      var condition = equip.overallCondition || '';
      var condClass = '';
      if (condition.toLowerCase().indexOf('good') !== -1) condClass = 'job-equipment-card__condition--good';
      else if (condition.toLowerCase().indexOf('fair') !== -1) condClass = 'job-equipment-card__condition--fair';
      else if (condition.toLowerCase().indexOf('poor') !== -1 || condition.toLowerCase().indexOf('non-func') !== -1) condClass = 'job-equipment-card__condition--poor';

      html +=
        '<div class="job-equipment-card" data-equip-index="' + i + '">' +
          '<div class="job-equipment-card__info">' +
            '<div class="job-equipment-card__label">' + icon + ' ' + escapeHtml(equip.label || typeName) + '</div>' +
            '<div class="job-equipment-card__type">' + escapeHtml(typeName) + '</div>' +
          '</div>' +
          (condition ? '<div class="job-equipment-card__condition ' + condClass + '">' + escapeHtml(condition) + '</div>' : '') +
        '</div>';
    }
    elements.jobEquipmentList.innerHTML = html;
  }

  function showJobEquipmentSelector() {
    // Reuse the modal to pick equipment type
    var typeKeys = Object.keys(EQUIPMENT_TYPES);
    var html = '<div class="job-type-selector"><div id="job-equip-selector-grid" class="equipment-grid"></div></div>';
    elements.modalTitle.textContent = 'Add Equipment';
    elements.modalMessage.innerHTML = html;
    elements.modalOverlay.classList.add('modal-overlay--visible');

    // Render grid inside modal
    var grid = document.getElementById('job-equip-selector-grid');
    if (grid) {
      FormRenderer.renderEquipmentSelector(EQUIPMENT_TYPES, grid);
      grid.addEventListener('click', function(e) {
        var card = e.target.closest('.equipment-card');
        if (card) {
          var type = card.getAttribute('data-type');
          hideModal();
          addEquipmentToJob(type);
        }
      });
    }

    // Hide confirm/cancel — user picks from grid
    elements.modalConfirm.style.display = 'none';
    elements.modalCancel.style.display = 'none';
    elements.modalCancel.addEventListener('click', function restoreButtons() {
      elements.modalConfirm.style.display = '';
      elements.modalCancel.style.display = '';
      elements.modalCancel.removeEventListener('click', restoreButtons);
    }, { once: true });
  }

  function addEquipmentToJob(equipmentType) {
    if (!state.currentJob) return;
    var config = EQUIPMENT_TYPES[equipmentType];
    if (!config) return;

    var newEquip = {
      equipmentType: equipmentType,
      label: config.name,
      manufacturer: '',
      modelNumber: '',
      serialNumber: '',
      unitAge: '',
      overallCondition: '',
      units: [{ label: 'Unit 1', data: null }],
      sections: {},
      technicianSummary: '',
      repairCostTotal: 0
    };
    state.currentJob.equipment.push(newEquip);
    state.editingJobEquipmentIndex = state.currentJob.equipment.length - 1;
    InspectionStorage.saveJob(state.currentJob);

    // Load the form for this equipment item
    loadJobEquipmentForm(equipmentType, null);
  }

  function editJobEquipment(index) {
    if (!state.currentJob || index < 0 || index >= state.currentJob.equipment.length) return;
    state.editingJobEquipmentIndex = index;
    var equip = state.currentJob.equipment[index];
    // Build a form-compatible data object from job equipment
    var formData = {
      equipmentType: equip.equipmentType,
      customerInfo: {
        customerName: state.currentJob.preparedFor,
        location: state.currentJob.propertyAddress,
        inspectionDate: state.currentJob.assessmentDate,
        technician: state.currentJob.technician,
        reportType: state.currentJob.jobType
      },
      sections: equip.sections,
      technicianSummary: equip.technicianSummary,
      signatures: equip.signatures || null,
      units: equip.units && equip.units.length > 0 ? equip.units : null
    };
    loadJobEquipmentForm(equip.equipmentType, formData);
  }

  function loadJobEquipmentForm(equipmentType, existingData) {
    var config = EQUIPMENT_TYPES[equipmentType];
    if (!config) return;

    state.currentEquipmentType = equipmentType;
    elements.formTitle.innerHTML = '<span>' + config.icon + '</span> ' + escapeHtml(config.name) + ' Inspection';

    initUnits(existingData);

    FormRenderer.renderCustomerInfo(elements.customerInfoContainer);
    FormRenderer.renderInspectionForm(equipmentType, config, elements.formSectionsContainer);
    renderUnitSwitcher();

    if (elements.postPdfActions) elements.postPdfActions.classList.remove('post-pdf-actions--visible');

    if (existingData) {
      var activeUnit = state.units[state.activeUnitIndex];
      var populateData = existingData;
      if (activeUnit && activeUnit.data) {
        populateData = {
          equipmentType: existingData.equipmentType,
          customerInfo: existingData.customerInfo,
          sections: activeUnit.data.sections,
          technicianSummary: activeUnit.data.technicianSummary,
          signatures: activeUnit.data.signatures || existingData.signatures
        };
      }
      FormRenderer.populateForm(populateData);
    }

    InspectionStorage.startAutoSave(function() {
      return saveJobEquipmentData();
    });

    hideAllScreens();
    state.currentScreen = 'form-in-job';
    elements.formScreen.classList.add('screen--active');
    elements.btnBack.classList.add('btn-back--visible');
    window.scrollTo(0, 0);
  }

  function saveJobEquipmentData() {
    if (!state.currentJob || state.editingJobEquipmentIndex < 0) return null;
    var currentData = FormRenderer.collectFormData(state.currentEquipmentType);

    // Update active unit
    if (state.units.length > 0) {
      state.units[state.activeUnitIndex].data = {
        sections: currentData.sections,
        technicianSummary: currentData.technicianSummary,
        signatures: currentData.signatures
      };
    }

    var equip = state.currentJob.equipment[state.editingJobEquipmentIndex];
    equip.sections = currentData.sections;
    equip.technicianSummary = currentData.technicianSummary;
    equip.signatures = currentData.signatures;
    equip.units = state.units.map(function(u) { return { label: u.label, data: u.data }; });

    // Pull condition and repair cost from customer info extra fields
    if (currentData.customerInfo) {
      if (currentData.customerInfo.manufacturer) equip.manufacturer = currentData.customerInfo.manufacturer;
      if (currentData.customerInfo.modelNumber) equip.modelNumber = currentData.customerInfo.modelNumber;
      if (currentData.customerInfo.serialNumber) equip.serialNumber = currentData.customerInfo.serialNumber;
      if (currentData.customerInfo.unitAge) equip.unitAge = currentData.customerInfo.unitAge;
      if (currentData.customerInfo.overallCondition) equip.overallCondition = currentData.customerInfo.overallCondition;
    }

    InspectionStorage.saveJob(state.currentJob);
    return currentData; // return something truthy for auto-save
  }

  function saveCurrentJob() {
    if (!state.currentJob) return;
    if (InspectionStorage.saveJob(state.currentJob)) {
      showToast('Job saved!', 'success');
    } else {
      showToast('Save failed', 'error');
    }
  }

  function generateJobPdf() {
    if (!state.currentJob || state.currentJob.equipment.length === 0) {
      showToast('Add at least one equipment item first', 'error');
      return;
    }
    showToast('Generating assessment report...', '');
    PDFGenerator.generateJobReport(state.currentJob).then(function(filename) {
      showToast('PDF saved: ' + filename, 'success');
    }).catch(function(err) {
      showToast(typeof err === 'string' ? err : 'PDF generation failed', 'error');
    });
  }

  // --- Navigation ---

  function navigateToForm() {
    hideAllScreens();
    state.currentScreen = 'form';
    elements.formScreen.classList.add('screen--active');
    elements.btnBack.classList.add('btn-back--visible');
    window.scrollTo(0, 0);
  }

  function navigateToLanding() {
    hideAllScreens();
    state.currentScreen = 'landing';
    InspectionStorage.stopAutoSave();
    state.currentEquipmentType = null;
    state.units = [];
    state.activeUnitIndex = 0;
    state.editingJobEquipmentIndex = -1;
    elements.landingScreen.classList.add('screen--active');
    elements.btnBack.classList.remove('btn-back--visible');
    checkForResume();
    updateSaveStatus();
    window.scrollTo(0, 0);
  }

  function navigateToHistory() {
    hideAllScreens();
    state.currentScreen = 'history';
    elements.historyScreen.classList.add('screen--active');
    elements.btnBack.classList.add('btn-back--visible');
    if (elements.historySearch) elements.historySearch.value = '';
    renderHistoryList('');
    window.scrollTo(0, 0);
  }

  function navigateToHistoryDetail(index) {
    var list = InspectionStorage.getInspectionList();
    if (index < 0 || index >= list.length) return;
    state.historyViewIndex = index;
    state.historyViewType = 'inspection';

    hideAllScreens();
    state.currentScreen = 'history-detail';
    elements.historyDetailScreen.classList.add('screen--active');
    elements.btnBack.classList.add('btn-back--visible');
    renderHistoryDetail(list[index]);
    window.scrollTo(0, 0);
  }

  function navigateToJobHistoryDetail(index) {
    var list = InspectionStorage.getJobList();
    if (index < 0 || index >= list.length) return;
    state.historyViewIndex = index;
    state.historyViewType = 'job';

    hideAllScreens();
    state.currentScreen = 'history-detail';
    elements.historyDetailScreen.classList.add('screen--active');
    elements.btnBack.classList.add('btn-back--visible');
    renderJobHistoryDetail(list[index]);
    window.scrollTo(0, 0);
  }

  function navigateBack() {
    if (state.currentScreen === 'form') {
      if (state.currentEquipmentType) {
        var data = buildSaveData();
        InspectionStorage.saveInspection(data);
      }
      navigateToLanding();
    } else if (state.currentScreen === 'form-in-job') {
      saveJobEquipmentData();
      InspectionStorage.stopAutoSave();
      state.currentEquipmentType = null;
      state.units = [];
      state.activeUnitIndex = 0;
      navigateToJob();
    } else if (state.currentScreen === 'job') {
      navigateToLanding();
    } else if (state.currentScreen === 'history') {
      navigateToLanding();
    } else if (state.currentScreen === 'history-detail') {
      navigateToHistory();
    }
  }

  function hideAllScreens() {
    elements.landingScreen.classList.remove('screen--active');
    elements.formScreen.classList.remove('screen--active');
    elements.historyScreen.classList.remove('screen--active');
    elements.historyDetailScreen.classList.remove('screen--active');
    if (elements.jobScreen) elements.jobScreen.classList.remove('screen--active');
  }

  // --- History Rendering ---

  function renderHistoryList(filter) {
    var inspections = InspectionStorage.getInspectionList();
    var jobs = InspectionStorage.getJobList();
    var filterLower = (filter || '').toLowerCase();

    // Merge: tag each entry with its type and source index
    var combined = [];
    var i;
    for (i = 0; i < inspections.length; i++) {
      combined.push({ type: 'inspection', data: inspections[i], completedAt: inspections[i].completedAt || '', srcIndex: i });
    }
    for (i = 0; i < jobs.length; i++) {
      combined.push({ type: 'job', data: jobs[i], completedAt: jobs[i].completedAt || '', srcIndex: i });
    }
    // Sort by completedAt descending
    combined.sort(function(a, b) { return (b.completedAt > a.completedAt) ? 1 : -1; });

    if (combined.length === 0) {
      elements.historyListContainer.innerHTML =
        '<div class="empty-state">' +
          '<div class="empty-state__icon">&#128203;</div>' +
          '<div class="empty-state__text">No completed inspections yet.<br>Archived inspections will appear here.</div>' +
        '</div>';
      return;
    }

    var html = '';
    var shown = 0;
    for (i = 0; i < combined.length; i++) {
      var entry = combined[i];
      var cardHtml = '';

      if (entry.type === 'job') {
        var job = entry.data;
        var jobSearch = (job.propertyAddress + ' ' + job.preparedFor + ' ' + job.technician + ' ' + (job.assessmentDate || '')).toLowerCase();
        if (filterLower && jobSearch.indexOf(filterLower) === -1) continue;
        var jobDate = job.completedAt ? formatDate(new Date(job.completedAt)) : (job.assessmentDate || '');
        cardHtml =
          '<div class="history-card history-card--job" data-history-type="job" data-history-index="' + entry.srcIndex + '">' +
            '<div class="history-card__header">' +
              '<span class="history-card__type">&#128203; Property Assessment<span class="history-card__job-badge">JOB</span></span>' +
              '<span class="history-card__date">' + escapeHtml(jobDate) + '</span>' +
            '</div>' +
            '<div class="history-card__meta">' +
              '<span>' + escapeHtml(job.propertyAddress || 'Unknown address') + '</span>' +
              '<span>For: ' + escapeHtml(job.preparedFor || '') + '</span>' +
              '<span>' + (job.equipment ? job.equipment.length : 0) + ' equipment items</span>' +
            '</div>' +
          '</div>';
      } else {
        var item = entry.data;
        var equipConfig = EQUIPMENT_TYPES[item.equipmentType];
        var typeName = equipConfig ? equipConfig.name : item.equipmentType;
        var icon = equipConfig ? equipConfig.icon : '';
        var customer = (item.customerInfo && item.customerInfo.customerName) || 'Unknown';
        var location = (item.customerInfo && item.customerInfo.location) || '';
        var tech = (item.customerInfo && item.customerInfo.technician) || '';
        var dateStr = item.completedAt ? formatDate(new Date(item.completedAt)) :
                      (item.customerInfo && item.customerInfo.inspectionDate) || '';
        if (filterLower) {
          var searchText = (typeName + ' ' + customer + ' ' + location + ' ' + tech + ' ' + dateStr).toLowerCase();
          if (searchText.indexOf(filterLower) === -1) continue;
        }
        cardHtml =
          '<div class="history-card" data-history-type="inspection" data-history-index="' + entry.srcIndex + '">' +
            '<div class="history-card__header">' +
              '<span class="history-card__type">' + icon + ' ' + escapeHtml(typeName) + '</span>' +
              '<span class="history-card__date">' + escapeHtml(dateStr) + '</span>' +
            '</div>' +
            '<div class="history-card__meta">' +
              '<span>' + escapeHtml(customer) + '</span>' +
              (location ? '<span>' + escapeHtml(location) + '</span>' : '') +
              (tech ? '<span>Tech: ' + escapeHtml(tech) + '</span>' : '') +
            '</div>' +
          '</div>';
      }

      html += cardHtml;
      shown++;
    }

    if (shown === 0) {
      html = '<div class="empty-state"><div class="empty-state__text">No inspections match your search.</div></div>';
    }

    elements.historyListContainer.innerHTML = html;
  }

  function renderHistoryDetail(data) {
    var equipConfig = EQUIPMENT_TYPES[data.equipmentType];
    var typeName = equipConfig ? equipConfig.name : data.equipmentType;
    var icon = equipConfig ? equipConfig.icon : '';
    var ci = data.customerInfo || {};

    var html =
      '<div class="history-detail">' +
        '<div class="history-detail__title">' + icon + ' ' + escapeHtml(typeName) + ' Inspection</div>' +
        buildDetailRow('Customer', ci.customerName) +
        buildDetailRow('Location', ci.location) +
        buildDetailRow('Manufacturer', ci.manufacturer) +
        buildDetailRow('Model', ci.modelNumber) +
        buildDetailRow('Serial', ci.serialNumber) +
        buildDetailRow('Date', ci.inspectionDate) +
        buildDetailRow('Technician', ci.technician) +
      '</div>';

    // Sections summary
    if (equipConfig && data.sections) {
      for (var i = 0; i < equipConfig.sections.length; i++) {
        var sec = equipConfig.sections[i];
        var secData = data.sections[sec.id];
        if (!secData) continue;

        html += '<div class="history-detail"><div class="history-detail__section">';
        html += '<div class="history-detail__section-title">' + escapeHtml(sec.title) + '</div>';

        for (var j = 0; j < sec.items.length; j++) {
          var item = sec.items[j];
          var passed = secData.checkedItems && secData.checkedItems.indexOf(item.id) !== -1;
          html += '<div class="history-detail__item history-detail__item--' + (passed ? 'pass' : 'fail') + '">' +
            (passed ? '&#10004; ' : '&#10008; ') + escapeHtml(item.label) +
            '</div>';
        }

        if (secData.notes) {
          html += '<div style="margin-top:8px;font-style:italic;color:var(--color-text-light);">Notes: ' + escapeHtml(secData.notes) + '</div>';
        }

        html += '</div></div>';
      }
    }

    if (data.technicianSummary) {
      html += '<div class="history-detail"><div class="history-detail__section-title">Technician Summary</div>' +
        '<p>' + escapeHtml(data.technicianSummary) + '</p></div>';
    }

    // Action buttons
    html +=
      '<div class="action-bar">' +
        '<button class="btn btn--success" id="btn-history-pdf" type="button">&#128196; Download PDF</button>' +
        '<button class="btn btn--primary" id="btn-history-email" type="button">&#9993; Email Report</button>' +
      '</div>' +
      '<div class="action-bar">' +
        '<button class="btn btn--danger" id="btn-history-delete" type="button">&#128465; Delete</button>' +
      '</div>';

    elements.historyDetailContainer.innerHTML = html;
  }

  function renderJobHistoryDetail(job) {
    var html =
      '<div class="history-detail">' +
        '<div class="history-detail__title">&#128203; Property Assessment</div>' +
        buildDetailRow('Property', job.propertyAddress) +
        buildDetailRow('Prepared For', job.preparedFor) +
        buildDetailRow('Date', job.assessmentDate) +
        buildDetailRow('Technician', job.technician) +
        buildDetailRow('Equipment Items', job.equipment ? String(job.equipment.length) : '0') +
      '</div>';

    if (job.equipment && job.equipment.length > 0) {
      html += '<div class="history-detail"><div class="history-detail__section-title">Equipment</div>';
      for (var i = 0; i < job.equipment.length; i++) {
        var equip = job.equipment[i];
        var config = EQUIPMENT_TYPES[equip.equipmentType];
        var icon = config ? config.icon : '';
        html += '<div class="history-detail__row">' +
          '<span class="history-detail__label">' + icon + ' ' + escapeHtml(equip.label || '') + '</span>' +
          '<span class="history-detail__value">' + escapeHtml(equip.overallCondition || '') + '</span>' +
          '</div>';
      }
      html += '</div>';
    }

    html +=
      '<div class="action-bar">' +
        '<button class="btn btn--success" id="btn-history-pdf" type="button">&#128196; Download PDF</button>' +
      '</div>' +
      '<div class="action-bar">' +
        '<button class="btn btn--danger" id="btn-history-delete" type="button">&#128465; Delete</button>' +
      '</div>';

    elements.historyDetailContainer.innerHTML = html;
  }

  function buildDetailRow(label, value) {
    if (!value) return '';
    return '<div class="history-detail__row">' +
      '<span class="history-detail__label">' + escapeHtml(label) + '</span>' +
      '<span class="history-detail__value">' + escapeHtml(value) + '</span>' +
      '</div>';
  }

  function downloadHistoryPdf() {
    showToast('Generating PDF...', '');
    if (state.historyViewType === 'job') {
      var jobs = InspectionStorage.getJobList();
      if (state.historyViewIndex < 0 || state.historyViewIndex >= jobs.length) return;
      PDFGenerator.generateJobReport(jobs[state.historyViewIndex]).then(function(filename) {
        showToast('PDF saved: ' + filename, 'success');
      }).catch(function(err) {
        showToast(typeof err === 'string' ? err : 'PDF generation failed', 'error');
      });
    } else {
      var list = InspectionStorage.getInspectionList();
      if (state.historyViewIndex < 0 || state.historyViewIndex >= list.length) return;
      PDFGenerator.generate(list[state.historyViewIndex]).then(function(filename) {
        showToast('PDF saved: ' + filename, 'success');
      }).catch(function(err) {
        showToast(typeof err === 'string' ? err : 'PDF generation failed', 'error');
      });
    }
  }

  function emailFromHistory() {
    var list = InspectionStorage.getInspectionList();
    if (state.historyViewIndex < 0 || state.historyViewIndex >= list.length) return;
    sendEmailReport(list[state.historyViewIndex]);
  }

  function deleteHistoryItem() {
    var label = state.historyViewType === 'job' ? 'Job' : 'Inspection';
    showModal('Delete ' + label + '?', 'This will permanently delete this ' + label.toLowerCase() + ' from history.', function() {
      if (state.historyViewType === 'job') {
        var jobs = InspectionStorage.getJobList();
        if (state.historyViewIndex >= 0 && state.historyViewIndex < jobs.length) {
          jobs.splice(state.historyViewIndex, 1);
          try { localStorage.setItem('ccr_job_history', JSON.stringify(jobs)); } catch(e) {}
          navigateToHistory();
          showToast('Job deleted', 'success');
        }
      } else {
        var list = InspectionStorage.getInspectionList();
        if (state.historyViewIndex >= 0 && state.historyViewIndex < list.length) {
          var deleted = list[state.historyViewIndex];
          list.splice(state.historyViewIndex, 1);
          try { localStorage.setItem('ccr_inspection_history', JSON.stringify(list)); } catch(e) {}
          if (typeof CloudSync !== 'undefined' && deleted && deleted.inspectionId) {
            CloudSync.deleteInspection(deleted.inspectionId);
          }
          navigateToHistory();
          showToast('Inspection deleted', 'success');
        }
      }
    });
  }

  // --- Email ---

  function sendEmailReport(data) {
    var ci = data.customerInfo || {};
    var equipConfig = EQUIPMENT_TYPES[data.equipmentType];
    var typeName = equipConfig ? equipConfig.name : data.equipmentType;

    var to = ci.customerEmail || '';
    var subject = 'CCR Inspection Report - ' + typeName + ' - ' + (ci.customerName || '') + ' - ' + (ci.inspectionDate || '');
    var body = 'Dear ' + (ci.customerName || 'Customer') + ',\n\n' +
      'Please find the attached inspection report from Colorado Commercial Repairs.\n\n' +
      'Equipment: ' + typeName + '\n' +
      'Location: ' + (ci.location || '') + '\n' +
      'Date: ' + (ci.inspectionDate || '') + '\n' +
      'Technician: ' + (ci.technician || '') + '\n';

    if (data.technicianSummary) {
      body += '\nSummary: ' + data.technicianSummary + '\n';
    }

    body += '\nPlease see the attached PDF for the full inspection report.\n\n' +
      'Thank you,\nColorado Commercial Repairs\n970-778-5271\ncocomrepairs.com';

    var mailto = 'mailto:' + encodeURIComponent(to) +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);

    window.location.href = mailto;
    showToast('Email client opened. Attach the PDF manually.', 'success');
  }

  // --- UI Helpers ---

  function updateSaveStatus() {
    if (state.currentScreen !== 'form') {
      elements.saveStatus.textContent = '';
      elements.saveStatus.className = 'save-status';
      return;
    }
    if (InspectionStorage.getHasUnsavedChanges()) {
      elements.saveStatus.textContent = 'Unsaved changes';
      elements.saveStatus.className = 'save-status save-status--unsaved';
    } else {
      var timeSince = InspectionStorage.getTimeSinceLastSave();
      if (timeSince) {
        elements.saveStatus.textContent = 'Saved ' + timeSince;
        elements.saveStatus.className = 'save-status save-status--saved';
      } else {
        elements.saveStatus.textContent = '';
        elements.saveStatus.className = 'save-status';
      }
    }
  }

  function showToast(message, type) {
    elements.toast.textContent = message;
    elements.toast.className = 'toast toast--visible';
    if (type) elements.toast.classList.add('toast--' + type);
    setTimeout(function() {
      elements.toast.classList.remove('toast--visible');
    }, 2500);
  }

  function showModal(title, message, onConfirm) {
    elements.modalTitle.textContent = title;
    elements.modalMessage.textContent = message;
    elements.modalOverlay.classList.add('modal-overlay--visible');

    var newConfirm = elements.modalConfirm.cloneNode(true);
    elements.modalConfirm.parentNode.replaceChild(newConfirm, elements.modalConfirm);
    elements.modalConfirm = newConfirm;

    elements.modalConfirm.addEventListener('click', function() {
      hideModal();
      if (typeof onConfirm === 'function') onConfirm();
    });
  }

  function hideModal() {
    elements.modalOverlay.classList.remove('modal-overlay--visible');
  }

  function formatDate(date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return month + '/' + day + ' ' + hours + ':' + minutes + ' ' + ampm;
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
  }

  return {
    init: init
  };
})();

document.addEventListener('DOMContentLoaded', function() {
  App.init();
});
