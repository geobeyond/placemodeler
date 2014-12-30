OpenLayers.Util.QuickHull = (function() {
    var buildConvexHull = function (baseLine, points, allBaseLines) {
            var convexHullBaseLines = [],
                maxDistance = 0,
                maxPoint = [],
                newPoints = [],
                point, distance, i, vY, vX;
            for (i = 0; i < points.length; i++) {
                point = points[i];
                vY = baseLine[1][0] - baseLine[0][0];
                vX = baseLine[0][1] - baseLine[1][1];
                distance = vX * (point[0] - baseLine[0][0]) + vY * (point[1] -baseLine[0][1]);
                if (distance > 0) {
                    newPoints.push(point);
                } else {
                    continue;
                }
                if (distance > maxDistance) {
                    maxDistance = distance;
                    maxPoint = point;
                }
            }
            allBaseLines.push(baseLine);
            if (maxPoint.length) {
                convexHullBaseLines = convexHullBaseLines.concat(
                    buildConvexHull([baseLine[0],maxPoint], newPoints, allBaseLines)
                );
                convexHullBaseLines = convexHullBaseLines.concat(
                    buildConvexHull([maxPoint,baseLine[1]], newPoints, allBaseLines)
                );
                return convexHullBaseLines;
            } else {
                return [baseLine];
            }
        };
    return function (features) {
        var points = [],
            allBaseLines = [],
            hullPoints = [],
            olPoints = [],
            distinctPoints = [],
            point, maxX, minX, maxPoint, minPoint, convexHull, i;
 
        for (i = 0; i < features.length; i++) {
            //point = features[i].geometry.getCentroid();
            //points.push([point.x, point.y]);
	    var vertices = features[i].geometry.getVertices();
	    for (var w=0; w<vertices.length; w++){
	      points.push([vertices[w].x, vertices[w].y]);
	    }

        }
 
        for (i = 0; i < points.length; i++) {
            point = points[i];
            if (point[0] > maxX || !maxX) {
                maxPoint = point;
                maxX = point[0];
            }
            if (point[0] < minX || !minX) {
                minPoint = point;
                minX = point[0];
            }
        }
 
        convexHull = [].concat(
            buildConvexHull([minPoint, maxPoint], points, allBaseLines),
            buildConvexHull([maxPoint, minPoint], points, allBaseLines)
        );
 
        for (i = 0; i < convexHull.length; i++) {
            hullPoints.push(convexHull[i][0]);
            hullPoints.push(convexHull[i][1]);
        }
 
        for (i = 0; i < hullPoints.length; i++) {
            if (distinctPoints.indexOf(hullPoints[i]) === -1) {
                distinctPoints.push(hullPoints[i]);
            }
        }
 
        for (i = 0; i < distinctPoints.length; i++) {
            olPoints.push(new OpenLayers.Geometry.Point(distinctPoints[i][0], distinctPoints[i][1]));
        }
 
        return new OpenLayers.Feature.Vector(
            new OpenLayers.Geometry.Polygon([
                new OpenLayers.Geometry.LinearRing(olPoints)
            ])
        );
    };
})(); 
