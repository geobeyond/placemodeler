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
        this.disableButton(true);
    },

    onCloseWindow: function(){
        this.disableButton(false);
    },

    onShowWindow: function(){
	var that=this;
	var reportController=PM.app.getController('Report');
	reportController.getUshahidiApi('customforms', 'meta', '1', function(err, res){
	    if (err.code!=='0')
	    {
                Ext.Msg.alert({
                    title:'Errore!',
                    msg: err.message,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
	    }
	    else
	    {
	        var field=res.customforms.fields[0];
	        var elem={
	            xtype: 'hiddenfield',
	            id: field.id,
	            name:'custom_field['+field.id+']',
	            cls:'fk',
	            value: that.getMappanel().selectedFeature.fid
	        };
	        that.getWindowForm().add(elem);
	    }
	});
    },

    disableButton: function(value){
        this.getButton().setDisabled(value);
    }
});
