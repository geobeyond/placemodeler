Ext.define('PM.controller.PanelFase2', {

    extend: 'Ext.app.Controller',

    views:['PanelFase2'],

    refs:[{
        ref: 'mappanel',
        selector: 'mappanel'
    },{
        ref: 'button',
        selector: 'panelFase2 > button'
    },{
        ref: 'panelfase2',
	selector: 'panelFase2'
    },/*{
        ref: 'radiogroupFase2',
        selector: 'panelFase2 > radiogroup'
    },*/{
        ref: 'window',
        selector: 'reportwindow[id=reportFase2]'
    },{
        ref: 'windowForm2',
        selector: 'reportwindow[id=reportFase2] > form > fieldset'
    }/*,{
       ref: 'menuFase2',
       selector: 'splitbutton[id=splitFase2] > menu'
    }*/],

    init: function(){
        this.control({
	    'splitbutton[id=splitFase2] > menu': {
	       click: this.onClickMenu
	    },
	    'panelFase2 > button': {
                click: this.onBtnClick
            },
	    'reportwindow[id=reportFase2]': {
	        show: this.onShowWindow
	    }
        });
    },
    
    onClickMenu: function(menu, item, e, opts){
      this.menuValue=item.inputValue;
      this.menuText=item.text;
      this.getPanelfase2().openReportWindow();
    },


    onBtnClick: function(){
        this.getPanelfase2().openReportWindow();
    },


    onShowWindow: function(window){
        window.setTitle(this.menuText);
	
        var fid=this.getMappanel().selectedFeature.fid;
        PM.app.getController('Report').customReport('customforms', 'meta', this.menuValue, fid, this.getWindowForm2());
    },


});
