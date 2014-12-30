Ext.define('PM.controller.ReportQuestions', {

    extend: 'Ext.app.Controller',


    views:['ReportViewWindow'],

    refs:[{
	ref: 'reportView',
	selector: 'reportviewwindow'
    },{
	ref: 'form',
	selector: 'reportviewwindow > form > tabpanel > panel[name=tabInfo]'
    },{
	ref: 'dataview',
	selector: 'reportviewwindow > form > tabpanel > panel[name=tabDView] > dataview'
    },{
       ref: 'grid',
       selector: 'grid[name=gridDetailReports]'
    }],

    init: function(){
        this.control({
            'reportviewwindow':{
		afterrender: this.onAfterRender
	    },
	    'button[name=deleteReport]':{
		click: this.deleteReport
	    },
	    'grid[name=gridDetailReports]':{
	      select: this.onSelectRowGrid
	    }
        });
    },
    
    onAfterRender: function() {
	var that=this;
	var reportView=this.getReportView();
	var d=reportView.data;
	reportView.setTitle(d.raw.type);
	var data=d.raw.data;
	that.incidentId = data.incident.incidentid;
		
		
	var customFields = d.raw.data.customfields;	
	PM.app.getController('Report').getCustomFormIds(data.tipo, function(ids, error) {
	    if (error)
		return;
	    
	    var html='<div class="reportView"><p><b>'+d.data.name+'</b></p>';
	    html+='<p><b>Data: </b>'+data.incident.incidentdate+'</p>';
	    html+='<p><b>Titolo: </b>'+data.incident.incidenttitle+'</p>';
	    html+='<p><b>Nome Luogo: </b>'+data.incident.locationname+'</p>';
	    html+='<p><b>Descrizione: </b>'+data.incident.incidentdescription+'</p>';
	    
	    var keys=Object.keys(customFields);
	    for(var i=0; i<keys.length; i++)
	    {
		for (var j=0; j<ids.length; j++)
		{
		    if (ids[j]===keys[i])
		    {
			html+='<p><b>'+customFields[keys[i]].field_name+': </b>'+customFields[keys[i]].field_response+'</p>';
		    }
		}
	    }
	    html+='</div>';
	    var store = PM.app.getStore('UshahidiMedias');
	    var medias=[];
	    for (var i = 0; i < data.media.length; i++){
		if (data.media[i].type===1){
		    medias.push({
		        type: data.media[i].type,		 
			thumb_url: data.media[i].thumb_url,
			thumb: data.media[i].thumb			
		    });
		 //   medias[i].thumb_url = data.media[i].thumb_url;		    
	      //   data.media[i].url_thumb=data.media[i];
		}
		else {	
		  medias.push({
		   type: data.media[i].type,
		   link: data.media[i].link
		  });
		}
		
	    }
	    store.loadData(medias);		    
	    
	    that.getForm().update(html);	  
	    that.getDataview().refresh();
	});
    },
    
    onSelectRowGrid: function(selModel, record, index, options){
        this.selectedRow=index;
    },
	   
    deleteReport: function() {
	var that=this;
	Ext.MessageBox.show({
	    title: 'Cancella il report',
	    msg: 'Sei sicuro di voler cancellare il report?',
	    buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
	    fn : function(btn) {
	      
		if (btn==='yes')
		{
		    Ext.Ajax.request({
			url: PM.Config.getUrls().proxyHostWfs+ 'http://localhost' + PM.app.getController('Report').ushahidiUrl, 
			method: 'POST',
			params:{
			    task: 'reports',
			    incident_id: that.incidentId,
			    action: 'delete'	
			},
			success:function(response) {
			    Ext.MessageBox.show({
				title: 'Report cancellato',
				msg: 'Report cancellato correttamente',
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.INFO
			    });
			    //ricarica store del grid
			    var storeGrid = PM.app.getStore('ReportDetails');
			    var row=storeGrid.getAt(that.selectedRow);
			    var tipo=row.data.data.tipo;
			    storeGrid.removeAt(that.selectedRow);
			    //ricarica store del dataview
			    var southController=PM.app.getController('SouthPanel');
			    var r=southController.resultChart;
			    for (var i=0; i< r.length; i++)
			    {
			      if (tipo==i){
				if (r[i]>0){
				    r[i]--;
				}
			      }				
			    }
			    southController.loadChartData(r);
			    //chiudi finestra
			    that.getReportView().close();
			},
			failure: function(response) {
			    Ext.MessageBox.show({
				title: 'Errore!',
				msg: 'Problema durante la cancellazione del report',
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.ERROR
			    });			    
			}
		    });
		}
	    }	    
	});
    }
});
