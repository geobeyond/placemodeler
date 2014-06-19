Ext.define('PM.view.PanelFase1', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.panelFase1',

    title: 'Fase 1',
    autoScroll: true,

    layout: {
        type: 'vbox',
        align : 'stretch'
    },

    items:[
        {
	    xtype: 'container',
	    cls:'tree',
            margin: 5
        },
	{
	    xtype:'button',
	    text: '<i class="fa fa-comment"></i> Crea standard report',
	    tooltip: "Invia gli elementi selezionati",
            margin: '20 5 5 5' ,
            disabled: true
	}
    ],

    openReportWindow: function(){
        Ext.create('PM.view.ReportWindow', {
	    title: 'Standard Report',
	    id: 'reportFase1'
	}).show();
    },

});
