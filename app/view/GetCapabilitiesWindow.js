Ext.define('PM.view.GetCapabilitiesWindow', {
    
    alias: 'widget.getcapabilitieswindow',  
    extend: 'Ext.window.Window',
    border:false,
    
    title: 'Add Layer',
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
	text:'carica da locale', colspan:2
      },{
	xtype: 'button',
	cls:'urlBtn',
	text:'carica da url'
      },{
	xtype: 'textfield',
	name: 'url',
	vtype:'url',
	width: 350
      },{
	colspan:2,
	xtype: 'grid',
	title: "WMS Capabilities",     
            columns: [
                {header: "Title", dataIndex: "title", width:80,sortable: true},
                {header: "Name", dataIndex: "name", width:100, sortable: true},
                //{header: "Queryable", dataIndex: "queryable", sortable: true, width: 70},
                //{id: "description", header: "Description", dataIndex: "abstract", flex: 1}
            ],        
            height: 200,
            width: 440,
      }]
    }]   
}); 
