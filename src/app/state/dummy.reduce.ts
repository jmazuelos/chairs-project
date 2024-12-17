import { createReducer } from '@ngrx/store';

export interface DummyState {
  placeholder: boolean;
}

export const initialDummyState: DummyState = {
  placeholder: true,
};

export const dummyReducer = createReducer(initialDummyState);