Ext.define('PM.view.PanelFase2', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.panelFase2',

    layout: {
        type: 'vbox',
        align : 'stretch'
    },

    title: '2. Individuazione nominale e <br>percettiva degli elementi<br> del luogo',
    autoScroll: true,
  num:2,
    items:[
        {
            xtype: 'container',
	    cls:'tree',
            margin: 5
        },{
	  xtype: 'panel',
	  scrollable: true, 
	  border: true, 
	  margin: 5	   
	}/*,
	{
	    xtype: 'radiogroup',
	    margin: '20 2 2 2' ,
	    columns: 1,
            vertical: true,
            disabled: true
	},
	{
	    xtype:'button',
	    text: '<i class="fa fa-comment"></i> Crea Report',
	    tooltip: "Invia gli elementi selezionati",
            margin: '20 5 5 5' ,
            disabled: true,
            enableToggle: true
	}*/
    ],

    openReportWindow: function(){
        Ext.create('PM.view.ReportWindow', {
	    id: 'reportFase2'
	}).show();
    }
});
