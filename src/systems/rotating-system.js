import * as THREE from "three"
import * as ECSY from "ecsy"

const DEG2RAD = THREE.MathUtils.DEG2RAD

export class Rotating extends ECSY.Component {}
Rotating.schema = {
  x: { type: ECSY.Types.Number, default: 0 },
  y: { type: ECSY.Types.Number, default: 0 },
  z: { type: ECSY.Types.Number, default: 0 }
}

export class RotatingSystem extends ECSY.System {
  execute(dt) {
    for (let entity of this.queries.rotating.results) {
      const rotating = entity.getComponent(Rotating)
      /** @type {ECSYTHREEX.Transform} */
      const transform = entity.getMutableComponent(ECSYTHREEX.Transform)
      transform.rotation.x += rotating.x * dt * DEG2RAD
      transform.rotation.y += rotating.y * dt * DEG2RAD
      transform.rotation.z += rotating.z * dt * DEG2RAD
    }
  }
}

RotatingSystem.queries = {
  rotating: {
    components: [Rotating, ECSYTHREEX.Transform]
  }
}
