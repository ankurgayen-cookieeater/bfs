// components/timer.js
window.TimerComponent = (function(){
  let timerId = null;
  let remaining = 25 * 60;
  let running = false;
  let mode = 'focus'; // 'focus' or 'break'

  const display = () => document.getElementById('timer-display');
  const modeLabel = () => document.getElementById('timer-mode');
  const startBtn = () => document.getElementById('start-timer');
  const resetBtn = () => document.getElementById('reset-timer');
  const reflection = () => document.getElementById('reflection-box');
  const reflectionInput = () => document.getElementById('reflection-input');
  const saveRefBtn = () => document.getElementById('save-reflection');

  function formatTime(sec){
    const m = Math.floor(sec/60).toString().padStart(2,'0');
    const s = (sec % 60).toString().padStart(2,'0');
    return `${m}:${s}`;
  }

  function tick(){
    if(remaining <= 0){
      clearInterval(timerId);
      timerId = null;
      running = false;

      if(mode === 'focus'){
        mode = 'break';
        remaining = 5 * 60;
        showReflection();
      } else {
        mode = 'focus';
        remaining = 25 * 60;
      }

      updateUI();
      return;
    }

    remaining--;
    updateUI();
  }

  function updateUI(){
    display().innerText = formatTime(remaining);
    modeLabel().innerText = mode === 'focus' ? 'Focus' : 'Break';
    startBtn().innerText = running ? 'Pause' : 'Start';
  }

  function startPause(){
    if(running){
      clearInterval(timerId);
      timerId = null;
      running = false;
    } else {
      running = true;
      timerId = setInterval(tick, 1000);
    }
    updateUI();
  }

  function reset(){
    clearInterval(timerId);
    timerId = null;
    running = false;
    mode = 'focus';
    remaining = 25 * 60;
    updateUI();
    reflection().classList.add('hidden');
  }

  function showReflection(){
    reflection().classList.remove('hidden');
  }

  function saveReflection(){
    const text = reflectionInput().value.trim();
    if(!text){
      alert('Type a short reflection, even a single sentence.');
      return;
    }

    if(window.StorageUtil){
      StorageUtil.pushReflection({
        text,
        time: new Date().toISOString(),
        mode
      });
    }

    reflectionInput().value = '';
    reflection().classList.add('hidden');
    alert('Reflection saved locally.');
  }

  function init(){
    updateUI();
    startBtn()?.addEventListener('click', startPause);
    resetBtn()?.addEventListener('click', reset);
    saveRefBtn()?.addEventListener('click', saveReflection);
  }

  return { init };
})();
