Ext.define('PM.model.Media', {

    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'path', type: 'string'},
        {name: 'type', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'thumb', type: 'string'},

        {name: 'width', type: 'int'},
        {name: 'height', type: 'int'}
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
