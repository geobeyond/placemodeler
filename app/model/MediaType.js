Ext.define('PM.model.MediaType', {
    extend: 'Ext.data.Model',

    requires:['PM.model.Media'],

    uses:['PM.model.Media'],

    fields: [
        {name: 'type', type: 'string'},
    ],
/*
    hasMany:[{
        model: 'PM.model.Media',
        name: 'Medias',
        associationKey: 'data',
    }]*/
});
