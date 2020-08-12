import * as CANNON from "cannon-es"



export function initBehavior (arg) {
//this.frame = 0;
const physicsWorld = new CANNON.World();

physicsWorld.gravity.set(0, -9.8, 0);
//  this._physicsWorld.broadphase = new CANNON.NaiveBroadphase();
physicsWorld.broadphase = new CANNON.SAPBroadphase(physicsWorld);

//  this._physicsWorld.solver.iterations = 10;
const groundMaterial = new CANNON.Material("groundMaterial");
const wheelMaterial = new CANNON.Material("wheelMaterial");
const wheelGroundContactMaterial = window.wheelGroundContactMaterial = new CANNON.ContactMaterial(wheelMaterial, groundMaterial, {
    friction: 0.3,
    restitution: 0,
    contactEquationStiffness: 1000
});
// We must add the contact materials to the world
physicsWorld.addContactMaterial(wheelGroundContactMaterial);

/*
world.broadphase = new CANNON.SAPBroadphase(world);
world.gravity.set(0, 0, -10);
world.defaultContactMaterial.friction = 0;
*/
  return physicsWorld
}
