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
			onInit: function (oEvent) {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				// var oModel = this.base.getExtensionAPI().getModel();
				// var oView = this.getView();
				// console.log(oView);
				// console.log(this.base.getExtensionAPI().getFilters());
				console.log(this.base.getExtensionAPI().getMetadata());
				// this.base.getExtensionAPI().setFilterValues('region', 'Ogun');
				// this.base.getExtensionAPI().setFilterValues('country', 'Spain');
				// var oExtAPI = this.base.getExtensionAPI()
				// console.log('Here')
				// console.log(oExtAPI)		
				
				var oModel = this.base.getExtensionAPI().getModel('ui');
				let sActionName = "test";
				let mParameters = {
					//contexts: oEvent.getSource().getBindingContext(),
					model: oModel,
					// label: 'Confirm',
					// invocationGrouping: true
				};
				var that = this;
				this.base.getExtensionAPI().getEditFlow().invokeAction(sActionName, mParameters).then(function (oParams) {

					console.log('action call 2');
					//this.base.getExtensionAPI().setFilterValues('region', 'Ogun');
					//that.base.getExtensionAPI().setFilterValues('country', 'Spain');

				}).catch(function (error) {
					console.log(error);
				});;

			},
			onAfterRendering: function (oEvent) {
				console.log('Test');
				console.log(this.base.getExtensionAPI().getMetadata());
				this.base.getExtensionAPI().refresh();

				// var oModel = this.base.getExtensionAPI().getModel();
				// let sActionName = "test";
				// let mParameters = {
				// 	//contexts: oEvent.getSource().getBindingContext(),
				// 	model: oModel,
				// 	// label: 'Confirm',
				// 	// invocationGrouping: true
				// };
				// this.base.getExtensionAPI().getEditFlow().invokeAction(sActionName, mParameters).then(function (oParams) {

				// 	console.log('action call');
				// 	//this.base.getExtensionAPI().setFilterValues('region', 'Ogun');
				// 	this.base.getExtensionAPI().setFilterValues('country', oParams.value);

				// });

				// Current timestamp set as default filter for order start but this way we can set any field dynamically
				// var smFilt = this.getView().byId(
				// 	"zcustomorder::sap.suite.ui.generic.template.ListReport.view.ListReport::zcustom_order--listReportFilter"
				// );
				// var dat = new Date();//Java script date object
				// var datStr = dat.toISOString(); // Convert it to format that SAP understands
				// var jsonString =
				// 	'{"SelectionVariantID":"","Parameters":[{"PropertyName":"orderstart","PropertyValue":"' + datStr +'"}]}';
				// smFilt.setDataSuiteFormat(jsonString);
			},
			onBeforeRendering: function (oEvent) {
				console.log('Test Before');
				console.log(this.base.getExtensionAPI().getMetadata());

				// this.base.getExtensionAPI().getModel();
				var oModel = this.base.getExtensionAPI().getModel();
				let sActionName = "test";
				let mParameters = {
					//contexts: oEvent.getSource().getBindingContext(),
					model: oModel,
					// label: 'Confirm',
					// invocationGrouping: true
				};
				var that = this;
				this.base.getExtensionAPI().getEditFlow().invokeAction(sActionName, mParameters).then(function (oParams) {

					console.log('action call');
					//this.base.getExtensionAPI().setFilterValues('region', 'Ogun');
					that.base.getExtensionAPI().setFilterValues('country', oParams.value);
					that.base.getExtensionAPI().refresh();

				}).catch(function (error) {
					console.log(error);
				});

				// Current timestamp set as default filter for order start but this way we can set any field dynamically
				// var smFilt = this.getView().byId(
				// 	"zcustomorder::sap.suite.ui.generic.template.ListReport.view.ListReport::zcustom_order--listReportFilter"
				// );
				// var dat = new Date();//Java script date object
				// var datStr = dat.toISOString(); // Convert it to format that SAP understands
				// var jsonString =
				// 	'{"SelectionVariantID":"","Parameters":[{"PropertyName":"orderstart","PropertyValue":"' + datStr +'"}]}';
				// smFilt.setDataSuiteFormat(jsonString);
			}
		}
	});
});
