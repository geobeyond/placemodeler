Ext.define('PM.view.ModifyFeatureWindow', {

    alias: 'widget.modifyfeaturewindow',
    extend: 'Ext.window.Window',

    //requires:['PM.view.FeaturePanel','PM.view.MediaPanel'],
    requires:['Ext.XTemplate'],
    
    border:false,

    title: 'Modifica le informazioni del simbolo',
//    layout: 'fit',
    height: 500,
    width:700,
    
    autoScroll:true,
    draggable: true,
    padding:5,

 //   feature: null,
    items:[{
      xtype: 'tabpanel',
      height: 580,
      width:760,
	items:[{
	    xtype: 'form',
	    title: 'Editing',
	    id: 'editingTab',
	    name: 'formFeatureMod',
	    autoScroll: true,
	    height:500,
	    width:760,
	    layout: 'fit',
	    standardSubmit: false,
	    items:[{
		xtype: 'featurepanel',
		id: 'southFeaturePanel'
	    }],
	    buttons:[{
		text: 'applica modifiche',
		name: 'saveBtnFeatureMod',
		disabled: true
	    },{
		text: 'elimina simbolo',
		name: 'delBtnFeatureMod',
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
	}]
    }],
    /*buttonAlign: 'left',
    buttons:[{
        text: 'Salva'
    },{
        text: 'Annulla'
    }],*/


}); 
