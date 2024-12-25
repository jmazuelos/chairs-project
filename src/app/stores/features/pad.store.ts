import { signalStoreFeature, withComputed, withState } from "@ngrx/signals";
import { PadModelType } from "../../models/enums";
import { Pad } from "../../models/parts";
import { computed } from "@angular/core";

export const initialPadState: Pad = { 
  model: {id:'', label:'', price:0, model: PadModelType.Gel}, 
  color: {id:'', label:'', price:0, code:''} 
}

export function withPad() {
  return signalStoreFeature(
    withState<{ pad: Pad }>({ pad: initialPadState }),
    withComputed(({ pad }) => ({
      padDescription: computed(() => `Model: ${pad.model.label}, Color: ${pad.color.label}`),
    }))
  );
}