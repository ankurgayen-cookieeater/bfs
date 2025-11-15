// components/focus.js
window.FocusRoom = (function(){
  const enterBtn = () => document.getElementById('enter-focus');
  const exitBtn = () => document.getElementById('exit-focus');
  const normal = () => document.getElementById('focus-normal');
  const active = () => document.getElementById('focus-active');

  function enterFocusMode(payload){
    // Hide normal screen, show active mode
    normal().classList.add('hidden');
    active().classList.remove('hidden');

    // Optional: update the focus title if coming from Task Splitter
    if(payload?.taskName){
      const title = active().querySelector('h3');
      title.innerText = `Focus: ${payload.taskName}`;
    }

    // Lock navigation to simulate "distraction free"
    document.querySelectorAll('.nav-btn').forEach(b => b.disabled = true);

    // Subtle dimming for focus effect
    document.body.style.filter = 'brightness(.97)';
  }

  function exitFocusMode(){
    normal().classList.remove('hidden');
    active().classList.add('hidden');

    // Unlock navigation
    document.querySelectorAll('.nav-btn').forEach(b => b.disabled = false);

    // Remove dimming
    document.body.style.filter = '';
  }

  function init(){
    enterBtn()?.addEventListener('click', () => enterFocusMode());
    exitBtn()?.addEventListener('click', exitFocusMode);

    // Expose enterFocusMode globally (used by tasks.js)
    window.FocusRoom.enterFocusMode = enterFocusMode;
  }

  return { init, enterFocusMode };
})();
