/* ============================================================
   SAMI PERFUME - Complete Visual Website Editor v2.0
   Full front-end editor: text, colors, fonts, cards, links
   ACCESS: Ctrl+Shift+A | Password: admin123
   ============================================================ */
(function(){
'use strict';

const CFG={pw:'admin123',pfx:'sami_ed_',ver:'2.0.0'};
const ST={loggedIn:JSON.parse(localStorage.getItem(CFG.pfx+'auth')||'false'),tab:'dashboard',sbOpen:false,inline:false,editingId:null,activeEl:null};

/* ---- STORAGE ---- */
const S={
    g(k,d){try{const v=localStorage.getItem(CFG.pfx+k);return v?JSON.parse(v):d}catch{return d}},
    s(k,v){localStorage.setItem(CFG.pfx+k,JSON.stringify(v))},
    r(k){localStorage.removeItem(CFG.pfx+k)}
};

/* ---- DEFAULT CONTENT ---- */
const DEFAULTS={
    hero_badge:'New Collection 2026',
    hero_title:'Discover the Art of Fragrance',
    hero_desc:'Explore our curated collection of premium perfumes and traditional attars, crafted for the modern connoisseur.',
    promo_badge:'Limited Time',
    promo_title:'Up to 40% OFF on Premium Attars',
    promo_desc:'Discover the essence of Arabian luxury with our exclusive attar collection.',
    header_promo:'Free delivery on orders above PKR 5,000',
    logo_name:'SAMI PERFUME',
    logo_tagline:'Premium Fragrances & Attars',
    about_story:'SAMI PERFUME was born from a passion for exquisite fragrances and a deep appreciation for the art of perfumery. Founded with a vision to bring premium-quality perfumes and attars to fragrance enthusiasts across Pakistan, we curate the finest scents from around the world.',
    about_mission:'To provide an unparalleled fragrance experience through authentic, high-quality perfumes and attars at accessible prices. We believe everyone deserves to wear a scent that tells their story.',
    about_subtitle:'Where Elegance Meets Fragrance',
    footer_desc:'Premium fragrances and attars for the modern connoisseur. Discover the art of scent.',
    footer_copyright:'\u00a9 2026 SAMI PERFUME. All Rights Reserved.'
};

const EDIT_MAP={
    '.header-promo':{k:'header_promo'},
    '.logo-text h1':{k:'logo_name'},
    '.logo-tagline':{k:'logo_tagline'},
    '.hero-badge':{k:'hero_badge'},
    '.hero h2':{k:'hero_title'},
    '.hero .hero-content > p':{k:'hero_desc'},
    '.promo-badge':{k:'promo_badge'},
    '.promo-content h2':{k:'promo_title'},
    '.promo-content > p':{k:'promo_desc'},
    '.about-subtitle':{k:'about_subtitle'},
    '.about-block:nth-child(1) p':{k:'about_story'},
    '.about-block:nth-child(2) p':{k:'about_mission'},
    '.footer-col:first-child p':{k:'footer_desc'},
    '.footer-bottom p:first-child':{k:'footer_copyright'}
};

const EXTRA_EDIT=[
    '.section-header h2','.section-header p','.hero-content h2','.hero-content p',
    '.promo-content h2','.promo-content p','.about-block h3','.about-block p',
    '.value-card h4','.value-card p','.contact-item h4','.contact-item p',
    '.footer-col h4','.faq-question','.review-text','.product-name',
    '.product-desc','.product-price','.detail-desc','.detail-meta p'
];

const COLORS=['#c9a84c','#a67c00','#e8d48b','#1a1a2e','#16213e','#0f3460','#2d2d2d','#6b6b6b','#999999','#ffffff','#000000','#e74c3c','#27ae60','#1877F2','#E4405F','#FF6B00','#9b59b6','#3498db','#1abc9c','#f39c12','#e67e22','#2c3e50','#34495e','#7f8c8d','#c0392b','#16a085','#2980b9','#8e44ad','#d35400','#27ae60'];
const FONTS=['Poppins','Playfair Display','Cormorant Garamond','Arial','Georgia','Times New Roman','Verdana','Courier New'];
const SIZES=['12','14','16','18','20','24','28','32','36','48'];
const EMOJIS=['🧴','🌸','💐','🪻','🪷','🏵️','🎎','🎭','🌹','💎','🖤','🤍','🌙','✨','🔥','👔','🏜️','🌺','🌃','🕯️','🎶','⚱️','🌲','🫧','🌿','🌻','🤴','🧴','💎','🌹'];

/* ---- INJECT ---- */
function inject(){
    if(!document.querySelector('link[href="editor.css"]')){const l=document.createElement('link');l.rel='stylesheet';l.href='editor.css';document.head.appendChild(l)}
    if(document.getElementById('eLoginOverlay'))return;
    const h=`
<div class="editor-login-overlay" id="eLoginOverlay">
<div class="editor-login-box">
<div class="e-icon">&#128736;</div>
<h2>Website Editor</h2>
<p>Enter admin password to edit the entire website</p>
<div class="e-login-err" id="eLoginErr">Incorrect password.</div>
<input type="password" id="ePwInput" placeholder="Enter password" autocomplete="off">
<div class="e-actions">
<button class="eb-ghost" onclick="E.closeLogin()">Cancel</button>
<button class="eb-primary" onclick="E.login()">Login</button>
</div>
<div class="e-hint">Default: <strong>admin123</strong></div>
</div></div>

<div class="editor-topbar" id="eTopbar">
<span class="e-tb-logo">&#128736; EDITOR</span>
<div class="e-tb-div"></div>
<button onclick="E.toggleSb()" title="Toggle Panel">&#9776; Panel</button>
<button onclick="E.toggleInline()" id="eInlineBtn" title="Click any text on page to edit it">&#9998; Visual Edit</button>
<button onclick="E.preview()" title="Preview as visitor">&#128065; Preview</button>
<span class="e-tb-spacer"></span>
<button class="e-tb-save" onclick="E.saveAll()">&#128190; Save All</button>
<button class="e-tb-exit" onclick="E.logout()">&#128682; Exit</button>
</div>

<div class="editor-sidebar" id="eSidebar">
<div class="e-sb-head"><h3>&#128736; Editor</h3><button class="e-sb-close" onclick="E.toggleSb()">&times;</button></div>
<div class="e-tabs">
<button class="e-tab active" onclick="E.tab('dashboard')" data-t="dashboard"><span class="e-tab-ico">&#128202;</span>Dash</button>
<button class="e-tab" onclick="E.tab('products')" data-t="products"><span class="e-tab-ico">&#128722;</span>Products</button>
<button class="e-tab" onclick="E.tab('content')" data-t="content"><span class="e-tab-ico">&#128221;</span>Content</button>
<button class="e-tab" onclick="E.tab('colors')" data-t="colors"><span class="e-tab-ico">&#127912;</span>Colors</button>
<button class="e-tab" onclick="E.tab('links')" data-t="links"><span class="e-tab-ico">&#128279;</span>Links</button>
<button class="e-tab" onclick="E.tab('cards')" data-t="cards"><span class="e-tab-ico">&#127380;</span>Cards</button>
<button class="e-tab" onclick="E.tab('orders')" data-t="orders"><span class="e-tab-ico">&#128203;</span>Orders</button>
</div>
<div class="e-panel active" id="ePDash"></div>
<div class="e-panel" id="ePProd"></div>
<div class="e-panel" id="ePCont"></div>
<div class="e-panel" id="ePCol"></div>
<div class="e-panel" id="ePLink"></div>
<div class="e-panel" id="ePCard"></div>
<div class="e-panel" id="ePOrd"></div>
</div>

<div class="e-float-toolbar" id="eFloatTb">
<button onclick="E.ftCmd('bold')" title="Bold"><b>B</b></button>
<button onclick="E.ftCmd('italic')" title="Italic"><i>I</i></button>
<button onclick="E.ftCmd('underline')" title="Underline"><u>U</u></button>
<div class="e-ft-div"></div>
<button onclick="E.ftColor('color')" title="Text Color" id="eFtColorBtn">&#127912;</button>
<button onclick="E.ftColor('bg')" title="Background Color" id="eFtBgBtn">&#127912;</button>
<div class="e-ft-div"></div>
<select onchange="E.ftFont(this.value)" id="eFtFont"><option value="">Font</option></select>
<select onchange="E.ftSize(this.value)" id="eFtSize"><option value="">Size</option></select>
<div class="e-ft-div"></div>
<button onclick="E.ftAlign('left')" title="Left">&#8676;</button>
<button onclick="E.ftAlign('center')" title="Center">&#8596;</button>
<button onclick="E.ftAlign('right')" title="Right">&#8677;</button>
<div class="e-ft-div"></div>
<button onclick="E.ftSave()" title="Save" style="background:#27ae60">&#10004;</button>
<button onclick="E.ftCancel()" title="Cancel" style="background:#e74c3c">&#10006;</button>
</div>

<div class="e-color-popup" id="eColorPopup">
<h4 id="eColorTitle">Pick Color</h4>
<div class="e-color-grid" id="eColorGrid"></div>
<div class="e-color-custom">
<input type="color" id="eColorPicker" value="#c9a84c">
<input type="text" id="eColorHex" placeholder="#hex" value="#c9a84c">
<button class="e-btn e-btn-gold e-btn-sm" onclick="E.applyColor()">Apply</button>
</div>
</div>

<div class="e-card-modal" id="eCardModal"><div class="e-card-box" id="eCardModalBox"></div></div>
<div class="e-confirm" id="eConfirm"><div class="e-confirm-box"><h3 id="eConfTitle">Confirm</h3><p id="eConfMsg">Are you sure?</p><div class="e-confirm-acts"><button class="eb-ghost" onclick="E.closeConf()">Cancel</button><button class="eb-primary" id="eConfOk" style="background:#e74c3c!important">Confirm</button></div></div></div>
<div class="e-toast" id="eToast"></div>`;
    const w=document.createElement('div');w.innerHTML=h;document.body.appendChild(w);
    // Populate font selector
    const fs=document.getElementById('eFtFont');
    FONTS.forEach(f=>{const o=document.createElement('option');o.value=f;o.textContent=f;fs.appendChild(o)});
    const ss=document.getElementById('eFtSize');
    SIZES.forEach(s=>{const o=document.createElement('option');o.value=s;o.textContent=s+'px';ss.appendChild(o)});
    // Color grid
    const cg=document.getElementById('eColorGrid');
    COLORS.forEach(c=>{const d=document.createElement('div');d.className='e-color-swatch';d.style.background=c;d.onclick=()=>{document.getElementById('eColorPicker').value=c;document.getElementById('eColorHex').value=c};cg.appendChild(d)});
    document.getElementById('eColorPicker').oninput=function(){document.getElementById('eColorHex').value=this.value};
    document.getElementById('eColorHex').oninput=function(){if(/^#[0-9a-f]{6}$/i.test(this.value))document.getElementById('eColorPicker').value=this.value};
}

/* ---- TOAST ---- */
function toast(m,err){const t=document.getElementById('eToast');if(!t)return;t.textContent=m;t.className='e-toast'+(err?' error':'')+' show';clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),2200)}

/* ---- CONFIRM ---- */
let confCb=null;
function confirm(title,msg,cb){document.getElementById('eConfTitle').textContent=title;document.getElementById('eConfMsg').textContent=msg;document.getElementById('eConfirm').classList.add('show');confCb=cb;document.getElementById('eConfOk').onclick=()=>{document.getElementById('eConfirm').classList.remove('show');if(confCb)confCb()}}
function closeConf(){document.getElementById('eConfirm').classList.remove('show')}

/* ---- AUTH ---- */
function login(){const p=document.getElementById('ePwInput').value;if(p===CFG.pw){ST.loggedIn=true;localStorage.setItem(CFG.pfx+'auth','true');document.getElementById('eLoginOverlay').classList.remove('show');activate();toast('Editor activated!')}else{document.getElementById('eLoginErr').style.display='block';document.getElementById('ePwInput').value='';document.getElementById('ePwInput').focus()}}
function logout(){confirm('Exit Editor','Exit the website editor?',()=>{ST.loggedIn=false;ST.inline=false;localStorage.removeItem(CFG.pfx+'auth');deactivate();toast('Editor exited')})}
function closeLogin(){document.getElementById('eLoginOverlay').classList.remove('show')}
function showLogin(){document.getElementById('eLoginOverlay').classList.add('show');setTimeout(()=>{const i=document.getElementById('ePwInput');if(i){i.value='';i.focus()}const e=document.getElementById('eLoginErr');if(e)e.style.display='none'},100)}

/* ---- ACTIVATE ---- */
function activate(){document.body.classList.add('editor-active');document.getElementById('eTopbar').classList.add('show');loadContent();renderAll()}
function deactivate(){document.body.classList.remove('editor-active');document.getElementById('eTopbar').classList.remove('show');document.getElementById('eSidebar').classList.remove('show');disableInline();hideFloatToolbar()}

/* ---- SIDEBAR ---- */
function toggleSb(){ST.sbOpen=!ST.sbOpen;document.getElementById('eSidebar').classList.toggle('show',ST.sbOpen)}
function switchTab(t){ST.tab=t;document.querySelectorAll('.e-tab').forEach(b=>b.classList.toggle('active',b.dataset.t===t));document.querySelectorAll('.e-panel').forEach(p=>p.classList.remove('active'));const m={dashboard:'ePDash',products:'ePProd',content:'ePCont',colors:'ePCol',links:'ePLink',cards:'ePCard',orders:'ePOrd'};const el=document.getElementById(m[t]);if(el)el.classList.add('active');renderAll()}

/* ---- RENDER ALL ---- */
function renderAll(){renderDash();renderProd();renderCont();renderColors();renderLinks();renderCards();renderOrd()}

/* ---- DASHBOARD ---- */
function renderDash(){const prods=getProducts();const ords=S.g('orders',[]);const revs=S.g('reviews',{});const rc=Object.values(revs).reduce((s,a)=>s+a.length,0);const rev=ords.reduce((s,o)=>s+(o.total||0),0);
document.getElementById('ePDash').innerHTML=`
<div class="e-sec-title">&#128202; Overview</div>
<div class="e-stats">
<div class="e-stat"><div class="ico">&#128722;</div><div class="val">${prods.length}</div><div class="lbl">Products</div></div>
<div class="e-stat"><div class="ico">&#128203;</div><div class="val">${ords.length}</div><div class="lbl">Orders</div></div>
<div class="e-stat"><div class="ico">&#11088;</div><div class="val">${rc}</div><div class="lbl">Reviews</div></div>
<div class="e-stat"><div class="ico">&#128176;</div><div class="val">${(rev/1000).toFixed(0)}K</div><div class="lbl">Revenue</div></div>
</div>
<div class="e-sec-title">&#9881; Quick Actions</div>
<button class="e-btn e-btn-gold" style="margin-bottom:.4rem" onclick="E.tab('products')">Manage Products</button>
<button class="e-btn e-btn-outline" style="margin-bottom:.4rem" onclick="E.tab('content')">Edit Text Content</button>
<button class="e-btn e-btn-outline" style="margin-bottom:.4rem" onclick="E.tab('colors')">Change Colors & Fonts</button>
<button class="e-btn e-btn-outline" style="margin-bottom:.4rem" onclick="E.tab('links')">Edit Links & Contact</button>
<button class="e-btn e-btn-outline" style="margin-bottom:.4rem" onclick="E.tab('cards')">Manage Cards</button>
<button class="e-btn e-btn-outline" style="margin-bottom:.4rem" onclick="E.tab('orders')">View Orders</button>
<div class="e-sec-title">&#128196; Recent Orders</div>
${ords.length===0?'<p style="font-size:.78rem;color:#6b6b6b">No orders yet.</p>':ords.slice(-3).reverse().map(o=>`<div class="e-ord"><div class="e-ord-hdr"><span class="e-ord-num">${o.orderNum}</span><span class="e-ord-date">${o.date}</span></div><div class="e-ord-det">${o.name} - ${o.items?o.items.length:0} item(s)</div><div class="e-ord-total">PKR ${(o.total||0).toLocaleString()}</div></div>`).join('')}
<div class="e-sec-title" style="margin-top:.8rem">&#128274; Editor v${CFG.ver}</div>`}

/* ---- PRODUCTS ---- */
function getProducts(){const c=S.g('custom_products',[]);return[...(typeof PRODUCTS!=='undefined'?PRODUCTS:[]),...c]}
function renderProd(){const ps=getProducts();const c=S.g('custom_products',[]);
document.getElementById('ePProd').innerHTML=`
<div class="e-sec-title">&#128722; All Products (${ps.length})</div>
<button class="e-btn e-btn-gold" style="margin-bottom:.8rem" onclick="E.addProd()">+ Add Product</button>
<div id="eProdList">${ps.map(p=>`<div class="e-prod"><span class="e-prod-emoji">${p.emoji}</span><div class="e-prod-info"><div class="e-prod-name">${p.name}</div><div class="e-prod-meta">${p.category} ${p.type} | PKR ${p.price.toLocaleString()} | ${p.size}</div></div><div class="e-prod-acts"><button onclick="E.editProd(${p.id})" title="Edit">&#9998;</button><button class="e-del" onclick="E.delProd(${p.id},'${p.name.replace(/'/g,"\\'")}')" title="Delete">&#128465;</button></div></div>`).join('')}</div>
${c.length>0?`<div class="e-sec-title" style="margin-top:.8rem">Custom (${c.length})</div><button class="e-btn e-btn-red" onclick="E.clearCustom()">Clear Custom</button>`:''}`}

function addProd(){ST.editingId=null;openProdModal(null)}
function editProd(id){const p=getProducts().find(x=>x.id===id);if(p){ST.editingId=id;openProdModal(p)}}
function openProdModal(p){
const isEdit=!!p;
document.getElementById('eCardModalBox').innerHTML=`
<h3>${isEdit?'Edit: '+p.name:'+ Add New Product'}</h3>
<div class="e-field"><label>Name *</label><input type="text" id="epName" value="${isEdit?p.name:''}"></div>
<div class="e-field-row">
<div class="e-field"><label>Category</label><select id="epCat"><option value="men"${isEdit&&p.category==='men'?' selected':''}>Men</option><option value="women"${isEdit&&p.category==='women'?' selected':''}>Women</option><option value="unisex"${isEdit&&p.category==='unisex'?' selected':''}>Unisex</option><option value="attar"${isEdit&&p.category==='attar'?' selected':''}>Attar</option></select></div>
<div class="e-field"><label>Type</label><select id="epType"><option value="perfume"${isEdit&&p.type==='perfume'?' selected':''}>Perfume</option><option value="attar"${isEdit&&p.type==='attar'?' selected':''}>Attar</option></select></div>
</div>
<div class="e-field-row">
<div class="e-field"><label>Price (PKR) *</label><input type="number" id="epPrice" value="${isEdit?p.price:''}"></div>
<div class="e-field"><label>Original Price</label><input type="number" id="epOrig" value="${isEdit&&p.originalPrice?p.originalPrice:''}"></div>
</div>
<div class="e-field-row">
<div class="e-field"><label>Size</label><input type="text" id="epSize" value="${isEdit?p.size:'100ml'}"></div>
<div class="e-field"><label>Emoji</label><div style="display:flex;gap:.4rem;align-items:center"><input type="text" id="epEmoji" value="${isEdit?p.emoji:'🧴'}" style="width:50px;text-align:center;font-size:1.4rem"><button class="e-btn e-btn-outline e-btn-sm" onclick="E.rndEmoji()">Random</button></div></div>
</div>
<div class="e-field"><label>Badge</label><select id="epBadge"><option value=""${isEdit&&!p.badge?' selected':''}>None</option><option value="New"${isEdit&&p.badge==='New'?' selected':''}>New</option><option value="Best Seller"${isEdit&&p.badge==='Best Seller'?' selected':''}>Best Seller</option><option value="Premium"${isEdit&&p.badge==='Premium'?' selected':''}>Premium</option><option value="Sale"${isEdit&&p.badge==='Sale'?' selected':''}>Sale</option></select></div>
<div class="e-field"><label>Description</label><textarea id="epDesc" rows="2">${isEdit?p.desc:''}</textarea></div>
<div class="e-field"><label>Fragrance Notes</label><textarea id="epNotes" rows="2">${isEdit?p.notes:''}</textarea></div>
<div class="e-field-row">
<div class="e-field"><label><input type="checkbox" id="epBS"${isEdit&&p.bestSeller?' checked':''}> Best Seller</label></div>
<div class="e-field"><label><input type="checkbox" id="epNew"${isEdit&&p.isNew?' checked':''}> New</label></div>
</div>
<div class="e-field"><label><input type="checkbox" id="epOffer"${isEdit&&p.isOffer?' checked':''}> On Sale</label></div>
<div class="e-modal-acts">
<button class="eb-ghost" onclick="E.closeProdModal()" style="background:#f5f3ef!important;color:#2d2d2d!important">Cancel</button>
<button class="eb-primary" onclick="E.saveProd()">${isEdit?'Update':'Add'} Product</button>
</div>`;
document.getElementById('eCardModal').classList.add('show')}

function saveProd(){
const name=document.getElementById('epName').value.trim();
const price=parseInt(document.getElementById('epPrice').value);
if(!name){toast('Name required',true);return}
if(!price||price<=0){toast('Valid price required',true);return}
const d={name,category:document.getElementById('epCat').value,type:document.getElementById('epType').value,price,originalPrice:parseInt(document.getElementById('epOrig').value)||null,size:document.getElementById('epSize').value.trim()||'100ml',emoji:document.getElementById('epEmoji').value||'🧴',badge:document.getElementById('epBadge').value||null,desc:document.getElementById('epDesc').value.trim()||'Premium quality fragrance.',notes:document.getElementById('epNotes').value.trim()||'Custom blend',bestSeller:document.getElementById('epBS').checked,isNew:document.getElementById('epNew').checked,isOffer:document.getElementById('epOffer').checked};
let c=S.g('custom_products',[]);
if(ST.editingId){const i=c.findIndex(x=>x.id===ST.editingId);if(i>-1){c[i]={...c[i],...d}}else{d.id=ST.editingId;const ei=c.findIndex(x=>x.id===d.id);if(ei>-1)c[ei]={...c[ei],...d};else c.push(d)}S.s('custom_products',c);toast('Updated: '+name)}
else{d.id=Date.now();c.push(d);S.s('custom_products',c);toast('Added: '+name)}
closeProdModal();renderProd();rerender()}

function delProd(id,name){confirm('Delete','Delete "'+name+'"?',()=>{let c=S.g('custom_products',[]);c=c.filter(x=>x.id!==id);S.s('custom_products',c);renderProd();toast('Deleted: '+name);rerender()})}
function clearCustom(){confirm('Clear','Remove all custom products?',()=>{S.s('custom_products',[]);renderProd();toast('Cleared')})}
function closeProdModal(){document.getElementById('eCardModal').classList.remove('show');ST.editingId=null}
function rndEmoji(){const el=document.getElementById('epEmoji');if(el)el.value=EMOJIS[Math.floor(Math.random()*EMOJIS.length)]}

/* ---- CONTENT ---- */
function renderCont(){loadContent();
const items=Object.entries(EDIT_MAP).map(([sel,cfg])=>{const el=document.querySelector(sel);const v=S.g(cfg.k,DEFAULTS[cfg.k]);const dv=v||(el?el.textContent.trim().substring(0,80):'');const label=cfg.k.replace(/_/g,' ').replace(/\b\w/g,x=>x.toUpperCase());
return`<div class="e-field"><label>${label}</label><input type="text" value="${esc(dv)}" onchange="E.updateContent('${cfg.k}',this.value)"></div>`}).join('');
const faqs=S.g('faqs',null);
const faqH=faqs?faqs.map((f,i)=>`<div class="e-field" style="border:1px solid #e8e4de;padding:.7rem;border-radius:7px;margin-bottom:.4rem"><label>Q${i+1}</label><input type="text" value="${esc(f.q)}" onchange="E.updateFaq(${i},'q',this.value)" style="margin-bottom:.3rem"><label>A</label><textarea rows="2" onchange="E.updateFaq(${i},'a',this.value)">${esc(f.a)}</textarea></div>`).join(''):'<p style="font-size:.78rem;color:#6b6b6b">Use defaults.</p>';
document.getElementById('ePCont').innerHTML=`
<div class="e-sec-title">&#128221; Page Content</div>
<p style="font-size:.75rem;color:#6b6b6b;margin-bottom:.8rem">Edit any text. Changes apply instantly.</p>
${items}
<button class="e-btn e-btn-gold" style="margin-top:.4rem" onclick="E.resetContent()">Reset to Defaults</button>
<div class="e-sec-title" style="margin-top:1rem">&#10067; FAQ</div>
${faqH}`}

function updateContent(k,v){S.s(k,v);loadContent();toast('Updated')}
function updateFaq(i,f,v){let faqs=S.g('faqs',defFaqs());if(faqs[i]){faqs[i][f]=v;S.s('faqs',faqs);toast('FAQ updated')}}
function defFaqs(){return[{q:'How can I order?',a:'Browse, add to cart, checkout. Or order via WhatsApp.'},{q:'Cash on Delivery?',a:'Yes! COD available across Pakistan.'},{q:'Contact us?',a:'WhatsApp, phone, email, or Contact page.'},{q:'Track order?',a:'Order Tracking page with order number.'},{q:'Leave review?',a:'Yes! On any product page.'},{q:'Reset password?',a:'Forgot Password on login page.'},{q:'Attars?',a:'Yes! Dedicated Attar Collection.'},{q:'Delivery?',a:'3-5 business days. Free above PKR 5,000.'},{q:'Returns?',a:'7 days if unopened.'},{q:'Payment?',a:'COD, Bank Transfer, Other.'}]}
function resetContent(){confirm('Reset','Reset all text to defaults?',()=>{Object.keys(EDIT_MAP).forEach(k=>S.r(EDIT_MAP[k].k));Object.keys(DEFAULTS).forEach(k=>S.r(k));S.r('faqs');loadContent();renderCont();toast('Reset done')})}

/* ---- COLORS ---- */
function renderColors(){
const cs=S.g('site_colors',{gold:'#c9a84c',goldDark:'#a67c00',dark:'#1a1a2e',dark2:'#16213e',bg:'#faf9f6',cardBg:'#ffffff',text:'#2d2d2d',textLight:'#6b6b6b',border:'#e8e4de'});
document.getElementById('ePCol').innerHTML=`
<div class="e-sec-title">&#127912; Site Colors</div>
<p style="font-size:.75rem;color:#6b6b6b;margin-bottom:.6rem">Change the main site colors. Changes apply instantly.</p>
<div class="e-field-half"><label>Gold (Primary)</label><input type="color" value="${cs.gold}" onchange="E.updateColor('gold',this.value)" style="width:40px;height:32px"></div>
<div class="e-field-half"><label>Gold Dark</label><input type="color" value="${cs.goldDark}" onchange="E.updateColor('goldDark',this.value)" style="width:40px;height:32px"></div>
<div class="e-field-half"><label>Dark (Header/Footer)</label><input type="color" value="${cs.dark}" onchange="E.updateColor('dark',this.value)" style="width:40px;height:32px"></div>
<div class="e-field-half"><label>Dark 2 (Nav)</label><input type="color" value="${cs.dark2}" onchange="E.updateColor('dark2',this.value)" style="width:40px;height:32px"></div>
<div class="e-field-half"><label>Background</label><input type="color" value="${cs.bg}" onchange="E.updateColor('bg',this.value)" style="width:40px;height:32px"></div>
<div class="e-field-half"><label>Card Background</label><input type="color" value="${cs.cardBg}" onchange="E.updateColor('cardBg',this.value)" style="width:40px;height:32px"></div>
<div class="e-field-half"><label>Text Color</label><input type="color" value="${cs.text}" onchange="E.updateColor('text',this.value)" style="width:40px;height:32px"></div>
<div class="e-field-half"><label>Text Light</label><input type="color" value="${cs.textLight}" onchange="E.updateColor('textLight',this.value)" style="width:40px;height:32px"></div>
<div class="e-field-half"><label>Border Color</label><input type="color" value="${cs.border}" onchange="E.updateColor('border',this.value)" style="width:40px;height:32px"></div>
<button class="e-btn e-btn-red" style="margin-top:.8rem" onclick="E.resetColors()">Reset Colors</button>
<div class="e-sec-title" style="margin-top:1rem">&#9998; Typography</div>
<div class="e-field"><label>Heading Font</label><select id="eHeadingFont" onchange="E.updateFont('heading',this.value)">${FONTS.map(f=>`<option value="${f}"${S.g('site_fonts',{}).heading===f?' selected':''}>${f}</option>`).join('')}</select></div>
<div class="e-field"><label>Body Font</label><select id="eBodyFont" onchange="E.updateFont('body',this.value)">${FONTS.map(f=>`<option value="${f}"${S.g('site_fonts',{}).body===f?' selected':''}>${f}</option>`).join('')}</select></div>
<button class="e-btn e-btn-outline" style="margin-top:.4rem" onclick="E.resetFonts()">Reset Fonts</button>`}

function updateColor(key,val){const cs=S.g('site_colors',{});cs[key]=val;S.s('site_colors',cs);applyColors();toast('Color updated')}
function applyColors(){const cs=S.g('site_colors',{gold:'#c9a84c',goldDark:'#a67c00',dark:'#1a1a2e',dark2:'#16213e',bg:'#faf9f6',cardBg:'#ffffff',text:'#2d2d2d',textLight:'#6b6b6b',border:'#e8e4de'});
const r=document.documentElement;r.style.setProperty('--gold',cs.gold);r.style.setProperty('--gold-dark',cs.goldDark);r.style.setProperty('--dark',cs.dark);r.style.setProperty('--dark2',cs.dark2);r.style.setProperty('--bg',cs.bg);r.style.setProperty('--bg-alt',cs.bg+'f0');r.style.setProperty('--card-bg',cs.cardBg);r.style.setProperty('--text',cs.text);r.style.setProperty('--text-light',cs.textLight);r.style.setProperty('--border',cs.border)}
function resetColors(){confirm('Reset','Reset all colors to defaults?',()=>{S.r('site_colors');document.documentElement.removeAttribute('style');renderColors();toast('Colors reset')})}
function updateFont(type,val){const f=S.g('site_fonts',{});f[type]=val;S.s('site_fonts',f);applyFonts();toast('Font updated')}
function applyFonts(){const f=S.g('site_fonts',{});if(f.heading)document.documentElement.style.setProperty('--font-heading',"'"+f.heading+"',Georgia,serif");if(f.body)document.body.style.fontFamily="'"+f.body+"',sans-serif"}
function resetFonts(){confirm('Reset','Reset fonts to defaults?',()=>{S.r('site_fonts');document.documentElement.style.removeProperty('--font-heading');document.body.style.fontFamily='';renderColors();toast('Fonts reset')})}

/* ---- LINKS ---- */
function renderLinks(){const s=S.g('store_settings',{whatsappNumber:'923001234567',facebook:'#',instagram:'#',tiktok:'#',phone:'+92 300 1234567',email:'info@sami-perfume.com',address:'Main Boulevard, Gulberg III, Lahore, Pakistan'});
document.getElementById('ePLink').innerHTML=`
<div class="e-sec-title">&#128172; WhatsApp</div>
<div class="e-field"><label>WhatsApp Number (country code)</label><input type="text" id="elWa" value="${esc(s.whatsappNumber)}" placeholder="923001234567"></div>
<div class="e-sec-title">&#127760; Social Media</div>
<div class="e-field"><label>Facebook URL</label><input type="url" id="elFb" value="${esc(s.facebook||'#')}" placeholder="https://facebook.com/..."></div>
<div class="e-field"><label>Instagram URL</label><input type="url" id="elIg" value="${esc(s.instagram||'#')}" placeholder="https://instagram.com/..."></div>
<div class="e-field"><label>TikTok URL</label><input type="url" id="elTk" value="${esc(s.tiktok||'#')}" placeholder="https://tiktok.com/@..."></div>
<div class="e-sec-title">&#128222; Contact</div>
<div class="e-field"><label>Phone</label><input type="text" id="elPhone" value="${esc(s.phone)}"></div>
<div class="e-field"><label>Email</label><input type="email" id="elEmail" value="${esc(s.email)}"></div>
<div class="e-field"><label>Address</label><textarea id="elAddr" rows="2">${esc(s.address)}</textarea></div>
<div class="e-sec-title">&#127968; Store Info</div>
<div class="e-field"><label>Store Name</label><input type="text" id="elName" value="${esc(s.storeName||'SAMI PERFUME')}"></div>
<div class="e-field"><label>Header Promo</label><input type="text" id="elPromo" value="${esc(s.headerPromo||'')}"></div>
<div class="e-field"><label>Footer Text</label><textarea id="elFooter" rows="2">${esc(s.footerText||'')}</textarea></div>
<div class="e-field"><label>Copyright</label><input type="text" id="elCopy" value="${esc(s.copyright||'')}"></div>
<button class="e-btn e-btn-gold" onclick="E.saveLinks()">Save All Links & Info</button>
<button class="e-btn e-btn-red" style="margin-top:.4rem" onclick="E.resetLinks()">Reset to Defaults</button>
<div class="e-sec-title" style="margin-top:1rem">&#128274; Password</div>
<div class="e-field"><label>Change Editor Password</label><input type="password" id="elNewPw" placeholder="New password"></div>`}

function saveLinks(){
const s={whatsappNumber:document.getElementById('elWa').value.trim(),facebook:document.getElementById('elFb').value.trim(),instagram:document.getElementById('elIg').value.trim(),tiktok:document.getElementById('elTk').value.trim(),phone:document.getElementById('elPhone').value.trim(),email:document.getElementById('elEmail').value.trim(),address:document.getElementById('elAddr').value.trim(),storeName:document.getElementById('elName').value.trim(),headerPromo:document.getElementById('elPromo').value.trim(),footerText:document.getElementById('elFooter').value.trim(),copyright:document.getElementById('elCopy').value.trim()};
S.s('store_settings',s);
const np=document.getElementById('elNewPw').value.trim();
if(np){if(np.length<4){toast('Password min 4 chars',true);return}CFG.pw=np;S.s('admin_password',np)}
applyLinks(s);toast('Links saved!')}
function applyLinks(s){
if(typeof CONFIG!=='undefined'){CONFIG.whatsappNumber=s.whatsappNumber;CONFIG.storeName=s.storeName;CONFIG.social={whatsapp:'https://wa.me/'+s.whatsappNumber,facebook:s.facebook,instagram:s.instagram,tiktok:s.tiktok};CONFIG.contact={phone:s.phone,email:s.email,address:s.address}}
if(typeof State!=='undefined'){State.settings=s;State.save('settings',s)}
if(typeof updateSocialLinks==='function')updateSocialLinks();
const hp=document.querySelector('.header-promo');if(hp&&s.headerPromo)hp.textContent=s.headerPromo;
const fd=document.querySelector('.footer-col:first-child p');if(fd&&s.footerText)fd.textContent=s.footerText;
const cp=document.querySelector('.footer-bottom p:first-child');if(cp&&s.copyright)cp.textContent=s.copyright;
const ci=document.querySelectorAll('.contact-item');
if(ci.length>=4){const pp=ci[0].querySelector('p');if(pp)pp.textContent=s.phone;const wp=ci[1].querySelector('p');if(wp)wp.textContent='+'+s.whatsappNumber;const ep=ci[2].querySelector('p');if(ep)ep.textContent=s.email;const ap=ci[3].querySelector('p');if(ap)ap.textContent=s.address}}
function resetLinks(){confirm('Reset','Reset all links and contact info?',()=>{S.r('store_settings');renderLinks();toast('Reset done')})}

/* ---- CARDS (Value Cards / About / Review) ---- */
function renderCards(){
const vc=S.g('value_cards',[{icon:'💎',title:'Premium Quality',desc:'Every fragrance is carefully selected and verified for authenticity and longevity.'},{icon:'🌱',title:'Authentic Scents',desc:'We source directly from trusted suppliers and renowned perfume houses.'},{icon:'💕',title:'Customer Love',desc:'Our customers are at the heart of everything we do. Your satisfaction is our priority.'},{icon:'🚚',title:'Fast Delivery',desc:'Quick and reliable delivery across Pakistan with secure packaging.'}]);
document.getElementById('ePCard').innerHTML=`
<div class="e-sec-title">&#127380; Value Cards (About Page)</div>
<p style="font-size:.75rem;color:#6b6b6b;margin-bottom:.6rem">Edit the 4 value cards on the About page.</p>
${vc.map((c,i)=>`<div style="border:1px solid #e8e4de;border-radius:7px;padding:.7rem;margin-bottom:.5rem;background:#faf9f6">
<div class="e-field-row">
<div class="e-field"><label>Icon (emoji)</label><input type="text" value="${c.icon}" onchange="E.updateVC(${i},'icon',this.value)" style="width:50px;text-align:center;font-size:1.3rem"></div>
<div class="e-field"><label>Title</label><input type="text" value="${esc(c.title)}" onchange="E.updateVC(${i},'title',this.value)"></div>
</div>
<div class="e-field"><label>Description</label><textarea rows="2" onchange="E.updateVC(${i},'desc',this.value)">${esc(c.desc)}</textarea></div>
</div>`).join('')}
<button class="e-btn e-btn-gold" style="margin-bottom:.8rem" onclick="E.addVC()">+ Add Card</button>
<div class="e-sec-title">&#128196; About Page Sections</div>
<div class="e-field"><label>Story Title</label><input type="text" value="${esc(S.g('about_story_title','Our Story'))}" onchange="E.updContent('about_story_title',this.value)"></div>
<div class="e-field"><label>Mission Title</label><input type="text" value="${esc(S.g('about_mission_title','Our Mission'))}" onchange="E.updContent('about_mission_title',this.value)"></div>
<div class="e-sec-title">&#127775; Reviews (Home Page)</div>
<p style="font-size:.75rem;color:#6b6b6b;margin-bottom:.5rem">Manage demo reviews shown on the homepage.</p>
<button class="e-btn e-btn-outline" onclick="E.tab('content')">Edit in Content Tab</button>`}

function updateVC(i,key,val){let vc=S.g('value_cards',[]);if(vc[i]){vc[i][key]=val;S.s('value_cards',vc);applyVC();toast('Card updated')}}
function addVC(){let vc=S.g('value_cards',[]);vc.push({icon:'✨',title:'New Feature',desc:'Description here.'});S.s('value_cards',vc);renderCards();toast('Card added')}
function applyVC(){const vc=S.g('value_cards',[]);const cards=document.querySelectorAll('.value-card');cards.forEach((c,i)=>{if(vc[i]){const sp=c.querySelector('span');const h=c.querySelector('h4');const p=c.querySelector('p');if(sp)sp.textContent=vc[i].icon;if(h)h.textContent=vc[i].title;if(p)p.textContent=vc[i].desc}})}

/* ---- ORDERS ---- */
function renderOrd(){const ords=S.g('orders',[]);
document.getElementById('ePOrd').innerHTML=`
<div class="e-sec-title">&#128203; Orders (${ords.length})</div>
${ords.length===0?'<p style="font-size:.78rem;color:#6b6b6b">No orders yet.</p>':''}
${ords.map((o,i)=>`<div class="e-ord"><div class="e-ord-hdr"><span class="e-ord-num">${o.orderNum}</span><span class="e-ord-date">${o.date}</span></div><div class="e-ord-det"><strong>${o.name}</strong> | ${o.mobile} | ${o.city}<br>${o.email}<br>${o.items?o.items.map(x=>x.name+' x'+x.qty).join(', '):''}<br>Payment: ${o.payment==='cod'?'COD':o.payment==='bank'?'Bank':'Other'}</div><div class="e-ord-total">PKR ${(o.total||0).toLocaleString()}</div><div style="margin-top:.4rem;display:flex;gap:.4rem;align-items:center"><label style="font-size:.72rem;color:#6b6b6b">Status:</label><select onchange="E.updOrdStatus(${i},this.value)" style="padding:.25rem .4rem;border:1px solid #e8e4de;border-radius:4px;font-size:.72rem"><option value="received"${o.status==='received'?' selected':''}>Received</option><option value="processing"${o.status==='processing'?' selected':''}>Processing</option><option value="shipped"${o.status==='shipped'?' selected':''}>Shipped</option><option value="delivered"${o.status==='delivered'?' selected':''}>Delivered</option></select><span class="e-status ${o.status||'received'}">${o.status||'received'}</span></div></div>`).join('')}
${ords.length>0?`<button class="e-btn e-btn-red" style="margin-top:.8rem" onclick="E.clearOrds()">Clear All Orders</button>`:''}`}

function updOrdStatus(i,v){let o=S.g('orders',[]);if(o[i]){o[i].status=v;S.s('orders',o);renderOrd();toast('Status: '+v)}}
function clearOrds(){confirm('Clear','Delete all orders?',()=>{S.s('orders',[]);renderOrd();renderDash();toast('Cleared')})}

/* ---- FLOATING TOOLBAR (Visual Edit) ---- */
let colorMode='color';
function toggleInline(){ST.inline=!ST.inline;const b=document.getElementById('eInlineBtn');if(ST.inline){enableInline();b.classList.add('active');b.innerHTML='&#10004; Editing ON'}else{disableInline();b.classList.remove('active');b.innerHTML='&#9998; Visual Edit'}}
function enableInline(){document.querySelectorAll(EDIT_MAP?Object.keys(EDIT_MAP):[]).forEach(sel=>{document.querySelectorAll(sel).forEach(el=>markEditable(el))});EXTRA_EDIT.forEach(sel=>{document.querySelectorAll(sel).forEach(el=>markEditable(el))});toast('Click any highlighted text to edit')}
function disableInline(){document.querySelectorAll('.e-editable').forEach(el=>{el.classList.remove('e-editable','e-active');el.removeAttribute('contenteditable');const tag=el.querySelector('.e-edit-tag');if(tag)tag.remove();el.removeEventListener('mousedown',onEditClick)});hideFloatToolbar()}

function markEditable(el){if(el.classList.contains('e-editable'))return;el.classList.add('e-editable');const tag=document.createElement('span');tag.className='e-edit-tag';tag.textContent='Edit';el.appendChild(tag);el.addEventListener('mousedown',onEditClick)}

function onEditClick(e){if(!ST.inline)return;e.preventDefault();e.stopPropagation();const el=e.currentTarget;
if(ST.activeEl&&ST.activeEl!==el)finishEdit(ST.activeEl);
ST.activeEl=el;el.classList.add('e-active');el.setAttribute('contenteditable','true');el.focus();
// Select all text
const r=document.createRange();r.selectNodeContents(el);const s=window.getSelection();s.removeAllRanges();s.addRange(r);
showFloatToolbar(el);
// Apply saved styles
applySavedStyles(el)}

function finishEdit(el){if(!el)return;el.removeAttribute('contenteditable');el.classList.remove('e-active');
const text=el.textContent.trim().replace(/\s*Edit$/,'').trim();
// Find matching key and save
let key=null;
for(const [sel,cfg]of Object.entries(EDIT_MAP)){const match=document.querySelector(sel);if(match===el){key=cfg.k;break}}
if(key){S.s(key,text);loadContent()}
// Save custom styles
saveElStyles(el);
hideFloatToolbar();ST.activeEl=null}

function showFloatToolbar(el){const tb=document.getElementById('eFloatTb');const rect=el.getBoundingClientRect();
let left=rect.left;let top=rect.top-45;
if(top<5)top=rect.bottom+5;if(left+500>window.innerWidth)left=window.innerWidth-510;if(left<5)left=5;
tb.style.left=left+'px';tb.style.top=top+'px';tb.classList.add('show');
// Sync current styles
const cs=getComputedStyle(el);document.getElementById('eFtFont').value=cs.fontFamily.split(',')[0].replace(/['"]/g,'');document.getElementById('eFtSize').value=parseInt(cs.fontSize)}
function hideFloatToolbar(){document.getElementById('eFloatTb').classList.remove('show');document.getElementById('eColorPopup').classList.remove('show')}

function ftCmd(cmd){if(!ST.activeEl)return;document.execCommand(cmd,false,null);ST.activeEl.focus()}
function ftFont(f){if(!ST.activeEl||!f)return;ST.activeEl.style.fontFamily=f;ST.activeEl.focus()}
function ftSize(s){if(!ST.activeEl||!s)return;ST.activeEl.style.fontSize=s+'px';ST.activeEl.focus()}
function ftAlign(a){if(!ST.activeEl)return;ST.activeEl.style.textAlign=a;ST.activeEl.focus()}
function ftColor(type){colorMode=type;const popup=document.getElementById('eColorPopup');const tb=document.getElementById('eFloatTb');const tbRect=tb.getBoundingClientRect();
popup.style.left=tbRect.left+'px';popup.style.top=(tbRect.bottom+5)+'px';
document.getElementById('eColorTitle').textContent=type==='color'?'Text Color':'Background Color';
popup.classList.add('show')}
function applyColor(){if(!ST.activeEl)return;const c=document.getElementById('eColorHex').value;if(colorMode==='color')ST.activeEl.style.color=c;else ST.activeEl.style.backgroundColor=c;
document.getElementById('eColorPopup').classList.remove('show');ST.activeEl.focus()}
function ftSave(){if(ST.activeEl)finishEdit(ST.activeEl)}
function ftCancel(){if(ST.activeEl){ST.activeEl.removeAttribute('contenteditable');ST.activeEl.classList.remove('e-active');ST.activeEl.style.cssText=ST.activeEl._origStyle||'';ST.activeEl=null}hideFloatToolbar()}

function saveElStyles(el){const styles={color:el.style.color,backgroundColor:el.style.backgroundColor,fontFamily:el.style.fontFamily,fontSize:el.style.fontSize,textAlign:el.style.textAlign};
const id=el.className.split(' ').find(c=>c.startsWith('e-'))||el.tagName+el.textContent.substring(0,20);
const saved=S.g('el_styles',{});saved[el.textContent.substring(0,30)]=styles;S.s('el_styles',saved)}
function applySavedStyles(el){const saved=S.g('el_styles',{});const k=el.textContent.substring(0,30);if(saved[k]){Object.entries(saved[k]).forEach(([p,v])=>{if(v)el.style[p]=v})}}

/* ---- PREVIEW ---- */
function preview(){const tb=document.getElementById('eTopbar');const sb=document.getElementById('eSidebar');const wasVis=tb.classList.contains('show');
tb.classList.remove('show');sb.classList.remove('show');disableInline();hideFloatToolbar();document.body.classList.remove('editor-active');
toast('Preview mode - Ctrl+Shift+A to return');
function ret(e){if(e.ctrlKey&&e.shiftKey&&(e.key==='A'||e.key==='a')){e.preventDefault();document.removeEventListener('keydown',ret);if(wasVis)tb.classList.add('show');document.body.classList.add('editor-active');toast('Returned to editor')}}document.addEventListener('keydown',ret)}

/* ---- SAVE ALL ---- */
function saveAll(){toast('All changes saved!')}

/* ---- LOAD CONTENT ---- */
function loadContent(){Object.entries(EDIT_MAP).forEach(([sel,cfg])=>{const v=S.g(cfg.k,null);if(v){const el=document.querySelector(sel);if(el)el.textContent=v}});const s=S.g('store_settings',null);if(s)applyLinks(s);applyColors();applyFonts();applyVC()}
function rerender(){if(typeof renderSectionContent==='function'){const c=typeof getCurrentSection==='function'?getCurrentSection():'home';renderSectionContent(c)}}

/* ---- HELPERS ---- */
function esc(s){if(!s)return'';return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function updContent(k,v){S.s(k,v);toast('Updated')}

/* ---- KEYBOARD ---- */
document.addEventListener('keydown',function(e){if(e.ctrlKey&&e.shiftKey&&(e.key==='A'||e.key==='a')){e.preventDefault();if(ST.loggedIn)toggleSb();else showLogin()}});

/* ---- INIT ---- */
function init(){const spw=S.g('admin_password',null);if(spw)CFG.pw=spw;inject();
if(typeof State!=='undefined'&&State.orders){const eo=S.g('orders',[]);if(eo.length===0&&State.orders.length>0)S.s('orders',State.orders)}
if(typeof State!=='undefined'&&State.reviews){const er=S.g('reviews',{});if(Object.keys(er).length===0&&Object.keys(State.reviews).length>0)S.s('reviews',State.reviews)}
if(ST.loggedIn)activate();
// Hook State.save
if(typeof State!=='undefined'){const orig=State.save.bind(State);State.save=function(k,d){orig(k,d);if(k==='orders')S.s('orders',d);if(k==='reviews')S.s('reviews',d)}}}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();

/* ---- PUBLIC API ---- */
window.E={
    login,logout,closeLogin,toggleSb,tab:switchTab,toggleInline,preview,saveAll,
    addProd,editProd,saveProd,delProd,clearCustom,closeProdModal,rndEmoji,
    updateContent,updateFaq,resetContent,
    updateColor,applyColors,resetColors,updateFont,applyFonts,resetFonts,
    saveLinks,resetLinks,
    updateVC,addVC,
    updOrdStatus,clearOrds,
    ftCmd,ftFont,ftSize,ftAlign,ftColor,applyColor,ftSave,ftCancel,
    closeConf,updContent
};

})();
