(async function ($, $$) {
  $$("textarea.language-html.fill").forEach(
    (t) => (t.value = document.head.outerHTML)
  );

  var css = await fetch("css/prism-live.css");
  css = await css.text();

  $$("textarea.language-css.fill").forEach((t) => {
    t.value = css;
    t.dispatchEvent(new InputEvent("input"));
  });
})(Bliss, Bliss.$);

const preview = document.querySelector(".preview");
const editable = document.querySelector(".editable");
const textareaHTML = document.querySelector(".playable-html");
const textareaCSS = document.querySelector(".playable-css");
const resetHTML = document.querySelector(".reset-html");
const resetCSS = document.querySelector(".reset-css");
const resetAll = document.querySelector(".reset-all");
const htmlCode = textareaHTML.value;
const cssCode = textareaCSS.value;

function fillCode() {
  editable.innerHTML = textareaCSS.value;
  preview.innerHTML = textareaHTML.value;
}

resetAll.addEventListener("click", () => {
  textareaHTML.value = htmlCode;
  textareaCSS.value = cssCode;
  fillCode();
  // preview.attributeStyleMap.clear();
  preview.removeAttribute("style");
  localStorage.removeItem("htmlKey");
  localStorage.removeItem("cssKey");
  textareaHTML.focus();
  textareaCSS.focus();
});

function resetCode(el, code, key) {
  el.value = code;
  fillCode();
  preview.removeAttribute("style");
  localStorage.removeItem(key);
  el.focus();
}

function saveToLocal(el, key) {
  if (localStorage.getItem(key)) {
    el.value = localStorage.getItem(key);
    fillCode();
  }

  el.addEventListener("input", (e) => {
    fillCode();
    localStorage.setItem(key, el.value);
  });
}

const init = () => {
  saveToLocal(textareaHTML, "htmlKey");
  saveToLocal(textareaCSS, "cssKey");
};

init();

resetHTML.addEventListener("click", () => {
  resetCode(textareaHTML, htmlCode, "htmlKey");
});
resetCSS.addEventListener("click", () => {
  resetCode(textareaCSS, cssCode, "cssKey");
});
textareaHTML.addEventListener("input", fillCode);
textareaCSS.addEventListener("input", fillCode);
window.addEventListener("load", fillCode);
