// @ts-nocheck
sap.ui.define([
  "sap/m/MessageToast",
  "sap/ui/export/Spreadsheet"
], function (MessageToast, Spreadsheet) {
  'use strict';

  function onDownloadExcel(exportData) {

    var parseJSON = JSON.parse(exportData);
    var fileName = "GLAccountMapping.xlsx";

    let aCols = [
      { label: "ChartOfAccounts", property: "chartOfAccounts" },
      { label: "GLAccount", property: "glaccount" },
      { label: "Description", property: "descr" },
      { label: "AccountType", property: "accountType" },
      { label: "SourceChartOfAccounts", property: "sourceChartOfAccounts" },
      { label: "SourceGLAccount", property: "sourceGLAccount" },
      { label: "SourceDescription", property: "sourceDescr" },
      { label: "Source", property: "source" }
    ];

    var oSettings = {
      workbook: {
        columns: aCols
      },
      context: {
        sheetName: 'Sheet1'
      },
      dataSource: parseJSON,
      fileName: fileName,
      worker: false // We need to disable worker because we are using a MockServer as OData Service
    };

    var oSheet = new Spreadsheet(oSettings);
    oSheet.build()
				.then(function() {
					MessageToast.show('Spreadsheet export has finished');
				}).finally(function() {
					oSheet.destroy();
				});
  };

  return {
    downloadExcel: function (oEvent) {

      let oModel = this.getModel();

      let oContextBinding = oModel.bindContext("/downloadExcel(...)");

      oContextBinding.execute().then(
        function () {
          let oContext = oContextBinding.getBoundContext();
          let exportData = oContext.getObject().value;
          onDownloadExcel(exportData);
        }
      );

    }
  };
});
