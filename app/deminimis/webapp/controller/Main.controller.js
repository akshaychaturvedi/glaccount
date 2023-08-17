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

            },
            onRowSelected:function(oEvent){
                var oContext = oEvent.getParameter('rowContext');
                var oObject = oContext.getObject();

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("Detail",{
                    KTOPL:oObject.KTOPL
                })
            },
            onSearch: function(){
                console.log('Search');

                let oView = this.getView();
                let oTable = oView.byId("gridTable");
                let aFilters = oView.byId("smartFilter").getFilters();

                oTable.getBinding("rows").filter(aFilters);
            }
    
        });
    });
