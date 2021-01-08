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

const editors = document.querySelectorAll(".editor");
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
  editors.forEach((editor) => {
    const reset = editor.querySelector(":scope button");
    editor.open = true;
    reset.disabled = true;
  });
  textareaHTML.focus();
  textareaCSS.focus();
});

function resetCode(el, code, key, reset = undefined) {
  el.value = code;
  fillCode();
  preview.removeAttribute("style");
  localStorage.removeItem(key);
  el.focus();

  if (el.value !== code) {
    reset.disabled = false;
  } else {
    reset.disabled = true;
  }
}

function saveToLocal(el, key, code = undefined, reset = undefined) {
  if (localStorage.getItem(key)) {
    el.value = localStorage.getItem(key);
    fillCode();

    if (el.value !== code) {
      reset.disabled = false;
    } else {
      reset.disabled = true;
    }
  }

  el.addEventListener("input", (e) => {
    fillCode();
    localStorage.setItem(key, el.value);

    if (el.value !== code) {
      reset.disabled = false;
    } else {
      reset.disabled = true;
    }
  });
}

const init = () => {
  saveToLocal(textareaHTML, "htmlKey", htmlCode, resetHTML);
  saveToLocal(textareaCSS, "cssKey", cssCode, resetCSS);

  if (textareaHTML.value !== htmlCode) {
    resetHTML.disabled = false;
  } else {
    resetHTML.disabled = true;
  }

  if (textareaCSS.value !== cssCode) {
    resetCSS.disabled = false;
  } else {
    resetCSS.disabled = true;
  }
};

init();

resetHTML.addEventListener("click", () => {
  resetCode(textareaHTML, htmlCode, "htmlKey", resetHTML);
});
resetCSS.addEventListener("click", () => {
  resetCode(textareaCSS, cssCode, "cssKey", resetCSS);
});
textareaHTML.addEventListener("input", fillCode);
textareaCSS.addEventListener("input", fillCode);
window.addEventListener("load", fillCode);
