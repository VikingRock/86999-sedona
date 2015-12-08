(function() {
  if ("FileReader" in window) {
    var area = document.querySelector(".feedback__gallery");
    document.querySelector("#image-upload").addEventListener("change", function() {
      var files = this.files;
      for (var i = 0; i < files.length; i++) {
        preview(files[i]);
      }
    });

    function preview(file) {
      if (file.type.match(/image.*/)) {
        var reader = new FileReader();
        reader.addEventListener("load", function(event) {

          var divContainer = document.createElement("div");
          divContainer.classList.add("feedback__photo");

          var link = document.createElement("a");
          link.classList.add("cancel-upload", "icon-close");
          link.href = "";

          var img = document.createElement("img");
          img.src = event.target.result;
          img.alt = file.name;

          var div = document.createElement("div");
          div.classList.add("fig-caption");
          var newContent = document.createTextNode(file.name);
          div.appendChild(newContent);

          divContainer.appendChild(link);
          divContainer.appendChild(img);
          divContainer.appendChild(div);

          area.appendChild(divContainer);
        });
        
        reader.readAsDataURL(file);
      }
    }
  }

})();
