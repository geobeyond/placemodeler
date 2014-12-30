Ext.define('PM.view.MediaPanel', {

    alias: 'widget.mediapanel',
    extend: 'Ext.panel.Panel',

   // requires:['PM.view.FeaturePanel'],

    border:false,

    width: 730,
    height: 220,
 

    items:[{
        xtype: 'fieldset',
        title: 'Media',


        layout:{
            type:'table',
            columns: 2,
            border:true,
            tdAttrs:{
                style:{padding:'4px'}
            }
        },
        items:[{
            xtype: 'filefield',
            buttonOnly: true,		    
	   // margin: '0 0 0 170',
            id: 'hiddenFileField'
        },{
            xtype: 'grid',
            width: 400,
            height:100,
            border: true,
            store: 'Files',
            rowspan: 2,
            columns:[ 
                {text: 'Name',  dataIndex: 'name', flex:1},
                {text: 'Type',  dataIndex: 'type'}        
            ]
        },{
            xtype:'container',
            width: 280,
            layout:{
                type: 'hbox',
                pack: 'start'
            },
            items:[{
                xtype: 'textfield',
                id: 'mediaLinkField',
                vtype: 'url',
                name: 'mediaLinkField'
            },{
                xtype: 'button',
                text: 'aggiungi link',
                id: 'mediaLinkBtn',
		name: 'mediaLinkBtn'
            }]

        },{
            xtype: 'container',
            html: '<input type="file" id="files" name="files[]" multiple hidden="true" />'
        }]
    }]
});
