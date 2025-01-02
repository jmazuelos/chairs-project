import { ArmrestModelOption, ColorOption } from "../options";

export interface Armrest {
  name: string;
  label: string;
  model: ArmrestModelOption;
  color: ColorOption;
  optionsEnabled?: boolean
}