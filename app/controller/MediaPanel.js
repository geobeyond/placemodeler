Ext.define('PM.controller.MediaPanel', {

    extend: 'Ext.app.Controller',

    views: ['MediaPanel'],

    refs: [{
        ref: 'grid',
        selector: 'mediapanel grid'
    },{
        ref: 'fileInput',
        selector: 'mediapanel filefield'
    },{
        ref: 'linkField',
        selector: 'mediapanel textfield[id=mediaLinkField]'
    },{
	ref: 'linkButton',
	selector: 'mediapanel button[id=mediaLinkBtn]'
    },{
	ref: 'fileButton',
	selector: 'mediapanel filefield'
    },{
	ref: 'mediaPanel',
	selector: 'mediapanel'
    }],

    init: function(){
        this.control({	  
            'mediapanel filefield':{
                afterrender: this.registerHandlerFileInputEvent,
                change: this.onChange
            },
            'mediapanel button[id=mediaLinkBtn]':{
                click: this.onClickLinkBtn
            }
        });        
    },

    foto: ['jpg', 'jpeg',' bmp', 'png'],

    video: ['flv', 'avi', 'mpg', 'mpeg', 'swf'],  
    
    onClickLinkBtn: function(){
        var field=this.getLinkField();
        if (field.wasValid)
        {
            var link=field.getValue();
            var gridStore=this.getGrid().getStore();
	    this.initializeFormData();
            gridStore.add({name: link, type: 'link'});
            field.setValue('');
            field.wasValid=false;
	    
	    ////TODO: togliere mediaLinks[]!
	    if (PM.app.getController('Main').fase===1)
		this.formData.append('mediaLinks[]', link);
	    else
		this.formData.append('incident_video[]', link);
        }
        else
        {
            Ext.Msg.alert({
                title:'URL non valido!',
                msg: 'Devi inserire un link corretto.',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
        }
    },

    onChange: function(a,b){
        var fileName = b.substring(b.lastIndexOf('\\')+1);
        var gridStore = this.getGrid().getStore();

        var extension = fileName.substring(fileName.lastIndexOf('.')+1).toLowerCase();

        this.type=false;
        if (this.foto.indexOf(extension)!==-1)
            this.type='foto';
        else if (PM.app.getController('Main').fase===1
		 && this.video.indexOf(extension)!==-1)
            this.type='video';

        if (this.type)
        {
            gridStore.add({name: fileName, type: this.type});
        }
        else
        {
            Ext.Msg.alert({
                title:'Formato non valido!',
                msg: 'Il file inserito non ha un formato valido.',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
        }
    },

    initializeFormData: function(){
      if (!this.formData)
	this.formData=new FormData();
    },
    
    clearGridStore: function(){
      this.getGrid().getStore().removeAll();
      this.formData=false;
    },


    registerHandlerFileInputEvent: function() {

        var that=this;
	that.initializeFormData();
        document.querySelector('input[type="file"]').addEventListener('change',
                                                                      function(event)
                                                                      {								
                                                                          if (that.type==='foto')
                                                                              that.formData.append('incident_photo[]',event.target.files[0]);
									  if (that.type==='video')
                                                                              that.formData.append('incident_video[]',event.target.files[0]);
                                                                      },
                                                                      false);
    }
});
