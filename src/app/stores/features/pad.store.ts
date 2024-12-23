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
    withState<Pad>(initialPadState),
    withComputed(({ model, color }) => ({
      padDescription: computed(() => `Model: ${model()?.label}, Color: ${color()?.label}`),
    }))
  );
}