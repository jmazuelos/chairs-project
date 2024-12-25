import { signalStoreFeature, withComputed, withState } from "@ngrx/signals";
import { Wheel } from "../../models/parts";
import { WheelModelType } from "../../models/enums";
import { computed } from "@angular/core";

export const initialWheelState: Wheel = { 
  model: {id:'', label:'', price:0, model:WheelModelType.Plastic}, 
  color: {id:'',label:'',price:0,code:''} 
}

export function withWheel() {
  return signalStoreFeature(
    withState<{ wheel: Wheel }>({ wheel: initialWheelState }),
    withComputed(({ wheel }) => ({
      wheelDescription: computed(() => `Model: ${wheel.model.label}, Color: ${wheel.color.label}`),
    }))
  );
}
