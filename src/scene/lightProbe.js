import * as THREE from "three"
import {LightProbeGenerator} from '../lib/LightProbeGenerator';

function genCubeUrls( prefix, postfix ) {
	return [
		prefix + 'px' + postfix, prefix + 'nx' + postfix,
		prefix + 'py' + postfix, prefix + 'ny' + postfix,
		prefix + 'pz' + postfix, prefix + 'nz' + postfix
	];
};

function createLightProbe(name, postfix) {
  return new Promise((res, rej) => {
    let lightProbe = new THREE.LightProbe();
    new THREE.CubeTextureLoader().load( genCubeUrls( 'src/models/cubeTexture/'+name+'/', postfix ), cubeTexture => {
    cubeTexture.encoding = THREE.sRGBEncoding;
    lightProbe.copy( LightProbeGenerator.fromCubeTexture( cubeTexture ) );
    res(lightProbe);
    })
  })
}
export { createLightProbe };
