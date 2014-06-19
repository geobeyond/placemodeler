Ext.define('PM.view.GetCapabilitiesWindow', {

    alias: 'widget.getcapabilitieswindow',
    extend: 'Ext.window.Window',
    border:false,

    title: 'Aggiungi un livello',
    layout: 'fit',

    height: 400,
    width: 500,
    padding: 15,

    feature: null,

    items:[{
        xtype: 'form',
        layout:{
	    type:'table',
	    columns: 2,
	    border:true,
	    tdAttrs:{
	        style:{padding:'4px'}
	    }

        },
        autoScroll: true,
        items:[{
	    xtype: 'button',
	    cls: 'localBtn',
	    text:'carica da server locale', colspan:2
        },{
	    xtype: 'button',
	    cls:'urlBtn',
	    text:'carica da server remoto'
        },{
	    xtype: 'textfield',
	    name: 'url',
	    vtype:'url',
	    width: 270
        },{
	    colspan:2,
	    xtype: 'grid',
	    title: "Catalogo del server",
            columns: [
                {header: "Title", dataIndex: "title", width:150,sortable: true},
                {header: "Name", dataIndex: "name", width:200, sortable: true}
            ],
            height: 200,
            width: 440
        }]
    }]
});
