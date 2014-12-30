Ext.define('PM.view.PanelFase4', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.panelFase4',

    title: 'Fase 4',
    autoScroll: true,
    num:4,
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
	}/* {
	xtype:'button',
	text: '<i class="fa fa-comment"></i> Invia il questionario',
	tooltip: "Invia per il simbolo selezionato",
        margin: '20 5 5 5',
        disabled: true
    }*/],

    openReportWindow: function(){
        Ext.create('PM.view.ReportWindow', {
	   // title: 'Standard Report',
	    id: 'reportFase4'
	}).show();
    }
});
