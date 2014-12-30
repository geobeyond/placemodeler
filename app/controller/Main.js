//OpenLayers.ProxyHost = "wfsProxy.php?url=";

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
        ref: 'panelfase4',
	selector: 'panelFase4'
    },{
        ref: 'panelfase5',
	selector: 'panelFase5'
    },{
        ref: 'panelfase6',
	selector: 'panelFase6'
    },{
        ref: 'panelfase7',
	selector: 'panelFase7'
    },{
        ref: 'panelfase8',
	selector: 'panelFase8'
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
        ref: 'container5',
        selector: 'panelFase5 > container[cls=tree]'
    },{
        ref: 'container6',
        selector: 'panelFase6 > container[cls=tree]'
    },{
        ref: 'container7',
        selector: 'panelFase7 > container[cls=tree]'
    },{
        ref: 'container8',
        selector: 'panelFase8 > container[cls=tree]'
    },{
        ref: 'btnRemove',
        selector:'button[text=rimuovi]'
    },{
        ref: 'southPanel',
        selector: 'southtabpanel'
    },{
	ref: 'polygonBtn',
	selector: 'button[id=polygonBtn]'
    },{
	ref: 'lineBtn',
	selector: 'button[id=lineBtn]'
    },{
	ref: 'pointBtn',
	selector: 'button[id=pointBtn]'
    },{
      ref: 'btnSelect1',
      selector: 'button[id=btnSelect1]'
    },{
      ref: 'btnSelect3',
      selector: 'button[id=btnSelect3]'
    },{
      ref: 'btnSelect6',
      selector: 'button[id=btnSelect6]'
    },{
      ref: 'btnSelect8',
      selector: 'button[id=btnSelect8]'
    }/*,{
      ref: 'modifyFeatureButton',
      selector: 'button[id=modifyFeatureButton]'
    }*/],

    lastExpanded: null,

    init: function(){
      
      

        this.fasi=['PanelFase1', 'PanelFase2','PanelFase3', 'PanelFase4','PanelFase5', 'PanelFase6','PanelFase7', 'PanelFase8'];

        this.control({
	    'pm-viewport':{
	        afterrender: this.onViewportAfterRender
	    },
	    'panelFase1, panelFase2, panelFase3, panelFase4, panelFase5, panelFase6, panelFase7, panelFase8':{
	        beforeexpand: this.onBeforeAccordionExpand,
	        expand: this.onAccordionExpand
	    },
	    'button[text=aggiungi]':{
	        click: this.onAddLayerButtonClick
	    },
	    'button[text=rimuovi]':{
	        click: this.onRemoveLayerButtonClick
	    },
	    'treepanel': {
                itemclick: this.onTreeClick
            }
        });
    },




    saveStrategy: new OpenLayers.Strategy.Save(),


    onViewportAfterRender: function(){
        //   this.mapController=PM.app.getController('Map');
 
//        this.southPanelController= PM.app.getController('SouthPanel');

        this.mappanel=this.getMappanel();

        this.buttonsHandler(1, true);

        this.fase=1;

	this.mappanel.tree.getDockedItems()[0].setVisible(false);

        //   this.lastExpanded=this.getPanelfase1();
        this.mappanel.map.addLayer(this.mappanel.wfs1);
        this.getContainer1().add(this.mappanel.tree);

        this.setStyleStore();

	this.loadInfoText(this.getPanelfase1(), PM.Config.getDescPhases().text1);
      //  this.southPanelController.setEditingTab();

        //osserva eventi
        // var tt=this.getPanelfase2().items.items[1];
        // Ext.util.Observable.capture(tt, function(evname) {console.log(evname, arguments);})
    },

    onAccordionExpand: function(p, opts){

       // this.fase = parseInt(p.title.substring(p.title.length-1));
        this.fase=p.num;
        this.mappanel.tree.getDockedItems()[0].setVisible(false);
        this.mappanel.removeAllOverlayers();
	var southPanel=this.getSouthPanel();
	

//        this.disableComponents(true);
	southPanel.collapse();
	southPanel.hide();
	//PM.app.getController('ModifyFeature').attributes=false;
	
        this.mappanel.clearAllHighlight();
//	this.mappanel.clearAllWpsLayer();
	
/*	var southPanel= this.getSouthPanel();
	southPanel.setDisabled(false);
        southPanel.collapse();
        this.southPanelController.setEditingTab();*/
		
	PM.app.getController('PanelFase5').resetBtns();
	PM.app.getController('PanelFase8').resetBtns();	
	PM.app.getController('Map').highlightLayerAdded=false;

        switch(this.fase){
	case 1:
            this.buttonsHandler(1, true);

            this.mappanel.map.addLayer(this.mappanel.wfs1);
	   // this.mappanel.removeHighlightLayer();

	    this.getContainer1().add(this.mappanel.tree);
            this.setStyleStore();
	    this.loadInfoText(this.getPanelfase1(), PM.Config.getDescPhases().text1);
	    break;
	case 2:
	    this.buttonsHandler(2, false);

	  //  this.mappanel.selectControl.unselectAll();
	   // this.mappanel.selectControl3.unselectAll();

            this.mappanel.map.addLayers([this.mappanel.wms1, this.mappanel.highlightLayer]);

	    this.getContainer2().add(this.mappanel.tree);
	    this.loadInfoText(this.getPanelfase2(), PM.Config.getDescPhases().text2);
	    break;
	case 3:
            this.buttonsHandler(3, true);

            this.mappanel.map.addLayer(this.mappanel.wfs3);
	  //  this.mappanel.removeHighlightLayer();

	    this.getContainer3().add(this.mappanel.tree);
	    this.mappanel.tree.getDockedItems()[0].setVisible(true);
            this.setStyleStore();
	    this.loadInfoText(this.getPanelfase3(), PM.Config.getDescPhases().text3);
	    break;
	case 4:
	    this.buttonsHandler(4, false);

            this.mappanel.map.addLayers([this.mappanel.wms1, this.mappanel.wms3, this.mappanel.highlightLayer]);

	    this.getContainer4().add(this.mappanel.tree);
	    this.loadInfoText(this.getPanelfase4(), PM.Config.getDescPhases().text4);
	    break;
        case 5:
            this.buttonsHandler(4, false);
            this.mappanel.map.addLayers([this.mappanel.wms1, this.mappanel.wms3, this.mappanel.highlightLayer]);
	  //  this.mappanel.removeHighlightLayer();

            this.getContainer5().add(this.mappanel.tree);
       //     this.southPanelController.setChartPanel();
	    southPanel.show();
	    this.loadInfoText(this.getPanelfase5(), PM.Config.getDescPhases().text5, true);
            break;
        case 6:
	    this.buttonsHandler(6, true);

            this.mappanel.map.addLayer(this.mappanel.wfs6);
            this.getContainer6().add(this.mappanel.tree);
	    this.loadInfoText(this.getPanelfase6(), PM.Config.getDescPhases().text6);
            break;
        case 7:
            this.buttonsHandler(4);

            this.mappanel.map.addLayers([this.mappanel.wms1, this.mappanel.wms3, this.mappanel.highlightLayer]);

            this.getContainer7().add(this.mappanel.tree);
	    this.loadInfoText(this.getPanelfase7(), PM.Config.getDescPhases().text7);
            break;
        case 8:
            this.buttonsHandler(8);
            this.mappanel.map.addLayer(this.mappanel.wfs8);
            this.getContainer8().add(this.mappanel.tree);
	    southPanel.show();
	    this.loadInfoText(this.getPanelfase8(), PM.Config.getDescPhases().text8, true);
            break;
	default:
	    break;
        }
        this.mappanel.dockedItems.items[1].doLayout();
        // this.lastExpanded=p;
    },
    
    onBeforeAccordionExpand: function() {
        var mappanel=this.getMappanel();
	
	var resetButton = function(button){
	  if (button.pressed)
	    button.toggle();
	};
	
	resetButton(this.getPointBtn());
	resetButton(this.getLineBtn());
	resetButton(this.getPolygonBtn());
	
/*	if (this.fase===5 || this.fase===8)
	{
	  PM.app.getController('SouthPanel').clearData();
	}*/

	//var cnt=PM.app.getController('Map');
	//cnt.closeLegendWindow();
	//cnt.closeInfoPopup();

	
/*	var unselectAll = function(button, control){
	  if (button.pressed){
	    button.toggle();
	    control.unselectAll();
	  }	 
	};
	

	unselectAll(this.getBtnSelect1(), mappanel.selectControl);
	unselectAll(this.getBtnSelect3(), mappanel.selectControl3);
	unselectAll(this.getBtnSelect6(), mappanel.selectControl6);
	unselectAll(this.getBtnSelect8(), mappanel.selectControl8);*/

    },
    
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


    buttonsHandler: function(num, drawMenu){
        var mappanel=this.getMappanel();

	var elems=['btnSelect1','btnGetFeatureInfo2','btnSelect3', 'btnGetFeatureInfo4', '','btnSelect6','','btnSelect8'];
        for (var i=0;i<elems.length; i++)
        {
            if (i!==4  && i!==6 )
            {
                if (i===num-1)
                    Ext.getCmp(elems[i]).show();
                else
                    Ext.getCmp(elems[i]).hide();
            }
        }
//         var modifyFeatureButton=this.getModifyFeatureButton();
//         if (num===1 || num===3|| num===6 || num===8){
// 	  
// // 	    modifyFeatureButton.setText('Modifica simbolo');
// //             modifyFeatureButton.show();
// // 	    modifyFeatureButton.setDisabled(true);
// 	}
//         else
//             modifyFeatureButton.hide();

        if (drawMenu)
            Ext.getCmp('drawMenu').getEl().show();
        else
            Ext.getCmp('drawMenu').getEl().hide();
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
/*
    disableComponents: function(disable){
        PM.app.getController(this.fasi[this.fase-1]).disableComponents(disable);
    },*/

    setStyleStore: function(){
        //var url=PM.Config.getUrls().sld+'http://89.31.77.165/geoserver/rest/styles/pm_phase'+this.fase+'.sld';      
      	if (PM.Config.getUrls().proxy && typeof PM.Config.getUrls().proxy!=='undefined')
	  var url=PM.Config.getUrls().proxy+PM.Config.getUrls().sld+'../pm_phase2.sld';
	else
	  var url=PM.Config.getUrls().sld+'../pm_phase2.sld';
        var store=PM.app.getStore('Styles');
        store.proxy.url=url;
    },
        
    loadInfoText: function(panel, url, rewrite){
      var req = function(){
	Ext.Ajax.request({
	  url: url,
	  success: function(res){
	    panel.items.items[1].update(res.responseText);
	  },
	  failure: function(res){
	    panel.items.items[1].update(res.responseText);
	  }
	});	
      }
      if (rewrite)
      {
	req();
      }
      else
      {
	if (!panel.items.items[1].html && typeof panel.items.items[1].html=='undefined')
	{
	    req();
	}
      }
    },
    
    createLegend: function(panel){
        var wps=PM.Config.getWps();
	var html='<table id="legend" ><tr><td>minore di '+wps.values.min+'</td><td style=\'background-color:'+wps.colors.red+'\'></td></tr>';
	html+='<tr><td>da '+wps.values.min+' a '+wps.values.med+'</td><td style=\'background-color:'+wps.colors.orange+'\'></td></tr>';
	html+='<tr><td>da '+wps.values.med+' a '+wps.values.medMax+'</td><td style=\'background-color:'+wps.colors.yellow+'\'></td></tr>';
	html+='<tr><td>da '+wps.values.medMax+' a '+wps.values.max+'</td><td style=\'background-color:'+wps.colors.green+'\'></td></tr>';
	html+='<tr><td>oltre '+wps.values.max+'</td><td style=\'background-color:'+wps.colors.white+'\'></td></tr>';
	html+='</table>';
	panel.items.items[1].update(html);	
    }
});
