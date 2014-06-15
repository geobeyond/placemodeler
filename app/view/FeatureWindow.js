Ext.define('PM.view.FeatureWindow', {

    alias: 'widget.featurewindow',
    extend: 'Ext.window.Window',
    border:false,

    layout: 'fit',
    height: 400,
    width: 600,
    padding: 15,

    feature: null,

    items:[{
        xtype: 'form',
        autoScroll: true,
        items:[
	    {
		xtype:'textfield',
		id: 'name',
		name: 'name',
		fieldLabel: 'Name'
	    },{
		xtype:'textfield',
		id: 'description',
		name: 'description',
		fieldLabel: 'Descrizione'
	    }
	    ,{
		xtype:'textfield',
		id: 'text',
		name: 'text',
		fieldLabel: 'Testo'
	    }
	    ,{
		xtype:'textfield',
		id: 'maplabel',
		name: 'maplabel',
		fieldLabel: 'Label'
	    },{
		xtype:'textfield',
		id: 'style',
		name: 'style',
		fieldLabel: 'style'
	    },{
		xtype:'textfield',
		id: 'symbol_size',
		name: 'symbol_size',
		fieldLabel: 'Symbol Size'
	    },{
		xtype:'textfield',
		id: 'title',
		name: 'title',
		fieldLabel: 'Title'
	    },{
		xtype:'textfield',
		id: 'link',
		name: 'link',
		fieldLabel: 'Link'
	    }
        ]
    }],

    buttons:[{
        text: 'Annulla'
    },{
        text: 'Salva'
    }]
});
