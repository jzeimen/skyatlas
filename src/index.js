var THREE = require('./threeHack.js');
var Detector = require('./detector.js');
var Stats = require('./stats.js');
var starLayer = require('./starLayer.js');
var _ = require('underscore');



var features = [starLayer];


if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var renderer, scene, camera, stats;


var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

init();
animate();

function init() {

	camera = new THREE.PerspectiveCamera( 45, WIDTH / HEIGHT, 1, 10000 );

	scene = new THREE.Scene();


	_.each(features, function(feature){
		scene.add( feature.geom );
	});

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( WIDTH, HEIGHT );

	var container = document.getElementById( 'container' );
	container.appendChild( renderer.domElement );

	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild( stats.domElement );


	window.addEventListener( 'resize', onWindowResize, false );
	camera.position.set(0,0,0);
  	camera.up = new THREE.Vector3(0,0,1);
  	camera.lookAt(new THREE.Vector3(0,100,0));
  	
}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );

	render();
	stats.update();

}

function render() {
	var time = Date.now() * 0.005;

	window.camera = camera;
	renderer.render( scene, camera );

}