Ext.define('PM.controller.PanelFase1', {

    extend: 'Ext.app.Controller',

    views:['PanelFase1'],

    refs:[{
        ref: 'panelfase1',
	selector: 'panelFase1'
    }],

    init: function(){ this.control({
            'panelFase1 > button':{
              click: this.onBtnClick
            }
        });
    },

    onBtnClick: function(){
        this.getPanelfase1().openReportWindow();
    }

});
