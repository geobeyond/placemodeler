Ext.define('PM.controller.Main', {
    extend: 'Ext.app.Controller',


    refs:[{
        ref: 'mapPanel',
        selector: 'mappanel'
    },{
        ref: 'buttonFase1',
        selector: 'panelFase1 > button'
    }],

    init: function(){

	    this.control({
	      'mappanel': {
		  afterrender: this.afterRenderMapPanel
	      },
    })
    },


    selectedFeatures: {},


    afterRenderMapPanel: function(mapPanel){
      var that=this;
		    mapPanel.wfs1.events.on({
		        "featureselected": function(e) {
		            that.selectedFeatures[e.feature.id]=e.feature;
		            that.gestSelected(e.feature);
		        }
		    });

		    mapPanel.wfs1.events.on({
		        "featureunselected": function(e) {
		            that.gestDeselected(e.feature);
		        }
		    });

		    mapPanel.vector.events.on({
		        "featureadded": function(e) {
		        	mapPanel.saveFeature(e.feature);

		        }
		    });



    },


    gestSelected: function(feature){
     // alert('visualizza dati sotto alla mappa?');
        this.getButtonFase1().setDisabled(false);
    },

    gestDeselected: function(){
        this.getButtonFase1().setDisabled(true);
    }


});
