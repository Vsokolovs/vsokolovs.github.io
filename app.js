let DATA = null, ORIGINAL = null, dirty = false, authenticated = false;

const DEFAULT_DATA = {
  name:"Vladislavs Sokolovs",title:"Practice Lead: Data & Analytics",
  profile:"Data specialist with strong engineering background, experienced in designing and delivering data products across enterprise environments. Skilled in turning business needs into structured data solutions, owning product vision and roadmap, collaborating with cross-functional teams, and ensuring high-quality delivery. 7+ years across data engineering, analytics, finance, and BI development — giving me a pragmatic, end-to-end product mindset, based on best practices in governance and architecture.",
  contact:{phone:"+37126307373",email:"vladislavs.sokolov@gmail.com",location:"Jurmala, Latvia",linkedin:"",github:""},
  education:[
    {school:"Swiss School of Business",degree:"Master's in Business Administration",years:"2017 – 2019"},
    {school:"Banking University (BA)",degree:"Master's in Finance & Banking",years:"2017 – 2019"},
    {school:"Riga Graduate School of Law",degree:"Bachelor in Law & Business Program",years:"2014 – 2016"}
  ],
  skills:["Management Skills","Product Ownership","Agile Delivery","SQL","Python","Azure Stack","Databricks","dbt","Leadership","Business & Communication","Solution Design","Apache Kafka","Apache Spark","Polars","Pandas","PostgreSQL","MySQL","GDScript","Godot","Apache Iceberg","Microsoft Fabric","PowerBI","Looker"],
  languages:[{name:"English",level:95},{name:"Latvian",level:75},{name:"Russian",level:100}],
  experience:[
    {date:"2022 – Present",company:"Emergn",role:"Lead Data Engineer → D&A Practice Lead",description:"Took data owner responsibilities for several client data initiatives: defining scope, aligning with business stakeholders, managing data governance and implementation, preparing roadmaps, and prioritizing delivery for engineering teams. Owned end-to-end delivery of data products: data ingestion, data governance, transformation logic, quality processes, and BI output."},
    {date:"2019 – 2022",company:"Luminor Bank",role:"Mid-Senior Data Engineer / Data Analyst",description:"Supported and improved enterprise data products used across the bank (ETL pipelines, reporting layers, quality checks). Partnered with business stakeholders to gather requirements and translate them into scalable engineering tasks. Helped define acceptance criteria, test coverage, and documentation for multiple data initiatives."},
    {date:"2017 – 2019",company:"L'Oreal Baltics",role:"Corporate Finance Controller",description:"Delivered analytical insights, supported system implementations, handled cost control and budgeting. Led rollout of new accounting and travel expense systems."}
  ],
  projects:[{title:"Enterprise Data Platform",tech:"Azure · Databricks · dbt",description:"Designed and delivered a scalable data platform serving multiple business units with governed, high-quality data products.",link:""}],
  passwordHash:"8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918"
};

const ICONS = {
  phone:'<svg viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.72 11.72 0 003.66.59 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.72 11.72 0 00.59 3.66 1 1 0 01-.25 1.01l-2.22 2.12z"/></svg>',
  email:'<svg viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
  location:'<svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"/></svg>',
  linkedin:'<svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>',
  github:'<svg viewBox="0 0 24 24"><path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/></svg>'
};

