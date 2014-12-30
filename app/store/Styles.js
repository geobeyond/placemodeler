Ext.define('PM.store.Styles', {

    extend : 'Ext.data.Store',

    model: 'PM.model.Style',


    requires:[
      'Ext.data.proxy.Ajax',
      'Ext.data.reader.Xml'
    ],

    proxy : {
        type : 'ajax',
	url: '',

        reader: {
            type: 'xml',
            record: 'sld|Rule',
            root: 'sld|FeatureTypeStyle'
        }
    },
    
    listeners: {
      load: function(store){
	var hits={};
	store.filterBy(function(record) {
                var name = record.get('title');
                if (hits[name]) {
                    return false;
                } else {
                    hits[name] = true;
                    return true;
                }
            });
      }
    },
    autoLoad: true
});
