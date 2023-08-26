sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/format/NumberFormat",
    "sap/ui/export/Spreadsheet",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, NumberFormat, Spreadsheet) {
        "use strict";

        return Controller.extend("displaybepseligibility.controller.Main", {
            onInit: function () {

            },

            onSearch: function () {
                console.log('Search');

                let oView = this.getView();
                let oTable = oView.byId("gridTable");
                oTable.setBusy(true);
                let aFilters = oView.byId("smartFilter").getFilters();

                oTable.getBinding("rows").filter(aFilters);
                oTable.setBusy(false);
            },

            formatValue: function(iNumber){
                var oFloatNumberFormat = NumberFormat.getFloatInstance({
                    maxFractionDigits: 2,
                    minFractionDigits: 2,
                    groupingEnabled: true
                },
                sap.ui.getCore().getConfiguration().getLocale());

                return oFloatNumberFormat.format(iNumber);
            },

            onRowsUpdated: function (oEvent) {
                console.log('Row updated');
                let oView = this.getView();
                let oTable = oView.byId("gridTable");
                //var obj = oEvent.getSource().getBindingContext("").getObject();
                const aRows = oTable.getRows();

                for (let i = 0; i < oTable.getVisibleRowCount(); i++) {
                    const oRow = aRows[i];
                    var cellText = '';
                    var oContext = oRow.getBindingContext();
                    if (oContext) {                        
                        cellText = oContext.getProperty("CC_BEPS_ELIGIBLE");
                        oRow.removeStyleClass("rowExclusionTrue");
                        oRow.removeStyleClass("rowExclusionFalse");
                    }
                    if (cellText === "Yes") {
                        oRow.addStyleClass("rowExclusionTrue");
                    } else if (cellText === "No") {
                        oRow.addStyleClass("rowExclusionFalse");
                    } else {
                        oRow.removeStyleClass("rowExclusionTrue");
                        oRow.removeStyleClass("rowExclusionFalse");
                    }
                }                
            },
            _createColumnConfig: function () {
                return [
                    {
                        label: "Assesment Year",
                        property: "THRESHOLD_YEAR"
                    },
                    {
                        label: "UPE",
                        property: "UPE"
                    },
                    {
                        label: "Country",
                        property: "LAND1"
                    },
                    {
                        label: "Description",
                        property: "BUTXT"
                    },
                    {
                        label: "Chart of Accounts",
                        property: "KTOPL"
                    },
                    {
                        label: "Assessment in EUR",
                        property: "CC_CURRENT_YEAR",
                        type: "number"
                    },
                    {
                        label: "Year -1 in EUR",
                        property: "CC_YEAR_1",
                        type: "number"
                    },
                    {
                        label: "Year -2 in EUR",
                        property: "CC_YEAR_2",
                        type: "number"
                    },
                    {
                        label: "Year -3 in EUR",
                        property: "CC_YEAR_3",
                        type: "number"
                    },
                    {
                        label: "Currency",
                        property: "THRESHOLD_CURRENCY",
                        type: "number"
                    },
                    {
                        label: " BEPS Eligibility",
                        property: "CC_BEPS_ELIGIBLE",
                        type: "boolean"
                    }];
            },

            onExport: function () {

                var aCols, oBinding, oSettings, oSheet, oTable, sFilename;

                oTable = this.byId('gridTable');
                oBinding = oTable.getBinding('rows');
                aCols = this._createColumnConfig();
                sFilename = 'EligibilityReport.xlsx';

                oSettings = {
                    workbook: { columns: aCols },
                    dataSource: oBinding, 
                    fileName: sFilename
                };

                oSheet = new Spreadsheet(oSettings);
                oSheet.build()
                    .then(function () {
                        MessageToast.show('Spreadsheet export has finished');
                    }).finally(function () {
                        oSheet.destroy();
                    });
            },
        });
    });
