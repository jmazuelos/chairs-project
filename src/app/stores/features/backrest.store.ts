import { getState, patchState, signalStoreFeature, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { FoamMaterialType, UpholsteryMaterialType } from "../../models/enums";
import { Backrest } from "../../models/parts";
import { computed, effect } from "@angular/core";
import { ColorOption } from "../../models/options";

export const initialBackrestState: Backrest = { 
  color: {id:'', label:'', price:0, code:''}, 
  foam: {id:'', label:'', price:0, type: FoamMaterialType.ClassicFoam}, 
  upholstery: {
    color: {id:'', label:'', price:0, code:''}, 
    material: {id:'', label:'', price:0, type:UpholsteryMaterialType.Fabric}
  } 
}

export function withBackrest() {
  return signalStoreFeature(
    withState<{ backrest: Backrest }>({ backrest: initialBackrestState }),
    withComputed(({ backrest }) => ({
      backrestDescription: computed(() => `Color: ${backrest.color?.label}, Foam: ${backrest.foam?.label}, Upholstery: ${backrest.upholstery?.material.label}`),
    })),
    withMethods((store) => ({
      updateBackrestColor(colorOption: ColorOption): void {
        patchState(store, (state) => ( { ...state, backrest: { ...state.backrest, color: { ...colorOption } } } ));
      }
    })),
  );
}
