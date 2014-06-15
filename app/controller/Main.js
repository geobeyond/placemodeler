OpenLayers.ProxyHost = "wfsProxy.php?url=";

Ext.define('PM.controller.Main', {

    extend: 'Ext.app.Controller',

    refs:[{
      ref: 'viewport',
      selector:'pm-viewport'
    },{
        ref: 'mappanel',
        selector: 'mappanel'
    },{
        ref: 'panelfase1',
	selector: 'panelFase1'
    },{
        ref: 'panelfase2',
	selector: 'panelFase2'
    },{
        ref: 'panelfase3',
	selector: 'panelFase3'
    },{
        ref: 'container1',
        selector: 'panelFase1 > container[cls=tree]'
    },{
        ref: 'container2',
        selector: 'panelFase2 > container[cls=tree]'
    },{
        ref: 'container3',
        selector: 'panelFase3 > container[cls=tree]'
    },{
        ref: 'container4',
        selector: 'panelFase4 > container[cls=tree]'
    },{
      ref: 'btnRemove',
      selector:'button[text=remove]'
    },{
        ref: 'buttonFase1',
        selector: 'panelFase1 > button'
    }],

    lastExpanded: null,

    init: function(){
        this.control({
	  'pm-viewport':{
	    afterrender: this.onViewportAfterRender
	  },
	  'mappanel': {
		  afterrender: this.afterRenderMapPanel
	  },
	  'panelFase1':{
	      expand: this.onAccordionExpand
	    },
	  'panelFase2':{
	      expand: this.onAccordionExpand
	    },
	  'panelFase3':{
	      expand: this.onAccordionExpand
	    },/*
	  'panelFase4':{
	      expand: this.onAccordionExpand
	    },
	   'panelFase5':{
	      expand: this.onAccordionExpand
	    },
	  'panelFase6':{
	      expand: this.onAccordionExpand
	    }*/
	    'button[text=add]':{
	      click: this.onAddLayerButtonClick
	    },
	    'button[text=remove]':{
	      click: this.onRemoveLayerButtonClick
	    },
	    'treepanel': {
                itemclick: this.onTreeClick,
               // itemcontextmenu: this.onTreeMenu              
            }
        });
    },


    saveStrategy: new OpenLayers.Strategy.Save(),

    styles:{},

    //definiti qui tutti gli overlayers



    onViewportAfterRender: function(){
      var mappanel=this.getMappanel();
      	  Ext.getCmp('btnGetFeatureInfo').getEl().hide();
	  Ext.getCmp('btnSelect').getEl().show();
	  Ext.getCmp('btnSelect3').getEl().hide();
	 
	mappanel.tree.getDockedItems()[0].setVisible(false);

      this.lastExpanded=this.getPanelfase1();
       mappanel.map.addLayer(mappanel.wfs1);
      this.getContainer1().add(mappanel.tree);
      
      
     // var tt=this.getPanelfase2().items.items[1];
      
     // Ext.util.Observable.capture(tt, function(evname) {console.log(evname, arguments);})
    },

    onAccordionExpand: function(p, opts){
      //ricava numero pannello
      var fase = parseInt(p.title.substring(p.title.length-1));
      var mappanel = this.getMappanel();
      
      mappanel.tree.getDockedItems()[0].setVisible(false);            
      mappanel.removeAllOverlayers();
      
      this.resetPanelFase2();
      switch(fase){
	case 1:
	  Ext.getCmp('btnGetFeatureInfo').getEl().hide();
	  Ext.getCmp('btnSelect').getEl().show();
	  Ext.getCmp('btnSelect3').getEl().hide();
	  
	  
	  Ext.getCmp('drawMenu').getEl().show();

          mappanel.map.addLayer(mappanel.wfs1);
	  mappanel.removeHighlightLayer();
	  
	  this.getContainer1().add(mappanel.tree);

	  break;
	case 2:
	  Ext.getCmp('btnGetFeatureInfo').getEl().show();
	  Ext.getCmp('btnSelect').getEl().hide();
	  Ext.getCmp('btnSelect3').getEl().hide();
	  
	  Ext.getCmp('drawMenu').getEl().hide();
	
	  
	  mappanel.selectControl.unselectAll();
	  mappanel.selectControl3.unselectAll();
	  //mappanel.map.redraw();
	  
	  mappanel.clearAllHighlight();
	  
          mappanel.map.addLayer(mappanel.pmLayer);
          mappanel.map.addLayer(mappanel.highlightLayer);
	   
	   this.getContainer2().add(mappanel.tree);
	  break;
	case 3:
	  Ext.getCmp('btnGetFeatureInfo').getEl().hide();
	  Ext.getCmp('btnSelect').getEl().hide();
	  Ext.getCmp('btnSelect3').getEl().show();
	  
	  Ext.getCmp('drawMenu').getEl().show();	  	  
	  
          mappanel.map.addLayer(mappanel.wfs3);
	  mappanel.removeHighlightLayer();
	  	  	  
	  this.getContainer3().add(mappanel.tree);	
	  mappanel.tree.getDockedItems()[0].setVisible(true);
	case 4:
	  Ext.getCmp('btnGetFeatureInfo').getEl().hide();
	  Ext.getCmp('btnSelect').getEl().hide();
	  Ext.getCmp('btnSelect3').getEl().show();
	  
	  Ext.getCmp('drawMenu').getEl().hide();	  	  
	  
      mappanel.map.addLayer(mappanel.wfs3);
	  mappanel.removeHighlightLayer();
	  	  	  
	  this.getContainer4().add(mappanel.tree);	
	  mappanel.tree.getDockedItems()[0].setVisible(true);
	  break;	  
	  break;
	default:
	  break;
      }
      mappanel.dockedItems.items[1].doLayout();
      this.lastExpanded=p;
    },
	/*
    onViewportAfterRender: function(){
      var mappanel=this.getMappanel();
      var viewport=this.getViewport();
      Ext.util.Observable.capture(viewport.items.items[0].items.items[0], function(evname) {console.log(evname, arguments);})
//      var z = this.getContainer1();

   //   this.getContainer1().add(mappanel.tree);
      //this.getContainer3().add(mappanel.tree);
    },*/


    onAddLayerButtonClick:function(){
      this.getPanelfase3().openGetCapabiliesWindow();
    },
	   
    onRemoveLayerButtonClick:function()
    {
      if (this.layerSelected && typeof this.layerSelected!=='undefined')
      {

	  this.getMappanel().map.removeLayer(this.layerSelected);
	  this.layerSelected=null;
	  this.getBtnRemove().setDisabled(true);
        
      }
    },
    
    onTreeClick: function(view, node, item, index, event){
       this.layerSelected=node.data.layer;
        if (this.layerSelected.isloadedByGetCapabilities)
	{       
	  this.getBtnRemove().setDisabled(false);
	}
	else
	{
	  this.getBtnRemove().setDisabled(true);
	}
    },
    
    resetPanelFase2: function(){
      var panel=this.getPanelfase2();
      panel.items.items[1].reset();
      panel.items.items[2].setDisabled(true);
    },
    
    
    afterRenderMapPanel: function(){
      var that=this;
      var mappanel=this.getMappanel();
		    mappanel.wfs1.events.on({
		        "featureselected": function(e) {
		           // that.selectedFeatures[e.feature.id]=e.feature;
		            that.gestSelected(e.feature);
		        }
		    });

		    mappanel.wfs1.events.on({
		        "featureunselected": function(e) {
		            that.gestDeselected(e.feature);
		        }
		    });

		    mappanel.vector.events.on({
		        "featureadded": function(e) {
		        	that.saveFeature(e.feature);

		        }
		    });
    },


    gestSelected: function(feature){
     // alert('visualizza dati sotto alla mappa?');
	this.getMappanel().selectedFeature=feature.fid;
        this.getButtonFase1().setDisabled(false);
    },

    gestDeselected: function(){
        this.getButtonFase1().setDisabled(true);
    }

});
