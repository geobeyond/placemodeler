Ext.define('PM.Config', {

    singleton : true,

    config : {
        urls : {
/*
            proxy: 'proxy.php?url=',
            proxyHostWfs: 'wfsProxy.php?url=',
            proxyHostWms: 'wmsProxy.php?url=',
            proxyNative: 'proxy.php?mode=native&url=',
*/

            getCapabilities:'http://89.31.77.165//geoserver/ows?service=wms&request=GetCapabilities',
            ushahidiURL: 'http://89.31.77.165/ushahidi-v2/api',

            serverWms:'http://89.31.77.165/geoserver/divater/wms',
//            serverWfs:'http://89.31.77.165/geoserver/divater/wfs',
//	    describeWfs: 'http://89.31.77.165/geoserver/wfs/DescribeFeatureType?version=1.1.0&typename='
            serverWfs:'http://89.31.77.165/divater/pm4/pm/wfsProxy.php?url=http://localhost:8080/geoserver/divater/wfs',


        }
    }

});
