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
    }],

    lastExpanded: null,

    init: function(){
        this.control({
	    'pm-viewport':{
	        afterrender: this.onViewportAfterRender
	    },
	    'panelFase1':{
	        expand: this.onAccordionExpand
	    },
	    'panelFase2':{
	        expand: this.onAccordionExpand
	    },
	    'panelFase3':{
	        expand: this.onAccordionExpand
	    },
	    'panelFase4':{
	        expand: this.onAccordionExpand
	    },
	    'panelFase5':{
	        expand: this.onAccordionExpand
	    },
	    'panelFase6':{
	        expand: this.onAccordionExpand
	    },
            'panelFase7':{
	        expand: this.onAccordionExpand
	    },
	    'panelFase8':{
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

    styles:{},

    //


    onViewportAfterRender: function(){
        //   this.mapController=PM.app.getController('Map');
        var mappanel=this.getMappanel();

      	Ext.getCmp('btnGetFeatureInfo2').getEl().hide();
	Ext.getCmp('btnGetFeatureInfo4').getEl().hide();
	Ext.getCmp('btnSelect1').getEl().show();
	Ext.getCmp('btnSelect3').getEl().hide();

	mappanel.tree.getDockedItems()[0].setVisible(false);

        this.lastExpanded=this.getPanelfase1();
        mappanel.map.addLayer(mappanel.wfs1);
        this.getContainer1().add(mappanel.tree);


        //osserva eventi
        // var tt=this.getPanelfase2().items.items[1];
        // Ext.util.Observable.capture(tt, function(evname) {console.log(evname, arguments);})
    },

    onAccordionExpand: function(p, opts){

        var fase = parseInt(p.title.substring(p.title.length-1));
        var mappanel = this.getMappanel();

        mappanel.tree.getDockedItems()[0].setVisible(false);
        mappanel.removeAllOverlayers();

        this.resetPanelFase2();
        this.resetPanelFase4();
        switch(fase){
	case 1:
	    Ext.getCmp('btnGetFeatureInfo2').getEl().hide();
	    Ext.getCmp('btnGetFeatureInfo4').getEl().hide();
	    Ext.getCmp('btnSelect1').getEl().show();
	    Ext.getCmp('btnSelect3').getEl().hide();


	    Ext.getCmp('drawMenu').getEl().show();

            mappanel.map.addLayer(mappanel.wfs1);
	    mappanel.removeHighlightLayer();

	    this.getContainer1().add(mappanel.tree);

	    break;
	case 2:
	    Ext.getCmp('btnGetFeatureInfo2').getEl().show();
	    Ext.getCmp('btnGetFeatureInfo4').getEl().hide();
	    Ext.getCmp('btnSelect1').getEl().hide();
	    Ext.getCmp('btnSelect3').getEl().hide();

	    Ext.getCmp('drawMenu').getEl().hide();


	    mappanel.selectControl.unselectAll();
	    mappanel.selectControl3.unselectAll();

	    mappanel.clearAllHighlight();

            mappanel.map.addLayer(mappanel.wms1);
            mappanel.map.addLayer(mappanel.highlightLayer);

	    this.getContainer2().add(mappanel.tree);
	    break;
	case 3:
	    Ext.getCmp('btnGetFeatureInfo2').getEl().hide();
	    Ext.getCmp('btnGetFeatureInfo4').getEl().hide();
	    Ext.getCmp('btnSelect1').getEl().hide();
	    Ext.getCmp('btnSelect3').getEl().show();

	    Ext.getCmp('drawMenu').getEl().show();

            mappanel.map.addLayer(mappanel.wfs3);
	    mappanel.removeHighlightLayer();

	    this.getContainer3().add(mappanel.tree);
	    mappanel.tree.getDockedItems()[0].setVisible(true);
	    break;
	case 4:
	    Ext.getCmp('btnGetFeatureInfo2').getEl().hide();
	    Ext.getCmp('btnGetFeatureInfo4').getEl().show();
	    Ext.getCmp('btnSelect1').getEl().hide();
	    Ext.getCmp('btnSelect3').getEl().hide();

	    Ext.getCmp('drawMenu').getEl().hide();

            mappanel.map.addLayer(mappanel.wms1);
            mappanel.map.addLayer(mappanel.wfs3);
	    mappanel.removeHighlightLayer();

	    this.getContainer4().add(mappanel.tree);
	    mappanel.tree.getDockedItems()[0].setVisible(false);
	    break;
        case 5:
            mappanel.map.addLayer(mappanel.wms1);
            mappanel.map.addLayer(mappanel.wfs3);
	    mappanel.removeHighlightLayer();

            this.getContainer5().add(mappanel.tree);
            break;
        case 6:

            this.getContainer6().add(mappanel.tree);
            break;
        case 7:
            this.getContainer7().add(mappanel.tree);
            break;
        case 8:
            this.getContainer8().add(mappanel.tree);
            break;
	default:
	    break;
        }
        mappanel.dockedItems.items[1].doLayout();
        this.lastExpanded=p;
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

    resetPanelFase4: function(){
        var panel=this.getPanelfase2();
        panel.items.items[1].reset();
        panel.items.items[2].setDisabled(true);
    }
});
