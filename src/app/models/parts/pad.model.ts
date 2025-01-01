import { PadModelOption } from "../options";
import { Upholstery } from "./upholstery.model";

export interface Pad {
  model: PadModelOption;
  upholstery: Upholstery;
}
