Ext.define('PM.store.Videos', {

    extend : 'Ext.data.Store',

    model: 'PM.model.Video',


    requires:[
      'Ext.data.proxy.Ajax',
      'Ext.data.reader.Json'
    ],


    pageSize: 5,

    autoLoad: false

});