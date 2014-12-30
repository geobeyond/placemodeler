Ext.define('PM.model.Project', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id', type: 'int'},
	{name: 'nome', type:  'string'},
        {name: 'descrizione', type: 'string'},
	{name: 'id_category', type: 'int'}
    ],
    
        proxy : {
        type : 'ajax',
	url: PM.Config.getUrls().getProject,
	actionMethods: {
	    read: 'POST'
	},
        reader : {
            type : 'json',
          //  totalProperty: 'total',
	   root: 'data', //TODO::  senza proxy cambiare in 'data'
	  // rootProperty: 'data'
        }
    },
}); 