/** Copyright 2012 mocking@gmail.com

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

function distal(root, obj) {
  //create a duplicate object which we can add properties to without affecting the original
  var wrapper = new Function();
  wrapper.prototype = obj;
  obj = new wrapper();

  var resolve = distal.resolve;
  var node = root;
  var doc = root.ownerDocument;
  var querySelectorAll = !!root.querySelectorAll;
  //TAL attributes for querySelectorAll call
  var TAL = "*[qdef],*[qif],*[qrepeat],*[qattr],*[qtext]";
  //optimize comparison check
  var innerText = "innerText" in root ? "innerText" : "textContent";
  //attributes which don't support setAttribute()
  var altAttr = {className:1, "class":1, innerHTML:1, style:1, src:1, href:1, id:1, value:1, checked:1, label:1, text:1, disabled:1};

  var getProp = function(s) {return this[s];};

  //there may be generated node that are siblings to the root node if the root node 
  //itself was a repeater. Remove them so we don't have to deal with them later
  while((node = root.nextSibling) && node.nodeType == 1 && (node.qdup || node.getAttribute("qdup"))) {
    node.parentNode.removeChild(node);
  }

  //if we generate repeat nodes and are dealing with non-live NodeLists, then
  //we add them to the listStack[] and process them first as they won't appear inline
  //due to non-live NodeLists when we traverse our tree
  var listStack;
  var posStack = [0];
  var list;
  var pos = 0;
  var attr;

  //get a list of concerned nodes within this root node. If querySelectorAll is
  //supported we use that but it is treated differently because it is a non-live NodeList.
  if(querySelectorAll) {
    //remove all generated nodes (repeats), so we don't have to deal with them later.
    //Only need to do this for non-live NodeLists.
    list = root.querySelectorAll("*[qdup]");
    while((node = list[pos++])) node.parentNode.removeChild(node);
    pos = 0;
  }

  listStack = [querySelectorAll ? root.querySelectorAll(TAL) : root.getElementsByTagName("*")];
  list = [root];

  while(true) {
    node = list[pos++];

    //when finished with the current list, there are generated nodes and
    //their children that need to be processed.
    while(!node && (list = listStack.pop())) {
      pos = posStack.pop();
      node = list[pos++];
    }

    if(!node) break;

    //creates a shortcut to an object
    //e.g., <section qdef="feeds main.sidebar.feeds">

    attr = node.getAttribute("qdef");
    if(attr) {
      attr = attr.split(" ");
      //add it to the object as a property
      obj[attr[0]] = resolve(obj, attr[1]);
    }

    //shown if object is truthy
    //e.g., <img qif="item.unread">

    attr = node.getAttribute("qif");
    if(attr) {
      var obj2 = resolve(obj, attr.split("not:").pop());

      //if obj is empty array it is still truthy, so make it the array length
      if(obj2 && obj2.length > -1) obj2 = !!obj2.length;

      if(!!obj2 ^ !(attr.indexOf("not:") != 0)) {
        node.style.display = "";
      } else {
        node.style.display = "none";

        //skip over all nodes that are children of this node
        if(querySelectorAll) {
          pos += node.querySelectorAll(TAL).length;
        } else {
          pos += node.getElementsByTagName("*").length;
        }

        //stop processing the rest of this node as it is invisible
        continue;
      }
    }

    //duplicate the current node x number of times where x is the length
    //of the resolved array. Create a shortcut variable for each iteration
    //of the loop.
    //e.g., <div qrepeat="item feeds.items">

    attr = node.getAttribute("qrepeat");
    if(attr) {
      var attr2 = attr.split(" ");
      var tmpNode;

      //if live NodeList, remove adjacent repeated nodes
      if(!querySelectorAll) {
        while((tmpNode = node.nextSibling) && tmpNode.nodeType == 1 && (tmpNode.qdup || tmpNode.getAttribute("qdup"))) {
          tmpNode.parentNode.removeChild(tmpNode);
        }
      }

      var objList = resolve(obj, attr2[1]);

      if(objList && objList.length) {
        node.style.display = "";
        //allow this node to be treated as index zero in the repeat list
        //we do this by setting the shortcut variable to array[0]
        obj[attr2[0]] = objList[0];

      } else {
        //we need to hide the repeat node if the object doesn't resolve
        node.style.display = "none";
        //skip over all nodes that are children of this node
        if(querySelectorAll) {
          pos += node.querySelectorAll(TAL).length;
        } else {
          pos += node.getElementsByTagName("*").length;
        }

        //stop processing the rest of this node as it is invisible
        continue;
      }

      if(objList.length > 1) {
        //we need to duplicate this node x number of times. But instead
        //of calling cloneNode x times, we get the outerHTML and repeat
        //that x times, then innerHTML it which is faster
        var html = new Array(objList.length - 1), len = html.length;
        for(var i = len; i > 0; i--) html[len - i] = i;

        var tmpNode = node.cloneNode(true);
        tmpNode.setAttribute("qdef", attr);
        tmpNode.removeAttribute("qrepeat");
        tmpNode.setAttribute("qdup", "1");
        tmpNode = tmpNode.outerHTML || 
          doc.createElement("div").appendChild(tmpNode).parentNode.innerHTML;

        //we're doing something like this:
        //html = "<div qdef=" + [1,2,3].join("><div qdef=") + ">"
        var prefix = tmpNode.indexOf(' qdef="' + attr + '"');
        if(prefix == -1) prefix = tmpNode.indexOf(" qdef='" + attr + "'");
        prefix = prefix + 7 + attr.length;

        html = tmpNode.substr(0, prefix) + "." + 
          html.join(tmpNode.substr(prefix) + tmpNode.substr(0, prefix) + ".") + 
          tmpNode.substr(prefix);

        var tmpNode = doc.createElement("div");

        //workaround for IE which can't innerHTML tables and selects
        if("cells" in node) {  //TR
          tmpNode.innerHTML = "<table>" + html + "<\/table>";
          tmpNode = tmpNode.firstChild.tBodies[0].childNodes;
        } else if("cellIndex" in node) {  //TD
          tmpNode.innerHTML = "<table><tr>" + html + "<\/tr><\/table>";
          tmpNode = tmpNode.firstChild.tBodies[0].firstChild.childNodes;
        } else if("selected" in node && "text" in node) {  //OPTION
          tmpNode.innerHTML = "<select>" + html + "<\/select>";
          tmpNode = tmpNode.firstChild.options;
        } else {
          tmpNode.innerHTML = html;
          tmpNode = tmpNode.childNodes;
        }

        var frag = doc.createDocumentFragment();

        if(querySelectorAll || node == root) {
          //push the current list and index to the stack and process the repeated
          //nodes first. We need to do this inline because some variable may change 
          //value later, if the become redefined.
          listStack.push(list);
          posStack.push(pos);
          //clear the current list so that in the next round we grab another list
          //off the stack
          list = [];

          //add this node to the stack so that it is processed right before we pop the
          //main list off the stack. This will be the last node to be processed and we 
          //use it to assign our repeat variable to array index 0 so that the node's
          //children, which are also at array index 0, will be processed correctly
          listStack.push([{qdef:attr + ".0", getAttribute:getProp}]);
          posStack.push(0);

          for(var i = tmpNode.length - 1; i >= 0; i--) {
            html = tmpNode[i];
            //we need to add the repeated nodes to the listStack because 
            //we are either (1) dealing with a live NodeList and we are still at
            //the root node so the newly created nodes are adjacent to the root
            //and so won't appear in the NodeList, or (2) we are dealing with a
            //non-live NodeList, so we need to add them to the listStack
            listStack.push(querySelectorAll ? html.querySelectorAll(TAL) : html.getElementsByTagName("*"));
            posStack.push(0);

            listStack.push([html]);
            posStack.push(0);

            html.qdup = 1;
            frag.appendChild(html);
          }
        } else {
          for(var i = tmpNode.length - 1; i >= 0; i--) {
            html = tmpNode[i];
            html.qdup = 1;
            frag.appendChild(html);
          }
        }
        node.parentNode.insertBefore(frag, node.nextSibling);
      }
    }

    //set multiple attributes on the node
    //e.g., <div qattr="value item.text disabled item.disabled">

    attr = node.getAttribute("qattr");
    if(attr) {
      attr = attr.split(" ");
      var name;
      var value;
      for(var i = attr.length - 1; i >= 0; i-=2) {
        name = attr[i - 1];
        value = resolve(obj, attr[i]);
        if(altAttr[name]) {
          switch(name) {
            case "innerHTML": throw node;
            case "disabled":
            case "checked": node[name] = !!value; break;
            case "style": node.style.cssText = value; break;
            case "class": name = "className";
            default: node[name] = value;
          }
        } else {
          node.setAttribute(name, value);
        }
      }
    }

    //sets the innerHTML on the node
    //e.g., <div qtext="html item.description">

    attr = node.getAttribute("qtext");
    if(attr) {
      if(attr.indexOf("html ") == 0) {
        attr = attr.split(" ");
        node.innerHTML = resolve(obj, attr[1]) || "";
      } else {
        node["value" in node ? "value" : innerText] = resolve(obj, attr) || "";
      }
    }
  }  //end while
}

//follows the dot notation path to find an object within an object: obj["a"]["b"]["1"] = c;
distal.resolve = function(obj, seq, x) {
  //if fully qualified path is at top level: obj["a.b.d"] = c
  if((x = obj[seq])) return x;

  seq = seq.split(".");
  x = 0;
  while(seq[x] && (obj = obj[seq[x++]]) );
  return obj;
};