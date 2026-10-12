const STORAGE_KEY = "ad-camargo3-agenda-v1";
const DAYS = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"];
const seedEvents = [
 {id:"w1",type:"weekly",title:"Escola Bíblica Dominical",day:0,time:"09:00",date:"",description:"Estudo da Palavra de Deus."},
 {id:"w2",type:"weekly",title:"Culto da Família",day:0,time:"18:00",date:"",description:"Culto de adoração e comunhão."},
 {id:"w3",type:"weekly",title:"Círculo de oração",day:1,time:"19:00",date:"",description:"Momento de oração e intercessão."},
 {id:"w4",type:"weekly",title:"Culto de ensino",day:2,time:"19:30",date:"",description:"Aprendizado e reflexão bíblica."},
 {id:"w5",type:"weekly",title:"Culto de ensino — Sede",day:3,time:"19:30",date:"",description:"Programação na sede."},
 {id:"w6",type:"weekly",title:"Culto do Propósito",day:4,time:"19:30",date:"",description:"Culto de oração e propósito."},
 {id:"w7",type:"weekly",title:"Ensaio do grupo de homens",day:5,time:"19:00",date:"",description:"Ensaio musical."},
 {id:"w8",type:"weekly",title:"Ensaio / atividades especiais",day:6,time:"15:00",date:"",description:"Confirme a atividade nos avisos da igreja."}
];
let events = loadEvents();
let installPrompt = null;
const $ = id => document.getElementById(id);

