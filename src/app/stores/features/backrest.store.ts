import { signalStoreFeature, withComputed, withState } from "@ngrx/signals";
import { FoamMaterialType, UpholsteryMaterialType } from "../../models/enums";
import { Backrest } from "../../models/parts";
import { computed } from "@angular/core";

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
    withState<Backrest>(initialBackrestState),
    withComputed(({ color, foam, upholstery }) => ({
      backrestDescription: computed(() => `Color: ${color()?.label}, Foam: ${foam()?.label}, Upholstery: ${upholstery()?.material.label}`),
    }))
  );
}
