import { Component, TagComponent } from "ecsy";
import { Types, ThreeTypes } from "ecsy-three";

export class CarDoor extends Component {}

CarDoor.schema = {
  scene: { type: Types.Number, default: 0 },
  camera: { type: Types.Number, default: 0 },
  vehicle: { type: Types.Number, default: 0 }
}
