import { ColorOption, WheelModelOption } from "../options";

export interface Wheel {
  name: string;
  label: string;
  model: WheelModelOption;
  color: ColorOption;
}
