Ext.define('PM.controller.PanelFaseX', {

    extend: 'Ext.app.Controller',


    views:['PanelFaseX'],

    refs:[/*{
        ref: 'mappanel',
        selector: 'mappanel'
    },{
        ref: 'panelfase3',
        selector: 'panelFase3'
    }*/],
    
    init: function(){
        this.control({
            'panelFaseX':{
                afterrender: this.onAfterRender
            }	    
        });
    },

    
    onAfterRender: function(o, eopts){
        
    }
});
