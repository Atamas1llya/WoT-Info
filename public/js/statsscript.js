const statsanim = () => {
  loadWait();

  $('.mainstats, .right_stats').css({display: "none"});
  $("title").html(`${trueNick} - Полная Статистика`);
  $(".page").animate({
    left: "37vw",
    width: "30vw"
  });
  $(".page").html("Полная Статистика");

  animateTop(".menu-1", "1vw");
  animateTop(".menu-2", "10vw");
  animateTop(".menu-3", "19vw");

  $('.menu-1, .menu-2, .menu-3').html("");
  $('.menu-1, .menu-2, .menu-3').animate({
    width: "10vw",
    backgroundSize: "100%"
  }, 500);

  $(".page").css({
      background: "url(../pictures/stats-icon.png)",
      backgroundSize: "20%",
      backgroundPosition: "left",
      backgroundRepeat: "no-repeat"
  });
    $(".tank-list").css({display: "none"});
    $(".info-box").css({display: "none"});
  setTimeout(
    (() => { $(".stats-box").css({display: "block"}); }
  ), 1000);
}
