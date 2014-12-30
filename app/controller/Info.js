 Ext.define('PM.controller.Info', {

    extend: 'Ext.app.Controller',

    refs:[{
      ref: 'infopopup',
      selector: 'infopopup'
    },{
      ref: 'panel',
      selector: 'infopopup > panel'
    },{
      ref: 'mappanel',
      selector: 'mappanel'
    }],
    
    init: function(){
      this.control({
	'infopopup': {
	   afterrender:  this.onAfterRender,
	   beforeclose: this.onBeforeClose,
	   close: this.onClose
	}
      });
    },
    
    onClose: function(){
      
    },
	    
    onBeforeClose: function(){
            
    },	
    
    closeWin: function(){
      this.getInfopopup().close();
    },
    
    
    onAfterRender: function(){
      this.loadDataInPopup(this.getMappanel().selectedFeature);    
          var panel=this.getPanel();
	  var tbar = this.getPanel().getDockedItems('toolbar[id="infoTbar"]')[0];
	  
	  var fase = PM.app.getController('Main').fase;
	  
	  switch(fase){
	    case 1:
	      var btn = Ext.create('Ext.Button', {
		text: 'Crea Rilievo Standard',
		id: 'btnReport0'
	      });
	      tbar.add(btn);
	      break;
	    case 2:
	      var menuBtn = Ext.create('Ext.button.Split', {
		id: 'splitFase2',
		text: 'Crea Rilievo',
		menu:[]
	      });
	      tbar.add(menuBtn);
	      PM.app.getController('Report').customReport('customforms', 'all', '',null,null);	    	      
	      break;
	    case 4:
	      var btn = Ext.create('Ext.Button', {
		text: 'Crea Questionario 4',
		id: 'btnReport4'
	      });
	      tbar.add(btn);
	      break;
	    case 7:
	      var btn = Ext.create('Ext.Button', {
		text: 'Crea Questionario 7',
		id: 'btnReport7'
	      });
	      tbar.add(btn);	      
	      break;
            		
	    default: 
	      break;
	  }
    },
    
    loadDataInPopup: function(feature){
      var txt='<div class="featureInfo">';      
	if (feature && typeof feature !== 'undefined'){
	  var attributes=feature.attributes;      
	  var keys= Object.keys(feature.attributes);      	  
	  var nome='';
	  var descr='';
	  var titolo='';
	  var testo='';
	  var link='';	  
	  for(var j = 0; j < keys.length; j++) {
	    if (attributes[keys[j]]!==null && attributes[keys[j]]!=='')
	    {
	      switch (keys[j])
	      {
		case 'descr':
		  descr+='<p><b>Descrizione</b>:'+attributes[keys[j]]+'</p>';
		  break;
		case 'title':
		  titolo+='<p><b>Titolo</b>:'+attributes[keys[j]]+'</p>';
		  break;	
		case 'name':
		  nome+='<p><b>Nome</b>:'+attributes[keys[j]]+'</p>';
		  break;	
		case 'text':
		  testo+='<p><b>Testo</b>:'+attributes[keys[j]]+'</p>';
		  break;	      
		case 'link':
		  link+='<p><b>Link</b>:<a href="'+attributes[keys[j]]+'" target="_blank"">'+attributes[keys[j]]+'</a></p>';
		  break;
		default:
		  break;	      
	      }
	    }
	  }
	  txt+=nome+descr+titolo+testo+link;  	  
      }
      txt+='</div>';    
      this.getPanel().update(txt);
    },
});
