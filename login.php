<!DOCTYPE html>
<?php
require_once('./php/check.php');
?>
<html>
<head>
    <title>Div@ter pm client - Login</title>

     <!-- ExtJS -->
<!--    <link rel="stylesheet" type="text/css" href="http://cdn.sencha.com/ext/gpl/4.2.1/resources/css/ext-all.css" />
    <script type="text/javascript" charset="utf-8" src="http://cdn.sencha.com/ext/gpl/4.2.1/ext-debug.js"></script>-->

    <script type="text/javascript" src="http://cdn.sencha.com/ext/gpl/4.2.1/examples/shared/include-ext.js"></script> 
 

         <link rel="stylesheet" type="text/css" href="resources/css/all.css"/>    
     <link rel="stylesheet" type="text/css" href="./css/custom.css"/>
</head>
<body>

</body>

<script>
Ext.onReady(function() {
  
  var login=new Ext.form.Panel({ 
        labelWidth:70,
	width:360,
        height:180,
	style: 'margin:0 auto;',
        url:'./php/checkLogin.php', 
        frame:true, 
       // title:'Please Login', 
        defaultType:'textfield',
	monitorValid:true,
	
	layout: 'form',
	// Specific attributes for the text fields for username / password. 
	// The "name" attribute defines the name of variables sent to the server.
	defaults:{
	 allowBlank: false,
	 margin: 10
	},
        items:[{
          xtype: 'container',
          html: 'Div@ter pm client Login',
          style: 'font-weight: bold;'
        },{ 
                fieldLabel:'Username', 
                name:'loginUsername'
            },{ 
                fieldLabel:'Password', 
                name:'loginPassword', 
                inputType:'password'
            }],
 
	// All the magic happens after the user clicks the button     
        buttons:[{ 
                text:'Login',
                formBind: true,	 
                // Function that fires when user clicks the button 
                handler:function(){ 
                    login.getForm().submit({ 
                        method:'POST', 
                        waitTitle:'Connecting', 
                        waitMsg:'Sending data...',
 
			// Functions that fire (success or failure) when the server responds. 
			// The one that executes is determined by the 
			// response that comes from login.asp as seen below. The server would 
			// actually respond with valid JSON, 
			// something like: response.write "{ success: true}" or 
			// response.write "{ success: false, errors: { reason: 'Login failed. Try again.' }}" 
			// depending on the logic contained within your server script.
			// If a success occurs, the user is notified with an alert messagebox, 
			// and when they click "OK", they are redirected to whatever page
			// you define as redirect. 
 
                        success:function(a,b){ 
			  if (b.result.logok==false)
			  {
			        Ext.MessageBox.show({
				  title: 'Errore!',
				  msg: b.result.msg,
				  buttons: Ext.MessageBox.OK,
				  icon: Ext.MessageBox.ERROR
				});
			  }
			  else
			  {
			  console.log(b.result.sid);
			  Ext.util.Cookies.set('gridClientSid',b.result.sid);
                        	Ext.Msg.alert('Status', 'Login Successful!', function(btn, text){
				   if (btn == 'ok'){
				   
				   
				   	
				   	
				   	window.location='index.php';
				   	
				     /*Ext.Ajax.request({
				       url: 'index.php',
				       params:{
					 id: 'b.result.sd',
				      },
				      success: function(){
				      //set cookie
				     // Ext.util.Cookies.set('myCookie','myCookieValue');
					//window.location = 'index.php'
				      }
				    });*/
				     
		                      
		                     // window.location =  'indapp.php?'+b.result.sd;
                                   }
			        });			    
			  }
                        },
 

                        failure:function(form, action){ 
                            if(action.failureType == 'server'){ 
                                obj = Ext.util.JSON.decode(action.response.responseText); 
                                Ext.Msg.alert('Login Failed!', obj.errors.reason); 
                            }else{ 
                                Ext.Msg.alert('Warning!', 'Authentication server is unreachable : ' + action.response.responseText); 
                            } 
                            login.getForm().reset(); 
                        } 
                    }); 
                } 
            }] 
    });
  
  
var main=new Ext.Viewport({  
 renderTo:'container',
 //style:'background-color: #DFE9F6',
  layout: {
      type: 'vbox',
      align : 'stretch',
      pack  : 'start',
  },
  defaults:{xtype:'container'},

  items:[{html:'<div id="headLogo">Div@ter - logo</div>', flex:1},{
    height:300,
    items:[login]
    },{html:'<div id="foot"></div>',flex:1}]
  });
});

</script>
</html>