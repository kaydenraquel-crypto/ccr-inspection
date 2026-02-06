/* ============================================
   Dynamic Form Renderer
   Generates inspection forms from equipment config
   Includes photo capture and signature support
   ============================================ */

var FormRenderer = (function() {

  // Track photos per section in memory (synced via collect/populate)
  var sectionPhotos = {};

  function renderEquipmentSelector(types, container) {
    var html = '';
    var keys = Object.keys(types);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var type = types[key];
      html += '<button class="equipment-card" data-type="' + key + '" type="button">' +
        '<span class="equipment-card__icon">' + type.icon + '</span>' +
        '<span class="equipment-card__name">' + escapeHtml(type.name) + '</span>' +
        '</button>';
    }
    container.innerHTML = html;
  }

  function renderCustomerInfo(container) {
    var today = new Date().toISOString().split('T')[0];
    var html =
      '<div class="customer-info">' +
        '<div class="customer-info__title">Customer / Site Information</div>' +
        '<div class="form-row">' +
          '<div class="form-group">' +
            '<label class="form-label form-label--required" for="ci-customer-name">Customer Name</label>' +
            '<input class="form-input" type="text" id="ci-customer-name" name="customerName" autocomplete="organization" placeholder="e.g. Einstein Bagels">' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label form-label--required" for="ci-location">Location</label>' +
            '<input class="form-input" type="text" id="ci-location" name="location" autocomplete="street-address" placeholder="e.g. 123 Main St, Grand Junction, CO">' +
          '</div>' +
        '</div>' +
        '<div class="form-row">' +
          '<div class="form-group">' +
            '<label class="form-label" for="ci-manufacturer">Manufacturer</label>' +
            '<input class="form-input" type="text" id="ci-manufacturer" name="manufacturer" placeholder="e.g. Kolpak, Hoshizaki">' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="ci-model">Model Number</label>' +
            '<input class="form-input" type="text" id="ci-model" name="modelNumber" placeholder="e.g. KF7-0810-FR">' +
          '</div>' +
        '</div>' +
        '<div class="form-row">' +
          '<div class="form-group">' +
            '<label class="form-label" for="ci-serial">Serial Number</label>' +
            '<input class="form-input" type="text" id="ci-serial" name="serialNumber" placeholder="e.g. 12345">' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label form-label--required" for="ci-date">Inspection Date</label>' +
            '<input class="form-input" type="date" id="ci-date" name="inspectionDate" value="' + today + '">' +
          '</div>' +
        '</div>' +
        '<div class="form-row">' +
          '<div class="form-group">' +
            '<label class="form-label form-label--required" for="ci-technician">Technician Name</label>' +
            '<input class="form-input" type="text" id="ci-technician" name="technician" autocomplete="name" placeholder="e.g. Kris">' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="ci-email">Customer Email</label>' +
            '<input class="form-input" type="email" id="ci-email" name="customerEmail" autocomplete="email" placeholder="e.g. manager@restaurant.com">' +
          '</div>' +
        '</div>' +
      '</div>';

    container.innerHTML = html;
  }

  function renderInspectionForm(equipmentType, config, container) {
    sectionPhotos = {};
    var html = '';

    // Render each section
    for (var i = 0; i < config.sections.length; i++) {
      sectionPhotos[config.sections[i].id] = [];
      html += renderSection(config.sections[i], i === 0);
    }

    // Technician summary
    html +=
      '<div class="technician-summary">' +
        '<div class="technician-summary__title">Technician Summary / Notes</div>' +
        '<div class="form-group">' +
          '<textarea class="form-textarea" id="technician-summary" name="technicianSummary" rows="4" ' +
          'placeholder="Overall findings, recommendations, follow-up needed..."></textarea>' +
        '</div>' +
      '</div>';

    // Signature section
    html += renderSignatureSection();

    container.innerHTML = html;
  }

  function renderSection(section, startOpen) {
    var openClass = startOpen ? ' inspection-section--open' : '';
    var html =
      '<div class="inspection-section' + openClass + '" data-section-id="' + section.id + '">' +
        '<button class="section-header" type="button" aria-expanded="' + (startOpen ? 'true' : 'false') + '">' +
          '<span>' +
            '<span class="section-header__title">' + escapeHtml(section.title) + '</span>' +
            '<span class="section-header__count">(' + section.items.length + ' items)</span>' +
          '</span>' +
          '<span class="section-header__chevron">&#9660;</span>' +
        '</button>' +
        '<div class="section-body">' +
          '<div class="section-body__inner">';

    // Checklist items
    for (var i = 0; i < section.items.length; i++) {
      var item = section.items[i];
      var inputId = 'check-' + section.id + '-' + item.id;
      html +=
        '<div class="checklist-item">' +
          '<input type="checkbox" class="checklist-checkbox" id="' + inputId + '" ' +
          'data-section="' + section.id + '" data-item="' + item.id + '">' +
          '<label class="checklist-label" for="' + inputId + '">' + escapeHtml(item.label) + '</label>' +
        '</div>';
    }

    // Extra fields
    if (section.extraFields && section.extraFields.length > 0) {
      html += '<div class="section-extra-fields">';
      for (var j = 0; j < section.extraFields.length; j++) {
        html += renderExtraField(section.id, section.extraFields[j]);
      }
      html += '</div>';
    }

    // Notes field
    if (section.notesField) {
      html +=
        '<div class="section-notes">' +
          '<label class="form-label" for="notes-' + section.id + '">Notes</label>' +
          '<textarea class="form-textarea" id="notes-' + section.id + '" ' +
          'data-section="' + section.id + '" data-field="notes" ' +
          'placeholder="Additional notes for this section..." rows="2"></textarea>' +
        '</div>';
    }

    // Photo section
    html +=
      '<div class="photo-section" data-photo-section="' + section.id + '">' +
        '<div class="photo-grid" id="photo-grid-' + section.id + '"></div>' +
        '<label class="photo-add-btn">' +
          '&#128247; Add Photo' +
          '<input type="file" class="photo-file-input" accept="image/*" capture="environment" ' +
          'data-photo-for="' + section.id + '">' +
        '</label>' +
      '</div>';

    html +=
          '</div>' +
        '</div>' +
      '</div>';

    return html;
  }

  function renderExtraField(sectionId, field) {
    var html = '';
    var fieldId = 'extra-' + sectionId + '-' + field.id;

    if (field.type === 'radio') {
      html +=
        '<div class="radio-group">' +
          '<span class="radio-group__label">' + escapeHtml(field.label) + '</span>' +
          '<div class="radio-options">';
      for (var k = 0; k < field.options.length; k++) {
        var optionValue = field.options[k];
        var radioId = fieldId + '-' + k;
        html +=
          '<div class="radio-option">' +
            '<input type="radio" id="' + radioId + '" name="' + fieldId + '" value="' + escapeHtml(optionValue) + '" ' +
            'data-section="' + sectionId + '" data-extra="' + field.id + '">' +
            '<label class="radio-option__label" for="' + radioId + '">' + escapeHtml(optionValue) + '</label>' +
          '</div>';
      }
      html += '</div></div>';
    } else if (field.type === 'text') {
      html +=
        '<div class="form-group">' +
          '<label class="form-label" for="' + fieldId + '">' + escapeHtml(field.label) + '</label>' +
          '<input class="form-input" type="text" id="' + fieldId + '" ' +
          'data-section="' + sectionId + '" data-extra="' + field.id + '" ' +
          'placeholder="Enter ' + escapeHtml(field.label.toLowerCase()) + '">' +
        '</div>';
    }

    return html;
  }

  function renderSignatureSection() {
    return '<div class="signature-section">' +
      '<div class="signature-section__title">Signatures</div>' +
      '<div class="signature-row">' +
        '<div class="signature-block">' +
          '<div class="signature-block__label">Technician Signature</div>' +
          '<div class="signature-block__pad" id="sig-technician-pad" data-sig="technician">' +
            '<span class="signature-block__placeholder">Tap to sign</span>' +
          '</div>' +
        '</div>' +
        '<div class="signature-block">' +
          '<div class="signature-block__label">Customer Signature</div>' +
          '<div class="signature-block__pad" id="sig-customer-pad" data-sig="customer">' +
            '<span class="signature-block__placeholder">Tap to sign</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  // --- Photo Management ---

  function addPhotoToSection(sectionId, dataUrl) {
    if (!sectionPhotos[sectionId]) sectionPhotos[sectionId] = [];
    var photo = {
      id: generatePhotoId(),
      dataUrl: dataUrl
    };
    sectionPhotos[sectionId].push(photo);
    renderPhotoGrid(sectionId);
    InspectionStorage.markUnsaved();
    return photo;
  }

  function removePhotoFromSection(sectionId, photoId) {
    if (!sectionPhotos[sectionId]) return;
    sectionPhotos[sectionId] = sectionPhotos[sectionId].filter(function(p) {
      return p.id !== photoId;
    });
    renderPhotoGrid(sectionId);
    InspectionStorage.markUnsaved();
  }

  function renderPhotoGrid(sectionId) {
    var grid = document.getElementById('photo-grid-' + sectionId);
    if (!grid) return;
    var photos = sectionPhotos[sectionId] || [];
    if (photos.length === 0) {
      grid.innerHTML = '';
      return;
    }
    var html = '';
    for (var i = 0; i < photos.length; i++) {
      html +=
        '<div class="photo-thumb">' +
          '<img src="' + photos[i].dataUrl + '" alt="Photo ' + (i + 1) + '">' +
          '<button type="button" class="photo-thumb__delete" data-delete-photo="' + photos[i].id + '" ' +
          'data-photo-section="' + sectionId + '">&times;</button>' +
        '</div>';
    }
    grid.innerHTML = html;
  }

  function compressImage(file, callback) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = new Image();
      img.onload = function() {
        var canvas = document.createElement('canvas');
        var maxDim = 800;
        var width = img.width;
        var height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round(height * maxDim / width);
            width = maxDim;
          } else {
            width = Math.round(width * maxDim / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        var dataUrl = canvas.toDataURL('image/jpeg', 0.6);
        callback(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function generatePhotoId() {
    return 'p_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
  }

  // --- Signature Management ---

  var signatureData = {
    technician: null,
    customer: null
  };

  function setSignatureData(type, dataUrl) {
    signatureData[type] = dataUrl;
    updateSignaturePreview(type);
    InspectionStorage.markUnsaved();
  }

  function clearSignatureData(type) {
    signatureData[type] = null;
    updateSignaturePreview(type);
    InspectionStorage.markUnsaved();
  }

  function updateSignaturePreview(type) {
    var pad = document.getElementById('sig-' + type + '-pad');
    if (!pad) return;
    if (signatureData[type]) {
      pad.classList.add('signature-block__pad--signed');
      pad.innerHTML =
        '<img class="signature-block__preview" src="' + signatureData[type] + '" alt="' + type + ' signature">' +
        '<button type="button" class="signature-block__clear" data-clear-sig="' + type + '">&times;</button>';
    } else {
      pad.classList.remove('signature-block__pad--signed');
      pad.innerHTML = '<span class="signature-block__placeholder">Tap to sign</span>';
    }
  }

  // --- Data Collection ---

  function collectFormData(equipmentType) {
    var data = {
      equipmentType: equipmentType,
      status: 'in_progress',
      customerInfo: {},
      sections: {},
      technicianSummary: '',
      signatures: {}
    };

    // Customer info
    var customerFields = ['customerName', 'location', 'manufacturer', 'modelNumber', 'serialNumber', 'inspectionDate', 'technician', 'customerEmail'];
    for (var i = 0; i < customerFields.length; i++) {
      var input = document.querySelector('[name="' + customerFields[i] + '"]');
      if (input) {
        data.customerInfo[customerFields[i]] = input.value;
      }
    }

    // Sections
    var sectionElements = document.querySelectorAll('.inspection-section');
    for (var s = 0; s < sectionElements.length; s++) {
      var sectionEl = sectionElements[s];
      var sectionId = sectionEl.getAttribute('data-section-id');
      if (!sectionId) continue;

      var sectionData = {
        checkedItems: [],
        extraFields: {},
        notes: '',
        photos: sectionPhotos[sectionId] || []
      };

      // Checked items
      var checkboxes = sectionEl.querySelectorAll('.checklist-checkbox:checked');
      for (var c = 0; c < checkboxes.length; c++) {
        sectionData.checkedItems.push(checkboxes[c].getAttribute('data-item'));
      }

      // Extra fields
      var extras = sectionEl.querySelectorAll('[data-extra]');
      for (var e = 0; e < extras.length; e++) {
        var el = extras[e];
        var extraId = el.getAttribute('data-extra');
        if (el.type === 'radio') {
          if (el.checked) {
            sectionData.extraFields[extraId] = el.value;
          }
        } else {
          sectionData.extraFields[extraId] = el.value;
        }
      }

      // Notes
      var notesEl = sectionEl.querySelector('[data-field="notes"]');
      if (notesEl) {
        sectionData.notes = notesEl.value;
      }

      data.sections[sectionId] = sectionData;
    }

    // Technician summary
    var summaryEl = document.getElementById('technician-summary');
    if (summaryEl) {
      data.technicianSummary = summaryEl.value;
    }

    // Signatures
    var today = new Date().toISOString().split('T')[0];
    if (signatureData.technician) {
      data.signatures.technician = { dataUrl: signatureData.technician, date: today };
    }
    if (signatureData.customer) {
      data.signatures.customer = { dataUrl: signatureData.customer, date: today };
    }

    return data;
  }

  function populateForm(data) {
    if (!data) return;

    // Customer info
    if (data.customerInfo) {
      var fields = Object.keys(data.customerInfo);
      for (var i = 0; i < fields.length; i++) {
        var input = document.querySelector('[name="' + fields[i] + '"]');
        if (input && data.customerInfo[fields[i]]) {
          input.value = data.customerInfo[fields[i]];
        }
      }
    }

    // Sections
    if (data.sections) {
      var sectionIds = Object.keys(data.sections);
      for (var s = 0; s < sectionIds.length; s++) {
        var sectionId = sectionIds[s];
        var sectionData = data.sections[sectionId];
        var sectionEl = document.querySelector('[data-section-id="' + sectionId + '"]');
        if (!sectionEl) continue;

        // Restore checked items
        if (sectionData.checkedItems) {
          for (var c = 0; c < sectionData.checkedItems.length; c++) {
            var checkbox = sectionEl.querySelector('[data-item="' + sectionData.checkedItems[c] + '"]');
            if (checkbox) checkbox.checked = true;
          }
        }

        // Restore extra fields
        if (sectionData.extraFields) {
          var extraKeys = Object.keys(sectionData.extraFields);
          for (var e = 0; e < extraKeys.length; e++) {
            var extraId = extraKeys[e];
            var value = sectionData.extraFields[extraId];
            if (!value) continue;
            var radio = sectionEl.querySelector('input[type="radio"][data-extra="' + extraId + '"][value="' + value + '"]');
            if (radio) {
              radio.checked = true;
              continue;
            }
            var textInput = sectionEl.querySelector('input[type="text"][data-extra="' + extraId + '"]');
            if (textInput) {
              textInput.value = value;
            }
          }
        }

        // Restore notes
        if (sectionData.notes) {
          var notesEl = sectionEl.querySelector('[data-field="notes"]');
          if (notesEl) notesEl.value = sectionData.notes;
        }

        // Restore photos
        if (sectionData.photos && sectionData.photos.length > 0) {
          sectionPhotos[sectionId] = sectionData.photos;
          renderPhotoGrid(sectionId);
        }
      }
    }

    // Technician summary
    if (data.technicianSummary) {
      var summaryEl = document.getElementById('technician-summary');
      if (summaryEl) summaryEl.value = data.technicianSummary;
    }

    // Restore signatures
    if (data.signatures) {
      if (data.signatures.technician && data.signatures.technician.dataUrl) {
        signatureData.technician = data.signatures.technician.dataUrl;
        updateSignaturePreview('technician');
      }
      if (data.signatures.customer && data.signatures.customer.dataUrl) {
        signatureData.customer = data.signatures.customer.dataUrl;
        updateSignaturePreview('customer');
      }
    }
  }

  function resetState() {
    sectionPhotos = {};
    signatureData = { technician: null, customer: null };
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
  }

  return {
    renderEquipmentSelector: renderEquipmentSelector,
    renderCustomerInfo: renderCustomerInfo,
    renderInspectionForm: renderInspectionForm,
    collectFormData: collectFormData,
    populateForm: populateForm,
    resetState: resetState,
    addPhotoToSection: addPhotoToSection,
    removePhotoFromSection: removePhotoFromSection,
    compressImage: compressImage,
    setSignatureData: setSignatureData,
    clearSignatureData: clearSignatureData
  };
})();
