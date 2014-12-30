Ext.define('PM.controller.Project', {

    extend: 'Ext.app.Controller',

    views:['ProjectWindow'],
    
    refs: [{
      ref: 'mappanel',
      selector: 'mappanel'
    },{
      ref: 'win',
      selector: 'projectwindow'
    },{
      ref: 'winNP',
      selector: 'window[id=npWin]'
    },{
      ref: 'npNome',
      selector: 'textfield[id=npNome]'
    },{
      ref: 'npDesc',
      selector: 'textarea[id=npDesc]'
    },{
      ref: 'npCombo',
      selector: 'combo[id=npCombo]'
    },{
      ref: 'title',
      selector: 'northpanel > component'
    },{
        ref: 'mapTbar',
	selector: 'toolbar[id=dockedTopMap]'
    }],
    
    
    
    init: function(){
      this.control({
	'button[id=newProjectBtn]':{
		  click: this.onNewProjectClick
	      },	
	      'button[id=npSave]':{
                click: this.npOnSave
            },
	      'combo[id=npCombo]': {
		change: this.onComboChange
	      }
      });
      
      this.subCategories=[];
    },
        
    onComboChange: function(e, newValue, oldValue, eOpts ){
      this.applyFilter(newValue);
      this.updateTitle(e.getRawValue());
      PM.app.getController('Main').idProject = newValue;
      var store=e.getStore();
      var items=store.data.items;
      
      for (var i=0; items.length; i++ ){
	if (items[i].raw.id==newValue){
	  this.getCategories(items[i].raw.id_category);
	  break;
	}
      }
      this.getMapTbar().setDisabled(false);
      this.setLastProject(newValue);     
//       this.getWin().close();
    }, 
    
    setLastProject: function(id){
            //salva newValue in tabella users
      	Ext.Ajax.request({
	  url: PM.Config.getUrls().setLastProject,
	  params:{
	   user_id: PM.app.getController('Main').userId,
	   last_project: id
	  },
	  success: function(res){
	    ;
	  }	  
	});
    },
    
    onNewProjectClick: function(){
       this.getWin().NewProjWinShow();
    },
    
    npOnSave: function(){
      var that = this;
      var nomeV=that.getNpNome();
      var descV=that.getNpDesc();
      var nome = nomeV.getValue();
      if (nome!='')
      {
	Ext.Ajax.request({
	  url: PM.Config.getUrls().saveProject,
	  params:{
	    nome: nome,
	    desc: descV.getValue(),
	  },
			
	  success: function(response){
	    that.getNpCombo().store.reload();
	    res=Ext.JSON.decode(response.responseText);
	    var error=res.error;
	    var payload=res.payload;
	    if(error.code!=='0'){
                   Ext.Msg.alert({
                        title:'Errore!',
                        msg: error.message,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
		    return false;	      
	    }
	    else{
	      PM.app.getController('Main').idProject = res.id;
	      that.applyFilter(res.id);
	      that.updateTitle(nome);
	      that.setLastProject(res.id); 
	      that.getMapTbar().setDisabled(false);
	    }
	    nomeV.reset();
	    descV.reset();
	    that.getWin().hide();
	    that.getWinNP().hide();
	  },
	  failure: function(res, err){
	    PM.app.getController('Main').idProject = false;
	  },
	});
      }
    },
    
    applyFilter: function(id){
      var mappanel = this.getMappanel();
      var filter = new OpenLayers.Filter.Comparison({
	  type: OpenLayers.Filter.Comparison.EQUAL_TO,
	  property: "id_progetto",
	  value: id
      });
      var parser = new OpenLayers.Format.Filter.v1_1_0();
      var filterAsXml = parser.write(filter);
      var xml = new OpenLayers.Format.XML();
      var filterAsString = xml.write(filterAsXml);
      
      mappanel.wms1.params['FILTER'] = filterAsString;
      mappanel.wms1.redraw(true);
     
      mappanel.wms3.params['FILTER'] = filterAsString;
      mappanel.wms3.redraw(true);
      
      mappanel.wfs1.filter = filter;
      mappanel.wfs1.refresh({force: true});
      
      mappanel.wfs3.filter = filter;
      mappanel.wfs3.refresh({force: true}); 
      
      mappanel.wfs6.filter = filter;
      mappanel.wfs6.refresh({force: true});    
      
      mappanel.wfs8.filter = filter;
      mappanel.wfs8.refresh({force: true});       

    },
    
    getCategories: function(idProject){
	var that = this;
      	Ext.Ajax.request({
	  url: PM.Config.getUrls().getCategories,
	  params:{
	    idProject: idProject
	  },
	  success: function(response){
	    var res=Ext.JSON.decode(response.responseText);
	    that.subCategories = res.data;
	  }			 
	});		 			
    },
        
    updateTitle: function(name){
      this.getTitle().update('<div id="title">Div@ter > '+name+'</div>');
    }
});
