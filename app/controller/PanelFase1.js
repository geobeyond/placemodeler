Ext.define('PM.controller.PanelFase1', {

    extend: 'Ext.app.Controller',

    views:['PanelFase1'],

    refs:[{
        ref: 'button',
        selector: 'panelFase1 > button'
    }],

    init: function(){ this.control({
            'panelFase1':{
              //  afterrender: this.onBeforeRender
            }
        });
    },

    beforeRender: function(o, eopts){
        alert('bef rend');
    }

});
