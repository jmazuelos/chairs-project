import { computed } from "@angular/core";
import { patchState, signalStoreFeature, withComputed, withMethods, withState } from "@ngrx/signals";
import { ArmrestModelType } from "../../models/enums";
import { Armrest } from "../../models/parts";

export const initialArmrestState: Armrest = { 
  name: 'armrest',
  label: 'Reposabrazos',
  model: { id: 'armrest1', label: 'Reposabrazos 4D', price: 0, model: ArmrestModelType.FourDimension }, 
  color: { id: 'black', label: 'Negro', price: 0, code: '#000000', imgPath: 'images/color/black.webp' },
  optionsEnabled: true
}

export function withArmrest() {
  return signalStoreFeature(
    withState<{ armrest: Armrest}>({ armrest: initialArmrestState}),
    withComputed(({ armrest }) => ({
      armrestDescription: computed(() => `Model: ${armrest.model.label}, Color: ${armrest.color.label}`),
    })),
    withMethods((store) => ({
      /*updateArmrestColor(colorOption: ColorOption): void {
        patchState(store, (state) => ( { ...state, armrest: { ...state.armrest, color: { ...colorOption } } } ));
      },
      updateArmrestModel(modelOption: ModelOption): void {
        patchState(store, (state) => ( { ...state, armrest: { ...state.armrest, model: { ...modelOption as ArmrestModelOption } } } ));
      },*/
      // TODO: change price logic
      removeArmrest(): void {
        patchState(store, (state) => ({ 
          ...state, armrest: {
            ...initialArmrestState,
            model: {
              id: 'noArmrest',
              label: 'Sin reposabrazos',
              price: -20,
              model: ArmrestModelType.NoArmrest,
            }, 
          },
        }));
      }
    }))
  );
}
