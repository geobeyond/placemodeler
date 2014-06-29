Ext.define('PM.controller.PanelFase4', {

    extend: 'Ext.app.Controller',


    views:['PanelFase4'],

    refs:[{
        ref: 'mappanel',
        selector: 'mappanel'
    },{
        ref: 'panelFase4',
        selector: 'panelFase4'
    },{
    	ref: 'button',
        selector: 'panelFase4 > button'
    },{
        ref: 'windowForm4',
        selector: 'reportwindow[id=reportFase4] > form > fieldset'
    }],

    init: function(){
        this.control({
            'panelFase4 > button':{
                click: this.onButtonClick
            },
            'reportwindow[id=reportFase4]': {
	        show: this.onShowWindow,
                close: this.onCloseWindow
	    }
        });
    },

    onButtonClick: function(){
        this.getPanelFase4().openReportWindow();
        this.disableComponents(true);
    },

    onCloseWindow: function(){
        this.disableComponents(false);
    },

    onShowWindow: function(window){
        window.setTitle('Questionario 4');
        var fid=this.getMappanel().selectedFeature.fid;
        PM.app.getController('Report').customReport('customforms', 'meta', 5, fid, this.getWindowForm4());

    },

    disableComponents: function(value){
        this.getButton().setDisabled(value);
    }


});