async function init() {
  try {
    const r = await fetch('data.json?'+Date.now());
    if(!r.ok) throw 0;
    DATA = await r.json();
  } catch(e) {
    const ls = localStorage.getItem('cv_working');
    if(ls) DATA = JSON.parse(ls);
    else DATA = JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
  ORIGINAL = JSON.stringify(DATA);
  renderSite();
}

function esc(s){const d=document.createElement('div');d.textContent=s||'';return d.innerHTML;}

function renderSite(){
  const d=DATA;
  document.title=d.name+' — '+d.title;
  document.getElementById('sidebarName').textContent=d.name;
  document.getElementById('sidebarTitle').textContent=d.title;
  document.getElementById('mobileName').textContent=d.name;
  document.getElementById('photoInitials').textContent=d.name.split(' ').map(w=>w[0]).join('').slice(0,2);
  document.getElementById('footerYear').textContent=new Date().getFullYear();
  document.getElementById('footerName').textContent=d.name;

  let ch='';
  if(d.contact.phone)ch+=`<div class="contact-item">${ICONS.phone}<span>${esc(d.contact.phone)}</span></div>`;
  if(d.contact.email)ch+=`<div class="contact-item">${ICONS.email}<a href="mailto:${esc(d.contact.email)}">${esc(d.contact.email)}</a></div>`;
  if(d.contact.location)ch+=`<div class="contact-item">${ICONS.location}<span>${esc(d.contact.location)}</span></div>`;
  if(d.contact.linkedin)ch+=`<div class="contact-item">${ICONS.linkedin}<a href="${esc(d.contact.linkedin)}" target="_blank">LinkedIn</a></div>`;
  if(d.contact.github)ch+=`<div class="contact-item">${ICONS.github}<a href="${esc(d.contact.github)}" target="_blank">GitHub</a></div>`;
  document.getElementById('contactList').innerHTML=ch;

  document.getElementById('educationList').innerHTML=d.education.map(e=>`<div class="edu-item"><div class="edu-school">${esc(e.school)}</div><div class="edu-degree">${esc(e.degree)}</div><div class="edu-year">${esc(e.years)}</div></div>`).join('');
  document.getElementById('skillsList').innerHTML=d.skills.map(s=>`<span class="skill-tag">${esc(s)}</span>`).join('');
  document.getElementById('languagesList').innerHTML=d.languages.map(l=>`<div class="lang-item"><div class="lang-name">${esc(l.name)}</div><div class="lang-bar-track"><div class="lang-bar-fill" style="width:${l.level}%"></div></div></div>`).join('');
  document.getElementById('profileText').textContent=d.profile;
  document.getElementById('experienceTimeline').innerHTML=d.experience.map(e=>`<div class="timeline-item"><div class="timeline-date">${esc(e.date)}</div><div class="timeline-company">${esc(e.company)}</div><div class="timeline-role">${esc(e.role)}</div><p class="timeline-desc">${esc(e.description)}</p></div>`).join('');

  const pg=document.getElementById('projectsGrid');
  if(!d.projects||!d.projects.length) pg.innerHTML='<div class="empty-state">Projects coming soon.</div>';
  else pg.innerHTML=d.projects.map(p=>`<div class="project-card"><h3>${esc(p.title)}</h3><div class="project-tech">${esc(p.tech)}</div><p>${esc(p.description)}</p>${p.link?`<a class="project-link" href="${esc(p.link)}" target="_blank">View Project &rarr;</a>`:''}</div>`).join('');

  renderRightPanel();
}

function toggleSidebar(){document.getElementById('sidebar').classList.toggle('open');document.getElementById('sidebarOverlay').classList.toggle('active');}
function closeSidebar(){document.getElementById('sidebar').classList.remove('open');document.getElementById('sidebarOverlay').classList.remove('active');}

function renderRightPanel(){
  const d=DATA;
  const c=document.getElementById('rightPanelProjects');
  if(!d.projects||!d.projects.length){
    c.innerHTML='<div class="empty-state">Projects coming soon.</div>';
  } else {
    c.innerHTML='<div class="projects-grid">'+d.projects.map(p=>`<div class="project-card"><h3>${esc(p.title)}</h3><div class="project-tech">${esc(p.tech)}</div><p>${esc(p.description)}</p>${p.link?`<a class="project-link" href="${esc(p.link)}" target="_blank" rel="noopener">View Project &rarr;</a>`:''}</div>`).join('')+'</div>';
  }
}

function toggleRightPanel(){
  const isOpen=document.getElementById('rightPanel').classList.toggle('open');
  document.getElementById('rightPanelOverlay').classList.toggle('active',isOpen);
  document.getElementById('rightPanelToggle').style.display=isOpen?'none':'';
}

function navigateProjects(){
  if(window.innerWidth<=1400){
    if(!document.getElementById('rightPanel').classList.contains('open')){
      toggleRightPanel();
    }
  } else {
    document.getElementById('rightPanel').scrollTo({top:0,behavior:'smooth'});
  }
}

async function sha256(m){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(m));return Array.from(new Uint8Array(b)).map(x=>x.toString(16).padStart(2,'0')).join('');}

function openAdmin(){document.getElementById('adminOverlay').classList.add('active');authenticated?renderEditor():renderLogin();}
function closeAdmin(){document.getElementById('adminOverlay').classList.remove('active');}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAdmin();});

