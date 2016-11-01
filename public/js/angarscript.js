
let tankID = [], tankBattles = [], tankName = [], tankLevel = [], tanks = [], tankInfo = [];
const sortBattles = (a, b) => {
return b.battles - a.battles;
}
const getInfoTanks = () => {

  fetch(`https://api.worldoftanks.ru/wot/encyclopedia/tanks/?application_id=${appId}&fields=name_i18n%2C+level&language=ru`)
        .then((res) => {
            return res.json();
        })
          .then((json) => {
              tankInfo = json.data
            })
          .catch((err) => {
            console.log(err);
          })
}
const getTankProps = (tankID, i) => {
    if (tankInfo[tankID] == null) {
      console.log("Name of tank id " + tankID + "(Number " +i+ ")" + " is not defined");
    }
    else {
      tankName[i] = tankInfo[tankID].name_i18n
      switch (tankInfo[tankID].level) {
        case 1:
          tankLevel[i] = "&#8544"
          break;
        case 2:
          tankLevel[i] = "&#8545"
          break;
        case 3:
          tankLevel[i] = "&#8546"
          break;
        case 4:
          tankLevel[i] = "&#8547"
          break;
        case 5:
          tankLevel[i] = "&#8548"
          break;
        case 6:
          tankLevel[i] = "&#8549"
          break;
        case 7:
          tankLevel[i] = "&#8550"
          break;
        case 8:
          tankLevel[i] = "&#8551"
          break;
        case 9:
          tankLevel[i] = "&#8552"
          break;
        case 10:
          tankLevel[i] = "&#8553"
          break;
      }
    }
}
const fetchTanks = (accId) => {
    return new Promise((resolve, reject) => {
      getInfoTanks();
      fetch(`https://api.worldoftanks.ru/wot/tanks/stats/?application_id=${appId}&account_id=${accId}&fields=tank_id%2C+all.battles`)
          .then((res) => {
              return res.json();
          })
              .then((json) => {
                  for (var i = 0; i < 100; i++) {
                      if (json.data[accId][i] == undefined) {
                        console.log("undefined");
                      }
                      else {
                        tankID[i] = json.data[accId][i].tank_id
                        tankBattles[i] = json.data[accId][i].all.battles
                        getTankProps(tankID[i], i)
                      }
                  }
                  resolve(tankID, tankName, tankBattles, tankLevel)
              })
          .catch((err) => {
            console.log(err);
          })
    });
}
const getList = (tankID, tankName, tankBattles, tankLevel) => {
    return new Promise(function(resolve, reject) {
        for (var i = 0; i < 100; i++) {
            tanks[i] = { id: tankID[i], name: tankName[i], battles: tankBattles[i], level: tankLevel[i]}
        }
        tanks.sort(sortBattles);
    });
}

const angaranim = () => {
    getAccountId(trueNick)
      .then((accId) => {
         fetchTanks(accId)
           .then(() => {
             getList(tankID, tankName, tankBattles, tankLevel)
            });
       });

  loadWait();
  hidePages();
  animateMenu();

  setTimeout(
    (() => {
      $(".tank-list").css({display: "block"});
      for (var i = 0; i < 20; i++) {
        if (tanks[i].name == undefined || tanks[i].battles == undefined) {
          console.log(`Tanks${i} is not defined`);
        }
        else {
          $(`#level${i}`).html(tanks[i].level);
          $(`#name${i}`).html(tanks[i].name);
          $(`#battles${i}`).html(tanks[i].battles);
        }
      }
     }
  ), 2000);

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
