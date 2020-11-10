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

The forms `<form>` and form elements like `<input>`, `<select>`, `<textarea>` are additionally meant to input the data into the application. Thus, managing forms and input fields require more effort: you have to fill the form with initial data, access data from inputs, validate the form.  

In this tutorial, I'm going to start with a simple form "Register Your Cat", and gradually show you how to access the inputs values, how to submit, and validate the form in React.  

Let's get started!

```toc
```

## 1. "Register Your Cat" form

A 🐱 cat show event is going to happen in your city. Your task, as a web developer, is to implement a form to register cats for the show.  

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
        <option value="">Select color</option>
        {COLORS.map(c => <option key={c}>{c}</option>)}
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

The last element of the form is a `<button>` named *Submit*. When the user has introduced the pet's info into the input fields, by clicking the *Submit* button the data in the form should be validated and submitted.  

![HTML Form](./images/html-form.png)

Open the [demo](https://codesandbox.io/s/initial-form-uqdut?file=/src/App.js) to see how the form is rendered. At the moment the form doesn't do anything: just displays the fields.  

The next step is to access and persist the input fields value into the component's state. Let's see how to do that.  

## 2. Form state

Even if the user introduces data into the input fields, you still need a way to access these values inside of the component.  

Here's how you could keep the form data into the component's state:

```jsx{21,24,30,33}
import { useState } from 'react';

const COLORS = ['white', 'red', 'blue', 'black', 'cream'];

function RegisterYourCatForm() {
  const [values, setValues] = useState({ 
    name: '', color: '', age: '', habits: '' 
  });

  const set = name => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({...oldValues, [name]: value }));
    }
  };

  return (
    <form>
      <h2>Register Your Cat</h2>

      <label>Name*:</label>
      <input value={values.name} onChange={set('name')} />

      <label>Color*:</label>
      <select value={values.color} onChange={set('color')}>
        <option value="">Select color</option>
        {COLORS.map(c => <option key={c}>{c}</option>)}
      </select>

      <label>Age*:</label>
      <input value={values.age} onChange={set('age')} />

      <label>Habits:</label>
      <textarea value={values.habits} onChange={set('habits')} />

      <button type="submit">Submit</button>
    </form>
  );
}
```

Open the [demo](https://codesandbox.io/s/form-state-es25p?file=/src/App.js), then type some values into the input fields. `values` state variable updates with the values that you introduced.  

Now you have the form's data stored in the component's state. You can lately save this state to the server... but before doing that, how can you be sure that the user has introduced all the required information? 

You need to perform the form validation.  

## 3. Form validation

You can use built-in HTML5 validation of the input fields. They are powerful and useful.  

First, let's mark with `required` attribute the inputs that are required for completion: *Name*, *Color*, and *Age*.  

Second, let's make sure that the user introduces a positive number, bigger than `0`, inside the *Age* field by marking it `type="number"` and `min="0"`.

No validation attributes are added to *Habits* textarea because the field is optional and has no restrictions over the introduced text.

```jsx{13,19,28}
// ...

function RegisterYourCatForm() {

  // ...

  return (
    <form>
      <h2>Register Your Cat</h2>

      <label>Name*:</label>
      <input 
        type="text" required
        value={values.name} onChange={set('name')} 
      />

      <label>Color*:</label>
      <select 
        required
        value={values.color} onChange={set('color')}
      >
        <option value="">Select color</option>
        {COLORS.map(c => <option key={c}>{c}</option>)}
      </select>

      <label>Age*:</label>
      <input
        type="number" required min="1"
        value={values.age} onChange={set('age')} 
      />

      <label>Habits:</label>
      <textarea value={values.habits} onChange={set('habits')} />

      <button type="submit">Submit</button>
    </form>
  );
}
```

Now, if you open the [demo](https://codesandbox.io/s/form-validation-sosi5?file=/src/App.js) and click the *Submit* button, the form is going to be validated.  

If, for example, you haven't introduced anything into the *Name* field and clicked *Submit*, then the *Name* field is going to be highlighted, and depending on the browser you'll be informed that the field is required.  

## 4. Form submission

When clicking the Submit button, the browser performs a default form submission by making a POST request to the URL specified in the `action` attribute of the `<form>`. If not specified, the `action` attribute equals the current URL.  

But, since the form is controlled by React, you wouldn't need this to happen, since you'd like to save the data by yourself.  

To prevent the browser from performing the default action on submit, simply attach `onSubmit` event handler to the form, then call `event.preventDefault()`. Also, in the `onSubmit` event handler you can perform a POST request by yourself to save the user form:

```jsx{}
// ...

function RegisterYourCatForm() {
  const [values, setValues] = useState({ 
    name: '', color: '', age: '', habits: '' 
  });

  const saveFormData = async () => {
    const response = await fetch('/api/registration', {
      method: 'POST',
      body: JSON.stringify(values)
    });
    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`); 
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent default submission
    try {
      await saveFormData();
      alert('Your registration was successfully submitted!');
      setValues({
        name: '', color: '', age: '', habits: '' 
      });
    } catch (e) {
      alert(`Registration failed! ${e.message}`);
    }
  }

  // ...

  return (
    <form onSubmit={onSubmit}>
      {/* ... */}
    </form>
  );
}
```

Open the [demo](https://codesandbox.io/s/form-submission-k5f3l?file=/pages/index.js), fill the registration form, and click *Submit*. The form's values are going to be sent as a `POST` request to `/api/registration` URL.  

## 5. Form's initial data

To edit an existing registration, you would need to fill the form with initial data.  

Because the input values are controlled by `values` state variable, what you need to do is simply load the registration data and update the `values` with the fetched data.  

```jsx
// ...

function RegisterYourCatForm({ id, initialValues }) {
  const [values, setValues] = useState({ initialValues });

  // ...

  return (
    <form onSubmit={onSubmit}>
      {/* ... */}
    </form>
  );
}
```

`useEffect()` hook was used to initiate the loading of form data.  

## 6. Summary

When working with forms in React, a good approach is to make the form controlled by a state variable that holds all the inputs values. 

Use the HTML5 built-in form validation. That requires configuring your inputs with corresponding validation attributes, e.g. `required={true}` to make the input required.  

By default, when clicking the form's *Submit* button, the browser performs a full-page POST request to the URL specified in the `action` attribute of the `<form>`. But having the form controlled by React, you can prevent browser's default behavior by attaching an event handler to `onSubmit` event and calling `event.preventDefault()`.  

Also, inside the same `onSubmit` event handler you can access the form data from the corresponding state variable, and save it manually using your preferred way: by making an async fetch POST request.  

Finally, when you'd like to edit an entity using the form, you can load the initial data into your component's form state variable.  