function renderLogin(){
  document.getElementById('adminBody').innerHTML=`
    <div class="login-box">
      <h3>Admin Access</h3>
      <p style="color:var(--muted);font-size:13.5px;margin-bottom:20px;">Enter your password to manage content.</p>
      <div class="form-group"><label>Password</label>
        <div class="pw-wrap"><input type="password" id="loginPw" placeholder="Password" onkeydown="if(event.key==='Enter')doLogin()">
        <button class="pw-toggle" onclick="togglePw('loginPw',this)" type="button">&#128065;</button></div>
      </div>
      <button class="btn btn-primary" onclick="doLogin()" style="width:100%">Sign In</button>
      <p style="color:var(--muted);font-size:11px;margin-top:14px;">Default: <code>admin</code></p>
    </div>`;
}

async function doLogin(){
  const h=await sha256(document.getElementById('loginPw').value);
  if(h===DATA.passwordHash){authenticated=true;toast('Welcome!','success');renderEditor();}
  else toast('Wrong password','error');
}

function togglePw(id,btn){const i=document.getElementById(id);i.type=i.type==='password'?'text':'password';}

function markDirty(){dirty=JSON.stringify(DATA)!==ORIGINAL;const b=document.getElementById('publishBanner');if(b)b.classList.toggle('show',dirty);}

function renderEditor(){
  const d=DATA;
  document.getElementById('adminBody').innerHTML=`
    <div class="publish-banner ${dirty?'show':''}" id="publishBanner">
      <div><strong>You have unpublished changes.</strong> Download the updated data.json and commit it to your GitHub repo.</div>
      <div class="publish-actions">
        <button class="btn btn-primary btn-sm" onclick="dlJSON()">&#11015; Download data.json</button>
        <button class="btn btn-outline btn-sm" onclick="cpJSON()">&#128203; Copy JSON</button>
      </div>
    </div>
    <div class="admin-tabs">
      <button class="admin-tab active" onclick="sTab('general',this)">General</button>
      <button class="admin-tab" onclick="sTab('experience',this)">Experience</button>
      <button class="admin-tab" onclick="sTab('education',this)">Education</button>
      <button class="admin-tab" onclick="sTab('projects',this)">Projects</button>
      <button class="admin-tab" onclick="sTab('skills',this)">Skills</button>
      <button class="admin-tab" onclick="sTab('settings',this)">Settings</button>
    </div>

    <div class="tab-content active" id="tab-general">
      <div class="form-group"><label>Full Name</label><input id="ed_name" value="${esc(d.name)}"></div>
      <div class="form-group"><label>Title</label><input id="ed_title" value="${esc(d.title)}"></div>
      <div class="form-group"><label>Profile</label><textarea id="ed_profile" rows="5">${esc(d.profile)}</textarea></div>
      <div class="form-group"><label>Phone</label><input id="ed_phone" value="${esc(d.contact.phone)}"></div>
      <div class="form-group"><label>Email</label><input id="ed_email" value="${esc(d.contact.email)}"></div>
      <div class="form-group"><label>Location</label><input id="ed_location" value="${esc(d.contact.location)}"></div>
      <div class="form-group"><label>LinkedIn URL</label><input id="ed_linkedin" value="${esc(d.contact.linkedin||'')}"></div>
      <div class="form-group"><label>GitHub URL</label><input id="ed_github" value="${esc(d.contact.github||'')}"></div>
      <button class="btn btn-primary" onclick="saveGen()">Save</button>
    </div>

    <div class="tab-content" id="tab-experience"><div id="expR"></div><button class="add-item-btn" onclick="addExp()">+ Add Experience</button><div style="margin-top:14px"><button class="btn btn-primary" onclick="saveExp()">Save</button></div></div>
    <div class="tab-content" id="tab-education"><div id="eduR"></div><button class="add-item-btn" onclick="addEdu()">+ Add Education</button><div style="margin-top:14px"><button class="btn btn-primary" onclick="saveEdu()">Save</button></div></div>
    <div class="tab-content" id="tab-projects"><div id="projR"></div><button class="add-item-btn" onclick="addProj()">+ Add Project</button><div style="margin-top:14px"><button class="btn btn-primary" onclick="saveProj()">Save</button></div></div>

    <div class="tab-content" id="tab-skills">
      <div class="form-group"><label>Skills (comma-separated)</label><textarea id="ed_skills" rows="3">${d.skills.join(', ')}</textarea></div>
      <h4 style="margin:18px 0 10px;font-family:var(--font-display);font-size:15px;">Languages</h4>
      <div id="langR"></div>
      <button class="add-item-btn" onclick="addLang()">+ Add Language</button>
      <div style="margin-top:14px"><button class="btn btn-primary" onclick="saveSkills()">Save</button></div>
    </div>

    <div class="tab-content" id="tab-settings">
      <h4 style="font-family:var(--font-display);margin-bottom:14px;">Change Password</h4>
      <div class="form-group"><label>New Password</label><input type="password" id="newPw"></div>
      <div class="form-group"><label>Confirm</label><input type="password" id="cfPw"></div>
      <button class="btn btn-primary" onclick="chPw()">Update Password</button>

      <div class="export-box">
        <h4>Publish Changes</h4>
        <p>After editing, download the new <code>data.json</code> and replace it in your GitHub repo. That's it &mdash; your site updates automatically.</p>
        <div class="export-btns">
          <button class="btn btn-primary btn-sm" onclick="dlJSON()">&#11015; Download data.json</button>
          <button class="btn btn-outline btn-sm" onclick="cpJSON()">&#128203; Copy to Clipboard</button>
        </div>
      </div>
      <div class="export-box" style="margin-top:14px;">
        <h4>Import / Reset</h4>
        <div class="export-btns">
          <button class="btn btn-outline btn-sm" onclick="document.getElementById('impF').click()">Import JSON</button>
          <input type="file" id="impF" accept=".json" style="display:none" onchange="impJSON(event)">
          <button class="btn btn-danger" onclick="resetAll()">Reset to Defaults</button>
        </div>
      </div>
      <div style="margin-top:24px"><button class="btn btn-danger" onclick="authenticated=false;renderLogin();toast('Signed out','success')">Sign Out</button></div>
    </div>`;
  rExpR();rEduR();rProjR();rLangR();
}

