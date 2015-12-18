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
