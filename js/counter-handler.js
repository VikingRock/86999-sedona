(function() {
  if (!(document.querySelector("#person-template"))) {
    return;
  }

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
      var counter = this.nextElementSibling.childNodes[1];
      counter.value = countPerson();
      var counterDecVal = parseInt(counter.value);     //getting value of the next element > 2nd child
      if (counterDecVal > 0) {
        this.nextElementSibling.childNodes[1].value = counterDecVal - 1;
        if (counter.id == "person-amount") {
          removePerson();
        }
        isOutOfLimit = false;
      } else {
        counter.value = countPerson();
      }
    }

    if(this.classList[0].indexOf("right") !=-1) {
      var counter = this.previousElementSibling.childNodes[1];
      counter.value = countPerson();
      var counterIncVal = parseInt(counter.value);                                    //getting value of the prev element > 2nd child
      var maxVal = parseInt(this.previousElementSibling.childNodes[1].getAttribute("data-max"));
      if ((counterIncVal < maxVal) && (counterIncVal >= 0)) {
        this.previousElementSibling.childNodes[1].value = counterIncVal + 1;
        if (counter.id == "person-amount") {
          addPerson(counterIncVal);
        }
        isOutOfLimit = false;
      } else {
        counter.value = countPerson();
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
