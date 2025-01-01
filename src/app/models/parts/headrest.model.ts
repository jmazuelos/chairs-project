import { ColorOption, HeadrestModelOption } from "../options";
import { Upholstery } from "./upholstery.model";

export interface Headrest {
  model: HeadrestModelOption;
  color: ColorOption;
  upholstery: Upholstery;
  optionsEnabled?: boolean
}