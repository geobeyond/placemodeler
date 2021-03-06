Ext.define('PM.Config', {

    singleton : true,

    config : {
	urls: {
	    ushahidiURL: 'http://89.31.77.165/ushahidi-v2/api',
	    ushahidiUploads: 'http://89.31.77.165/ushahidi-v2/media/uploads/',
	    
	    getCapabilities: 'http://89.31.77.165/geoserver/ows?service=wms&request=GetCapabilities',
	    sld: 'http://89.31.77.165/divater/pm6/pm/php/getSLD.php?sld=',
	    geoserver: 'http://89.31.77.165/geoserver/divater',

	   
	   // wpsClient: 'http://demo.opengeo.org/geoserver/wps',
	    wpsClient: 'http://89.31.77.165/geoserver/wps',
	    
	    saveFeature: 'php/saveFeature.php',
	    getMedia: 'php/getMedia.php',
	    deleteMedia: 'php/deleteMedia.php',
	   
	    saveProject: 'php/createProject.php',
	    getProjects: 'php/getProjects.php',
	    deleteProject: 'php/deleteProject.php',
	  
	    //proxy: '/cgi-bin/proxy.cgi?url=',
	    proxyHostWfs: '/cgi-bin/proxy.cgi?url='
	    
	},

	wfsParams:{
	    srsName: 'EPSG:4326',
	    featureNS: 'http://89.31.77.165/',
	    featurePrefix: 'divater',
	    geometryName: 'the_geom',
	    version: '1.1.0',
	    
	    featureTypeLayer1: 'pm_phase1',
	    featureTypeLayer2: 'pm_phase2',
	    featureTypeLayer3: 'pm_phase3',
	    featureTypeLayer4: 'pm_phase4',
	    featureTypeLayer5: 'pm_phase5',
	    featureTypeLayer6: 'pm_phase6',
	    featureTypeLayer7: 'pm_phase7',
	    featureTypeLayer8: 'pm_phase8'	    
	},

        image: {
            maxWidth: 900,
            maxHeight: 900
        },
	
	quantity:{
	  np: 0, 
	  lieve: 1,
	  media: 3,
	  notevole: 5    
	},
	
	quality:{
	  np: 0,
	  ininfluente: 1,
	  gradevole: 3,
	  fastidiosa: 5 
	},
	
	wps: {
		values:{
		  min: 3.4,
		  med: 7.9,
		  medMax: 12.4, 
		  max: 16.9 
		},	
		colors:{
		  white: '#FFFFFF',
		  orange: '#FFA858',
		  green: '#00FF00',
		  yellow: '#FFFF00',
		  red: '#FF0000' 	  
		}  
	},
	
	descPhases:{
	  text1: './resources/data/fase1.html',
	  text2: './resources/data/fase2.html',
	  text3: './resources/data/fase3.html',
	  text4: './resources/data/fase4.html',
	  text5: './resources/data/fase5.html',
	  text6: './resources/data/fase6.html',
	  text7: './resources/data/fase7.html',
	  text8: './resources/data/fase8.html'   
	}
    }
});
