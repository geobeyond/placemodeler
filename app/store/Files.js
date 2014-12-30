Ext.define('PM.store.Files', {
    extend : 'Ext.data.Store',

    model: 'PM.model.File',


    proxy : {
        type : 'memory',
        reader : {
            type : 'array',
            idProperty : 'filename'
        }
    },
 
});
