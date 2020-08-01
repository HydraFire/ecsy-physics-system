# ecsy-physics-system

components:

- PhysicsRigidBody, added physics to elementary figures
```js
  world.createEntity()
    .addObject3DComponent(mesh, scene)

    .addComponent(PhysicsRigidBody, { scale:{ x:1, y:4, z:2 }, mass: 100, type: 'box' })

    .addComponent(ECSYTHREEX.Transform, {
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 }
    })
```
- VehicleBody
```js
  car = world.createEntity()
    .addObject3DComponent(node.clone(), scene)

    .addComponent(VehicleBody)//TO DO { convexMesh: HACD (Hierarchical Approximate Convex Decomposition) })

    .addComponent(ECSYTHREEX.Transform, {
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 }
    })
```
- WheelBody
```js
  world.createEntity()
    .addObject3DComponent(node.clone(), scene)

    .addComponent(WheelBody, { vehicle: car })

    .addComponent(ECSYTHREEX.Transform, {
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 }
    })
```
