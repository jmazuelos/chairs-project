import { MaterialOption } from ".";
import { BaseMaterialType } from "../../enums";

export interface BaseMaterialOption extends MaterialOption {
  type: BaseMaterialType;
}