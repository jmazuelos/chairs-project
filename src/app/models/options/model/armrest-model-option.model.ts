import { ModelOption } from ".";
import { ArmrestModelType } from "../../enums";

export interface ArmrestModelOption extends ModelOption {
  model: ArmrestModelType; 
}