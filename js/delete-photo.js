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
