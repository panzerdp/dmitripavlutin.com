---
title: "React Forms Tutorial: How to Access Input Values, Validate, and Submit Forms"
description: "A step by step tutorial on how to access input values, validate, and submit forms in React."
published: "2020-11-10T18:00Z"
modified: "2020-11-10T18:00Z"
thumbnail: "./images/cover-2.png"
slug: react-forms-tutorial
tags: ['react', 'form', 'input']
recommended: ['controlled-inputs-using-react-hooks', 'react-state-management']
type: post
---

Most of the HTML elements like headings `<h1>`, `<h2>`, paragraphs `<p>`, or simple textual output `<span>` are meant to display information.  

The forms `<form>` and form elements like `<input>`, `<select>`, `<textarea>` are additionally meant to input the data into the application. Thus, managing forms and inputs is requires more efforts: you have to fill the form with initial data, on submit access the data from inputs, validate the form.  

In this tutorial, I'm going to start with a simple form "Register Your Cat", and gradually show you how to access the inputs values, how to submit and validate the form in React.  

Let's get started!

## 1. "Register Your Cat" form

A 🐱 cat show event is going to happen in your city . Your task, as a web developer, is to implement a form to register cats for the show.  

Let's name the form "Register Your Cat", having the fields:

* *Name*: textual input field (required)
* *Color*: select field. Available options are white, red, blue, black, cream (required)
* *Age*: numeric input field (required)
* *Habits*: textual field (optional)

Let's code the first version of "Register Your Cat" form, as a functional React component:

```jsx
const COLORS = ['white', 'red', 'blue', 'black', 'cream'];

function RegisterYourCatForm() {
  return (
    <form>
      <h2>Register Your Cat</h2>

      <label>Name*:</label>
      <input />

      <label>Color*:</label>
      <select>
        <option>Select color</option>
        {COLORS.map(color => <option>{color}</option>)}
      </select>

      <label>Age*:</label>
      <input />

      <label>Habits:</label>
      <textarea />

      <button type="submit">Submit</button>
    </form>
  );
}
```

`<RegisterYourCatForm />` component contains a `<form>` &mdash; the HTML element that holds a form.  

The form contains input fields: `<input />` element is used to introduce *Name* and *Age*, `<select>` element to choose a *Color*, and `<textarea>` element to enter longer text of the cat's *Habits*.  

`<label>` elements indicate the name of the corresponding field: "Name", "Color", "Age", and "Habits".  

The last element of the form is a `<button>` named *Submit*. When the user has introduced pet's info into the input fields, then user clicks *Submit* button and data in the form should be validated and submitted.  

![HTML Form](./images/html-form.png)

Open the [demo](https://codesandbox.io/s/competent-pond-uqdut?file=/src/App.js) as see how the form is rendered. At the moment the form doesn't do anything: just displays the fields.  

Having the form inputs setup, the next step is to access and persist the input fields value into the component's state. Let's see how to do that.  

## 2. Form state

Even if the user introduces data into the input fields, you still need a way to access these values inside of the component.  

Here's how you could keep the form data into the component's state:

```jsx
import { useState } from 'react';

const COLORS = ['white', 'red', 'blue', 'black', 'cream'];


function RegisterYourCatForm() {
  const [values, setValues] = useState({ 
    name: '', color: '', age: '', habits: '' 
  });

  function onChange(name) {
    return function ({ target: { value } }) {
      setValues(oldValues => ({...oldValues, [name]: value}));
    }
  }

  return (
    <form>
     
        <input 
          value={values.name} 
          onChange={onChange('name')} 
        />
     
        <select 
          value={values.color} 
          onChange={onChange('color')}
        >
     
        </select>
     
        <textarea 
          value={values.habits} 
          onChange={onChange('habits')} 
        />
    //  ...
     
    </form>
  );
}
```

## 3. Form validation



## 4. Form submission

## 5. Form initial data

## 6. Summary