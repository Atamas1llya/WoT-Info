const statsanim = () => {
  loadWait();
  hidePages();
  animateMenu();

  setTimeout(
    (() => { $(".tank-list").css({display: "block"}); }
  ), 1000);

  $("title").html(`${trueNick} - Полная Статистика`);
  $(".pageSell").animate({
    left: "37vw",
    width: "30vw"
  });
  $(".pageSell").html("Полная Статистика");
  $(".pageSell").css({
      background: "url(../pictures/stats-icon.png)",
      backgroundSize: "20%",
      backgroundPosition: "left",
      backgroundRepeat: "no-repeat"
  });
}
