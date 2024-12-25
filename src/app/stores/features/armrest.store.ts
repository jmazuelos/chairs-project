import { computed } from "@angular/core";
import { patchState, signalStoreFeature, withComputed, withMethods, withState } from "@ngrx/signals";
import { ArmrestModelType } from "../../models/enums";
import { ColorOption } from "../../models/options";
import { Armrest } from "../../models/parts";

export const initialArmrestState: Armrest = { 
  model: {id:'', label:'', price:0, model: ArmrestModelType.FourDimension}, 
  color: {id:'', label:'', price:0, code:''} 
}

export function withArmrest() {
  return signalStoreFeature(
    withState<{ armrest: Armrest}>({ armrest: initialArmrestState}),
    withComputed(({ armrest }) => ({
      armrestDescription: computed(() => `Model: ${armrest.model.label}, Color: ${armrest.color.label}`),
    })),
    withMethods((store) => ({
      updateArmrestColor(colorOption: ColorOption): void {
        patchState(store, (state) => ( { ...state, armrest: { ...state.armrest, color: { ...colorOption } } } ));
      }
    })),
  );
}
