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
    },{
        ref: 'radiogroupFase2',
        selector: 'panelFase2 > radiogroup'
    }],



    init: function(){
        this.control({
	    'reportwindow button[text=Annulla]': {
	        click: this.onClickAnnullaBtn
	    },
	    'reportwindow button[text=Invia Report]': {
	        click: this.onClickInviaBtn
	    },
            'reportwindow > form':{
                afterrender: this.onAfterRenderWindowForm
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


    onAfterRenderWindowForm: function(){
        //dominio
        var domain=document.domain.split('.');
        var thirdDomain='www';
        if (domain.length>1)
        {
            if (!domain[0].match(/\d+/g))
                thirdDomain=domain[0];
        }
        Ext.getCmp('location_name').setValue(thirdDomain);
    },

    onClickAnnullaBtn: function(){
        this.getForm().form.reset();
        //this.getWindow().close();
    },


    onClickInviaBtn: function(){
        var that=this;
      	var values=this.getForm().form.getValues();
	if (values.delete && typeof values.delete!=='undefined')
	{
	    var time=values.delete;
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


       var geomCmp=Ext.getCmp('geomItem');
        if (!geomCmp && typeof geomCmp==='undefined')
        {
	    var items=[{
    	        xtype: 'hidden',
                id: 'geomItem',
    	        name:'geometry[1]',
    	        value: '{"geometry":"'+lonlatclone.toString()+'","label":"","comment":"","lat":"","lon":"","color":"","strokewidth":"2.5"}'
    	    },{
	        xtype: 'hidden',
	        name:'latitude',
                id: 'latItem',
	        value: center.lat
	    },{
	        xtype: 'hidden',
	        name:'longitude',
                id: 'lonItem',
	        value: center.lon
	    }];

	    this.getForm().add(items);
        }
        else
        {
            geomCmp.setValue('{"geometry":"'+lonlatclone.toString()+'","label":"","comment":"","lat":"","lon":"","color":"","strokewidth":"2.5"}');
            Ext.getCmp('latItem').setValue(center.lat);
            Ext.getCmp('lonItem').setValue(center.lon);
        }



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
                                icon: Ext.Msg.INFO,
                                fn: function(){that.getWindow().close();}
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

    customReport: function(task, by, formId, fid, window){
        var that=this;
        Ext.Ajax.request({
	    url: that.ushahidiUrl,
	    params: {
	        task: task,
	        by: by,
	        formid: formId
	    },
	    success: function(response){
	        res=Ext.JSON.decode(response.responseText);
		var error=res.error;
		var payload=res.payload;
		if (PM.Config.getUrls().proxy && typeof PM.Config.getUrls().proxy!=='undefined')
		{
		    error=res.contents.error;
		    payload=res.contents.payload;
		}
	        if (error.code!=='0')
	        {
                    Ext.Msg.alert({
                        title:'Errore!',
                        msg: err.message,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
	        }
	        else
	        {
	            if (by==='all')
	            {
	                var radiogroup=that.getRadiogroupFase2();
	                for (var i=0; i < payload.customforms.length-2; i++)
	                {
		            var elem={
		                boxLabel: payload.customforms[i].title,
		                name: 'radioFase2',
		                inputValue: payload.customforms[i].id
		            };
	                    radiogroup.add(elem);

	                }
	            }
	            else
	            {
                        //var selectedFeature=that.getMappanel().selectedFeature;
                        // var fid='';
                        // if (selectedFeature && typeof selectedFeature!=='undefined')
                        //fid=selectedFeature.fid;

		        var parseFields= function (str){
	                    var val,valori=[];
	                    val=str.split('::');
	                    var valPredefinito=val[1];
	                    valori=val[0].split(', ');
	                    return [valori,valPredefinito];
                        };

                        var questionItems=[], htmlEditor;
	                for (var i=0; i<payload.customforms.fields.length; i++)
	                {
                            var field=payload.customforms.fields[i];
                            switch(field.type)
                            {
                            case '1':
                                if (field.name==='layer_fk')
                                {
                                    window.add({
                                        xtype: 'hiddenfield',
                                        value: fid,
                                        //name:'custom_field['+field.id+']'
                                        name: 'layer_fk'
                                    });
                                }
                                else if (field.name==='Peso'){
                                    var storePeso = Ext.create('Ext.data.Store',{
                                        fields:['name','value'],
                                        data:[
                                            {name: '1', value: 1},
                                            {name: '2', value: 2},
                                            {name: '3', value: 3},
                                            {name: '4', value: 4},
                                            {name: '5', value: 5}
                                        ]
                                    });
                                    questionItems.push({
                                        xtype: 'combo',
                                        //name: field.name,
                                        name:'custom_field['+field.id+']',
                                        labelWidth:70,
                                        width: 180,
                                        labelAlign:'left',
                                        fieldLabel: field.name,
                                        store: storePeso,
                                        displayField: 'name',
                                        valueField: 'value'
                                    });
                                }
                                else
                                {
                                    questionItems.push({
                                        xtype: 'textfield',
                                        //name: field.name,
                                        name:'custom_field['+field.id+']',
                                        labelWidth:70,
                                        width: 180,
                                        labelAlign:'left',
                                        fieldLabel: field.name
                                    });
                                }
                                break;
                            case '2':
                                htmlEditor={
                                    xtype: 'htmleditor',
                                    fieldLabel: field.name,
                                    //name: field.name
                                    name:'custom_field['+field.id+']',
                                    width: 676,
                                    colspan:2
                                };
                                break;
                            case '7':
                                var labelWidth=220;
                                var width=320;
                                if (formId===2 || formId===3)
                                {
                                    labelWidth=70;
                                    width=180;

                                }
                                var allowBlank=true;
                                if (formId<5)
                                {
                                    if (field.name==='Tipologia')
                                        allowBlank=false;
                                }
                                else
                                {
                                    allowBlank=false;
                                }
                                questionItems.push({xtype: 'combobox',
			                            width: width,
			                            fieldLabel:field.name,
                                                    labelWidth: labelWidth,
                                                    name:'custom_field['+field.id+']',
			                            store: parseFields(field.default)[0],
			                         //   value: parseFields(field.default)[1],
                                                    allowBlank: allowBlank,
                                                    editable: false
			                           });
                                break;
                            default:
                                break;
                            }
                        }

                        //add form_id
                        window.add({
			  xtype: 'hidden',
			  name: 'form_id',
			  value: formId
			});

                        if (typeof htmlEditor!=='undefined')
                        {
                            window.add(htmlEditor);
                        }

                        if (questionItems.length > 0)
                        {
                            window.add({
                                xtype: 'container',
                                margin: '10 0 0 0',
                                layout: {
                                    type: 'vbox'
                                },
                                items: questionItems
                            });
                        }
	            }
	        }
	    }
        });
    }
});
