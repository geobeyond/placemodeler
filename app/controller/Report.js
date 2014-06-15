Ext.define('PM.controller.Report', {

    extend: 'Ext.app.Controller', 
    
    refs:[],
    
   
    
    init: function(){
      this.control({	
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
	  callback(res.contents.error, res.contents.payload);
	}
      });
    },
    /*
    createCustomForm: function(err, res){
 	if (err.code!=='0')
	{
	  console.log('Ushahidi api error: '+ err.message);
	  return;
	}
	else
	{
	  for (var i=0; i < res.customforms.length; i++)
	  {
	    
	  }
	}
    }*/
});