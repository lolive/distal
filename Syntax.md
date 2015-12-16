# Table of Contents #


# Introduction #
For the following syntax examples, we will be implying the use of a javascript object with these properties:
```json
{
subject: "The Hitchhiker's Guide to the Galaxy",
date: "<i>1978

Unknown end tag for &lt;/i&gt;

",
unread: true,
priority: "urgent",
bookmarks: {
url: "www.google.com"
},
keywords: [
{name: "Brilliant"}, {name: "Masterpiece"}, {name: "Witty"}
]
}```

# HTML attributes #

## Modifying a node's contents ##
You can set a node's content with the **`data-qtext`** attribute and the property name as the parameter.
```xml

<div data-qtext="subject">

Unknown end tag for &lt;/div&gt;


<input type="text" data-qtext="subject">```
```xml

<div>The Hitchhiker's Guide to the Galaxy

Unknown end tag for &lt;/div&gt;


<input type="text" value="The Hitchhiker's Guide to the Galaxy">```
You can also set HTML content into a node with the `data-qtext` attribute and **`html`** as the first parameter.
```xml

<div data-qtext="html date"><i>1978

Unknown end tag for &lt;/i&gt;



Unknown end tag for &lt;/div&gt;

```

## Setting a node's attributes ##
You can set a node's attribute with the **`data-qattr`** attribute. Set the attribute name as the first parameter and the property name as the second parameter.
```xml

<a href="" data-qattr="href bookmarks.url">

Unknown end tag for &lt;/a&gt;


<input type="checkbox" data-qattr="checked unread">
<input type="button" data-qattr="disabled unread">
<div class="" data-qattr="class priority">

Unknown end tag for &lt;/div&gt;

```
You can set **multiple** attributes.
```xml
<a href="" class="" data-qattr="class priority; href bookmarks.url">

Unknown end tag for &lt;/div&gt;

```

### Formatting data into numerical form ###
You can format floating point numbers to have 2 decimal places and have a thousandth separator by adding **`,.`** as the last parameter. Don't forget to separate the last parameter with a space: "(space)(comma)(dot)":
```javascript

<input data-qattr="value total_cost ,.">
<div data-qtext="total_cost ,.">

Unknown end tag for &lt;/div&gt;

 ```
