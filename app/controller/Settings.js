Ext.define('PM.controller.Settings', {

    extend: 'Ext.app.Controller',

    views:['SettingsWindow'],

    refs:[{
        ref: 'tab',
	selector: 'tabpanel[id=settingsTab]'
    },{
	ref: 'projectsCombo',
	selector: 'combo[id=settingsProjectsCombo]'
    }],
    
    init: function(){
      this.control({
	'button[id=settingsProjects]': {
	  click: this.onSettingsClick
	},
	'combo[id=settingsProjectsCombo]': {
	  change: this.onChangeProjectCombo
	}
      });
    },
    
    onSettingsClick: function(){
      this.getTab().setActiveTab(0);
    },
    
    
    onChangeProjectCombo: function(e, idProject, oldValue, eOpts){
      var that = this;
         Ext.MessageBox.show({
            title:'Cancella progetto',
            msg: 'Sei sicuro di voler cancellare il progetto e tutte le informazioni (simboli e schede) associati?',
            buttons: Ext.MessageBox.YESNO,
	    buttonText:{yes: 'Si'},
            icon: Ext.MessageBox.QUESTION,
	    fn :function(btn){
	      if (btn==='yes'){
		Ext.Ajax.request({
		  url: PM.Config.getUrls().deleteProject,
		  params:{
		    idProject: idProject
		  },
		  success: function(res){
		    var store = that.getProjectsCombo().store;
		    that.getProjectsCombo().store.removeAt(0);
		  }
		});
	      }
	    }
	});
    }
});
