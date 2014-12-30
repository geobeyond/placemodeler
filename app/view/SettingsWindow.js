Ext.define('PM.view.SettingsWindow', {
    
  extend: 'Ext.window.Window',
  
  alias: 'widget.settingswin', 

  title: 'Settaggi',  
  layout:'border',
  
  width: 550,
  height: 300,
  /*
  maximizable: false,
  collapsible: false,

  unpinnable: true,
  draggable: true,*/
  defaults: {
            split: true,
  },
   closeAction: 'hide',
  items:[{
    xtype: 'panel',
    region: 'west',    
    width: 150,
    layout: {
      type: 'vbox',
      align : 'stretch',
      pack  : 'start',
    },
    defaults: {
      xtype: 'button',
      enableToggle: true,
      margin: 5
    },
    items:[{
      text: 'Gestione progetti',
      id: 'settingsProjects',
      pressed: true
    }/*,{
      text: ''
    }*/]
  },{
    region: 'center',
    xtype: 'tabpanel',
    id: 'settingsTab',
    tabBar: {
      hidden: true
    },
    layout: 'fit',
    items:[{
	items:[{
	  margin:5,
	  xtype: 'combo',
	  fieldLabel: 'Cancella progetto esistente:',
	  labelWidth: 165,
	  store: 'Projects',
	  id: 'settingsProjectsCombo',
	  displayField: 'nome',
	  valueField: 'id',      
	}]
      },{
	
      }
    ]
  }]
}); 
