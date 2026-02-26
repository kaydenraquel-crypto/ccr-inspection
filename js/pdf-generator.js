/* ============================================
   PDF Generator v2
   Pre-Purchase Assessment upgrades:
   - Report type branding
   - Cover / summary page with condition table
   - Skip empty sections
   - Repair cost lines
   - Cleaner section formatting
   ============================================ */

var PDFGenerator = (function() {
  var COLORS = {
    primary:   [23, 73, 79],      // #17494F teal
    accent:    [245, 194, 87],    // #F5C257 gold
    white:     [255, 255, 255],
    lightGray: [245, 245, 245],
    midGray:   [220, 220, 220],
    text:      [51, 51, 51],
    textLight: [102, 102, 102],
    success:   [40, 167, 69],
    warning:   [255, 165, 0],
    error:     [220, 53, 69],
    condGood:  [40, 167, 69],
    condFair:  [255, 165, 0],
    condPoor:  [220, 53, 69]
  };

  var PAGE_MARGIN = 14;

  var REPORT_TYPE_LABELS = {
    'pre_purchase': 'Pre-Purchase Equipment Assessment',
    'inspection':   'Equipment Inspection Report',
    'service':      'Service Report',
    'maintenance':  'Preventive Maintenance Report'
  };

  function getLogo() {
    if (typeof CCR_LOGO_BASE64 !== 'undefined' && CCR_LOGO_BASE64) return CCR_LOGO_BASE64;
    return null;
  }

  function validateRequiredFields(data) {
    var missing = [];
    if (!data.customerInfo) return ['Prepared For', 'Location', 'Date', 'Technician'];
    if (!data.customerInfo.customerName || !data.customerInfo.customerName.trim()) missing.push('Prepared For');
    if (!data.customerInfo.location || !data.customerInfo.location.trim()) missing.push('Location');
    if (!data.customerInfo.inspectionDate || !data.customerInfo.inspectionDate.trim()) missing.push('Date');
    if (!data.customerInfo.technician || !data.customerInfo.technician.trim()) missing.push('Technician');
    return missing;
  }

  function generateFilename(data) {
    var type = 'Equipment';
    if (data.equipmentType && EQUIPMENT_TYPES[data.equipmentType]) {
      type = EQUIPMENT_TYPES[data.equipmentType].name.replace(/[^a-zA-Z0-9]/g, '_');
    }
    var customer = 'Client';
    if (data.customerInfo && data.customerInfo.customerName) {
      customer = data.customerInfo.customerName.trim().replace(/[^a-zA-Z0-9]/g, '_');
    }
    var date = new Date().toISOString().split('T')[0];
    if (data.customerInfo && data.customerInfo.inspectionDate) date = data.customerInfo.inspectionDate;
    var prefix = (data.customerInfo && data.customerInfo.reportType === 'pre_purchase') ? 'CCR_Assessment_' : 'CCR_Inspection_';
    return prefix + type + '_' + customer + '_' + date + '.pdf';
  }

  function sectionHasData(sectionConfig, sectionData) {
    if (!sectionData) return false;
    if (sectionData.checkedItems && sectionData.checkedItems.length > 0) return true;
    if (sectionData.extraFields) {
      var keys = Object.keys(sectionData.extraFields);
      for (var i = 0; i < keys.length; i++) {
        if (sectionData.extraFields[keys[i]] && sectionData.extraFields[keys[i]].trim()) return true;
      }
    }
    if (sectionData.notes && sectionData.notes.trim()) return true;
    if (sectionData.photos && sectionData.photos.length > 0) return true;
    return false;
  }

  function getConditionColor(condition) {
    if (!condition) return COLORS.text;
    var c = condition.toLowerCase();
    if (c.indexOf('good') !== -1) return COLORS.condGood;
    if (c.indexOf('fair') !== -1) return COLORS.condFair;
    if (c.indexOf('poor') !== -1 || c.indexOf('non-func') !== -1 || c.indexOf('end of life') !== -1) return COLORS.condPoor;
    return COLORS.text;
  }

  function drawHeader(doc, pageWidth, logo, reportTypeLabel, equipmentName) {
    var PAGE_MARGIN = 14;

    // Header bar
    doc.setFillColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
    doc.rect(0, 0, pageWidth, 38, 'F');

    if (logo) {
      try { doc.addImage(logo, 'PNG', PAGE_MARGIN, 3, 32, 32); } catch(e) {}
    }

    var textX = logo ? 50 : PAGE_MARGIN;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(COLORS.accent[0], COLORS.accent[1], COLORS.accent[2]);
    doc.text('Colorado Commercial Repairs', textX, 15);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(COLORS.white[0], COLORS.white[1], COLORS.white[2]);
    doc.text(reportTypeLabel, textX, 22);
    doc.setFontSize(8);
    doc.text('cocomrepairs.com  |  970-778-5271  |  kristopher@cocomrepairs.com', textX, 29);
  }

  function drawFooter(doc, pageWidth, pageHeight, p, totalPages) {
    var PAGE_MARGIN = 14;
    doc.setDrawColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
    doc.setLineWidth(0.5);
    doc.line(PAGE_MARGIN, pageHeight - 12, pageWidth - PAGE_MARGIN, pageHeight - 12);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(COLORS.textLight[0], COLORS.textLight[1], COLORS.textLight[2]);
    doc.text('Colorado Commercial Repairs LLC  |  cocomrepairs.com  |  970-778-5271', PAGE_MARGIN, pageHeight - 8);
    doc.text('Page ' + p + ' of ' + totalPages, pageWidth - PAGE_MARGIN, pageHeight - 8, { align: 'right' });
    doc.setFontSize(6);
    doc.text('Generated: ' + new Date().toLocaleString(), PAGE_MARGIN, pageHeight - 5);
  }

  function checkNewPage(doc, y, pageHeight, needed) {
    needed = needed || 50;
    if (y > pageHeight - needed) {
      doc.addPage();
      return PAGE_MARGIN;
    }
    return y;
  }

  function renderEquipmentSections(doc, sections, equipmentConfig, y, pageWidth, pageHeight, contentWidth) {
    if (!equipmentConfig || !equipmentConfig.sections) return y;

    for (var i = 0; i < equipmentConfig.sections.length; i++) {
      var sectionConfig = equipmentConfig.sections[i];
      var sectionData = sections ? sections[sectionConfig.id] : null;

      if (!sectionHasData(sectionConfig, sectionData)) continue;

      y = checkNewPage(doc, y, pageHeight, 30);

      // Section title bar
      doc.setFillColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
      doc.rect(PAGE_MARGIN, y, contentWidth, 8, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(COLORS.white[0], COLORS.white[1], COLORS.white[2]);
      doc.text(sectionConfig.title, PAGE_MARGIN + 3, y + 5.5);
      y += 10;

      var checkedItems = (sectionData && sectionData.checkedItems) ? sectionData.checkedItems : [];
      var checklistRows = [];

      for (var j = 0; j < sectionConfig.items.length; j++) {
        var item = sectionConfig.items[j];
        var isChecked = checkedItems.indexOf(item.id) !== -1;
        var isActionSection = sectionConfig.id === 'recommended_actions';
        if (isChecked || !isActionSection) {
          checklistRows.push([isChecked ? 'PASS' : 'FAIL', item.label, isChecked]);
        }
      }

      var rowsToShow = checklistRows;
      if (sectionConfig.id === 'recommended_actions') {
        rowsToShow = checklistRows.filter(function(r) { return r[2]; });
      }

      if (rowsToShow.length > 0) {
        var tableBody = rowsToShow.map(function(r) { return [r[0], r[1]]; });
        doc.autoTable({
          startY: y,
          body: tableBody,
          margin: { left: PAGE_MARGIN, right: PAGE_MARGIN },
          theme: 'plain',
          bodyStyles: { fontSize: 8.5, textColor: COLORS.text, cellPadding: { top: 1.5, bottom: 1.5, left: 2, right: 2 } },
          columnStyles: { 0: { cellWidth: 14, halign: 'center', fontSize: 8 }, 1: { cellWidth: contentWidth - 14 } },
          didDrawCell: function(hookData) {
            if (hookData.column.index !== 0) return;
            var cell = hookData.cell;
            var val = cell.raw;
            var cx = cell.x + cell.width / 2;
            var cy = cell.y + cell.height / 2;
            doc.setFillColor(255, 255, 255);
            doc.rect(cell.x, cell.y, cell.width, cell.height, 'F');
            if (val === 'PASS') {
              doc.setDrawColor(COLORS.success[0], COLORS.success[1], COLORS.success[2]);
              doc.setLineWidth(0.6);
              doc.line(cx - 2.5, cy, cx - 0.5, cy + 2);
              doc.line(cx - 0.5, cy + 2, cx + 3, cy - 1.5);
            } else {
              doc.setDrawColor(COLORS.error[0], COLORS.error[1], COLORS.error[2]);
              doc.setLineWidth(0.6);
              doc.line(cx - 2, cy - 2, cx + 2, cy + 2);
              doc.line(cx + 2, cy - 2, cx - 2, cy + 2);
            }
          }
        });
        y = doc.lastAutoTable.finalY + 2;
      }

      // Extra fields
      if (sectionConfig.extraFields && sectionData && sectionData.extraFields) {
        var extraRows = [];
        for (var k = 0; k < sectionConfig.extraFields.length; k++) {
          var field = sectionConfig.extraFields[k];
          if (field.id === 'repair_cost_estimate') {
            var costJson = sectionData.extraFields['repair_cost_estimate'];
            var costTotal = sectionData.extraFields['repair_cost_total'];
            if (costJson) {
              try {
                var lineItems = JSON.parse(costJson);
                if (lineItems && lineItems.length > 0) {
                  y = checkNewPage(doc, y, pageHeight, 30);
                  var costTableBody = lineItems.map(function(li) {
                    var laborCost = (li.labor || 0) * 125;
                    var rowTotal = (li.parts || 0) + laborCost;
                    return [
                      li.description || '',
                      '$' + (li.parts || 0).toFixed(2),
                      (li.labor || 0) + ' hrs',
                      '$' + rowTotal.toFixed(2)
                    ];
                  });
                  var totalRow = ['', '', 'TOTAL', '$' + (parseFloat(costTotal) || 0).toFixed(2)];
                  doc.autoTable({
                    startY: y,
                    head: [['Description', 'Parts', 'Labor', 'Total']],
                    body: costTableBody,
                    foot: [totalRow],
                    margin: { left: PAGE_MARGIN, right: PAGE_MARGIN },
                    theme: 'grid',
                    headStyles: { fillColor: COLORS.primary, textColor: COLORS.white, fontSize: 8, fontStyle: 'bold' },
                    bodyStyles: { fontSize: 8, textColor: COLORS.text, cellPadding: 2 },
                    footStyles: { fillColor: COLORS.lightGray, textColor: COLORS.error, fontSize: 9, fontStyle: 'bold' },
                    columnStyles: {
                      0: { cellWidth: contentWidth - 60 },
                      1: { cellWidth: 20, halign: 'right' },
                      2: { cellWidth: 20, halign: 'right' },
                      3: { cellWidth: 20, halign: 'right' }
                    }
                  });
                  y = doc.lastAutoTable.finalY + 2;
                }
              } catch(e) {}
            }
            continue;
          }
          if (field.id === 'repair_cost_total') continue;
          var value = sectionData.extraFields[field.id];
          if (value !== undefined && value !== null && String(value).trim()) {
            extraRows.push([field.label, String(value)]);
          }
        }
        if (extraRows.length > 0) {
          doc.autoTable({
            startY: y,
            body: extraRows,
            margin: { left: PAGE_MARGIN, right: PAGE_MARGIN },
            theme: 'grid',
            bodyStyles: { fontSize: 8.5, textColor: COLORS.text, cellPadding: 2 },
            columnStyles: { 0: { cellWidth: 55, fontStyle: 'bold', fillColor: COLORS.lightGray } }
          });
          y = doc.lastAutoTable.finalY + 2;
        }
      }

      // Notes
      if (sectionData && sectionData.notes && sectionData.notes.trim()) {
        y = checkNewPage(doc, y, pageHeight, 20);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(COLORS.textLight[0], COLORS.textLight[1], COLORS.textLight[2]);
        doc.text('Notes:', PAGE_MARGIN + 2, y + 4);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(COLORS.text[0], COLORS.text[1], COLORS.text[2]);
        var noteLines = doc.splitTextToSize(sectionData.notes, contentWidth - 22);
        doc.text(noteLines, PAGE_MARGIN + 16, y + 4);
        y += 4 + (noteLines.length * 4) + 4;
      }

      // Photos
      if (sectionData && sectionData.photos && sectionData.photos.length > 0) {
        var photoWidth = 60;
        var photoHeight = 45;
        var photosPerRow = 2;
        var photoGap = 4;

        for (var ph = 0; ph < sectionData.photos.length; ph++) {
          var colIndex = ph % photosPerRow;
          if (colIndex === 0) {
            if (y + photoHeight + 10 > pageHeight - 15) {
              doc.addPage();
              y = PAGE_MARGIN;
            }
          }
          var photoX = PAGE_MARGIN + colIndex * (photoWidth + photoGap);
          try { doc.addImage(sectionData.photos[ph].dataUrl, 'JPEG', photoX, y, photoWidth, photoHeight); } catch(e) {}
          if (sectionData.photos[ph].caption) {
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(7);
            doc.setTextColor(100, 100, 100);
            doc.text(sectionData.photos[ph].caption, photoX, y + photoHeight + 3, { maxWidth: photoWidth });
          }
          if (colIndex === photosPerRow - 1 || ph === sectionData.photos.length - 1) {
            y += photoHeight + (sectionData.photos[ph].caption ? 8 : photoGap);
          }
        }
      }

      y += 4;
    }

    return y;
  }

  function generate(data) {
    var missing = validateRequiredFields(data);
    if (missing.length > 0) return Promise.reject('Please fill in required fields: ' + missing.join(', '));

    try {
      if (!window.jspdf || !window.jspdf.jsPDF) {
        return Promise.reject('PDF library not loaded. Please check your internet connection and reload.');
      }

      var logo = getLogo();
      var jsPDF = window.jspdf.jsPDF;
      var doc = new jsPDF('p', 'mm', 'letter');
      var pageWidth = doc.internal.pageSize.getWidth();
      var pageHeight = doc.internal.pageSize.getHeight();
      var contentWidth = pageWidth - (PAGE_MARGIN * 2);

      var ci = data.customerInfo || {};
      var equipmentConfig = EQUIPMENT_TYPES[data.equipmentType];
      var equipmentName = equipmentConfig ? equipmentConfig.name : (data.equipmentType || 'Equipment');
      var reportType = ci.reportType || 'inspection';
      var reportTypeLabel = REPORT_TYPE_LABELS[reportType] || 'Equipment Inspection Report';
      var isPurchaseAssessment = reportType === 'pre_purchase';

      var y = PAGE_MARGIN;

      // ===========================================
      // PAGE 1: COVER / SUMMARY PAGE
      // ===========================================

      drawHeader(doc, pageWidth, logo, reportTypeLabel, equipmentName);
      y = 44;

      // Equipment type banner
      doc.setFillColor(COLORS.accent[0], COLORS.accent[1], COLORS.accent[2]);
      doc.rect(PAGE_MARGIN, y, contentWidth, 10, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
      doc.text(equipmentName, PAGE_MARGIN + 4, y + 7);
      y += 16;

      // Job info table
      var jobRows = [];
      if (isPurchaseAssessment) {
        if (ci.customerName)    jobRows.push(['Prepared For', ci.customerName]);
        if (ci.location)        jobRows.push(['Property Address', ci.location]);
        if (ci.inspectionDate)  jobRows.push(['Assessment Date', formatDisplayDate(ci.inspectionDate)]);
        if (ci.technician)      jobRows.push(['Assessor', ci.technician + '  |  EPA 608 Universal  |  NFPA 70E']);
      } else {
        if (ci.customerName)    jobRows.push(['Customer', ci.customerName]);
        if (ci.location)        jobRows.push(['Location', ci.location]);
        if (ci.inspectionDate)  jobRows.push(['Date', formatDisplayDate(ci.inspectionDate)]);
        if (ci.technician)      jobRows.push(['Technician', ci.technician]);
      }
      if (ci.manufacturer)    jobRows.push(['Manufacturer', ci.manufacturer]);
      if (ci.modelNumber)     jobRows.push(['Model Number', ci.modelNumber]);
      if (ci.serialNumber)    jobRows.push(['Serial Number', ci.serialNumber]);
      if (ci.unitAge)         jobRows.push(['Unit Age / Year', ci.unitAge]);
      if (ci.customerEmail)   jobRows.push(['Email', ci.customerEmail]);

      if (jobRows.length > 0) {
        doc.autoTable({
          startY: y,
          head: [['Field', 'Value']],
          body: jobRows,
          margin: { left: PAGE_MARGIN, right: PAGE_MARGIN },
          theme: 'grid',
          headStyles: { fillColor: COLORS.primary, textColor: COLORS.white, fontStyle: 'bold', fontSize: 9 },
          bodyStyles: { fontSize: 9, textColor: COLORS.text },
          alternateRowStyles: { fillColor: COLORS.lightGray },
          columnStyles: { 0: { cellWidth: 45, fontStyle: 'bold' } }
        });
        y = doc.lastAutoTable.finalY + 8;
      }

      // Overall condition & cost callout box (pre-purchase only)
      if (isPurchaseAssessment && (ci.overallCondition || ci.totalRepairCost)) {
        y = checkNewPage(doc, y, pageHeight, 40);
        var condColor = getConditionColor(ci.overallCondition);

        // Box background
        doc.setFillColor(COLORS.lightGray[0], COLORS.lightGray[1], COLORS.lightGray[2]);
        doc.roundedRect(PAGE_MARGIN, y, contentWidth, 26, 2, 2, 'F');
        doc.setDrawColor(condColor[0], condColor[1], condColor[2]);
        doc.setLineWidth(1.5);
        doc.roundedRect(PAGE_MARGIN, y, contentWidth, 26, 2, 2, 'S');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
        doc.text('Assessment Summary', PAGE_MARGIN + 4, y + 7);

        if (ci.overallCondition) {
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(9);
          doc.setTextColor(COLORS.textLight[0], COLORS.textLight[1], COLORS.textLight[2]);
          doc.text('Overall Condition:', PAGE_MARGIN + 4, y + 15);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(11);
          doc.setTextColor(condColor[0], condColor[1], condColor[2]);
          doc.text(ci.overallCondition, PAGE_MARGIN + 40, y + 15);
        }

        if (ci.totalRepairCost) {
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(9);
          doc.setTextColor(COLORS.textLight[0], COLORS.textLight[1], COLORS.textLight[2]);
          doc.text('Estimated Repair Cost:', PAGE_MARGIN + 4, y + 22);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(11);
          doc.setTextColor(COLORS.error[0], COLORS.error[1], COLORS.error[2]);
          doc.text(ci.totalRepairCost, PAGE_MARGIN + 52, y + 22);
        }

        y += 32;
      }

      // Overall technician summary on cover page
      if (data.technicianSummary && data.technicianSummary.trim()) {
        y = checkNewPage(doc, y, pageHeight, 40);
        doc.setFillColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
        doc.rect(PAGE_MARGIN, y, contentWidth, 8, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(COLORS.white[0], COLORS.white[1], COLORS.white[2]);
        doc.text(isPurchaseAssessment ? 'Assessor Summary & Recommendations' : 'Technician Summary', PAGE_MARGIN + 3, y + 5.5);
        y += 11;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(COLORS.text[0], COLORS.text[1], COLORS.text[2]);
        var summaryLines = doc.splitTextToSize(data.technicianSummary, contentWidth - 4);
        // Check if we need more space
        var summaryHeight = summaryLines.length * 4.5;
        if (y + summaryHeight > pageHeight - 20) {
          doc.addPage();
          y = PAGE_MARGIN;
        }
        doc.text(summaryLines, PAGE_MARGIN + 2, y + 2);
        y += summaryHeight + 8;
      }

      // ===========================================
      // SECTION PAGES
      // ===========================================

      if (data.units && data.units.length > 1) {
        // Multi-unit: render each unit with a banner
        for (var u = 0; u < data.units.length; u++) {
          var unit = data.units[u];
          var unitSections = (unit.data && unit.data.sections) ? unit.data.sections : {};
          var unitSummary = (unit.data && unit.data.technicianSummary) ? unit.data.technicianSummary : '';

          // Unit banner
          y = checkNewPage(doc, y, pageHeight, 20);
          doc.setFillColor(COLORS.accent[0], COLORS.accent[1], COLORS.accent[2]);
          doc.rect(PAGE_MARGIN, y, contentWidth, 10, 'F');
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(11);
          doc.setTextColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
          doc.text(equipmentName + ' \u2014 ' + unit.label + ' of ' + data.units.length, PAGE_MARGIN + 4, y + 7);
          y += 14;

          y = renderEquipmentSections(doc, unitSections, equipmentConfig, y, pageWidth, pageHeight, contentWidth);

          // Per-unit technician summary
          if (unitSummary && unitSummary.trim()) {
            y = checkNewPage(doc, y, pageHeight, 30);
            doc.setFillColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
            doc.rect(PAGE_MARGIN, y, contentWidth, 8, 'F');
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.setTextColor(COLORS.white[0], COLORS.white[1], COLORS.white[2]);
            doc.text('Technician Summary \u2014 ' + unit.label, PAGE_MARGIN + 3, y + 5.5);
            y += 11;
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(COLORS.text[0], COLORS.text[1], COLORS.text[2]);
            var uSumLines = doc.splitTextToSize(unitSummary, contentWidth - 4);
            if (y + uSumLines.length * 4.5 > pageHeight - 20) { doc.addPage(); y = PAGE_MARGIN; }
            doc.text(uSumLines, PAGE_MARGIN + 2, y + 2);
            y += uSumLines.length * 4.5 + 8;
          }
        }
      } else {
        y = renderEquipmentSections(doc, data.sections || {}, equipmentConfig, y, pageWidth, pageHeight, contentWidth);
      }

      // ===========================================
      // SIGNATURES
      // ===========================================

      if (data.signatures && (data.signatures.technician || data.signatures.customer)) {
        y = checkNewPage(doc, y, pageHeight, 60);

        doc.setFillColor(COLORS.accent[0], COLORS.accent[1], COLORS.accent[2]);
        doc.rect(PAGE_MARGIN, y, contentWidth, 8, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
        doc.text('Signatures', PAGE_MARGIN + 3, y + 5.5);
        y += 12;

        var sigWidth = (contentWidth - 10) / 2;
        var sigHeight = 25;
        var sigStartY = y;

        if (data.signatures.technician && data.signatures.technician.dataUrl) {
          try { doc.addImage(data.signatures.technician.dataUrl, 'PNG', PAGE_MARGIN, sigStartY, sigWidth, sigHeight); } catch(e) {}
          doc.setDrawColor(COLORS.text[0], COLORS.text[1], COLORS.text[2]);
          doc.setLineWidth(0.3);
          doc.line(PAGE_MARGIN, sigStartY + sigHeight + 2, PAGE_MARGIN + sigWidth, sigStartY + sigHeight + 2);
          doc.setFont('helvetica', 'normal'); doc.setFontSize(8);
          doc.setTextColor(COLORS.textLight[0], COLORS.textLight[1], COLORS.textLight[2]);
          doc.text((ci.technician || 'Technician') + '  |  ' + (data.signatures.technician.date || ''), PAGE_MARGIN, sigStartY + sigHeight + 6);
        }

        if (data.signatures.customer && data.signatures.customer.dataUrl) {
          var custX = PAGE_MARGIN + sigWidth + 10;
          try { doc.addImage(data.signatures.customer.dataUrl, 'PNG', custX, sigStartY, sigWidth, sigHeight); } catch(e) {}
          doc.setDrawColor(COLORS.text[0], COLORS.text[1], COLORS.text[2]);
          doc.setLineWidth(0.3);
          doc.line(custX, sigStartY + sigHeight + 2, custX + sigWidth, sigStartY + sigHeight + 2);
          doc.setFont('helvetica', 'normal'); doc.setFontSize(8);
          doc.setTextColor(COLORS.textLight[0], COLORS.textLight[1], COLORS.textLight[2]);
          doc.text((ci.customerName || 'Client') + '  |  ' + (data.signatures.customer.date || ''), custX, sigStartY + sigHeight + 6);
        }

        y = sigStartY + sigHeight + 12;
      }

      // ===========================================
      // FOOTERS ON ALL PAGES
      // ===========================================

      // Re-draw headers on pages 2+ and footers on all pages
      var totalPages = doc.internal.getNumberOfPages();
      for (var p = 1; p <= totalPages; p++) {
        doc.setPage(p);
        if (p > 1) {
          drawHeader(doc, pageWidth, logo, reportTypeLabel, equipmentName);
        }
        drawFooter(doc, pageWidth, pageHeight, p, totalPages);
      }

      var filename = generateFilename(data);
      doc.save(filename);
      return Promise.resolve(filename);

    } catch(e) {
      console.error('PDF generation error:', e);
      return Promise.reject('PDF generation failed: ' + e.message);
    }
  }

  function formatDisplayDate(dateStr) {
    if (!dateStr) return '';
    var parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    return parts[1] + '/' + parts[2] + '/' + parts[0];
  }

  function generateJobReport(job) {
    if (!job) return Promise.reject('No job data');
    if (!job.equipment || job.equipment.length === 0) return Promise.reject('No equipment items in job');

    try {
      if (!window.jspdf || !window.jspdf.jsPDF) {
        return Promise.reject('PDF library not loaded. Please check your internet connection and reload.');
      }

      var logo = getLogo();
      var jsPDF = window.jspdf.jsPDF;
      var doc = new jsPDF('p', 'mm', 'letter');
      var pageWidth = doc.internal.pageSize.getWidth();
      var pageHeight = doc.internal.pageSize.getHeight();
      var contentWidth = pageWidth - (PAGE_MARGIN * 2);
      var reportTypeLabel = 'Property Assessment Report';

      var y = PAGE_MARGIN;

      // ==========================================
      // COVER PAGE
      // ==========================================
      drawHeader(doc, pageWidth, logo, reportTypeLabel, '');
      y = 44;

      // Property banner
      doc.setFillColor(COLORS.accent[0], COLORS.accent[1], COLORS.accent[2]);
      doc.rect(PAGE_MARGIN, y, contentWidth, 10, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
      doc.text(job.propertyAddress || 'Property Assessment', PAGE_MARGIN + 4, y + 7);
      y += 16;

      // Job info table
      var jobRows = [];
      if (job.preparedFor)      jobRows.push(['Prepared For', job.preparedFor]);
      if (job.propertyAddress)  jobRows.push(['Property Address', job.propertyAddress]);
      if (job.assessmentDate)   jobRows.push(['Assessment Date', formatDisplayDate(job.assessmentDate)]);
      if (job.technician)       jobRows.push(['Assessor', job.technician + (job.techCredentials ? '  |  ' + job.techCredentials : '')]);
      if (job.notes)            jobRows.push(['Notes', job.notes]);

      if (jobRows.length > 0) {
        doc.autoTable({
          startY: y,
          head: [['Field', 'Value']],
          body: jobRows,
          margin: { left: PAGE_MARGIN, right: PAGE_MARGIN },
          theme: 'grid',
          headStyles: { fillColor: COLORS.primary, textColor: COLORS.white, fontStyle: 'bold', fontSize: 9 },
          bodyStyles: { fontSize: 9, textColor: COLORS.text },
          alternateRowStyles: { fillColor: COLORS.lightGray },
          columnStyles: { 0: { cellWidth: 45, fontStyle: 'bold' } }
        });
        y = doc.lastAutoTable.finalY + 8;
      }

      // ==========================================
      // EXECUTIVE SUMMARY TABLE
      // ==========================================
      y = checkNewPage(doc, y, pageHeight, 40);
      doc.setFillColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
      doc.rect(PAGE_MARGIN, y, contentWidth, 8, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(COLORS.white[0], COLORS.white[1], COLORS.white[2]);
      doc.text('Executive Summary', PAGE_MARGIN + 3, y + 5.5);
      y += 10;

      var summaryBody = [];
      var totalCost = 0;
      for (var ei = 0; ei < job.equipment.length; ei++) {
        var equip = job.equipment[ei];
        var cfg = EQUIPMENT_TYPES[equip.equipmentType];
        var typeName = cfg ? cfg.name : equip.equipmentType;
        var costVal = parseFloat(equip.repairCostTotal) || 0;
        totalCost += costVal;
        summaryBody.push([
          typeName,
          equip.label || typeName,
          equip.overallCondition || '—',
          costVal > 0 ? '$' + costVal.toFixed(2) : '—'
        ]);
      }
      summaryBody.push(['', '', 'TOTAL EST. REPAIRS', totalCost > 0 ? '$' + totalCost.toFixed(2) : '—']);

      doc.autoTable({
        startY: y,
        head: [['Equipment', 'Label', 'Condition', 'Est. Repair Cost']],
        body: summaryBody,
        margin: { left: PAGE_MARGIN, right: PAGE_MARGIN },
        theme: 'grid',
        headStyles: { fillColor: COLORS.primary, textColor: COLORS.white, fontStyle: 'bold', fontSize: 9 },
        bodyStyles: { fontSize: 9, textColor: COLORS.text, cellPadding: 2 },
        alternateRowStyles: { fillColor: COLORS.lightGray },
        columnStyles: {
          0: { cellWidth: 45 },
          1: { cellWidth: contentWidth - 45 - 25 - 30 },
          2: { cellWidth: 25, halign: 'center', fontStyle: 'bold' },
          3: { cellWidth: 30, halign: 'right' }
        },
        didDrawCell: function(hookData) {
          if (hookData.column.index !== 2) return;
          var val = String(hookData.cell.raw || '');
          var color = getConditionColor(val);
          if (hookData.row.index === summaryBody.length - 1) {
            // Total row — bold red cost
            doc.setTextColor(COLORS.error[0], COLORS.error[1], COLORS.error[2]);
          } else {
            doc.setTextColor(color[0], color[1], color[2]);
          }
        }
      });
      y = doc.lastAutoTable.finalY + 12;

      // ==========================================
      // PER-EQUIPMENT SECTIONS
      // ==========================================
      for (var e = 0; e < job.equipment.length; e++) {
        var equipItem = job.equipment[e];
        var equipCfg = EQUIPMENT_TYPES[equipItem.equipmentType];
        var equipName = equipCfg ? equipCfg.name : equipItem.equipmentType;
        var equipIcon = equipCfg ? equipCfg.icon : '';

        // Equipment banner
        y = checkNewPage(doc, y, pageHeight, 20);
        doc.setFillColor(COLORS.accent[0], COLORS.accent[1], COLORS.accent[2]);
        doc.rect(PAGE_MARGIN, y, contentWidth, 12, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
        doc.text(equipIcon + ' ' + equipName + (equipItem.label && equipItem.label !== equipName ? ' \u2014 ' + equipItem.label : ''), PAGE_MARGIN + 4, y + 8);
        y += 16;

        // Equipment info table
        var infoRows = [];
        if (equipItem.manufacturer)  infoRows.push(['Manufacturer', equipItem.manufacturer]);
        if (equipItem.modelNumber)   infoRows.push(['Model Number', equipItem.modelNumber]);
        if (equipItem.serialNumber)  infoRows.push(['Serial Number', equipItem.serialNumber]);
        if (equipItem.unitAge)       infoRows.push(['Unit Age', equipItem.unitAge]);
        if (equipItem.overallCondition) infoRows.push(['Overall Condition', equipItem.overallCondition]);
        if (infoRows.length > 0) {
          doc.autoTable({
            startY: y,
            body: infoRows,
            margin: { left: PAGE_MARGIN, right: PAGE_MARGIN },
            theme: 'grid',
            bodyStyles: { fontSize: 8.5, textColor: COLORS.text, cellPadding: 2 },
            columnStyles: { 0: { cellWidth: 45, fontStyle: 'bold', fillColor: COLORS.lightGray } }
          });
          y = doc.lastAutoTable.finalY + 4;
        }

        // Sections — multi-unit or single-unit
        if (equipItem.units && equipItem.units.length > 1) {
          for (var u = 0; u < equipItem.units.length; u++) {
            var unit = equipItem.units[u];
            var unitSections = (unit.data && unit.data.sections) ? unit.data.sections : {};
            var unitSummary = (unit.data && unit.data.technicianSummary) ? unit.data.technicianSummary : '';

            y = checkNewPage(doc, y, pageHeight, 16);
            doc.setFillColor(COLORS.midGray[0], COLORS.midGray[1], COLORS.midGray[2]);
            doc.rect(PAGE_MARGIN, y, contentWidth, 8, 'F');
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(9);
            doc.setTextColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
            doc.text(unit.label + ' of ' + equipItem.units.length, PAGE_MARGIN + 3, y + 5.5);
            y += 10;

            y = renderEquipmentSections(doc, unitSections, equipCfg, y, pageWidth, pageHeight, contentWidth);

            if (unitSummary && unitSummary.trim()) {
              y = checkNewPage(doc, y, pageHeight, 20);
              doc.setFont('helvetica', 'italic');
              doc.setFontSize(9);
              doc.setTextColor(COLORS.text[0], COLORS.text[1], COLORS.text[2]);
              var uLines = doc.splitTextToSize('Summary: ' + unitSummary, contentWidth);
              doc.text(uLines, PAGE_MARGIN, y);
              y += uLines.length * 4.5 + 6;
            }
          }
        } else {
          var sectionsData = equipItem.sections || (equipItem.units && equipItem.units[0] && equipItem.units[0].data && equipItem.units[0].data.sections) || {};
          y = renderEquipmentSections(doc, sectionsData, equipCfg, y, pageWidth, pageHeight, contentWidth);
        }

        // Per-equipment technician summary
        if (equipItem.technicianSummary && equipItem.technicianSummary.trim()) {
          y = checkNewPage(doc, y, pageHeight, 25);
          doc.setFillColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
          doc.rect(PAGE_MARGIN, y, contentWidth, 8, 'F');
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(9);
          doc.setTextColor(COLORS.white[0], COLORS.white[1], COLORS.white[2]);
          doc.text('Assessor Notes', PAGE_MARGIN + 3, y + 5.5);
          y += 10;
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9);
          doc.setTextColor(COLORS.text[0], COLORS.text[1], COLORS.text[2]);
          var eLines = doc.splitTextToSize(equipItem.technicianSummary, contentWidth - 4);
          if (y + eLines.length * 4.5 > pageHeight - 20) { doc.addPage(); y = PAGE_MARGIN; }
          doc.text(eLines, PAGE_MARGIN + 2, y + 2);
          y += eLines.length * 4.5 + 10;
        }
      }

      // ==========================================
      // FOOTERS & HEADERS ON ALL PAGES
      // ==========================================
      var totalPages = doc.internal.getNumberOfPages();
      for (var p = 1; p <= totalPages; p++) {
        doc.setPage(p);
        if (p > 1) drawHeader(doc, pageWidth, logo, reportTypeLabel, '');
        drawFooter(doc, pageWidth, pageHeight, p, totalPages);
      }

      var safeAddr = (job.propertyAddress || 'Assessment').replace(/[^a-zA-Z0-9]/g, '_').substring(0, 40);
      var safeDate = job.assessmentDate || new Date().toISOString().split('T')[0];
      var filename = 'CCR_Assessment_' + safeAddr + '_' + safeDate + '.pdf';
      doc.save(filename);
      return Promise.resolve(filename);

    } catch(e) {
      console.error('Job PDF generation error:', e);
      return Promise.reject('Job PDF generation failed: ' + e.message);
    }
  }

  return {
    generate: generate,
    generateJobReport: generateJobReport,
    validateRequiredFields: validateRequiredFields
  };
})();
