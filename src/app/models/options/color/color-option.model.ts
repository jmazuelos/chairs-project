import { Option } from "../option.model";

export interface ColorOption extends Option {
  code: string; // Color code (eg: #ffffff)
}