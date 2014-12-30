Ext.define('PM.controller.Map', {

    extend: 'Ext.app.Controller',

    refs:[{
        ref: 'mappanel',
        selector: 'mappanel'
    },{
        ref: 'southPanel',
        selector: 'panel[id=southPanel]'
    }/*,{
        ref: 'modifyFeatureButton',
        selector: 'mappanel > toolbar > button[id=modifyFeatureButton]'
    },{
        ref: 'southFeaturePanel',
        selector: 'featurepanel[id=southFeaturePanel]'
    }*/],

    init: function(){
        this.control({
	    'mappanel': {
		afterrender: this.afterRenderMapPanel
	    },
	    //TODO:: cambiare per bottone in finestra informazioni
            'button[id=modifyFeatureButton]':{
                click: this.handleModifyFeature
            }
	});
	if (PM.Config.getUrls().proxy && typeof PM.Config.getUrls().proxy!=='undefined')
	    this.ushahidiUrl=PM.Config.getUrls().proxy+encodeURIComponent(PM.Config.getUrls().ushahidiURL);
	else
	    this.ushahidiUrl=PM.Config.getUrls().ushahidiURL;	
    },


    afterRenderMapPanel: function(){
        var that=this;
        var mappanel=this.getMappanel();
        var saveFeatureController=PM.app.getController('SaveFeature');
        var mainController=PM.app.getController('Main');
        var modCnt=PM.app.getController('ModifyFeature');
	
	var selectWfs = function(feature, selectControl){
                mappanel.selectedFeature=feature;

		modCnt.attributes=feature.attributes;
                // modCnt.loadDataFeature(feature.attributes);
//                 modCnt.disableButtons(false);
		that.infoPopup(false, selectControl);
		that.unselectByClick=true;	  
	};
	var unselectWfs = function(){

	  
	  mappanel.selectedFeature=null;
	  modCnt.attributes=false;
            //  modCnt.clearData();
            //  modCnt.disableButtons(true);	      
	      if (that.unselectByClick)
	      {
  		that.closeInfoPopup();
	      }
	};

	mappanel.wfs1.events.on({
	    "featureselected": function(e) {
	      selectWfs(e.feature, mappanel.selectControl);
	    },
            "featureunselected": function(e) {
	      unselectWfs();
	    }
	});

        mappanel.wfs3.events.on({
	    "featureselected": function(e) {
	        selectWfs(e.feature, mappanel.selectControl3);
	    },
            "featureunselected": function(e) {
		unselectWfs();
	    }
	});
	
	mappanel.wfs6.events.on({
	    "featureselected": function(e) {
		selectWfs(e.feature, mappanel.selectControl6);		
	    },
            "featureunselected": function(e) {
		unselectWfs();
	    }
	});
	
	mappanel.wfs8.events.on({
	  "featureselected": function(e) {	    
	    /*mappanel.selectedFeature=e.feature;
	    that.infoPopup(false, mappanel.selectControl8);
	    that.unselectByClick=true;*/
	    selectWfs(e.feature, mappanel.selectControl3);
	  },
	  "featureunselected": function(e){
	    if (that.unselectByClick)
	    {
	      unselectWfs();
// 	      mappanel.selectedFeature=null;
// 	      that.closeInfoPopup();
	    }
	  }
	});

	mappanel.vector.events.on({
	    "featureadded": function(e) {
		mappanel.saveFeature(e.feature);

	    }
	});

        mappanel.featureInfoControl2.events.on({
            'getfeatureinfo': function(e){
                that.featureInfoSelect(e, mainController, mappanel);
		that.infoPopup(e.xy, false);
	    }
        });

        mappanel.featureInfoControl4.events.on({
            'getfeatureinfo': function(e){
                that.featureInfoSelect(e, mainController, mappanel);
		that.infoPopup(e.xy, false);
            }
        });

        mappanel.saveStrategy1.events.on({
            'success': saveFeatureController.onSaveFeature,
            'fail': saveFeatureController.onFailedSaveFeature
        });

        mappanel.saveStrategy3.events.on({
            'success': saveFeatureController.onSaveFeature,
            'fail': saveFeatureController.onFailedSaveFeature
        });
	
        mappanel.saveStrategy6.events.on({
            'success': saveFeatureController.onSaveFeature,
            'fail': saveFeatureController.onFailedSaveFeature
        });	

        mappanel.saveStrategy8.events.on({
            'success': saveFeatureController.onSaveFeature,
            'fail': saveFeatureController.onFailedSaveFeature
        });
    },

    featureInfoSelect: function(e, mainController, mappanel){
        mappanel.clearAllHighlight();
	var d = Ext.JSON.decode(e.text);
        if(d.features && d.features.length > 0)
	{
	    mappanel.createHighlightFeature(d.features[0].geometry);
	    //mappanel.selectedFeature=d.features[0];
	    mappanel.selectedFeature.attributes=d.features[0].properties;
            mappanel.selectedFeature.fid=d.features[0].id;
	    
	    PM.app.getController('ModifyFeature').attributes = mappanel.selectedFeature.attributes;
	    
	}
        else
        {
            mappanel.selectedFeature=null;
	    PM.app.getController('ModifyFeature').attributes = false;
        }
        if (mainController.fase===5)
        {
            if (this.getSouthPanel().getCollapsed())
                this.handleSouthPanel();
	    var controller=PM.app.getController('SouthPanel');
            if(d.features && d.features.length > 0)
	    {
		controller.loadData(d.features[0].properties);
	    }
            else
	    {
		controller.loadData(null);
	    }
        }
    },

    
    handleSouthPanel: function(){
        var southPanel=this.getSouthPanel();
        if (southPanel.getCollapsed())
	{
// 	    this.getModifyFeatureButton().setText('Chiudi form di modifica simbolo');
            southPanel.expand();
	}
        else
	{
            southPanel.collapse();
// 	    this.getModifyFeatureButton().setText('modifica simbolo');
	}
    },
    
    handleModifyFeature: function(){
      /*if (!this.fWin){
	this.fWin = Ext.create('PM.view.ModifyFeatureWindow');
      }
      this.fWin.show();*/
      Ext.create('PM.view.ModifyFeatureWindow').show();
    },
    
    processWps: function(layer, averageIndex){
        var that=this;	
	var mappanel = this.getMappanel();
	var process;	 

	  OpenLayers.Request.GET({
	      url: PM.Config.getUrls().wpsClient,
	      params: {
		  "SERVICE": "WPS",
		  "REQUEST": "DescribeProcess",
		  "VERSION": '1.0.0',
		  "IDENTIFIER": 'gs:Bounds'
	      },
	      success: function(response) {
		  process = new OpenLayers.Format.WPSDescribeProcess().read(
		      response.responseText
		  ).processDescriptions['gs:Bounds'];
		  
		  var output = process.processOutputs[0];
		  var input;
		  for (var i=process.dataInputs.length-1; i>=0; --i) {
		      input = process.dataInputs[i];
		      if ((input.minOccurs === 0 || input.occurrence) && !input.data && !input.reference) {
			  OpenLayers.Util.removeItem(process.dataInputs, input);
		      }
		  }
		  process.responseForm = {		    
		      rawDataOutput: {
			  identifier: 'bounds'
		      }
		  };

		  process.dataInputs=[{
		      identifier: 'features',
		      title: 'features',
		      reference:{
			  body:{
			      wfs: {
				  version: "1.0.0",
				  outputFormat: "GML2",				
				  featureType: layer
			      }
			  },
			  mimeType: "text/xml; subtype=wfs-collection/1.0",
			  href: "http://geoserver/wfs",
			  method: "POST"
		      }		
		  }];		
	  
		  OpenLayers.Request.POST({
		      url: PM.Config.getUrls().wpsClient,
		      data: new OpenLayers.Format.WPSExecute().write(process),
		      success: function(response) {
			  var contentType=response.getResponseHeader('Content-Type');		
			  if (contentType == "text/xml") {

			      var googleProj =  new OpenLayers.Projection("EPSG:900913");
			      var WGS84 = new OpenLayers.Projection("EPSG:4326");
			      var sphericMercator = new OpenLayers.Projection("EPSG:3857");
			      
			      var color=PM.Config.getWps().colors.white;
			      if (averageIndex <= PM.Config.getWps().values.min)
				color=PM.Config.getWps().colors.red; //rosso
			      else if (averageIndex > PM.Config.getWps().values.min && averageIndex <= PM.Config.getWps().values.med)
				color=PM.Config.getWps().colors.orange; //arancione
			      else if (averageIndex > PM.Config.getWps().values.med && averageIndex <=PM.Config.getWps().values.medMax)
				color=PM.Config.getWps().colors.yellow; //giallo
			      else if (averageIndex > PM.Config.getWps().values.medMax && averageIndex <=PM.Config.getWps().values.max)
				color=PM.Config.getWps().colors.green; //verde
			
			      var style = {
				  strokeColor: color,
				  strokeOpacity: 1,
				  strokewidth: 3,
				  fillColor: color,
			          label: 'Indice Assoluto: '+averageIndex.toFixed(2),
				  fillOpacity: 0.8
			      };
			      
			      var format = new OpenLayers.Format.XML();
			      var doc=format.read(response.responseText);
			      var bboxes = doc.childNodes[0].childNodes;
			      
			      var lowerCorner=bboxes[0].childNodes[0].data.split(' ');
			      var upperCorner=bboxes[1].childNodes[0].data.split(' ');
			      
			      var p1 = new OpenLayers.Geometry.Point(lowerCorner[0], lowerCorner[1]);
			      var p2 = new OpenLayers.Geometry.Point(lowerCorner[0], upperCorner[1]);
			      var p3 = new OpenLayers.Geometry.Point(upperCorner[0], upperCorner[1]);
			      var p4 = new OpenLayers.Geometry.Point(upperCorner[0], lowerCorner[1]);
  
			      p1=p1.transform(WGS84, sphericMercator);
			      p2=p2.transform(WGS84, sphericMercator);
			      p3=p3.transform(WGS84, sphericMercator);
			      p4=p4.transform(WGS84, sphericMercator);

			      var ring=new OpenLayers.Geometry.LinearRing([p1, p2, p3, p4]);
			      var polygon = new OpenLayers.Geometry.Polygon(ring);
			      
			      var square = new OpenLayers.Feature.Vector(polygon, null, style);
			      
			      if (square)
			      {
				  mappanel.highlightLayer.addFeatures([square]);
				  mappanel.map.addLayers([mappanel.highlightLayer]);				
				  that.highlightLayerAdded=true;
			      }
			      that.mask.hide();
			  }			
		      }
		  });
	      }
	  });          
    },
    
    getRelativeIndex: function(weight, reports){
      var quantities=0;
      var qualities=0;
      var countQuantities=0;
      var countQualities=0;
      
      var quality=PM.Config.getQuality();
      var quantity=PM.Config.getQuantity();
      for (var i=0; i< reports.length; i++){	
	var customFields=reports[i].customfields;
	var keys=Object.keys(customFields);
	for(var j=0; j<keys.length; j++)
	{	
	    if (customFields[keys[j]].field_response !== '')
	    {
	      var name=customFields[keys[j]].field_name;
	      if(name.indexOf('Quantit')!==-1){
		quantities+=quantity[customFields[keys[j]].field_response];
		countQuantities++;		
	      }
	      else if(name.indexOf('Qualit')!==-1){
		qualities+=quality[customFields[keys[j]].field_response];
		countQualities++;
	      }
	    }
	  }
      }
      if (countQualities===0 && countQuantities===0)
	return false;
      var relativeIndex = weight * ( (qualities + quantities)/(countQualities + countQuantities) );
      return relativeIndex;      
    },
    
    /*createLegend:function(){
      var that=this;
      if (! this.legendWindow)
      {
	var wps=PM.Config.getWps();
	var html='<table id="legend" ><tr><td>minore di '+wps.values.min+'</td><td style=\'background-color:'+wps.colors.red+'\'></td></tr>';
	html+='<tr><td>da '+wps.values.min+' a '+wps.values.med+'</td><td style=\'background-color:'+wps.colors.orange+'\'></td></tr>';
	html+='<tr><td>da '+wps.values.med+' a '+wps.values.medMax+'</td><td style=\'background-color:'+wps.colors.yellow+'\'></td></tr>';
	html+='<tr><td>da '+wps.values.medMax+' a '+wps.values.max+'</td><td style=\'background-color:'+wps.colors.green+'\'></td></tr>';
	html+='<tr><td>oltre '+wps.values.max+'</td><td style=\'background-color:'+wps.colors.white+'\'></td></tr>';
	html+='</table>';
	this.legendWindow = Ext.create('Ext.window.Window', {
	    title: 'Legenda',
	    layout: 'fit',
	    closable: false,
	    html: html
	});
      }
      if (this.legendWindow.isVisible())
	this.legendWindow.hide();
      else
	this.legendWindow.show();
    },
    */
    
    /*closeLegendWindow: function(){
	if (this.legendWindow && typeof this.legendWindow==='object')
	  if (this.legendWindow.isVisible())
	      this.legendWindow.hide();
    },*/
    
    createWps: function(layer, features){
      var that = this;
      var mappanel=this.getMappanel();
      if (that.highlightLayerAdded)
	{	  
	  mappanel.highlightLayer.removeAllFeatures();
	  mappanel.map.removeLayer(mappanel.highlightLayer);
	  that.highlightLayerAdded=false;
	}
	else
	{
	  that.mask= new Ext.LoadMask(Ext.getBody(), {msg: 'Attendi il termine del caricamento...'});
	  that.mask.show();
	  //get average index
	  Ext.Ajax.request({
	    url: that.ushahidiUrl,
	      params: {
	      task:'incidents', 
	      by:'all',
	      limit:50000
	    },
	    success: function(response){
	      var respApi=Ext.decode(response.responseText);
	      var incidents=respApi.payload.incidents;
	    // var countRelIndexes=0;
	      var absoluteIndex=0;
	      for (var z=0; z<features.length; z++)
	      {
		var fid=features[z].fid;
		var reports=[];
		for (var i=0; i < incidents.length; i++ )
		{
			    var customFields=incidents[i].customfields;
			    var keys=Object.keys(customFields);
			    
			    for(var j = 0; j < keys.length; j++)
			    {
			      if (customFields[keys[j]].field_name==='layer_fk' && customFields[keys[j]].field_response===fid){
				reports.push(incidents[i]);
			      }				
			    }	
		}
		var relIndex=that.getRelativeIndex(features[z].attributes.weight, reports);
		if (relIndex)
		{
		  absoluteIndex+=relIndex;
		  //countRelIndexes++;
		}
	      }
	      var averageIndex=absoluteIndex / features.length;	      
	      //that.processWps(layer, averageIndex);	 
	      that.convexHull(mappanel, features, averageIndex);
	    },
	    failure: function(){}		
	  });
	}
    },
    
    
    convexHull: function(mappanel, features, averageIndex){
      retFeature=OpenLayers.Util.QuickHull(features);
			      if (retFeature)
			      {
				var color=PM.Config.getWps().colors.white;
				if (averageIndex <= PM.Config.getWps().values.min)
				  color=PM.Config.getWps().colors.red; //rosso
				else if (averageIndex > PM.Config.getWps().values.min && averageIndex <= PM.Config.getWps().values.med)
				  color=PM.Config.getWps().colors.orange; //arancione
				else if (averageIndex > PM.Config.getWps().values.med && averageIndex <=PM.Config.getWps().values.medMax)
				  color=PM.Config.getWps().colors.yellow; //giallo
				else if (averageIndex > PM.Config.getWps().values.medMax && averageIndex <=PM.Config.getWps().values.max)
				  color=PM.Config.getWps().colors.green; //verde
			  
				var style = {
				    strokeColor: color,
				    strokeOpacity: 1,
				    strokewidth: 3,
				    fillColor: color,
				    label: 'Indice Assoluto: '+averageIndex.toFixed(2),
				    fillOpacity: 0.8
				};			
				
				  mappanel.highlightLayer.addFeatures([retFeature]);
				  mappanel.highlightLayer.features[0].style=style;
				  mappanel.map.addLayers([mappanel.highlightLayer]);	
				  mappanel.highlightLayer.redraw();
				  this.highlightLayerAdded=true;
			      }      
      this.mask.hide();
    },
    
    
    
    /*
    loadDataInPopup: function(feature){
      var txt='<div class="featureInfo">';
	if (feature && typeof feature !== 'undefined'){
	  var attributes=feature.attributes;      
	  var keys= Object.keys(feature.attributes);      	  
	  var nome='';
	  var descr='';
	  var titolo='';
	  var testo='';
	  var link='';	  
	  for(var j = 0; j < keys.length; j++) {
	    if (attributes[keys[j]]!==null && attributes[keys[j]]!=='')
	    {
	      switch (keys[j])
	      {
		case 'descr':
		  descr+='<p><b>Descrizione</b>:'+attributes[keys[j]]+'</p>';
		  break;
		case 'title':
		  titolo+='<p><b>Titolo</b>:'+attributes[keys[j]]+'</p>';
		  break;	
		case 'name':
		  nome+='<p><b>Nome</b>:'+attributes[keys[j]]+'</p>';
		  break;	
		case 'text':
		  testo+='<p><b>Testo</b>:'+attributes[keys[j]]+'</p>';
		  break;	      
		case 'link':
		  link+='<p><b>Link</b>:<a href="'+attributes[keys[j]]+'" target="_blank"">'+attributes[keys[j]]+'</a></p>';
		  break;
		default:
		  break;	      
	      }
	    }
	  }
	    txt+=nome+descr+titolo+testo+link;  	  
      }
      txt+='</div>';
      return txt;      
    },*/    
    infoPopup: function(pos, selectControl){
      var that=this;
      var mappanel=this.getMappanel();
      var feature=mappanel.selectedFeature;    
      
    //  this.getSouthPanel().setDisabled(false);
      
      this.closeInfoPopup();
      if (feature && typeof feature!=='undefined')
      {	
	if (!pos)
	  pos=feature;
	
	this.popup=Ext.create('PM.view.InfoPopup', {
	  map:mappanel.map,
	  location: pos	  
	});
	this.popup.show();
	/*var txt=this.loadDataInPopup(feature);
	if (!pos)
	  pos=feature;
	
	var popupOpts = Ext.apply({
			      title: 'Informazioni',
			      map: mappanel.map,
			      location: pos,			 
			      layout:'fit',
			      maximizable: false,
			      collapsible: false,
			      anchorPosition: 'auto',
			      unpinnable: false,
			      draggable: true,
			      items:[{
				  xtype:'panel',
				  tbar:[
				    { xtype: 'button', id: 'modifyFeatureButton', text: 'modifica' },
				    
				  ],
				  layout: 'fit',
				  width:300,
				  maxHeight:140,
				  autoScroll:true,
				  html: txt
			      }]
			  });      


	
	    this.popup = Ext.create('GeoExt.window.Popup', popupOpts);	  	    
	      this.popup.on({ 
		beforeclose: function(){
		  if (selectControl){		    
		    that.unselectByClick=false;
		  }
		},
		close: function() {
		  if (selectControl){
		    selectControl.unselect(feature);
 		    //PM.app.getController('SouthPanel').clearData();
		  }
		  else{
		    mappanel.clearAllHighlight();
		    var fase=PM.app.getController('Main').fase;
		    if (fase===5 || fase===8){
		      var cnt=PM.app.getController('SouthPanel');
		      cnt.loadGridData([]);
		      cnt.loadChartData([]);
		      cnt.getChartBox().update('');
		    }		      
		  }
	      }	  
	    });
	    this.popup.show();*/
	}
    },
    
    closeInfoPopup: function(){
      if (this.popup && typeof this.popup==='object')
	 this.popup.close();
    }
});