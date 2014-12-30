Ext.define('PM.store.Images', {

    extend : 'Ext.data.Store',

    model: 'PM.model.Image',

    requires:[
      'Ext.data.proxy.Ajax',
      'Ext.data.reader.Json'
    ],

    pageSize: 5,

    autoLoad: false
  

});
