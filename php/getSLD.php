<?php

if (isset($_GET['sld']))
	{
	$sldPath='file:/var/lib/opengeo/geoserver/styles/icone/';	

		if (file_exists($_GET['sld'])){

			$str=file_get_contents($_GET['sld']);
			
			$str=str_replace('xlink:href="'.$sldPath, 'href="icone/', $str);

			$xml=new SimpleXMLElement($str);
			header('Content-Type: text/xml');
			echo $xml->asXML();
		}
	}
?>
