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
    },{
        ref: 'addMediaButton',
        selector: 'featurewindow button[id=addMedia]'
    }],


    views:['FeatureWindow'],

    init: function(){
	this.control({
	    'featurewindow':{
	        close: this.onCloseWindow
	    },
            'window[id=mediaWindow]':{
	        close: this.onCloseMediaWindow
	    },
            'featurewindow button[text=Annulla]':{
                click: this.onCancel
            },
	    'featurewindow button[text=Salva]':{
                click: this.onSave
            },
            'featurewindow button[id=addMedia]': {
                click: this.onAddMediaBtnClick
            }
        });
    },

    onAddMediaBtnClick: function(){
        this.getAddMediaButton().setDisabled(true);
        this.getWindow().openMediaWindow();
    },

    onCancel: function(){
        this.getForm().form.reset();
        this.getWindow().close();
        this.getMappanel().featureWindowOpen=false;
    },

    onCloseWindow: function(){
        this.getMappanel().featureWindowOpen=false;
    },

    onCloseMediaWindow: function(){
        this.getAddMediaButton().setDisabled(false);
    },

    onSave: function(){
        var values=this.getForm().form.getValues();
        var feature = this.getWindow().feature;
        feature.attributes=values;
        feature.data=values;
        var mappanel = this.getMappanel();

        var fase=PM.app.getController('Main').fase;

        switch(fase)
        {
        case 1:
            mappanel.wfs1.addFeatures([feature]);
            mappanel.saveStrategy1.save();
            break;
        case 3:
            mappanel.wfs3.addFeatures([feature]);
            mappanel.saveStrategy3.save();
            break;
        case 8:
            mappanel.wfs8.addFeatures([feature]);
            mappanel.saveStrategy8.save();
            break;
        default:
            break;
        }
    }
});
