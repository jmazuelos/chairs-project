import { ColorOption, FoamMaterialOption } from "../options";
import { Upholstery } from "./upholstery.model";

export interface Backrest {
  color: ColorOption;
  foam: FoamMaterialOption;
  upholstery: Upholstery;
}