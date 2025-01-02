import { ColorOption, ModelOption } from "../options";

// TODO: change model for material type
export interface Base {
  name: string;
  label: string;
  model: ModelOption;
  color: ColorOption;
}
