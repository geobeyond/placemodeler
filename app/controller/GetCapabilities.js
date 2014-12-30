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

    localUrl: PM.Config.getUrls().proxyHostWms+encodeURIComponent(PM.Config.getUrls().getCapabilities),

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

	if (PM.Config.getUrls().proxyHostWms && typeof PM.Config.getUrls().proxyHostWms!=='undefined')
	  this.localUrl=PM.Config.getUrls().proxyHostWms+encodeURIComponent(PM.Config.getUrls().getCapabilities);
	else
	  this.localUrl=PM.Config.getUrls().getCapabilities;
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
                Ext.Msg.alert({
                    title:'Errore!',
                    msg: 'devi inserire un Url.',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
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
	        for (var i=0; i<records.length; i++)
	        {
	            records[i].raw.isloadedByGetCapabilities=true;
	        }
	        that.getGrid().getStore().loadRecords(store.getRange());
            }
        });
    },


    onGridItemDblClick: function(grid, record){
        var mappanel=this.getMappanel();
        mappanel.map.removeLayer(mappanel.wfs3);
        mappanel.map.addLayer(record.getLayer().clone());
        mappanel.map.addLayer(mappanel.wfs3);
        this.getGrid().getStore().remove(record);
    }



});
