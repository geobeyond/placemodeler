Ext.define('PM.controller.PanelFase8', {

    extend: 'Ext.app.Controller',

    views:['PanelFase8'],

    refs:[{
        ref: 'mappanel',
	selector: 'mappanel'
    },{
    	ref: 'button',
        selector: 'panelFase8 > button'
    },{
        ref: 'southPanel',
        selector: 'southtabpanel'
    },{
        ref: 'panelfase8',
	selector: 'panelFase8'
    }/*,{
    	ref: 'legendButton',
        selector: 'panelFase8 > button[name=legendBtn]'
    }*/],

    init: function(){
        this.control({
 	    'panelFase8 > button[name=wpsBtn]': {
		click: this.onBtnClick
	    }/*,
	    'panelFase8 > button[name=legendBtn]': {
	      click: this.onClickLegendBtn
	    }*/
        });
    },
    /*
    onClickLegendBtn: function(){
	PM.app.getController('Map').createLegend();
    },*/
    
    onBtnClick: function(e){
      PM.app.getController('Map').createWps(PM.Config.getWfsParams().featurePrefix+':'+PM.Config.getWfsParams().featureTypeLayer8,
					    this.getMappanel().wfs8.features
      );
      if(!e.pressed){
	this.resetBtns();
	PM.app.getController('Main').loadInfoText(this.getPanelfase8(), PM.Config.getDescPhases().text8, true);
      }
      else
      {
	this.getButton().setText('<i class="fa fa-comment"></i> chiudi indicatore'); 
	var southPanel=this.getSouthPanel();
	southPanel.collapse();
	PM.app.getController('Main').createLegend(this.getPanelfase8());
	//southPanel.hide();
// 	this.getLegendButton().setDisabled(false);
      }
    },
    
    resetBtns: function(){
	this.getButton().setText('<i class="fa fa-comment"></i> calcola indicatore');
/*	this.getLegendButton().setDisabled(true);
	PM.app.getController('Map').closeLegendWindow();
	this.getLegendButton().pressed=false;   */   
    }
});
