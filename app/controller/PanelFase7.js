Ext.define('PM.controller.PanelFase7', {

    extend: 'Ext.app.Controller',


    views:['PanelFase7'],

    refs:[{
        ref: 'mappanel',
        selector: 'mappanel'
    },{
        ref: 'panelFase7',
        selector: 'panelFase7'
    },{
    	ref: 'button',
        selector: 'panelFase7 > button'
    },{
        ref: 'windowForm7',
        selector: 'reportwindow[id=reportFase7] > form > fieldset'
    }],

    init: function(){
        this.control({
            'panelFase7 > button':{
                click: this.onButtonClick
            },
            'reportwindow[id=reportFase7]': {
	        show: this.onShowWindow,
                close: this.onCloseWindow
	    }
        });
    },

    onButtonClick: function(){
        this.getPanelFase7().openReportWindow();
        this.disableComponents(true);
    },

    onCloseWindow: function(){
        this.disableComponents(false);
    },

    onShowWindow: function(window){
        window.setTitle('Questionario 7');
        var fid=this.getMappanel().selectedFeature.fid;
        PM.app.getController('Report').customReport('customforms', 'meta', 6, fid, this.getWindowForm7());

    },

    disableComponents: function(value){
        this.getButton().setDisabled(value);
    }


});
