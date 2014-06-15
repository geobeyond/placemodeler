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
               'GeoExt.tree.View',
               'GeoExt.tree.Column',               
               'GeoExt.data.LayerStore',
             //'GeoExt.tree.LayerTreeBuilder',
    ],


    controllers: [
      'Main', 
      'SaveFeature',
      'GetCapabilities',
      'Report',
      'PanelFase1',
      'PanelFase2',
      'PanelFase4',
      'PanelFaseX',   
    ],
    
    //stores:['Layers'],

    
    autoCreateViewport: true
});