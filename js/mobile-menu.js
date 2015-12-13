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
