Ext.define('PM.view.PanelFase8', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.panelFase8',

    title: 'Fase 8',
    autoScroll: true,
    num: 8,
    layout: {
        type: 'vbox',
        align : 'stretch'
    },

    items:[{
        xtype: 'container',
        cls: 'tree',
        margin: 5
    },{
	  xtype: 'panel',
	  scrollable: true, 
	  border: true, 
	  margin: 5	   
	},
     {
	xtype:'button',
	name: 'wpsBtn',
	text: '<i class="fa fa-comment"></i> calcola indicatore',
	tooltip: "calcola indicatore WPS",
        margin: '20 5 5 5',
	//allowDepress:false,
	enableToggle: true,
        disabled: false
    }/*,{
	xtype:'button',	
	text: '<i class="fa fa-comment"></i> legenda',
	name: 'legendBtn',
	tooltip: "legenda indicatore WPS",
        margin: '20 5 5 5',
	enableToggle: true,
        disabled: true
    }*/]
});
