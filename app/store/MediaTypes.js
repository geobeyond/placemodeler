Ext.define('PM.store.MediaTypes', {

    extend : 'Ext.data.Store',

    model: 'PM.model.MediaType',

    requires:[
      'Ext.data.proxy.Ajax',
      'Ext.data.reader.Json'
    ],
   

    proxy : {
        type : 'ajax',
	url: PM.Config.getUrls().getMedia,
	actionMethods: {
	  read: 'POST'
	},
        reader : {
            type : 'json',
	    root: 'contents.data'//'data'
        },	
    },

    autoLoad: false

});
