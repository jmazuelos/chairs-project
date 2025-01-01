import { signalStoreFeature, withComputed, withState } from "@ngrx/signals";
import { PadModelType, UpholsteryMaterialType } from "../../models/enums";
import { Pad } from "../../models/parts";
import { computed } from "@angular/core";
import { BLENDER_CONSTANTS } from "../../constants/blender.constants";

export const initialPadState: Pad = { 
  model: {id:'', label:'', price:0, model: PadModelType.Gel}, 
  upholstery: {
    color: { id: '', label: '', price: 0, code: '' },
    material: { id: 'blueFabric', label: 'Tela azul', price: 0, type: UpholsteryMaterialType.Fabric, name: BLENDER_CONSTANTS.PAD.MATERIAL.DEFAULT },
  }
}

export function withPad() {
  return signalStoreFeature(
    withState<{ pad: Pad }>({ pad: initialPadState }),
    withComputed(({ pad }) => ({
      padDescription: computed(() => `Model: ${pad.model.label}, Color: ${pad.upholstery.material.label}`),
    }))
  );
}