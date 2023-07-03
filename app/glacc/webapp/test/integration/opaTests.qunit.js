sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'glacc/test/integration/FirstJourney',
		'glacc/test/integration/pages/GLAccountsList',
		'glacc/test/integration/pages/GLAccountsObjectPage',
		'glacc/test/integration/pages/GLMappedAccountsObjectPage'
    ],
    function(JourneyRunner, opaJourney, GLAccountsList, GLAccountsObjectPage, GLMappedAccountsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('glacc') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheGLAccountsList: GLAccountsList,
					onTheGLAccountsObjectPage: GLAccountsObjectPage,
					onTheGLMappedAccountsObjectPage: GLMappedAccountsObjectPage
                }
            },
            opaJourney.run
        );
    }
);