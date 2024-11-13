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
      var nameParts = field.name.split('_');
      var folderId = "";
      if(nameParts[1] == "fid")
      {
          folderId = "&parentFolderGuid=" + nameParts[2]
      }
      openWindow(field, folderId);
    }
  }

  function handleChoose(event, targetElement) {
  
    if (event && event.data && event.data[0] != null && event.data[0].url != null && targetElement != null)
    {
        targetElement.value = event.data[0].url;
        targetElement.blur();
    }

}

function openWindow(e, folderId) {

    targetElement = e.target;

    const options = {
        assetTypes: ['image'],
        multiSelect: false
    };

    const encodedOptions = window.btoa(JSON.stringify(options));
    var url = `https://cmp.optimizely.com/cloud/library-picker?pickerOptions=${encodedOptions}`;
    
    if(folderId)
    {
      url = url + folderId;
    }

    window.open(url, 'Library', 'popup');
    window.addEventListener("message", (e) => handleChoose(e, targetElement), false);
}

  const observer = new MutationObserver(callback);

  observer.observe(targetNode, config);

})();
