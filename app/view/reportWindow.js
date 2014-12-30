Ext.define('PM.view.ReportWindow', {

    alias: 'widget.reportwindow',
    extend: 'Ext.window.Window',
    border:false,

    padding: 15,
    width:780,
    height:500,
    overflowY: 'auto',
    feature: null,

    items:[{
        xtype: 'form',
	id: 'submitForm',
	autoScroll:true,
        items:[{
            xtype: 'fieldset',
            title: 'Report',
            layout:{
                type:'table',
                columns: 2,
                border:true,
                tdAttrs:{
                    style:{padding:'4px'}
                }
            },

            defaults:{
                width:334,
                xtype: 'textfield',
                labelAlign: 'top'
            },
            items:[{
		id: 'incident_title',
		name: 'incident_title',
		fieldLabel: 'Titolo',
                allowBlank: false
	    },{
		xtype: 'hiddenfield',
		id:'task',
		name: 'task',
		value: 'report'
	    },{
		id: 'location_name',
		name: 'location_name',
		fieldLabel: 'Nome luogo',
                allowBlank: false
	    },{
		xtype:'htmleditor',
		id: 'incident_description',
		name: 'incident_description',
		fieldLabel: 'Descrizione',
                allowBlank: false,
                width: 676,
                colspan:2
	    },{
                xtype: 'fieldcontainer',
                padding: 0,
                colspan:2,
                layout: {
                    type: 'hbox',
                    align: 'left'
                },
                defaults:{
                    labelAlign: 'top',
                    padding: '0 0 0 15',
                    width:140,
                    allowBlank: false
                },
                items:[{
		    xtype:'datefield',
		    id: 'incident_date',
		    name: 'incident_date',
		    fieldLabel: 'Data',		    
	        },{
		    xtype:'timefield',
		    id: 'incident_time',
		    name: 'delete',
		    format: 'H:i',
		    fieldLabel: 'Ora'
	        }]
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
	    }]
        },{
	  xtype: 'mediapanel'
	}],

        buttonAlign: 'left',
        buttons:[{
            text: 'Invia Report'
        },{
            text: 'Annulla'
        }]
    }]
});
