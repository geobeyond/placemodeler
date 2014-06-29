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
    },{
        ref: 'radiogroupFase2',
        selector: 'panelFase2 > radiogroup'
    },{
        ref: 'window',
        selector: 'reportwindow[id=reportFase2]'
    },{
        ref: 'windowForm2',
        selector: 'reportwindow[id=reportFase2] > form > fieldset'
    }],

    init: function(){
        this.control({
            'panelFase2 > radiogroup':{
	        afterrender: this.onAfterRenderRadioGroupFase2,
                change: this.onRadioChange
            },
	    'panelFase2 > button':{
                click: this.onBtnClick
            },
	    'reportwindow[id=reportFase2]': {
	        show: this.onShowWindow,
                close: this.onCloseWindow
	    }
        });
    },

    disableComponents: function(v){
        this.getButton().setDisabled(v);
        this.getRadiogroupFase2().setDisabled(v);
    },

    onAfterRenderRadioGroupFase2: function(){
	PM.app.getController('Report').customReport('customforms', 'all', '',null,null);
    },

    onRadioChange: function(o, v){
        this.getButton().setDisabled(false);
    },


    onBtnClick: function(){
        this.getPanelfase2().openReportWindow();
    },


    onShowWindow: function(window){
        var radiogroup=this.getRadiogroupFase2();
        var formId=radiogroup.getValue().radioFase2;
        var title='';
        for (var i=0; i < radiogroup.items.items.length; i++)
        {
	    if (radiogroup.items.items[i].value===true)
	    {
	        title=radiogroup.items.items[i].boxLabel;
	    }
        }
        window.setTitle(title);
        var fid=this.getMappanel().selectedFeature.fid;
        PM.app.getController('Report').customReport('customforms', 'meta', formId, fid, this.getWindowForm2());

        this.disableComponents(true);
    },

    onCloseWindow:function(){
        this.disableComponents(false);
    }
});
