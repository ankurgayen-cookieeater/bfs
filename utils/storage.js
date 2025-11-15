// utils/storage.js
// LocalStorage manager for reflections and carepack history

window.StorageUtil = (function(){

  const REF_KEY = "bfs_reflections";
  const CARE_KEY = "bfs_carepacks";

  function getReflections(){
    return JSON.parse(localStorage.getItem(REF_KEY) || "[]");
  }

  function pushReflection(entry){
    const list = getReflections();
    list.push(entry);
    localStorage.setItem(REF_KEY, JSON.stringify(list));
  }

  function getCarePacks(){
    return JSON.parse(localStorage.getItem(CARE_KEY) || "[]");
  }

  function saveCarePack(entry){
    const list = getCarePacks();
    list.push(entry);
    localStorage.setItem(CARE_KEY, JSON.stringify(list));
  }

  return {
    getReflections,
    pushReflection,
    getCarePacks,
    saveCarePack
  };
})();
