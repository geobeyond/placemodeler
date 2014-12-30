//custom accordion 
Ext.define('PM.application.view.CustomAccordion', {
    extend: 'Ext.layout.container.Accordion',
    alias: ['layout.customaccordion'] ,

    constructor: function() {
	var me = this;
	me.callParent(arguments);  
    },    
    
    
    onComponentExpand: function(comp) {   
	var controller=PM.app.getController('Map');
	//controller.closeLegendWindow();
	controller.closeInfoPopup();

 	if (controller.highlightWpsLayerAdded)	  
 	  controller.removeWpsLayer();
        var me = this;
	me.callParent(arguments);
    },
    onComponentCollapse: function(comp) {	
       	if (comp.num===5 || comp.num===8)
	{
	  PM.app.getController('SouthPanel').clearData();
	}    
	var me = this;
	me.callParent(arguments);
    }
});

Ext.define('PM.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:['PM.view.MapPanel',
	      'PM.view.NorthPanel',
              'PM.view.PanelFase1',
              'PM.view.PanelFase2',
              'PM.view.PanelFase3',
              'PM.view.PanelFase4',
              'PM.view.PanelFase5',
              'PM.view.PanelFase6',
              'PM.view.PanelFase7',
              'PM.view.PanelFase8',
	      'PM.view.ReportWindow',
	      'PM.view.ModifyFeatureWindow',
              'PM.view.SouthTabPanel',
	      'PM.view.InfoPopup'
             ],
    alias:'widget.pm-viewport',

    layout:{
        type: 'border'
    },
    items:[{
            region: 'north',
	    items:[
	      {xtype: 'northpanel'}      
	    ]
            },{
                region: 'west',
                id: 'west',
                title: "Simboli",
	        layout: 'customaccordion',
                collapsible: true,
                width: 250,
	        items:[{xtype:'panelFase1'},
                       {xtype:'panelFase2'},
                       {xtype:'panelFase3'},
                       {xtype:'panelFase4'},
                       {xtype:'panelFase5'},
		       {xtype:'panelFase6'},
		       {xtype:'panelFase7'},
		       {xtype:'panelFase8'}
		      ]
            },{
                region: 'center',
                layout: 'border',
                items:[{
                    region: 'center',
                    title: 'map',
                    xtype: 'mappanel'
                },{
                    region: 'south',
                    xtype: 'southtabpanel',
                    id: 'southPanel',
                    animCollapse: false,
		    collapsible: true,
		    hideCollapseTool: false,
		    hidden: true
                }]
            }]
});
