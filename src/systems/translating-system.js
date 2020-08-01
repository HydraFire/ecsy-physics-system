

class Translating extends ECSY.Component {}
Translating.schema = {
  x: { type: ECSY.Types.Number, default: 0 },
  y: { type: ECSY.Types.Number, default: 0 },
  z: { type: ECSY.Types.Number, default: 0 }
}

class TranslatingSystem extends ECSY.System {
  execute(dt, t) {
    for (let entity of this.queries.translating.results) {
      const translating = entity.getComponent(Translating)
      /** @type {ECSYTHREEX.Transform} */
      const transform = entity.getMutableComponent(ECSYTHREEX.Transform)
      transform.position.x += translating.x * (dt)
      transform.position.y += translating.y * (dt)
      transform.position.z += translating.z * (dt)
    }
  }
}

TranslatingSystem.queries = {
  translating: {
    components: [Translating, ECSYTHREEX.Transform]
  }
}
