* {
  box-sizing: border-box;
}

:root {
  --bg: #f4efe8;
  --panel: #fffdf9;
  --sidebar: #1f2430;
  --sidebar-soft: #2d3542;
  --card: #ffffff;
  --line: #e7e3db;
  --ink: #1b1d20;
  --muted: #66707d;
  --urgent: #d95852;
  --urgent-soft: #fff1f0;
  --normal: #d9a73b;
  --normal-soft: #fff7e8;
  --low: #68a58d;
  --low-soft: #ebfaf4;
  --shadow: 0 20px 40px rgba(22, 28, 35, 0.08);
}

html, body {
  margin: 0;
  min-height: 100%;
  background: linear-gradient(180deg, #f4efe8 0%, #f7f4f1 100%);
  color: var(--ink);
  font-family: "Inter", sans-serif;
}

body {
  min-height: 100vh;
}

button, input, select, textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

.page-shell {
  display: grid;
  grid-template-columns: 260px 1fr;
  max-width: 1480px;
  margin: 0 auto;
  padding: 28px;
  gap: 28px;
}

.sidebar {
  background: linear-gradient(180deg, var(--sidebar) 0%, var(--sidebar-soft) 100%);
  border-radius: 28px;
  color: white;
  padding: 26px 22px;
  box-shadow: var(--shadow);
}

.brand-block h1,
.topbar h2,
.notes-header h3,
.dialog-header h3 {
  margin: 0;
  font-weight: 800;
  letter-spacing: -0.04em;
}

.brand-block h1 {
  font-size: 2.2rem;
  font-family: "Libre Baskerville", serif;
}

.eyebrow {
  margin: 0 0 10px;
  text-transform: uppercase;
  letter-spacing: 0.13em;
  font-size: 0.72rem;
  font-weight: 700;
  opacity: 0.8;
}

.eyebrow.accent {
  color: var(--urgent);
}

.summary-card,
.mini-note {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 18px;
  padding: 18px 16px;
  margin-top: 28px;
}

.label {
  margin: 0 0 14px;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.7;
}

.summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 14px;
}

.summary-row:first-of-type {
  margin-top: 0;
}

.count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 42px;
  height: 36px;
  border-radius: 999px;
  font-weight: 700;
}

