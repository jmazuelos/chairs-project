import { signalStoreFeature, withComputed, withState } from "@ngrx/signals";
import { FoamMaterialType, UpholsteryMaterialType } from "../../models/enums";
import { Seat } from "../../models/parts";
import { computed } from "@angular/core";

export const initialSeatState: Seat = { 
  foam: {id:'', label:'', price:0, type: FoamMaterialType.ClassicFoam}, 
  upholstery: {
    color: {id:'', label:'', price:0, code:''},
    material: {id:'', label:'', price:0, type: UpholsteryMaterialType.Fabric}
  } 
}

export function withSeat() {
  return signalStoreFeature(
    withState<Seat>(initialSeatState),
    withComputed(({ foam, upholstery }) => ({
      seatDescription: computed(() => `Foam: ${foam()?.label}, Upholstery: ${upholstery()?.material.label}`),
    }))
  );
}