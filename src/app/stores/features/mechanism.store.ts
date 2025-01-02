import { signalStoreFeature, withComputed, withState } from "@ngrx/signals";
import { Mechanism } from "../../models/parts";
import { computed } from "@angular/core";

export const initialMechanismState: Mechanism = { 
  color: { id: 'black', label: 'Negro', price: 0, code: '#000000', imgPath: 'images/color/black.webp' } 
}

export function withMechanism() {
  return signalStoreFeature(
    withState<{ mechanism: Mechanism }>({ mechanism: initialMechanismState }),
    withComputed(({ mechanism }) => ({
      mechanismDescription: computed(() => `Color: ${mechanism.color.label}`),
    }))
  );
}