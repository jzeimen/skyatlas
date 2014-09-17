var THREE = require('./threeHack.js');
var STARS = require('./stardata.js');
var SM = require('./skymath.js');
var _ = require('underscore');
var MAX_MAG = 6;

var geom, uniforms, attributes;


function loadStars(){
	var geometry = new THREE.Geometry();
	
	_.each(STARS, function(star){
	    if(star.mag > MAX_MAG) return;
	    var pos = SM.createPosition(star.ra,star.dec);
		geometry.vertices.push(	new THREE.Vector3( pos.x,  pos.y, pos.z));		
	});
	return geometry;
}


function init(){
	attributes = {

		size: {	type: 'f', value: [] },
		ca:   {	type: 'c', value: [] }

	};
	uniforms = {

		amplitude: { type: "f", value: 1.0 },
		color:     { type: "c", value: new THREE.Color( 0xffffff ) },
		//This texture is a pretty generic circle
		//texture:   { type: "t", value: THREE.ImageUtils.loadTexture( "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sHDgwCEMBJZu0AAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAABM5JREFUWMO1V0tPG2cUPZ4Hxh6DazIOrjFNqJs0FIMqWFgWQkatsmvVbtggKlSVRVf5AWz4AWz4AUSKEChll19QJYSXkECuhFxsHjEhxCYm+DWGMZ5HF72DJq4bAzFXurI0M/I5997v3u9cC65vTJVn2lX/xHINQOYSBLTLEuIuCWw4Z3IGAEvf6ASmVHjNzHCXBG4A0AjACsAOwEbO0nsFQBnAGYASAIl+ZRMR7SolMEdsByD09fV5R0ZGgg8ePPjW5/N1iqLYpuu6RZblciKR2I9Go69evnwZnZ+fjwI4IS8AKBIRzeQfJWCANwKwh0KhtrGxsYehUOin1tbW+zzP23ietzY2NnIAoGmaLsuyUiqVyvl8XtrY2NiamZn589mzZxsAUgCOAeQAnFI2tI+VxIjaAeDzoaGh7xYWFuZOTk6OZVk+12uYqqq6JEnn0Wg0OT4+/geAXwGEAdwDIFJQXC1wO4DWR48e/RCPxxclSSroVzRFUbSDg4P848ePFwH8DuAhkWih83TRQWxFOXgAwvDwcOfo6OhvXV1d39tsNtuVBwTDWBwOh1UUxVsMw1hXVlbSdCgNV43uYSvrHg6H24aHh38eHBz85TrgF9FYLHA4HLzH43FvbW2d7u/vG+dANp8FpqIlbd3d3V8Fg8EfBUFw4BONZVmL3+9vHhkZCQL4AoAHgJPK8G+yzC0XDofdoVAo5PP5vkadTBAEtr+/39ff3x8gAp/RPOEqx2qjx+NpvXv3bk9DQ0NDvQgwDIOWlhZrMBj8kgi0UJdxRgYMArzL5XJ7vd57qLPZ7Xamp6fnNgBXtQxcjFuHw+Hyer3t9SYgCAITCAScAJoBNNEY/08GOFVVrfVMv7kMNDntFD1vjIAPrlRN0xjckOm6biFQ3jwNPwDMZrOnqVTqfb3Bi8Wivru7W/VCYkwPlKOjo0IikXh7EwQikYgE4Nw0CfXKDCipVCoTj8df3QABbW1tLUc6oUgkFPMkVACUNjc337148eKvw8PDbJ2jP1taWkoCyNDVXDSECmNSK4qiKNLq6urW8+fPI/UicHx8rD59+jSVy+WOAKSJhKENwFItLtoxk8mwsixzHR0dHe3t7c5PAU+n09rs7OzJkydPYqVSaQfANoDXALIk31S2smU1TWMPDg7K5XKZ7+3t9TudTut1U7+wsFCcmJiIpdPpbQBxADsAknQWymYCOukBHYCuKApisdhpMpnURFEU79y503TVyKenpzOTk5M7e3t7MQKPV0Zv1gNm+awB0MvlshqLxfLb29uyJElWURSbXC4XXyvqxcXFs6mpqeTc3Nzu3t7e3wQcA7BPZ8Cov1pNlJplmQtAG8MwHV6v95tAINA5MDBwPxAIuLu6upr8fr/VAN3c3JQjkcjZ+vp6fnl5+d2bN29SuVzuNYAEpf01CdRChUL+X1VskHACuA3Ay3Fcu9vt7nA6nZ7m5uYWQRCaNE3jVVW15PP580KhIGUymWw2m00DOAJwSP4WwPtq4LX2Ao6USxNlQyS/RcQcdLGwlNIz6vEMAaZpNzCk2Pll94LK/cDYimxERiBwG10sxjgvEZBE0UpE6vxj+0Ct5bTaXthgEhRmja8QWNkkPGsuIpfdjpkK+cZUWTC0KredVmtD/gdlSl6EG4AMvQAAAABJRU5ErkJggg==" ) },
		//This texture is a rounded brush from photoshop
		texture:   { type: "t", value: THREE.ImageUtils.loadTexture( "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAilBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////2N2iNAAAALnRSTlMAAgEJBgwEEQUXFCIbDyYeMDk1P4ZESWxZdHwqTi2qZVRg946y17zs4aGazsSVYt1eKwAAA3pJREFUSMfd1tt2okAQBdCJzqjIRUARFBCIgoL6/783p6o63STgmORpVs7Kg3nYVPWFpn/9l5lMvi8l+PUN9/KCv5eJ5KvUBP997gEaziTmAchzrOTit2SB35p/goqcqtADFjPFn3U8WyxY/lFRfib6SVlQlu6c47ri34o/LGwo5FKFHgDOxYH/aYUuLctyOPixXDIXPcpBxQp1VrbKauXAz9G8tD6CTV2mtu2laY6kqefZ4Fxc1R5tWlmq6uV+GIZBEISh76fCWcusjQxYWaHBeh1R1usg9FOjGY82LTYFjbZZVlKybQSee7ZjceczpQ0lTNYVG6y3WZlUVVEUVZWU4Epjzj8OWzYWFtids0XZMinieEeJiyrJtqKXc258iKVpx/Zgs7KKd/v9hrIHT0rWK9W41mbE0yk17eXhOkuqGPJ+77rufgQvqnIb+Kk0brDpWhVOw/W2JHvv2gOlBd8VSRYFvpRWiz3oGoWpabbt4dQgp9OhY43GUzVqxsOuuXBS7GBPze2K3BrS+7hCaR61mTKxgrFOjp2HXPjYHppbXV8udX29QaM05kz6Nlg0LHfteHkQlVQYFvR8Pl/qa3NqUTrJqG/aZsDQGveHjK73x+7QXOvz+fX1FRql75sd+taD7mFYgzFk6vqEwrCkUVr6jsLczJjB3Lb7AF80DvqYtVmpL2HYUVwQbq6CecZkzI/a7k8YzTZNGEpTLlirlhdadokLPDbbep031Dc0Utc36hpLRetsW2N4BuzK1s6SmEpDX2vsEdj2iK7Lt82NV3p8e0rftMWgmxuC3dne+c14v7d7p67eYja/kcUOGm8GcoBF0/ROStcDPBGsSkesN8eua9sWL7RYLmzNB+evOTotGjXrmDjCR0mF2aIR68L9yv3zjxqHrmJwhA+xMoPlwu5U76/3pWnUchDxCVgVMVLI+afs6MmtDiJZa9IojsOXwgc3H/uWPjy1NZgbZ536xKMtJYpQNvfEmqYf6hXzMMAXh75Wfp7izCY7mC2FRasPLPPc5+T6MymfaNQdx6wxbua2x7FtpsPP+1Cbi4HjrDiQTGHNB3ZEI/0riSVZgsqlZKYHPMT6e8cc/sN1aMEW+LFGcfE6U+TJRczU7l8ABQrlnh+HNQIOLwF8dns0m0VVh1fhaXqKTXWJICM/h6n80H3jsg/6VSxeux+WvyirdfwGd+vYAAAAAElFTkSuQmCC" )}

	};

	uniforms.texture.value.wrapS = uniforms.texture.value.wrapT = THREE.RepeatWrapping;

	var shaderMaterial = new THREE.ShaderMaterial( {

		uniforms:       uniforms,
		attributes:     attributes,
		vertexShader:   document.getElementById( 'vertexshader' ).textContent,
		fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
		transparent:    true

	});

	var geometry = loadStars();

	var pos = SM.createPosition(2.0,89.99);
	console.log(pos);
	console.log(geometry);

	geometry.vertices.push(new THREE.Vector3(pos.x,pos.y,pos.z));
	geometry.vertices.push(new THREE.Vector3(0.0,100.0,0.0));
	geometry.vertices.push(new THREE.Vector3(100.0,0.0,0.0));
	geometry.vertices.push(new THREE.Vector3(-100.0,0.0,0.0));
	geometry.vertices.push(new THREE.Vector3(0.0,-100.0,0.0));

	console.log(geometry);
	

	geom = new THREE.PointCloud( geometry, shaderMaterial );


	

	geom.dynamic = true;
	geom.sortParticles = true;

	var vertices = geom.geometry.vertices;
	var values_size = attributes.size.value;
	var values_color = attributes.ca.value;

	for ( var v = 0; v < vertices.length-5; v ++ ) {
		values_size[ v ] = (MAX_MAG-STARS[v].mag)*6.5;
		values_color[ v ] = new THREE.Color( 0xffffff );
		// Makes them all cool different colors
		//values_color[ v ].setHSL(  ( (v %69) / 69.0 ), 1, 0.5 );
	}

	values_size[vertices.length-1] = 40;
	values_color[vertices.length-1] = new THREE.Color(0x00FFFF);
	values_size[vertices.length-2] = 40;
	values_color[vertices.length-2] = new THREE.Color(0x00FFFF);
	values_size[vertices.length-3] = 40;
	values_color[vertices.length-3] = new THREE.Color(0x00FFFF);
	values_size[vertices.length-4] = 40;
	values_color[vertices.length-4] = new THREE.Color(0x00FFFF);
	values_size[vertices.length-5] = 40;
	values_color[vertices.length-5] = new THREE.Color(0x00FFFF);
	values_size[vertices.length-6] = 40;
	values_color[vertices.length-6] = new THREE.Color(0x00FFFF);
	//True North

}

init();



module.exports = {geom: geom};