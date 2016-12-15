/// <reference types="jest" />

/* eslint-disable react/prop-types */
import * as React from 'react';
import { mount } from 'enzyme';

import connectFieldArray from '../connectFieldArray';


const MyComp: any = () => (
  <div className="Component" />
);

MyComp.displayName = 'MyComp';

const Decorated: any = connectFieldArray(MyComp);

const flat = {
  context: {
    reduxForms: {
      form: 'test',
      context: '',
      flattened: false,
    },
  },
  childContextTypes: {
    reduxForms: React.PropTypes.object.isRequired,
  },
};

const deep = {
  context: {
    reduxForms: {
      form: 'test',
      context: 'nested[0]',
      flattened: false,
    },
  },
  childContextTypes: {
    reduxForms: React.PropTypes.object.isRequired,
  },
};


describe('#connectFieldArray', () => {
  it('should not mount', () => {
    const mountFn = () => mount(<Decorated />);

    expect(mountFn).toThrowError(/decorated with "reduxForm"/);
  });

  it('should keep its name', () => {
    const wrapper = mount(<Decorated name="array" />, flat);

    expect(wrapper.name()).toBe('MyComp');
  });

  it('should provide a reference to the original component', () => {
    expect(Decorated.WrappedComponent).toBe(MyComp);
  });

  it('should provide form name', () => {
    const wrapper = mount(<Decorated name="array" />, flat);

    expect(wrapper.find(MyComp).prop('_form')).toBe('test');
  });

  it('should provide a flat id', () => {
    const wrapper = mount(<Decorated name="array" />, flat);

    expect(wrapper.find(MyComp).prop('_arrayId')).toBe('array');
  });

  it('should provide a deep id', () => {
    const wrapper = mount(<Decorated name="array" />, deep);

    expect(wrapper.find(MyComp).prop('_arrayId')).toBe('nested[0].array');
  });

  it('should provide a regular context', () => {
    const wrapper: any = mount(<Decorated name="array" />, flat);

    expect(wrapper.instance().getChildContext().reduxForms).toEqual({
      form: 'test',
      context: 'array',
      flattened: false,
    });
  });

  it('should provide a deep context', () => {
    const wrapper: any = mount(<Decorated name="array" />, deep);

    expect(wrapper.instance().getChildContext().reduxForms).toEqual({
      form: 'test',
      context: 'nested[0].array',
      flattened: false,
    });
  });

  it('should add flattened to context', () => {
    const wrapper: any = mount(<Decorated flat name="array" />, flat);

    expect(wrapper.instance().getChildContext().reduxForms).toEqual({
      form: 'test',
      context: 'array',
      flattened: true,
    });
  });
});
