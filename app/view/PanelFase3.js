Ext.define('PM.view.PanelFase3', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.panelFase3',

    title: 'Fase 3',
    autoScroll: true,
    num:3,
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
	}],

    openGetCapabiliesWindow: function(f){
        if(!this.sWin && typeof sWin==='undefined')
        {
	    this.sWin = Ext.create('PM.view.GetCapabilitiesWindow', {
	    });
        }
        this.sWin.show();
    },



    closeGetCapabiliesWindow: function(){
        if (this.sWin && typeof this.sWin==='object')
	{
	    this.sWin.destroy();
	    this.sWin=null;
	}
    }
});
