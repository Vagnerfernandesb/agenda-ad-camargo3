const DAYS = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"];
const $ = id => document.getElementById(id);
let installPrompt = null;
function esc(v=""){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function datePt(value){if(!value)return "";const [y,m,d]=value.split("-");return `${d}/${m}/${y}`;}
function sorted(list){return [...list].sort((a,b)=>(a.horario||"99:99").localeCompare(b.horario||"99:99")||a.titulo.localeCompare(b.titulo));}
function render(){
 const activities=Array.isArray(window.PROGRAMACAO?.atividades)?window.PROGRAMACAO.atividades:[];
 const weekly=activities.filter(a=>a.tipo==="weekly");
 const special=activities.filter(a=>a.tipo==="special").sort((a,b)=>(a.data||"9999").localeCompare(b.data||"9999")||(a.horario||"").localeCompare(b.horario||""));
 $("eventCount").textContent=`${weekly.length} ${weekly.length===1?"atividade":"atividades"}`;
 $("weeklyAgenda").innerHTML=DAYS.map((day,i)=>{
   const items=sorted(weekly.filter(a=>Number(a.dia)===i));
   return `<article class="day-card"><div class="day-head"><h3>${day}</h3><span class="day-symbol" aria-hidden="true">✦</span></div>${items.length?items.map(a=>`<div class="activity"><p class="activity-title">${esc(a.titulo)}</p><p class="activity-meta">${esc(a.horario||"Horário a confirmar")}</p>${a.descricao?`<p class="activity-description">${esc(a.descricao)}</p>`:""}</div>`).join(""):`<p class="empty-day">Nenhuma atividade cadastrada.</p>`}</article>`;
 }).join("");
 $("specialEvents").innerHTML=special.length?special.map(a=>`<article class="special-card"><h3>${esc(a.titulo)}</h3><p class="special-date">${a.data?datePt(a.data):DAYS[Number(a.dia)]} · ${esc(a.horario||"Horário a confirmar")}</p><p>${esc(a.descricao||"Mais informações em breve.")}</p></article>`).join(""):`<div class="empty-special">Nenhum evento especial cadastrado no momento. Volte em breve para conferir as novidades.</div>`;
}
function toast(msg){const el=$("toast");el.textContent=msg;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2600);}
$("shareBtn").addEventListener("click",async()=>{
 const text="Agenda semanal — Assembleia de Deus, Ministério do Belém - Camargo 3. Confira a programação da igreja:";
 const url=location.href;
 const whatsapp=`https://wa.me/?text=${encodeURIComponent(text+" "+url)}`;
 if(navigator.share){try{await navigator.share({title:"Agenda da Igreja — Camargo 3",text,url});return;}catch(e){if(e.name==="AbortError")return;}}
 window.open(whatsapp,"_blank","noopener,noreferrer");
});
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();installPrompt=e;$("installBtn").classList.remove("hidden");});
$("installBtn").addEventListener("click",async()=>{if(!installPrompt){toast("No menu do navegador, escolha 'Instalar app' ou 'Adicionar à tela inicial'.");return;}installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;$("installBtn").classList.add("hidden");});
if("serviceWorker" in navigator && location.protocol.startsWith("http"))window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
if(!Array.isArray(window.PROGRAMACAO?.atividades)){$("loadMessage").textContent="Não foi possível carregar a programação. Confira o arquivo programacao.js.";} else {render();}
