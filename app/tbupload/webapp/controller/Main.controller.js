sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("tbupload.controller.App", {
            onInit: function () {

            },
            onPressPreview: function() {

                var headPar = new sap.ui.unified.FileUploaderParameter();
                headPar.setName('slug');
                headPar.setValue('TrialBalance');


                var oFileUploader = this.getView().byId("fileUploader");

                oFileUploader.removeHeaderParameter('slug');
                oFileUploader.addHeaderParameter(headPar);

                oFileUploader.setUploadUrl("../../service/ExcelUpload/excel");

                oFileUploader.checkFileReadable().then(function() {
                    oFileUploader.upload();
                }, function(error) {
                    MessageToast.show("The file cannot be read. It may have changed.");
                }).then(function() {
                    oFileUploader.clear();
                });

            },
            onPressDownloadTemplate: function() {

            }
        });
    });
