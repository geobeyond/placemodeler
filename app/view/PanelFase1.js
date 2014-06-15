Ext.define('PM.view.PanelFase1', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.panelFase1',

    title: 'Fase 1',

    layout: {
        type: 'vbox',
        align : 'stretch'
    },

    items:[
        {
	  xtype: 'container',
	  cls:'tree'
        },
	{
	    xtype:'button',
	    text: '<i class="fa fa-comment"></i> Crea standard report',
	    tooltip: "Invia gli elementi selezionati",
            margin: '20 5 5 10' ,
            disabled: true,
            enableToggle: true,
	}
    ],
    
     openReportWindow: function(f){
        if(!this.sWin && typeof sWin==='undefined')
        {
	    this.sWin = Ext.create('PM.view.ReportWindow', {
	        title: 'Standard Report',
		id: 'reportFase1',
	        feature: f, //???
		
	    });
        }
        this.sWin.show();
    },


/*
    hideReportWindow: function(){
        if (this.sWin && typeof this.sWin==='object')
	{
	    this.sWin.destroy();
	    this.sWin=null;
	}

    }*/
});


