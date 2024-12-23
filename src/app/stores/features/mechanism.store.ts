import { signalStoreFeature, withComputed, withState } from "@ngrx/signals";
import { Mechanism } from "../../models/parts";
import { computed } from "@angular/core";

export const initialMechanismState: Mechanism = { 
  color: {id:'', label:'', price:0, code:''} 
}

export function withMechanism() {
  return signalStoreFeature(
    withState<Mechanism>(initialMechanismState),
    withComputed(({ color }) => ({
      mechanismDescription: computed(() => `Color: ${color()?.label}`),
    }))
  );
}