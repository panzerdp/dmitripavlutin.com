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

In this tutorial, I'm going to start with a simple form "Register Your Cat", and gradually should you how to access the inputs values, how to submit and validate the form in React.  

Let's get started!

## 1. "Register Your Cat" form

In your city soon is going to happen a cat show event. Your task, as a web developer, is to implement a form to register participants for the show.  

Let's name the form "Register Your Cat". It consists of the following fields:

* *Name*: textual input field (required)
* *Color*: select field to choose cat's coat color. Available options are white, red, blue, black, cream, cinnamon, fawn, brown (required)
* *Age*: numeric input field (required)
* *Habits*: textual field (optional)

Having the fields setup, let's write the first version of "Register Your Cat" form, as a functional React component:

```javascript
function RegisterYourCatForm() {
  return (
    <form>

    </form>
  );
}
```

## 2. Form state

## 3. Form validation

## 4. Form submission

## 5. Form initial data

## 6. Summary