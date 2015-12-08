(function() {

  var button = document.querySelector(".feedback__submit .btn");


    if (button.addEventListener) {
      button.addEventListener("click", submitForm, false);
    } else if (button.attachEvent) {
      button.attachEvent('onclick', submitForm);
    }

  function submitForm() {

    if (!("FormData" in window)) {
      return;
    }

    var form = document.querySelector(".feedback");
    var data = new FormData(form);

    var xhr = new XMLHttpRequest();
    xhr.open("post", "https://echo.htmlacademy.ru/adaptive?" + (new Date()).getTime());

    xhr.addEventListener("readystatechange", function() {
      if (xhr.readyState == 4) {
        console.log(xhr.responseText);
      }

    });

    xhr.send(data);

  }

})();
