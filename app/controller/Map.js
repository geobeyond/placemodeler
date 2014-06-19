Ext.define('PM.controller.Map', {

    extend: 'Ext.app.Controller',

    refs:[{
        ref: 'mappanel',
        selector: 'mappanel'
    },{
        ref: 'southPanel',
        selector: 'panel[id=southPanel]'
    },{
        ref: 'modifyFeatureButton',
        selector: 'mappanel > toolbar > button[id=modifyFeatureButton]'
    }],

    init: function(){
        this.control({
	    'mappanel': {
		afterrender: this.afterRenderMapPanel
	    },
            'mappanel > toolbar > button[id=modifyFeatureButton]':{
                click: this.onClickModifyFeatureButton
            }
	});
    },

    afterRenderMapPanel: function(){
        var that=this;
        var mappanel=this.getMappanel();
        var fase1Controller=PM.app.getController('PanelFase1');
	mappanel.wfs1.events.on({
	    "featureselected": function(e) {
                mappanel.selectedFeature=e.feature;
                fase1Controller.disableButton(false);
                that.getModifyFeatureButton().setDisabled(false);
	    }
	});

	mappanel.wfs1.events.on({
	    "featureunselected": function(e) {
                mappanel.selectedFeature=null;
                fase1Controller.disableButton(true);
                that.getModifyFeatureButton().setDisabled(true);
	    }
	});

	mappanel.vector.events.on({
	    "featureadded": function(e) {
		mappanel.saveFeature(e.feature);

	    }
	});
    },


/*
    gestSelected: function(feature){
	this.getMappanel().selectedFeature=feature;
        this.getButtonFase1().setDisabled(false);
    },

    gestDeselected: function(){
        this.getButtonFase1().setDisabled(true);
    },
*/
    onClickModifyFeatureButton: function(){
        var southPanel=this.getSouthPanel();
        if (southPanel.getCollapsed())
            southPanel.expand();
        else
            southPanel.collapse();
    }
});
