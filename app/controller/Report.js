Ext.define('PM.controller.Report', {

    extend: 'Ext.app.Controller',

    refs:[{
        ref: 'window',
        selector: 'reportwindow'
    },{
        ref: 'form',
        selector: 'reportwindow > form'
    },{
        ref: 'mappanel',
        selector:'mappanel'
    }],



    init: function(){
        this.control({
	    'reportwindow > toolbar > button[text=Annulla]': {
	        click: this.onClickAnnullaBtn
	    },
	    'reportwindow > toolbar > button[text=Invia Report]': {
	        click: this.onClickInviaBtn
	    }
        });
	
	if (PM.Config.getUrls().proxyNative && typeof PM.Config.getUrls().proxyNative!=='undefined')
	  this.localUrl=PM.Config.getUrls().proxyNative+encodeURIComponent(PM.Config.getUrls().ushahidiURL);
	else
	  this.localUrl=PM.Config.getUrls().ushahidiURL;
	
	if (PM.Config.getUrls().proxy && typeof PM.Config.getUrls().proxy!=='undefined')
	  this.ushahidiUrl=PM.Config.getUrls().proxy+encodeURIComponent(PM.Config.getUrls().ushahidiURL);
	else
	  this.ushahidiUrl=PM.Config.getUrls().ushahidiURL;
    },


    onClickAnnullaBtn: function(){
        this.getForm().form.reset();
        this.getWindow().close();
    },


    onClickInviaBtn: function(){
        var that=this;
      	var items=this.getForm().form.getValues();
	if (items.delete && typeof items.delete!=='undefined')
	{
	    var time=items.delete;
	    var pos=time.indexOf(':');
	    var pos1=time.indexOf(' ');
	    var hour=time.substring(0, pos);
	    var min=time.substring(pos+1, pos1);
	    var ampm=time.substring(pos1+1).toLowerCase();
	    Ext.getCmp('submitForm-ampm').setValue(ampm);
	    Ext.getCmp('submitForm-hour').setValue(hour);
	    Ext.getCmp('submitForm-min').setValue(min);
	}

        var mappanel=this.getMappanel();
	var center=mappanel.map.getCenter();
	center=center.transform(mappanel.sphericMercator, mappanel.WGS84);



	var geom=mappanel.selectedFeature.geometry;
	var lonlatclone = geom.clone();
	lonlatclone.transform(mappanel.sphericMercator, mappanel.WGS84);

	var items=[{
    	    xtype: 'hidden',
    	    name:'geometry[1]',
    	    value: '{"geometry":"'+lonlatclone.toString()+'","label":"","comment":"","lat":"","lon":"","color":"","strokewidth":"2.5"}'
    	},{
	    xtype: 'hidden',
	    name:'latitude',
	    value: center.lat
	},{
	    xtype: 'hidden',
	    name:'longitude',
	    value: center.lon
	}];

	this.getForm().add(items);
	


        this.getForm().submit({
	    clientValidation: true,
            url:that.localUrl,	    
	    success: function(form, action){console.log('success');},
	    failure: function(form, action){ //manda sempre failure anche se l'invio e' ok!
                if (action.result)
                {
                    if (action.result.error)
                    {
                        if (action.result.error.code==='0')
                        {
                            Ext.Msg.alert({
                                title:'Invio riuscito',
                                msg: 'Report inviato correttamente',
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.INFO
                            });
                        }
                        else
                        {
                            Ext.Msg.alert({
                                title:'Invio non riuscito!',
                                msg: action.result.error.message,
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.ERROR
                            });
                        }
                    }
                    else
                    {
                        Ext.Msg.alert({
                            title:'Invio in coda...',
                            msg: 'invio messo in coda di attesa.',
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        });
                    }
                }
            }
        });
    },

    getUshahidiApi: function(task, by, formid, callback){
	var that=this;
        Ext.Ajax.request({
	    url: that.ushahidiUrl,	
	    params: {
	        task: task,
	        by: by,
	        formid: formid
	    },
	    success: function(response){
	        res=Ext.JSON.decode(response.responseText);
		var error=res.error;
		var payload=res.payload
		if (PM.Config.getUrls().proxy && typeof PM.Config.getUrls().proxy!=='undefined')
		{
		  error=res.contents.error;
		  payload=res.contents.payload
		}
	        callback(error, payload);
	    }
        });
    }
});
