Ext.define('PM.view.PanelFase6', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.panelFase6',

    title: 'Fase 6',
    autoScroll: true,
    
    layout: {
        type: 'vbox',
        align : 'stretch'
    },

    items:[{
        xtype: 'container',
        cls: 'tree',
        margin: 5
    }]

});
