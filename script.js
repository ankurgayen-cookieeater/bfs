// script.js
// Core app bootstrap + navigation between screens
document.addEventListener('DOMContentLoaded', () => {
  // Navigation
  const navButtons = Array.from(document.querySelectorAll('.nav-btn'));
  const screens = Array.from(document.querySelectorAll('.screen'));

  function showScreen(name){
    screens.forEach(s => s.id === name ? s.classList.add('active') : s.classList.remove('active'));
    navButtons.forEach(b => b.dataset.screen === name ? b.classList.add('active') : b.classList.remove('active'));
    window.scrollTo({top:0, behavior:'smooth'});
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => showScreen(btn.dataset.screen));
  });

  // Default screen
  showScreen('taskSplitter');

  // Initialize components
  if(window.Tasks) window.Tasks.init();
  if(window.TimerComponent) window.TimerComponent.init();
  if(window.FocusRoom) window.FocusRoom.init();
  if(window.CarePack) window.CarePack.init();

  // Clear outputs on refresh
  document.getElementById('task-output').innerHTML = '';
  document.getElementById('care-output').innerHTML = '';
});
