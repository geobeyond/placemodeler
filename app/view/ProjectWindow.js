Ext.define('PM.view.ProjectWindow', {
  
  extend: 'Ext.window.Window',
  
  alias: 'widget.projectwindow',
  
  border:false,

//    layout: 'fit',
   // height: 100,
  //  width: 400,

    padding:5,
    
    title: 'Progetti',
    
    layout: {
      type: 'hbox',
      pack: 'start',
      align: 'stretch'
    },
     closeAction: 'hide',
    items:[{
      xtype: 'button',
      text: 'Crea Nuovo progetto',
      id :'newProjectBtn'
    },{
      xtype: 'combo',
      fieldLabel: 'o scegli progetto esistente:',
      labelWidth: 165,
      store: 'Projects',
      id: 'npCombo',
      displayField: 'nome',
      valueField: 'id',
    },{
      
    }],
        
    NewProjWinShow: function(){
      if (!this.win && typeof this.win==='undefined')
      {
	this.win = Ext.create('Ext.window.Window',{
	  title: 'Nuovo Progetto',
	  padding: 5,
	  layout: {
	      type: 'vbox',
	      align : 'stretch',
	      pack  : 'start',
	  },
	  id: 'npWin',
	  closeAction: 'hide',
	  items: [{
	    xtype: 'form',
	    items:[{
		  xtype: 'textfield',
		  fieldLabel: 'Nome',
		  id: 'npNome',
		  allowBlank: false
	    },{
	      xtype: 'textarea',
	      fieldLabel: 'Descrizione',
	      id: 'npDesc',
	      allowBlank: true
	    }],
	    buttons:[{
	      text: 'Crea',
	      id: 'npSave'
	    }]
	  }]	
	});
      }
      this.win.show(); 
    }
}); 
