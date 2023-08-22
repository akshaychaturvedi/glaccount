sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("deminimis.controller.Main", {
            onInit: function () {
                // var oView = this.getView();
                // var oGridTable = oView.byId("gridTable");

                // var aRows = oGridTable.getRows();
                // aRows.forEach(function(oRow) {
                //     var oContext = oRow.getBindingContext();
                //     var sExclusion = oContext.getProperty("EXCLUSION");
                //     var sRowClass = this.determineRowClass(sExclusion);
                //     oRow.$().addClass(sRowClass);
                //   }, this);

                // //   oGridTable.addEventDelegate({
                // //     onBeforeRendering: this.customRowRenderer
                // //   }, this);

                // var oBinding = oGridTable.getBinding("rows");
                
                // Group by the "CompanyCode" field
                // oBinding.groupBy([
                //     new sap.ui.model.Sorter("LAND1", false)
                // ]);
                var that = this;
                let oView = this.getView();
                let oTable = oView.byId("gridTable");
                oView.addEventDelegate({
                        onBeforeShow: this.onBeforeShow
                    }, this);
                oView.addEventDelegate({
                    onAfterShow: this.onAfterShow
                }, this);  
                
                // Call function
                var oDataModel = this.getOwnerComponent().getModel();
                oDataModel.callFunction("/test",{
                    method: 'POST',
                    success: function(oData, response) {
                        var jModel = new sap.ui.model.json.JSONModel();
                        var myData = {};
                        myData.Fare = oData;
                        console.log('Function call');
                        var smartFilterBar = that.getView().byId("smartFilter");
                        var field = smartFilterBar.getControlByKey("GJAHR");
                        field.setValue("=2022");
                        // jModel.setData(myData);
                        // oContext.getView().setModel(jModel, "fareModel");
                       },
                    error: function(oError) {
                        console.log('Error');
                    }
                })

            },
            onBeforeShow: function() {

                console.log('called from on Before show');
                // DO manipulation here
            },
            onBeforeRendering: function(){
                console.log('Before');
            },
            onAfterRendering: function(){
                console.log('After');
                
            },
            onAfterShow: function(){
                console.log('After show');
            },
            customRowRenderer: function(){
                // var oView = this.getView();
                // var oGridTable = oView.byId("gridTable");

                // var aRows = oGridTable.getRows();
                // aRows.forEach(function(oRow) {
                //     // var oContext = oRow.getBindingContext();
                //     // var sExclusion = oContext.getProperty("EXCLUSION");
                //     // var sRowClass = this.determineRowClass(sExclusion);
                //     // oRow.$().addClass(sRowClass);
                //     oRow.addStyleClass("rowExclusionFalse");
                //   }, this);
                console.log('Renderer');
                let oView = this.getView();
                let oTable = oView.byId("gridTable");

                const aRows = oTable.getRows();
                if (aRows.length > 0) {
                    aRows.forEach(oRow => {
                        const cellId = oRow.getAggregation("cells")[11].getId();
                        const cellText = sap.ui.getCore().byId(cellId).getText();
                        if (cellText === "Yes")
                            { console.log(oRow);
                            oRow.addStyleClass("rowExclusionTrue"); }
                        else if (cellText === "No")
                            oRow.addStyleClass("rowExclusionFalse");
                    })
                }
            },
            // onAfterRendering: function(){
            //     var oView = this.getView();
            //     var oGridTable = oView.byId("gridTable");

            //     var aRows = oGridTable.getRows();
            //     aRows.forEach(function(oRow) {                    
            //         oRow.addStyleClass("rowExclusionFalse");
            //       }, this);

            // },
            onRowSelected: function(oEvent){
                var oContext = oEvent.getParameter('rowContext');
                var oObject = oContext.getObject();
                var sPath = oEvent.getParameter('rowContext').getPath();
                var nIndex = oEvent.getParameter('rowIndex');
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("Detail",{
                    GJAHR: oObject.GJAHR,
                    KTOPL: oObject.KTOPL,
                    LAND1: oObject.LAND1
                })
            },
            onSearch: function(){
                console.log('Search');

                let oView = this.getView();
                let oTable = oView.byId("gridTable");
                let aFilters = oView.byId("smartFilter").getFilters();

                oTable.getBinding("rows").filter(aFilters);
            },
            formatRows:function(x){
                console.log("format");
            },
            determineRowClass: function(sExclusion) {
                if (sExclusion === "Yes") {
                  return "exclusionYesRow";
                } else if (sExclusion === "No") {
                  return "exclusionNoRow";
                }
                return ""; // No additional class for other cases
            },
            valToStr: function(iValue){
                try {
                    iValue.toString();
                } catch (err){
                    iValue = "foo";
                }
                return iValue.toString();
            },
            onRowsUpdated1: function (oEvent) {
                console.log('Row updated');
                let oView = this.getView();
                let oTable = oView.byId("gridTable");
                //var obj = oEvent.getSource().getBindingContext("").getObject();
                const aRows = oTable.getRows();
                if (aRows.length > 0) {
                    aRows.forEach(oRow => {
                        //const cellId = oRow.getAggregation("cells")[11].getId();
                        //$("#" + cellId).css("background-color", "red");
                        //const cellText = sap.ui.getCore().byId(cellId).getText();
                        const cellText = oRow.getBindingContext().getObject().ExclusionValue;
                        if (cellText === "Yes")
                            { console.log(oRow);
                            oRow.addStyleClass("rowExclusionTrue"); }
                        else if (cellText === "No")
                            oRow.addStyleClass("rowExclusionFalse");
                        else oRow.removeStyleClass("rowExclusionTrue");
                        
                    })
                }
            },            
    
        });
    });
