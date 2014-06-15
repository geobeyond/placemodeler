Ext.define('PM.controller.PanelFase2', {

    extend: 'Ext.app.Controller',

    views:['PanelFase2'],

    refs:[{
      ref: 'button',
      selector: 'panelFase2 > button'
    },{
        ref: 'panelfase2',
	selector: 'panelFase2'
    },{
      ref: 'radiogroupFase2',
      selector: 'panelFase2 > radiogroup'
    }],
    
    init: function(){
        this.control({
            'panelFase2 > radiogroup':{
	      afterrender: this.onAfterRenderRadioGroupFase2,
              change: this.onRadioChange
            },
	    'panelFase2 > button':{
              click: this.onBtnClick
            }
        });
    },

    onAfterRenderRadioGroupFase2: function(){
      var that=this;
      PM.app.getController('Report').getUshahidiApi('customforms', 'all', '', function(err, res){
	if (err.code!=='0')
	{
	  console.log('Ushahidi api error: '+ err.message);
	  return;
	}
	else
	{
	  var radiogroup=that.getRadiogroupFase2();
	      for (var i=0; i < res.customforms.length; i++)
	      {
		var elem={ 
		  boxLabel: res.customforms[i].title,
		  name: 'radioFase2', 
		  inputValue: res.customforms[i].id,
		  //tooltip: res.customforms[i].description
		};
	      radiogroup.add(elem);	  
		
	      }
	}	
      });
    },
    
    onRadioChange: function(o, v){
      //var value=value.radioFase2;
        this.getButton().setDisabled(false);
    },
    
    onBtnClick: function(){
      //var title=this.getRadiogroupFase2();
      //this.getPanelfase2().openReportWindow(title);
    }

});
