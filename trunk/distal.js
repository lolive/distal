function distal(a,b){var c=new Function();c.prototype=b;b=new c();var d=distal.resolve;var e=a;var f=a.ownerDocument;var g=!!a.querySelectorAll;var h="*[qdef],*[qif],*[qrepeat],*[qattr],*[qtext]";var j="innerText"in a?"innerText":"textContent";var k={className:1,"class":1,innerHTML:1,style:1,src:1,href:1,id:1,value:1,checked:1,label:1,text:1,disabled:1};var l=function(s){return this[s]};while((e=a.nextSibling)&&e.nodeType==1&&(e.qdup||e.getAttribute("qdup"))){e.parentNode.removeChild(e)}var m;var n=[0];var o;var p=0;var q;if(g){o=a.querySelectorAll("*[qdup]");while((e=o[p++]))e.parentNode.removeChild(e);p=0}m=[g?a.querySelectorAll(h):a.getElementsByTagName("*")];o=[a];while(true){e=o[p++];while(!e&&(o=m.pop())){p=n.pop();e=o[p++]}if(!e)break;q=e.getAttribute("qdef");if(q){q=q.split(" ");b[q[0]]=d(b,q[1])}q=e.getAttribute("qif");if(q){var r=d(b,q.split("not:").pop());if(r&&r.length>-1)r=!!r.length;if(!!r^!(q.indexOf("not:")!=0)){e.style.display=""}else{e.style.display="none";if(g){p+=e.querySelectorAll(h).length}else{p+=e.getElementsByTagName("*").length}continue}}q=e.getAttribute("qrepeat");if(q){var t=q.split(" ");var u;if(!g){while((u=e.nextSibling)&&u.nodeType==1&&(u.qdup||u.getAttribute("qdup"))){u.parentNode.removeChild(u)}}var v=d(b,t[1]);if(v&&v.length){e.style.display="";b[t[0]]=v[0]}else{e.style.display="none";if(g){p+=e.querySelectorAll(h).length}else{p+=e.getElementsByTagName("*").length}continue}if(v.length>1){var w=new Array(v.length-1),len=w.length;for(var i=len;i>0;i--)w[len-i]=i;var u=e.cloneNode(true);u.setAttribute("qdef",q);u.removeAttribute("qrepeat");u.setAttribute("qdup","1");u=u.outerHTML||f.createElement("div").appendChild(u).parentNode.innerHTML;var x=u.indexOf(' qdef="'+q+'"');if(x==-1)x=u.indexOf(" qdef='"+q+"'");x=x+7+q.length;w=u.substr(0,x)+"."+w.join(u.substr(x)+u.substr(0,x)+".")+u.substr(x);var u=f.createElement("div");if("cells"in e){u.innerHTML="<table>"+w+"<\/table>";u=u.firstChild.tBodies[0].childNodes}else if("cellIndex"in e){u.innerHTML="<table><tr>"+w+"<\/tr><\/table>";u=u.firstChild.tBodies[0].firstChild.childNodes}else if("selected"in e&&"text"in e){u.innerHTML="<select>"+w+"<\/select>";u=u.firstChild.options}else{u.innerHTML=w;u=u.childNodes}var y=f.createDocumentFragment();if(g||e==a){m.push(o);n.push(p);o=[];m.push([{qdef:q+".0",getAttribute:l}]);n.push(0);for(var i=u.length-1;i>=0;i--){w=u[i];m.push(g?w.querySelectorAll(h):w.getElementsByTagName("*"));n.push(0);m.push([w]);n.push(0);w.qdup=1;y.appendChild(w)}}else{for(var i=u.length-1;i>=0;i--){w=u[i];w.qdup=1;y.appendChild(w)}}e.parentNode.insertBefore(y,e.nextSibling)}}q=e.getAttribute("qattr");if(q){q=q.split(" ");var z;var A;for(var i=q.length-1;i>=0;i-=2){z=q[i-1];A=d(b,q[i]);if(k[z]){switch(z){case"innerHTML":throw e;case"disabled":case"checked":e[z]=!!A;break;case"style":e.style.cssText=A;break;case"class":z="className";default:e[z]=A}}else{e.setAttribute(z,A)}}}q=e.getAttribute("qtext");if(q){if(q.indexOf("html ")==0){q=q.split(" ");e.innerHTML=d(b,q[1])||""}else{e["value"in e?"value":j]=d(b,q)||""}}}}distal.resolve=function(a,b,x){if((x=a[b]))return x;b=b.split(".");x=0;while(b[x]&&(a=a[b[x++]]));return a};