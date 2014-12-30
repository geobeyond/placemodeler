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
        selector: 'button[id=btnReport7]'
    },{
        ref: 'windowForm7',
        selector: 'reportwindow[id=reportFase7] > form > fieldset'
    }],

    init: function(){
        this.control({
            'button[id=btnReport7]':{
                click: this.onButtonClick
            },
            'reportwindow[id=reportFase7]': {
	        show: this.onShowWindow
	    }
        });
    },

    onButtonClick: function(){
        this.getPanelFase7().openReportWindow();
    },

    onShowWindow: function(window){
        window.setTitle('Questionario 7');
        var fid=this.getMappanel().selectedFeature.fid;
        PM.app.getController('Report').customReport('customforms', 'meta', 6, fid, this.getWindowForm7());

    },



});
