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
