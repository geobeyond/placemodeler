Ext.define('PM.controller.GetCapabilities', {

    extend: 'Ext.app.Controller',
    
    requires:[
    'GeoExt.data.reader.WmsCapabilities',
    'GeoExt.data.WmsCapabilitiesLayerStore'],

    refs:[{
      ref: 'mappanel',
      selector:'mappanel'
    },{
      ref: 'panelfase3',
      selector:'panelFase3'
    },{
      ref: 'urlField',
      selector: 'getcapabilitieswindow textfield'
    },{
      ref: 'grid',
      selector: 'getcapabilitieswindow grid'
    }],
    
    
    views:['GetCapabilitiesWindow'],
    
    localUrl: 'wmsProxy.php?url='+encodeURIComponent("http://89.31.77.165//geoserver/ows?service=wms&request=GetCapabilities"),
	   
        init: function(){
	  this.control({
	    'getcapabilitieswindow':{
	      close: this.onCloseWindow
	    },
	    'getcapabilitieswindow button[cls=urlBtn]':{
	      click: this.onUrlBtnClick
	    },
	    'getcapabilitieswindow button[cls=localBtn]':{
	      click: this.onLocalBtnClick
	    },
	    'getcapabilitieswindow grid':{
	      itemdblclick: this.onGridItemDblClick
	    }
        });
    },
    

    
    onCloseWindow: function(){
      this.getPanelfase3().closeGetCapabiliesWindow();
    },
    
    onUrlBtnClick: function(){
      var textField=this.getUrlField();
      if (!(textField.activeErrors && typeof textField.activeErrors!== 'undefined'))
      {
	var url=textField.getValue();
	if (url!=='')
	{
	  this.loadGrid(url);
	}
	else
	{
	  alert('devi inserire una URL');
	}
      }
      
    },
    
    onLocalBtnClick: function(){
       this.loadGrid(this.localUrl);
    },
    
    loadGrid: function(url){
      var that=this;
       var store=Ext.create('GeoExt.data.WmsCapabilitiesStore', {
            storeId: 'wmscapsStore',
            url: url,
            autoLoad: true
        });
       
       
     store.load({
       callback: function(records, operation, success) {
	 that.getGrid().getStore().loadRecords(store.getRange());
       },
    });     
    },
    
    
    onGridItemDblClick: function(grid, record){
      this.getMappanel().map.addLayer(record.getLayer().clone());   
      this.getGrid().getStore().remove(record);
    }
    
    

});