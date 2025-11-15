// components/tasks.js
// Simple rule-based assignment splitter
window.Tasks = (function(){
  const btn = () => document.getElementById('generate-task');
  const output = () => document.getElementById('task-output');

  function estimateHours(level, title){
    const base = level === 'easy' ? 2 : level === 'medium' ? 5 : 9;
    return Math.max(1, Math.round(base + (title.length % 5) - 2));
  }

  function splitIntoSteps(name, level) {
    const stepsBase = [
      `Read assignment instructions carefully and list requirements.`,
      `Gather necessary materials and resources (books, notes, links).`,
      `Outline the sections and decide the flow/order.`,
      `Work on the first draft of the main sections (focus on content).`,
      `Review, proofread, and correct calculations/formatting.`,
      `Prepare final formatting, citations, and submit.`
    ];

    let steps = stepsBase.slice(0, level === 'easy' ? 4 : level === 'medium' ? 5 : 6);

    const est = estimateHours(level, name);
    const per = Math.max(1, Math.round(est / steps.length));

    return steps.map((s, i) => ({ step: s, estHours: per }));
  }

  function renderSteps(name, deadline, level){
    const list = splitIntoSteps(name, level);
    const el = document.createElement('div');
    el.className = 'output-area card';
    let html = `<h3 class="small">Plan for: ${escapeHtml(name || 'Untitled')}</h3>`;
    if(deadline) html += `<div class="small">Deadline: ${escapeHtml(deadline)}</div>`;
    html += `<ul>`;
    list.forEach((it, idx) => {
      html += `<li><strong>Step ${idx+1}:</strong> ${escapeHtml(it.step)} <span class="small"> — est ${it.estHours}h</span></li>`;
    });
    html += `</ul>`;
    html += `<div style="margin-top:10px; display:flex; gap:8px;"><button id="start-first" class="primary-btn">Start First Step</button><button id="export-plan" class="ghost-btn">Export Plan</button></div>`;
    el.innerHTML = html;
    output().innerHTML = '';
    output().appendChild(el);

    document.getElementById('start-first').addEventListener('click', () => {
      document.querySelector('[data-screen="focusRoom"]').click?.();
      setTimeout(()=> {
        if(window.FocusRoom) window.FocusRoom.enterFocusMode({taskName: name, stepText: list[0].step});
      }, 200);
    });

    document.getElementById('export-plan').addEventListener('click', () => {
      const txt = list.map((it,i)=> `Step ${i+1}: ${it.step} — est ${it.estHours}h`).join('\n');
      downloadText(`${(name||'plan').replace(/\s+/g,'_')}_plan.txt`, txt);
    });
  }

  function escapeHtml(s){
    return (s||'').toString().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function downloadText(filename, text){
    const a = document.createElement('a');
    a.href = 'data:text/plain;charset=utf-8,'+encodeURIComponent(text);
    a.download = filename;
    a.click();
  }

  function init(){
    const g = btn();
    if(!g) return;
    g.addEventListener('click', () => {
      const name = document.getElementById('task-input').value.trim();
      const deadline = document.getElementById('task-deadline').value;
      const level = document.getElementById('task-level').value;
      if(!name){ alert('Please enter the assignment name'); return; }
      renderSteps(name, deadline, level);
    });
  }

  return { init, renderSteps };
})();
