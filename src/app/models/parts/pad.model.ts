import { ColorOption, PadModelOption } from "../options";

export interface Pad {
  name: string;
  label: string;
  model: PadModelOption;
  color: ColorOption;
}
