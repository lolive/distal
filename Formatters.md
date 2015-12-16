# Introduction #

Also see [Formatting data into numerical form](http://code.google.com/p/distal/wiki/Syntax#Formatting_data_into_numerical_form).

You can format outputs before they get put inside `qattr` attribute values and `qtext` body contents. Formatters are typically used to format dates, values with decimal points, or to add the comma in thousandth delimited numbers.

For example, you can format floating point numbers to have 2 decimal places and have a thousandth separator by adding ,. as the last parameter. Don't forget to separate the last parameter with a space: "(space)(comma)(dot)":

```html
 <input data-qattr="value total_cost ,.">

<div data-qtext="total_cost ,.">

Unknown end tag for &lt;/div&gt;


```

Distal only comes with 1 formatter, but you can add your own.

# Defining your own formatter #
Formatters are just functions which accept 1 parameter and return an output. You must assign a unique name for it (but don't use the reserved ; character inside it) and you add them to `distal` like so:

```javascript
 //this formatter is called: .3 and converts desired numbers to 3 decimal places
distal.format[".3"] = function(value) {
return value.toFixed(3);
};

//this formater is called: ldate and converts a date to local locale date string
distal.format["ldate"] = function(value) {
return new Date(value).toLocaleDateString();
};
```

You use the above formatters like so:

```html
 <input data-qattr="value coordinates .3">

<div data-qtext="birthday ldate">

Unknown end tag for &lt;/div&gt;


```

# When not to use formatters #
Formatters can do what you can't achieve with distal attributes.

Formatters shouldn't be used to add units symbols. Those can be added like so:
```html
 <span data-qtext="size">1024

Unknown end tag for &lt;/span&gt;

 KB```

Formatters shouldn't be used to add color. Those can be added like so:
```html
 <span data-qif="amount lt 0" data-qtext="amount" style="color:red">-100

Unknown end tag for &lt;/span&gt;


<span data-qif="amount gt 0" data-qtext="amount">100

Unknown end tag for &lt;/span&gt;


```

This is only a rule of thumb. If circumstances prefer you to use formatters for these operations, you are free to do so.