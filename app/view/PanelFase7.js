Ext.define('PM.view.PanelFase7', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.panelFase7',

    title: 'Fase 7',
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
