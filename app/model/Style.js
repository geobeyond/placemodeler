Ext.define('PM.model.Style', {
    extend: 'Ext.data.Model',


    fields: [
        {name: 'title', mapping: 'sld|Title'},
	{name: 'abstract', mapping:  'sld|Abstract'},
        {name: 'icon', mapping: 'sld|OnlineResource@href'}
    ],

});
