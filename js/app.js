/* ============================================
   Main Application Logic
   State management, navigation, event wiring
   Phase 2: photos, signatures, history, email
   ============================================ */

var App = (function() {
  var state = {
    currentScreen: 'landing',
    currentEquipmentType: null,
    historyViewIndex: -1
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
        var data = FormRenderer.collectFormData(state.currentEquipmentType);
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
        navigateToHistoryDetail(index);
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

    FormRenderer.renderCustomerInfo(elements.customerInfoContainer);
    FormRenderer.renderInspectionForm(equipmentType, config, elements.formSectionsContainer);

    // Hide post-PDF actions on form load
    if (elements.postPdfActions) elements.postPdfActions.classList.remove('post-pdf-actions--visible');

    if (existingData) {
      FormRenderer.populateForm(existingData);
    } else {
      var data = FormRenderer.collectFormData(equipmentType);
      data.inspectionId = InspectionStorage.generateId();
      data.timestamp = new Date().toISOString();
      InspectionStorage.saveInspection(data);
    }

    InspectionStorage.startAutoSave(function() {
      return FormRenderer.collectFormData(state.currentEquipmentType);
    });

    navigateToForm();
  }

  function manualSave() {
    var data = FormRenderer.collectFormData(state.currentEquipmentType);
    if (InspectionStorage.saveInspection(data)) {
      showToast('Inspection saved!', 'success');
      updateSaveStatus();
    } else {
      showToast('Save failed', 'error');
    }
  }

  function generatePdf() {
    var data = FormRenderer.collectFormData(state.currentEquipmentType);
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
    var data = FormRenderer.collectFormData(state.currentEquipmentType);
    if (InspectionStorage.archiveInspection(data)) {
      FormRenderer.resetState();
      navigateToLanding();
      showToast('Inspection archived!', 'success');
    } else {
      showToast('Archive failed', 'error');
    }
  }

  function emailCurrentInspection() {
    var data = FormRenderer.collectFormData(state.currentEquipmentType);
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

    hideAllScreens();
    state.currentScreen = 'history-detail';
    elements.historyDetailScreen.classList.add('screen--active');
    elements.btnBack.classList.add('btn-back--visible');
    renderHistoryDetail(list[index]);
    window.scrollTo(0, 0);
  }

  function navigateBack() {
    if (state.currentScreen === 'form') {
      if (state.currentEquipmentType) {
        var data = FormRenderer.collectFormData(state.currentEquipmentType);
        InspectionStorage.saveInspection(data);
      }
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
  }

  // --- History Rendering ---

  function renderHistoryList(filter) {
    var list = InspectionStorage.getInspectionList();
    var filterLower = (filter || '').toLowerCase();

    if (list.length === 0) {
      elements.historyListContainer.innerHTML =
        '<div class="empty-state">' +
          '<div class="empty-state__icon">&#128203;</div>' +
          '<div class="empty-state__text">No completed inspections yet.<br>Archived inspections will appear here.</div>' +
        '</div>';
      return;
    }

    var html = '';
    var shown = 0;
    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      var equipConfig = EQUIPMENT_TYPES[item.equipmentType];
      var typeName = equipConfig ? equipConfig.name : item.equipmentType;
      var icon = equipConfig ? equipConfig.icon : '';
      var customer = (item.customerInfo && item.customerInfo.customerName) || 'Unknown';
      var location = (item.customerInfo && item.customerInfo.location) || '';
      var tech = (item.customerInfo && item.customerInfo.technician) || '';
      var dateStr = item.completedAt ? formatDate(new Date(item.completedAt)) :
                    (item.customerInfo && item.customerInfo.inspectionDate) || '';

      // Filter
      if (filterLower) {
        var searchText = (typeName + ' ' + customer + ' ' + location + ' ' + tech + ' ' + dateStr).toLowerCase();
        if (searchText.indexOf(filterLower) === -1) continue;
      }

      html +=
        '<div class="history-card" data-history-index="' + i + '">' +
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

  function buildDetailRow(label, value) {
    if (!value) return '';
    return '<div class="history-detail__row">' +
      '<span class="history-detail__label">' + escapeHtml(label) + '</span>' +
      '<span class="history-detail__value">' + escapeHtml(value) + '</span>' +
      '</div>';
  }

  function downloadHistoryPdf() {
    var list = InspectionStorage.getInspectionList();
    if (state.historyViewIndex < 0 || state.historyViewIndex >= list.length) return;
    var data = list[state.historyViewIndex];

    showToast('Generating PDF...', '');
    PDFGenerator.generate(data).then(function(filename) {
      showToast('PDF saved: ' + filename, 'success');
    }).catch(function(err) {
      showToast(typeof err === 'string' ? err : 'PDF generation failed', 'error');
    });
  }

  function emailFromHistory() {
    var list = InspectionStorage.getInspectionList();
    if (state.historyViewIndex < 0 || state.historyViewIndex >= list.length) return;
    sendEmailReport(list[state.historyViewIndex]);
  }

  function deleteHistoryItem() {
    showModal('Delete Inspection?', 'This will permanently delete this inspection from history.', function() {
      var list = InspectionStorage.getInspectionList();
      if (state.historyViewIndex >= 0 && state.historyViewIndex < list.length) {
        list.splice(state.historyViewIndex, 1);
        try {
          localStorage.setItem('ccr_inspection_history', JSON.stringify(list));
        } catch (e) {}
        navigateToHistory();
        showToast('Inspection deleted', 'success');
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
