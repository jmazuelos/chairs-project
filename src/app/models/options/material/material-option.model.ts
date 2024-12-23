import { Option } from "../option.model";

export interface MaterialOption extends Option {
  type: string; // Type of material (eg: 'fabric', 'leather', 'steel', 'plastic', 'classic', 'viscosense', 'gel')
}