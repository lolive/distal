# Introduction #

If you need to show a long list using Distal, you many want to split the long list into pages. You can do this with a simple paginator script.

See this [Demo](http://distal.googlecode.com/svn/trunk/distal_paginate.htm).

# Script #
```javascript

function ArrayPaginator(arr) {
this.source = arr;
this.update();
}
ArrayPaginator.prototype = {
currentPageNumber: 1,
currentPageSize: 0,
pageSize: 20,
pageCount: 0,
pages: null,
isLastPage: false,

update: function(num) {
this.pageCount = Math.ceil(this.source.length / this.pageSize);
if(num) this.currentPageNumber = num*1;

if(this.currentPageNumber < 1 || this.currentPageNumber*this.pageSize > this.source.length) {
this.currentPageNumber = this.pageCount;
}

this.remaining = this.source.length < this.pageSize ? 0 :
this.source.length - this.currentPageNumber*this.pageSize;

this.currentPageSize = this.remaining >= 0 ? this.pageSize :
this.source.length % this.pageSize;

var curPageIndex = this.currentPageNumber - 1;

this.pages = this.source.slice(
curPageIndex*this.pageSize,
this.currentPageSize + curPageIndex*this.pageSize
);

this.isLastPage = (this.currentPageNumber == this.pageCount);
}
}; ```

# Usage #
```javascript

var data = {
list: [{value: "A"}, {value: "B"}, {value: "C"}, {value: "D"}]
};
data.list.pages = new ArrayPaginator(data.list);
```

```xml

<table>
<tr data-qrepeat="m list.pages">
<td data-qtext="m.value">

Unknown end tag for &lt;/td&gt;




Unknown end tag for &lt;/tr&gt;




Unknown end tag for &lt;/table&gt;


Page <span data-qtext="list.pages.currentPageNumber">

Unknown end tag for &lt;/span&gt;

 of <span data-qtext="list.pages.pageCount">

Unknown end tag for &lt;/span&gt;


```