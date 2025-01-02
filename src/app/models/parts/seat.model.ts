import { FoamMaterialOption } from "../options";
import { Upholstery } from "./upholstery.model";

export interface Seat {
  name: string;
  label: string;
  foam: FoamMaterialOption;
  upholstery: Upholstery;
}
