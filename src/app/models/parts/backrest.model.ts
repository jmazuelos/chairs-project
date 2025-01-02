import { ColorOption, FoamMaterialOption } from "../options";
import { Upholstery } from "./upholstery.model";

export interface Backrest {
  name: string;
  label: string;
  color: ColorOption;
  foam: FoamMaterialOption;
  upholstery: Upholstery;
}