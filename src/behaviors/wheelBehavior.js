import * as CANNON from "cannon-es"
import * as THREE from "three"
import * as ECSY from "ecsy"
import * as ECSYTHREEX from "ecsy-three/extras"

let quaternion = new THREE.Quaternion();
let euler = new THREE.Euler();

import { WheelBody } from "../components/wheel-body"

export function wheelBehavior (entity, arg) {

  if (arg.phase == "onUpdate") {

  //  console.log(entity);
    const parentEntity = entity.getComponent(WheelBody).vehicle

    let parentObject = parentEntity.getObject3D();
    let vehicle = parentObject.userData.vehicle
    vehicle.updateWheelTransform(arg.i);
  //  console.log(vehicle);


    const transform = entity.getMutableComponent(ECSYTHREEX.Transform)


  transform.position.copy(vehicle.wheelInfos[arg.i].worldTransform.position)

  quaternion.set(
    vehicle.wheelInfos[arg.i].worldTransform.quaternion.x,
    vehicle.wheelInfos[arg.i].worldTransform.quaternion.y,
    vehicle.wheelInfos[arg.i].worldTransform.quaternion.z,
    vehicle.wheelInfos[arg.i].worldTransform.quaternion.w
  )
//  quaternion.slerp( new THREE.Quaternion(), 0.5 );
  euler.setFromQuaternion(quaternion, 'XYZ')
  //let euler2 = new THREE.Euler(euler.x, euler.y/2, euler.z, 'XYZ')
  transform.rotation.copy(euler)
  //console.log(vehicle.wheelInfos[0].chassisConnectionPointWorld);

  }
}
