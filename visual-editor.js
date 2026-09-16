/**
 * SAMI PERFUME — Visual Front-End Editor
 * Standalone script. Paste one <script> tag at the bottom of index.html.
 * Activates on page load. Zero impact on existing code.
 */
(function () {
  'use strict';

  /* ── CONFIG ──────────────────────────────────────────────── */
  const STORAGE_KEY = 'sami_perfume_saved_html';
  const EDIT_CLASS  = 've-editing';          // class added to <body> while edit mode is ON
  const HOVER_CSS   = 'outline:2px dashed #c9a84c !important; outline-offset:2px; cursor:pointer; transition:outline .12s;';
  const ACTIVE_CSS  = 'outline:2px solid #c9a84c !important; outline-offset:2px; background:rgba(201,168,76,.06) !important;';
  const STYLE_ID    = 've-injected-styles';

  /* ── STATE ───────────────────────────────────────────────── */
  let editMode = false;

  /* ── INJECT STYLES (once) ───────────────────────────────── */
  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent = `
      /* ---- floating panel ---- */
      #ve-panel{all:initial;position:fixed;bottom:18px;left:18px;z-index:99999;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;font-size:13px;display:flex;gap:6px;align-items:center;padding:7px 12px;background:linear-gradient(135deg,#1a1a2e,#16213e);border-radius:12px;box-shadow:0 6px 28px rgba(0,0,0,.35);user-select:none;transition:opacity .3s;}
      #ve-panel button{all:unset;box-sizing:border-box;cursor:pointer;padding:7px 14px;border-radius:7px;font-size:12px;font-weight:600;color:#fff;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);transition:all .18s;white-space:nowrap;}
      #ve-panel button:hover{background:rgba(255,255,255,.22);}
      #ve-panel button.ve-on{background:#c9a84c !important;border-color:#c9a84c !important;color:#1a1a2e !important;}
      #ve-panel button.ve-save{background:#27ae60 !important;border-color:#27ae60 !important;}
      #ve-panel button.ve-export{background:#1877F2 !important;border-color:#1877F2 !important;}
      #ve-divider{width:1px;height:22px;background:rgba(255,255,255,.2);flex-shrink:0;}
      #ve-badge{color:#c9a84c;font-weight:700;font-size:11px;letter-spacing:.5px;white-space:nowrap;}

      /* ---- editable outlines (injected via JS for easy removal) ---- */
      body.${EDIT_CLASS} [contenteditable]{transition:outline .12s,box-shadow .12s;}
      body.${EDIT_CLASS} [contenteditable]:hover{outline:2px dashed rgba(201,168,76,.55) !important; outline-offset:3px; cursor:pointer;}
      body.${EDIT_CLASS} [contenteditable].ve-active{outline:2px solid #c9a84c !important; outline-offset:3px; box-shadow:0 0 0 3px rgba(201,168,76,.15); background:rgba(201,168,76,.04) !important;}

      /* ---- hidden file input for image replace ---- */
      #ve-img-input{display:none;}
    `;
    document.head.appendChild(s);
  }

  /* ── INJECT FLOATING PANEL ──────────────────────────────── */
  function injectPanel() {
    if (document.getElementById('ve-panel')) return;

    const panel = document.createElement('div');
    panel.id = 've-panel';

    panel.innerHTML = `
      <span id="ve-badge">EDITOR</span>
      <span id="ve-divider"></span>
      <button id="ve-toggle" title="Turn edit mode on / off">Toggle Edit Mode</button>
      <button id="ve-save"   title="Save current page to localStorage">Save Edits</button>
      <button id="ve-export" title="Download clean index.html">Export HTML</button>
    `;
    document.body.appendChild(panel);

    // hidden file input for image replacement
    const inp = document.createElement('input');
    inp.type  = 'file';
    inp.accept = 'image/*';
    inp.id    = 've-img-input';
    document.body.appendChild(inp);

    /* event wiring */
    document.getElementById('ve-toggle').addEventListener('click', toggleEdit);
    document.getElementById('ve-save').addEventListener('click', saveToStorage);
    document.getElementById('ve-export').addEventListener('click', exportHTML);
    inp.addEventListener('change', onImagePicked);
  }

  /* ── TOGGLE EDIT MODE ───────────────────────────────────── */
  function toggleEdit() {
    editMode = !editMode;
    const btn = document.getElementById('ve-toggle');

    if (editMode) {
      document.body.classList.add(EDIT_CLASS);
      btn.classList.add('ve-on');
      btn.textContent = 'Editing ON';
      enableEditing();
    } else {
      document.body.classList.remove(EDIT_CLASS);
      btn.classList.remove('ve-on');
      btn.textContent = 'Toggle Edit Mode';
      disableEditing();
    }
  }

  /* ── ENABLE / DISABLE CONTENTEDITABLE ───────────────────── */
  const EDITABLE_TAGS = 'h1,h2,h3,h4,h5,h6,p,span,a,li,td,th,blockquote,figcaption,label,button,div';
  const SKIP_SELECTORS = '#ve-panel,#ve-panel *,#ve-img-input,script,style,noscript,svg,svg *,iframe';

  function enableEditing() {
    document.querySelectorAll(EDITABLE_TAGS).forEach(el => {
      if (el.closest(SKIP_SELECTORS)) return;
      // skip empty elements with no visible text
      if (!el.textContent.trim() && el.children.length === 0) return;
      el.setAttribute('contenteditable', 'true');
      el.addEventListener('click', onEditableClick);
      el.addEventListener('blur', onEditableBlur);
    });
    // images: click to replace
    document.querySelectorAll('img').forEach(img => {
      if (img.closest(SKIP_SELECTORS)) return;
      img.style.cursor = 'pointer';
      img.addEventListener('click', onImageClick);
    });
  }

  function disableEditing() {
    document.querySelectorAll('[contenteditable]').forEach(el => {
      el.removeAttribute('contenteditable');
      el.classList.remove('ve-active');
      el.removeEventListener('click', onEditableClick);
      el.removeEventListener('blur', onEditableBlur);
    });
    document.querySelectorAll('img').forEach(img => {
      img.style.cursor = '';
      img.removeEventListener('click', onImageClick);
    });
  }

  /* ── EDITABLE FOCUS / BLUR ──────────────────────────────── */
  let currentTarget = null;

  function onEditableClick(e) {
    if (!editMode) return;
    e.stopPropagation();
    // deselect previous
    if (currentTarget) currentTarget.classList.remove('ve-active');
    currentTarget = e.currentTarget;
    currentTarget.classList.add('ve-active');
  }

  function onEditableBlur() {
    if (currentTarget) {
      currentTarget.classList.remove('ve-active');
      currentTarget = null;
    }
  }

  // clicking outside any editable deselects
  document.addEventListener('click', function (e) {
    if (!editMode) return;
    if (!e.target.closest('[contenteditable]') && !e.target.closest('#ve-panel')) {
      if (currentTarget) {
        currentTarget.classList.remove('ve-active');
        currentTarget = null;
      }
    }
  });

  /* ── IMAGE REPLACER ─────────────────────────────────────── */
  let pendingImg = null;

  function onImageClick(e) {
    if (!editMode) return;
    e.preventDefault();
    e.stopPropagation();
    pendingImg = e.currentTarget;
    document.getElementById('ve-img-input').value = '';
    document.getElementById('ve-img-input').click();
  }

  function onImagePicked(e) {
    if (!pendingImg || !e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = function (ev) {
      pendingImg.setAttribute('src', ev.target.result);
      pendingImg.style.maxWidth = '100%';
      pendingImg = null;
    };
    reader.readAsDataURL(file);
  }

  /* ── SAVE TO LOCALSTORAGE ───────────────────────────────── */
  function saveToStorage() {
    const clone = cleanClone();
    localStorage.setItem(STORAGE_KEY, clone.outerHTML);
    toast('Saved to browser storage');
  }

  /* ── RESTORE ON LOAD ────────────────────────────────────── */
  function restoreFromStorage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      document.open();
      document.write(saved);
      document.close();
    } catch (_) {
      // fallback: just warn
      console.warn('Visual Editor: could not restore saved HTML');
    }
  }

  /* ── EXPORT CLEAN HTML ──────────────────────────────────── */
  function exportHTML() {
    const clone = cleanClone();
    const blob = new Blob(
      ['<!DOCTYPE html>\n' + clone.outerHTML],
      { type: 'text/html;charset=utf-8' }
    );
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast('Download started');
  }

  /* ── CLEAN CLONE (remove editor artefacts) ──────────────── */
  function cleanClone() {
    const clone = document.documentElement.cloneNode(true);

    // remove floating panel + hidden input
    clone.querySelectorAll('#ve-panel,#ve-img-input').forEach(n => n.remove());

    // remove injected style block
    clone.querySelectorAll('#' + STYLE_ID).forEach(n => n.remove());

    // strip contenteditable from everything
    clone.querySelectorAll('[contenteditable]').forEach(el => {
      el.removeAttribute('contenteditable');
    });

    // remove editor classes from body
    const body = clone.querySelector('body');
    if (body) body.classList.remove(EDIT_CLASS);

    // remove any inline styles we injected on images
    clone.querySelectorAll('img[style]').forEach(img => {
      const s = img.getAttribute('style') || '';
      img.setAttribute('style', s.replace(/cursor\s*:\s*pointer\s*;?/gi, '').trim());
    });

    return clone;
  }

  /* ── TOAST ──────────────────────────────────────────────── */
  let toastTimer = null;
  function toast(msg) {
    let el = document.getElementById('ve-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 've-toast';
      el.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#27ae60;color:#fff;padding:8px 20px;border-radius:8px;font:600 13px/1 "Segoe UI",sans-serif;z-index:999999;box-shadow:0 4px 14px rgba(0,0,0,.25);transition:opacity .3s;';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.style.opacity = '1';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.style.opacity = '0'; }, 2200);
  }

  /* ── KEYBOARD SHORTCUT (Ctrl+Shift+E) ──────────────────── */
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
      e.preventDefault();
      toggleEdit();
    }
  });

  /* ── INIT ───────────────────────────────────────────────── */
  function init() {
    injectStyles();
    injectPanel();
    // restore saved content (must run after DOM is ready)
    restoreFromStorage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
