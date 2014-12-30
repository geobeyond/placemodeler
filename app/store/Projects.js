Ext.define('PM.store.Projects', {

    extend : 'Ext.data.Store',

    model: 'PM.model.Project',
  
    requires:[
      'Ext.data.proxy.Ajax',
      'Ext.data.reader.Json'
    ],


    autoLoad: true
}); 
 
