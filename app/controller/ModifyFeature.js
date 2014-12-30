Ext.define('PM.controller.ModifyFeature', {

    extend: 'Ext.app.Controller', 
   
    refs:[{
      ref: 'win',
      selector: 'modifyfeaturewindow'
    },{
        ref: 'mappanel',
        selector:'mappanel'
    },{
        ref: 'form',
        selector: 'form[name=formFeatureMod]'
    },{
        ref: 'delBtn',
        selector: 'button[name=delBtnFeatureMod]'
    },{
        ref: 'saveBtn',
        selector: 'button[name=saveBtnFeatureMod]'
    }],
    
    attributes: false,
    
    init: function(){
      this.control({
	  'modifyfeaturewindow > tabpanel':{
                afterrender: this.loadDataFeature
            },
	  'button[name=saveBtnFeatureMod]':{
                click: this.onSave
            },
	   'button[name=delBtnFeatureMod]':{
                click: this.onDelete
            },
      });
    },
    
    disableButtons: function(value){
        this.getDelBtn().setDisabled(value);
        this.getSaveBtn().setDisabled(value);
    },
    
    loadDataFeature: function(){
        var form=this.getForm();
      //values=this.attributes;
	//form.items.items[0].items.items[1].items.items[3].update('');
      if (this.attributes){
	  if (typeof this.attributes.descr==='undefined')
	      this.attributes.descr='';
	  if (typeof this.attributes.text==='undefined')
	      this.attributes.text='';
	  form.query('textfield[name=name]')[0].setValue(this.attributes.name);
	  form.query('textfield[name=descr]')[0].setValue(this.attributes.descr);
	  form.query('textfield[name=title]')[0].setValue(this.attributes.title);
	  form.query('htmleditor[name=text]')[0].setValue(this.attributes.text);
	  form.query('textfield[name=link]')[0].setValue(this.attributes.link);
	  form.query('textfield[name=maplabel]')[0].setValue(this.attributes.maplabel);	
	  form.query('textfield[name=style]')[0].setValue(this.attributes.style);	
	  form.query('textfield[name=symbol_size]')[0].setValue(this.attributes.symbol_size);		   
	  if (this.attributes.weight && typeof this.attributes.weight==='string')
	    form.query('combo[name=weight]')[0].setValue(this.attributes.weight);  	   
	  this.loadMediaData();
	  this.disableButtons(false);
      }
    },
    
    loadMediaData: function(){
	var fase=PM.app.getController('Main').fase;
	var fid=PM.app.getController('Map').getMappanel().selectedFeature.fid;
	fid=fid.substring(fid.lastIndexOf('.')+1);
	
	var storeImages=PM.app.getStore('Images');
	var storeVideos=PM.app.getStore('Videos');
	var storeLinks=PM.app.getStore('Links');
	
	storeImages.getProxy().extraParams={
	      fase: fase,
	      fid: fid,
              'class': 'incident_photo'
	};
	
	storeVideos.getProxy().extraParams={
	      fase: fase,
	      fid: fid,
              'class': 'incident_video'
	};	
	
	storeLinks.getProxy().extraParams={
	      fase: fase,
	      fid: fid,
              'class': 'link'
	};	
	storeImages.load();
	storeVideos.load();
	storeLinks.load();	    
    },    
    
    onSave: function(){
        var that=this;
		
        Ext.MessageBox.show({
            title:'Salva modifiche',
            msg: 'Sei sicuro di voler modificare il simbolo?',
            buttons: Ext.MessageBox.YESNO,
	    buttonText:{yes: 'Si'},
            icon: Ext.MessageBox.QUESTION,
	    
	    fn: function(btn){
                if (btn==='yes'){
		      var form=that.getForm();
		      if (form.isValid())
		      {
			var mappanel=that.getMappanel();
			var o={
			    name: form.query('textfield[name=name]')[0].getValue(),
			    descr: form.query('textfield[name=descr]')[0].getValue(),
			    title: form.query('textfield[name=title]')[0].getValue(),
			    text: form.query('htmleditor[name=text]')[0].getValue(),
			    link: form.query('textfield[name=link]')[0].getValue(),
			    weight: form.query('combo[name=weight]')[0].getValue(),
			    maplabel: form.query('combo[name=maplabel]')[0].getValue(),
			    style: form.query('textfield[name=style]')[0].getValue(),
			    symbol_size: form.query('textfield[name=symbol_size]')[0].getValue()
			};
			mappanel.selectedFeature.attributes=o;
			mappanel.selectedFeature.state = OpenLayers.State.UPDATE;
			PM.app.getController('SaveFeature').saveType=OpenLayers.State.UPDATE;

			var fase = PM.app.getController('Main').fase;		  

			switch(fase)
			{
			case 1:
			    mappanel.saveStrategy1.save();
			    mappanel.wms1.redraw(true);
			    break;
			case 3:
			    mappanel.saveStrategy3.save();
			    break;
			case 6:
			    mappanel.saveStrategy6.save();
			    break;
			default:
			    break;
			}
			
			that.attributes=o;
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
    
    
    onDelete: function(){
        var that=this;
        var mappanel=this.getMappanel();
        Ext.MessageBox.confirm('Cancella simbolo', 'Sei sicuro di voler cancellare il simbolo?', function(btn){
            if(btn === 'yes')
            {
                var fase = PM.app.getController('Main').fase;
                mappanel.selectedFeature.state = OpenLayers.State.DELETE;
                PM.app.getController('SaveFeature').saveType=OpenLayers.State.DELETE;
                that.featureId=mappanel.selectedFeature.fid.substr(mappanel.selectedFeature.fid.lastIndexOf('.')+1);
                switch(fase)
                {
                case 1:
                    mappanel.saveStrategy1.save();
                    break;
                case 3:
                    mappanel.saveStrategy3.save();
		    break;
                case 6:
                    mappanel.saveStrategy6.save();		    
                    break;
                case 8:
                    mappanel.saveStrategy8.save();
                    break;
                default:
                    break;
                }
            }
        });
    },
    
    closeWindow: function(){
       this.getWin().close();
    }
    /*clearData: function(){
      this.getForm().form.reset();
    }*/
});