.count.urgent { background: rgba(217, 88, 82, 0.15); color: #ffb2ad; }
.count.normal { background: rgba(217, 168, 59, 0.15); color: #f7d178; }
.count.low { background: rgba(104, 165, 141, 0.15); color: #adf0d0; }

.meta {
  margin-left: auto;
  opacity: 0.8;
}

.mini-note {
  color: rgba(255, 255, 255, 0.9);
}

.mini-note p:last-child {
  margin: 0;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.78);
}

.main-panel {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 20px;
  padding: 8px 8px 0;
}

.topbar h2 {
  font-size: clamp(2.2rem, 3vw, 3.2rem);
  line-height: 1.1;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
}

.legend {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  color: var(--muted);
  font-size: 0.78rem;
  font-weight: 600;
}

.legend span {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.dot.urgent { background: var(--urgent); }
.dot.normal { background: var(--normal); }
.dot.low { background: var(--low); }

.primary-button,
.secondary-button,
.close-button {
  border: none;
  border-radius: 12px;
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.primary-button {
  background: var(--ink);
  color: white;
  padding: 12px 18px;
  font-weight: 700;
}

.secondary-button {
  background: #f7f5f2;
  color: var(--ink);
  padding: 12px 18px;
  border: 1px solid var(--line);
  font-weight: 600;
}

.primary-button:hover,
.secondary-button:hover,
.close-button:hover,
.add-task:hover,
.task-card:hover {
  transform: translateY(-1px);
}

.planner {
  display: grid;
  grid-template-columns: repeat(7, minmax(180px, 1fr));
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.day-column {
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid var(--line);
  border-radius: 22px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
  min-height: 420px;
  padding: 16px 14px 14px;
}

.day-column.today {
  border-color: rgba(31, 36, 48, 0.8);
  box-shadow: 0 10px 20px rgba(32, 37, 42, 0.07);
}

.day-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid var(--line);
  padding-bottom: 12px;
  margin-bottom: 12px;
}

.day-name {
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  font-weight: 700;
  color: var(--muted);
  text-transform: uppercase;
}

.day-date {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: #f5f1eb;
  font-weight: 700;
}

.today .day-date {
  background: var(--ink);
  color: white;
}

.task-list {
  display: grid;
  gap: 10px;
}

.task-card {
  position: relative;
  border-left: 5px solid;
  border-radius: 14px;
  padding: 12px 10px 10px 12px;
  display: grid;
  gap: 8px;
  box-shadow: 0 8px 14px rgba(30, 35, 45, 0.04);
}

.task-card.urgent {
  background: var(--urgent-soft);
  border-left-color: var(--urgent);
}

.task-card.normal {
  background: var(--normal-soft);
  border-left-color: var(--normal);
}

.task-card.low {
  background: var(--low-soft);
  border-left-color: var(--low);
}

.task-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.task-priority-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 7px;
  border-radius: 999px;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.task-card.urgent .task-priority-pill {
  background: rgba(217, 88, 82, 0.12);
  color: #b34741;
}

.task-card.normal .task-priority-pill {
  background: rgba(217, 168, 59, 0.12);
  color: #97711d;
}

.task-card.low .task-priority-pill {
  background: rgba(104, 165, 141, 0.12);
  color: #447b67;
}

.task-delete {
  border: none;
  background: rgba(27, 29, 32, 0.06);
  color: var(--ink);
  border-radius: 8px;
  width: 26px;
  height: 26px;
  font-size: 1rem;
  font-weight: 700;
}

.task-title {
  line-height: 1.45;
  font-weight: 600;
  word-break: break-word;
}

.add-task {
  margin-top: 12px;
  width: 100%;
  border: 1px dashed rgba(27, 29, 32, 0.22);
  background: transparent;
  color: var(--muted);
  border-radius: 12px;
  padding: 11px 10px;
  font-weight: 600;
}

.notes-panel {
  background: rgba(255, 255, 255, 0.76);
  border: 1px solid var(--line);
  border-radius: 24px;
  padding: 22px 20px 18px;
  box-shadow: var(--shadow);
}

.notes-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.notes-header h3 {
  font-size: clamp(1.3rem, 2vw, 1.8rem);
}

.saved-status {
  color: var(--muted);
  font-size: 0.75rem;
  font-weight: 600;
}

textarea {
  width: 100%;
  min-height: 120px;
  border: 1px solid var(--line);
  border-radius: 14px;
  margin-top: 18px;
  resize: vertical;
  background: #fff;
  padding: 15px 14px;
  color: var(--ink);
  outline: none;
}

textarea:focus,
input:focus,
select:focus {
  border-color: rgba(27, 29, 32, 0.4);
  box-shadow: 0 0 0 4px rgba(27, 29, 32, 0.06);
}

#taskDialog {
  border: none;
  border-radius: 22px;
  padding: 0;
  width: min(420px, calc(100vw - 30px));
  box-shadow: 0 24px 60px rgba(17, 24, 39, 0.2);
}

#taskDialog::backdrop {
  background: rgba(17, 24, 39, 0.45);
}

#taskForm {
  padding: 22px 20px 20px;
}

.dialog-header {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}

.close-button {
  background: #f5f2ee;
  color: var(--ink);
  width: 34px;
  height: 34px;
  font-size: 1.7rem;
  line-height: 1;
}

label {
  display: block;
  margin-top: 14px;
  font-weight: 600;
  font-size: 0.78rem;
  color: var(--muted);
}

input,
select {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #fff;
  color: var(--ink);
  padding: 12px 13px;
  margin-top: 8px;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

@media (max-width: 1100px) {
  .page-shell {
    grid-template-columns: 1fr;
  }

  .sidebar {
    padding: 22px 18px;
  }
}

@media (max-width: 720px) {
  .page-shell {
    padding: 16px;
  }

  .topbar {
    align-items: start;
    flex-direction: column;
  }

  .planner {
    grid-template-columns: repeat(7, minmax(160px, 1fr));
  }

  .notes-header {
    flex-direction: column;
    align-items: start;
  }
}
