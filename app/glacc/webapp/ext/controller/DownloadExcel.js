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
      { label: "KTOPL", property: "KTOPL" },
      { label: "SAKNR", property: "SAKNR" },
      { label: "TXT50", property: "TXT50" },
      { label: "XBILK", property: "XBILK" },
      { label: "KTOPL_N", property: "KTOPL_N" },
      { label: "SAKNR_N", property: "SAKNR_N" },
      { label: "SOURCE", property: "SOURCE" },
      { label: "TXT50_N", property: "TXT50_N" }
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

      MessageToast.show("Custom handler invoked.");
    }
  };
});
