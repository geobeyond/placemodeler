Ext.define('PM.Config', {

    singleton : true,

    config : {
        urls : {
           /* proxy: 'proxy.php?url=',
            proxyHostWfs: 'wfsProxy.php?url=',
            proxyHostWms: 'wmsProxy.php?url=',
            proxyNative: 'proxy.php?mode=native&url=',*/
            getCapabilities:'http://89.31.77.165//geoserver/ows?service=wms&request=GetCapabilities',
            ushahidiURL: 'http://89.31.77.165/ushahidi-v2/api'


        }
    }

});
