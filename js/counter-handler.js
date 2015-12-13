(function() {
  if (!(document.querySelector("#person-template"))) {
    return;
  }

  document.getElementById("person-amount").readOnly = true;
  document.getElementById("days-amount").readOnly = true;

  // get all + and - buttons and add event handler onclick for them

  var buttons = document.querySelectorAll("button[class^='btn__counter']");
  var template = document.querySelector("#person-template").innerHTML;
  var area = document.querySelector(".feedback__fieldset--people");

  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].addEventListener)
      buttons[i].addEventListener("tap", incrementDecrement, false);
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

})();
