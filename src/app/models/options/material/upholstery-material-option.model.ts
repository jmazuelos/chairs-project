import { MaterialOption } from ".";
import { UpholsteryMaterialType } from "../../enums";

export interface UpholsteryMaterialOption extends MaterialOption {
  type: UpholsteryMaterialType;
}