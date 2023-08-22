sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("deminimis.controller.Detail", {
            onInit: function () {
                console.log("Detail Controller");
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("Detail").attachPatternMatched(this._onRouteMatch, this)
            },
            _onRouteMatch: function (oEvent) {
                console.log("Here");
                console.log(oEvent);
                //var iIndex = oEvent.getParameter('arguments').index
                var aData = oEvent.getParameter('arguments')

                var oFilter1 = new sap.ui.model.Filter("GJAHR", sap.ui.model.FilterOperator.EQ, aData.GJAHR);
                var oFilter2 = new sap.ui.model.Filter("KTOPL", sap.ui.model.FilterOperator.EQ, aData.KTOPL);
                var oFilter3 = new sap.ui.model.Filter("LAND1", sap.ui.model.FilterOperator.EQ, aData.LAND1);

                var that = this;

                var oDataModel = this.getOwnerComponent().getModel();
                var sEntityPath = "/DeminimisData";

                oDataModel.read(sEntityPath, {
                    filters: [oFilter1, oFilter2, oFilter3],
                    success: function (oData, response) {
                        // Handle the successful response and process the data
                        if (oData.results && oData.results.length > 0) {
                            var oRecord = oData.results[0];
                            var oView = that.getView();
                            var oModel = new sap.ui.model.json.JSONModel(oRecord);
                            oView.setModel(oModel, "rowData");
                        }

                    },
                    error: function (oError) {
                        // Handle the error
                    }
                });

                // var mParameters = {
                //     urlParameters: {
                //         $top: 1, 
                //         $skip: iIndex 
                //     },
                //     success: function (oData, response) {
                //         // oData will contain the data at the specified index
                //         if (oData.results && oData.results.length > 0) {
                //         var oRecord = oData.results[0];
                //         // Manipulate the data as needed
                //         var oView = that.getView();
                //         var oModel = new sap.ui.model.json.JSONModel(oRecord);
                //         oView.setModel(oModel, "rowData"); // Assuming oRecord is your model/data object

                //         }
                //     },
                //     error: function (oError) {
                //         // Handle error
                //     }
                // };

                // oDataModel.read(sEntityPath, mParameters);
            }


        });
    });
