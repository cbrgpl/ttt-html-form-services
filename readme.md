# ttt-html-form-utils

<br><br>

Js Library provides utilities that able parse and validate HTML Forms; Library offers using data-attrs which mark form elements;

Library provides:

    - Form Parser
    - Form Validator
    - Validator
    Give possibility to create your own validators;
    - virtualFormFactory
    Create object which contains virtualElements;

*virtualElements*[^virt_elem];

<br><br><br><br>

# Installation

<br><br>

`npm i --save ttt-html-form-utils`

<br><br><br><br>

# HTML Meta information

Library uses data-attributes to detect which nodes are fields and type of field;

**data-field-name** - used to detect field name
**data-field-type** - used to detect field's type

Available Types:

- text
- multipleSelect
- singleSelect

Look at [example](./example/index.html) to get more details how it looks;

# Getting Started

<br><br>

```js
import {
    FormManipulator,
    FormValidator,
    VirtualFormFactory,
} from 'ttt-html-form-utils'

import {
    Validator,
  EmailValidator
} from 'ttt-html-form-utils/validators'

const $form = document.querySelector( 'form' ) // $ - means that variable contains DOM element

const virtualForm = VirtualFormFactory()
const formManipulator = new FormManipulator( virtualForm )
const formData = formManipulator.getForm()

const validationSchema = {
    email: {
        email: EmailValidator,
    },
    password: {
        minLength: ( val ) => val.length >= 6,
    }
}

const formValidator = new FormValidator( validationSchema )
console.log( formValidator.validate( formData ) )
```
What means $[^dom_elem_designation] in $form variable?

**[More Reality Example](./example/index.js)**

<br><br><br><br>

# Form utils:

<br><br>

## **VirtualFormFactory**

<br>

### createVirtualForm( $form )

| Arg | Type | Default | Description |
| --- | --- | --- | --- |
| $form | [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) | undefined | Form element, which contains fields |

*Returns virtual form for formManipulator's constructor*

<br><br><br>

## **FormManipulator**

<br>

### constructor( virtualForm )

| Arg | Type | Default | Description |
| --- | --- | --- | --- |
| virtualForm | Object | undefined | Result of VirtualFormFactory.createVirtualForm |


<br><br>

### clearForm()

*Clears form's fields*

<br><br>

### getForm()

*Returns form data as an object in format **<fieldName, fieldValue>***

Example:
```js
const formData = formManipulator.getForm();
console.log(formData)

result:
{
    country: ['usa', 'russia'],
    rememberMe: true,
    email: 'my_new_email@gmail.com'
}
```
<br><br><br>

## **FormValidator**

### contructor( validations )

| Arg | Type | Default | Description |
| --- | --- | --- | --- |
| validations | Object | undefined | Validation Schema, example below |

```js
const validationSchema = {
    email: {
        email: EmailValidator
    },
    password: {
        minLength: (val) => val.length >= 6
    },

}
```

<br><br>

### validate( data )

| Arg | Type | Default | Description |
| --- | --- | --- | --- |
| data | Object | undefined | Data which will be validated |

**Struct of data you pass must repeat validation schema struct!**

*Return:*

```js
{
    value: 'value',
    error: false,
    validators: {
      mustBeTwo: {
        error: false
      }
    },
    messages: [],
}
```

<br><br><br><br>

# Validators:

## **Built-in validators:**

- email

<br><br><br>

## **Custom validators:**

Use Validator class to create your own validators:

```js
const { Validator } = require('ttt-html-form-utils/validators')

const getValidationFn = (minLength) => ( value ) => value.length >= minLength && (new RegExp(/[A-Z]/g)).test(value)
const minLength = 6
const getMessage = (minLength) => `minLength should be at least ${minLength}`

const passwordValidator = new Validator(getValidationFn, minLength, getMessage )
```

### contructor

| Arg | Type | Default | Description |
| --- | --- | --- | --- |
| getFn | Function | undefined | Wrapper function which returns validation function |
| params | Any | undefined | Validation params which will be pass to the getFn and message functions |
| message | [Function, String] | null | If function was passed, then params will be passed to your function, else creates wrapper-function which returns string |


<br><br><br><br>

[^virt_elem]: That is special class which provides interface for easily control of form fields;
[^dom_elem_designation]: Variables, which have "$" at the start, contains DOM elements;
