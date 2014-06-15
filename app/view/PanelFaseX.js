Ext.define('PM.view.PanelFaseX', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.panelFaseX',

    title: 'Fase X',

    layout: {
        type: 'vbox',
        align : 'stretch'
    },
    
    items:[{
           xtype: 'container',
            cls: 'tree'
        }]

});