// this code will be executed after page load
(function () {
  console.log('Script "after.js" executed after page load.');

  const targetNode = document.body;
  const config = { attributes: true, childList: true, subtree: true };

  const callback = () => {
    var folderFields = document.querySelectorAll("[name^=dam_fid_]");
    folderFields.forEach(action);
    var fields = document.querySelectorAll("[name^=dam_root_]");
    fields.forEach(action);
  };

  const action = (field) => {
    field.style.cursor = 'pointer';
    field.readonly = true;
    field.onclick = () => {
      alert("Field clicked!");
      field.blur();
    }
  }

  const observer = new MutationObserver(callback);

  observer.observe(targetNode, config);

})();
