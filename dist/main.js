!function(e){var t={};function s(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=t,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(i,r,function(t){return e[t]}.bind(null,r));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=5)}([function(e,t){e.exports=class extends SyntaxError{constructor(e,t,s){let i="";for(let e=0;e<t;e++)i+=" ";throw super(e+s+"\n"+i+"^")}}},function(e,t){e.exports=class{constructor(e,t){this.type="Unary",this.operator=e,this.right=t}}},function(e,t){e.exports=class{constructor(e,t,s){this.type="Grouping",this.left=e,this.expr=t,this.right=s}}},function(e,t){const s=Object.freeze({LEFT_PAREN:"(",RIGHT_PAREN:")",DOT:".",COLON:":",EOF:"(end)",NOT:"not",AND:"and",OR:"or"});e.exports=s},function(e,t){e.exports=class{constructor(e,t,s){this.type=e,this.lexeme=t,this.literal=s,void 0!==arguments[3]&&(this.begin=arguments[3],this.end=arguments[4])}toString(){return this.type+" "+this.lexeme+" "+this.literal}}},function(e,t,s){const i=s(6),r=s(7),n=s(0),h=s(11),o=s(12);let a=document.getElementById("inQuery"),l=document.getElementById("result"),u=new h(a),c=new o;function p(){try{let e=a.innerText,t=u.position;0!==arguments[0]&&c.addState(e,t);let s=new r(e).parse();l.value=JSON.stringify(s,null,4);let h=new i(s,e);a.innerHTML=h.getResult(),u.position=t}catch(e){e instanceof n?l.value=e:(document.getElementById("result").value=e,l.value=e)}}c.addState("",0),a.addEventListener&&a.addEventListener("input",p,!1),document.onkeydown=function(e){if(90===e.keyCode&&e.ctrlKey&&e.shiftKey){let e=c.redo();-1!==e&&(a.innerText=e.line,u.position=e.pos,p(0))}else if(90===e.keyCode&&e.ctrlKey){let e=c.undo();-1!==e&&(a.innerText=e.line,u.position=e.pos,p(0))}}},function(e,t,s){const i=s(1),r=s(2);e.exports=class{constructor(e,t){this.resString=this.traverse(e,t)}wrapper(e,t){return'<span class="'+t+'">'+e+"</span>"}traverse(e,t){let s="";if(e instanceof r)s+=this.wrapper(t.substring(e.left.begin,e.left.end),"Parentheses"),s+=this.traverse(e.expr,t),s+=this.wrapper(t.substring(e.right.begin,e.right.end),"Parentheses");else for(let n in e)if(!(e[n]instanceof Object)||e[n]instanceof i||"minus"===n||e[n]instanceof r||"attributeFilter"===n||"value"===n){if(e[n]instanceof r)s+=this.wrapper(t.substring(e[n].left.begin,e[n].left.end),"Parentheses"),s+=this.traverse(e[n].expr,t),s+=this.wrapper(t.substring(e[n].right.begin,e[n].right.end),"Parentheses");else if("type"===n)switch(e.type){case"QuotedText":case"NegativeText":case"key":case"Attribute":case"Value":case"ValueRange":s+=this.wrapper(t.substring(e.begin,e.end),e.type);break;case"NegativeSingleValue":s+=this.wrapper(t.substring(e.minus.begin,e.minus.end),"operator"),s+=this.wrapper(t.substring(e.begin,e.end),e.type);break;case"PositiveSingleValue":s+=this.wrapper(t.substring(e.operator.begin,e.operator.end),"operator"),s+=this.wrapper(t.substring(e.begin,e.end),e.type);break;case"OPERATOR":case":":case"-":"begin"in e?s+=this.wrapper(t.substring(e.begin,e.end),"operator"):"or"===e.lexeme&&(s+=this.wrapper(t.substring(e.begin,e.end),"operator"))}else if("attributeFilter"===n||"value"===n){"operator"in e[n][0]&&(s+=this.wrapper(t.substring(e[n][0].operator.begin,e[n][0].operator.end),"operator")),s+=this.wrapper(t.substring(e[n][0].begin,e[n][0].end),e[n][0].type),"order"in e[n][0]&&(s+=this.wrapper(t.substring(e[n][0].order.begin,e[n][0].order.end),"order"));for(let i=1;i<e[n].length;i++)s+=this.wrapper(t.substring(e[n][i].begin,e[n][i].end),"operator"),i++,"operator"in e[n][i]&&(s+=this.wrapper(t.substring(e[n][i].operator.begin,e[n][i].operator.end),"operator")),s+=this.wrapper(t.substring(e[n][i].begin,e[n][i].end),e[n][i].type),"order"in e[n][i]&&(s+=this.wrapper(t.substring(e[n][i].order.begin,e[n][i].order.end),"order"))}}else s+=this.traverse(e[n],t);return s}getResult(){return this.resString}}},function(e,t,s){const i=s(8),r=s(3),n=s(9),h=s(0),o=s(4),a=s(10),l=s(1),u=s(2);class c{constructor(e,t,s){this.type=e,this.begin=t,this.end=s}}class p extends c{constructor(e,t,s){super("QuotedText",e.begin,s.end),this.leftQuote=e,this.lexeme=t.lexeme,this.literal=t.literal,this.begin=e.begin,this.end=s.end,this.rightQuote=s}}class d extends c{constructor(e,t){super("NegativeText",e.begin,t.end),this.minus=e,this.text=t}}class g extends c{constructor(e,t){super("PositiveSingleValue",t.begin,t.end),this.operator=e,this.lexeme=t.lexeme,this.literal=t.literal}}class f extends c{constructor(e,t){super("NegativeSingleValue",t.begin,t.end),this.minus=e,t instanceof b?(this.left_lexeme=t.leftVal.lexeme,this.left_lexeme_begin=t.leftVal.begin,this.left_lexeme_end=t.leftVal.end,this.left_literal=t.leftVal.literal,this.right_lexeme=t.rightVal.lexeme,this.right_lexeme_begin=t.rightVal.begin,this.right_lexeme_end=t.rightVal.end,this.right_literal=t.rightVal.literal,this.vr_operator=t.operator,this.begin=t.leftVal.begin,this.end=t.rightVal.end):(this.lexeme=t.lexeme,this.literal=t.literal)}}class b{constructor(e,t,s){this.type="ValueRange",this.leftVal=e,this.operator=t,this.rightVal=s,this.begin=e.begin,this.end=s.end}}class x{constructor(e){e instanceof b?(this.type="ValueRange",this.left_lexeme=e.leftVal.lexeme,this.left_lexeme_begin=e.leftVal.begin,this.left_lexeme_end=e.leftVal.end,this.left_literal=e.leftVal.literal,this.right_lexeme=e.rightVal.lexeme,this.right_lexeme_begin=e.rightVal.begin,this.right_lexeme_end=e.rightVal.end,this.right_literal=e.rightVal.literal,this.vr_operator=e.operator,this.begin=e.leftVal.begin,this.end=e.rightVal.end):e instanceof f?(this.type=e.type,this.operator=e.minus,void 0!==e.left_lexeme?(this.left_lexeme=e.left_lexeme,this.left_lexeme_begin=e.left_lexeme_begin,this.left_lexeme_end=e.left_lexeme_end,this.left_literal=e.left_literal,this.right_lexeme=e.right_lexeme,this.right_lexeme_begin=e.right_lexeme_begin,this.right_lexeme_end=e.right_lexeme_end,this.right_literal=e.right_literal,this.vr_operator=e.vr_operator,this.begin=e.begin,this.end=e.end):(this.lexeme=e.lexeme,this.literal=e.literal,this.begin=e.begin,this.end=e.end)):(this.type="WORD"===e.type?"Value":e.type,this.lexeme=e.lexeme,this.literal=e.literal,this.begin=e.begin,this.end=e.end)}}class m{constructor(e){this.type="Attribute",this.lexeme=e.lexeme,this.literal=e.literal,this.begin=e.begin,this.end=e.end,e instanceof f&&(this.begin=e.minus.end,this.operator=e.minus),void 0!==arguments[1]&&(this.operator=arguments[1])}}class k extends c{constructor(e,t,s){super("Has",e.begin,s.end),this.key=e,this.key.type="key",this.operator=t,this.value=[],void 0!==arguments[3]?this.value.push(new m(s,arguments[3])):this.value.push(new m(s))}addAttribute(e,t){this.value.push(t),this.value.push(new m(e)),this.end=e.end}}class y extends c{constructor(e,t,s){super("CategorizedFilter",e.begin,s instanceof b?s.rightVal.end:s.end),this.attribute=e,this.operator=t,this.attributeFilter=[],this.attributeFilter.push(new x(s))}addAttributeFilter(e,t){this.end=e instanceof b?e.rightVal.end:e.end,this.attributeFilter.push(t),this.attributeFilter.push(new x(e))}}class v{constructor(e){this.type=e.type,this.lexeme=e.lexeme,this.literal=e.literal,this.begin=e.begin,this.end=e.end,void 0!==arguments[1]&&(this.order=arguments[1])}}class _ extends c{constructor(e,t,s){super("Sort",e.begin,s.end),this.key=e,this.key.type="key",this.operator=t,this.value=[],void 0!==arguments[3]?(this.value.push(new v(s,arguments[3])),this.end=arguments[3].end):this.value.push(new v(s))}addValue(e,t){this.value.push(t),void 0!==arguments[2]?(this.value.push(new v(e,arguments[2])),this.end=arguments[2].end):(this.value.push(new v(e)),this.end=e.end)}}e.exports=class{constructor(e){this.str=e;let t=new i(this.str);this.tokens=t.scanTokens(),this.current=0}getTree(){return this.orExpression()}parse(){let e=this.getTree();for(;this.current<this.tokens.length-1||e instanceof o;){let t=new o("OPERATOR","and","and"),s=this.getTree();s instanceof o&&this.error("Incomplete query after: '"+this.tokens[this.current-2].literal+"'\n",s.begin),e=new a(e,t,s)}return e}orExpression(){let e=this.andExpression();for(;this.matchOperator(r.OR);){let t=this.previous();t.type="OPERATOR";let s=this.andExpression();s.type===n.WORD&&this.error("Incomplete query after:\n",s.begin-1),e=new a(e,t,s)}return e}andExpression(){let e=this.andOperand();for(;this.matchOperator(r.AND);){let t=this.previous();t.type="OPERATOR";let s=this.andOperand();s.type===n.WORD&&this.error("Incomplete query after: \n",s.begin-1),e instanceof y||e instanceof k||e instanceof _||e instanceof g||e instanceof f||e instanceof u||this.error("Missing parentheses before 'and' operator:\n",t.begin-1),e=new a(e,t,s)}return e}andOperand(){let e=this.item(),t=e;for(;this.match(",");){let s=this.previous(),i=this.item("value");if(this.current--,this.match(n.WORD,n.QUOTED_TEXT,n.COMPLEX_VALUE))if(i instanceof g&&this.error("Unexpected PositiveSingleValue: \n",i.begin),t instanceof y)e.addAttributeFilter(i,s);else if(i instanceof b)this.error(t.type+" can not have '"+i.type+"' value.\n",i.begin);else if(i.type="Value",t instanceof k)e.addAttribute(i,s);else if(t instanceof _){i instanceof f&&this.error(t.type+" can not have '"+i.type+"' value.\n",i.begin);let r=this.tokens[this.current];r.type===n.WORD?"asc"!==r.literal&&"desc"!==r.literal||(e.addValue(i,s,r),this.current++):e.addValue(i,s)}else this.error(e.type+" does not support comma operator:\n",e.right.begin);else this.error("Unexpected value after comma:\n",i.begin)}return e}item(){let e=this.unary(arguments[0]||"key");if(this.match(r.COLON)){let t=this.previous();if("-"===this.tokens[this.current].type){let s=this.advance();"sort by"===e.lexeme&&this.error("'"+e.lexeme+"' can't have minus symbol\n",s.begin);let i=this.unary();if("has"===e.lexeme)e=new k(e,t,i,s);else if(this.match("..")){let r=new b(i,this.previous(),this.unary());e=new y(new m(e),t,new f(s,r))}else e=new y(new m(e),t,new f(s,i))}else if("#"===this.tokens[this.current].type)this.error("Unexpected PositiveSingleValue in 'value':\n",this.tokens[this.current].begin);else{let s=this.unary();if(this.match("..")){let i=new b(s,this.previous(),this.unary());"has"===e.lexeme||"sort by"===e.lexeme?this.error("'"+e.lexeme+"' can't have ValueArrange value\n",s.begin):e=new y(new m(e),t,i)}else s.type="QuotedText"!==s.type?"Value":s.type,e="has"===e.lexeme?new k(e,t,s):"sort by"===e.lexeme?"asc"===this.tokens[this.current].lexeme||"desc"===this.tokens[this.current].lexeme?new _(e,t,s,this.advance()):new _(e,t,s):new y(new m(e),t,s)}}else{if(e instanceof p)return e;if("operator"in e)"#"!==e.operator.type&&"-"!==e.operator.type?this.error("Missing ':'\n",e.end):"#"===e.operator.type?e=new g(e.operator,e.right):"-"===e.operator.type?e=e.right instanceof p?new d(e.operator,e.right):new f(e.operator,e.right):this.error("Unexpected operator:\n",e.operator.begin);else{if("expr"in e)return e;if(this.isAtEnd())return e;if(this.match(".."))return new b(e,this.previous(),this.unary());if("value"===arguments[0])return e;this.error("Unexpected word:\n",e.begin)}}return e}unary(){if(this.match("#")||this.match("-")){let e=this.previous();if("key"===arguments[0]){let t=this.primary();return new l(e,t)}{let t=this.item("value");return new l(e,t)}}return void 0!==arguments[0]?this.primary(arguments[0]):this.primary()}primary(){if(this.tokens[this.current].type===n.WORD&&"key"===arguments[0]){this.current++;let e=this.previous();e.lexeme.toUpperCase()in r&&this.error("Operator '"+e.lexeme.toUpperCase()+"' can not be key.\n",e.begin);for(;this.match(n.WORD);)this.previous().lexeme.toUpperCase()in r&&this.error("Operator '"+this.previous().lexeme.toUpperCase()+"' can not be key.\n",this.previous().begin),e.lexeme+=" "+this.previous().lexeme,e.literal+=" "+this.previous().literal,e.end=this.previous().end;return e}if(this.match(n.WORD,n.COMPLEX_VALUE)){let e=this.previous();if(e.lexeme.toUpperCase()in r&&this.error("Operator '"+e.lexeme.toUpperCase()+"' can not be value.\n",e.begin),"sort"===e.lexeme){let t=this.advance();"by"===t.lexeme&&(e.lexeme+=" "+t.lexeme,e.literal+=" "+t.literal,e.end=t.end)}return this.previous()}if(this.match('"'))return new p(this.previous(),this.advance(),this.advance());if(this.match(r.LEFT_PAREN)){let e=this.previous(),t=this.orExpression();this.check(r.RIGHT_PAREN)?this.advance():this.error("Missing ')' after expression:\n",this.str.length);let s=this.tokens[this.current-1];return new u(e,t,s)}this.tokens[this.current-1].type!==r.LEFT_PAREN?this.error("Expect AndOperand after '"+this.tokens[this.current-1].lexeme+"'\n",this.tokens[this.current-1].end):this.error("Expect OrExpression after '"+this.tokens[this.current-1].lexeme+"'\n",this.str.length)}match(){for(let e=0;e<arguments.length;e++)if(this.check(arguments[e]))return this.advance(),!0;return!1}matchOperator(){for(let e=0;e<arguments.length;e++)if(this.checkOperator(arguments[e]))return this.advance(),!0;return!1}check(e){return!this.isAtEnd()&&this.peek().type===e}checkOperator(e){return!this.isAtEnd()&&this.peek().lexeme===e}advance(){return this.isAtEnd()||this.current++,this.previous()}isAtEnd(){return this.peek().type===r.EOF}peek(){return this.tokens[this.current]}previous(){return this.tokens[this.current-1]}error(e,t){new h(e,t,this.str)}}},function(e,t,s){const i=s(3),r=s(0),n=s(4);e.exports=class{constructor(e){this.str=e,this.start=0,this.current=0,this.tokens=[]}scanTokens(){for(;!this.isAtEnd();)this.start=this.current,this.scanToken();return this.tokens.push(new n(i.EOF,"",null)),this.tokens}scanToken(){let e=this.advance();switch(!0){case/[(]/.test(e):this.current-1>0&&("-"!==this.tokens[this.tokens.length-1].type&&"#"!==this.tokens[this.tokens.length-1].type||this.error("Unexpected token '"+this.tokens[this.tokens.length-1].type+"':\n",this.tokens[this.tokens.length-1].begin)," "!==this.str[this.current-2]&&"("!==this.str[this.current-1]&&this.error("Unexpected token:\n",this.current)),this.addToken(i.LEFT_PAREN,"(",this.start,this.current);break;case/[)]/.test(e):this.addToken(i.RIGHT_PAREN,")",this.start,this.current);break;case/[{]/.test(e):{let e=this.stringBrace();this.addToken("COMPLEX_VALUE",e,this.start,this.current);break}case/[\-]/.test(e):this.current-1>0&&("-"!==this.tokens[this.tokens.length-1].type&&"#"!==this.tokens[this.tokens.length-1].type||this.error("Unexpected token '"+this.str[this.start]+"':\n",this.start)),this.addToken("-","-",this.start,this.current);break;case/[#]/.test(e):this.current-1>0&&("#"!==this.tokens[this.tokens.length-1].type&&"-"!==this.tokens[this.tokens.length-1].type||this.error("Unexpected token '"+this.str[this.start]+"':\n",this.start)),this.addToken("#","#",this.start,this.current);break;case/["]/.test(e):{this.addToken('"','"',this.start,this.current);let e=this.stringQuote();this.addToken("QUOTED_TEXT",e,this.start,this.current),this.addToken('"','"',this.current-1,this.current);break}case/[:]/.test(e):this.addToken(":",":",this.start,this.current);break;case/[.]/.test(e):"."!==this.str[this.current]?this.error("Unexpected token:\n",this.current-1):(this.advance(),this.addToken("..","..",this.start,this.current));break;case/[\,]/.test(e):this.addToken(",",",",this.start,this.current);break;case/[\s]/.test(e):this.tokens[this.tokens.length-1].end++;break;default:this.isAlphaNumeric(e)?this.identifier():this.error("Unexpected token:\n",this.current-1)}}isAtEnd(){return this.current>=this.str.length}advance(){return this.current++,this.str[this.current-1]}addToken(e){if(void 0===arguments[1])this.tokens.push(new n(e,null));else if("object"==typeof arguments[1]&&void 0===arguments[2]){let t=this.str.substring(this.start-this.current);this.tokens.push(new n(e,t,arguments[1]))}else void 0!==arguments[2]?this.tokens.push(new n(e,arguments[1].toString(),arguments[1],arguments[2],arguments[3])):this.tokens.push(new n(e,arguments[1].toString(),arguments[1]))}isDigit(e){return/[\d]/.test(e)}peek(){return this.isAtEnd()?"\0":this.str[this.current]}stringBrace(){for(;"}"!==this.peek()&&!this.isAtEnd();)this.advance();return this.isAtEnd()&&this.error("SyntaxError: missing '}':\n",this.current),this.advance(),this.str.substring(this.start+1,this.current-1)}stringQuote(){for(;'"'!==this.peek()&&!this.isAtEnd();)this.advance();return this.isAtEnd()&&this.error("SyntaxError: missing '\"':\n",this.current),this.advance(),this.str.substring(this.start+1,this.current-1)}isAlpha(e){return/[a-zA-Z_\-*?.]/.test(e)}identifier(){for(;this.isAlphaNumeric(this.peek());)this.advance();for(;" "===this.str[this.current];)this.advance();let e=this.str.substring(this.start,this.current);if(-1!==e.indexOf("..")){let t=this.start+e.indexOf("..");this.addToken("WORD",this.str.substring(this.start,t).replace(/ /g,""),this.start,t);let s=0;for(;" "===this.str[t+2+s];)s++;this.addToken("..","..",t,t+2+s),""!==this.str.substring(t+2,this.current).replace(/ /g,"")&&this.addToken("WORD",this.str.substring(t+2,this.current).replace(/ /g,""),t+2,this.current)}else this.addToken("WORD",this.str.substring(this.start,this.current).replace(/ /g,""),this.start,this.current)}isAlphaNumeric(e){return this.isDigit(e)||this.isAlpha(e)}error(e,t){new r(e,t,this.str)}}},function(e,t){const s=Object.freeze({TRUE:!0,FALSE:!1,NULL:null,WORD:"WORD",COMPLEX_VALUE:"COMPLEX_VALUE",SIMPLE_VALUE:"SIMPLE_VALUE",QUOTED_TEXT:"QUOTED_TEXT",ATTRIBUTE:"ATTRIBUTE",SORT_ATTRIBUTE:"SORT_ATTRIBUTE",SINGLE_VALUE:"SINGLE_VALUE",OPERATOR:"OPERATOR"});e.exports=s},function(e,t){e.exports=class{constructor(e,t,s){this.type="Binary",this.left=e,this.operator=t,this.right=s}}},function(e,t){e.exports=class{constructor(e){this.field=e}get position(){if(this.pos=0,this.anchorNode=window.getSelection().anchorNode,this.offset=window.getSelection().anchorOffset,this.anchorNode.parentNode===this.field)this.pos=this.offset;else{let e=this.anchorNode;for(;e!==this.field;){for(;null!==e.previousSibling;)this.pos+=e.previousSibling.textContent.length,e=e.previousSibling;e=e.parentNode}this.pos+=this.offset}return this.pos}set position(e){let t=this.field,s=0,i=-1;for(;s<e;)if(i++,null!==t.childNodes[i])s+=t.childNodes[i].textContent.length;else if(0===(t=t.childNodes[i]).childNodes.length)break;-1!==i&&(t=t.childNodes[i]),document.getSelection().collapse(void 0!==t.firstChild&&null!==t.firstChild?t.firstChild:t,e-(s-t.textContent.length))}}},function(e,t){e.exports=class{constructor(){this.undoStack=[],this.redoStack=[]}undo(){return 0===this.undoStack.length?-1:(this.redoStack.push(this.undoStack.pop()),this.undoStack[this.undoStack.length-1])}redo(){if(0===this.redoStack.length)return-1;let e=this.redoStack.pop();return this.undoStack.push(e),e}addState(e,t){this.undoStack.push({line:e,pos:t}),this.redoStack=[]}}}]);