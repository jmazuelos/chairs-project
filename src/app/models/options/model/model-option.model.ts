import { Option } from "../option.model";

export interface ModelOption extends Option {
  model: string; // Type of model (eg: '4d', '5d', 'viscoPad', 'gelPad', 'siliconWheel')
}