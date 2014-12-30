Ext.define('PM.view.SouthTabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.southtabpanel',

    requires:['Ext.XTemplate'],

    titleCollapse:true,
    hideCollapseTool: true,
    collapsible: true,
    collapsed: true,
    autoScroll: true,
    height:400,
    width:800,
    items:[
    
    /*
    {
        xtype: 'form',
        title: 'Editing',
        id: 'editingTab',
        autoScroll: true,
        standardSubmit: false,
        items:[{
            xtype: 'featurepanel',
            id: 'southFeaturePanel'
        }],
        buttons:[{
            text: 'applica modifiche',
            name: 'saveBtn',
            disabled: true
        },{
            text: 'elimina simbolo',
            name: 'delBtn',
            disabled: true
        }]
    },{
        xtype: 'panel',
        title: 'Media Gallery',
        id: 'mediaTab',
        items:[{
            xtype: 'tabpanel',
	    margin: 5,
            height: 352,
	    autoScroll: false,
            border: true,
	    items:[{
	     title: 'Images',
	     layout: 'fit',
	     items:[{ xtype: 'dataview',
                     height: 120,
	             autoScroll: true,
                     id: 'dataViewImages',
                     store: 'Images',
                     itemSelector: 'div.thumbwrap',
                     tpl: new Ext.XTemplate('<tpl for=".">',
                                            '<div class="thumbwrap" id="{name}" style="float: left; margin: 4px; margin-right: 0; padding: 5px;">',
                                            '<div class="thumb"><img src="./{path}thumbnail/{name}.{type}" title="{name}" />',
                                                '<div class="removeicon"></div>',
                                             '</div>',
                                            '</div>',
                                            '</tpl>'),
                     cls: 'images-view',
                     trackOver: true,
                     overItemCls: 'thumbwrap-hover'
                   }]
	    },{
	      title: 'Videos',
	      xtype: 'dataview',
                     width: 900,
                     height: 120,              
                     id: 'dataViewVideos',
                     store: 'Videos',
                     itemSelector: 'div.thumbwrap',
                     tpl: new Ext.XTemplate('<tpl for=".">',
                                            '<div class="thumbwrap" id="{name}" style="float: left; margin: 4px; margin-right: 0; padding: 5px;">',
                                            '<div class="thumb"><img src="{thumb}" title="{name}" />',
                                                '<div class="removeicon"></div>',
                                             '</div>',
                                            '</div>',
                                            '</tpl>'
                                           ),
                     cls: 'images-view',
                     trackOver: true,
                     overItemCls: 'thumbwrap-hover'
	    },{
	    title: 'Links',
	   xtype: 'dataview',
                     width: 900,
                     height: 120,              
                     id: 'dataViewLinks',
                     store: 'Links',
                     itemSelector: 'div.thumbwrap',
                     tpl: new Ext.XTemplate('<tpl for=".">',
                                            '<div class="thumbwrap" id="{name}" style="float: left; margin: 4px; margin-right: 0; padding: 5px;">',
                                            '<div class="thumb"><img src="{thumb}" title="{path}" />',
                                                '<div class="removeicon"></div>',
                                             '</div>',
                                            '</div>',
                                            '</tpl>'
                                           ),
                     cls: 'images-view',
                     trackOver: true,
                     overItemCls: 'thumbwrap-hover',
	    }]
        }]
    },
    
    
    */
    
    
    
    
    
    
    
    
    
    
    
    {
        xtype: 'panel',
        title: 'Riepilogo',
        id: 'chartTab',
        autoScroll:true,
	layout: {
	  type: 'table',
	  columns: 2 
	},
        items:[{
            xtype: 'box',
	    layout: 'fit',
            maxHeight:120,
            margin: 15,
	    colspan:2
        },{
	  xtype: 'box',
	  name: 'relIndex',
          height: 60,
	  margin: 15, 
	  colspan:2
	},{
            xtype: 'chart',
            width: 450,
            height: 300,
            maxWidth: 450,
            maxHeight: 300,
            animate: true,
            store: 'Reports',
            axes: [
                {
                    type: 'Numeric',
                    position: 'left',
                    fields: ['data'],
                    label: {
                        renderer: Ext.util.Format.numberRenderer('0,0')
                    },
                    title: 'Numero Report',
                    grid: false,
		    minimum: 0,
		    majorTickSteps: 1
                },
                {
                    type: 'Category',
                    position: 'bottom',
                    fields: ['name'],
                    title: 'Tipo',
		    label: {rotate: {degrees: 270}}
                }
            ],
            series: [
                {
                    type: 'column',
                    axis: 'left',
                    highlight: true,
                    tips: {
                        trackMouse: true,
                        width: 140,
                        height: 28,
                        renderer: function(storeItem, item) {
                            this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data') + ' $');
                        }
                    },
                    label: {
                        display: 'insideEnd',
                        'text-anchor': 'middle',
                        field: 'data',
                        renderer: Ext.util.Format.numberRenderer('0'),
                        orientation: 'vertical',
                        color: '#333'
                    },
                    xField: 'name',
                    yField: 'data'
                }
            ]
        }]
    },{
	title: 'Dettaglio',
	id: 'detailsTab',
	items:[{
	    xtype: 'grid',
	    name: 'gridDetailReports',
	    title: 'Reports inviati',
	    height: 300,
	    width:800,
	    store:'ReportDetails',
	    columns:[
		{text: 'titolo', dataIndex: 'name', width:500 },
		{text: 'tipo', dataIndex: 'type', width:280}	
	    ]
	}]
    }],

    reportDetailWindow: function(data) {
	Ext.create('PM.view.ReportViewWindow', {
	    data:data
	}).show();
    }
});
