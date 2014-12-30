Ext.define('PM.controller.SaveFeature', {

    extend: 'Ext.app.Controller',

    refs:[{
        ref: 'mappanel',
        selector:'mappanel'
    },{
        ref: 'window',
        selector: 'featurewindow'
    },{
        ref:'form',
        selector: 'featurewindow > form'
    },{
        ref: 'addMediaButton',
        selector: 'featurewindow button[id=addMedia]'
    },{
        ref: 'fileInput',
        selector: 'mediapanel filefield'
    },{
        ref: 'comboStyle',
        selector: 'combobox[name=style]'
    },{
        ref: 'comboSymbol',
        selector: 'combobox[name=symbol_size]'
    }],


    views:['FeatureWindow'],

    init: function(){
        var that = this;
	this.control({
	    'featurewindow':{
               // afterrender: this.onAfterRenderWindow,
	        close: this.onCloseWindow
	    },
            'window[id=mediaWindow]':{
	        close: this.onCloseMediaWindow
	    },
            'featurewindow button[text=Annulla]':{
                click: this.onCancel
            },
	    'featurewindow button[text=Salva]':{
                click: this.onSave
            },
            'featurewindow button[id=addMedia]': {
                click: this.onAddMediaBtnClick
            },
	    'combobox[name=maplabel]': {
                change: this.onChangeComboLabel
            },
            'combobox[name=style]': {
                change: this.onChangeComboStyle
            }
        });
    },
    
    onChangeComboLabel: function(c, value, oldValue, opts){
      if (value && value !== '')
      {
	var store=PM.app.getStore('Styles');
	var found=false;
	var panel=c.up('featurepanel');
	for (var i=0; i<store.data.length; i++)
	{
	  if (value===store.data.items[i].data.abstract)
	  {	    
	    var icon=store.data.items[i].data.icon;
	    panel.down('container[name=icon]').update('<img src="'+icon+'" / >');
	    panel.down('combobox[name=symbol_size]').clearValue();	    
	    panel.down('combobox[name=style]').clearValue();	
	    found=true;
	    break;
	  }
	}
	if (!found){
	  panel.down('container[name=icon]').update('');
	}
      }     
    },

    onChangeComboStyle: function(c, value, oldValue, opts){        
	var panel=c.up('featurepanel');
	var combo=panel.down('combobox[name=symbol_size]');
	combo.clearValue();
	
        switch(value){
        case 'Piccolo':
            combo.getStore().loadData([
                {name: '1', value: 1},
                {name: '2', value: 2}
            ]);
            break;
        case 'Medio':
            combo.getStore().loadData([
                {name: '3', value: 3}
            ]);
            break;
        case 'Grande':
            combo.getStore().loadData([
                {name: '4', value: 4},
                {name: '5', value: 5}
            ]);
            break;
        default:break;
        }
    },

    onAddMediaBtnClick: function(){
        this.getAddMediaButton().setDisabled(true);
        this.getWindow().openMediaWindow();
    },

    onCancel: function(){
      var that=this;
            Ext.MessageBox.show({
            title:'Annulla',
            msg: 'Sei sicuro di voler annullare la creazione del simbolo?',
            buttons: Ext.MessageBox.YESNO,
	    buttonText:{yes: 'Si'},
            icon: Ext.MessageBox.QUESTION,
	    
	    fn: function(btn){
                if (btn==='yes'){
		  that.getForm().form.reset();
		  that.getWindow().close();
		  that.getMappanel().featureWindowOpen=false;
		}
	    }
	  });
    },

    onCloseWindow: function(){
        this.getMappanel().featureWindowOpen=false;
	PM.app.getController('MediaPanel').clearGridStore();
    },

    onCloseMediaWindow: function(){
        this.getAddMediaButton().setDisabled(false);
    },

    onSave: function(){      
        var that=this;
        Ext.MessageBox.show({
            title:'Crea simbolo',
            msg: 'Sei sicuro di voler creare il simbolo?',
            buttons: Ext.MessageBox.YESNO,
	    buttonText:{yes: 'Si'},
            icon: Ext.MessageBox.QUESTION,
	    fn :function(btn){
	      if (btn==='yes'){
		var mappanel = that.getMappanel();

		var feature=that.getWindow().feature;
		var form=that.getForm().form;
		if (form.isValid())
		{
		  var values=form.getValues();
		  delete values.mediaLinkField;

		  feature.state=OpenLayers.State.INSERT;
		  that.saveType=OpenLayers.State.INSERT;
		  feature.attributes=values;
		  var fase = PM.app.getController('Main').fase;
		  
		  switch(fase)
		  {
		  case 1:
		      mappanel.wfs1.addFeatures([feature]);
		      mappanel.saveStrategy1.save();
		      break;
		  case 3:
		      mappanel.wfs3.addFeatures([feature]);
		      mappanel.saveStrategy3.save();
		      break;
		  case 6:
		      mappanel.wfs6.addFeatures([feature]);
		      mappanel.saveStrategy6.save();
		      break;
		  case 8:
		      mappanel.wfs8.addFeatures([feature]);
		      mappanel.saveStrategy8.save();
		      break;	    
		  default:
		      break;
		  }
	        }
	        else{
		  Ext.MessageBox.show({
		    title:'Attenzione!', 
		    msg:'Compila tutti i campi obbligatori.',
		    buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.WARNING
		  });
		}
	      }
	    }
	});     
    },


    onSaveFeature: function(response,a,b){
        var saveFeatureController=PM.app.getController('SaveFeature');
	
        switch (saveFeatureController.saveType)
        {
        case OpenLayers.State.INSERT:
            if (response.type==='success')
            {
                var fid=response.response.insertIds[0].substring(response.response.insertIds[0].lastIndexOf('.')+1);
                if (fid!==0 && fid!=='none')
                {
                    var form=saveFeatureController.getForm();
                    var values=form.getValues();

                
	   	    saveFeatureController.mask= new Ext.LoadMask(saveFeatureController.getWindow(), {msg: 'Attendi il termine del caricamento...'});
	saveFeatureController.mask.show();

                    var formData=PM.app.getController('MediaPanel').formData;
		    if (formData)
		    {
			var keys=Object.keys(values);		   
			for (var i=0; i<keys.length; i++)
			{
                            formData.append(keys[i], values[keys[i]]);
			}
			formData.append('fid', fid);
			formData.append('fase', PM.app.getController('Main').fase);
		    }
		    
                    var xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function(){
                        if (xhr.readyState == 4) {
			    saveFeatureController.mask.hide();
                            saveFeatureController.infoMsg('Salvataggio effettuato', 'Il simbolo &egrave; stato correttamente salvato',
                                                         function(){                                                             saveFeatureController.getWindow().close();
							     
                                                         });
                        }
                    };
                    xhr.open('POST', PM.Config.getUrls().saveFeature, true);
		  //  if (formData)
			xhr.send(formData);

                }
                else
                {
                    saveFeatureController.errMsg('Errore durante il salvataggio del simbolo!','Il simbolo non &egrave; stato salvato correttamente sul server.' );
                }
            }
            else
            {
                saveFeatureController.errMsg('Errore durante il salvataggio del simbolo!','Il simbolo non &egrave; stato salvato correttamente sul server.' );
            }
            break;
        case OpenLayers.State.UPDATE:
            if (response.type==='success'){
                saveFeatureController.infoMsg('Modifica effettuata', 'La modifica del simbolo &egrave avvenuta correttamente.', function(){
		  PM.app.getController('Info').loadDataInPopup(saveFeatureController.getMappanel().selectedFeature);
		  //var mapCnt=PM.app.getController('Map');
		  //mapCnt.popup.items.items[0].update(mapCnt.loadDataInPopup(saveFeatureController.getMappanel().selectedFeature));
		});
	    }
            else
                saveFeatureController.infoMsg('Errore!', 'Errore durante la modifica del simbolo!');
            break;
        case OpenLayers.State.DELETE:
            if (response.type==='success')
                {
                    var modCnt=PM.app.getController('ModifyFeature');
                    Ext.Ajax.request({
                        url: PM.Config.getUrls().deleteMedia,
                        params: {
                            fase: PM.app.getController('Main').fase,
                            featureId: modCnt.featureId
                        },
                        success: function(){
                            saveFeatureController.infoMsg('Cancellazione effettuata', 'La cancellazione del simbolo &egrave avvenuta correttamente.',
                                                          function(){
                                                              //modCnt.clearData();
                                                              //modCnt.disableButtons(true);
							      modCnt.closeWindow();
							      PM.app.getController('Info').closeWin();
                                                          });
                        }
                    });
                }
            else
                saveFeatureController.infoMsg('Errore!', 'Errore durante la cancellazione del simbolo!');
        default:
            break;
        }        
    },

    onFailSaveFeature: function(response){
        this.errMsg('Errore durante il salvataggio del simbolo!', 'Il simbolo non &egrave; stato salvato correttamente.');
    },

    infoMsg: function(title, text, callback){
        Ext.Msg.alert({
            title: title,
            msg: text,
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.INFO,
            fn: callback
        });
    },

    errMsg: function(title, text){
        Ext.Msg.alert({
            title: title,
            msg: text,
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.ERROR
        });
    }
});
