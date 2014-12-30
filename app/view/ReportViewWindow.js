Ext.define('PM.view.ReportViewWindow', {

    alias: 'widget.reportviewwindow',
    extend: 'Ext.window.Window',
    border: false,
    width: 700,
    height:500,
    layout: 'fit',

    items:[{
	xtype: 'form',
//	layout: 'form',
//	standardSubmit: false,
	items:[{
	    xtype: 'tabpanel',
	    items:[{
		title:'Informazioni',
	  	name: 'tabInfo'
	    },{
		title: 'Media',
		layout: 'fit',
		name: 'tabDView',
		items:[{
		    xtype: 'dataview',
		    store: 'UshahidiMedias',
		    tpl: new Ext.XTemplate('<tpl for=".">',
/*                                           '<div class="thumb_wrap">',
                                           '<img src="{thumb_url}" width="80" height="80" ></img>',                                           
                                           '</div>',*/
                                           // '<div class="thumbwrap" id="{name}" style="float: left; margin: 4px; margin-right: 0; padding: 5px;">',
						'<tpl if="type == 1">',
						  '<span class="thumb1"><img src="{thumb_url}" width="80" height="80" />',
						'<tpl else>',
						  '<span class=""><a href="{link}" target=_blank><img src="./media/video-icon.png" /></a>',
						'</tpl>',     
                                             '</span>',
                                         //   '</div>',
                                           '</tpl>'
                                          )}]
	    }]
	}],

	buttons:[{
	    text: 'elimina report',
	    name: 'deleteReport'
	}]
	
    }]
    
  
});
