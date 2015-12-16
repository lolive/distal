Below are a number of use case examples to demonstrate how to use Distal. For more information, check out the [wiki page](http://code.google.com/p/distal/w/list):



### Updating a section of your page with sports scores ###
```xml

<html>
<table id="scoreboard">
<tr><th>Team

Unknown end tag for &lt;/th&gt;

<th>Team

Unknown end tag for &lt;/th&gt;



Unknown end tag for &lt;/tr&gt;


<tr data-qrepeat="m scores">
<td><span data-qtext="m.ateam.name">

Unknown end tag for &lt;/span&gt;

 - <span data-qtext="m.ateam.score">

Unknown end tag for &lt;/span&gt;



Unknown end tag for &lt;/td&gt;


<td><span data-qtext="m.bteam.name">

Unknown end tag for &lt;/span&gt;

 - <span data-qtext="m.bteam.score">

Unknown end tag for &lt;/span&gt;



Unknown end tag for &lt;/td&gt;




Unknown end tag for &lt;/tr&gt;




Unknown end tag for &lt;/table&gt;




Unknown end tag for &lt;/html&gt;

```
```javascript

distal(document.getElementById("scoreboard"), {scores: [
{ateam: {name: "JFK", score: 4}, bteam: {name: "LAX", score: 2}},
{ateam: {name: "LHR", score: 0}, bteam: {name: "SGN", score: 1}},
{ateam: {name: "NRT", score: 1}, bteam: {name: "HKG", score: 2}},
{ateam: {name: "BOM", score: 3}, bteam: {name: "IGU", score: 5}}
]}); ```

---

### Updating toolbar button States ###
```xml
<html>
<div id="toolbar">
<input type="button" value="Copy" data-qattr="disabled nocopy">
<input type="button" value="Paste" data-qattr="disabled nopaste">
<input type="button" value="Bold" data-qattr="class bold">
<input type="button" value="Italic" data-qattr="class italic">


Unknown end tag for &lt;/div&gt;




Unknown end tag for &lt;/html&gt;

```
```javascript

distal(document.getElementById("toolbar"), {
nocopy: true, nopaste: false, bold: "b", italic: "i"
}); ```

---

### Flipping through content ###
```xml
<html>
<div data-qif="page1">
Welcome! Click "Next" to start.


Unknown end tag for &lt;/div&gt;


<div data-qif="page2">
Your generated password is: <span data-qtext="page2.pwd"> 

Unknown end tag for &lt;/span&gt;




Unknown end tag for &lt;/div&gt;




Unknown end tag for &lt;/html&gt;

```
```javascript

distal(document.body, {
page1: null,
page2: {
pwd: "swordfish"
}
}); ```

---

### Building a nested tree ###
```xml
<ul>
<li data-qrepeat="H1 list">
<div data-qtext="H1.value">Top Level

Unknown end tag for &lt;/div&gt;


<ul data-qif="H1.list">
<li data-qrepeat="H2 H1.list">
<div data-qtext="H2.value">2nd Level

Unknown end tag for &lt;/div&gt;


<ul data-qif="H2.list">
<li data-qrepeat="H3 H2.list">
<div data-qtext="H3.value">3rd Level

Unknown end tag for &lt;/div&gt;




Unknown end tag for &lt;/li&gt;




Unknown end tag for &lt;/ul&gt;




Unknown end tag for &lt;/li&gt;




Unknown end tag for &lt;/ul&gt;




Unknown end tag for &lt;/li&gt;




Unknown end tag for &lt;/ul&gt;

```
```javascript

var data = {
list: [
{value:"Introduction", list:[
{value:"History", list:[
{value:"Early 70s"},
{value:"Mid 80s"}
]},
{value:"Overview", list:[
{value:"The Great Step"}
]},
{value:"Ethos"}
]},
{value:"Breaking Ground", list:[
{value:"Identifying Needs"},
{value:"Delegation"}
]},
{value:"Improvements", list:[
{value:"New Faculties", list:[
{value:"Contemporary"},
{value:"Alternative"}
]},
{value:"New Age"}
]},
{value: "Justification"},
{value: "Closing Statement"}
]
};
distal(document.body, data);
```

---

If you have questions, please put them on the [Issues](http://code.google.com/p/distal/issues/list) page instead of the comments area.