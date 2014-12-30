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
    
    saveStrategy1: new OpenLayers.Strategy.Save(),
    saveStrategy3: new OpenLayers.Strategy.Save(),
    saveStrategy6: new OpenLayers.Strategy.Save(),
    saveStrategy8: new OpenLayers.Strategy.Save(),

    maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34),

   // navigationControl: new OpenLayers.Control.Navigation(),	   

    map: new OpenLayers.Map({
        projection: new OpenLayers.Projection("EPSG:900913"),
        displayProjection: new OpenLayers.Projection("EPSG:3857"),
        units: "m",
        minZoomLevel: 1,
        maxZoomLevel: 22,
        controls: [
			new OpenLayers.Control.Navigation(),
			new OpenLayers.Control.Zoom(),
			    //new OpenLayers.Control.Zoom(),  
			    //new OpenLayers.Control.Panel(),
			    //new OpenLayers.Control.ZoomToMaxExtent(),
			    new OpenLayers.Control.ScaleLine({
			        bottomOutUnits: '',
				geodesic: true
			    })
		  ],
        maxExtent: this.maxExtent
    }),


    center: [1391493.634722222,5143020.939952482], //Rome
    zoom: 7,

    layers: [
	     new OpenLayers.Layer.Google("Google Physical",{type: google.maps.MapTypeId.TERRAIN, isBaseLayer: true}),
	     new OpenLayers.Layer.Google("Google Streets", {numZoomLevels: 20, isBaseLayer: true}),
	     new OpenLayers.Layer.Google("Google Hybrid", {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20, isBaseLayer: true}),
	     new OpenLayers.Layer.Google("Google Satellite", {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22, isBaseLayer: true}),
	     new OpenLayers.Layer.OSM(),	     
	     new OpenLayers.Layer("Vuoto", {isBaseLayer: true})
	    ],

   featureWindowOpen: false,




    initComponent: function(){
        var that=this;
	
/*
var panel = new OpenLayers.Control.Panel({});
panel.addControls([
   new OpenLayers.Control.Zoom(),  
 
]);
this.map.addControl(panel);
*/
        


	this.selectedFeature=null;

        this.googleProj =  new OpenLayers.Projection("EPSG:900913");
	this.WGS84 = new OpenLayers.Projection("EPSG:4326");
	this.sphericMercator = new OpenLayers.Projection("EPSG:3857");






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

	this.wpsLayer = new OpenLayers.Layer.Vector("wpsLayer", {
	    isBaseLayer: false,
	    visibility:true,
	    displayInLayerSwitcher:false});
	
	

  //overlays
        this.wms1= new OpenLayers.Layer.WMS(
            "Analisi anticipatoria", PM.Config.getUrls().serverGeo + PM.Config.getUrls().geoserver+'/wms',
            {
                LAYERS: PM.Config.getWfsParams().featurePrefix+':'+PM.Config.getWfsParams().featureTypeLayer1,
                STYLES: 'pm_phase2',
                format: 'image/png',
                tiled: false,
                transparent: true,
                tilesOrigin : this.maxExtent.left + ',' + this.maxExtent.bottom,
		//sld: 'pm_phase2'
		//sld_body: PM.Config.getUrls().sld+'../pm_phase2.sld'
            },
            {
                buffer: 0,
                displayOutsideMaxExtent: true,
                isBaseLayer: false,
                yx : {'EPSG:4326' : true},
            });
	
        this.wms3= new OpenLayers.Layer.WMS(
            "Analisi tradizionale", PM.Config.getUrls().serverGeo + PM.Config.getUrls().geoserver+'/wms',
            {
                LAYERS: PM.Config.getWfsParams().featurePrefix+':'+PM.Config.getWfsParams().featureTypeLayer3,
                STYLES: '',
                format: 'image/png',
                tiled: false,
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

      //  this.refresh1=new OpenLayers.Strategy.Refresh({force:true});

	this.wfs1 = new OpenLayers.Layer.Vector("Analisi anticipatoria", {
	    strategies: [new OpenLayers.Strategy.BBOX(), this.saveStrategy1/*, this.refresh1*/],
	    //styleMap: sm,
	    projection: new OpenLayers.Projection(PM.Config.getWfsParams().srsName),
	    protocol: new OpenLayers.Protocol.WFS({
	      proxy: OpenLayers.ProxyHost,
	        url: 'http://localhost' + PM.Config.getUrls().geoserver+'/wfs',
	        featureNS :   PM.Config.getWfsParams().featureNS,
	        featureType: PM.Config.getWfsParams().featureTypeLayer1,
                version: PM.Config.getWfsParams().version,
                schema: PM.Config.getUrls().describeWfs+PM.Config.getWfsParams().featurePrefix+':'+PM.Config.getWfsParams().featureTypeLayer1
	    })
	});

	this.wfs3 = new OpenLayers.Layer.Vector("Analisi tradizionale", {
	    strategies: [new OpenLayers.Strategy.BBOX(), this.saveStrategy3],
	    //styleMap: sm,
	    projection: new OpenLayers.Projection(PM.Config.getWfsParams().srsName),
	    protocol: new OpenLayers.Protocol.WFS({
	        url: 'http://localhost' + PM.Config.getUrls().geoserver+'/wfs',
	        featureNS :  PM.Config.getWfsParams().featureNS,
	        featureType: PM.Config.getWfsParams().featureTypeLayer3,
                version: PM.Config.getWfsParams().version,
                schema: PM.Config.getUrls().describeWfs+PM.Config.getWfsParams().featurePrefix+':'+PM.Config.getWfsParams().featureTypeLayer3
	    })
	});
	
	this.wfs6 = new OpenLayers.Layer.Vector("Analisi di progetto", {
            strategies: [new OpenLayers.Strategy.BBOX(), this.saveStrategy6],
            //styleMap: sm,
            projection: new OpenLayers.Projection(PM.Config.getWfsParams().srsName),
            protocol: new OpenLayers.Protocol.WFS({
                url: 'http://localhost' + PM.Config.getUrls().geoserver+'/wfs',
                featureNS :  PM.Config.getWfsParams().featureNS,
                featureType: PM.Config.getWfsParams().featureTypeLayer6,
                version: PM.Config.getWfsParams().version,
                schema: PM.Config.getUrls().describeWfs+PM.Config.getWfsParams().featurePrefix+':'+PM.Config.getWfsParams().featureTypeLayer6
            })
        });


	this.wfs8 = new OpenLayers.Layer.Vector("Analisi fase 8", {
	    strategies: [new OpenLayers.Strategy.BBOX(), this.saveStrategy8],
	    //styleMap: sm,
	    projection: new OpenLayers.Projection(PM.Config.getWfsParams().srsName),
	    protocol: new OpenLayers.Protocol.WFS({
	        url: 'http://localhost' + PM.Config.getUrls().geoserver+'/wfs',
	        featureNS :  PM.Config.getWfsParams().featureNS,
	        featureType: PM.Config.getWfsParams().featureTypeLayer8,
                version: PM.Config.getWfsParams().version,
                schema: PM.Config.getUrls().describeWfs+PM.Config.getWfsParams().featurePrefix+':'+PM.Config.getWfsParams().featureTypeLayer8
	    })
	});

	// //TODO: prova wps client 
	// this.wpsClient = new OpenLayers.WPSClient({
        //     servers: {
	// 	opengeo: PM.Config.getUrls().wpsClient
        //     }
	// });
	
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
                        expanded: false,
                        text: "Mappe di base"
                    }
                ]
            }
        });

	//treepanel
        this.tree = Ext.create('GeoExt.tree.Panel', {
            border: true,
            maxHeight: 280,
            autoScroll: true,
	    enableDD: true,
            store: this.store,
            rootVisible: false,
            lines: false,
            tbar: [{
                text: "rimuovi",
		disabled: 'true'
            }, {
                text: "aggiungi"
            }]
        });



        that.callParent(arguments);


    },


    removeAllOverlayers: function(){
        var layers=this.map.getLayersBy('isBaseLayer', false);
        for (var i=0; i<layers.length; i++)
	{
	  //  if (layers[i].name!=='attribHighLight')
	  //  {
	        this.map.removeLayer(layers[i]);
	  //  }
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
	this.selectControl6=new OpenLayers.Control.SelectFeature(that.wfs6, {
	    clickout: true, toggle: false,
	    multiple: false, hover: false,
	    toggleKey: "ctrlKey",
	    box: false
	});	

	this.selectControl8=new OpenLayers.Control.SelectFeature(that.wfs8, {
	    clickout: true, toggle: false,
	    multiple: false, hover: false,
	    toggleKey: "ctrlKey",
	    box: false
	});

        this.featureInfoControl2= new OpenLayers.Control.WMSGetFeatureInfo({
            url: PM.Config.getUrls().geoserver+'/wms',
            layers: [this.wms1],
	    infoFormat:'application/json',
            queryVisible: true
        });


	this.featureInfoControl4= new OpenLayers.Control.WMSGetFeatureInfo({
            url: PM.Config.getUrls().geoserver+'/wms',
            layers: [this.wms1, this.wms3],
	    infoFormat:'application/json',
            queryVisible: true
        });

        //others controls
/*
        this.modifyFeature=new OpenLayers.Control.ModifyFeature(that.wfs1, {
         //   layer: that.wfs1,
            standalone: true

        });
	this.map.addControl(this.modifyFeature);
*/

	this.map.addControl(this.selectControl);
	this.map.addControl(this.selectControl3);
	this.map.addControl(this.selectControl6);
	this.map.addControl(this.selectControl8);
	this.map.addControl(this.featureInfoControl4);
	this.map.addControl(this.featureInfoControl2);
	
	this.selectControl.activate();
	this.selectControl3.activate();
	this.selectControl6.activate();
	this.selectControl8.activate();


	this.actionSelect1 = Ext.create('GeoExt.Action', {
	    text: "<i class=\"fa fa-magic\"></i> Seleziona",
	    control:  this.selectControl,
	    map: that.map,
	    toggleGroup: "draw",
	    enableToggle: false,
	    // group: "draw",
	    id:'btnSelect1',
	    tooltip: "seleziona simbolo"
	});

	this.actionSelect3 = Ext.create('GeoExt.Action', {
	    text: "<i class=\"fa fa-magic\"></i> Seleziona",
	    control:  this.selectControl3,
	    map: that.map,
	    toggleGroup: "draw",
	    enableToggle: false,
	    //  group: "draw",
	    id:'btnSelect3',
	    tooltip: "seleziona simbolo"
	});
	
	this.actionSelect6 = Ext.create('GeoExt.Action', {
	    text: "<i class=\"fa fa-magic\"></i> Seleziona",
	    control:  this.selectControl6,
	    map: that.map,
	    toggleGroup: "draw",
	    enableToggle: false,
	    //  group: "draw",
	    id:'btnSelect6',
	    tooltip: "seleziona simbolo"
	});

	this.actionSelect8 = Ext.create('GeoExt.Action', {
	    text: "<i class=\"fa fa-magic\"></i> Seleziona",
	    control:  this.selectControl8,
	    map: that.map,
	    toggleGroup: "draw",
	    enableToggle: false,
	    //  group: "draw",
	    id:'btnSelect8',
	    tooltip: "seleziona simbolo"
	});

	this.actionGetfeatureInfo2 = Ext.create('GeoExt.Action', {
	    text: "<i class=\"fa fa-magic\"></i> Seleziona",
	    control:  that.featureInfoControl2,
	    map: that.map,
	    toggleGroup: "draw",
	    enableToggle: false,
	    //  group: "draw",
	    id:'btnGetFeatureInfo2',
	    tooltip: "seleziona simbolo"
	});

	this.actionGetfeatureInfo4 = Ext.create('GeoExt.Action', {
	    text: "<i class=\"fa fa-magic\"></i> Seleziona",
	    control:  that.featureInfoControl4,
	    map: that.map,
	    toggleGroup: "draw",
	    enableToggle: false,
	    //  group: "draw",
	    id:'btnGetFeatureInfo4',
	    tooltip: "seleziona simbolo"
	});

// 	var actionNav = Ext.create('GeoExt.Action', {
// 	    text: "<i class=\"fa fa-arrows\"></i> Sposta",
// 	    control: new OpenLayers.Control.Navigation(),
// 	    map: that.map,
// 	    toggleGroup: "draw",
// 	    allowDepress: false,
// 	    enableToggle: true,
// 	    //pressed: true,
// 	    tooltip: "sposta",
// 	  //  group: "draw",
// 	});

// 	var actionMaxExtent = Ext.create('GeoExt.Action', {
// 	    control: new OpenLayers.Control.ZoomToMaxExtent(),
// 	    map: that.map,
// 	    text: "<i class=\"fa  fa-arrows-alt \"></i> Estendi",
// 	    tooltip: "massima estensione di zoom"
// 	});


	//this.toolbarItems.push(Ext.create('Ext.button.Button', actionMaxExtent));
// 	this.toolbarItems.push(Ext.create('Ext.button.Button', actionNav));

	this.btnSelect1=Ext.create('Ext.button.Button', this.actionSelect1);
	this.btnGetFeatureInfo2=Ext.create('Ext.button.Button', this.actionGetfeatureInfo2);
	this.btnSelect3=Ext.create('Ext.button.Button', this.actionSelect3);
	this.btnSelect6=Ext.create('Ext.button.Button', this.actionSelect6);
	this.btnSelect8=Ext.create('Ext.button.Button', this.actionSelect8);
	this.btnGetFeatureInfo4=Ext.create('Ext.button.Button', this.actionGetfeatureInfo4);


// 	var infoBtn=Ext.create('Ext.Button', {
// 	    text: '<i class="fa fa-info"> </i> Modifica simbolo',
// 	    id: 'modifyFeatureButton',
// 	    disabled: true
// 	});


	//toolbarItems.push(Ext.create('Ext.button.Button', actionDelete));
// 	this.toolbarItems.push("-");
// 	ctrl = new OpenLayers.Control.NavigationHistory();
// 	this.map.addControl(ctrl);
// 	var actionPrev = Ext.create('GeoExt.Action', {
// 	    text: "Prec",
// 	    control: ctrl.previous,
// 	    disabled: true,
// 	    tooltip: "vista precedente"
// 	});
// 	var actionNext = Ext.create('GeoExt.Action', {
// 	    text: "Succ",
// 	    control: ctrl.next,
// 	    disabled: true,
// 	    tooltip: "vista successiva"
// 	});

// 	this.toolbarItems.push(Ext.create('Ext.button.Button', actionPrev));
// 	this.toolbarItems.push(Ext.create('Ext.button.Button', actionNext));

// 	this.toolbarItems.push("-");


	var actionDrawLine = Ext.create('GeoExt.Action', {
	    text: "<i class=\"fa fa-angle-left \"></i> linea",
	    control: new OpenLayers.Control.DrawFeature(this.vector, OpenLayers.Handler.Path),
	    id: 'lineBtn',
	    map: this.map,
	    toggleGroup: "draw",
	    allowDepress: true,
	    tooltip: "draw line",
	    group: "draw"
	});

	var actionDrawPoly = Ext.create('GeoExt.Action', {
	    text: "<i class=\"fa fa-square-o\"></i> poligono",
	    control: new OpenLayers.Control.DrawFeature(this.vector, OpenLayers.Handler.Polygon),
	    id: 'polygonBtn',
	    map: this.map,
	    toggleGroup: "draw",
	    allowDepress: true,
	    tooltip: "polygon",
	    group: "draw"
	});

	var actionDrawPoint = Ext.create('GeoExt.Action', {
	    text: "<i class=\"fa fa-map-marker\"></i> punto",
	    control: new OpenLayers.Control.DrawFeature(this.vector, OpenLayers.Handler.Point),
	    id: 'pointBtn',
	    map: this.map,
	    toggleGroup: "draw",
	    allowDepress: true,
	    tooltip: "draw point",
	    group: "draw"
	});

	var drawMenu={
	    text: 'Inserisci',
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

// 	this.toolbarItems.push(infoBtn);
// 	this.toolbarItems.push("-");

	this.toolbarItems.push(this.btnSelect1);
	this.toolbarItems.push(this.btnGetFeatureInfo2);
	this.toolbarItems.push(this.btnSelect3);
	this.toolbarItems.push(this.btnSelect6);
	this.toolbarItems.push(this.btnSelect8);
	this.toolbarItems.push(this.btnGetFeatureInfo4);
    },

    clearAllHighlight: function(){
        this.highlightLayer.removeAllFeatures();
    },
    
    clearAllWpsLayer: function(){
        this.wpsLayer.removeAllFeatures();
    },    

    createHighlightFeature: function(geometry){ //crea poligono e aggiunge in highlightLayer....

        var coord=geometry.coordinates;
        var type=geometry.type;
        var feature;
        if (type==='Point')
        {
            var point=new OpenLayers.Geometry.Point(coord[0], coord[1]);
	    point=point.transform(this.WGS84, this.sphericMercator);
            feature = new OpenLayers.Feature.Vector(point);
        }
        else if (type==='LineString')
        {
            var points=[];
            for (var i=0; i<coord.length; i++)
            {
                var point=new OpenLayers.Geometry.Point(coord[i][0], coord[i][1]);
                point=point.transform(this.WGS84, this.sphericMercator);
                points.push(point);
            }
            feature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString(points));
        }
        else if (type==='Polygon')
        {
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
            feature=new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Polygon(rings));
        }
	this.highlightLayer.addFeatures([feature]);
        this.selectedFeature=feature;
    },


    saveFeature: function(f){
        if (!this.featureWindowOpen)
        {
	    Ext.create('PM.view.FeatureWindow', {
	        title: 'Informazioni del simbolo',
	        feature: f
	    }).show();
            this.featureWindowOpen = true;
        }
    }
});
