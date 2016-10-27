const angaranim = () => {
  loadWait();
  hidePages();
  animateMenu();

  setTimeout(
    (() => { $(".tank-list").css({display: "block"}); }
  ), 1000);
  
  $("title").html(`${trueNick} - Ангар`);
  $(".pageSell").html("Ангар");
  $(".pageSell").animate({
    left: "43vw",
    width: "18vw"
  });
  $(".pageSell").css({
      background: "url(../pictures/tank-icon.png)",
      backgroundSize: "37%",
      backgroundPosition: "left",
      backgroundRepeat: "no-repeat"
  });
}
