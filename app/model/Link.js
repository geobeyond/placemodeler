Ext.define('PM.model.Link', {

    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'path', type: 'string'},
        {name: 'type', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'thumb', type: 'string'},

    ],

    proxy : {
        type : 'ajax',
	url: PM.Config.getUrls().getMedia,
	actionMethods: {
	    read: 'POST'
	},
        reader : {
            type : 'json',
            totalProperty: 'total',
	    root: 'data'//TODO::  senza proxy cambiare in 'data'
        }
    },
});
