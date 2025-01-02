import { signalStoreFeature, withComputed, withState } from "@ngrx/signals";
import { FoamMaterialType, UpholsteryMaterialType } from "../../models/enums";
import { Seat } from "../../models/parts";
import { computed } from "@angular/core";

export const initialSeatState: Seat = { 
  foam: { id: 'classic', label: 'Espuma clásica', price: 0, type: FoamMaterialType.ClassicFoam}, 
  upholstery: {
    color: { id:'', label:'', price:0, code:'' },
    material: { id: 'blueLeather', label: 'Piel azul', price: 5, type: UpholsteryMaterialType.Leather, name: ''}
  } 
}

export function withSeat() {
  return signalStoreFeature(
    withState<{ seat: Seat}>({ seat: initialSeatState}),
    withComputed(({ seat }) => ({
      seatDescription: computed(() => `Foam: ${seat.foam.label}, Upholstery: ${seat.upholstery.material.label}`),
    }))
  );
}