import * as THREE from "three"
import * as ECSY from "ecsy"
import * as ECSYTHREEX from "ecsy-three/extras"
import * as CANNON from "cannon-es"

import { Collider } from "../components/collider"
import { VehicleBody } from "../components/vehicle-body"
import { WheelBody } from "../components/wheel-body"

import { initBehavior } from "../behaviors/initBehavior"
import { colliderBehavior } from "../behaviors/colliderBehavior"
import { vehicleBehavior } from "../behaviors/vehicleBehavior"
import { wheelBehavior } from "../behaviors/wheelBehavior"

export class PhysicsSystem extends ECSY.System {

  init() {
    this.timeStep = 1/60
    this._physicsWorld = initBehavior()
  }

  execute(delta, t) {

    this._physicsWorld.step(this.timeStep);

  // Collider
    this.queries.сollider.added.forEach(entity => {
      colliderBehavior(entity, { phase: "onAdded", delta, physicsWorld: this._physicsWorld })
    })

    this.queries.сollider.results.forEach(entity => {
      colliderBehavior(entity, { phase: "onUpdate" , delta })
    })

    this.queries.сollider.removed.forEach(entity => {
      colliderBehavior(entity, { phase: "onRemoved", delta, physicsWorld: this._physicsWorld })
    })

  // Vehicle

    this.queries.vehicleBody.added.forEach(entity => {
      vehicleBehavior(entity, { phase: "onAdded", delta, physicsWorld: this._physicsWorld })
    })

    this.queries.vehicleBody.results.forEach(entity => {
      vehicleBehavior(entity, { phase: "onUpdate", delta, physicsWorld: this._physicsWorld })
    })

    this.queries.vehicleBody.removed.forEach(entity => {
      vehicleBehavior(entity, { phase: "onRemoved", delta, physicsWorld: this._physicsWorld })
    })

 // Wheel
    this.queries.wheelBody.added.forEach(entity => {
      wheelBehavior(entity, { phase: "onAdded", delta, physicsWorld: this._physicsWorld })
    })

    this.queries.wheelBody.results.forEach((entity, i) => {
      wheelBehavior(entity, { phase: "onUpdate", i })
    })

    this.queries.wheelBody.removed.forEach(entity => {
      wheelBehavior(entity, { phase: "onRemoved", delta, physicsWorld: this._physicsWorld })
    })



  }
}


PhysicsSystem.queries = {
  сollider: {
    components: [Collider],
    listen: {
      added: true,
      removed: true
    }
  },
  vehicleBody: {
    components: [VehicleBody],
    listen: {
      added: true,
      removed: true
    }
  },
  wheelBody: {
    components: [WheelBody],
    listen: {
      added: true,
      removed: true
    }
  }
}
