/*function openNav() {
  bt = $('.icon-bar');
  id = $('.side-nav');
  id2 = $('.content')
  var g;
  bt.on('click', function() {
    g = id.css("width");
    if(g == '0px') {
      id.css({'width':'10%'});
      //id2.css({'margin-left': '10%'});
  } else {
      id.css({'width':'0'});
      //id.css({'margin-left': '0'});
    }
  });
}
*/
$(document).ready(function () {
  openNav();
  closeNav();
})



function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    $('#mySidenav a').click(function (e) {
      document.getElementById("mySidenav").style.width = "0";
    });
}