function loadEvents(){
  try { const raw=localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : [...seedEvents]; }
  catch { return [...seedEvents]; }
}
function saveEvents(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(events)); render(); }
function escapeHtml(value=""){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function prettyDate(value){ if(!value)return ""; const [y,m,d]=value.split("-"); return `${d}/${m}/${y}`; }
function sortEvents(list){return [...list].sort((a,b)=>(a.time||"99:99").localeCompare(b.time||"99:99") || a.title.localeCompare(b.title));}
function render(){
  const weekly=events.filter(e=>e.type==="weekly");
  $("eventCount").textContent=`${weekly.length} ${weekly.length===1?"atividade":"atividades"}`;
  $("weeklyAgenda").innerHTML=DAYS.map((day,i)=>{
    const items=sortEvents(weekly.filter(e=>Number(e.day)===i));
    return `<article class="day-card"><div class="day-head"><h3>${day}</h3><span class="day-symbol" aria-hidden="true">✦</span></div>${items.length?items.map(e=>`<div class="activity"><p class="activity-title">${escapeHtml(e.title)}</p><p class="activity-meta">${escapeHtml(e.time||"Horário a confirmar")}</p>${e.description?`<p class="activity-description">${escapeHtml(e.description)}</p>`:""}</div>`).join(""):`<p class="empty-day">Nenhuma atividade cadastrada.</p>`}</article>`;
  }).join("");
  const specials=events.filter(e=>e.type==="special").sort((a,b)=>(a.date||"9999").localeCompare(b.date||"9999")||(a.time||"").localeCompare(b.time||""));
  $("specialEvents").innerHTML=specials.length?specials.map(e=>`<article class="special-card"><h3>${escapeHtml(e.title)}</h3><p class="special-date">${e.date?prettyDate(e.date):DAYS[Number(e.day)]} · ${escapeHtml(e.time||"Horário a confirmar")}</p><p>${escapeHtml(e.description||"Mais informações em breve.")}</p></article>`).join(""):`<div class="empty-special">Nenhum evento especial cadastrado no momento. Volte em breve para conferir as novidades.</div>`;
  renderAdminList();
}
function renderAdminList(){
  const sorted=[...events].sort((a,b)=>a.type.localeCompare(b.type)||Number(a.day)-Number(b.day)||(a.time||"").localeCompare(b.time||""));
  $("adminList").innerHTML=sorted.length?sorted.map(e=>`<div class="admin-item"><div><strong>${escapeHtml(e.title)}</strong><small>${e.type==="special"?"Evento especial":"Semanal"} · ${e.date?prettyDate(e.date)+" · ":DAYS[Number(e.day)]+" · "}${escapeHtml(e.time||"sem horário")}</small></div><div class="item-actions"><button class="mini-button" data-edit="${escapeHtml(e.id)}" type="button">Editar</button><button class="mini-button" data-delete="${escapeHtml(e.id)}" type="button">Excluir</button></div></div>`).join(""):`<p class="muted small">Nenhuma atividade cadastrada.</p>`;
}
function toast(message){const el=$("toast");el.textContent=message;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2600);}
function resetForm(){ $("eventForm").reset();$("eventId").value="";$("eventType").value="weekly";$("eventDay").value="0";$("cancelEdit").classList.add("hidden"); }
$("eventType").addEventListener("change",()=>{const isSpecial=$("eventType").value==="special";$("eventDate").required=false;$("eventDay").disabled=isSpecial&&!!$("eventDate").value;$("eventDate").addEventListener("input",()=>{$("eventDay").disabled=isSpecial&&!!$("eventDate").value;},{once:true});});
$("eventDate").addEventListener("input",()=>{$("eventDay").disabled=$("eventType").value==="special"&&!!$("eventDate").value;});
$("eventForm").addEventListener("submit",e=>{
 e.preventDefault();
 const id=$("eventId").value||`e-${Date.now()}`;
 const item={id,type:$("eventType").value,title:$("eventTitle").value.trim(),day:Number($("eventDay").value),time:$("eventTime").value,date:$("eventDate").value,description:$("eventDescription").value.trim()};
 if(!item.title){toast("Informe o nome da atividade.");return;}
 const idx=events.findIndex(x=>x.id===id);if(idx>=0)events[idx]=item;else events.push(item);
 saveEvents();resetForm();toast("Atividade salva neste dispositivo.");
});
$("adminList").addEventListener("click",e=>{
 const edit=e.target.dataset.edit, del=e.target.dataset.delete;
 if(edit){const item=events.find(x=>x.id===edit);if(!item)return;
  $("eventId").value=item.id;$("eventType").value=item.type;$("eventTitle").value=item.title;$("eventDay").value=String(item.day??0);$("eventTime").value=item.time||"";$("eventDate").value=item.date||"";$("eventDescription").value=item.description||"";$("eventDay").disabled=item.type==="special"&&!!item.date;$("cancelEdit").classList.remove("hidden");$("eventForm").scrollIntoView({behavior:"smooth",block:"start"});
 }
 if(del){const item=events.find(x=>x.id===del);if(item&&confirm(`Excluir "${item.title}"?`)){events=events.filter(x=>x.id!==del);saveEvents();toast("Atividade excluída.");}}
});
$("cancelEdit").addEventListener("click",resetForm);
$("toggleAdmin").addEventListener("click",()=>{const panel=$("adminPanel");panel.classList.toggle("hidden");$("toggleAdmin").textContent=panel.classList.contains("hidden")?"Abrir painel":"Fechar painel";if(!panel.classList.contains("hidden"))panel.scrollIntoView({behavior:"smooth",block:"start"});});
$("resetBtn").addEventListener("click",()=>{if(confirm("Restaurar a programação de exemplo? Suas alterações atuais serão substituídas neste dispositivo.")){events=[...seedEvents];saveEvents();resetForm();toast("Programação de exemplo restaurada.");}});
$("shareBtn").addEventListener("click",async()=>{
 const text="Agenda semanal — Assembleia de Deus, Ministério do Belém - Camargo 3. Confira a programação da igreja.";
 const data={title:"Agenda da Igreja — Camargo 3",text,url:location.href};
 try{if(navigator.share)await navigator.share(data);else{await navigator.clipboard.writeText(`${text}\n${location.href}`);toast("Texto e link copiados para compartilhar.");}}catch(err){if(err.name!=="AbortError")toast("Não foi possível compartilhar automaticamente. Copie o link do navegador.");}
});
$("exportBtn").addEventListener("click",()=>{
 const blob=new Blob([JSON.stringify(events,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="agenda-camargo3-backup.json";a.click();URL.revokeObjectURL(url);toast("Cópia de segurança exportada.");
});
$("importFile").addEventListener("change",async e=>{
 const file=e.target.files[0];if(!file)return;
 try{const parsed=JSON.parse(await file.text());if(!Array.isArray(parsed)||!parsed.every(x=>x&&x.title&&["weekly","special"].includes(x.type)))throw new Error("invalid");events=parsed;saveEvents();toast("Cópia de segurança importada.");}
 catch{toast("Arquivo inválido. Selecione um JSON exportado por este site.");}
 e.target.value="";
});
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();installPrompt=e;$("installBtn").classList.remove("hidden");});
$("installBtn").addEventListener("click",async()=>{if(!installPrompt)return;installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;$("installBtn").classList.add("hidden");});
if("serviceWorker" in navigator && location.protocol.startsWith("http"))window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
render();
