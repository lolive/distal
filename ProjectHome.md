<img src='http://distal.googlecode.com/svn/trunk/distal2.gif' align='right'>Distal is a Javascript tool that automatically fills your webpage with data from a JSON source. Freeing you from needing to traverse nodes or create DOM trees just to add dynamic data. Allowing you to focus on the important things such as data logic and webpage design.<br>
<br>
Design your webpage as you always have. Then tag your HTML with attributes that describe what data belongs in it. Your designers can customize and update your HTML at anytime. Have your webpage download data in the form of JSON and have Distal fill your webpage with that data.<br>
<br>
<h2>Objectives</h2>
Distal uses a concept created by <a href='http://docs.zope.org/zope2/zope2book/AppendixC.html'>Zope</a> used in Python projects called <a href='http://wiki.zope.org/ZPT/TAL'>Template Attribute Language</a> (TAL), which has the following objectives:<br>
<ol><li>Separation of the user interface and application logic is ensured. Don't lock up your HTML inside strings or dummy textareas!<br>
</li><li>You can create the user interface using regular HTML files, so that designers can use tools like Dreamweaver without needing backend support.<br>
</li><li>You no longer need to write a program to generate the user interface nor write a for-loop to populate tables or list items.<br>
</li><li>The user interface is smart enough to know when to show or hide certain elements depending on the properties of the data.<br>
</li><li>Make do without ever needing to call getElementById ever again, and never need to call innerHTML or appendChild again.<br>
</li><li>Distal allows you to validate your HTML against the W3C markup validation tool. And your template text remains as part of your HTML which enables <a href='http://www.w3.org/wiki/Graceful_degredation_versus_progressive_enhancement'>progressive enhancement</a> and helps in <a href='http://groups.google.com/group/Pure-Unobtrusive-Rendering-Engine/msg/5452acf4c27adb46?pli=1'>search engine optimization</a>.<br>
<h2>Download</h2>
Click on the Source link above or see the <a href='http://code.google.com/p/distal/source/browse/trunk/distal-dev.js'>development</a> version or the <a href='http://distal.googlecode.com/svn/trunk/distal.js'>compressed_</a><b><a href='http://distal.googlecode.com/svn/trunk/distal.js'>(4k)</a></b> version<br>
<h2>Example:</h2>
Say your server returns a JSON object like so:<br>
<pre><code>{<br>
geotags: [ {id: 1, label: "Work"}, {id: 2, label: "Home"}, {id: 3, label: "Club"} ]<br>
}</code></pre>
and your HTML page looks like this:<br>
<pre><code><br>
&lt;html&gt;<br>
Choose a folder to save: &lt;select name="folder"&gt;<br>
&lt;option value=""<br>
data-qrepeat="folder geotags"<br>
data-qattr="value folder.id; text folder.label"&gt;Work<br>
<br>
<br>
Unknown end tag for &lt;/select&gt;<br>
<br>
<br>
<br>
<br>
Unknown end tag for &lt;/html&gt;<br>
<br>
<br>
</code></pre>
Then Distal will take your HTML page and convert it to:<br>
<pre><code><br>
&lt;html&gt;<br>
Choose a folder to save: &lt;select name="folder"&gt;<br>
&lt;option value="1"&gt;Work<br>
&lt;option value="2"&gt;Home<br>
&lt;option value="3"&gt;Club<br>
<br>
<br>
Unknown end tag for &lt;/select&gt;<br>
<br>
<br>
<br>
<br>
Unknown end tag for &lt;/html&gt;<br>
<br>
<br>
</code></pre>
And therein lies the beauty of it. As you write your user interface you specify what data goes in it. You don't need to write a separate function to populate your interface.<br>
<h2>Demo</h2>
<b><a href='http://distal.googlecode.com/svn/trunk/distal_delicious.htm'>Bookmarks Viewer</a></b> - get real time bookmarks from <i>delicious.com</i></li></ol>

