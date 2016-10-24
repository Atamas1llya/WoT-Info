const angaranim = () => {
  loadWait();

  $('.mainstats, .right_stats').css({display: "none"});
  $("title").html(`${trueNick} - Ангар`);
  $(".page").html("Ангар");

  animateTop(".menu-1", "1vw");
  animateTop(".menu-2", "10vw");
  animateTop(".menu-3", "19vw");

  $('.menu-1, .menu-2, .menu-3').html("");
  $('.menu-1, .menu-2, .menu-3').animate({
    width: "10vw",
    backgroundSize: "100%"
  }, 500);
  $(".page").animate({
    left: "43vw",
    width: "18vw"
  });
  $(".page").css({
      background: "url(../pictures/tank-icon.png)",
      backgroundSize: "37%",
      backgroundPosition: "left",
      backgroundRepeat: "no-repeat"
  });
     $(".stats-box").css({display: "none"});
     $(".info-box").css({display: "none"});
  setTimeout(
    (() => { $(".tank-list").css({display: "block"}); }
  ), 1000);

}
