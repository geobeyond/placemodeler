Ext.define('PM.view.InfoPopup', {
    
  extend: 'GeoExt.window.Popup',
  
  alias: 'widget.infopopup', 

  title: 'Informazioni',  
  layout:'fit',
  maximizable: false,
  collapsible: false,
  anchorPosition: 'auto',
  unpinnable: true,
  draggable: true,
  items:[{
      xtype: 'panel',
      //tbar:[{ xtype: 'button', id: 'modifyFeatureButton', text: 'modifica' }],
      dockedItems: [{
	xtype: 'toolbar',
	dock: 'top',
	id: 'infoTbar',
	items: [
	  { xtype: 'button', id: 'modifyFeatureButton', text: 'modifica' }
	]
      }],
      layout: 'fit',
      width: 300,
      maxHeight: 140,
      autoScroll: true,
      html:''
  }]
  
});