import * as THREE from '../../node-cloth-physics/index';

window.clothSimulatorApp.directLights = [];

function createLightDirect( options ) {
  !options.color ? options.color = 0xdfebff:'';
  !options.intensity ? options.intensity = 1:'';


  const lightDirect = new THREE.DirectionalLight( options.color, options.intensity );
  options.position ? lightDirect.position.set( options.position.x, options.position.y, options.position.z ):'';

  lightDirect.position.multiplyScalar( 1.3 );
  lightDirect.castShadow = true;
  // lightDirect.shadowCameraVisible = true;
  lightDirect.shadow.mapSize.width = 2048; //2048
  lightDirect.shadow.mapSize.height = 2048;

  lightDirect.shadow.camera.left = -options.shadowSize/3;
  lightDirect.shadow.camera.right = options.shadowSize/3;
  lightDirect.shadow.camera.top = options.shadowSize;
  lightDirect.shadow.camera.bottom = -70*0.004;
  lightDirect.shadow.camera.far = options.shadowFar;
  window.clothSimulatorApp.directLights.push(lightDirect)
  // Model specific Shadow parameters
	//lightDirect.shadow.bias = -0.001;
  lightDirect.shadow.bias = -0.0025;


  let lightHelper, lightShodowHelper;

  if (options.helper) {
    lightHelper = new THREE.DirectionalLightHelper( lightDirect, 5 );
    lightShodowHelper = new THREE.CameraHelper( lightDirect.shadow.camera )
    return [ lightDirect, lightHelper, lightShodowHelper ];
  }

  return [ lightDirect ];
}

function createLightAmbiant( color ) {
  return new THREE.AmbientLight( color );
}





export { createLightAmbiant , createLightDirect };
