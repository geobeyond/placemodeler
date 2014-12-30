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
        selector: 'button[id=btnReport4]'
    },{
        ref: 'windowForm4',
        selector: 'reportwindow[id=reportFase4] > form > fieldset'
    }],

    init: function(){
        this.control({
            'button[id=btnReport4]':{
                click: this.onButtonClick
            },
            'reportwindow[id=reportFase4]': {
	        show: this.onShowWindow
	    }
        });
    },

    onButtonClick: function(){
        this.getPanelFase4().openReportWindow();
    },


    onShowWindow: function(window){
        window.setTitle('Questionario 4');
        var fid=this.getMappanel().selectedFeature.fid;
        PM.app.getController('Report').customReport('customforms', 'meta', 5, fid, this.getWindowForm4());

    },



});
