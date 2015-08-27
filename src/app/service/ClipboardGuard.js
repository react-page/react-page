/*
 $('#pasteDummy').bind('paste', function (e) {
 //e.preventDefault(); //disable cut,copy,paste
 handlepaste(this, e);
 });

 function f(k)  {
 console.log('doing');
 return (k instanceof Node);
 }

 $('body').bind('copy cut', function (e) {
 var nodes = getSelectedNodes();
 prevSel = window.getSelection();

 var r1 = document.createRange();
 r1.selectNode(nodes[0]);
 window.getSelection().addRange(r1);
 var r2 = document.createRange();
 r2.selectNode(nodes[nodes.length-1]);
 window.getSelection().addRange(r2);
 });


 $('#derp').focus();

 var state = {
 previousFocus: null,
 ctrl: false,
 v: false,
 }

 $('body').bind('keydown', function (e) {
 if (e.target.closest('[contenteditable=true], textarea, input') !== null) {
 return;
 }

 var code = e.keyCode || e.which;
 if (code == 17) {
 state.ctrl = true;
 }
 if (code == 86) {
 state.v = true;
 }
 if (state.ctrl && state.v) {
 state.previousFocus = document.activeElement;
 $('#pasteDummy').focus();
 console.log('focused');
 }
 });

 $('body').bind('keyup', function (e) {
 var code = e.keyCode || e.which,
 reset = state.ctrl + state.v;
 if (code == 17) {
 state.ctrl = false;
 }
 if (code == 86) {
 state.v = false;
 }
 if (state.previousFocus) {
 state.previousFocus.focus();
 }
 });

 function handlepaste(elem, e) {
 var savedcontent = elem.innerHTML;
 if (e && e.clipboardData && e.clipboardData.getData) { // Webkit - get data from clipboard, put into editdiv, cleanup, then cancel event
 if (/text\/html/.test(e.clipboardData.types)) {
 elem.innerHTML = e.clipboardData.getData('text/html');
 } else if (/text\/plain/.test(e.clipboardData.types)) {
 elem.innerHTML = e.clipboardData.getData('text/plain');
 } else {
 elem.innerHTML = "";
 }
 waitforpastedata(elem, savedcontent);
 if (e.preventDefault) {
 e.stopPropagation();
 e.preventDefault();
 }
 return false;
 } else { // Everything else - empty editdiv and allow browser to paste content into it, then cleanup
 elem.innerHTML = "";
 waitforpastedata(elem, savedcontent);
 return true;
 }
 }

 function waitforpastedata(elem, savedcontent) {
 if (elem.childNodes && elem.childNodes.length > 0) {
 processpaste(elem, savedcontent);
 } else {
 that = {
 e: elem,
 s: savedcontent
 }
 that.callself = function () {
 waitforpastedata(that.e, that.s)
 }
 setTimeout(that.callself, 20);
 }
 }

 function processpaste(elem, savedcontent) {
 pasteddata = elem.innerHTML;
 //^^Alternatively loop through dom (elem.childNodes or elem.getElementsByTagName) here

 //elem.innerHTML = savedcontent;
 console.log(pasteddata);
 }


 function nextNode(node) {
 if (node.hasChildNodes()) {
 return node.firstChild;
 } else {
 while (node && !node.nextSibling) {
 node = node.parentNode;
 }
 if (!node) {
 return null;
 }
 return node.nextSibling;
 }
 }

 function getRangeSelectedNodes(range) {
 var node = range.startContainer;
 var endNode = range.endContainer;

 // Special case for a range that is contained within a single node
 if (node == endNode) {
 return [node];
 }

 // Iterate nodes until we hit the end container
 var rangeNodes = [];
 while (node && node != endNode) {
 rangeNodes.push( node = nextNode(node) );
 }

 // Add partially selected nodes at the start of the range
 node = range.startContainer;
 while (node && node != range.commonAncestorContainer) {
 rangeNodes.unshift(node);
 node = node.parentNode;
 }

 return rangeNodes;
 }

 function getSelectedNodes() {
 if (window.getSelection) {
 var sel = window.getSelection();
 if (!sel.isCollapsed) {
 return getRangeSelectedNodes(sel.getRangeAt(0));
 }
 }
 return [];
 }

 */
