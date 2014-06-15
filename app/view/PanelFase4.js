Ext.define('PM.view.PanelFase4', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.panelFase4',

    title: 'Fase 4',

    layout: {
        type: 'vbox',
        align : 'stretch'
    },
    
    items:[{
	            xtype: 'container',
	            cls: 'tree'
           }, {
			    xtype:'button',
			    text: '<i class="fa fa-comment"></i> Invia il questionario',
			    tooltip: "Invia per il simbolo selezionato",
			    handler: function() {
				if (getSelectedFeaturesCount()==0) {
				    alert("Nessun elemento selezionato!");
				}
				else {
				    showSelectedForm(2);
				}
	    	}
			}]

});
