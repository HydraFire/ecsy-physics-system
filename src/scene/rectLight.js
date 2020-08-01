import * as THREE from '../../node-cloth-physics/index';

import RectAreaLight from '../lib/RectAreaLightUniformsLib';

function createRectLight(options) {
	let rectLight = new THREE.RectAreaLight( options.color, options.intensity, options.w, options.h )
		rectLight.position.set( options.x, options.y, options.z );
		rectLight.lookAt( options.lx, options.ly, options.lz );
	let rectHelper = '';
		if (options.helper) {
			rectHelper = new THREE.RectAreaLightHelper( rectLight, 0xffffff );
			rectHelper.position.set( options.x, options.y, options.z );
			rectHelper.lookAt( options.lx, options.ly, options.lz );
			rectHelper.rotateY( Math.PI );
			return [rectLight, rectHelper];
		}
		return [rectLight];
}
export { createRectLight };
