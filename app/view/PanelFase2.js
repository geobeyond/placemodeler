Ext.define('PM.view.PanelFase2', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.panelFase2',

    layout: {
        type: 'vbox',
        align : 'stretch'
    },

    title: 'Fase 2',
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
	    text: '<i class="fa fa-comment"></i> Crea Report',
	    tooltip: "Invia gli elementi selezionati",
            margin: '20 5 5 10' ,
            disabled: true,
            enableToggle: true,
	}
    ]   
});
