(function() {
  if (!(document.querySelector("#person-template"))) {
    return;
  }

  document.getElementById("person-amount").readOnly = true;
  document.getElementById("days-amount").readOnly = true;
  document.getElementById("departure").readOnly = true;

  moment.locale("ru");

  var arrivalDate = document.getElementById("arrival");
  var departureDate = document.getElementById("departure");
  var daysAmount = document.getElementById("days-amount");

  arrivalDate.value = moment().subtract(parseInt(daysAmount.value), "d").format("D MMMM YYYY");
  modifyDate(0);

  var buttons = document.querySelectorAll("button[class^='btn__counter']");
  var template = document.querySelector("#person-template").innerHTML;
  var area = document.querySelector(".feedback__fieldset--people");

  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].addEventListener)
      buttons[i].addEventListener("tap", incrementDecrement, false);
  }

  if (arrivalDate.addEventListener) {
    arrivalDate.addEventListener("blur", arrivalDateModified, false);
  }

  function incrementDecrement(){

    var isOutOfLimit = true;

    if (this.classList[0].indexOf("left") !=-1) {
      var counterLeft = this.nextElementSibling.childNodes[1];
      var counterDecVal = parseInt(counterLeft.value);                                    //getting value of the next element > 2nd child
      var maxValLeft = parseInt(counterLeft.getAttribute("data-max"));
      if ((counterDecVal > 0) && (counterDecVal <= maxValLeft)) {
        if (counterLeft.id == "person-amount") {
          removePerson();
        } else {
          modifyDate(-1);
        }
        counterLeft.value = counterDecVal - 1;
        isOutOfLimit = false;
      }
    }

    if(this.classList[0].indexOf("right") !=-1) {
      var counterRight = this.previousElementSibling.childNodes[1];
      var counterIncVal = parseInt(counterRight.value);                                    //getting value of the prev element > 2nd child
      var maxValRight = parseInt(counterRight.getAttribute("data-max"));
      if ((counterIncVal < maxValRight) && (counterIncVal >= 0)) {
        if (counterRight.id == "person-amount") {
          counterRight.value = countPerson();
          addPerson(parseInt(counterRight.value));
        } else {
          modifyDate(1);
        }
        counterRight.value = counterIncVal + 1;
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

  function addPerson(counterVal) {
    var html = Mustache.render(template, {
      "number": parseInt(counterVal + 1)
    });
    var node = document.createElement("div");
    node.classList.add("person");
    node.innerHTML = html;
    area.appendChild(node);
  }

  function removePerson() {
    area.removeChild(area.lastChild);
  }

  function countPerson() {
    var persons = document.querySelectorAll(".person");
    return persons.length;
  }

  function arrivalDateModified() {
    if (moment(arrivalDate.value, "D MMMM YYYY").isValid() === false) {
      arrivalDate.value = moment().subtract(parseInt(daysAmount.value), "d").format("D MMMM YYYY");
    }
    modifyDate(0);
  }

  function modifyDate(modifier) {
    departureDate.value = moment(arrivalDate.value, "D MMMM YYYY")
      .add(parseInt(daysAmount.value) + modifier, "d")
      .format("D MMMM YYYY");
  }

})();

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
    var files = this.files;
    for (var i = 0; i < files.length; i++) {
      preview(files[i]);
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

  function preview(file) {
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

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: {lat: 34.860, lng: -111.789}
  });

  var image = 'img/map-marker.svg';
  var beachMarker = new google.maps.Marker({
    position: {lat:34.860, lng:-111.789},
    map: map,
    icon: image
  });
}

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
