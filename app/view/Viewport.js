Ext.define('PM.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:['PM.view.MapPanel',   
              'PM.view.PanelFase1',
              'PM.view.PanelFase2',
              'PM.view.PanelFase3',
              'PM.view.PanelFase4',
	      	  'PM.view.PanelFaseX',	   
             /* 'PM.view.PanelFase4',
              'PM.view.PanelFase5',
              'PM.view.PanelFase6',
              'PM.view.PanelFase7',
              'PM.view.PanelFase8'*/
             ],
    alias:'widget.pm-viewport',
   
    layout:{
        type: 'border'
    },
    items:[{
        region: 'west',
        id: 'west',
        title: "Layers",
	layout: 'accordion',
        collapsible: true,
        width: 250,
	items:[{xtype:'panelFase1'},{xtype:'panelFase2'},{xtype:'panelFase3'},{xtype:'panelFase4'},{xtype:'panelFaseX'}]
    },{
        region: 'center',
        layout: 'border',   
        items:[{
            region: 'center',
            title: 'map',
            xtype: 'mappanel'
        },{
            region: 'south',
            xtype: 'panel',
            collapsible: true,
            height:200
        }]
    }]

});
