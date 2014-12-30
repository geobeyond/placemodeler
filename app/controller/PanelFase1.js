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
        selector: 'button[id=btnReport0]'
    }],

    init: function(){ this.control({
        'button[id=btnReport0]': {
            click: this.onBtnClick
        },
	'reportwindow[id=reportFase1]': {
	    show: this.onShowWindow,
	}
    });
                    },

    onBtnClick: function(){
        this.getPanelfase1().openReportWindow();
    },


    onShowWindow: function(){
        var fid=this.getMappanel().selectedFeature.fid;
	PM.app.getController('Report').customReport('customforms', 'meta', 1, fid, this.getWindowForm());
    },
});
