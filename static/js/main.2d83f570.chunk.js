(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,a){e.exports=a(18)},16:function(e,t,a){},17:function(e,t,a){},18:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),s=a(3),l=a.n(s),c=(a(16),a(4)),r=a(5),i=a(6),m=a(8),u=a(7),h=a(1),g=a(9),f=(a(17),function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).state={facebookToken:"104209816294440|xVZhfKIU2_TsCnsimmUoaM0YU68",pageName:"dominicprimar",status:"waiting",postMessage:"",commentsList:[]},a.handleChange=a.handleChange.bind(Object(h.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(h.a)(a)),a}return Object(g.a)(t,e),Object(i.a)(t,[{key:"handleChange",value:function(e){this.setState(Object(c.a)({},e.target.name,e.target.value))}},{key:"handleSubmit",value:function(e){if(e.preventDefault(),""===this.state.pageName)alert("Please provide a facebook page name!");else{var t=this.state.pageName,a=this.state.facebookToken;this.setState({status:"getting post from page - ".concat(t)}),this.fetchPostForPage(t,a)}}},{key:"fetchPostForPage",value:function(e,t){var a=this,n="https://graph.facebook.com/v2.9/".concat(e,"/posts?limit=1&access_token=").concat(t);fetch(n).then(function(e){if(console.log("result: ",e),!1!==e.ok||404!==e.status)return e.json();a.setState({status:"wrong facebook page name"})}).then(function(e){e&&e.data&&(console.log(" json result: ",e),a.setState({postMessage:e.data[0].message,status:"getting comments for the last post"}),a.fetchCommentsForAPost(e.data[0].id,t))})}},{key:"fetchCommentsForAPost",value:function(e,t){var a=this,n="https://graph.facebook.com/v2.9/".concat(e,"?fields=comments{message,comment_count,comments}&access_token=").concat(t);fetch(n).then(function(e){if(console.log("result: ",e),!1!==e.ok||404!==e.status)return e.json();a.setState({status:"error getting comments"})}).then(function(e){if(e&&e.comments&&e.comments.data){var t=e.comments.data;console.log("json result: ",t),a.setState({commentsList:t,status:"waiting"})}})}},{key:"renderList",value:function(e){var t=e.map(function(e){return o.a.createElement("li",{key:e.id},e.message)});return o.a.createElement("ul",null," ",t," ")}},{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement("header",{className:"App-header"},o.a.createElement("form",{onSubmit:this.handleSubmit,style:{alignItems:"flex-start"}},o.a.createElement("label",null,"Facebook Token:",o.a.createElement("input",{type:"text",name:"facebookToken",style:{width:290,height:12,marginLeft:"16px"},value:this.state.facebookToken,onChange:this.handleChange})),o.a.createElement("br",null),o.a.createElement("label",{style:{fontSize:10,color:"gray"}},"Don't change this unless you know what you are doing!"),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("label",null,"Facebook Page Name (or ID):",o.a.createElement("input",{type:"text",name:"pageName",style:{width:200,height:16,margin:"16px"},value:this.state.pageName,onChange:this.handleChange})),o.a.createElement("input",{type:"submit",value:"Import",style:{height:16}})),o.a.createElement("label",null," Status: ",this.state.status),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("label",null," Last Post: ",this.state.postMessage),o.a.createElement("br",null),o.a.createElement("label",null," Comments: ",this.renderList(this.state.commentsList))))}}]),t}(o.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement(f,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[10,1,2]]]);
//# sourceMappingURL=main.2d83f570.chunk.js.map