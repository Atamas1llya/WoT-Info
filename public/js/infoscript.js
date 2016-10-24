const infoanim = () => {
  loadWait();

  $('.mainstats, .right_stats').css({display: "none"});
  $("title").html(`${trueNick} - Интересные Факты`);
  $(".page").animate({
    left: "37vw",
    width: "30vw"
  });
  $(".page").html("Интересные Факты");

  animateTop(".menu-1", "1vw");
  animateTop(".menu-2", "10vw");
  animateTop(".menu-3", "19vw");

  $('.menu-1, .menu-2, .menu-3').html("");
  $('.menu-1, .menu-2, .menu-3').animate({
    width: "10vw",
    backgroundSize: "100%"
  }, 500);

  $(".page").css({
      background: "url(../pictures/lamp-icon.png)",
      backgroundSize: "20%",
      backgroundPosition: "left",
      backgroundRepeat: "no-repeat"
  });
    $(".stats-box").css({display: "none"});
    $(".tank-list").css({display: "none"});
  setTimeout(
    (() => { $(".info-box").css({display: "block"}); }
  ), 1000);
}