function sTab(n,b){document.querySelectorAll('.admin-tab').forEach(t=>t.classList.remove('active'));document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));b.classList.add('active');document.getElementById('tab-'+n).classList.add('active');}

function apply(){localStorage.setItem('cv_working',JSON.stringify(DATA));renderSite();markDirty();toast('Saved!','success');}

function saveGen(){
  DATA.name=$('ed_name').value.trim();DATA.title=$('ed_title').value.trim();DATA.profile=$('ed_profile').value.trim();
  DATA.contact.phone=$('ed_phone').value.trim();DATA.contact.email=$('ed_email').value.trim();DATA.contact.location=$('ed_location').value.trim();
  DATA.contact.linkedin=$('ed_linkedin').value.trim();DATA.contact.github=$('ed_github').value.trim();
  apply();
}

function rExpR(){$('expR').innerHTML=DATA.experience.map((e,i)=>`<div class="repeater-item"><div class="item-actions"><button class="btn btn-danger" onclick="rmExp(${i})">Remove</button></div><div class="form-group"><label>Dates</label><input id="xd${i}" value="${esc(e.date)}"></div><div class="form-group"><label>Company</label><input id="xc${i}" value="${esc(e.company)}"></div><div class="form-group"><label>Role</label><input id="xr${i}" value="${esc(e.role)}"></div><div class="form-group"><label>Description</label><textarea id="xdsc${i}" rows="3">${esc(e.description)}</textarea></div></div>`).join('');}
function addExp(){DATA.experience.push({date:'',company:'',role:'',description:''});rExpR();}
function rmExp(i){DATA.experience.splice(i,1);rExpR();}
function saveExp(){DATA.experience=DATA.experience.map((_,i)=>({date:$('xd'+i).value.trim(),company:$('xc'+i).value.trim(),role:$('xr'+i).value.trim(),description:$('xdsc'+i).value.trim()}));apply();}

function rEduR(){$('eduR').innerHTML=DATA.education.map((e,i)=>`<div class="repeater-item"><div class="item-actions"><button class="btn btn-danger" onclick="rmEdu(${i})">Remove</button></div><div class="form-group"><label>School</label><input id="es${i}" value="${esc(e.school)}"></div><div class="form-group"><label>Degree</label><input id="edg${i}" value="${esc(e.degree)}"></div><div class="form-group"><label>Years</label><input id="ey${i}" value="${esc(e.years)}"></div></div>`).join('');}
function addEdu(){DATA.education.push({school:'',degree:'',years:''});rEduR();}
function rmEdu(i){DATA.education.splice(i,1);rEduR();}
function saveEdu(){DATA.education=DATA.education.map((_,i)=>({school:$('es'+i).value.trim(),degree:$('edg'+i).value.trim(),years:$('ey'+i).value.trim()}));apply();}

