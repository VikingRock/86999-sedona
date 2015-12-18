(function() {

  if (!("FormData" in window) || !("FileReader" in window) || !(document.querySelector("#image-template"))) {
    return;
  }

  var queue = [];                                                           //array with uploaded files
  var template = document.querySelector("#image-template").innerHTML;       //uploaded image template
  var form = document.querySelector(".feedback");
  var area = document.querySelector(".feedback__gallery");
  var fileInput = document.querySelector("#image-upload");
  var popup = document.querySelector(".popup");
  var popupFailure = document.querySelector(".popup__element--failure");
  var popupSuccess = document.querySelector(".popup__element--success");
  var closeButtons = document.querySelectorAll(".popup__element .btn");
  var uploadButtons = document.querySelectorAll(".feedback__upload .btn");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    var data = new FormData(form);

    queue.forEach(function(element) {
      data.append("images", element.file);
    });

    request(data, function(response) {
      console.log(response);
    });
  });

  fileInput.addEventListener("change", function() {

    for (var i = 0; i < uploadButtons.length; i++) {
      uploadButtons[i].classList.add("btn--in-progress");
    }

    var files = this.files;
    var isLast = false;
    for (var i = 0; i < files.length; i++) {
      if (i == (files.length - 1)){
        isLast = true;
      }
      preview(files[i], isLast);
    }
    this.value = "";
  });

  function request(data, fn) {
    var xhr = new XMLHttpRequest();
    var time = (new Date()).getTime();

    xhr.open("post", "https://echo.htmlacademy.ru/adaptive?" + time);

    xhr.addEventListener("readystatechange", function() {
      if (xhr.readyState == 4) {
        fn(xhr.responseText);
      }
    });

    xhr.addEventListener("error", function() {
      popup.style.display = "block";
      popupFailure.style.display = "block";
      popupSuccess.style.display = "none";
    });

    xhr.addEventListener("load", function() {
      popup.style.display = "block";
      popupSuccess.style.display = "block";
      popupFailure.style.display = "none";
      form.reset();
      clearItems();
    });

    xhr.send(data);

  }

  function preview(file, flag) {
    if (file.type.match(/image.*/)) {
      var reader = new FileReader();
      reader.addEventListener("load", function(event) {

        var html = Mustache.render(template, {
          "image": event.target.result,
          "name": file.name
        });

        var node = document.createElement("div");
        node.classList.add("feedback__photo");
        node.innerHTML = html;
        area.appendChild(node);

        node.querySelector(".cancel-upload").addEventListener("click", function(event) {
          event.preventDefault();
          removePreview(node);
        });

        queue.push({
          file: file,
          node: node
        });
      });

      reader.onloadend = function() {
        if (flag == true) {
          for (var i = 0; i < uploadButtons.length; i++) {
            uploadButtons[i].classList.remove("btn--in-progress");
          }
        }
      };

      reader.readAsDataURL(file);
    }
  }

  function removePreview(node){

    queue = queue.filter(function(element) {
      return element.node != node;
    });

    var elementToRemove = node;
    elementToRemove.parentNode.removeChild(elementToRemove);
  }

  function clearItems() {
    var persons = document.querySelectorAll(".person");
    for (var i = 0; i < persons.length; i++) {
      persons[i].parentNode.removeChild(persons[i]);
    }

    var photoGallery = document.querySelector(".feedback__gallery");
    while (photoGallery.firstChild) {
      photoGallery.removeChild(photoGallery.firstChild);
    }

    queue = [];
  }

  for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener("tap", function(event) {
      event.preventDefault();
      popup.style.display = "none";
    });
  }

})();
