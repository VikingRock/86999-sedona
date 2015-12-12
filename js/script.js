(function() {

  // get all + and - buttons and add event handler onclick for them

  var buttons = document.querySelectorAll("button[class^='btn__counter']");

  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].addEventListener)
      buttons[i].addEventListener("tap", incrementDecrement, false);
  }

  function incrementDecrement(){

    var isOutOfLimit = true;

    if (this.classList[0].indexOf("left") !=-1) {

      var counterDecVal = parseInt(this.nextElementSibling.childNodes[1].value);     //getting value of the next element > 2nd child
      if (counterDecVal > 0) {
        this.nextElementSibling.childNodes[1].value = counterDecVal - 1;
        isOutOfLimit = false;
      }
    }

    if(this.classList[0].indexOf("right") !=-1) {

      var counterIncVal = parseInt(this.previousElementSibling.childNodes[1].value);  //getting value of the prev element > 2nd child
      var maxVal = parseInt(this.previousElementSibling.childNodes[1].getAttribute("data-max"));
      if (counterIncVal < maxVal) {
        this.previousElementSibling.childNodes[1].value = counterIncVal + 1;
        isOutOfLimit = false;
      }
    }

    if(isOutOfLimit){

      var el = this.classList;
      el.add("red-animation");

      setTimeout(function() {
        el.remove("red-animation");
      }, 1000);
    }

  }

})();

(function() {

  if (!("FormData" in window)) {
    return;
  }

  var crosses = document.querySelectorAll(".cancel-upload");
  for (var i = 0; i < crosses.length; i++) {
    if (crosses[i].addEventListener)
      crosses[i].addEventListener("tap", deletePhoto, false);
  }

  var deletedArr = [];      //array with names of deleted files

  var form = document.querySelector(".feedback");

  if (form) {
    form.addEventListener("submit", function(event) {
      event.preventDefault();

      var allFiles = document.querySelector("#image-upload").files;
      var copyArr = [];                                         //copy of array with loaded files
      for (var i= allFiles.length-1; i>=0; i--) {
        copyArr[i] = allFiles[i];
      }
      document.querySelector("#image-upload").value = "";       //deleting all uploaded files

      console.log(copyArr);
      console.log(deletedArr);

      for (var i = copyArr.length - 1; i >= 0; i--) {
        for (var j = deletedArr.length - 1; j >= 0; j--) {
          if(copyArr[i].name == deletedArr[j]) {
            copyArr.splice(i,1);
          }
        }
      }

      console.log(copyArr);

      var data = new FormData(form);

      for (var i = copyArr.length - 1; i >= 0; i--) {
        data.append(i, copyArr[i], copyArr[i].name);
      }


      request(data, function(response) {
        console.log(response);
      });
    });
  }

  function request(data, fn) {
    var xhr = new XMLHttpRequest();
    var time = (new Date()).getTime();
    xhr.open("post", "https://echo.htmlacademy.ru/adaptive?" + time);
    xhr.addEventListener("readystatechange", function() {
      if (xhr.readyState == 4) {
        fn(xhr.responseText);
      }
    });
    xhr.send(data);
  }

  if ("FileReader" in window) {
    var area = document.querySelector(".feedback__gallery");
    var fileInput = document.querySelector("#image-upload");

    if(fileInput) {
      fileInput.addEventListener("change", function() {
        var files = this.files;
        for (var i = 0; i < files.length; i++) {
          preview(files[i]);
        }
      });
    }

    function preview(file) {
      if (file.type.match(/image.*/)) {
        var reader = new FileReader();
        reader.addEventListener("load", function(event) {

          var divContainer = document.createElement("div");
          divContainer.classList.add("feedback__photo");

          var link = document.createElement("a");
          link.classList.add("cancel-upload", "icon-close");
          link.addEventListener("tap", deletePhoto, false);

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

  function deletePhoto(){

    var imgName = this.nextSibling.nextSibling.textContent;
    deletedArr.push(imgName);

    this.parentNode.remove();
  }

})();

(function() {

  var menuBtn = document.querySelector(".icon-menu");
  var closeBtn = document.querySelector(".icon-close");
  var menuItems = document.querySelectorAll(".main-nav__item");
  var menuOpened = false;

  for (var i = 0; i < menuItems.length; i++) {
    menuItems[i].classList.add("invisible");
  }
  closeBtn.classList.add("invisible");

  if(menuBtn) {
    menuBtn.addEventListener("tap", toggleOpen, false);
  }

  function toggleOpen() {
    if(menuOpened == true) {
      toggleClose();
      return;
    }
    closeBtn.classList.remove("invisible")
    closeBtn.classList.add("slide-up");
    for (var i = 0; i < menuItems.length; i++) {
      menuItems[i].classList.remove("invisible", "slide-down");
      menuItems[i].classList.add("slide-up");
    }
    menuOpened = true;
  }


  if(closeBtn) {
    closeBtn.addEventListener("tap", toggleClose, false);
  }

  function toggleClose() {
    closeBtn.classList.add("invisible");
    closeBtn.classList.remove("slide-up");
    for (var i = 0; i < menuItems.length; i++) {
      menuItems[i].classList.add("slide-down");
      menuItems[i].classList.remove("slide-up");
    }
    setTimeout(function() {
      for (var i = 0; i < menuItems.length; i++) {
        menuItems[i].classList.add("invisible");
      }
    }, 300);
    menuOpened = false;
  }

  window.addEventListener("resize", function() {
    if (window.matchMedia("(min-width: 768px)").matches) {
      closeBtn.classList.add("invisible");
      for (var i = 0; i < menuItems.length; i++) {
        menuItems[i].classList.remove("slide-up", "slide-down", "invisible");
      }
      menuOpened = false;
    }
    if ((window.matchMedia("(max-width: 768px)").matches)&&(menuOpened == false)) {
      closeBtn.classList.add("invisible");
      for (var i = 0; i < menuItems.length; i++) {
        menuItems[i].classList.remove("slide-up", "slide-down");
        menuItems[i].classList.add("invisible");
      }
    }

  });

})();
