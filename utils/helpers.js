// utils/helpers.js
// Small helper functions used across BFS

window.Helpers = (function(){

  function escapeHtml(str){
    return (str || '').toString()
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function formatDate(d){
    const dt = new Date(d);
    return dt.toLocaleString();
  }

  return {
    escapeHtml,
    formatDate
  };
})();
