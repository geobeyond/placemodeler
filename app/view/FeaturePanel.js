Ext.define('PM.view.FeaturePanel', {

    alias: 'widget.featurepanel',
    extend: 'Ext.panel.Panel',
    border:false,

    defaults:{
        xtype: 'fieldset',
    },

    items:[{
        title: 'Dati',
        layout:{
            type:'table',
            columns: 3,
            border:true,
            tdAttrs:{
                style:{padding:'4px'}
            }
        },

       defaults:{
            width:234,
            xtype: 'textfield',
            labelAlign: 'top',
	    allowBlank:false
        },

        items:[{
            name: 'name',
            fieldLabel: 'Nome',
        },{
            name: 'descr',
            fieldLabel: 'Descrizione'
        },{
            name: 'title',
            fieldLabel: 'Titolo'
        },{
            xtype:'htmleditor',
            name: 'text',
            fieldLabel: 'Testo',
            width:720,
            height:240,
            colspan:3
        },{
            xtype: 'combo',
            editable: false,
            name: 'weight',
            fieldLabel: 'Peso',
            width: 80,
            displayField: 'name',
            valueField: 'value',
            queryMode: 'local',
            store: Ext.create('Ext.data.Store', {
                fields:['name', 'value'],
                data:[
                    {name: '1', value: 1},
                    {name: '2', value: 2},
                    {name: '3', value: 3},
                    {name: '4', value: 4},
                    {name: '5', value: 5}
                ]
            }),

        },{
            name: 'link',
            fieldLabel: 'Link',	    
            vtype: 'url',
	    allowBlank: true,
            width: 480,
            colspan: 2

        }]
    },{
        title: 'Stile',
        layout:{
            type:'table',
            columns: 4,
            border:true,
            tdAttrs:{
                style:{padding:'4px'}
            }
        },

        defaults:{
            xtype: 'combobox',
            labelAlign: 'top',
            editable: false,
	    allowBlank: false
        },

        items:[{
            name: 'maplabel',
            fieldLabel: 'Label',
            store: 'Styles',
            displayField: 'title',
            valueField: 'abstract',
            width: 380,
        },{
            name: 'style',
            fieldLabel: 'style',
            store: 'Styles',
            displayField: 'name',
            valueField: 'name',
            queryMode: 'local',	   
            store: Ext.create('Ext.data.Store', {
                fields:['name', 'value'],
		data:[
		  {name: 'Piccolo', value: 'Piccolo'},
		  {name: 'Medio', value: 'Medio'},
		  {name: 'Grande', value: 'Grande'}
		]
            }),	   
	   
            width: 120
        },{
            name: 'symbol_size',
            fieldLabel: 'Symbol Size',
            displayField: 'name',
            valueField: 'value',
            queryMode: 'local',
            store: Ext.create('Ext.data.Store', {
                fields:['name', 'value']
            }),
            width: 80
        },{
            xtype: 'container',	    
	    name: 'icon',
	    margin: '2 0 2 8',
            html: ''
        }]
    }]
});
