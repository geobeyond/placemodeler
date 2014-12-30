<?xml version="1.0" encoding="UTF-8"?>
<sld:StyledLayerDescriptor version="1.0.0" xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:sld="http://www.opengis.net/sld" >
	<sld:NamedLayer>
		<sld:Name>simboli_fase8</sld:Name>
		<sld:UserStyle>
			<sld:Name>simboli_fase8</sld:Name>
			<sld:Title>simboli fase 8</sld:Title>
			<sld:Abstract>prova simboli fase 8</sld:Abstract>
			<sld:FeatureTypeStyle>
				<sld:Name>simboli_fase8</sld:Name>
				<sld:Rule>
					<sld:Name>3Piccolo</sld:Name>
					<sld:Title>Rinforzare la continuità dell'asse</sld:Title>
					<sld:Abstract>3Rinforzare la continuità dell'asse</sld:Abstract>
					<ogc:Filter>
						<ogc:PropertyIsBetween>
							<ogc:PropertyName>symbol_size</ogc:PropertyName>
							<ogc:LowerBoundary>
								<ogc:Literal>1</ogc:Literal>
							</ogc:LowerBoundary>
							<ogc:UpperBoundary>
								<ogc:Literal>2</ogc:Literal>
							</ogc:UpperBoundary>
						</ogc:PropertyIsBetween>
					</ogc:Filter>
					<sld:PointSymbolizer>
						<sld:Graphic>
							<sld:ExternalGraphic>
								<sld:OnlineResource xlink:href="http://89.31.77.165/divater/icons/simboli_fase8/piccolo/fase_8_simbolo_1p.png" xlink:type="simple" xmlns:xlink="http://www.w3.org/1999/xlink"/>
								<sld:Format>image/png</sld:Format>
							</sld:ExternalGraphic>
							<sld:Size>5</sld:Size>
						</sld:Graphic>
					</sld:PointSymbolizer>
				</sld:Rule>
				<sld:Rule>
					<sld:Name>3Medio</sld:Name>
					<sld:Title>3Rinforzare la continuità dell'asse</sld:Title>
					<sld:Abstract>Rinforzare la continuità dell'asse</sld:Abstract>
					<ogc:Filter>
						<ogc:PropertyIsEqualTo>
							<ogc:PropertyName>symbol_size</ogc:PropertyName>
							<ogc:Literal>3</ogc:Literal>
						</ogc:PropertyIsEqualTo>
					</ogc:Filter>
					<sld:PointSymbolizer>
						<sld:Graphic>
							<sld:ExternalGraphic>
								<sld:OnlineResource xlink:href="http://89.31.77.165/divater/icons/simboli_fase8/medio/fase_8_simbolo_1m.png" xlink:type="simple" xmlns:xlink="http://www.w3.org/1999/xlink"/>
								<sld:Format>image/png</sld:Format>
							</sld:ExternalGraphic>
							<sld:Size>10</sld:Size>
						</sld:Graphic>
					</sld:PointSymbolizer>
				</sld:Rule>
				<sld:Rule>
					<sld:Name>3Grande</sld:Name>
					<sld:Title>3Rinforzare la continuità dell'asse</sld:Title>
					<sld:Abstract>Rinforzare la continuità dell'asse</sld:Abstract>
					<ogc:Filter>
						<ogc:PropertyIsBetween>
							<ogc:PropertyName>symbol_size</ogc:PropertyName>
							<ogc:LowerBoundary>
								<ogc:Literal>4</ogc:Literal>
							</ogc:LowerBoundary>
							<ogc:UpperBoundary>
								<ogc:Literal>5</ogc:Literal>
							</ogc:UpperBoundary>
						</ogc:PropertyIsBetween>
					</ogc:Filter>
					<sld:PointSymbolizer>
						<sld:Graphic>
							<sld:ExternalGraphic>
								<sld:OnlineResource xlink:href="http://89.31.77.165/divater/icons/simboli_fase8/grande/fase_8_simbolo_1g.png" xlink:type="simple" xmlns:xlink="http://www.w3.org/1999/xlink"/>
								<sld:Format>image/png</sld:Format>
							</sld:ExternalGraphic>
							<sld:Size>10</sld:Size>
						</sld:Graphic>
					</sld:PointSymbolizer>
				</sld:Rule>
			</sld:FeatureTypeStyle>
		</sld:UserStyle>
	</sld:NamedLayer>
</sld:StyledLayerDescriptor>