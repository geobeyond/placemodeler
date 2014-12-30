Ext.define('PM.store.Links', {

    extend : 'Ext.data.Store',

    model: 'PM.model.Link',


    requires:[
      'Ext.data.proxy.Ajax',
      'Ext.data.reader.Json'
    ],


    pageSize: 5,

    autoLoad: false

});
