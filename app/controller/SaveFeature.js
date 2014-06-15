Ext.define('PM.controller.SaveFeature', {

    extend: 'Ext.app.Controller',

    refs:[{
      ref: 'mappanel',
      selector:'mappanel'
    },{
      ref: 'window',
      selector: 'featurewindow'
    },{
        ref:'form',
        selector: 'featurewindow > form'
    }],
    
    
    views:['FeatureWindow'],
    
        init: function(){
	  this.control({
	    'featurewindow':{
	      close: this.onCloseWindow
	    },

            'featurewindow button[text=Annulla]':{
                click: this.onCancel
            },
	    'featurewindow button[text=Salva]':{
                click: this.onSave
            }
        });
    },
    
    onCancel: function(){     
      this.getForm().form.reset();
    },
    
    onCloseWindow: function(){
      this.getMappanel().hideWindow();
    },
    
    onSave: function(){
      var values=this.getForm().form.getValues();
      var feature = this.getWindow().feature;
      feature.attributes=values;
      feature.data=values;    
      var mappanel = this.getMappanel();
      mappanel.wfs.addFeatures([feature]);
      mappanel.saveStrategy.save();
      
    }
});