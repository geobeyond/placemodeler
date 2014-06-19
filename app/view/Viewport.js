Ext.define('PM.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:['PM.view.MapPanel',
              'PM.view.PanelFase1',
              'PM.view.PanelFase2',
              'PM.view.PanelFase3',
              'PM.view.PanelFase4',
              'PM.view.PanelFase5',
              'PM.view.PanelFase6',
              'PM.view.PanelFase7',
              'PM.view.PanelFase8',

              'PM.view.SouthFeaturePanel'
             ],
    alias:'widget.pm-viewport',

    layout:{
        type: 'border'
    },
    items:[/*{
            region: 'north',
            layout: 'fit',
            height: 20,
            items:[{
	    xtype: 'text',
	    text: 'DIVATER',
	    style:{

	    }
            }]
            },*/{
                region: 'west',
                id: 'west',
                title: "Simboli",
	        layout: 'accordion',
                collapsible: true,
                width: 250,
	        items:[{xtype:'panelFase1'},
                       {xtype:'panelFase2'},
                       {xtype:'panelFase3'},
                       {xtype:'panelFase4'},
                       {xtype:'panelFase5'},
		       {xtype:'panelFase6'},
		       {xtype:'panelFase7'},
		       {xtype:'panelFase8'}
		      ]
            },{
                region: 'center',
                layout: 'border',
                items:[{
                    region: 'center',
                    title: 'map',
                    xtype: 'mappanel'
                },{
                    region: 'south',
                    xtype: 'tabpanel',
                    id: 'southPanel',
                    collapsible: true,
                    collapsed: false,
                    autoScroll: true,
                    height:400,
                 //   maxHeight:200,
                    width:800,
                   // layout: 'border',
                    /*items:[{
                        region: 'center',
                        border: true,
                        height: 200,
                        width:200
                    },{
                        region: 'right',
                        height:200,
                        width:200,
                        border: true
                    }]*/

                    /*layout: {
                        type: 'vbox',
                        pack: 'start',
                        align: 'stretch'
                    },*/
                    /*items: [
                        {html:'panel 1',  border: true,height:100},
                        {html:'panel 2', width:150, border:true, height:400},
                        {html:'panel 3',  border: true, height:100}
                    ]*/
                    items:[{
                        xtype: 'form',
                        title: 'Editing',
                        autoScroll: true,
                    //    layout: 'fit',
                        items:[{
                        xtype: 'featurepanel'
                        }]
                      //  border: true

                     //   width: 300,
                       // height:200,
                        /*layout:{
	                    type:'table',
	                    columns: 3,
	                    border:true,
	                    tdAttrs:{
	                        style:{padding:'4px'}
	                    }

                        },*/
                      //  flex:1
                    },{
                        xtype: 'panel',
                        title: 'Media Gallery',
                        html: 'galleria media???',
                        border: true,
                        //title: 'media',
                        width: 400,
                        height:100
                    }]

                }]
            }]

});
