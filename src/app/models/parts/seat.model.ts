import { FoamMaterialOption } from "../options";
import { Upholstery } from "./upholstery.model";

export interface Seat {
  foam: FoamMaterialOption;
  upholstery: Upholstery;
}
