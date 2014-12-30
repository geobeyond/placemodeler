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
       ref: 'menuFase2',
       selector: 'splitbutton[id=splitFase2] > menu'
    },/*{
        ref: 'radiogroupFase2',
        selector: 'panelFase2 > radiogroup'
    },*/{
	ref: 'mediaPanel',
	selector: 'reportwindow mediapanel'
    },{
        ref: 'linkField',
        selector: 'mediapanel textfield[id=mediaLinkField]'
    },{
	ref: 'linkButton',
	selector: 'mediapanel button[id=mediaLinkBtn]'
    },{
	ref: 'fileButton',
	selector: 'mediapanel filefield'
    },{
        ref: 'grid',
        selector: 'mediapanel grid'
    },{
        ref: 'datefield',
	selector: 'datefield[id=incident_date]'
    },{
        ref: 'timefield',
	selector: 'timefield[id=incident_time]'
    }],

    init: function(){
        this.control({
	    'reportwindow button[text=Annulla]': {	
	        click: this.onClickAnnullaBtn
	    },
	    'reportwindow button[text=Invia Report]': {
	        click: this.onClickInviaBtn
	    },
            'reportwindow > form': {
                afterrender: this.onAfterRenderWindowForm
            },
	    'reportwindow': {	        
		close: this.onCloseWindow
	    }
        });

	if (PM.Config.getUrls().proxy && typeof PM.Config.getUrls().proxy!=='undefined')
	    this.localUrl=PM.Config.getUrls().proxy+encodeURIComponent(PM.Config.getUrls().server + PM.Config.getUrls().ushahidiURL);
	else
	    this.localUrl=PM.Config.getUrls().server + PM.Config.getUrls().ushahidiURL;

	if (PM.Config.getUrls().proxy && typeof PM.Config.getUrls().proxy!=='undefined')
	    this.ushahidiUrl=PM.Config.getUrls().proxy+encodeURIComponent(PM.Config.getUrls().server + PM.Config.getUrls().ushahidiURL);
	else
	    this.ushahidiUrl=PM.Config.getUrls().server + PM.Config.getUrls().ushahidiURL;
    },

    onCloseWindow: function() {
	this.getGrid().getStore().removeAll();
    },
    
    onAfterRenderWindowForm: function(){
        var domain=document.domain.split('.');
        var thirdDomain='www';
	
        if (domain.length>1)
        {
            if (!domain[0].match(/\d+/g))
                thirdDomain=domain[0];
        }
        Ext.getCmp('location_name').setValue(thirdDomain);	
	
	//ora e data
	var date = new Date();
	this.getDatefield().setValue(date);
	var minutes=date.getMinutes();
	if (minutes<10)
	  minutes='0'+minutes;
	this.getTimefield().setValue(date.getHours()+':'+minutes);
    },

    onClickAnnullaBtn: function(){
      var that=this;
              Ext.MessageBox.show({
            title:'Cancella informazioni',
            msg: 'Sei sicuro di voler cancellare le informazioni del report?',
            buttons: Ext.MessageBox.YESNO,
	    buttonText:{yes: 'Si'},
            icon: Ext.MessageBox.QUESTION,
	    fn :function(btn){
	      if (btn==='yes'){
		that.getForm().form.reset();
		PM.app.getController('MediaPanel').clearGridStore();	
	      }
	    }
	});
    },


    onClickInviaBtn: function(){
        var that=this;
	
	 Ext.MessageBox.show({
            title:'Invia report',
            msg: 'Sei sicuro di voler inviare il report?',
            buttons: Ext.MessageBox.YESNO,
	    buttonText:{yes: 'Si'},
            icon: Ext.MessageBox.QUESTION,
	    fn :function(btn){
	      if (btn==='yes'){
		 var incidentCategory = false;
		  var values=that.getForm().form.getValues();
		  var title = that.getWindow().title;
		  var subs = PM.app.getController('Project').subCategories;
	
		  for(var z = 0; z< subs.length; z++)
		  {
		    if (subs[z].category_title = title)
		    {
		      incidentCategory = subs[z].id;
		      break;
		    }
		  }
		  
		  if (values.delete && typeof values.delete!=='undefined')
		  {
		      var time=values.delete;
		      var pos=time.indexOf(':');
		    // var pos1=time.indexOf(' ');
		      var hour=time.substring(0, pos);
		      var min=time.substring(pos+1);
		      var ampm = 'am';
		      if (hour >=12)
		      {
			ampm = 'pm';
			hour = hour - 12;
		      }
		    // var ampm=time.substring(pos1+1).toLowerCase();
		      Ext.getCmp('submitForm-ampm').setValue(ampm);
		      Ext.getCmp('submitForm-hour').setValue(hour);
		      Ext.getCmp('submitForm-min').setValue(min);
	      }

        var mappanel=that.getMappanel();
	var center=mappanel.map.getCenter();
	center=center.transform(mappanel.sphericMercator, mappanel.WGS84);



	var geom=mappanel.selectedFeature.geometry;
	var t=0;
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

	    that.getForm().add(items);
        }
        else
        {
            geomCmp.setValue('{"geometry":"'+lonlatclone.toString()+'","label":"","comment":"","lat":"","lon":"","color":"","strokewidth":"2.5"}');
            Ext.getCmp('latItem').setValue(center.lat);
            Ext.getCmp('lonItem').setValue(center.lon);
        }	
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
            if (xhr.readyState == 4) {
		that.mask.hide();
		Ext.Msg.alert({
		    title: 'Invio riuscito',
		    msg: 'Report inviato correttamente',
		    buttons: Ext.Msg.OK,
		    icon: Ext.Msg.INFO,
		    fn: function(){			
			that.getWindow().close();
		    }
		});
		/*	saveFeatureController.mask.hide();
                 saveFeatureController.infoMsg('Salvataggio effettuato', 'Il simbolo &egrave; stato correttamente salvato',
                 function(){	
                 });*/
            }
        };
	var form=that.getForm().form;
	var values = form.getValues();
	
	//values.incident_category=
	
	values.incident_category = incidentCategory;

	var formData=PM.app.getController('MediaPanel').formData;
	if (formData)
	{
	    var keys=Object.keys(values);		   
	    for (var i=0; i<keys.length; i++)
	    {
                formData.append(keys[i], values[keys[i]]);
	    }
	}

	
	that.mask= new Ext.LoadMask(that.getWindow(), {msg: 'Attendi il termine del caricamento...'});
	that.mask.show();
	xhr.open('POST', that.localUrl, true);
	xhr.send(formData);
	  }
	    }
      });
    },

    customReport: function(task, by, formId, fid, window){
        var that=this;

	/*if (by!=='all'){
	      if (formId!==4)
	     {
	     this.getLinkField().hide();
	     this.getLinkButton().hide();
	     this.getFileButton().show();
	     }
	     else {	
	     this.getLinkField().show();
	     this.getLinkButton().show();
	     this.getFileButton().hide();		    
	     }
	}*/
	
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
		/*if (PM.Config.getUrls().proxy && typeof PM.Config.getUrls().proxy!=='undefined')
		 {
		 error=res.contents.error;
		 payload=res.contents.payload;
		 }*/
	        if (error.code!=='0')
	        {
                    Ext.Msg.alert({
                        title:'Errore!',
                        msg: error.message,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
		    return false;
	        }
	        else
	        {
	            if (by==='all')
	            {			
		        var menuFase2=that.getMenuFase2();
			for (var i=0; i < payload.customforms.length-2; i++)
			{
			  var elem={
			    text: payload.customforms[i].title,
			    inputValue: payload.customforms[i].id,
			  }
			 menuFase2.add(elem);
			}
			//that.getMenuFase2().setMenu();
			
	                /*var radiogroup=that.getRadiogroupFase2();
	                for (var i=0; i < payload.customforms.length-2; i++)
	                {
		            var elem={
		                boxLabel: payload.customforms[i].title,
		                name: 'radioFase2',
		                inputValue: payload.customforms[i].id,
			        checked: i === 0 ? true : false
		            };
	                    radiogroup.add(elem);
	                }*/
	            }
	            else
	            { 
			var fase=PM.app.getController('Main').fase;
		        var parseFields = function (str){
			    var separator=',';
			    if (fase===4 ||fase===7)
				separator=', ';
	                    var val, valori=[];
	                    val=str.split('::');
	                    var valPredefinito=val[1];
	                    valori=val[0].split(separator);
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
                                        name:'custom_field['+field.id+']'
					//  name: 'layer_fk'
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
    },

    getCustomFormIds: function(formId, callback) {
	var that=this;
	Ext.Ajax.request({
	    url: that.ushahidiUrl,
	    params: {
	        task: 'customforms',
	        by: 'meta',
	        formid: formId		
	    },
	    success: function(response) {
		res=Ext.JSON.decode(response.responseText);
		var error=res.error;
		var payload=res.payload;
		if (error.code!=='0')
	        {
                    Ext.Msg.alert({
                        title:'Errore!',
                        msg: error.message,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR,
			fn:function() {
			    callback(null, true);
			}
                    });
	        }
		else
		{
		    var ids=[];
		    for(var i = 0; i < payload.customforms.fields.length; i++) {
			if (payload.customforms.fields[i].name !== 'layer_fk')
			    ids.push(payload.customforms.fields[i].id);
		    }
		    callback(ids, false);
		}
	    }
	});
    }
});
