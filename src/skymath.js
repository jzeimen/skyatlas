var radian = function (degrees){
  return degrees * Math.PI / 180;
}

var decToRad = function (degrees){
  return radian(degrees < 0 ? 90-degrees : degrees - 90);
}

var raToRad = function(ra){
  return radian(15.0*ra);
}

function createPosition(ra,dec) {
  var radius = 700,
      theta = raToRad(ra),
      phi = decToRad(dec);

  return {
    x: radius * Math.cos(theta) * Math.sin(phi),
    y: radius * Math.sin(theta) * Math.sin(phi),
    z: radius * Math.cos(phi)
  };
}



module.exports = {
	radian: radian,
	decToRad: decToRad,
	raToRad: raToRad,
	createPosition: createPosition	
};