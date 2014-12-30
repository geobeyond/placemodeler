Ext.define('PM.view.FeatureWindow', {

    alias: 'widget.featurewindow',
    extend: 'Ext.window.Window',

    requires:['PM.view.FeaturePanel','PM.view.MediaPanel'],

    border:false,

//    layout: 'fit',
    height: 500,
    autoScroll:true,
    padding:5,

    feature: null,

    items:[{
        xtype: 'form',
        autoScroll: true,
        standardSubmit: false,

        items:[{
	    xtype: 'featurepanel'
	},{
            xtype: 'mediapanel'
           }]
        }],

    buttonAlign: 'left',
    buttons:[{
        text: 'Salva'
    },{
        text: 'Annulla'
    }],

    openMediaWindow: function(){
      Ext.create('PM.view.MediaWindow', {}).show();
    }
});
