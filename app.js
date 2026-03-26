let DATA = null;

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
  projects:[{title:"Enterprise Data Platform",tech:"Azure · Databricks · dbt",description:"Designed and delivered a scalable data platform serving multiple business units with governed, high-quality data products.",link:""}]
};

const ICONS = {
  phone:'<svg viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.72 11.72 0 003.66.59 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.72 11.72 0 00.59 3.66 1 1 0 01-.25 1.01l-2.22 2.12z"/></svg>',
  email:'<svg viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
  location:'<svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"/></svg>',
  linkedin:'<svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>',
  github:'<svg viewBox="0 0 24 24"><path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/></svg>'
};

function esc(s){var d=document.createElement('div');d.textContent=s||'';return d.innerHTML;}
function $(id){return document.getElementById(id);}

async function loadData(){
  try{
    var r=await fetch('data.json?'+Date.now());
    if(!r.ok) throw 0;
    return await r.json();
  }catch(e){
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

// ===== HOME PAGE =====
function renderHome(){
  var d=DATA;
  document.title=d.name+' \u2014 '+d.title;

  // Sidebar
  if($('sidebarName')) $('sidebarName').textContent=d.name;
  if($('sidebarTitle')) $('sidebarTitle').textContent=d.title;
  if($('mobileName')) $('mobileName').textContent=d.name;
  if($('photoInitials')) $('photoInitials').textContent=d.name.split(' ').map(function(w){return w[0];}).join('').slice(0,2);

  // Contact
  var ch='';
  if(d.contact.phone) ch+='<div class="contact-item">'+ICONS.phone+'<span>'+esc(d.contact.phone)+'</span></div>';
  if(d.contact.email) ch+='<div class="contact-item">'+ICONS.email+'<a href="mailto:'+esc(d.contact.email)+'">'+esc(d.contact.email)+'</a></div>';
  if(d.contact.location) ch+='<div class="contact-item">'+ICONS.location+'<span>'+esc(d.contact.location)+'</span></div>';
  if(d.contact.linkedin) ch+='<div class="contact-item">'+ICONS.linkedin+'<a href="'+esc(d.contact.linkedin)+'" target="_blank" rel="noopener">LinkedIn</a></div>';
  if(d.contact.github) ch+='<div class="contact-item">'+ICONS.github+'<a href="'+esc(d.contact.github)+'" target="_blank" rel="noopener">GitHub</a></div>';
  if($('contactList')) $('contactList').innerHTML=ch;

  // Education
  if($('educationList')){
    $('educationList').innerHTML=d.education.map(function(e){
      return '<div class="edu-item"><div class="edu-school">'+esc(e.school)+'</div><div class="edu-degree">'+esc(e.degree)+'</div><div class="edu-year">'+esc(e.years)+'</div></div>';
    }).join('');
  }

  // Skills
  if($('skillsList')){
    $('skillsList').innerHTML=d.skills.map(function(s){return '<span class="skill-tag">'+esc(s)+'</span>';}).join('');
  }

  // Languages
  if($('languagesList')){
    $('languagesList').innerHTML=d.languages.map(function(l){
      return '<div class="lang-item"><div class="lang-name">'+esc(l.name)+'</div><div class="lang-bar-track"><div class="lang-bar-fill" style="width:'+l.level+'%"></div></div></div>';
    }).join('');
  }

  // Main content
  if($('profileText')) $('profileText').textContent=d.profile;

  if($('experienceTimeline')){
    $('experienceTimeline').innerHTML=d.experience.map(function(e){
      return '<div class="timeline-item"><div class="timeline-date">'+esc(e.date)+'</div><div class="timeline-company">'+esc(e.company)+'</div><div class="timeline-role">'+esc(e.role)+'</div><p class="timeline-desc">'+esc(e.description)+'</p></div>';
    }).join('');
  }

  // Footer
  if($('footerYear')) $('footerYear').textContent=new Date().getFullYear();
  if($('footerName')) $('footerName').textContent=d.name;
}

// ===== PROJECTS PAGE =====
function renderProjects(){
  var d=DATA;
  document.title=d.name+' \u2014 Projects';

  if($('projectsBrand')) $('projectsBrand').textContent=d.name;
  if($('footerYear')) $('footerYear').textContent=new Date().getFullYear();
  if($('footerName')) $('footerName').textContent=d.name;

  var pg=$('projectsGrid');
  if(!pg) return;
  if(!d.projects||!d.projects.length){
    pg.innerHTML='<div class="empty-state">Projects coming soon.</div>';
  } else {
    pg.innerHTML=d.projects.map(function(p){
      return '<div class="project-card"><h3>'+esc(p.title)+'</h3><div class="project-tech">'+esc(p.tech)+'</div><p>'+esc(p.description)+'</p>'+(p.link?'<a class="project-link" href="'+esc(p.link)+'" target="_blank" rel="noopener">View Project &rarr;</a>':'')+'</div>';
    }).join('');
  }
}

// ===== SIDEBAR TOGGLE =====
function toggleSidebar(){
  $('sidebar').classList.toggle('open');
  $('sidebarOverlay').classList.toggle('active');
}
function closeSidebar(){
  $('sidebar').classList.remove('open');
  $('sidebarOverlay').classList.remove('active');
}

// ===== INIT =====
async function init(){
  DATA=await loadData();
  // Render home if sidebar elements exist
  if($('sidebarName')) renderHome();
  // Render projects if grid exists
  if($('projectsGrid')) renderProjects();
}

init();
