(function() {

  var menuBtn = document.querySelector(".icon-menu");
  var closeBtn = document.querySelector(".icon-close");
  var menuItems = document.querySelectorAll(".main-nav__item");
  var menuOpened = false;

  if(menuBtn) {
    menuBtn.addEventListener("click", toggleOpen, false);
  }

  function toggleOpen() {
    if(menuOpened == true) {
      toggleClose();
      return;
    }
    closeBtn.classList.add("mobile-visible");
    for (var i = 0; i < menuItems.length; i++) {
      menuItems[i].style.display = "list-item";
    }
    menuOpened = true;
  }


  if(closeBtn) {
    closeBtn.addEventListener("click", toggleClose, false);
  }

  function toggleClose() {
    closeBtn.classList.remove("mobile-visible");
    for (var i = 0; i < menuItems.length; i++) {
      menuItems[i].style.display = "none";
    }
    menuOpened = false;
  }

  window.addEventListener("resize", function() {
    if (window.matchMedia("(min-width: 768px)").matches) {
      closeBtn.classList.remove("mobile-visible");
      for (var i = 0; i < menuItems.length; i++) {
        menuItems[i].style.display = "list-item";
      }
      menuOpened = false;
    }
    if ((window.matchMedia("(max-width: 768px)").matches)&&(menuOpened == false)) {
      closeBtn.classList.remove("mobile-visible");
      for (var i = 0; i < menuItems.length; i++) {
        menuItems[i].style.display = "none";
      }
    }

  });

})();
