# Ingredients: #
To use [Distal](http://code.google.com/p/distal) you will need:
  1. a webpage, like `index.html`
  1. a copy of `distal.js`

# Step 1: #
Design you webpage however you want the end user to see it. You may use WYSIWYG tools like Dreamweaver, as no Javascript is required.
For example:
```xml

<html>
<head>
<title>Larry's Tool Shed

Unknown end tag for &lt;/title&gt;


<script src="distal.js">

Unknown end tag for &lt;/script&gt;




Unknown end tag for &lt;/head&gt;


<body>
<h1>Larry's Tool Shed

Unknown end tag for &lt;/h1&gt;



<div>Welcome back, <a href="profile.html">Bob

Unknown end tag for &lt;/a&gt;

!

Unknown end tag for &lt;/div&gt;



<div>What kinda tools would ya like to rent today?

Unknown end tag for &lt;/div&gt;



<ol>
<li><a href="screwdrivers.html">Screw drivers

Unknown end tag for &lt;/a&gt;


<li><a href="lugnuts.html">Lug Nuts

Unknown end tag for &lt;/a&gt;


<li><a href="spanner.html">Spanner

Unknown end tag for &lt;/a&gt;




Unknown end tag for &lt;/ol&gt;



<div>Hey, Bob, don't forget to pay your bills on time!

Unknown end tag for &lt;/div&gt;


<table>
<tr>
<th>Tool

Unknown end tag for &lt;/th&gt;

<th>Days Rented

Unknown end tag for &lt;/th&gt;

<th>Amount Due

Unknown end tag for &lt;/th&gt;




Unknown end tag for &lt;/tr&gt;


<tr>
<td>Spanner

Unknown end tag for &lt;/td&gt;

<td>3

Unknown end tag for &lt;/td&gt;

<td>$45

Unknown end tag for &lt;/td&gt;




Unknown end tag for &lt;/tr&gt;


<tr>
<th>Total:

Unknown end tag for &lt;/th&gt;

<th>3

Unknown end tag for &lt;/th&gt;

<th>$45

Unknown end tag for &lt;/th&gt;




Unknown end tag for &lt;/tr&gt;




Unknown end tag for &lt;/table&gt;





Unknown end tag for &lt;/body&gt;




Unknown end tag for &lt;/html&gt;

```

# Step 2: #
Make your state-of-the-art Javascript application pull in data from your state-of-the-art backend server. Ideally you have that already or your enterprise already has one and you are tasked with interfacing with it. By now you should have some data in some Javascript variable that you want to update the user interface with. For example you may have this:
```json

var statistics = {
user: {name: "Bob", profile_url: "/profile?id=12345"},
tools: {
{name: "Spanner", rent_url: "rent?id=2"},
{name: "Lug Nuts", rent_url: "rent?id=4"},
{name: "Screw drivers", rent_url: "rent?id=6"}
},
rented: {
items: [{name: "Spanner", cost: 45, days: 3}],
total_days: 3,
total_cost: 45
}
};```

# Step 3: #
Go back to your HTML and add distal attributes to all the elements which contain data that you want to modify. You HTML should now look like this:



```xml

<html>
<head>
<title>Larry's Tool Shed

Unknown end tag for &lt;/title&gt;


<script src="distal.js">

Unknown end tag for &lt;/script&gt;


<script src="stateoftheart.js">

Unknown end tag for &lt;/script&gt;




Unknown end tag for &lt;/head&gt;


<body>
<h1>Larry's Tool Shed

Unknown end tag for &lt;/h1&gt;



<div>Welcome back, <a href="profile.html" data-qattr="href user.profile_url" data-qtext="user.name">Bob

Unknown end tag for &lt;/a&gt;

!

Unknown end tag for &lt;/div&gt;



<div>What kinda tools would ya like to rent today?

Unknown end tag for &lt;/div&gt;



<ol>
<li data-qif="not:tools">Sorry, you're not eligible to rent tools!

Unknown end tag for &lt;/li&gt;


<li data-qrepeat="item tools">
<a href="screwdrivers.html" data-qtext="item.name" data-qattr="item.rent_url">Screw drivers

Unknown end tag for &lt;/a&gt;


<li data-qdup="1"><a href="lugnuts.html">Lug Nuts

Unknown end tag for &lt;/a&gt;


<li data-qdup="1"><a href="spanner.html">Spanner

Unknown end tag for &lt;/a&gt;




Unknown end tag for &lt;/ol&gt;



<div data-qif="rented">Hey, <span data-qtext="user.name">Bob

Unknown end tag for &lt;/span&gt;

, don't forget to pay your bills on time!

Unknown end tag for &lt;/div&gt;


<table data-qif="rented">
<tr>
<th>Tool

Unknown end tag for &lt;/th&gt;

<th>Days Rented

Unknown end tag for &lt;/th&gt;

<th>Amount Due

Unknown end tag for &lt;/th&gt;




Unknown end tag for &lt;/tr&gt;


<tr data-qrepeat="item rented.items">
<td data-qtext="item.name">Spanner

Unknown end tag for &lt;/td&gt;

<td data-qtext="item.days">3

Unknown end tag for &lt;/td&gt;

<td data-qtext="item.cost">$45

Unknown end tag for &lt;/td&gt;




Unknown end tag for &lt;/tr&gt;


<tr>
<th>Total:

Unknown end tag for &lt;/th&gt;

<th data-qtext="rented.total_days">3

Unknown end tag for &lt;/th&gt;

<th data-qtext="rented.total_cost">$45

Unknown end tag for &lt;/th&gt;




Unknown end tag for &lt;/tr&gt;




Unknown end tag for &lt;/table&gt;





Unknown end tag for &lt;/body&gt;




Unknown end tag for &lt;/html&gt;

```

# Step 4: #
Inside your state-of-the-art application, whenever you want to update the page, just call:
```javascript

StateOfTheArtApp.onDataModelChange = function(statistics) {

//update the view
distal(document.body, statistics);

}; ```