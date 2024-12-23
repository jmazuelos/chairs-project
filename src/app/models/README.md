## USAGE GUIDELINES

1. Importing Models:

   • Use index.ts to simplify imports. Example: index.ts in parts folder, so: import { Armrest, Backrest... } from "./parts";

2. Adding New Models:
   • Add new parts of chair models in parts folder. Example: armrest.model.ts, backrest.model.ts...
   • Add related enums in the appropriate enums subfolder.
   • Add configuration options in the options folder (color, material, model, etc.).

• Organize related enums in subfolders mirroring the options structure (material, model, etc.). Example: 'enums/material' mirrors 'options/material' folder.

## STRUCTURE OVERVIEW

1. Enums:
   • Purpose: Enumerations (enums) define constant sets of values used across the project, ensuring consistency and avoiding hardcoded values.
   • Subfolders:
   material: Enums related to material types, such as base-material-type, foam-material-type, and upholstery-material-type.
   model: Enums related to the types of chair components, such as armrest or wheel models.
2. Options
   • Purpose: Contains detailed model options and configurations that the user can select.
   • Subfolders:
   color: Defines the available color options model for some chair parts.
   material: Defines the materials options model for some chair parts.
   model: Defines the model options for some chair parts.
3. Parts
   • Purpose: Represents the individual components (or "parts") of the chair and their properties.
   • Files:
   armrest.model.ts: Defines the data structure for armrests.
   backrest.model.ts: Defines the data structure for backrests.
   base.model.ts: Represents the base of the chair.
   Additional files for mechanism, pad, seat, upholstery, wheel, and chair models.

4. Shared Models
   • Purpose: Contains shared or generic model structures that apply to multiple parts or configurations.
   • Files:
   option.model.ts: A generic model for options used across the application.
