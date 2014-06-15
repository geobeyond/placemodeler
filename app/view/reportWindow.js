Ext.define('PM.view.ReportWindow', {

    alias: 'widget.reportwindow',
    extend: 'Ext.window.Window',
    border:false,

    layout: 'fit',
    height: 400,
    width: 600,
    padding: 15,

    feature: null,
    
    closeAction: 'hide',

    items:[{
        xtype: 'form',
        autoScroll: true,
        items:[
	    {
	        xtype: 'form',
	        id: 'submitForm',
	 	autoScroll:true,
	 	//    url: 'proxy.php?mode=native&url='+encodeURIComponent('http://89.31.77.165/ushahidi-v2/api/'),
	 	items:[
		    {
			xtype:'textfield',
			id: 'incident_title',
			name: 'incident_title',
			fieldLabel: 'Report title'
		    },{
			xtype: 'hiddenfield',
			id:'task',
			name: 'task',
			value: 'report'
		    },{
			xtype:'textfield',
			id: 'location_name',
			name: 'location_name',
			fieldLabel: 'Nome luogo',
			//value: locationUrl
		    }
		    ,{
			xtype:'textarea',
			id: 'incident_description',
			name: 'incident_description',
			fieldLabel: 'Descrizione'
		    },{
			xtype:'datefield',
			id: 'incident_date',
			name: 'incident_date',
			fieldLabel: 'Data'
		    },{
			xtype:'timefield',
			id: 'incident_time',
			name: 'delete',
			fieldLabel: 'Ora'
		    },{
			xtype: 'hiddenfield',
			id:'submitForm-hour',
			name: 'incident_hour'
		    },{
			xtype: 'hiddenfield',
			id:'submitForm-min',
			name: 'incident_minute'
		    },{
			xtype: 'hiddenfield',
			id:'submitForm-ampm',
			name: 'incident_ampm'
		    },{
			xtype: 'hiddenfield',
			id:'resp',
			name: 'resp',
			value: 'json'
		    },{
			xtype: 'hiddenfield',
			id:'incident_category',
			name: 'incident_category',
			value: '4'
		    }
		]
	    }
        ]
    }],

    buttons:[{
        text: 'Annulla'
    },{
        text: 'Invia Report'
    }]


});
