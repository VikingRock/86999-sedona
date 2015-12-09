// test
(function() {

  // get all + and - buttons and add event handler onclick for them

  var buttons = document.querySelectorAll("button[class^='btn__counter']");

  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].addEventListener)
      buttons[i].addEventListener("click", incrementDecrement, false);
    else if (buttons[i].attachEvent)
      buttons[i].attachEvent('onclick', incrementDecrement);
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

//(function() {

  // get all + and - buttons and add event handler onclick for them

  var crosses = document.querySelectorAll(".cancel-upload");

  for (var i = 0; i < crosses.length; i++) {
    if (crosses[i].addEventListener)
      crosses[i].addEventListener("click", deletePhoto, false);
    else if (crosses[i].attachEvent)
      crosses[i].attachEvent('onclick', deletePhoto);
  }

  function deletePhoto(){

    //console.log(this);
    var imgName = this.nextSibling.nextSibling.textContent;
    var allFiles = document.querySelector("#image-upload").files;
    //console.log(allFiles);

    for (var i= allFiles.length-1; i>=0; i--) {
      if (allFiles[i].name == imgName) {
        //allFiles.splice(i, 1);
      }
    }
    console.log(allFiles);
    this.parentNode.remove();

  }

//})();

(function() {

  if (!("FormData" in window)) {
    return;
  }

  var form = document.querySelector(".feedback");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    var data = new FormData(form);
    request(data, function(response) {
      console.log(response);
    });
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
    xhr.send(data);
  }

})();

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
          link.addEventListener("click", deletePhoto, false);

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
