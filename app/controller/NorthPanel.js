 
Ext.define('PM.controller.NorthPanel', {

    extend: 'Ext.app.Controller',

    views:['NorthPanel'],

    refs:[{
        ref: 'mappanel',
	selector: 'mappanel'
    },{
        ref: 'welcomeMsg',
	selector: 'northpanel > component[name=welcomeMsg]'
    }],

    init: function(){
	this.control({
	    'northpanel':{
		afterrender: this.onAfterRender
	    },
	    'northpanel button[text=Logout]':{
		click: this.onLogout
	    },
	    'northpanel button[text=Progetti]':{
		click: this.onClickProgetti
	    },
	    'northpanel button[text=Settaggi]':{
		click: this.onClickSettings
	    }
	});
    },

    onAfterRender: function() {
	var that=this;
	Ext.Ajax.request({
            url: './php/loadUser.php',
            success: function(response){
                var res=Ext.JSON.decode(response.responseText);
		that.getWelcomeMsg().update('<div>Benvenuto '+res.username+'</div>');
		PM.app.getController('Main').userId= res.id;
		
		if (res.nome)
		{
		  PM.app.getController('Main').idProject = res.last_project;
		  var cntProj = PM.app.getController('Project');
		  
		  cntProj.applyFilter(res.last_project);
		  cntProj.updateTitle(res.nome);
		}
		else
		{
		  that.onClickProgetti();
		}
            },
	    failure: function() {
		
	    }
        });
    },

    onLogout: function() {
	var that=this;
        Ext.MessageBox.show({
            title:'Logout',
            msg: 'Sei sicuro di voler uscire dal client?',
            buttons: Ext.MessageBox.YESNO,
	    buttonText:{yes:'Si'},
            icon: Ext.MessageBox.QUESTION,
            fn: function(btn){
                if (btn==='yes'){
		    Ext.Ajax.request({
			url: './php/logout.php',
			success: function(response) {
			    var res=Ext.JSON.decode(response.responseText);
			    if (res.logout)
				window.location = 'login.php';
			    else
			    {
				Ext.MessageBox.show({
				    title: 'Errore',
				    msg: 'errore durante il logout',
				    icon: Ext.MessageBox.ERROR,
				    buttons: Ext.MessageBox.OK
				});
			    }
			},
			failure: function() {			    
			}
		    });	    
		}
	    }
	});
    },
    
    onClickProgetti: function(){
      if (!this.win && typeof this.win==='undefined')
	this.win= Ext.create('PM.view.ProjectWindow');
      this.win.show();
    },
    
    onClickSettings: function(){
      if (!this.winSettings && typeof this.winSettings==='undefined')
	this.winSettings = Ext.create('PM.view.SettingsWindow').show();
      this.winSettings.show();
    },
});
