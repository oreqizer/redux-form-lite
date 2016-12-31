import * as R from 'ramda';

import fieldArrayProps from '../fieldArrayProps';


const fields: any = {
  length: 2,
  map: R.identity,
  push: R.identity,
  pop: R.identity,
  unshift: R.identity,
  shift: R.identity,
};

const props = {
  // to omit
  // ---
  component: 'input',
  withRef: R.identity,
  _form: 'form',
  _arrayId: 'arrayId',
  _array: 1,
  _addArray: R.identity,
  _removeArray: R.identity,
  _push: R.identity,
  _pop: R.identity,
  _unshift: R.identity,
  _shift: R.identity,

  // custom
  // ---
  damage: 'tons of',
  wow: 'so test',
};


describe('#fieldArrayProps', () => {
  it('should separate functions', () => {
    const res = fieldArrayProps(props, fields);

    expect(res.fields.length).toBe(2);
    expect(res.fields.map).toEqual(fields.map);
    expect(res.fields.push).toEqual(fields.push);
    expect(res.fields.pop).toEqual(fields.pop);
    expect(res.fields.unshift).toEqual(fields.unshift);
    expect(res.fields.shift).toEqual(fields.shift);
  });

  it('should omit props', () => {
    const res = fieldArrayProps(props, fields);

    expect(res).toEqual({
      fields,
      damage: 'tons of',
      wow: 'so test',
    });
  });
});
