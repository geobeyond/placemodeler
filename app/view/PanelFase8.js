Ext.define('PM.view.PanelFase8', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.panelFase8',

    title: 'Fase 8',
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
