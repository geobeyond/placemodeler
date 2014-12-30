Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false,
    paths: {
        gxp: "src/gxp",
        GeoExt: "externals/geoext2/src/GeoExt",
        Ext: "http://cdn.sencha.com/ext/gpl/4.2.1/src"
    }
});



Ext.application({
    name: 'PM',

    requires:[
        'PM.Config'
    ],

    controllers: [
        'Main',
	'Map',
        'SaveFeature',
        'GetCapabilities',
        'Report',
	'ReportQuestions',
        'MediaPanel',
        'PanelFase1',
        'PanelFase2',
        'PanelFase3',
        'PanelFase4',
        'PanelFase5',
        'PanelFase6',
	'PanelFase7',
        'PanelFase8',
	'ModifyFeature',
	'SouthPanel',
	'NorthPanel',
	'Info'
    ],
    
    models:['Media', 'MediaType', 'Style', 'UshahidiMedia'],
    
    stores: ['Files', 'MediaTypes', 'Images', 'Videos', 'Links', 'Reports', 'ReportDetails',
      'Styles', 'UshahidiMedias'
    ],

    autoCreateViewport: true
});
