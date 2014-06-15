Ext.define('PM.controller.PanelFase4', {

    extend: 'Ext.app.Controller',


    views:['PanelFase4'],

    refs:[{
    	ref: 'button',
        selector: 'panelFase1 > button'
    }],
    
    init: function(){
        this.control({
            'panelFase4':{
                afterrender: this.onAfterRender
            }	    
        });
    },

    
    onAfterRender: function(o, eopts){
        
    }
});
