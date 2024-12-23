import { computed } from "@angular/core";
import { signalStore, withComputed, withState } from "@ngrx/signals";
import { Chair } from "../models/chair.model";
import { initialArmrestState, initialBackrestState, initialBaseState, initialHeadrestState, initialMechanismState, initialPadState, initialSeatState, initialWheelState, withArmrest, withBackrest, withBase, withHeadrest, withMechanism, withPad, withSeat, withWheel } from "./features";

const initialChairState: Chair = {
  headrest: initialHeadrestState,
  backrest: initialBackrestState,
  armrest: initialArmrestState,
  pad: initialPadState,
  seat: initialSeatState,
  mechanism: initialMechanismState,
  base: initialBaseState,
  wheel: initialWheelState,
  isLoading: false,
  price: 0,
};

export const ChairStore = signalStore(
  withState(initialChairState),
  withHeadrest(),
  withBackrest(),
  withArmrest(),
  withPad(),
  withSeat(),
  withMechanism(),
  withBase(),
  withWheel(),
  withComputed((store) => ({
    chair: computed(() => ({
      headrest: store.headrest().color,
      backrest: store.backrest(),
      armrest: store.armrest(),
      pad: store.pad(),
      seat: store.seat(),
      mechanism: store.mechanism(),
      base: store.base(),
      wheel: store.wheel(),
    })),
    totalPrice: computed(() => {
      let price = 0;

      const parts: Object[]  = [store.headrest(), store.backrest(), store.armrest(), store.pad(), store.seat(), store.mechanism(), store.base(), store.wheel()];

      const sumPrices = (parts: Object): number => {
        let total = 0;

        Object.values(parts).forEach( partValue => {
          if (typeof partValue === 'object' && partValue !== null) {
            if('price' in partValue) {
              total += partValue.price;
            } else {
              total += sumPrices(partValue);
            }
          }
        });

        return total;
      }

      price += sumPrices(parts);

      return price;
    }),
  }))
);
