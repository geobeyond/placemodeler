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
    },{
        ref: 'southFeaturePanel',
        selector: 'featurepanel[id=southFeaturePanel]'
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
        // var fase1Controller=PM.app.getController('PanelFase1');
        var mainController=PM.app.getController('Main');
	mappanel.wfs1.events.on({
	    "featureselected": function(e) {
                mappanel.selectedFeature=e.feature;
                //    fase1Controller.disableButton(false);
                that.getModifyFeatureButton().setDisabled(false);
                mainController.disableComponents(false);

                //set values in south panel
                var values=e.feature.attributes;
                var panel=that.getSouthFeaturePanel();

                //n.b.: chrome bug: Uncaught TypeError: Cannot read property 'match' of null

                panel.query('textfield[name=name]')[0].setValue(values.name);
                panel.query('textfield[name=description]')[0].setValue(values.description);
                panel.query('textfield[name=title]')[0].setValue(values.title);
                panel.query('htmleditor[name=text]')[0].setValue(values.text);
                panel.query('textfield[name=link]')[0].setValue(values.link);
               // panel.query('textfield[name=maplabel]')[0].setValue(values.maplabel);
	    }
	});

	mappanel.wfs1.events.on({
	    "featureunselected": function(e) {
                mappanel.selectedFeature=null;
                //    fase1Controller.disableButton(true);
                that.getModifyFeatureButton().setDisabled(true);
                mainController.disableComponents(true);
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
	    }
        });

        mappanel.featureInfoControl4.events.on({
            'getfeatureinfo': function(e){
                that.featureInfoSelect(e, mainController, mappanel);
            }
        });

    },

    featureInfoSelect: function(e, mainController, mappanel){
        mappanel.clearAllHighlight();
	var d = Ext.JSON.decode(e.text);
        if(d.features && d.features.length > 0)
	{
	    mappanel.createHighlightFeature(d.features[0].geometry);

            mainController.disableComponents(false);

            //save selected feature id
	    //mappanel.selectedFeature=d.features[0];
            mappanel.selectedFeature.fid=d.features[0].id;
	}
        else
        {
            mappanel.selectedFeature=null;
            mainController.disableComponents(true);
        }
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
