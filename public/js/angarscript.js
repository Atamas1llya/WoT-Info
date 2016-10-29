let tanks_list = [];
const fetchTanks = (accId) => {
  return new Promise((resolve, reject) => {

    fetch(`https://api.worldoftanks.ru/wot/account/tanks/?application_id=${appId}&language=ru&fields=tank_id&account_id=${accId}`)
      .then((res) => {
          return res.json();
      })
        .then((json) => {
            resolve(json)
        })
        .catch((err) => {
          console.log(err);
        })
  });
}
const angarRender = (json, accId, nickName) => {
    for(var i=0; i < json.data[accId].length; i++){
        tanks_list[i] = json.data[accId][i].tank_id
    }
    console.log(tanks_list[2]);
}


const fetchTankInfo = (tankID) => { // Це треба для кожного ID зробити
 return new Promise((resolve, reject) => {

   fetch(`https://api.worldoftanks.ru/wot/encyclopedia/tankinfo/?application_id=${appId}&tank_id=${tankID}&fields=name&language=ru`)
     .then((tankInfo) => {
         return tankInfo.json();
     })
         .then((json) => {
             resolve(json);
         })
         .catch((err) => {
           console.log(err);
         })
 });
}



const angaranim = () => {
  let nickName = document.getElementById('login').value;

    getAccountId(nickName)
      .then((accId) => {
         fetchTanks(accId)
       })
         .then((tankID) => { // ТУТ БІЛІБІРДА
           fetchTankInfo(tankID) // сюди треба засунути кожен id з tanks_list[]
         })
            .then((json) => {
              angarRender(json, accId, nickName)
            })
            .catch((err) => {
              console.log(err);
            })

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
