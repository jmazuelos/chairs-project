import { computed } from "@angular/core";
import { patchState, signalStoreFeature, withComputed, withMethods, withState } from "@ngrx/signals";
import { PadModelType } from "../../models/enums";
import { Pad } from "../../models/parts";

export const initialPadState: Pad = { 
  model: { id: 'visco', label: 'Viscoelástico', price: 0, model: PadModelType.Visco}, 
  color: { id: 'blue', label: 'Azul', price: 5, code: '#00013D' }, 
}

export function withPad() {
  return signalStoreFeature(
    withState<{ pad: Pad }>({ pad: initialPadState }),
    withComputed(({ pad }) => ({
      padDescription: computed(() => `Model: ${pad.model.label}, Color: ${pad.color.label}`),
    })),
    withMethods((store) => ({
      // TODO: change price logic
      removePad(): void {
        patchState(store, (state) => ({ 
          ...state, pad: {
            ...initialPadState,
            model: {
              id: 'visco',
              label: 'Viscoelástico',
              price: 0,
              model: PadModelType.Visco,
            }, 
          },
        }));
      }
    }))
  );
}