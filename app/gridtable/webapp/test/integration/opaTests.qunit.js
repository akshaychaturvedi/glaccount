sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'gridtable/test/integration/FirstJourney',
		'gridtable/test/integration/pages/GridTableList',
		'gridtable/test/integration/pages/GridTableObjectPage'
    ],
    function(JourneyRunner, opaJourney, GridTableList, GridTableObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('gridtable') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheGridTableList: GridTableList,
					onTheGridTableObjectPage: GridTableObjectPage
                }
            },
            opaJourney.run
        );
    }
);