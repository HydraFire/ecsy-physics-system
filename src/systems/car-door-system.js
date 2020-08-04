import * as THREE from "three"
import * as ECSY from "ecsy"
import * as ECSYTHREEX from "ecsy-three/extras"


import { CarDoor } from "../components/car-door"

let deltaX
let deltaY
let sensitivity = {x:0.5,y:0.5}
let theta = 0, phi = 0

export class CarDoorSystem extends ECSY.System {

  init() {}



  execute(dt, t) {

    for (let entity of this.queries.carDoor.added) {

      const camera = entity.getComponent(CarDoor).camera
      const scene = entity.getComponent(CarDoor).scene

      const parentEntity = entity.getComponent(CarDoor).vehicle

      let parentObject = parentEntity.getObject3D();
      let vehicle = parentObject.userData.vehicle

      document.onkeydown = handler;
      document.onkeyup = handler;

      var maxSteerVal = 0.5;
      var maxForce = 1000;
      var brakeForce = 1000000;

      function handler(event) {
        //console.log('test');
          var up = (event.type == 'keyup');

          if(!up && event.type !== 'keydown'){
              return;
          }

          vehicle.setBrake(0, 0);
          vehicle.setBrake(0, 1);
          vehicle.setBrake(0, 2);
          vehicle.setBrake(0, 3);
      //    console.log(vehicle);
      //    console.log(camera);
        //  camera.position.set( vehicle.chassisBody.position.x, vehicle.chassisBody.position.y+2, vehicle.chassisBody.position.z );

        //  controls.target.copy(vehicle.chassisBody.position)
      //  console.log(vehicle.chassisBody.position);

    //  console.log(event.keyCode);
          switch(event.keyCode){

          case 87: // forward
              vehicle.applyEngineForce(up ? 0 : -maxForce, 2);
              vehicle.applyEngineForce(up ? 0 : -maxForce, 3);
              break;

          case 83: // backward
              vehicle.applyEngineForce(up ? 0 : maxForce, 2);
              vehicle.applyEngineForce(up ? 0 : maxForce, 3);
              break;

          case 66: // b
              vehicle.setBrake(brakeForce, 0);
              vehicle.setBrake(brakeForce, 1);
              vehicle.setBrake(brakeForce, 2);
              vehicle.setBrake(brakeForce, 3);
              break;

          case 68: // right
              vehicle.setSteeringValue(up ? 0 : -maxSteerVal, 0);
              vehicle.setSteeringValue(up ? 0 : -maxSteerVal, 1);
              break;

          case 65: // left
              vehicle.setSteeringValue(up ? 0 : maxSteerVal, 0);
              vehicle.setSteeringValue(up ? 0 : maxSteerVal, 1);
              break;

          case 27: // exit
              entity.removeComponent(CarDoor)
              window.removeEventListener('mousemove', move)
              break;

          }
      }

      window.addEventListener('mousemove', move)

      function move(deltaX, deltaY){
          deltaX = event.movementX
          deltaY = event.movementY
          theta -= deltaX * (sensitivity.x / 2);
          theta %= 360;
          phi += deltaY * (sensitivity.y / 2);
          phi = Math.min(85, Math.max(-85, phi));
      }

    }
    for (let entity of this.queries.carDoor.results) {
      const camera = entity.getComponent(CarDoor).camera
      const parentEntity = entity.getComponent(CarDoor).vehicle

      let parentObject = parentEntity.getObject3D();
      let vehicle = parentObject.userData.vehicle
/*
      camera.lookAt(vehicle.chassisBody.position.x, vehicle.chassisBody.position.y, vehicle.chassisBody.position.z)
      camera.position.set(vehicle.chassisBody.position.x-3, vehicle.chassisBody.position.y+4, vehicle.chassisBody.position.z-3)
*/
      let radius = 7//THREE.MathUtils.lerp(this.radius, this.targetRadius, 0.1);
    //  console.log(Math.sin(theta * Math.PI / 180) * Math.cos(phi * Math.PI / 180));
      camera.position.x = vehicle.chassisBody.position.x + radius * Math.sin(theta * Math.PI / 180) * Math.cos(phi * Math.PI / 180);
      camera.position.y = vehicle.chassisBody.position.y + radius * Math.sin(phi * Math.PI / 180);
      camera.position.z = vehicle.chassisBody.position.z + radius * Math.cos(theta * Math.PI / 180) * Math.cos(phi * Math.PI / 180);
      camera.updateMatrix();
    //  console.log(camera);
      camera.lookAt(vehicle.chassisBody.position.x, vehicle.chassisBody.position.y, vehicle.chassisBody.position.z);


    }
}



}


CarDoorSystem.queries = {
  carDoor: {
    components: [CarDoor],
    listen: {
      added: true
    }
  }
}
