import * as R from 'ramda';

import { Value } from './shared/getValue';
import { form, field, Form, Field } from './containers';
import { arrayUnshift, arrayShift, arraySwap, arrayMove } from './arrays';

import {
  Action,
  ADD_FORM,
  REMOVE_FORM,
  ADD_FIELD,
  REMOVE_FIELD,
  TOUCH_ALL,
  SUBMIT_START,
  SUBMIT_STOP,

  ADD_ARRAY,
  REMOVE_ARRAY,
  ARRAY_PUSH,
  ARRAY_POP,
  ARRAY_UNSHIFT,
  ARRAY_SHIFT,
  ARRAY_INSERT,
  ARRAY_REMOVE,
  ARRAY_SWAP,
  ARRAY_MOVE,

  FIELD_CHANGE,
  FIELD_FOCUS,
  FIELD_BLUR,
} from './actions';


export type State = {
  [form: string]: Form,
};


export default function formsReducer(state: State = {}, a: Action): State {
  switch (a.type) {
    // Form
    // ---
    case ADD_FORM:
      return R.assocPath<Form, State>(
        [a.payload.name], form, state,
      );

    case REMOVE_FORM:
      return R.dissocPath<State>(
        [a.payload.name], state,
      );

    case ADD_FIELD:
      return R.assocPath<Field, State>(
        [a.payload.form, 'fields', a.payload.id], a.payload.field, state,
      );

    case REMOVE_FIELD:
      return R.dissocPath<State>(
        [a.payload.form, 'fields', a.payload.id], state,
      );

    case TOUCH_ALL:
      return R.over(
        R.lensPath([a.payload.form, 'fields']),
        R.map(R.set(R.lensProp('touched'), true)),
        state,
      );

    case SUBMIT_START:
      return R.set(R.lensPath([a.payload.form, 'submitting']), true, state);

    case SUBMIT_STOP:
      return R.set(R.lensPath([a.payload.form, 'submitting']), false, state);

    // Array
    // ---
    case ADD_ARRAY:
      return R.assocPath<number, State>(
        [a.payload.form, 'arrays', a.payload.id], 0, state,
      );

    case REMOVE_ARRAY:
      return R.dissocPath<State>(
        [a.payload.form, 'arrays', a.payload.id], state,
      );

    case ARRAY_PUSH:
      return R.over(
        R.lensPath([a.payload.form, 'arrays', a.payload.id]),
        R.inc,
        state,
      );

    case ARRAY_POP:
      return R.over(
        R.lensPath([a.payload.form, 'arrays', a.payload.id]),
        R.dec,
        state,
      );

    case ARRAY_UNSHIFT:
      return R.compose<State, State, State>(
        R.over(
          R.lensPath([a.payload.form, 'fields']),
          arrayUnshift(a.payload.id, 0),
        ),
        R.over(
          R.lensPath([a.payload.form, 'arrays', a.payload.id]),
          R.inc,
        ),
      )(state);

    case ARRAY_SHIFT:
      return R.compose<State, State, State>(
        R.over(
          R.lensPath([a.payload.form, 'fields']),
          arrayShift(a.payload.id, 0),
        ),
        R.over(
          R.lensPath([a.payload.form, 'arrays', a.payload.id]),
          R.dec,
        ),
      )(state);

    case ARRAY_INSERT:
      return R.compose<State, State, State>(
        R.over(
          R.lensPath([a.payload.form, 'fields']),
          arrayUnshift(a.payload.id, a.payload.index + 1),
        ),
        R.over(
          R.lensPath([a.payload.form, 'arrays', a.payload.id]),
          R.inc,
        ),
      )(state);

    case ARRAY_REMOVE:
      return R.compose<State, State, State>(
        R.over(
          R.lensPath([a.payload.form, 'fields']),
          arrayShift(a.payload.id, a.payload.index),
        ),
        R.over(
          R.lensPath([a.payload.form, 'arrays', a.payload.id]),
          R.dec,
        ),
      )(state);

    case ARRAY_SWAP:
      return R.over(
        R.lensPath([a.payload.form, 'fields']),
        arraySwap(a.payload.id, a.payload.index1, a.payload.index2),
        state,
      );

    case ARRAY_MOVE:
      return R.over(
        R.lensPath([a.payload.form, 'fields']),
        arrayMove(a.payload.id, a.payload.from, a.payload.to),
        state,
      );

    // Field
    // ---
    case FIELD_CHANGE:
      return R.compose<State, State, State, State>(
          R.assocPath([a.payload.form, 'fields', a.payload.field, 'value'], a.payload.value),
          R.assocPath([a.payload.form, 'fields', a.payload.field, 'error'], a.payload.error),
          R.assocPath([a.payload.form, 'fields', a.payload.field, 'dirty'], a.payload.dirty),
      )(state);

    case FIELD_FOCUS:
      return R.compose<State, State, State>(
          R.assocPath([a.payload.form, 'fields', a.payload.field, 'active'], true),
          R.assocPath([a.payload.form, 'fields', a.payload.field, 'visited'], true),
      )(state);

    case FIELD_BLUR:
      return R.compose<State, State, State, State, State, State>(
          R.assocPath([a.payload.form, 'fields', a.payload.field, 'value'], a.payload.value),
          R.assocPath([a.payload.form, 'fields', a.payload.field, 'error'], a.payload.error),
          R.assocPath([a.payload.form, 'fields', a.payload.field, 'dirty'], a.payload.dirty),
          R.assocPath([a.payload.form, 'fields', a.payload.field, 'active'], false),
          R.assocPath([a.payload.form, 'fields', a.payload.field, 'touched'], true),
      )(state);

    default:
      return state;
  }
}