You can define your own formatting function like this (but don't use the reserved **`;`** character inside your name):
```javascript

distal.format[".3"] = function(value) {
return value.toFixed(3);
};```

Also see [Formatters](http://code.google.com/p/distal/wiki/Formatters).

## Show or hide a node ##
You can make a node visible or hidden (style.display = "none") with the **`data-qif`** attribute.
```xml
<div data-qif="unread">You have unread messages

Unknown end tag for &lt;/div&gt;


<div data-qif="not:unread">You don't have unread messages

Unknown end tag for &lt;/div&gt;


<input data-qif="priority eq urgent" type="submit" value="Message is Urgent">```
Notice you can use the comparators `not, eq, ne, gt, lt, cn, nc` for negation, equals, not equals, greater than, less than, contains, and, not contains.

If a node is to be hidden, it's children will be skipped over (not processed) to improve performance.

## Defining a shortcut ##
You can define a shortcut with the **`data-qdef`** attribute.
```xml
<div data-qdef="m forest.trees">
<div data-qtext="m.title">

Unknown end tag for &lt;/div&gt;


<div data-qtext="m.date">

Unknown end tag for &lt;/div&gt;




Unknown end tag for &lt;/div&gt;

```
This attribute cannot be used on the same node with a `data-qrepeat` attribute, but it can be used on its parent or children.

## Repeat a node multiple times ##
You can repeat a node multiple times based on an array of objects with the **`data-qrepeat`** attribute. It works with all HTML elements.
```xml

<html>
<table>
<tr><th>Opinions

Unknown end tag for &lt;/th&gt;



Unknown end tag for &lt;/tr&gt;


<tr data-qrepeat="m keywords"><td data-qtext="m.name">

Unknown end tag for &lt;/td&gt;



Unknown end tag for &lt;/tr&gt;




Unknown end tag for &lt;/table&gt;




Unknown end tag for &lt;/html&gt;

```
```xml

<html>
<table>
<tr><th>Opinions

Unknown end tag for &lt;/th&gt;



Unknown end tag for &lt;/tr&gt;


<tr><td>Brilliant

Unknown end tag for &lt;/td&gt;



Unknown end tag for &lt;/tr&gt;


<tr><td>Masterpiece

Unknown end tag for &lt;/td&gt;



Unknown end tag for &lt;/tr&gt;


<tr><td>Witty

Unknown end tag for &lt;/td&gt;



Unknown end tag for &lt;/tr&gt;




Unknown end tag for &lt;/table&gt;




Unknown end tag for &lt;/html&gt;

```
If the array of objects is empty or null, the node will be hidden via `style.display = "none"`, similar in behavior to the `data-qif` attribute.

### Separating items with a comma ###
If you are using **`data-qrepeat`** and would like to separate items with a **comma**, you can add the comma to every item other than the first item. i.e.,:
```xml

<span data-qrepeat="m keywords">
<b data-qif="# ne 1">, 

Unknown end tag for &lt;/b&gt;


<b data-qtext="m.name">

Unknown end tag for &lt;/b&gt;




Unknown end tag for &lt;/span&gt;

```

# JSON object #
## Access nested properties ##
If your data is nested inside multiple properties of the JSON object, you can use the dot notation to reach the nested data.
```xml
{
rss: {
feeds: {
count: "42"
}
}
}

<div data-qtext="rss.feeds.count">

Unknown end tag for &lt;/div&gt;

```
To access index 3 of an array named `books`, do `books.3.title`.

## Getting the index location in an array ##
If you are repeating a node with the `data-qrepeat`, you can access the current index location by using "`#`" as the property name. (First row starts at "1")
```xml

<div data-qrepeat="m list">Row <b data-qtext="#">

Unknown end tag for &lt;/b&gt;



Unknown end tag for &lt;/div&gt;



<div>Row <b>1

Unknown end tag for &lt;/b&gt;



Unknown end tag for &lt;/div&gt;


<div>Row <b>2

Unknown end tag for &lt;/b&gt;



Unknown end tag for &lt;/div&gt;


<div>Row <b>3

Unknown end tag for &lt;/b&gt;



Unknown end tag for &lt;/div&gt;


```

## Calling functions attached to objects ##
Yes, if a property on the JSON object is a `function`, it will be executed and the return value will be used as the output. You need to **leave out** the parenthesis.
```javascript

var data = {
name: "John",
surname: "Smith",
fullname: function () { return this.name + " " + this.surname; }
};

distal(node, data);

<div data-qtext="fullname">test

Unknown end tag for &lt;/div&gt;

```
Make sure your function doesn't throw exceptions or else Distal will stop.

# Calling distal in your code #
Distal only has 1 public function, which accepts a node and a javascript object as the parameters.
```
distal(HTMLElement, Object);```
Distal will parse the given node and all it's descendants, so it is not necessary to call distal on specific descendants. You can break down your webpage into separate sections and call distal separately on non-overlapping sections if you like and also pass in separate javascript objects too. The call is synchronous, so the call won't return till all descendants are processed.

# Advanced usage #
## How can I hook into Distal to perform some action before a node is modified? ##
Add a callback function to Distal like this:
```javascript

distal.beforeAttr = function(node, attName, newAttValue) { /*your function*/ };
distal.beforeText = function(node, newText) { /*your function*/ };```
This callback will not allow you to modify the output. To modify the output, please see [formatting data](Syntax#Formatting_data_into_numerical_form.md).

This is also a good place to drop in your animation code or debugging code. Make sure your callback function doesn't throw exceptions or else Distal will stop.

## How do I clear our rows from a table that were not generated dynamically (pre-rendered)? ##
Add a **`data-qdup`** attribute to the rows to be cleared out. Note that the nodes must be next to the `qrepeat` node without breaks in between.
```xml

<table>
<tr><th>Menu

Unknown end tag for &lt;/th&gt;



Unknown end tag for &lt;/tr&gt;


<tr data-qrepeat="m foods"><td data-qtext="m.name">Fries

Unknown end tag for &lt;/td&gt;



Unknown end tag for &lt;/tr&gt;


<tr data-qdup=1><td>Burger</td></tr>
<tr data-qdup=1><td>Coke</td></tr>


Unknown end tag for &lt;/table&gt;

```
This is useful if you want the list to be pre-rendered by the server, and need Distal to clear out the list before filling it with new data.

This is not limited to table nodes and can be used on any type of node that is next to a `qrepeat` node.