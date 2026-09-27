const DAYS=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const KEY='weekly-planner-data';
const COLORS_KEY='planner-colors';
const DEFAULT_COLORS={urgent:'#d95852',normal:'#d9a73b',low:'#68a58d'};

let state;
try{state={...{tasks:[],notes:''},...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{state={tasks:[],notes:''}}

let colors=DEFAULT_COLORS;
try{const saved=localStorage.getItem(COLORS_KEY);if(saved)colors={...DEFAULT_COLORS,...JSON.parse(saved)}}catch{colors=DEFAULT_COLORS}

function setColors(){Object.keys(colors).forEach(key=>{document.documentElement.style.setProperty(`--${key}`,colors[key])})

  const urgentSoft=hexToRgba(colors.urgent,.08);const normalSoft=hexToRgba(colors.normal,.08);const lowSoft=hexToRgba(colors.low,.08);
  document.documentElement.style.setProperty('--urgentSoft',urgentSoft);document.documentElement.style.setProperty('--normalSoft',normalSoft);document.documentElement.style.setProperty('--lowSoft',lowSoft)}

function hexToRgba(hex,alpha=1){const r=parseInt(hex.slice(1,3),16);const g=parseInt(hex.slice(3,5),16);const b=parseInt(hex.slice(5,7),16);return `rgba(${r},${g},${b},${alpha})`}

const $=selector=>document.querySelector(selector);
const $$=selector=>document.querySelectorAll(selector);
const grid=$('#plannerGrid'),dialog=$('#taskDialog'),form=$('#taskForm'),notes=$('#notes'),colorDialog=$('#colorDialog'),colorForm=$('#colorForm');

function dates(){const today=new Date();const monday=new Date(today.getFullYear(),today.getMonth(),today.getDate()-((today.getDay()+6)%7));return DAYS.map((name,i)=>{const date=new Date(monday);date.setDate(monday.getDate()+i);return{name,date}})}

function esc(value=''){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}

function save(){localStorage.setItem(KEY,JSON.stringify(state));$('#savedStatus').textContent='Saved locally'}

function saveColors(){localStorage.setItem(COLORS_KEY,JSON.stringify(colors));setColors();render()}

function updateSummary(){['urgent','normal','low'].forEach(priority=>{$(`#${priority}Count`).textContent=state.tasks.filter(t=>t.priority===priority).length});const urgent=state.tasks.filter(t=>t.priority==='urgent').length;$('#focusMessage').textContent=urgent?`${urgent} urgent ${urgent===1?'task needs':'tasks need'} your attention.`:state.tasks.length?'You are on top of your week.':'Start by adding a task to your week.'}

function render(){const week=dates();$('#weekRange').textContent=`${week[0].date.toLocaleDateString(undefined,{month:'short',day:'numeric'})} – ${week[6].date.toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'})}`;const today=new Date().toDateString();grid.innerHTML=week.map(({name,date})=>{const tasks=state.tasks.filter(t=>t.day===name);return `<article class="day-column ${date.toDateString()===today?'today':''}" data-day="${name}"><header class="day-header"><span class="day-name">${name}</span><span class="day-date">${date.getDate()}</span></header><div class="task-list">${tasks.length?tasks.map(task=>`<div class="task-card ${task.priority}" draggable="true" data-id="${esc(task.id)}" title="Click to edit"><div class="task-meta"><span class="task-priority-pill">${task.priority}</span><button class="task-delete" type="button" data-delete="${esc(task.id)}" aria-label="Delete ${esc(task.title)}">&times;</button></div><div class="task-title">${esc(task.title)}</div></div>`).join(''):'<div class="empty-slot">Drop tasks here</div>'}</div><button class="add-task" type="button" data-add="${name}">+ Add task</button></article>`}).join('');notes.value=state.notes;updateSummary();bindDragAndDrop()}

function openTask(day,task){$('#taskDay').value=day;$('#taskId').value=task?.id||'';$('#taskTitle').value=task?.title||'';$('#taskPriority').value=task?.priority||'normal';$('#dialogTitle').textContent=task?'Edit task':'Add task';dialog.showModal();$('#taskTitle').focus()}

function bindDragAndDrop(){grid.querySelectorAll('.task-card').forEach(card=>{card.addEventListener('dragstart',e=>{card.classList.add('dragging');e.dataTransfer.setData('text/plain',card.dataset.id);e.dataTransfer.effectAllowed='move'});card.addEventListener('dragend',()=>card.classList.remove('dragging'))});grid.querySelectorAll('.day-column').forEach(column=>{column.addEventListener('dragover',e=>{e.preventDefault();column.classList.add('drag-over')});column.addEventListener('dragleave',e=>{if(!column.contains(e.relatedTarget))column.classList.remove('drag-over')});column.addEventListener('drop',e=>{e.preventDefault();column.classList.remove('drag-over');const task=state.tasks.find(t=>t.id===e.dataTransfer.getData('text/plain'));if(task&&task.day!==column.dataset.day){task.day=column.dataset.day;save();render()}})})}

grid.addEventListener('click',e=>{const del=e.target.closest('[data-delete]');if(del){e.stopPropagation();state.tasks=state.tasks.filter(t=>t.id!==del.dataset.delete);save();render();return}const add=e.target.closest('[data-add]');if(add){openTask(add.dataset.add);return}const card=e.target.closest('[data-id]');if(card){const task=state.tasks.find(t=>t.id===card.dataset.id);if(task)openTask(task.day,task)}});

form.addEventListener('submit',e=>{e.preventDefault();const id=$('#taskId').value;const task={id:id||crypto.randomUUID(),day:$('#taskDay').value,title:$('#taskTitle').value.trim(),priority:$('#taskPriority').value};if(id)state.tasks=state.tasks.map(t=>t.id===id?task:t);else state.tasks.push(task);save();render();dialog.close()});

$('#cancelTask').addEventListener('click',()=>dialog.close());$('#closeTask').addEventListener('click',()=>dialog.close());notes.addEventListener('input',()=>{state.notes=notes.value;save()});

$$('.theme-btn').forEach(btn=>{btn.addEventListener('click',()=>{const isDark=btn.dataset.theme==='dark';document.body.classList.toggle('dark-mode',isDark);$$('.theme-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');localStorage.setItem('theme',isDark?'dark':'light')})});

const savedTheme=localStorage.getItem('theme')||'light';if(savedTheme==='dark'){document.body.classList.add('dark-mode');$('[data-theme="dark"]').classList.add('active')}else{$('[data-theme="light"]').classList.add('active')}

$('#settingsToggle').addEventListener('click',()=>{$$('.color-input').forEach(input=>{const key=input.dataset.key;input.value=colors[key]});$$('.color-hex').forEach(hex=>{const key=hex.dataset.key;hex.value=colors[key]});colorDialog.showModal()});

$$('.color-input').forEach(input=>{input.addEventListener('input',()=>{const key=input.dataset.key;colors[key]=input.value;$$('.color-hex').forEach(hex=>{if(hex.dataset.key===key)hex.value=input.value});setColors()})});

$('#resetColors').addEventListener('click',e=>{e.preventDefault();colors={...DEFAULT_COLORS};$$('.color-input').forEach(input=>{const key=input.dataset.key;input.value=colors[key]});$$('.color-hex').forEach(hex=>{const key=hex.dataset.key;hex.value=colors[key]});setColors()});

colorForm.addEventListener('submit',e=>{e.preventDefault();saveColors();colorDialog.close()});

$('#closeColor').addEventListener('click',()=>colorDialog.close());

$('#todayButton').addEventListener('click',()=>$('.today')?.scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'}));

setColors();render();
