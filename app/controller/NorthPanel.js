 
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
	    }
	});
    },

    onAfterRender: function() {
	var that=this;
	Ext.Ajax.request({
            url: './php/loadUser.php',
            success: function(response){
                var res=Ext.JSON.decode(response.responseText);
// 		that.getWelcomeMsg().update('<div>Benvenuto '+res.firstname+' '+res.lastname+'</div>');
		that.getWelcomeMsg().update('<div>Benvenuto '+res.username+'</div>');
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
    }
});
