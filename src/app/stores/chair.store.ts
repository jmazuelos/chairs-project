import { computed, effect } from "@angular/core";
import { getState, signalStore, withComputed, withHooks } from "@ngrx/signals";
import { withArmrest, withBackrest, withBase, withHeadrest, withMechanism, withPad, withSeat, withWheel } from "./features";

/*const initialChairState: Chair = {
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
};*/

export const ChairStore = signalStore(
  //withState(initialChairState),
  withHeadrest(),
  withBackrest(),
  withArmrest(),
  withPad(),
  withSeat(),
  withMechanism(),
  withBase(),
  withWheel(),
  withComputed((store) => ({
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
  })),
  withHooks({
    onInit(store) {
      effect(() => {
        // The effect is re-executed on state change.
        const state = getState(store);
        console.log('counter state [chair]', state);
      });
    },
  })
);
