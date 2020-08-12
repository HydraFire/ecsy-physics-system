import * as THREE from "three"
import * as ECSY from "ecsy"
import * as ECSYTHREEX from "ecsy-three/extras"
import * as CANNON from "cannon-es"

import { Collider } from "../components/collider"


let quaternion = new THREE.Quaternion();
let euler = new THREE.Euler();

export function colliderBehavior (entity, arg) {
  if (arg.phase == "onAdded") {

    const collider = entity.getComponent(Collider)
    let object = entity.getObject3D()
    object ? "" : (object = { userData: { body: {} } })
    let body
    if (collider.type === "box") body = createBox(entity)
    else if (collider.type === "cylinder") body = createCylinder(entity)
    else if (collider.type === "share") body = createShare(entity)
    else if (collider.type === "convex") body = createConvexGeometry(entity, null)
    else if (collider.type === "ground") body = createGroundGeometry(entity)

    object.userData.body = body;
    arg.physicsWorld.addBody(body);


  } else if (arg.phase == "onUpdate") {

    const transform = entity.getMutableComponent(ECSYTHREEX.Transform)
    const object = entity.getObject3D();
    const body = object.userData.body;
    //console.log(body);
    transform.position.copy(body.position)

    quaternion.set(
      body.quaternion.x,
      body.quaternion.y,
      body.quaternion.z,
      body.quaternion.w
    )
    euler.setFromQuaternion(quaternion, 'XYZ')
    transform.rotation.copy(euler)


  } else if (arg.phase == "onRemoved") {

    const object = entity.getObject3D();
    const body = object.userData.body;
    delete object.userData.body
    arg.physicsWorld.removeBody(body);

  }
}


function createBox(entity) {
  const rigidBody = entity.getComponent(Collider)
  const transform = entity.getComponent(ECSYTHREEX.Transform)

  let shape = new CANNON.Box(
     new CANNON.Vec3(
       rigidBody.scale.x / 2,
       rigidBody.scale.y / 2,
       rigidBody.scale.z / 2
     ));

  let body = new CANNON.Body({
    mass: rigidBody.mass,
    position: new CANNON.Vec3(
      transform.position.x,
      transform.position.y,
      transform.position.z)
  });
  var q = new CANNON.Quaternion();
  q.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
  body.addShape(shape);

//  body.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
//  body.angularVelocity.set(0,1,1);
  body.angularDamping = 0.5;

  return body
}

function createGroundGeometry(entity) {
  const rigidBody = entity.getComponent(Collider)
  const transform = entity.getComponent(ECSYTHREEX.Transform)

  let shape = new CANNON.Box(
     new CANNON.Vec3(
       rigidBody.scale.x / 2,
       rigidBody.scale.y / 2,
       rigidBody.scale.z / 2
     ));

  let body = new CANNON.Body({
    mass: rigidBody.mass,
    position: new CANNON.Vec3(
      transform.position.x,
      transform.position.y,
      transform.position.z)
  });
  var q = new CANNON.Quaternion();
  q.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
  body.addShape(shape);

//  body.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
//  body.angularVelocity.set(0,1,1);
  body.angularDamping = 0.5;

  return body
}

function createCylinder(entity) {
  const rigidBody = entity.getComponent(Collider)
  const transform = entity.getComponent(ECSYTHREEX.Transform)

  var cylinderShape = new CANNON.Cylinder(rigidBody.scale.x , rigidBody.scale.y , rigidBody.scale.z , 20);
  var body = new CANNON.Body({
      mass: rigidBody.mass,
      position: new CANNON.Vec3(
        transform.position.x,
        transform.position.y,
        transform.position.z)
  });
  //body.type = CANNON.Body.KINEMATIC;
  //body.collisionFilterGroup = 1; // turn off collisions
  var q = new CANNON.Quaternion();
  q.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
  body.addShape(cylinderShape, new CANNON.Vec3(), q);
  //body.angularVelocity.set(0,0,1);
  return body
}

function createShare(entity) {
  const rigidBody = entity.getComponent(Collider)
  const transform = entity.getComponent(ECSYTHREEX.Transform)

  let shape = new CANNON.Sphere(rigidBody.scale.x / 2)

  let body = new CANNON.Body({
    mass: rigidBody.mass,
    position: new CANNON.Vec3(
      transform.position.x,
      transform.position.y,
      transform.position.z)
  });

  body.addShape(shape);
  return body
}




/*
function createConvexGeometry( entity , mesh){
  let rigidBody, object, transform, attributePosition
  if( mesh ) {

    object = mesh
    attributePosition = mesh.geometry.attributes.position

  } else {
    rigidBody = entity.getComponent(Collider)
    object = entity.getObject3D();
    transform = entity.getComponent(ECSYTHREEX.Transform)
    attributePosition = object.geometry.attributes.position
  }


  var convexBody = new CANNON.Body({
    mass: 50
  });
    let verts = [], faces = [], normals =[]


    // Get vertice
    for(let j = 0; j < attributePosition.array.length; j+=3){
        verts.push(new CANNON.Vec3( attributePosition.array[j] ,
                                    attributePosition.array[j+1],
                                    attributePosition.array[j+2] ));
    }
    console.log(verts);
    // Get faces

    for(var j=0; j<object.geometry.index.array.length; j+=3){
        faces.push([
          object.geometry.index.array[j],
          object.geometry.index.array[j+1],
          object.geometry.index.array[j+2]
        ]);
    }

    for(var j=0; j<attributeNormal.array.length; j+=3){
        normals.push([
          attributeNormal.array[j],
          attributeNormal.array[j+1],
          attributeNormal.array[j+2]
        ]);
    }

console.log(faces);
console.log(normals);
    // Get offset
  //  let offset = new CANNON.Vec3(200,200,200);

    // Construct polyhedron
    var bunnyPart = new CANNON.ConvexPolyhedron({ vertices: verts, faces });
    console.log(bunnyPart);

    var q = new CANNON.Quaternion();
    q.setFromAxisAngle(new CANNON.Vec3(1,1,0), -Math.PI/2);
  //  body.addShape(cylinderShape, new CANNON.Vec3(), q);
    // Add to compound
    convexBody.addShape(bunnyPart, new CANNON.Vec3(), q)//,offset);
    return convexBody
}
*/
