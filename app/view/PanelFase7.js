Ext.define('PM.view.PanelFase7', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.panelFase7',

    title: '7. Questionario di progetto',
    autoScroll: true,
    num: 7,
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
	}/*{
	xtype:'button',
	text: '<i class="fa fa-comment"></i> Invia il questionario',
	tooltip: "Invia gli elementi selezionati",
        margin: '20 5 5 5' ,
        disabled: true
    }*/],

    openReportWindow: function(){
        Ext.create('PM.view.ReportWindow', {
	    id: 'reportFase7'
	}).show();
    }

});
