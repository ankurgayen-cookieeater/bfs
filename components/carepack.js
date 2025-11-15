// components/carepack.js
window.CarePack = (function(){
  const btn = () => document.getElementById('generate-care');
  const out = () => document.getElementById('care-output');

  const tipsPool = [
    {title:'Hydration Break', text:'Drink a glass of water and stretch for 2 minutes.'},
    {title:'Micro-walk', text:'Walk for 5 minutes away from your screen.'},
    {title:'Mini Meditation', text:'Close your eyes for 60 seconds and focus on breathing.'},
    {title:'Snack & Stretch', text:'Grab a healthy snack and stretch your shoulders.'},
    {title:'Eyes Off Screen', text:'Look at something 20 feet away for 20 seconds.'},
    {title:'Gratitude Check', text:'Write down one small win from today.'}
  ];

  function generatePack(){
    const pick = [...tipsPool].sort(()=>Math.random()-0.5).slice(0,3);
    renderPack(pick);
    if(window.StorageUtil){
      StorageUtil.saveCarePack({
        pack: pick,
        time: new Date().toISOString()
      });
    }
  }

  function renderPack(items){
    out().innerHTML = '';
    const el = document.createElement('div');
    el.className = 'output-area card';

    let html = `<h3>Your CarePack</h3>`;
    items.forEach(it => {
      html += `
      <div class="care-item">
        <strong>${escapeHtml(it.title)}</strong>
        <div class="small">${escapeHtml(it.text)}</div>
      </div>`;
    });

    html += `
      <div style="margin-top:10px;">
        <button id="apply-first" class="primary-btn">Apply First Tip Now</button>
      </div>`;

    el.innerHTML = html;
    out().appendChild(el);

    document.getElementById('apply-first').addEventListener('click', () => {
      alert('Start the first tip now: ' + items[0].title);
    });
  }

  function escapeHtml(s){
    return (s||'').toString()
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;');
  }

  function init(){
    btn()?.addEventListener('click', generatePack);
  }

  return { init };
})();
