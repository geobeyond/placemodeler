Ext.define('PM.controller.Report', {

    extend: 'Ext.app.Controller', 
    
    refs:[/*{
      ref: 'radiogroupFase2',
      selector: 'panelFase2 > radiogroup'
    }*/],
    
   
    
    init: function(){
      this.control({
	/*'panelFase2 > radiogroup':{
	  afterrender: this.onAfterRenderRadioGroupFase2
	}*/
      });
    },
    

    getUshahidiApi: function(task, by, formid, callback){     
      Ext.Ajax.request({
	url: 'proxy.php?url=http://89.31.77.165/ushahidi-v2/api',
	params: {
	  task: task,
	  by: by,
	  formid: formid
	},
	success: function(response){
	  res=Ext.JSON.decode(response.responseText);
	  callback(res.contents.payload, res.contents.error);
	}
      });
    },
});