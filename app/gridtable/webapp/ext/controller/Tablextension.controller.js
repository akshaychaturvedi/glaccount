sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('gridtable.ext.controller.Tablextension', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf gridtable.ext.controller.Tablextension
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
				var oExtAPI = this.base.getExtensionAPI()
				console.log('Here')
				console.log(oExtAPI)
				// this.extensionAPI.attachPageDataLoaded(function (oEvent) {
				// 	// Here the oEvent.context will have the model, path and stuff
				// }.bind(this));
				
			}
		}
	});
});
