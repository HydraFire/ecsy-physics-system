import * as THREE from "three"
import * as ECSY from "ecsy"
import * as ECSYTHREEX from "ecsy-three/extras"

import { CarDoor } from "../components/car-door"

export class RaycastButton extends ECSY.Component {}

RaycastButton.schema = {
  camera: { type: ECSY.Types.Number, default: 0 },
  raycaster: { type: ECSY.Types.Number, default: 0 },
  scene: { type: ECSY.Types.Number, default: 0 },
  mesh: { type: ECSY.Types.Number, default: 0 },
  vehicle : { type: ECSY.Types.Number, default: 0 }
}




export class RaycastButtonSystem extends ECSY.System {

  init() {}



  execute(dt, t) {
    for (let entity of this.queries.raycastButton.added) {

      const camera = entity.getComponent(RaycastButton).camera
      const raycaster = entity.getComponent(RaycastButton).raycaster
      const scene = entity.getComponent(RaycastButton).scene
      const mesh = entity.getComponent(RaycastButton).mesh
      const vehicle = entity.getComponent(RaycastButton).vehicle


      function mouseDown(event) {
        let mouse = new THREE.Vector2();
        //console.log(event.clientY);
        mouse.x = ( (window.innerWidth / 2) / window.innerWidth) * 2 - 1;
        mouse.y = -( ( window.innerHeight/2) / window.innerHeight) * 2 + 1;
      //  mouse.y = -(window.innerHeight / 2) ;


    //var mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    //  console.log(mouse);
        raycaster.setFromCamera(mouse, camera);

        let intersects = raycaster.intersectObject( mesh, raycaster );

        if (intersects.length > 0) {
          console.log(intersects);
          console.log(intersects[0].object.name);
          intersects[ 0 ].object.material.color.set( 0xff0000 )
          entity.addComponent(CarDoor, { camera: camera, vehicle: vehicle })
        }

        //dragging = true;
      }

      function mouseMove(event) {
        /*
        if (dragging && dotsSelectMode) {
          setRaycaster(event);
          addPoint(getIndex(), event.which);

          if (rawMode && arraySelectedDots.length == 2) {
            addPoint(getIndex(1), event.which);
          }

        }
        */
      }

      function mouseUp(event) {
      //  dragging = false;
      }

      document.removeEventListener("mousedown", mouseDown, false);
      document.addEventListener("mousedown", mouseDown, false);
      document.removeEventListener("mousemove", mouseMove, false);
      document.addEventListener("mousemove", mouseMove, false);
      document.removeEventListener("mouseup", mouseUp, false);
      document.addEventListener("mouseup", mouseUp, false);
    }

  }



}


RaycastButtonSystem.queries = {
  raycastButton: {
    components: [RaycastButton],
    listen: {
      added: true
    }
  }
}
