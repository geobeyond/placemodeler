 Ext.define('PM.view.NorthPanel', {
    extend: 'Ext.panel.Panel',

    alias : 'widget.northpanel',
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'middle'
    },

    defaults:{
        margin: '2, 4, 2, 4'
    },
    items:[{
      xtype: 'component',
      html: '<div id="title">Div@ter</div>'
    },
    {
      xtype:'tbfill'      
    },{
        xtype: 'component',
	name: 'welcomeMsg',
        html: '<div>Benvenuto Nome Cognome</div>'
    },{
        xtype: 'button',
        text: 'Progetti'
    },{
        xtype: 'button',
        text: 'Settaggi'
    },{
        xtype: 'button',
        text: 'Logout'
    }],

   /* openWindow: function(){
        this.win=Ext.create('PM.view.SettingsWindow').show();
    },
    
    closeWindow: function(){
      this.win.destroy();
    }*/
});