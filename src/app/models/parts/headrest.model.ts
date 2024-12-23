import { ColorOption } from "../options";
import { Upholstery } from "./upholstery.model";

export interface Headrest {
  color: ColorOption;
  upholstery: Upholstery;
}