Ext.define('PM.view.MapPanel', {

    extend:'GeoExt.panel.Map',

    alias: 'widget.mappanel',

    requires:[
        'GeoExt.tree.Panel',
        'Ext.tree.plugin.TreeViewDragDrop',
        'GeoExt.tree.OverlayLayerContainer',
        'GeoExt.tree.BaseLayerContainer',
        'GeoExt.data.LayerTreeModel',
        'GeoExt.tree.View',
        'GeoExt.tree.Column'],

    border: 'false',
    layout: 'fit',

    saveStrategy: new OpenLayers.Strategy.Save(),

    maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34),


    map: new OpenLayers.Map({
        projection: new OpenLayers.Projection("EPSG:3857"), //or googleProj
        units: "m",
        minZoomLevel: 1,
        maxZoomLevel: 22,
        controls: [new OpenLayers.Control.Navigation()],//, Gis.transformFeature],
        maxExtent: this.maxExtent

    }),


    center: [1391493.634722222,5143020.939952482], //Rome
    zoom: 7,

    layers: [new OpenLayers.Layer.Google("Google Physical",{type: google.maps.MapTypeId.TERRAIN, isBaseLayer: true}),

	     new OpenLayers.Layer.Google("Google Streets", {numZoomLevels: 20, isBaseLayer: true}),

	     new OpenLayers.Layer.Google("Google Hybrid", {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20, isBaseLayer: true}),
	     new OpenLayers.Layer.Google("Google Satellite", {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22, isBaseLayer: true})],




    initComponent: function(){
        var that=this;

	OpenLayers.ProxyHost = PM.Config.getUrls().proxyHostWfs;


	this.selectedFeature=null;

        this.googleProj =  new OpenLayers.Projection("EPSG:900913");
	this.WGS84 = new OpenLayers.Projection("EPSG:4326");
	this.sphericMercator = new OpenLayers.Projection("EPSG:3857");



        //style
	var defStyle = {strokeColor: "blue", strokeOpacity: "0", strokeWidth: 1,fillColor: "blue", fillOpacity: "0", cursor: "pointer"};
	var sty = OpenLayers.Util.applyDefaults(defStyle, OpenLayers.Feature.Vector.style["default"]);
	var sm = new OpenLayers.StyleMap({
	    'default': sty,
	    'select': {strokeColor: "red", fillColor: "red", fillOpacity: "0.7", strokeOpacity: "0.7"}
	});


	//style per highlightLayer
        var styleHighLightLayer = new OpenLayers.Style();
        styleHighLightLayer.addRules([
            new OpenLayers.Rule({
                symbolizer: {
                    "Point": {
	                pointRadius: 4,
	                graphicName: "circle",
	                fillColor: "#FF8C00",
	                fillOpacity: 0.3,
	                strokeWidth: 1,
	                strokeColor: "#FF8C00"
                    },
                    "Line": {
	                strokeWidth: 3,
	                strokeOpacity: 1,
	                strokeColor: "#FF8C00",
	                strokeDashstyle: "dash"
                    },
                    "Polygon": {
	                strokeWidth: 2,
	                strokeColor: "#FF8C00",
	                fillColor: "#FF8C00"
                    }
                }
            })
        ]);

        var styleMapHighLightLayer = new OpenLayers.StyleMap({
            "default": styleHighLightLayer
        });

	//highlightlayer
        this.highlightLayer = new OpenLayers.Layer.Vector("attribHighLight", {
	    isBaseLayer: false,
	    visibility:true,
	    displayInLayerSwitcher:false,
	    styleMap: styleMapHighLightLayer});


        //overlays
        this.wms1= new OpenLayers.Layer.WMS(
            "Analisi anticipatoria", "http://89.31.77.165/geoserver/divater/wms",
            {
                LAYERS: 'divater:pm_phase1',
                STYLES: '',
                format: 'image/png',
                tiled: true,
                transparent: true,
                tilesOrigin : this.maxExtent.left + ',' + this.maxExtent.bottom
            },
            {
                buffer: 0,
                displayOutsideMaxExtent: true,
                isBaseLayer: false,
                yx : {'EPSG:4326' : true}
            });
        this.wms3= new OpenLayers.Layer.WMS(
            "Analisi tradizionale", "http://89.31.77.165/geoserver/divater/wms",
            {
                LAYERS: 'divater:pm_phase3',
                STYLES: '',
                format: 'image/png',
                tiled: true,
                transparent: true,
                tilesOrigin : this.maxExtent.left + ',' + this.maxExtent.bottom
            },
            {
                buffer: 0,
                displayOutsideMaxExtent: true,
                isBaseLayer: false,
                yx : {'EPSG:4326' : true}
            });
        this.vector = new OpenLayers.Layer.Vector("Elementi aggiunti");


	this.wfs1 = new OpenLayers.Layer.Vector("Analisi anticipatoria", {
	    strategies: [new OpenLayers.Strategy.BBOX(), this.saveStrategy],
	    //styleMap: sm,
	    projection: new OpenLayers.Projection("EPSG:4326"),
	    protocol: new OpenLayers.Protocol.WFS({
	        url: "http://89.31.77.165/geoserver/wfs",
	        featureNS :  "http://89.31.77.165/",
	        featureType: "pm_phase1"
	    })
	});

	this.wfs3 = new OpenLayers.Layer.Vector("Analisi tradizionale", {
	    strategies: [new OpenLayers.Strategy.BBOX(), this.saveStrategy],
	    //styleMap: sm,
	    projection: new OpenLayers.Projection("EPSG:4326"),
	    protocol: new OpenLayers.Protocol.WFS({
	        url: "http://89.31.77.165/geoserver/wfs",
	        featureNS :  "http://89.31.77.165/",
	        featureType: "pm_phase3"
	    })
	});

        this.initActions();

        Ext.apply(that, {
            map: that.map,
            layout:'fit',
            extent:that.maxExtent,
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: that.toolbarItems
            }]
        });

	//store
	this.store = Ext.create('Ext.data.TreeStore', {
            model: 'GeoExt.data.LayerTreeModel',
            root: {
                expanded: true,
		text:'rootNode',
                children: [
                    {
                        plugins: ['gx_overlaylayercontainer'],
                        expanded: true,
			text: 'Simboli'
		    },{
                        plugins: ['gx_baselayercontainer'],
                        expanded: true,
                        text: "Mappe di base"
                    }
                ]
            }
        });

	//treepanel
        this.tree = Ext.create('GeoExt.tree.Panel', {
            border: true,
            height: 250,
            autoScroll: true,
	    enableDD: true,
            store: this.store,
            rootVisible: false,
            lines: false,
            tbar: [{
                text: "remove",
		disabled: 'true'
            }, {
                text: "add"
            }]
        });



        that.callParent(arguments);


    },


    removeAllOverlayers: function(){
        var layers=this.map.getLayersBy('isBaseLayer', false);
        for (var i=0; i<layers.length; i++)
	{
	    if (layers[i].name!=='attribHighLight')
	    {
	        this.map.removeLayer(layers[i]);
	    }
	}
    },




    initActions: function(){
        var that=this;

        this.toolbarItems = [];
        var ctrl, action, actions = {};

	this.selectControl=new OpenLayers.Control.SelectFeature(that.wfs1, {
	    clickout: true, toggle: false,
	    multiple: false, hover: false,
	    toggleKey: "ctrlKey",
	    box: false
	});

	this.selectControl3=new OpenLayers.Control.SelectFeature(that.wfs3, {
	    clickout: true, toggle: false,
	    multiple: false, hover: false,
	    toggleKey: "ctrlKey",
	    box: false
	});

	var featureInfoControl2= new OpenLayers.Control.WMSGetFeatureInfo({
            url: 'http://89.31.77.165/geoserver/divater/wms',
            layers: [this.wms1],
	    infoFormat:'application/json',
            queryVisible: true
        });

	featureInfoControl2.events.register("getfeatureinfo", this, function(e){
	    that.clearAllHighlight();
	    var d = Ext.JSON.decode(e.text);
            if(d.features && d.features.length > 0)
	    {
		that.createPolygon(d.features[0].geometry.coordinates);
	    }
	});
	var featureInfoControl4= new OpenLayers.Control.WMSGetFeatureInfo({
            url: 'http://89.31.77.165/geoserver/divater/wms',
            layers: [this.wms1, this.wms3],
	    infoFormat:'application/json',
            queryVisible: true
        });

	featureInfoControl4.events.register("getfeatureinfo", this, function(e){
	    that.clearAllHighlight();
	    var d = Ext.JSON.decode(e.text);
            if(d.features && d.features.length > 0)
	    {
		that.createPolygon(d.features[0].geometry.coordinates);
	    }
	});

	this.map.addControl(this.selectControl);
	this.map.addControl(this.selectControl3);
	this.map.addControl(featureInfoControl4);
	this.map.addControl(featureInfoControl2);

	this.actionSelect1 = Ext.create('GeoExt.Action', {
	    text: "<i class=\"fa fa-magic\"></i> seleziona",
	    control:  this.selectControl,
	    map: that.map,
	    toggleGroup: "draw",
	    enableToggle: false,
	    // group: "draw",
	    id:'btnSelect1',
	    tooltip: "seleziona simbolo"
	});

	this.actionSelect3 = Ext.create('GeoExt.Action', {
	    text: "<i class=\"fa fa-magic\"></i> seleziona",
	    control:  this.selectControl3,
	    map: that.map,
	    toggleGroup: "draw",
	    enableToggle: false,
	    //  group: "draw",
	    id:'btnSelect3',
	    tooltip: "seleziona simbolo"
	});

	this.actionGetfeatureInfo2 = Ext.create('GeoExt.Action', {
	    text: "<i class=\"fa fa-magic\"></i> seleziona",
	    control:  featureInfoControl2,
	    map: that.map,
	    toggleGroup: "draw",
	    enableToggle: false,
	    //  group: "draw",
	    id:'btnGetFeatureInfo2',
	    tooltip: "seleziona simbolo"
	});

	this.actionGetfeatureInfo4 = Ext.create('GeoExt.Action', {
	    text: "<i class=\"fa fa-magic\"></i> seleziona",
	    control:  featureInfoControl4,
	    map: that.map,
	    toggleGroup: "draw",
	    enableToggle: false,
	    //  group: "draw",
	    id:'btnGetFeatureInfo4',
	    tooltip: "seleziona simbolo"
	});

	var actionNav = Ext.create('GeoExt.Action', {
	    text: "<i class=\"fa fa-arrows\"></i> sposta",
	    control: new OpenLayers.Control.Navigation(),
	    map: that.map,
	    toggleGroup: "draw",
	    allowDepress: false,
	    pressed: true,
	    tooltip: "sposta",
	    group: "draw",
	    checked: true
	});

	var actionMaxExtent = Ext.create('GeoExt.Action', {
	    control: new OpenLayers.Control.ZoomToMaxExtent(),
	    map: that.map,
	    text: "<i class=\"fa  fa-arrows-alt \"></i> estendi",
	    tooltip: "massima estensione di zoom"
	});


	this.toolbarItems.push(Ext.create('Ext.button.Button', actionMaxExtent));
	this.toolbarItems.push(Ext.create('Ext.button.Button', actionNav));

	this.btnSelect1=Ext.create('Ext.button.Button', this.actionSelect1);
	this.btnGetFeatureInfo2=Ext.create('Ext.button.Button', this.actionGetfeatureInfo2);
	this.btnSelect3=Ext.create('Ext.button.Button', this.actionSelect3);
	this.btnGetFeatureInfo4=Ext.create('Ext.button.Button', this.actionGetfeatureInfo4);


	var infoBtn=Ext.create('Ext.Button', {
	    text: '<i class="fa fa-info"> </i> Modifica simbolo',
	    id: 'modifyFeatureButton',
	    disabled: true
	});


	//toolbarItems.push(Ext.create('Ext.button.Button', actionDelete));
	this.toolbarItems.push("-");
	ctrl = new OpenLayers.Control.NavigationHistory();
	this.map.addControl(ctrl);
	var actionPrev = Ext.create('GeoExt.Action', {
	    text: "prec",
	    control: ctrl.previous,
	    disabled: true,
	    tooltip: "vista precedente"
	});
	var actionNext = Ext.create('GeoExt.Action', {
	    text: "succ",
	    control: ctrl.next,
	    disabled: true,
	    tooltip: "vista successiva"
	});

	this.toolbarItems.push(Ext.create('Ext.button.Button', actionPrev));
	this.toolbarItems.push(Ext.create('Ext.button.Button', actionNext));

	this.toolbarItems.push("-");


	var actionDrawLine = Ext.create('GeoExt.Action', {
	    text: "<i class=\"fa fa-angle-left \"></i> linea",
	    control: new OpenLayers.Control.DrawFeature(this.vector, OpenLayers.Handler.Path),
	    id: 'fase1-button-line',
	    map: this.map,
	    toggleGroup: "draw",
	    allowDepress: true,
	    tooltip: "draw line",
	    group: "draw"
	});

	var actionDrawPoly = Ext.create('GeoExt.Action', {
	    text: "<i class=\"fa fa-square-o\"></i> poligono",
	    control: new OpenLayers.Control.DrawFeature(this.vector, OpenLayers.Handler.Polygon),
	    id: 'fase1-button-poly',
	    map: this.map,
	    toggleGroup: "draw",
	    allowDepress: true,
	    tooltip: "polygon",
	    group: "draw"
	});

	var actionDrawPoint = Ext.create('GeoExt.Action', {
	    text: "<i class=\"fa fa-map-marker\"></i> punto",
	    control: new OpenLayers.Control.DrawFeature(this.vector, OpenLayers.Handler.Point),
	    id: 'fase1-button-point',
	    map: this.map,
	    toggleGroup: "draw",
	    allowDepress: true,
	    tooltip: "draw point",
	    group: "draw"
	});

	var drawMenu={
	    text: '<i class="fa fa-pencil"></i> Disegna',
	    id: 'drawMenu',
	    menu: {
	        xtype: 'menu',
	        plain: true,
	        items: [
	            Ext.create('Ext.button.Button', actionDrawPoint),
	            Ext.create('Ext.button.Button', actionDrawLine),
	            Ext.create('Ext.button.Button', actionDrawPoly)]
	    }
	};
	this.toolbarItems.push(drawMenu);

	this.toolbarItems.push(infoBtn);
	this.toolbarItems.push("-");

	this.toolbarItems.push(this.btnSelect1);
	this.toolbarItems.push(this.btnGetFeatureInfo2);
	this.toolbarItems.push(this.btnSelect3);
	this.toolbarItems.push(this.btnGetFeatureInfo4);


    },


    clearAllHighlight: function(){
        this.highlightLayer.removeAllFeatures();
    },


    removeHighlightLayer: function(){
        var layers=this.map.getLayersBy('isBaseLayer', false);
        for (var i=0; i<layers.length; i++)
	{
	    if (layers[i].name==='attribHighLight')
	    {
	        this.map.removeLayer(layers[i]);
	    }
	}
    },

    createPolygon: function(coord){ //crea poligono e aggiunge in highlightLayer....
        var points=[];
        for (var i=0; i<coord[0].length;i++) //outer ring (unico)
        {
	    var point=new OpenLayers.Geometry.Point(coord[0][i][0], coord[0][i][1]);
	    point=point.transform(this.WGS84, this.sphericMercator);
	    points.push(point);
        }
        var outerRing=new OpenLayers.Geometry.LinearRing(points);

        var rings=[];
        rings.push(outerRing);

        for (var z=1;z<coord.length;z++)//gli altri sono gli inner rings...
	{
	    var points1=[];
	    for (var y=0;y<coord[z].length;y++)
	    {
	        var point=new OpenLayers.Geometry.Point(coord[z][y][0], coord[z][y][1]);
		point=point.transform(this.WGS84, this.sphericMercator);
	        points1.push(point);
	    }
	    var innerRing=new OpenLayers.Geometry.LinearRing(points1);
	    rings.push(innerRing);
	}
	var polygonFeature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Polygon(rings));
	this.highlightLayer.addFeatures([polygonFeature]);
    },


    saveFeature: function(f){
        if(!this.sWin && typeof sWin==='undefined')
        {
	    this.sWin = Ext.create('PM.view.FeatureWindow', {
	        title: 'Informazioni del simbolo',
	        feature: f
	    });
        }
        this.sWin.show();
    },


    hideWindow: function(){
        if (this.sWin && typeof this.sWin==='object')
	{
	    this.sWin.destroy();
	    this.sWin=null;
	}

    }



});
