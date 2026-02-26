/* ============================================
   Dynamic Form Renderer
   v2 — Pre-Purchase Assessment upgrades
   Adds: report type selector, repair cost fields,
         condition rating, filtered PDF data
   ============================================ */

var FormRenderer = (function() {

  var sectionPhotos = {};
  var signatureData = { technician: null, customer: null };

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
        '<div class="customer-info__title">Job / Site Information</div>' +

        // Report type selector
        '<div class="form-row">' +
          '<div class="form-group">' +
            '<label class="form-label" for="ci-report-type">Report Type</label>' +
            '<select class="form-input" id="ci-report-type" name="reportType">' +
              '<option value="pre_purchase" selected>Pre-Purchase Equipment Assessment</option>' +
              '<option value="inspection">Equipment Inspection Report</option>' +
              '<option value="service">Service Report</option>' +
              '<option value="maintenance">Preventive Maintenance Report</option>' +
            '</select>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label form-label--required" for="ci-date">Assessment Date</label>' +
            '<input class="form-input" type="date" id="ci-date" name="inspectionDate" value="' + today + '">' +
          '</div>' +
        '</div>' +

        '<div class="form-row">' +
          '<div class="form-group">' +
            '<label class="form-label form-label--required" for="ci-customer-name">Prepared For</label>' +
            '<input class="form-input" type="text" id="ci-customer-name" name="customerName" autocomplete="organization" placeholder="e.g. Theresa Englbrecht / Buyer Name">' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label form-label--required" for="ci-location">Property / Site Address</label>' +
            '<input class="form-input" type="text" id="ci-location" name="location" autocomplete="street-address" placeholder="e.g. 753 Horizon Court, Grand Junction, CO">' +
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
            '<label class="form-label" for="ci-age">Approx. Unit Age / Year</label>' +
            '<input class="form-input" type="text" id="ci-age" name="unitAge" placeholder="e.g. 2017 or ~8 years">' +
          '</div>' +
        '</div>' +

        '<div class="form-row">' +
          '<div class="form-group">' +
            '<label class="form-label form-label--required" for="ci-technician">Technician</label>' +
            '<input class="form-input" type="text" id="ci-technician" name="technician" autocomplete="name" placeholder="e.g. Kris" value="Kris">' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="ci-email">Customer Email</label>' +
            '<input class="form-input" type="email" id="ci-email" name="customerEmail" autocomplete="email" placeholder="e.g. agent@broker.com">' +
          '</div>' +
        '</div>' +

        // Equipment overall condition
        '<div class="form-row">' +
          '<div class="form-group">' +
            '<label class="form-label" for="ci-condition">Overall Equipment Condition</label>' +
            '<select class="form-input" id="ci-condition" name="overallCondition">' +
              '<option value="">— Select —</option>' +
              '<option value="Good">Good — Operational, minimal issues</option>' +
              '<option value="Fair">Fair — Operational, service recommended</option>' +
              '<option value="Poor">Poor — Operational but needs significant repair</option>' +
              '<option value="Non-Functional">Non-Functional — Not operating</option>' +
              '<option value="End of Life">End of Life — Recommend replacement</option>' +
            '</select>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="ci-total-repair-cost">Total Estimated Repair Cost</label>' +
            '<input class="form-input" type="text" id="ci-total-repair-cost" name="totalRepairCost" placeholder="e.g. $1,200 – $1,800">' +
          '</div>' +
        '</div>' +

      '</div>';

    container.innerHTML = html;
  }

  function renderInspectionForm(equipmentType, config, container) {
    sectionPhotos = {};
    var html = '';

    for (var i = 0; i < config.sections.length; i++) {
      sectionPhotos[config.sections[i].id] = [];
      html += renderSection(config.sections[i], i === 0);
    }

    // Technician summary
    html +=
      '<div class="technician-summary">' +
        '<div class="technician-summary__title">Technician Assessment Summary</div>' +
        '<div class="form-group">' +
          '<textarea class="form-textarea" id="technician-summary" name="technicianSummary" rows="5" ' +
          'placeholder="Overall findings, condition assessment, specific concerns, repair recommendations, urgency, follow-up items..."></textarea>' +
        '</div>' +
      '</div>';

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

    if (section.extraFields && section.extraFields.length > 0) {
      html += '<div class="section-extra-fields">';
      for (var j = 0; j < section.extraFields.length; j++) {
        html += renderExtraField(section.id, section.extraFields[j]);
      }
      html += '</div>';
    }

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

    html += '</div></div></div>';
    return html;
  }

  var LABOR_RATE = 125;

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
    } else if (field.type === 'text' && field.id === 'repair_cost_estimate') {
      html +=
        '<div class="cost-line-items" data-section="' + sectionId + '" data-extra="repair_cost_estimate">' +
          '<div class="cost-line-items__header">\uD83D\uDCB2 Repair Cost Estimate</div>' +
          '<div class="cost-rows" id="cost-rows-' + sectionId + '"></div>' +
          '<button type="button" class="btn btn--small" data-add-cost-row="' + sectionId + '">+ Add Item</button>' +
          '<div class="cost-total">Total: <span id="cost-total-' + sectionId + '">$0.00</span></div>' +
        '</div>';
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

  function renderCostRow(sectionId) {
    var rowId = 'cost-row-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4);
    return '<div class="cost-row" id="' + rowId + '">' +
      '<input type="text" placeholder="Description" class="cost-desc">' +
      '<input type="number" placeholder="Parts $" class="cost-parts" min="0" step="0.01">' +
      '<input type="number" placeholder="Labor hrs" class="cost-labor-hrs" min="0" step="0.25">' +
      '<span class="cost-labor-rate">x $' + LABOR_RATE + '/hr =</span>' +
      '<span class="cost-row-total">$0.00</span>' +
      '<button type="button" class="cost-row-delete" data-delete-cost-row="' + rowId + '" data-cost-section="' + sectionId + '">&times;</button>' +
    '</div>';
  }

  function addCostRow(sectionId) {
    var container = document.getElementById('cost-rows-' + sectionId);
    if (!container) return;
    var div = document.createElement('div');
    div.innerHTML = renderCostRow(sectionId);
    container.appendChild(div.firstChild);
    recalcCostTotal(sectionId);
  }

  function recalcCostTotal(sectionId) {
    var container = document.getElementById('cost-rows-' + sectionId);
    var totalEl = document.getElementById('cost-total-' + sectionId);
    if (!container || !totalEl) return;
    var rows = container.querySelectorAll('.cost-row');
    var total = 0;
    for (var i = 0; i < rows.length; i++) {
      var parts = parseFloat(rows[i].querySelector('.cost-parts').value) || 0;
      var laborHrs = parseFloat(rows[i].querySelector('.cost-labor-hrs').value) || 0;
      var rowTotal = parts + (laborHrs * LABOR_RATE);
      rows[i].querySelector('.cost-row-total').textContent = '$' + rowTotal.toFixed(2);
      total += rowTotal;
    }
    totalEl.textContent = '$' + total.toFixed(2);
    InspectionStorage.markUnsaved();
  }

  function collectCostLineItems(sectionId) {
    var container = document.getElementById('cost-rows-' + sectionId);
    if (!container) return { items: [], total: 0 };
    var rows = container.querySelectorAll('.cost-row');
    var items = [];
    var total = 0;
    for (var i = 0; i < rows.length; i++) {
      var desc = rows[i].querySelector('.cost-desc').value.trim();
      var parts = parseFloat(rows[i].querySelector('.cost-parts').value) || 0;
      var laborHrs = parseFloat(rows[i].querySelector('.cost-labor-hrs').value) || 0;
      if (desc || parts || laborHrs) {
        items.push({ description: desc, parts: parts, labor: laborHrs });
        total += parts + (laborHrs * LABOR_RATE);
      }
    }
    return { items: items, total: total };
  }

  function populateCostLineItems(sectionId, jsonStr, totalAmount) {
    var container = document.getElementById('cost-rows-' + sectionId);
    if (!container) return;
    try {
      var items = JSON.parse(jsonStr);
      for (var i = 0; i < items.length; i++) {
        var div = document.createElement('div');
        div.innerHTML = renderCostRow(sectionId);
        var row = div.firstChild;
        row.querySelector('.cost-desc').value = items[i].description || '';
        row.querySelector('.cost-parts').value = items[i].parts || '';
        row.querySelector('.cost-labor-hrs').value = items[i].labor || '';
        var rowTotal = (items[i].parts || 0) + ((items[i].labor || 0) * LABOR_RATE);
        row.querySelector('.cost-row-total').textContent = '$' + rowTotal.toFixed(2);
        container.appendChild(row);
      }
      var totalEl = document.getElementById('cost-total-' + sectionId);
      if (totalEl && totalAmount !== undefined) totalEl.textContent = '$' + parseFloat(totalAmount).toFixed(2);
    } catch(e) {}
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
          '<div class="signature-block__label">Customer / Client Signature</div>' +
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
    var photo = { id: generatePhotoId(), dataUrl: dataUrl, caption: '' };
    sectionPhotos[sectionId].push(photo);
    renderPhotoGrid(sectionId);
    InspectionStorage.markUnsaved();
    return photo;
  }

  function removePhotoFromSection(sectionId, photoId) {
    if (!sectionPhotos[sectionId]) return;
    sectionPhotos[sectionId] = sectionPhotos[sectionId].filter(function(p) { return p.id !== photoId; });
    renderPhotoGrid(sectionId);
    InspectionStorage.markUnsaved();
  }

  function updatePhotoCaption(sectionId, photoId, caption) {
    if (!sectionPhotos[sectionId]) return;
    for (var i = 0; i < sectionPhotos[sectionId].length; i++) {
      if (sectionPhotos[sectionId][i].id === photoId) {
        sectionPhotos[sectionId][i].caption = caption;
        InspectionStorage.markUnsaved();
        break;
      }
    }
  }

  function renderPhotoGrid(sectionId) {
    var grid = document.getElementById('photo-grid-' + sectionId);
    if (!grid) return;
    var photos = sectionPhotos[sectionId] || [];
    if (photos.length === 0) { grid.innerHTML = ''; return; }
    var html = '';
    for (var i = 0; i < photos.length; i++) {
      html +=
        '<div class="photo-thumb">' +
          '<img src="' + photos[i].dataUrl + '" alt="Photo ' + (i + 1) + '">' +
          '<input type="text" class="photo-caption-input" placeholder="Caption (optional)" ' +
          'data-photo-id="' + photos[i].id + '" data-photo-section="' + sectionId + '" ' +
          'value="' + escapeHtml(photos[i].caption || '') + '">' +
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
        var width = img.width, height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) { height = Math.round(height * maxDim / width); width = maxDim; }
          else { width = Math.round(width * maxDim / height); height = maxDim; }
        }
        canvas.width = width; canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        callback(canvas.toDataURL('image/jpeg', 0.6));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function generatePhotoId() {
    return 'p_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
  }

  // --- Signature Management ---

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

    // Customer info - extended fields
    var customerFields = ['customerName', 'location', 'manufacturer', 'modelNumber', 'serialNumber',
                          'inspectionDate', 'technician', 'customerEmail', 'reportType',
                          'overallCondition', 'totalRepairCost', 'unitAge'];
    for (var i = 0; i < customerFields.length; i++) {
      var input = document.querySelector('[name="' + customerFields[i] + '"]');
      if (input) data.customerInfo[customerFields[i]] = input.value;
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

      var checkboxes = sectionEl.querySelectorAll('.checklist-checkbox:checked');
      for (var c = 0; c < checkboxes.length; c++) {
        sectionData.checkedItems.push(checkboxes[c].getAttribute('data-item'));
      }

      var extras = sectionEl.querySelectorAll('[data-extra]');
      for (var e = 0; e < extras.length; e++) {
        var el = extras[e];
        var extraId = el.getAttribute('data-extra');
        if (el.type === 'radio') {
          if (el.checked) sectionData.extraFields[extraId] = el.value;
        } else if (el.classList && el.classList.contains('cost-line-items')) {
          // handled below
        } else {
          sectionData.extraFields[extraId] = el.value;
        }
      }

      // Collect cost line items if present
      var costContainer = sectionEl.querySelector('.cost-line-items');
      if (costContainer) {
        var costSectionId = costContainer.getAttribute('data-section');
        var costData = collectCostLineItems(costSectionId);
        sectionData.extraFields['repair_cost_estimate'] = JSON.stringify(costData.items);
        sectionData.extraFields['repair_cost_total'] = costData.total;
      }

      var notesEl = sectionEl.querySelector('[data-field="notes"]');
      if (notesEl) sectionData.notes = notesEl.value;

      data.sections[sectionId] = sectionData;
    }

    var summaryEl = document.getElementById('technician-summary');
    if (summaryEl) data.technicianSummary = summaryEl.value;

    var today = new Date().toISOString().split('T')[0];
    if (signatureData.technician) data.signatures.technician = { dataUrl: signatureData.technician, date: today };
    if (signatureData.customer) data.signatures.customer = { dataUrl: signatureData.customer, date: today };

    return data;
  }

  function populateForm(data) {
    if (!data) return;

    if (data.customerInfo) {
      var fields = Object.keys(data.customerInfo);
      for (var i = 0; i < fields.length; i++) {
        var input = document.querySelector('[name="' + fields[i] + '"]');
        if (input && data.customerInfo[fields[i]]) input.value = data.customerInfo[fields[i]];
      }
    }

    if (data.sections) {
      var sectionIds = Object.keys(data.sections);
      for (var s = 0; s < sectionIds.length; s++) {
        var sectionId = sectionIds[s];
        var sectionData = data.sections[sectionId];
        var sectionEl = document.querySelector('[data-section-id="' + sectionId + '"]');
        if (!sectionEl) continue;

        if (sectionData.checkedItems) {
          for (var c = 0; c < sectionData.checkedItems.length; c++) {
            var checkbox = sectionEl.querySelector('[data-item="' + sectionData.checkedItems[c] + '"]');
            if (checkbox) checkbox.checked = true;
          }
        }

        if (sectionData.extraFields) {
          var extraKeys = Object.keys(sectionData.extraFields);
          for (var e = 0; e < extraKeys.length; e++) {
            var extraId = extraKeys[e];
            var value = sectionData.extraFields[extraId];
            if (value === undefined || value === null || value === '') continue;
            if (extraId === 'repair_cost_estimate') {
              populateCostLineItems(sectionId, value, sectionData.extraFields['repair_cost_total']);
              continue;
            }
            if (extraId === 'repair_cost_total') continue;
            var radio = sectionEl.querySelector('input[type="radio"][data-extra="' + extraId + '"][value="' + value + '"]');
            if (radio) { radio.checked = true; continue; }
            var textInput = sectionEl.querySelector('input[type="text"][data-extra="' + extraId + '"]');
            if (textInput) textInput.value = value;
          }
        }

        if (sectionData.notes) {
          var notesEl = sectionEl.querySelector('[data-field="notes"]');
          if (notesEl) notesEl.value = sectionData.notes;
        }

        if (sectionData.photos && sectionData.photos.length > 0) {
          sectionPhotos[sectionId] = sectionData.photos;
          renderPhotoGrid(sectionId);
        }
      }
    }

    if (data.technicianSummary) {
      var summaryEl = document.getElementById('technician-summary');
      if (summaryEl) summaryEl.value = data.technicianSummary;
    }

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
    updatePhotoCaption: updatePhotoCaption,
    compressImage: compressImage,
    addCostRow: addCostRow,
    recalcCostTotal: recalcCostTotal,
    setSignatureData: setSignatureData,
    clearSignatureData: clearSignatureData
  };
})();