<b><a href='http://distal.googlecode.com/svn/trunk/testcase.htm'>Test Case</a></b> - tests the different functions<br>
<br>
<b><a href='http://distal.googlecode.com/svn/trunk/enron_corpus.htm'>Speed Demo</a></b> - test rendering 800 items (2 MB file)<br>
<h2>What does it solve?</h2>
Does your web application have so many getElementById calls that you're too embarrassed to admit? Do you spend 80% of your time on getting the interface to work and 20% on data integrity? Have you lost track of which elements are gone and which are new?<br>
<br>
Is your user interface over-engineered into widgets just because you want to repeat a template of code for each item of a list? Do you need to update your controller code every time your user interface changes a little?<br>
<br>
TAL solved this for Python by acting as the glue that binds HTML with user data; and now it's here in Javascript. It is a meta-language that both designers and programmers know. Programmers pass on a structured object of data in the form of JSON to the interface and the interface knows what properties to take out and where on the page to put it. TAL greatly simplifies your web application by shrinking the middle layer and removing dependencies.<br>
<br>
<h2>Syntax</h2>
Assuming you have a JSON blob like:<br>
<pre><code>{<br>
subject: "The Hitchhiker's Guide to the Galaxy",<br>
date: "&lt;i&gt;1978<br>
<br>
Unknown end tag for &lt;/i&gt;<br>
<br>
",<br>
unread: true,<br>
priority: "urgent",<br>
bookmarks: {<br>
url: "www.google.com"<br>
},<br>
keywords: [<br>
{name: "Brilliant"}, {name: "Masterpiece"}, {name: "Witty"}<br>
]<br>
}</code></pre>
<h3>Modifying a node's contents</h3>
You can set a node's content with the <b><code>data-qtext</code></b> attribute and the property name as the parameter.<br>
<pre><code><br>
&lt;div data-qtext="subject"&gt;<br>
<br>
Unknown end tag for &lt;/div&gt;<br>
<br>
<br>
&lt;input type="text" data-qtext="subject"&gt;</code></pre>
<pre><code><br>
&lt;div&gt;The Hitchhiker's Guide to the Galaxy<br>
<br>
Unknown end tag for &lt;/div&gt;<br>
<br>
<br>
&lt;input type="text" value="The Hitchhiker's Guide to the Galaxy"&gt;</code></pre>
You can also set HTML content into a node with the <code>data-qtext</code> attribute and <b><code>html</code></b> as the first parameter.<br>
<pre><code><br>
&lt;div data-qtext="html date"&gt;&lt;i&gt;1978<br>
<br>
Unknown end tag for &lt;/i&gt;<br>
<br>
<br>
<br>
Unknown end tag for &lt;/div&gt;<br>
<br>
</code></pre>
<h3>Setting a node's attributes</h3>
You can set a node's attribute with the <b><code>data-qattr</code></b> attribute. Set the attribute name as the first parameter and the property name as the second parameter.<br>
<pre><code><br>
&lt;a href="" data-qattr="href bookmarks.url"&gt;<br>
<br>
Unknown end tag for &lt;/a&gt;<br>
<br>
<br>
&lt;input type="checkbox" data-qattr="checked unread"&gt;<br>
&lt;input type="button" data-qattr="disabled unread"&gt;<br>
&lt;div class="" data-qattr="class priority"&gt;<br>
<br>
Unknown end tag for &lt;/div&gt;<br>
<br>
</code></pre>
You can set <b>multiple</b> attributes.<br>
<pre><code>&lt;a href="" class="" data-qattr="class priority; href bookmarks.url"&gt;<br>
<br>
Unknown end tag for &lt;/div&gt;<br>
<br>
</code></pre>
<h3>Show or hide a node</h3>
You can make a node visible or hidden (style.display = "none") with the <b><code>data-qif</code></b> attribute.<br>
<pre><code>&lt;div data-qif="unread"&gt;You have unread messages<br>
<br>
Unknown end tag for &lt;/div&gt;<br>
<br>
<br>
&lt;div data-qif="not:unread"&gt;You don't have unread messages<br>
<br>
Unknown end tag for &lt;/div&gt;<br>
<br>
<br>
&lt;input data-qif="priority eq urgent" type="submit" value="Message is Urgent"&gt;</code></pre>
Notice you can use the comparators <code>not, eq, ne, gt, lt, cn, nc</code> for negation, equals, not equals, greater than, less than, contains, and, not contains.<br>
<h3>Defining a shortcut</h3>
You can define a shortcut with the <b><code>data-qdef</code></b> attribute.<br>
<pre><code>&lt;div data-qdef="m forest.trees"&gt;<br>
&lt;div data-qtext="m.title"&gt;<br>
<br>
Unknown end tag for &lt;/div&gt;<br>
<br>
<br>
&lt;div data-qtext="m.date"&gt;<br>
<br>
Unknown end tag for &lt;/div&gt;<br>
<br>
<br>
<br>
<br>
Unknown end tag for &lt;/div&gt;<br>
<br>
</code></pre>
This attribute cannot be used on the same node with a <code>data-qrepeat</code> attribute, but it can be used on its parent or children.<br>
<h3>Repeat a node multiple times</h3>
You can repeat a node multiple times based on an array of objects with the <b><code>data-qrepeat</code></b> attribute. It works with all HTML elements.<br>
<pre><code><br>
&lt;html&gt;<br>
&lt;table&gt;<br>
&lt;tr&gt;&lt;th&gt;Opinions<br>
<br>
Unknown end tag for &lt;/th&gt;<br>
<br>
<br>
<br>
Unknown end tag for &lt;/tr&gt;<br>
<br>
<br>
&lt;tr data-qrepeat="m keywords"&gt;&lt;td data-qtext="m.name"&gt;<br>
<br>
Unknown end tag for &lt;/td&gt;<br>
<br>
<br>
<br>
Unknown end tag for &lt;/tr&gt;<br>
<br>
<br>
<br>
<br>
Unknown end tag for &lt;/table&gt;<br>
<br>
<br>
<br>
<br>
Unknown end tag for &lt;/html&gt;<br>
<br>
</code></pre>
<pre><code><br>
&lt;html&gt;<br>
&lt;table&gt;<br>
&lt;tr&gt;&lt;th&gt;Opinions<br>
<br>
Unknown end tag for &lt;/th&gt;<br>
<br>
<br>
<br>
Unknown end tag for &lt;/tr&gt;<br>
<br>
<br>
&lt;tr&gt;&lt;td&gt;Brilliant<br>
<br>
Unknown end tag for &lt;/td&gt;<br>
<br>
<br>
<br>
Unknown end tag for &lt;/tr&gt;<br>
<br>
<br>
&lt;tr&gt;&lt;td&gt;Masterpiece<br>
<br>
Unknown end tag for &lt;/td&gt;<br>
<br>
<br>
<br>
Unknown end tag for &lt;/tr&gt;<br>
<br>
<br>
&lt;tr&gt;&lt;td&gt;Witty<br>
<br>
Unknown end tag for &lt;/td&gt;<br>
<br>
<br>
<br>
Unknown end tag for &lt;/tr&gt;<br>
<br>
<br>
<br>
<br>
Unknown end tag for &lt;/table&gt;<br>
<br>
<br>
<br>
<br>
Unknown end tag for &lt;/html&gt;<br>
<br>
</code></pre>
If the array of objects is empty or null, the node will be hidden via <code>style.display = "none"</code>, similar in behavior to the <code>data-qif</code> attribute.<br>
<h3>Access nested properties</h3>
If your data is nested inside multiple properties of the JSON object, you can use the dot notation to reach the nested data.<br>
<pre><code>{<br>
rss: {<br>
feeds: {<br>
count: "42"<br>
}<br>
}<br>
}<br>
<br>
&lt;div data-qtext="rss.feeds.count"&gt;<br>
<br>
Unknown end tag for &lt;/div&gt;<br>
<br>
</code></pre>
To access index 3 of an array named <code>books</code>, do <code>books.3.title</code>.<br>
<h3>More Syntax</h3>
For more syntax tips, check out the <b><a href='http://code.google.com/p/distal/wiki/Syntax'>Syntax</a></b> and <b><a href='http://code.google.com/p/distal/wiki/FAQ'>FAQ</a></b>.<br>
<br>
<h2>Getting Started</h2>
<ul><li>Distal works best if your server backend returns JSON.<br>
</li><li>Add the Distal script tag in your HTML <pre><code>&lt;script src="http://distal.googlecode.com/svn/trunk/distal.js"&gt;<br>
<br>
Unknown end tag for &lt;/script&gt;<br>
<br>
</code></pre>
</li><li>Design your web application user interface in regular HTML. Add dummy data inside the HTML, so you can pad text out nicely and know what it will look like to the user.<br>
</li><li>Put in TAL attributes inside your HTML based on the structure of your JSON. Use the dot notation to reach nested properties inside the JSON.<br>
</li><li>Depending on your requirements, download the JSON data on page load or when a user clicks on a button. Then call <code>distal(Node, JSON);</code> to apply the JSON to the HTML.<br>
<pre><code><br>
window.onload = function () {<br>
var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");<br>
xhr.open("GET", "/your/url", true);<br>
xhr.onreadystatechange = function () {<br>
if (xhr.readyState == 4) distal(document.body, eval("(" + xhr.responseText + ")"));<br>
};<br>
xhr.send(null);<br>
};</code></pre>
</li><li>For performance, you should call <code>distal(Node, JSON)</code> on a more specific node. Like <code>distal(document.getElementById("dialog1"), response)</code>.<br>
<h2>Use Cases</h2>
</li><li>Updating a section of your page with <a href='http://code.google.com/p/distal/wiki/UseCaseExamples'>Sports Scores</a>:<br>
<pre><code>distal(document.getElementById("scoreboard"), scoreList);</code></pre>
</li><li>Updating Toolbar Buttons based on a document's state:<br>
<pre><code>distal(document.getElementById("toolbar"), {clipboard:true, italic:false, bold:true, underline:false});</code></pre>
</li><li>Updating your Widget's View with data:<br>
<pre><code>distal(this.container, this.getTableModel());</code></pre>
<h2>Scope</h2>
Distal parses a node tree and feeds it data from a Javascript object. It works on IE6+, Firefox, Chrome, Safari and iOS 4+. You still need to bring your own application logic, data persistence, HTML and event handling. You just need to ensure that you call <code>distal</code> whenever you want to update your interface and pass it a root node and a JSON object.</li></ul>

Distal does not have any dependencies but can also work together with an Ajax library such as jQuery, Dojo, Scriptaculous, Underscore and Backbone. They do not overlap in functionality, but rather Distal introduces a new way to work with your DOM in a loose way. Distal also supports RequireJS and follows ECMAScript 5 Strict mode.<br>
<br>
See the <a href='http://code.google.com/p/distal/w/list'>wiki page</a> for more articles.