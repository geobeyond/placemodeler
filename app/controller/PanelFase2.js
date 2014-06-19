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
	        show: this.onShowWindow
	    }
        });
    },

    onAfterRenderRadioGroupFase2: function(){
        var that=this;
        PM.app.getController('Report').getUshahidiApi('customforms', 'all', '', function(err, res){
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
	        var radiogroup=that.getRadiogroupFase2();
	        for (var i=0; i < res.customforms.length; i++)
	        {
		    var elem={
		        boxLabel: res.customforms[i].title,
		        name: 'radioFase2',
		        inputValue: res.customforms[i].id
		    };
	            radiogroup.add(elem);

	        }
	    }
        });
    },

    onRadioChange: function(o, v){
        this.getButton().setDisabled(false);
    },


    onBtnClick: function(){
        this.getPanelfase2().openReportWindow();
    },


    onShowWindow: function(window){
	var that=this;
	var windowForm=that.getWindowForm2();
        var radiogroup=this.getRadiogroupFase2();
        var value=radiogroup.getValue().radioFase2;
        var title='';
        for (var i=0; i < radiogroup.items.items.length; i++)
        {
	    if (radiogroup.items.items[i].value===true)
	    {
	        title=radiogroup.items.items[i].boxLabel;
	    }
        }

        window.setTitle(title);

	var reportController=PM.app.getController('Report');
	reportController.getUshahidiApi('customforms', 'meta', value, function(err, res){
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
                var selectedFeature=that.getMappanel().selectedFeature;
                var fid='';
                if (selectedFeature && typeof selectedFeature!=='undefined')
                    fid=selectedFeature.fid;

                var questionItems=[], htmlEditor;
	        for (var i=0; i<res.customforms.fields.length; i++)
	        {
                    var field=res.customforms.fields[i];
                    switch(field.type)
                    {
                    case '1':
                        if (field.name==='layer_fk')
                        {
                            windowForm.add({
                                xtype: 'hiddenfield',
                                value: fid
                            });
                        }
                        else
                        {
                            questionItems.push({
                                xtype: 'textfield',
                                name: field.name,
                                labelWidth:70,
                                width: 180,
                                labelAlign:'left',
                                fieldLabel: field.name
                            });
                        }
                        break;
                    case '2':
                        htmlEditor={
                            xtype: 'htmleditor',
                            fieldLabel: field.name,
                            width: 676,
                            colspan:2,
                            name: field.name
                        };
                        break;
                    case '7':
                        var labelWidth=220;
                        var width=320;
                        if (value===3)
                        {
                            labelWidth=70;
                            width=180;
                        }
                        questionItems.push({xtype: 'combobox',
			                    width: width,
			                    fieldLabel:field.name,
                                            labelWidth: labelWidth,
			                    store: that.parseFields(field.default)[0],
			                    value: that.parseFields(field.default)[1]
			                   });
                        break;
                    default:
                        break;
                    }
                }

                if (typeof htmlEditor!=='undefined')
                {
                    windowForm.add(htmlEditor);
                }

                if (questionItems.length > 0)
                {
                    windowForm.add({
                        xtype: 'container',
                        margin: '10 0 0 0',
                        layout: {
                            type: 'vbox'
                        },
                        items: questionItems
                    });
                }
            }
	});
    },

    parseFields: function (str){
	var val,valori=[];
	val=str.split('::');
	var valPredefinito=val[1];
	valori=val[0].split(',');
	return [valori,valPredefinito];
    }


});
