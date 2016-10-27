const infoanim = () => {
  loadWait();
  hidePages();
  animateMenu();

  setTimeout(
    (() => { $(".info-box").css({display: "block"}); }
  ), 1000);
  
  $("title").html(`${trueNick} - Интересные Факты`);
  $(".pageSell").animate({
    left: "37vw",
    width: "30vw"
  });
  $(".pageSell").html("Интересные Факты");
  $(".pageSell").css({
      background: "url(../pictures/lamp-icon.png)",
      backgroundSize: "20%",
      backgroundPosition: "left",
      backgroundRepeat: "no-repeat"
  });
}
