import { MaterialOption } from ".";
import { FoamMaterialType } from "../../enums";

export interface FoamMaterialOption extends MaterialOption {
  type: FoamMaterialType;
  density?: number; 
}