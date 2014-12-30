Ext.define('PM.view.PanelFase6', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.panelFase6',

    title: '6. Individuazione delle risorse<br> identitarie',
    autoScroll: true,
    num:6,
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
	}]

});
