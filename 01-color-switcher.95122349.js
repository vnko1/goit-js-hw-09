const e=document.body,t=e.querySelector("[data-start]"),o=e.querySelector("[data-stop]");let r;function a(){return`#${Math.floor(16777215*Math.random()).toString(16)}`}o.disabled="disabled",e.style.backgroundColor=localStorage.getItem("color"),t.addEventListener("click",(function({target:t}){r=setInterval((()=>e.style.backgroundColor=a()),1e3),t.disabled="disabled",o.removeAttribute("disabled")})),o.addEventListener("click",(function({target:o}){clearInterval(r),o.disabled="disabled",t.removeAttribute("disabled"),localStorage.setItem("color",e.style.backgroundColor)}));
//# sourceMappingURL=01-color-switcher.95122349.js.map
