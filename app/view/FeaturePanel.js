Ext.define('PM.view.FeaturePanel', {

    alias: 'widget.featurepanel',
    extend: 'Ext.panel.Panel',
    border:false,


    items:[{
        xtype: 'fieldset',
        title: 'Dati',

        layout:{
            type:'table',
            columns: 3,
            border:true,
            tdAttrs:{
                style:{padding:'4px'}
            },
        },

        defaults:{
            width:234,
            xtype: 'textfield',
            labelAlign: 'top'
        },

        items:[{
            //id: 'name',
            name: 'name',
            fieldLabel: 'Nome'
        },{
            //id: 'description',
            name: 'description',
            fieldLabel: 'Descrizione'
        },{
            //id: 'title',
            name: 'title',
            fieldLabel: 'Titolo'
        },{
            xtype:'htmleditor',
            //id: 'text',
            name: 'text',
            fieldLabel: 'Testo',
            width:720,
            colspan:3
        },{
            //id: 'link',
            name: 'link',
            fieldLabel: 'Link',
            vtype: 'url'
        },{
            //id: 'maplabel',
            name: 'maplabel',
            fieldLabel: 'Label'
        },{
            //id: 'style',
            name: 'style',
            fieldLabel: 'style'
        },{
            //id: 'symbol_size',
            name: 'symbol_size',
            fieldLabel: 'Symbol Size'
        }]
    }]

});