function rProjR(){$('projR').innerHTML=DATA.projects.map((p,i)=>`<div class="repeater-item"><div class="item-actions"><button class="btn btn-danger" onclick="rmProj(${i})">Remove</button></div><div class="form-group"><label>Title</label><input id="pt${i}" value="${esc(p.title)}"></div><div class="form-group"><label>Tech</label><input id="ptc${i}" value="${esc(p.tech)}"></div><div class="form-group"><label>Description</label><textarea id="pd${i}" rows="3">${esc(p.description)}</textarea></div><div class="form-group"><label>Link</label><input id="pl${i}" value="${esc(p.link)}"></div></div>`).join('');}
function addProj(){DATA.projects.push({title:'',tech:'',description:'',link:''});rProjR();}
function rmProj(i){DATA.projects.splice(i,1);rProjR();}
function saveProj(){DATA.projects=DATA.projects.map((_,i)=>({title:$('pt'+i).value.trim(),tech:$('ptc'+i).value.trim(),description:$('pd'+i).value.trim(),link:$('pl'+i).value.trim()}));apply();}

function rLangR(){$('langR').innerHTML=DATA.languages.map((l,i)=>`<div class="repeater-item" style="display:flex;gap:10px;align-items:end;"><div class="form-group" style="flex:1;margin-bottom:0;"><label>Language</label><input id="ln${i}" value="${esc(l.name)}"></div><div class="form-group" style="width:90px;margin-bottom:0;"><label>Level %</label><input type="number" id="ll${i}" value="${l.level}" min="0" max="100"></div><button class="btn btn-danger" onclick="rmLang(${i})" style="margin-bottom:0;">&times;</button></div>`).join('');}
function addLang(){DATA.languages.push({name:'',level:50});rLangR();}
function rmLang(i){DATA.languages.splice(i,1);rLangR();}
function saveSkills(){DATA.skills=$('ed_skills').value.split(',').map(s=>s.trim()).filter(Boolean);DATA.languages=DATA.languages.map((_,i)=>({name:$('ln'+i).value.trim(),level:parseInt($('ll'+i).value)||50}));apply();}

async function chPw(){
  const n=$('newPw').value,c=$('cfPw').value;
  if(!n)return toast('Enter a password','error');
  if(n!==c)return toast('Passwords don\'t match','error');
  DATA.passwordHash=await sha256(n);
  localStorage.setItem('cv_working',JSON.stringify(DATA));markDirty();
  toast('Password updated!','success');
}

function getJSON(){return JSON.stringify(DATA,null,2);}

function dlJSON(){
  const b=new Blob([getJSON()],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='data.json';a.click();URL.revokeObjectURL(a.href);
  toast('Downloaded! Replace data.json in your repo and push.','info');
}

async function cpJSON(){
  try{await navigator.clipboard.writeText(getJSON());toast('Copied! Paste into data.json on GitHub.','info');}
  catch(e){const t=document.createElement('textarea');t.value=getJSON();document.body.appendChild(t);t.select();document.execCommand('copy');document.body.removeChild(t);toast('Copied!','info');}
}

function impJSON(ev){
  const f=ev.target.files[0];if(!f)return;
  const r=new FileReader();
  r.onload=function(e){try{DATA=JSON.parse(e.target.result);localStorage.setItem('cv_working',JSON.stringify(DATA));renderSite();renderEditor();markDirty();toast('Imported!','success');}catch(err){toast('Invalid JSON','error');}};
  r.readAsText(f);ev.target.value='';
}

function resetAll(){
  if(!confirm('Reset to the deployed version? Unsaved edits will be lost.'))return;
  localStorage.removeItem('cv_working');DATA=JSON.parse(ORIGINAL);dirty=false;
  renderSite();renderEditor();toast('Reset!','success');
}

function $(id){return document.getElementById(id);}

function toast(msg,type){
  const el=$('msgToast');el.textContent=msg;
  el.className='msg-toast '+type+' show';
  clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('show'),3500);
}

init();
