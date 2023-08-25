sap.ui.define([
    "../controller/BaseController",
    "sap/ui/export/Spreadsheet",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, Spreadsheet, JSONModel, MessageToast) {
        "use strict";

        return BaseController.extend("tbupload.controller.Main", {

            onInit: function () {

                // Disable preview controls
                this._togglePagePreview(false);

                // Set model
                var oModel = new JSONModel({
                    data: [
                        {}
                    ]
                });
                this.setModel(oModel);                

            },

            onPreview: function (oEvent) {
                this._togglePagePreview(true);
            },

            onCancel: function () {
                this._resetUploader();
                this._togglePagePreview(false);
                this.getView().getModel().destroy();
            },

            onFileBrowser: function (oEvent) {
                this._import(oEvent.getParameter("files") && oEvent.getParameter("files")[0]);
            },

            onSave: function (oEvent) {

                let that = this,
                    aExcelData = this.getModel().getData();

                var oBusyDialog = that.getBusyDialog();

                let oModel = this.getOwnerComponent().getModel();

                let oContextBinding = oModel.bindContext("/UploadData(...)");
                oContextBinding.setParameter('data', JSON.stringify(aExcelData.data));

                oBusyDialog.open();
                oContextBinding.execute().then(
                    function () {
                        MessageToast.show("Data Uploaded Successfully");
                        oBusyDialog.close();
                    },
                    function (oError) {
                        if (!oError.canceled)
                            MessageToast.show(oError.message);
                        oBusyDialog.close();  
                    });
                this._togglePagePreview(false);
                this._resetUploader();
            },

            _togglePagePreview: function (bFlag) {
                var oPage = this.getPage();
                oPage.getContent().setVisible(bFlag);
                oPage.setShowFooter(bFlag);
                this.getView().byId("previewButton").setEnabled(false);
            },

            _getExcelData: function (oEvent) {
                var aExcelData = {};
                // Get the binary data
                var data = oEvent.target.result;

                // Create workbook object
                var oWorkbook = XLSX.read(data, {
                    type: 'binary'
                });

                // Extract excel data
                oWorkbook.SheetNames.forEach(function (sheetName) {
                    aExcelData = XLSX.utils.sheet_to_row_object_array(oWorkbook.Sheets[sheetName]);
                });
                return aExcelData;
            },

            _resetUploader: function(){
                return this.getView().byId("uploader").setValue("");
            },

            _import: function (sfile) {
                var that = this;

                if (sfile && window.FileReader) {
                    var reader = new FileReader();

                    // Process the file
                    reader.onload = function (oEvent) {

                        var aExcelData = that._getExcelData(oEvent)

                        if (aExcelData.length !== 0) {
                            that.getView().byId("previewButton").setEnabled(true);

                            that.getModel().setData({ data: aExcelData });
                            //that.getModel().refresh(true);

                        } else {
                            MessageToast.show("No data");
                        }

                    }

                    // Read the file as a binary string
                    reader.readAsBinaryString(sfile);

                    reader.onerror = function (error) {
                        console.log(error);
                    };
                }
            },

            onDownloadTemplate: function () {

                var oSettings, oSheet;

                var sFileName = "TBUpload.xlsx";

                const aCols = [
                    { label: "CompanyCode", property: "companyCode" },
                    { label: "ChartofAccounts", property: "chartOfAccounts" },
                    { label: "Year", property: "year" },                    
                    { label: "Period", property: "period" },
                    { label: "GLAccount", property: "glAccount" },
                    { label: "AmountLC", property: "alc" },
                    { label: "AmountGC", property: "agc" },
                    { label: "LocalCurrency", property: "lc" },
                    { label: "GlobalCurrency", property: "gc" },
                    { label: "CostCenter", property: "costCenter" },
                    { label: "ProfitCenter", property: "profitCenter" },
                    { label: "BusinessArea", property: "businessArea" },
                    { label: "FunctionalArea", property: "functionalArea" },
                    { label: "Source", property: "source" },
                ];

                oSettings = {
                    workbook: {
                        columns: aCols
                    },
                    context: {
                        sheetName: 'Sheet1'
                    },
                    fileName: sFileName,
                    dataSource: [""],
                    worker: false
                };

                oSheet = new Spreadsheet(oSettings);

                // Download excel
                oSheet.build().finally(function () {
                    oSheet.destroy();
                });
            },
        });
    });
// sap.ui.define([
//     "sap/ui/core/mvc/Controller"
// ],
//     /**
//      * @param {typeof sap.ui.core.mvc.Controller} Controller
//      */
//     function (Controller) {
//         "use strict";

//         return Controller.extend("tbupload.controller.App", {
//             onInit: function () {

//             },
//             onPressPreview: function() {

//                 var headPar = new sap.ui.unified.FileUploaderParameter();
//                 headPar.setName('slug');
//                 headPar.setValue('TrialBalance');


//                 var oFileUploader = this.getView().byId("fileUploader");

//                 oFileUploader.removeHeaderParameter('slug');
//                 oFileUploader.addHeaderParameter(headPar);

//                 oFileUploader.setUploadUrl("../../service/ExcelUpload/excel");

//                 oFileUploader.checkFileReadable().then(function() {
//                     oFileUploader.upload();
//                 }, function(error) {
//                     MessageToast.show("The file cannot be read. It may have changed.");
//                 }).then(function() {
//                     oFileUploader.clear();
//                 });

//             },
//             onPressDownloadTemplate: function() {

//             }
//         });
//     });
