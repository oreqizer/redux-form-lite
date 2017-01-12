# redux-forms

[![npm](https://img.shields.io/npm/v/redux-forms.svg)](https://www.npmjs.com/package/redux-forms)
[![Build Status](https://travis-ci.org/oreqizer/redux-form-lite.svg?branch=master)](https://travis-ci.org/oreqizer/redux-form-lite)
[![codecov](https://codecov.io/gh/oreqizer/redux-form-lite/branch/master/graph/badge.svg)](https://codecov.io/gh/oreqizer/redux-form-lite)

A simple form manager for Redux with bindings for:

* **React**
* **Inferno** (WIP, not yet)

### Installation

Simply:

`yarn add redux-forms`

Or for the oldschool:

`npm i redux-forms --save`

Each binding package then has its own module with the name `redux-forms-<binding>`. For example, to install the **React** bindings, install the package `redux-forms-react`.

### Quickstart

Mount the `redux-forms` reducer to your root reducer as `reduxForms`.

```js
import { createStore, combineReducers } from 'redux';
import { reducer } from 'redux-forms';

const rootReducer = combineReducers({
  // ... your other reducers
  reduxForms: reducer,
});

const store = createStore(rootReducer);
```

Then simply wrap your desired form with the `Form` component from your favorite UI library.

```js
import { Form, Field } from 'redux-forms-react';

const MyForm = (props) => (
  <Form name="contact">
    <div>
      <label htmlFor="name">Name</label>
      <Field name="name" component="input" type="text" />
    </div>
    <div>
      <label htmlFor="email">Email</label>
      <Field name="email" component="input" type="email" />
    </div>
    <button type="submit">Submit</button>
  </Form>
);

export default MyForm;
```

That's it! This is how you mount the most basic form. For more advanced usage, check out the API - there are examples for each use case.

### Documentation

* [reducer](https://oreqizer.gitbooks.io/redux-forms/content/reducer.html)
* [Form](https://oreqizer.gitbooks.io/redux-forms/content/form.html)
* [Field](https://oreqizer.gitbooks.io/redux-forms/content/field.html)
* [FieldArray](https://oreqizer.gitbooks.io/redux-forms/content/fieldarray.html)
* [selectors](https://oreqizer.gitbooks.io/redux-forms/content/selectors.html)
* [actions](https://oreqizer.gitbooks.io/redux-forms/content/actions.html)
