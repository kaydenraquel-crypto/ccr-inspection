/* ============================================
   PDF Generator
   Branded PDF output using jsPDF + AutoTable
   ============================================ */

var PDFGenerator = (function() {
  var COLORS = {
    primary: [23, 73, 79],       // #17494F
    accent: [245, 194, 87],      // #F5C257
    white: [255, 255, 255],
    lightGray: [245, 245, 245],
    text: [51, 51, 51],          // #333333
    textLight: [102, 102, 102],  // #666666
    success: [40, 167, 69],      // #28A745
    error: [220, 53, 69]         // #DC3545
  };

  var PAGE_MARGIN = 14;

  function getLogo() {
    // Use embedded base64 logo from logo-data.js
    if (typeof CCR_LOGO_BASE64 !== 'undefined' && CCR_LOGO_BASE64) {
      return CCR_LOGO_BASE64;
    }
    return null;
  }

  function validateRequiredFields(data) {
    var missing = [];
    if (!data.customerInfo) {
      return ['Customer Name', 'Location', 'Inspection Date', 'Technician Name'];
    }
    if (!data.customerInfo.customerName || !data.customerInfo.customerName.trim()) {
      missing.push('Customer Name');
    }
    if (!data.customerInfo.location || !data.customerInfo.location.trim()) {
      missing.push('Location');
    }
    if (!data.customerInfo.inspectionDate || !data.customerInfo.inspectionDate.trim()) {
      missing.push('Inspection Date');
    }
    if (!data.customerInfo.technician || !data.customerInfo.technician.trim()) {
      missing.push('Technician Name');
    }
    return missing;
  }

  function generateFilename(data) {
    var type = 'Equipment';
    if (data.equipmentType && EQUIPMENT_TYPES[data.equipmentType]) {
      type = EQUIPMENT_TYPES[data.equipmentType].name.replace(/[^a-zA-Z0-9]/g, '_');
    }
    var customer = 'Customer';
    if (data.customerInfo && data.customerInfo.customerName) {
      customer = data.customerInfo.customerName.trim().replace(/[^a-zA-Z0-9]/g, '_');
    }
    var date = new Date().toISOString().split('T')[0];
    if (data.customerInfo && data.customerInfo.inspectionDate) {
      date = data.customerInfo.inspectionDate;
    }
    return 'CCR_Inspection_' + type + '_' + customer + '_' + date + '.pdf';
  }

  function generate(data) {
    // Validate required fields
    var missing = validateRequiredFields(data);
    if (missing.length > 0) {
      return Promise.reject('Please fill in required fields: ' + missing.join(', '));
    }

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
      var y = PAGE_MARGIN;

      var equipmentConfig = EQUIPMENT_TYPES[data.equipmentType];
      var equipmentName = equipmentConfig ? equipmentConfig.name : data.equipmentType;

      // --- Header Bar ---
      doc.setFillColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
      doc.rect(0, 0, pageWidth, 38, 'F');

      // Logo
      if (logo) {
        try {
          doc.addImage(logo, 'PNG', PAGE_MARGIN, 3, 32, 32);
        } catch (e) {
          // Logo failed to embed, continue without it
        }
      }

      // Company name
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(COLORS.accent[0], COLORS.accent[1], COLORS.accent[2]);
      doc.text('Colorado Commercial Repairs', logo ? 50 : PAGE_MARGIN, 15);

      // Subtitle
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(COLORS.white[0], COLORS.white[1], COLORS.white[2]);
      doc.text('Equipment Inspection Report', logo ? 50 : PAGE_MARGIN, 22);

      // Contact info
      doc.setFontSize(8);
      doc.text('cocomrepairs.com  |  970-778-5271  |  kristopher@cocomrepairs.com', logo ? 50 : PAGE_MARGIN, 29);

      y = 44;

      // --- Equipment Type Banner ---
      doc.setFillColor(COLORS.accent[0], COLORS.accent[1], COLORS.accent[2]);
      doc.rect(PAGE_MARGIN, y, contentWidth, 10, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
      doc.text(equipmentName + ' Inspection', PAGE_MARGIN + 4, y + 7);
      y += 16;

      // --- Customer Info Table ---
      var customerRows = [];
      var ci = data.customerInfo || {};
      if (ci.customerName) customerRows.push(['Customer', ci.customerName]);
      if (ci.location) customerRows.push(['Location', ci.location]);
      if (ci.manufacturer) customerRows.push(['Manufacturer', ci.manufacturer]);
      if (ci.modelNumber) customerRows.push(['Model Number', ci.modelNumber]);
      if (ci.serialNumber) customerRows.push(['Serial Number', ci.serialNumber]);
      if (ci.inspectionDate) customerRows.push(['Inspection Date', formatDisplayDate(ci.inspectionDate)]);
      if (ci.technician) customerRows.push(['Technician', ci.technician]);

      if (customerRows.length > 0) {
        doc.autoTable({
          startY: y,
          head: [['Field', 'Value']],
          body: customerRows,
          margin: { left: PAGE_MARGIN, right: PAGE_MARGIN },
          theme: 'grid',
          headStyles: {
            fillColor: COLORS.primary,
            textColor: COLORS.white,
            fontStyle: 'bold',
            fontSize: 9
          },
          bodyStyles: {
            fontSize: 9,
            textColor: COLORS.text
          },
          alternateRowStyles: {
            fillColor: COLORS.lightGray
          },
          columnStyles: {
            0: { cellWidth: 40, fontStyle: 'bold' }
          }
        });
        y = doc.lastAutoTable.finalY + 8;
      }

      // --- Inspection Sections ---
      if (equipmentConfig && equipmentConfig.sections) {
        for (var i = 0; i < equipmentConfig.sections.length; i++) {
          var sectionConfig = equipmentConfig.sections[i];
          var sectionData = data.sections ? data.sections[sectionConfig.id] : null;

          // Check if we need a new page
          if (y > pageHeight - 50) {
            doc.addPage();
            y = PAGE_MARGIN;
          }

          // Section title bar
          doc.setFillColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
          doc.rect(PAGE_MARGIN, y, contentWidth, 8, 'F');
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(10);
          doc.setTextColor(COLORS.white[0], COLORS.white[1], COLORS.white[2]);
          doc.text(sectionConfig.title, PAGE_MARGIN + 3, y + 5.5);
          y += 10;

          // Checklist table — show ALL items, pass (checked) or fail (unchecked)
          var checklistRows = [];
          for (var j = 0; j < sectionConfig.items.length; j++) {
            var item = sectionConfig.items[j];
            var isChecked = sectionData && sectionData.checkedItems &&
              sectionData.checkedItems.indexOf(item.id) !== -1;
            checklistRows.push([
              isChecked ? 'PASS' : 'FAIL',
              item.label
            ]);
          }

          if (checklistRows.length > 0) {
            doc.autoTable({
              startY: y,
              body: checklistRows,
              margin: { left: PAGE_MARGIN, right: PAGE_MARGIN },
              theme: 'plain',
              bodyStyles: {
                fontSize: 9,
                textColor: COLORS.text,
                cellPadding: { top: 1.5, bottom: 1.5, left: 2, right: 2 }
              },
              columnStyles: {
                0: { cellWidth: 14, halign: 'center', fontSize: 8 },
                1: { cellWidth: contentWidth - 14 }
              },
              didParseCell: function(hookData) {
                if (hookData.column.index === 0) {
                  var val = hookData.cell.raw;
                  if (val === 'PASS') {
                    hookData.cell.styles.textColor = COLORS.success;
                    hookData.cell.styles.fontStyle = 'bold';
                  } else {
                    hookData.cell.styles.textColor = COLORS.error;
                    hookData.cell.styles.fontStyle = 'bold';
                  }
                }
              },
              didDrawCell: function(hookData) {
                if (hookData.column.index !== 0) return;
                var cell = hookData.cell;
                var val = cell.raw;
                var cx = cell.x + cell.width / 2;
                var cy = cell.y + cell.height / 2;
                // Clear the text — we'll draw shapes instead
                doc.setFillColor(255, 255, 255);
                doc.rect(cell.x, cell.y, cell.width, cell.height, 'F');

                if (val === 'PASS') {
                  // Draw green checkmark
                  doc.setDrawColor(COLORS.success[0], COLORS.success[1], COLORS.success[2]);
                  doc.setLineWidth(0.6);
                  doc.line(cx - 2.5, cy, cx - 0.5, cy + 2);
                  doc.line(cx - 0.5, cy + 2, cx + 3, cy - 1.5);
                } else {
                  // Draw red X
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
              var value = sectionData.extraFields[field.id];
              if (value && value.trim()) {
                extraRows.push([field.label, value]);
              }
            }
            if (extraRows.length > 0) {
              doc.autoTable({
                startY: y,
                body: extraRows,
                margin: { left: PAGE_MARGIN, right: PAGE_MARGIN },
                theme: 'grid',
                bodyStyles: {
                  fontSize: 9,
                  textColor: COLORS.text,
                  cellPadding: 2
                },
                columnStyles: {
                  0: { cellWidth: 50, fontStyle: 'bold', fillColor: COLORS.lightGray }
                }
              });
              y = doc.lastAutoTable.finalY + 2;
            }
          }

          // Notes
          if (sectionData && sectionData.notes && sectionData.notes.trim()) {
            if (y > pageHeight - 30) {
              doc.addPage();
              y = PAGE_MARGIN;
            }
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(9);
            doc.setTextColor(COLORS.textLight[0], COLORS.textLight[1], COLORS.textLight[2]);
            doc.text('Notes:', PAGE_MARGIN + 2, y + 4);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(COLORS.text[0], COLORS.text[1], COLORS.text[2]);
            var noteLines = doc.splitTextToSize(sectionData.notes, contentWidth - 20);
            doc.text(noteLines, PAGE_MARGIN + 16, y + 4);
            y += 4 + (noteLines.length * 4) + 4;
          }

          // Section photos
          if (sectionData && sectionData.photos && sectionData.photos.length > 0) {
            var photoWidth = 60;
            var photoHeight = 45;
            var photosPerRow = 2;
            var photoGap = 4;

            for (var ph = 0; ph < sectionData.photos.length; ph++) {
              var colIndex = ph % photosPerRow;
              if (colIndex === 0 && ph > 0) {
                y += photoHeight + photoGap;
              }
              if (colIndex === 0 && y > pageHeight - photoHeight - 20) {
                doc.addPage();
                y = PAGE_MARGIN;
              }
              var photoX = PAGE_MARGIN + colIndex * (photoWidth + photoGap);
              try {
                doc.addImage(sectionData.photos[ph].dataUrl, 'JPEG', photoX, y, photoWidth, photoHeight);
              } catch (photoErr) {
                // Skip photo if it fails to render
              }
            }
            // Move y past last row of photos
            y += photoHeight + photoGap;
          }

          y += 4;
        }
      }

      // --- Technician Summary ---
      if (data.technicianSummary && data.technicianSummary.trim()) {
        if (y > pageHeight - 40) {
          doc.addPage();
          y = PAGE_MARGIN;
        }

        doc.setFillColor(COLORS.accent[0], COLORS.accent[1], COLORS.accent[2]);
        doc.rect(PAGE_MARGIN, y, contentWidth, 8, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
        doc.text('Technician Summary', PAGE_MARGIN + 3, y + 5.5);
        y += 11;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(COLORS.text[0], COLORS.text[1], COLORS.text[2]);
        var summaryLines = doc.splitTextToSize(data.technicianSummary, contentWidth - 4);
        doc.text(summaryLines, PAGE_MARGIN + 2, y + 2);
        y += (summaryLines.length * 4) + 8;
      }

      // --- Signatures ---
      if (data.signatures && (data.signatures.technician || data.signatures.customer)) {
        if (y > pageHeight - 60) {
          doc.addPage();
          y = PAGE_MARGIN;
        }

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

        // Technician signature
        if (data.signatures.technician && data.signatures.technician.dataUrl) {
          try {
            doc.addImage(data.signatures.technician.dataUrl, 'PNG', PAGE_MARGIN, sigStartY, sigWidth, sigHeight);
          } catch (sigErr) {}
          // Signature line
          doc.setDrawColor(COLORS.text[0], COLORS.text[1], COLORS.text[2]);
          doc.setLineWidth(0.3);
          doc.line(PAGE_MARGIN, sigStartY + sigHeight + 2, PAGE_MARGIN + sigWidth, sigStartY + sigHeight + 2);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(COLORS.textLight[0], COLORS.textLight[1], COLORS.textLight[2]);
          var techName = (data.customerInfo && data.customerInfo.technician) || 'Technician';
          doc.text(techName + '  |  ' + (data.signatures.technician.date || ''), PAGE_MARGIN, sigStartY + sigHeight + 6);
        }

        // Customer signature
        if (data.signatures.customer && data.signatures.customer.dataUrl) {
          var custX = PAGE_MARGIN + sigWidth + 10;
          try {
            doc.addImage(data.signatures.customer.dataUrl, 'PNG', custX, sigStartY, sigWidth, sigHeight);
          } catch (sigErr2) {}
          doc.setDrawColor(COLORS.text[0], COLORS.text[1], COLORS.text[2]);
          doc.setLineWidth(0.3);
          doc.line(custX, sigStartY + sigHeight + 2, custX + sigWidth, sigStartY + sigHeight + 2);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(COLORS.textLight[0], COLORS.textLight[1], COLORS.textLight[2]);
          var custName = (data.customerInfo && data.customerInfo.customerName) || 'Customer';
          doc.text(custName + '  |  ' + (data.signatures.customer.date || ''), custX, sigStartY + sigHeight + 6);
        }

        y = sigStartY + sigHeight + 12;
      }

      // --- Footer on every page ---
      var totalPages = doc.internal.getNumberOfPages();
      for (var p = 1; p <= totalPages; p++) {
        doc.setPage(p);
        // Footer line
        doc.setDrawColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
        doc.setLineWidth(0.5);
        doc.line(PAGE_MARGIN, pageHeight - 12, pageWidth - PAGE_MARGIN, pageHeight - 12);
        // Footer text
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(COLORS.textLight[0], COLORS.textLight[1], COLORS.textLight[2]);
        doc.text('Colorado Commercial Repairs LLC  |  cocomrepairs.com  |  970-778-5271', PAGE_MARGIN, pageHeight - 8);
        doc.text('Page ' + p + ' of ' + totalPages, pageWidth - PAGE_MARGIN, pageHeight - 8, { align: 'right' });
        // Generation timestamp
        doc.setFontSize(6);
        doc.text('Generated: ' + new Date().toLocaleString(), PAGE_MARGIN, pageHeight - 5);
      }

      // Save
      var filename = generateFilename(data);
      doc.save(filename);

      return Promise.resolve(filename);
    } catch (e) {
      console.error('PDF generation error:', e);
      return Promise.reject('PDF generation failed: ' + e.message);
    }
  }

  function sectionHasData(sectionConfig, sectionData) {
    if (!sectionData) return false;

    // Check if any items are checked
    if (sectionData.checkedItems && sectionData.checkedItems.length > 0) return true;

    // Check extra fields
    if (sectionData.extraFields) {
      var extraKeys = Object.keys(sectionData.extraFields);
      for (var i = 0; i < extraKeys.length; i++) {
        if (sectionData.extraFields[extraKeys[i]] && sectionData.extraFields[extraKeys[i]].trim()) {
          return true;
        }
      }
    }

    // Check notes
    if (sectionData.notes && sectionData.notes.trim()) return true;

    return false;
  }

  function formatDisplayDate(dateStr) {
    if (!dateStr) return '';
    var parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    return parts[1] + '/' + parts[2] + '/' + parts[0];
  }

  return {
    generate: generate,
    validateRequiredFields: validateRequiredFields
  };
})();
