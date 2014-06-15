Ext.define('PM.view.PanelFase4', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.panelFase4',

 layout: {
        type: 'vbox',
        align : 'stretch'
    },

    title: 'Fase 4',
    //   bodyPadding: 5,
    //   autoScroll: true,
    items:[
        {
           	xtype: 'container',      
	   		cls:'tree'
        },
	{
	  	xtype: 'radiogroup',
	  	margin: '20 2 2 2' ,
	  	columns: 1,
        vertical: true	   
	},
	{
	   xtype:'button',
	    text: '<i class="fa fa-comment"></i> Invia il questionario',
	    tooltip: "Invia per il simbolo selezionato",
            margin: '20 5 5 10' ,
            disabled: true,
            enableToggle: true,
	}
    ],
    
     openReportWindow: function(title){
        if(!this.sWin && typeof sWin==='undefined')
        {
	    this.sWin = Ext.create('PM.view.ReportWindow', {
	        title: title,
		id: 'reportFase4',
	        feature: f, //???
		
	    });
        }
        this.sWin.show();
    },
});
