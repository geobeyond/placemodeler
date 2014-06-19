Ext.define('PM.view.PanelFase5', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.panelFase5',

    title: 'Fase 5',
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
