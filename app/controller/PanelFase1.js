Ext.define('PM.controller.PanelFase1', {

    extend: 'Ext.app.Controller',

    views:['PanelFase1'],

    refs:[{
        ref: 'mappanel',
	selector: 'mappanel'
    },{
        ref: 'panelfase1',
	selector: 'panelFase1'
    },{
        ref: 'windowForm',
        selector: 'reportwindow[id=reportFase1] > form'
    },{
        ref: 'button',
        selector: 'panelFase1 > button'
    }],

    init: function(){ this.control({
        'panelFase1 > button': {
            click: this.onBtnClick
        },
	'reportwindow[id=reportFase1]': {
	    show: this.onShowWindow,
            close: this.onCloseWindow
	}
    });
                    },

    onBtnClick: function(){
        this.getPanelfase1().openReportWindow();
        this.disableComponents(true);
    },

    onCloseWindow: function(){
        this.disableComponents(false);
    },

    onShowWindow: function(){
        var fid=this.getMappanel().selectedFeature.fid;
	PM.app.getController('Report').customReport('customforms', 'meta', 1, fid, this.getWindowForm());
    },

    disableComponents: function(value){
        this.getButton().setDisabled(value);
    }
});
