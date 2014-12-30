Ext.define('PM.view.PanelFase5', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.panelFase5',

    title: '5. Costruzione della mappa<br> di analisi',
    autoScroll: true,
    num:5,
    
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
	enableToggle: true,
        disabled: false
    }/*,
      {
	xtype:'button',
	text: '<i class="fa fa-comment"></i> legenda',
	name: 'legendBtn',
	tooltip: "legenda indicatore WPS",
        margin: '20 5 5 5',
	enableToggle: true,
        disabled: true
    }  */
    ]

});
