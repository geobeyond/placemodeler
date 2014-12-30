Ext.define('PM.controller.PanelFase5', {

    extend: 'Ext.app.Controller',

    views:['PanelFase5'],

    refs:[{
        ref: 'mappanel',
	selector: 'mappanel'
    },{
    	ref: 'button',
        selector: 'panelFase5 > button'
    },{
        ref: 'southPanel',
        selector: 'southtabpanel'
    },{
        ref: 'panelfase5',
	selector: 'panelFase5'
    }/*,{
    	ref: 'legendButton',
        selector: 'panelFase5 > button[name=legendBtn]'
    }*/],

    init: function(){
        this.control({
	    'panelFase5 > button[name=wpsBtn]': {
		click: this.onBtnClick
	    }/*,
	    'panelFase5 > button[name=legendBtn]': {
	      click: this.onClickLegendBtn
	    }*/
        });
    },

    
 /*   onClickLegendBtn: function(){
	PM.app.getController('Map').createLegend();
    },*/
    
    onBtnClick: function(e) {     
      PM.app.getController('Map').createWps(PM.Config.getWfsParams().featurePrefix+':'+PM.Config.getWfsParams().featureTypeLayer1, 
					     this.getMappanel().wfs1.features);
      if(!e.pressed){
	this.resetBtns();
	PM.app.getController('Main').loadInfoText(this.getPanelfase5(), PM.Config.getDescPhases().text5, true);
      }
      else
      {
	e.setText('<i class="fa fa-comment"></i> chiudi indicatore'); 
	var southPanel=this.getSouthPanel();
	southPanel.collapse();	
	PM.app.getController('Main').createLegend(this.getPanelfase5());
// 	this.getLegendButton().setDisabled(false);
      }
    },
   
    resetBtns: function(){
	this.getButton().setText('<i class="fa fa-comment"></i> calcola indicatore');
	//this.getButton().pressed=false;
// 	this.getLegendButton().setDisabled(true);
	//var mappanel = this.getMappanel();
	//mappanel.clearAllWpsLayer();
	//mappanel.map.removeLayer(mappanel.wpsLayer);
	//PM.app.getController('Map').closeLegendWindow();
	//this.getLegendButton().pressed=false;
    }
    
});

