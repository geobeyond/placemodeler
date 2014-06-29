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
        selector:'button[text=remove]'
    },{
        ref: 'southPanel',
        selector: 'panel[id=southPanel]'
    }],

    lastExpanded: null,

    init: function(){

        this.fasi=['PanelFase1', 'PanelFase2','PanelFase3', 'PanelFase4','PanelFase5', 'PanelFase6','PanelFase7', 'PanelFase8'];

        this.control({
	    'pm-viewport':{
	        afterrender: this.onViewportAfterRender
	    },
	    'panelFase1, panelFase2, panelFase3, panelFase4, panelFase5, panelFase6, panelFase7, panelFase8':{
	        expand: this.onAccordionExpand
	    },
	    'button[text=add]':{
	        click: this.onAddLayerButtonClick
	    },
	    'button[text=remove]':{
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
        var mappanel=this.getMappanel();

        this.buttonsHandler(1, true);

        this.fase=1;

	mappanel.tree.getDockedItems()[0].setVisible(false);

        //   this.lastExpanded=this.getPanelfase1();
        mappanel.map.addLayer(mappanel.wfs1);
        this.getContainer1().add(mappanel.tree);


        //osserva eventi
        // var tt=this.getPanelfase2().items.items[1];
        // Ext.util.Observable.capture(tt, function(evname) {console.log(evname, arguments);})
    },

    onAccordionExpand: function(p, opts){

        this.fase = parseInt(p.title.substring(p.title.length-1));

        var mappanel = this.getMappanel();

        mappanel.tree.getDockedItems()[0].setVisible(false);
        mappanel.removeAllOverlayers();

        this.disableComponents(true);
      //  this.resetPanelFase2();
      //  this.resetPanelFase4();

        mappanel.clearAllHighlight();

        this.getSouthPanel().collapse();

        switch(this.fase){
	case 1:
            this.buttonsHandler(1, true);

            mappanel.map.addLayer(mappanel.wfs1);
	   // mappanel.removeHighlightLayer();

	    this.getContainer1().add(mappanel.tree);

	    break;
	case 2:
	    this.buttonsHandler(2, false);

	    mappanel.selectControl.unselectAll();
	    mappanel.selectControl3.unselectAll();

            mappanel.map.addLayers([mappanel.wms1, mappanel.highlightLayer]);

	    this.getContainer2().add(mappanel.tree);
	    break;
	case 3:
            this.buttonsHandler(3, true);

            mappanel.map.addLayer(mappanel.wfs3);
	  //  mappanel.removeHighlightLayer();

	    this.getContainer3().add(mappanel.tree);
	    mappanel.tree.getDockedItems()[0].setVisible(true);
	    break;
	case 4:
	    this.buttonsHandler(4, false);

            mappanel.map.addLayers([mappanel.wms1, mappanel.wms3, mappanel.highlightLayer]);

	    this.getContainer4().add(mappanel.tree);
	    break;
        case 5:
            this.buttonsHandler(4, false);
            mappanel.map.addLayers([mappanel.wms1, mappanel.wms3, mappanel.highlightLayer]);
	  //  mappanel.removeHighlightLayer();

            this.getContainer5().add(mappanel.tree);
            break;
        case 6:

            this.getContainer6().add(mappanel.tree);
            break;
        case 7:
            this.buttonsHandler(4);

            mappanel.map.addLayers([mappanel.wms1, mappanel.wms3, mappanel.highlightLayer]);

            this.getContainer7().add(mappanel.tree);
            break;
        case 8:
            this.buttonsHandler(8);
            mappanel.map.addLayer(mappanel.wfs8);
            this.getContainer8().add(mappanel.tree);
            break;
	default:
	    break;
        }
        mappanel.dockedItems.items[1].doLayout();
        // this.lastExpanded=p;
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
        mappanel.featureInfoControl2.deactivate();
        mappanel.featureInfoControl4.deactivate();
        mappanel.selectControl.deactivate();
        mappanel.selectControl3.deactivate();
        mappanel.selectControl8.deactivate();

        var elems=['btnSelect1','btnGetFeatureInfo2','btnSelect3', 'btnGetFeatureInfo4', '','','','btnSelect8'];
        for (var i=0;i<elems.length; i++)
        {
            if (i!==4 && i!==5 && i!==6 )
            {
                if (i===num-1)
                    Ext.getCmp(elems[i]).show();
                else
                    Ext.getCmp(elems[i]).hide();
            }
        }

        if (num===1 || num===3)
            Ext.getCmp('modifyFeatureButton').getEl().show();
        else
            Ext.getCmp('modifyFeatureButton').getEl().hide();

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

    /*resetPanelFase2: function(){
        var panel=this.getPanelfase2();
        panel.items.items[1].reset();
        panel.items.items[2].setDisabled(true);
    },

    resetPanelFase4: function(){
        var panel=this.getPanelfase2();
        panel.items.items[1].reset();
        panel.items.items[2].setDisabled(true);
    },*/


    disableComponents: function(disable){
        PM.app.getController(this.fasi[this.fase-1]).disableComponents(disable);
    }
});
