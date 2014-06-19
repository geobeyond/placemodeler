Ext.define('PM.view.SouthFeaturePanel', {

    alias: 'widget.southfeaturepanel',
    extend: 'Ext.panel.Panel',
    
    requires:['PM.view.FeaturePanel'],
    
    border:false,

    padding: 15,
    
    layout: {
	type: 'hbox',
	pack: 'start',
	align: 'stretch'
    },
    
    items:[{
      xtype: 'featurepanel'
    }]
    
 

});
 
