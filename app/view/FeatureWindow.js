Ext.define('PM.view.FeatureWindow', {

    alias: 'widget.featurewindow',
    extend: 'Ext.window.Window',

    requires:['PM.view.FeaturePanel'],

    border:false,

    layout: 'fit',

    padding:5,

    feature: null,

    items:[{
        xtype: 'form',
        autoScroll: true,

        items:[{
	    xtype: 'featurepanel',
            layout: 'fit'
	},{
            xtype: 'fieldset',
            title: 'Media',
            items:[{
                xtype:'button',
                id:'addMedia',
                text: 'aggiungi foto e video',
                margin: '10 0 15 5'
            }]
        }]
    }],
    buttonAlign: 'left',
    buttons:[{
        text: 'Salva'
    },{
        text: 'Annulla'
    }],


    openMediaWindow: function(){
        Ext.create('Ext.window.Window',{
	    title : "Upload images/video",
            id: 'mediaWindow',
	    width : 500,
	    height: 300,
	    layout : 'fit',
            //  modal: true,
	    items : [{
		xtype : "component",
		autoEl : {
		    tag : "iframe",
		    src : "fileUpload.php?fid=prova.20"//+feature.fid
		}
	    }]
        }).show();
    }
});
