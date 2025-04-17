(()=>{var __webpack_modules__={201:module=>{module.exports=function(obj){obj||(obj={});var __t,__p="";with(obj)__p+='<div class="container">\r\n    <h1>About Us</h1>\r\n</div>\r\n';return __p}},322:module=>{module.exports=function(obj){obj||(obj={});var __t,__p="";with(obj)__p+='<div class="container">\r\n    <h1>Contact Us</h1>\r\n\r\n    <p>Please fill out the provided webpage if there are any problems with the product form or the show products section.</p>\r\n\r\n    <form id="contact-form" method="POST">\r\n      <div class="mb-2">\r\n        <div class="mb-3">\r\n          <label for="name" class="form-label">Your Name</label>\r\n          <input type="text" class="form-control" id="name" name="name">\r\n        </div>\r\n        <div class="mb-3">\r\n          <label for="phone" class="form-label">Your Phone Number</label>\r\n          <input type="tel" class="form-control" id="phone" name="phone">\r\n        </div>\r\n        <div class="mb-3">\r\n          <label for="email" class="form-label">Your E-mail Address</label>\r\n          <input type="email" class="form-control" id="email" name="email">\r\n        </div>\r\n        <div class="mb-3">\r\n          <label for="message" class="form-label">Message</label>\r\n          <textarea class="form-control" id="message" name="message" rows="3"></textarea>\r\n        </div>\r\n        <div>\r\n          <button type="submit" class="btn btn-primary">Send Message</button>\r\n        </div>\r\n      </div>\r\n    </form>\r\n</div>';return __p}},375:(e,t,n)=>{e.exports=n.p+"img/twitter.22c7fa704ca950408ad7f1632f5b8183.svg"},791:module=>{module.exports=function(obj){obj||(obj={});var __t,__p="";with(obj)__p+='<div id="carouselExample" class="carousel slide">\r\n    <div class="carousel-inner">\r\n      <div class="carousel-item active">\r\n        <img src="'+(null==(__t=imgLink[0])?"":__t)+'" class="d-block w-100" alt="Everything is Object!">\r\n      </div>\r\n      <div class="carousel-item">\r\n        <img src="'+(null==(__t=imgLink[1])?"":__t)+'" class="d-block w-100" alt="Everything is Object!">\r\n      </div>\r\n      <div class="carousel-item">\r\n        <img src="'+(null==(__t=imgLink[2])?"":__t)+'" class="d-block w-100" alt="Everything is Object!">\r\n      </div>\r\n    </div>\r\n    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">\r\n      <span class="carousel-control-prev-icon" aria-hidden="true"></span>\r\n      <span class="visually-hidden">Previous</span>\r\n    </button>\r\n    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">\r\n      <span class="carousel-control-next-icon" aria-hidden="true"></span>\r\n      <span class="visually-hidden">Next</span>\r\n    </button>\r\n  </div>';return __p}}},__webpack_module_cache__={};function __webpack_require__(e){var t=__webpack_module_cache__[e];if(void 0!==t)return t.exports;var n=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](n,n.exports,__webpack_require__),n.exports}__webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var e;__webpack_require__.g.importScripts&&(e=__webpack_require__.g.location+"");var t=__webpack_require__.g.document;if(!e&&t&&(t.currentScript&&"SCRIPT"===t.currentScript.tagName.toUpperCase()&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");if(n.length)for(var a=n.length-1;a>-1&&(!e||!/^http(s?):/.test(e));)e=n[a--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/^blob:/,"").replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),__webpack_require__.p=e})(),(()=>{"use strict";const e=new t({host:"https://inft2202-server.onrender.com/",user:"100806066"});function t({host:e,user:t}){this.host=e,this.headers=new Headers({"Content-Type":"application/json",user:t})}t.prototype.findProduct=async function(e){const t=new URL(`/api/products/${encodeURIComponent(e)}`,this.host),n=new Request(t,{headers:this.headers,method:"GET"});try{return(await fetch(n)).json()}catch(e){return!1}},t.prototype.getProductPage=async function({page:e=1,perPage:t=8}){const n=new URLSearchParams({page:e,perPage:t}),a=new URL(`/api/products?${n.toString()}`,this.host),r=new Request(a,{headers:this.headers,method:"GET"});try{return(await fetch(r)).json()}catch(e){return!1}},t.prototype.saveProduct=async function(e){const t=new URL("/api/products",this.host),n=new Request(t,{headers:this.headers,method:"POST",body:JSON.stringify(e)});try{return(await fetch(n)).json()}catch(e){return!1}},t.prototype.updateProduct=async function(e){const t=new URL("/api/products",this.host),n=new Request(t,{headers:this.headers,method:"PUT",body:JSON.stringify(e)});try{return(await fetch(n)).json()}catch(e){return!1}},t.prototype.deleteProduct=async function(e){const t=new URL(`/api/products/${e}`,this.host),n=new Request(t,{headers:this.headers,method:"DELETE"});try{return 204===(await fetch(n)).status}catch(e){return!1}};const n=function(t){const{recordPage:n,productBuilder:a}=t,r=document.createElement("div");r.classList.add("container");const s=document.createElement("div");s.classList.add("text-center"),s.innerHTML='<i class="fa fa-5x fa-spinner fa-spin"></i>',r.append(s);const i=document.createElement("div");function o(t){return n=>{e.deleteProduct(t.name).then((()=>{window.location.reload()}))}}function c(e){return n=>{t.name=e.name,a(t)}}function l(t){return s.classList.remove("d-none"),e.getProductPage(t).then((e=>{r.textContent="";let{records:t,pagination:n}=e;s.classList.add("d-none");let a=document.createElement("div");a.classList.add("d-flex","justify-content-between");let i=document.createElement("h1");i.innerHTML="Product List",a.append(i),a.append(function({page:e=1,perPage:t=5,pages:n=10}){function a(e,n,a){const r=document.createElement("li");r.classList.add("page-item",a);const s=document.createElement("button");s.classList.add("page-link"),s.innerText=n;let i={page:e,perPage:t};return s.addEventListener("click",function(e){return t=>{l(e)}}(i)),r.append(s),r}const r=document.createElement("div");n>1&&r.classList.remove("d-none");const s=document.createElement("ul");s.classList.add("pagination"),s.append(a(e-1,"Previous",1==e?"disabled":null));for(let t=1;t<=n;t++)s.append(a(t,t,t==e?"active":null));return s.append(a(e+1,"Next",e==n?"disabled":null)),r.append(s),r}(n)),r.append(a),r.append(function(e){const t=document.createElement("table");t.classList.add("table","table-striped");const n=t.createTHead().insertRow();["Name","Description","Quantity","Price"].forEach((e=>{const t=document.createElement("th");t.textContent=e,n.appendChild(t)}));for(let n of e){const e=t.insertRow();e.insertCell().textContent=n.name,e.insertCell().textContent=n.description,e.insertCell().textContent=n.quantity,e.insertCell().textContent=n.price;const a=e.insertCell();a.classList.add();const r=document.createElement("button");r.classList.add("btn","btn-danger","mx-1"),r.innerHTML='<i class="fa fa-trash"></i>',r.addEventListener("click",o(animal)),a.append(r);const s=document.createElement("button");s.classList.add("btn","btn-primary","mx-1"),s.innerHTML='<i class="fa fa-user"></i>',s.addEventListener("click",c(animal)),a.append(s)}return t}(t))})).catch((e=>{s.classList.add("d-none"),i.innerHTML=e,i.classList.remove("d-none"),i.classList.add("alert-danger")})),r}return i.classList.add("alert","text-center","d-none"),r.append(i),{element:l(n)}};var a=__webpack_require__(791),r=__webpack_require__(322),s=__webpack_require__(201),i=__webpack_require__(375);!function(t){const o=document.querySelectorAll(".nav-item a");var c={recordPage:{page:1,perPage:10},name:null,productBuilder:function(n){o.forEach((e=>{e.classList.remove("active"),e.removeAttribute("aria-current")})),o[1].classList.add("active"),o[1].setAttribute("aria-current","page"),t.innerHTML="",t.append(function(t){const{name:n,listBuilder:a}=t,r=document.createElement("div");r.classList.add("container");let s=document.createElement("h1");s.innerHTML="Add Product",r.append(s),r.append(document.createElement("hr"));const i=document.createElement("form");function o(){const e=document.createElement("div");e.classList.add("mb-2");const t=document.createElement("div");t.classList.add("mb-3");let n='<input type="text" class="form-control" id="name" name="name">',a='<input type="text" class="form-control" id="name" name="name" value="" readonly>';t.innerHTML='<label for="name" class="form-label">Product Name</label>'+n+'<p class="text-danger d-none"></p>',e.append(t);const s=document.createElement("div");s.classList.add("mb-3"),n='<input type="text" class="form-control" id="description" name="description">',a='<input type="text" class="form-control" id="description" name="description" value="" readonly>',s.innerHTML='<label for="description" class="form-label">Product Descrption</label>'+n+'<p class="text-danger d-none"></p>',e.append(s);const o=document.createElement("div");o.classList.add("mb-3"),n='<input type="text" class="form-control" id="quantity" name="quantity">',a='<input type="text" class="form-control" id="quantity" name="quantity" value="" readonly>',o.innerHTML='<label for="quantity" class="form-label">Product Quantity</label>'+n+'<p class="text-danger d-none"></p>',e.append(o);const c=document.createElement("div");c.classList.add("mb-3"),n='<input type="text" class="form-control" id="price" name="price">',a='<input type="text" class="form-control" id="price" name="price" value="" readonly>',c.innerHTML='<label for="price" class="form-label">Product Price</label>'+n+'<p class="text-danger d-none"></p>',e.append(c);const l=document.createElement("div");return l.innerHTML='<button type="submit" class="btn btn-primary">Save Product <i class="fa-solid fa-check"></i></button>',e.append(l),i.append(e),r.append(i),r}function c(n){const r=function(){let e=!0;const t=i.name.value,n=i.name.nextElementSibling;""==t?(n.classList.remove("d-none"),n.textContent="You must name this product!",e=!1):n.classList.add("d-none");const a=i.description.value,r=i.description.nextElementSibling;""==a?(r.classList.remove("d-none"),r.textContent="What type of product is this?",e=!1):r.classList.add("d-none");const s=i.quantity.value,o=i.quantity.nextElementSibling;""==s?(o.classList.remove("d-none"),o.textContent="What is the quanity of product?",e=!1):isNaN(s)?(eleQuanityError.classList.remove("d-none"),o.textContent="This must be a number.",e=!1):o.classList.add("d-none");const c=i.price.value,l=i.price.nextElementSibling;return""==c?(l.classList.remove("d-none"),l.textContent="What is the price of product?",e=!1):isNaN(c)?(l.classList.remove("d-none"),l.textContent="This must be a number.",e=!1):l.classList.add("d-none"),e}();if(r){const r=new FormData(i),s={};r.forEach(((e,t)=>{s[t]="price"===t||"quantity"===t?Number(e):e}));const o=i.name.nextElementSibling;"new"==n?e.saveProduct([s]).then((e=>{a(t)})).catch((e=>{o.classList.remove("d-none"),o.textContent="Err in adding an product record!"})):e.updateProduct(animalObject).then((e=>{a(t)})).catch((e=>{o.classList.remove("d-none"),o.textContent="Err in updating product record!"})),o.classList.add("d-none")}else console.log("were not good")}return n?(s.innerText="Update Product",e.findProduct(n).then((e=>{if(0==e.length)throw"No record";animal=e[0],o(),i.addEventListener("submit",(function(e){e.preventDefault(),c("update")}))})).catch((e=>{s.innerHTML=e}))):(o(),i.addEventListener("submit",(function(e){e.preventDefault(),c("new")}))),{element:r}}(n).element)},listBuilder:function(e){e.name=null,o.forEach((e=>{e.classList.remove("active"),e.removeAttribute("aria-current")})),o[2].classList.add("active"),o[2].setAttribute("aria-current","page"),t.innerHTML="",t.append(n(e).element)},contactBuilder:function(e){e.name=null,o.forEach((e=>{e.classList.remove("active"),e.removeAttribute("aria-current")})),o[3].classList.add("active"),o[3].setAttribute("aria-current","page"),t.innerHTML=r()},aboutBuilder:function(e){e.name=null,o.forEach((e=>{e.classList.remove("active"),e.removeAttribute("aria-current")})),o[4].classList.add("active"),o[4].setAttribute("aria-current","page"),t.innerHTML=s()},coverBuilder:function(e){e.name=null,o.forEach((e=>{e.classList.remove("active"),e.removeAttribute("aria-current")})),o[0].classList.add("active"),o[0].setAttribute("aria-current","page"),t.innerHTML=a({imgLink:["./img/everything_is_object1.png","./img/everything_is_object2.png","./img/everything_is_object3.png"]})}};const l=async()=>{const e=[{path:"/",view:()=>c.coverBuilder(c)},{path:"/product",view:()=>c.productBuilder(c)},{path:"/list",view:()=>c.listBuilder(c)},{path:"/contact",view:()=>c.contactBuilder(c)},{path:"/about",view:()=>c.aboutBuilder(c)}];let t=e.map((e=>({route:e,isMatch:location.pathname===e.path}))).find((e=>e.isMatch));t||(t={route:e[0],isMatch:!0}),t.route.view()};window.addEventListener("popstate",l),document.addEventListener("DOMContentLoaded",(()=>{document.body.addEventListener("click",(e=>{var t;e.target.matches("[data-link]")&&(e.preventDefault(),t=e.target.href,history.pushState(null,null,t),l())})),l()}));let d=document.querySelector(".ms-3 a");const u=document.createElement("img");u.src=i,u.width=24,u.height=24,d.appendChild(u)}(document.querySelector("main"))})()})();
//# sourceMappingURL=bundle.js.map