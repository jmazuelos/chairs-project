import { ModelOption } from ".";
import { HeadrestModelType } from "../../enums";

export interface HeadrestModelOption extends ModelOption {
  model: HeadrestModelType; 
}