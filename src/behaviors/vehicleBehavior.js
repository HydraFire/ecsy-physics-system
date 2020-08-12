import * as CANNON from "cannon-es"
import * as THREE from "three"
import * as ECSY from "ecsy"
import * as ECSYTHREEX from "ecsy-three/extras"

let quaternion = new THREE.Quaternion();
let euler = new THREE.Euler();

import { VehicleBody } from "../components/vehicle-body"

export function vehicleBehavior (entity, arg) {

  if (arg.phase == "onAdded") {

    let object = entity.getObject3D();
    const vehicleComponent = entity.getComponent(VehicleBody)

    let [vehicle, wheelBodies] = createVehicleBody(entity, vehicleComponent.convexMesh )
    object.userData.vehicle = vehicle;
    vehicle.addToWorld(arg.physicsWorld);

    for (var i = 0; i < wheelBodies.length; i++) {
      arg.physicsWorld.addBody(wheelBodies[i])
    }
    //  inputs(vehicle)
    /*
    this._physicsWorld.addEventListener('postStep', function(){
      console.log('test');
              for (var i = 0; i < vehicle.wheelInfos.length; i++) {
                  vehicle.updateWheelTransform(i);
                  var t = vehicle.wheelInfos[i].worldTransform;
                  var wheelBody = wheelBodies[i];

                  wheelBody.position.copy(t.position);
                  wheelBody.quaternion.copy(t.quaternion);

                  let upAxisWorld = new CANNON.Vec3();
                  vehicle.getVehicleAxisWorld(vehicle.indexUpAxis, upAxisWorld);
              }
          });
    */
    //  console.log('test');

} else if (arg.phase == "onUpdate") {

  //  if (rigidBody.weight === 0.0) continue;
    const transform = entity.getMutableComponent(ECSYTHREEX.Transform)
    const object = entity.getObject3D();
    const vehicle = object.userData.vehicle.chassisBody;

    transform.position.copy(vehicle.position)
    //transform.position.y += 0.6
    quaternion.set(
      vehicle.quaternion.x,
      vehicle.quaternion.y,
      vehicle.quaternion.z,
      vehicle.quaternion.w
    )
    euler.setFromQuaternion(quaternion, 'XYZ')

    transform.rotation.copy(euler)



  } else if (arg.phase == "onAdded") {


  }
}


function createVehicleBody(entity, mesh) {
  const vehicleBody = entity.getComponent(VehicleBody)
  const transform = entity.getComponent(ECSYTHREEX.Transform)
  let chassisBody
  if (mesh) {
    chassisBody = this._createConvexGeometry(entity, mesh)
  } else {
    let chassisShape = new CANNON.Box(new CANNON.Vec3(1, 1.2, 2.8));
    chassisBody = new CANNON.Body({ mass: 150 });
    chassisBody.addShape(chassisShape);
  }
//  let
  chassisBody.position.copy(transform.position)
//  chassisBody.angularVelocity.set(0, 0, 0.5);

  var options = {
     radius: 0.5,
     directionLocal: new CANNON.Vec3(0, -1, 0),
     suspensionStiffness: 30,
     suspensionRestLength: 0.3,
     frictionSlip: 5,
     dampingRelaxation: 2.3,
     dampingCompression: 4.4,
     maxSuspensionForce: 100000,
     rollInfluence:  0.01,
     axleLocal: new CANNON.Vec3(-1, 0, 0),
     chassisConnectionPointLocal: new CANNON.Vec3(),
     maxSuspensionTravel: 0.3,
     customSlidingRotationalSpeed: -30,
     useCustomSlidingRotationalSpeed: true
  };

  // Create the vehicle
  let vehicle = new CANNON.RaycastVehicle({
      chassisBody: chassisBody,
      indexUpAxis: 1,
      indexRightAxis: 0,
      indexForwardAxis: 2
  });


  options.chassisConnectionPointLocal.set(1.4, -0.6, 2.35);
  vehicle.addWheel(options);

  options.chassisConnectionPointLocal.set(-1.4, -0.6, 2.35);
  vehicle.addWheel(options);



  options.chassisConnectionPointLocal.set(-1.4, -0.6, -2.2);
  vehicle.addWheel(options);

  options.chassisConnectionPointLocal.set(1.4, -0.6, -2.2);
  vehicle.addWheel(options);

  var wheelBodies = [];
  for(var i=0; i<vehicle.wheelInfos.length; i++){
     var wheel = vehicle.wheelInfos[i];
     var cylinderShape = new CANNON.Cylinder(1, 1, 0.1, 20);
     var wheelBody = new CANNON.Body({
         mass: 0
     });
     wheelBody.type = CANNON.Body.KINEMATIC;
     wheelBody.collisionFilterGroup = 0; // turn off collisions
     var q = new CANNON.Quaternion();
  //   q.setFromAxisAngle(new CANNON.Vec3(1,0,0), -Math.PI / 2);
     wheelBody.addShape(cylinderShape);
  //   wheelBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0), -Math.PI/2)
     wheelBodies.push(wheelBody);
     //demo.addVisual(wheelBody);
     //world.addBody(wheelBody);
  }

  return [vehicle, wheelBodies]
}
