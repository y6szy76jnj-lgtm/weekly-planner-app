const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const STORAGE_KEY = 'weekly-planner-data';
const state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"tasks":[],"notes":""}');
const grid = document.querySelector('#plannerGrid');
const dialog = document.querySelector('#taskDialog');
const form = document.querySelector('#taskForm');
const notes = document.querySelector('#notes');

function weekDates() {
  const now = new Date();
  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const mondayOffset = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - mondayOffset);
  return DAYS.map((name, index) => { const day = new Date(date); day.setDate(date.getDate() + index); return { name, date: day }; });
}
function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); document.querySelector('#savedStatus').textContent = 'Saved locally'; }
function render() {
  const dates = weekDates();
  document.querySelector('#weekRange').textContent = `${dates[0].date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} – ${dates[6].date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`;
  const today = new Date().toDateString();
  grid.innerHTML = dates.map(({ name, date }) => {
    const dayTasks = state.tasks.filter(task => task.day === name);
    return `<article class="day-column ${date.toDateString() === today ? 'today' : ''}" data-day="${name}">
      <header class="day-header"><div class="day-name">${name}</div><div class="day-date">${date.getDate()}</div></header>
      <div class="task-list">${dayTasks.map(task => `<div class="task ${task.priority}" data-id="${task.id}" title="Click to edit"><div class="task-title">${escapeHtml(task.title)}</div><div class="task-priority">${task.priority}</div></div>`).join('')}</div>
      <button class="add-task" data-add="${name}" type="button">+ Add task</button>
    </article>`;
  }).join('');
  notes.value = state.notes;
}
function escapeHtml(value) { return value.replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[char])); }
function openTask(day, task) { document.querySelector('#taskDay').value = day; document.querySelector('#taskId').value = task?.id || ''; document.querySelector('#taskTitle').value = task?.title || ''; document.querySelector('#taskPriority').value = task?.priority || 'normal'; document.querySelector('#dialogTitle').textContent = task ? 'Edit task' : 'Add task'; dialog.showModal(); document.querySelector('#taskTitle').focus(); }
grid.addEventListener('click', event => { const add = event.target.closest('[data-add]'); if (add) return openTask(add.dataset.add); const taskEl = event.target.closest('[data-id]'); if (taskEl) { const task = state.tasks.find(item => item.id === taskEl.dataset.id); openTask(task.day, task); } });
form.addEventListener('submit', event => { event.preventDefault(); const id = document.querySelector('#taskId').value; const task = { id: id || crypto.randomUUID(), day: document.querySelector('#taskDay').value, title: document.querySelector('#taskTitle').value.trim(), priority: document.querySelector('#taskPriority').value }; if (id) state.tasks = state.tasks.map(item => item.id === id ? task : item); else state.tasks.push(task); save(); render(); dialog.close(); });
notes.addEventListener('input', () => { state.notes = notes.value; save(); });
document.querySelector('#todayButton').addEventListener('click', () => document.querySelector('.today')?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }));
render();
