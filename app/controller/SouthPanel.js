Ext.define('PM.controller.SouthPanel', {

    extend: 'Ext.app.Controller',

    refs:[{
        ref: 'panel',
        selector: 'southtabpanel'
    },{
        ref: 'form',
        selector: 'southtabpanel > form'
    },{
        ref: 'mappanel',
        selector:'mappanel'
    },/*{
        ref: 'delBtn',
        selector: 'southtabpanel button[name=delBtn]'
    },{
        ref: 'saveBtn',
        selector: 'southtabpanel button[name=saveBtn]'
    },*/{
      ref: 'dataviewImages',
      selector: 'dataview[id=dataViewImages]'
    },{
        ref: 'ptImages',
        selector: 'pagingtoolbar[id=pgImages]'
    },{
        ref: 'dataviewVideos',
        selector: 'dataview[id=dataViewVideos]'
    },{
        ref: 'dataviewLinks',
        selector: 'dataview[id=dataViewLinks]'
    },{
        ref: 'chartBox',
        selector: 'panel[id=chartTab] box'
    },{
	ref: 'pagingImages',
        selector:'pagingtoolbar[id=pgImages]'
    },{
      ref: 'box',
      selector: 'panel[id=chartTab] box[name=relIndex]'
    },{
      ref: 'chart',
      selector: 'chart'
    }],

    
    init: function(){
        this.control({      
            'southtabpanel button[name=saveBtn]':{
                click: this.onSave
            },
            'southtabpanel button[name=delBtn]':{
                click: this.onDelete
            },
            'dataview[id=dataViewImages]':{
                itemclick: this.onItemClick
            },
	    'dataview[id=dataViewVideos]':{
                itemclick: this.onItemClick
            },
	    'dataview[id=dataViewLinks]':{
                itemclick: this.onItemClick
            },
	    'grid[name=gridDetailReports]':{
		select: this.onSelectGrid
	    },
	    'button[name=deleteReport]':{
		click: this.onDeleteReport
	    }
        });
	if (PM.Config.getUrls().proxy && typeof PM.Config.getUrls().proxy!=='undefined')
	    this.ushahidiUrl=PM.Config.getUrls().proxy+encodeURIComponent(PM.Config.getUrls().ushahidiURL);
	else
	    this.ushahidiUrl=PM.Config.getUrls().ushahidiURL;
    },

    reportTypes: ['', 'Scheda Default',
		  'Scheda Nominale',
		  'Scheda Percettiva',
		  'Scheda Grafica/Foto/Video',
		  'Questionario Fase 4'
		 ],

    onSelectGrid: function(selModel, record, index, options) {
	var store=PM.app.getStore('ReportDetails');
	var d=store.getAt(index);	
	this.getPanel().reportDetailWindow(d);
    },

    onItemClick: function(dataview, record, item, index, event, options){
      if (dataview.id==='dataViewImages')
      {
        if(event.target.className === 'removeicon'){
	  this.removeFile(record.data.id, dataview.id);      
        }
        else
        {
            var width=record.data.width;
            var height=record.data.height;
            var maxWidth=PM.Config.getImage().maxWidth;
            var maxHeight=PM.Config.getImage().maxHeight;

            if (width > maxWidth)
                {
                    height=(height*maxWidth)/width;
                    if (height>maxHeight)
                        height=maxHeight;
                    width=maxWidth;
                }
            else if (height > maxHeight)
                {
                    width=(width*maxHeight)/height;
                    if (width>maxWidth)
                        width=maxWidth;
                    height=maxHeight;
                }
            var url = document.URL.substr(0, document.URL.lastIndexOf('/'));
            var win=new Ext.Window({
                title: record.data.name,
                items:[{
                    xtype: 'panel',
                    html:'<img src="'+url+record.data.path+record.data.name+'.'+record.data.type+'" width="'+width+'" height="'+height+'"  />'
                }]
            }).show();
        }
      }
      else if(dataview.id=='dataViewLinks')
      {
	 if(event.target.className === 'removeicon'){
	  this.removeFile(record.data.id, dataview.id);      
        }
        else
	{
	  if(event.target.className === 'removeicon'){
	   this.removeFile(record.data.id, dataview.id); 
	  }
	   var win = window.open(record.data.path, '_newtab');
	   win.focus();
	}
      }
      else
      {
	 if(event.target.className === 'removeicon'){
	  this.removeFile(record.data.id, dataview.id);   
	 }
      }
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
			if (fase===8){
			  mappanel.saveStrategy8.save();
			}
			/*switch(fase)
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
			case 8:
			    mappanel.saveStrategy8.save();
			    break;
			default:
			    break;
			}*/
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

  /*  onDelete: function(){
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
    },*/

  /*  //TODO:cancellare
    loadDataFeature: function(values){
        var form=this.getForm();
	form.items.items[0].items.items[1].items.items[3].update('');
        if (typeof values.descr==='undefined')
            values.descr='';
        if (typeof values.text==='undefined')
            values.text='';
        form.query('textfield[name=name]')[0].setValue(values.name);
        form.query('textfield[name=descr]')[0].setValue(values.descr);
        form.query('textfield[name=title]')[0].setValue(values.title);
        form.query('htmleditor[name=text]')[0].setValue(values.text);
        form.query('textfield[name=link]')[0].setValue(values.link);
        form.query('textfield[name=maplabel]')[0].setValue(values.maplabel);	
	form.query('textfield[name=style]')[0].setValue(values.style);	
	form.query('textfield[name=symbol_size]')[0].setValue(values.symbol_size);		   
	if (values.weight && typeof values.weight==='string')
	  form.query('combo[name=weight]')[0].setValue(values.weight);  	   
	this.loadMediaData();
    },
    //TODO:cancellare
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
   */
    
    clearData: function(){
        this.loadGridData([]);
	this.loadChartData([]);
	this.getChartBox().update('');
	this.clearRelativeIndexBox();
    },
    
    loadData: function(info) {
	var that=this;	
        var html='<div class="reportTexts">';
        var result=[0,0,0,0,0,0];

	if (!info) {
	  that.loadGridData([]);
	  that.loadChartData([]);
	  that.clearRelativeIndexBox();
	}
	else {
	    html+='<p>Titolo: <span class="desc_text">'+info.title+'</span></p>';
            html+='<p>Testo: <span class="desc_text">'+info.text+'</span></p>';
            html+='<p>Descrizione: <span class="desc_text">'+info.descr+'</span></p>';
            var fid=this.getMappanel().selectedFeature.fid;

	    that.mask = new Ext.LoadMask(that.getPanel().getActiveTab(), {msg: 'Attendi il caricamento'});
	    that.mask.show();
	    Ext.Ajax.request({
                url: that.ushahidiUrl,
	        params: {
		    task:'incidents', 
		    by:'all',
		    limit:50000
		},
		success: function(response) {
		    var respApi=Ext.decode(response.responseText);
                    var reports=[];		    
                    var incidents=respApi.payload.incidents;
	
		    for (var i=0; i < incidents.length; i++ )
                    {
                        var customFields=incidents[i].customfields;
                        var keys=Object.keys(customFields);
                        for(var j = 0; j < keys.length; j++)
                        {
                            if (customFields[keys[j]].field_name==='layer_fk' && customFields[keys[j]].field_response===fid){
                                var ff=customFields[keys[j]];
                                var formId=customFields[keys[j]].form_id;
                                result[formId]++;
				incidents[i].tipo=formId;
				reports.push(incidents[i]);
                            }				
                        }		
                    }
		    that.mask.hide();
		    that.loadGridData(reports);
		    that.resultChart=result;
		    that.loadChartData(result);
		    
		    var relativeIndex=PM.app.getController('Map').getRelativeIndex(info.weight, reports);
		    if (relativeIndex || reports.length>0)
		      that.getBox().update(that.formatIndexesData(relativeIndex, reports.length));
		      //that.getBox().update('<div class="reportTexts"><p>Indice Relativo: <span class="desc_text">'+relativeIndex.toFixed(2)+'</span></p></div>');
		    else
		      that.clearRelativeIndexBox();
		}
	    });
	}
	
	html+='</div>';
        this.getChartBox().update(html);	
    },
    
    clearRelativeIndexBox: function(){
      this.getBox().update('<div class="reportTexts"></div>');
    },
    
    formatIndexesData: function(relIndex, numReports){
      var html = '<div class="reportTexts"><p>';
      if (relIndex)
	html+='Indice Relativo: <span class="desc_text">'+relIndex.toFixed(2)+'</span>';
      
      
      html+='<b>Numero schede inviate: </b><span class="desc_text">'+numReports+'</span>';
      //TODO::aggiungi somma medie
      html+='<b>Somma delle medie: </b><span class="desc_text">'+numReports+'</span>';
     
      html+='</p></div>';      
      return html;
    },

    loadGridData: function(values) {		  
	var store = PM.app.getStore('ReportDetails');
	var data=[];
	for (var i=0; i<values.length; i++){
	    data.push({
		name: values[i].incident.incidenttitle,
		type: this.reportTypes[values[i].tipo],
		data: values[i]
	    });
	}
	store.loadData(data);
    },

    loadChartData: function(result) {
	var store = PM.app.getStore('Reports');
        store.loadData([     	    
	    { 'name': this.reportTypes[1], 'data': result[1] },
            { 'name': this.reportTypes[2], 'data': result[2] },
            { 'name': this.reportTypes[3], 'data': result[3] },
            { 'name': this.reportTypes[4], 'data': result[4] },
            { 'name': this.reportTypes[5], 'data': result[5] }
        ]);
    },
    
   /* clearData: function(){
        this.getForm().form.reset();
	this.getPanel().setDisabled(true);
    },*/

  /*  disableButtons: function(value){
        this.getDelBtn().setDisabled(value);
        this.getSaveBtn().setDisabled(value);
    },
*/
    setChartPanel: function(){
        var panel=this.getPanel();
        panel.child('#editingTab').tab.hide();
        panel.child('#mediaTab').tab.hide();
        panel.child('#chartTab').tab.show();
	panel.child('#detailsTab').tab.show();
        panel.setActiveTab('chartTab');
    },

    setEditingTab: function(){
        var panel=this.getPanel();
        panel.child('#editingTab').tab.show();
        panel.child('#mediaTab').tab.show();
        panel.child('#chartTab').tab.hide();
	panel.child('#detailsTab').tab.hide();
        panel.setActiveTab('editingTab');
    },
    
    removeFile: function(f, type){
               Ext.MessageBox.show({
                title:'Cancella il file',
                msg: 'Sei sicuro di voler cancellare il file?',
                buttons: Ext.MessageBox.YESNO,
                icon: Ext.MessageBox.QUESTION,
                fn: function(btn){
                    if (btn==='yes')
                    {
                        Ext.Ajax.request({
                            url: PM.Config.getUrls().deleteMedia,
                            params: {
                                fase: PM.app.getController('Main').fase,
                                id: f,
				type: type
                            },
                            success: function(response){
                                var res=Ext.JSON.decode(response.responseText);
                                //TODO::modificare in res.success se non usi proxy
				
                                if (res.success)
                                {
				  var removeElemFromStore = function(store, id){
				    for (var i=0; i<store.data.items.length; i++){
				      if (store.data.items[i].id === id){
					store.removeAt(i);
					break;
				      }
				    }
				  };
                                    Ext.Msg.alert({
                                        title: 'OK',
                                        msg: 'cancellazione effettuata correttamente',
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.Msg.INFO,
                                        fn: function(){
                                            switch (type){
					      case 'dataViewImages':
						var storeImages=PM.app.getStore('Images');
						removeElemFromStore(storeImages, f);
						storeImages.load();
						break;
					      case 'dataViewVideos':
						var storeVideos=PM.app.getStore('Videos');
						removeElemFromStore(storeVideos, f);
						storeVideos.load();
						break;
					      case 'dataViewLinks':
						var storeLinks=PM.app.getStore('Links');
						removeElemFromStore(storeLinks, f);
						storeLinks.load();
						break;
					    }
                                        }
                                    });
                                }
                                else
                                {
                                    Ext.Msg.alert({
                                        title: 'Errore!',
                                        msg: 'Errore durante la cancellazione del file.',
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.Msg.INFO
                                    });
                                }
                            }
                        });
                    }
                }
         });
    }
});
