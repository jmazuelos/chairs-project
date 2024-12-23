import { ModelOption } from ".";
import { WheelModelType } from "../../enums";

export interface WheelModelOption extends ModelOption {
  model: WheelModelType; 
}