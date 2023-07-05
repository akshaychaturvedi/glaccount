sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        NewHandler: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        }
    };
});
