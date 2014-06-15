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
      ref: 'window',
      selector: 'reportwindow[id=reportFase1] form'
    }],

    init: function(){ this.control({
            'panelFase1 > button': {
              click: this.onBtnClick
            },
	    'reportwindow[id=reportFase1]': {
	      show: this.onShowWindow
	    }
        });
    },

    onBtnClick: function(){
        this.getPanelfase1().openReportWindow();
    },
    
    onShowWindow: function(){
      var hiddenElem=Ext.ComponentQuery.query('#reportFase1 form > hiddenfield[cls=fk]');
      if (hiddenElem.length > 0)
      {
	 hiddenElem[0].value=this.getMappanel().selectedFeature;
      }
      else
      {
	var that=this;
	var reportController=PM.app.getController('Report');
	reportController.getUshahidiApi('customforms', 'meta', '1', function(err, res){
	  if (err.code!=='0')
	  {
	    console.log('Ushahidi api error: '+ err.message);
	    return;
	  }
	  else
	  {
	    var field=res.customforms.fields[0];
	    var elem={
	      xtype: 'hiddenfield',
	      id: field.id,
	      name:'custom_field['+field.id+']',
	      cls:'fk',
	      value: that.getMappanel().selectedFeature
	    };
	    that.getWindow().add(elem);
	  }
	});
      }
    }
});