
let tankID = [], tankBattles = [], tankName = [], tankLevel = [], tanks = [], tankInfo = [], tankLevelSort = [], tankWins = [];
const goHome = () => {
  loadWait(500);

    $(".menu-1").animate({
      top: "17vw",
      left: "1vw",
      width: "50vw",
      height: "8vw"
    }, 500);
    $(".tank-list, .sort, .goHome").css({display: "none"})
    $(".menu-1").css({
      background: 'url("../pictures/tank-icon.png")',
      backgroundColor: "rgba(40, 44, 52, 1)",
      backgroundPosition: "right",
      backgroundSize: "18%",
      backgroundRepeat: "no-repeat"
    }, 500);
    $(".menu-1").html("Ангар");
    setTimeout(() => {
        $(".mainstats, .mainpage-stats").css({display: "block"})
    }, 500);
    setTimeout(() => {
          $(".tank-list, .sort, .goHome").css({display: "none"})
    }, 100)
}
const sortBattles = (a, b) => {
  return b.battles - a.battles;
}
const sortLevel = (a, b) => {
  if (a.level.lat == undefined) {

  }
  else {
    return b.level.lat - a.level.lat
  }
}
const sortWins = (a, b) => {
  if (a.wins == undefined) {

  }
  else {
    return b.wins - a.wins
  }
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

const getTankProps = (tankID, i) => { //get Tank` name, Level and Level for sort.
    if (tankInfo[tankID] == null) {

    }
    else {
      tankName[i] = tankInfo[tankID].name_i18n
      switch (tankInfo[tankID].level) {
        case 1:
          tankLevel[i] = {rim: "&#8544", lat: 1}
          break;
        case 2:
          tankLevel[i] = {rim: "&#8545", lat: 2}
          break;
        case 3:
          tankLevel[i] = {rim: "&#8546", lat: 3}
          break;
        case 4:
          tankLevel[i] = {rim: "&#8547", lat: 4}
          break;
        case 5:
          tankLevel[i] = {rim: "&#8548", lat: 5}
          break;
        case 6:
          tankLevel[i] = {rim: "&#8549", lat: 6}
          break;
        case 7:
          tankLevel[i] = {rim: "&#8550", lat: 7}
          break;
        case 8:
          tankLevel[i] = {rim: "&#8551", lat: 8}
          break;
        case 9:
          tankLevel[i] = {rim: "&#8552", lat: 9}
          break;
        case 10:
          tankLevel[i] = {rim: "&#8553", lat: 10}
          break;
      }
    }
}

const fetchTanks = (accId) => { // Get TankID, tankBattles and levels.
    return new Promise((resolve, reject) => {
      getInfoTanks();
      fetch(`https://api.worldoftanks.ru/wot/tanks/stats/?application_id=${appId}&account_id=${accId}&fields=tank_id%2C+all.battles%2C+all.wins%2C+all.battles`)
          .then((res) => {
              return res.json();
          })
              .then((json) => {
                  for (var i = 0; i < json.data[accId].length; i++) {
                      if (json.data[accId][i] == undefined) {

                      }
                      else {
                        tankID[i] = json.data[accId][i].tank_id
                        tankBattles[i] = json.data[accId][i].all.battles
                        tankWins[i] = ((json.data[accId][i].all.wins / tankBattles[i]) * 100).toFixed(0);

                        getTankProps(tankID[i], i)
                      }
                  }
                  resolve(tankID, tankName, tankBattles, tankLevel, tankWins[i])
              })
              .catch((err) => {
                console.log(err);
              })
    });
}

const createList = (tankID, tankName, tankBattles, tankLevel, tankWins) => { // Adding  props to one list
    return new Promise(function(resolve, reject) {
        for (var i = 0; i < tankID.length; i++) {
          if (tankID[i] == undefined || tankName[i] == undefined || tankLevel[i] == undefined) {

          }
          else {
            tanks[i] = { id: tankID[i], name: tankName[i], battles: tankBattles[i], level: tankLevel[i], wins: tankWins[i]}
          }
        }
        tanks.sort(sortBattles);
        resolve(tanks);
    });
}

const showFields = (i) => { // Creationg HTML list.
  if (tanks[i] == undefined) {

  }
  else {
    let underlay = document.getElementById('under')
    let field = []
    field[i] = document.createElement('div');
    field[i].className = 'tank-list'
    under.appendChild(field[i])

    let spanLevel = []
    spanLevel = document.createElement('span');
    spanLevel.className = "tank-level";
    spanLevel.id = `level-${i}`
    field[i].appendChild(spanLevel);

    let spanName = document.createElement('span');
    spanName.className = "tank-name";
    spanName.id = `name-${i}`
    field[i].appendChild(spanName);

    let spanBattles = document.createElement('span');
    spanBattles.className = "tank-battles";
    spanBattles.id = `battles-${i}`
    field[i].appendChild(spanBattles);

    let spanWins = document.createElement('span');
    spanWins.className = "tank-wins";
    spanWins.id = `wins-${i}`
    field[i].appendChild(spanWins);
  }
}
const addColor = (i) => {
  let animateWinsAngar = (color) => {
    $(`#wins-${i}`).css({
      color: color
    })
  }

  if (tanks[i].wins > 64) {
      animateWinsAngar("purple")
    }  else if (tanks[i].wins > 57 && tanks[i].wins < 65) {
      animateWinsAngar("deepskyblue")
    }  else if (tanks[i].wins > 52.4 && tanks[i].wins < 58) {
      animateWinsAngar("green")
    } else if (tanks[i].wins > 48 && tanks[i].wins < 52.6) {
      animateWinsAngar("yellow")
    } else if (tanks[i].wins > 46 && tanks[i].wins < 49) {
      animateWinsAngar("orange")
    } else if (tanks[i].wins > -1 && tanks[i].wins < 47) {
      animateWinsAngar("red")
    }
}
const innerValues = (tanks, timeout) => { // Adding values to HTML list.
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      for (var i = 0; i < tanks.length; i++) {
          if (tanks[i] == undefined) {

          }
          else {
              addColor(i);
              $(`#level-${i}`).html(tanks[i].level.rim);
              $(`#name-${i}`).html(tanks[i].name);
              $(`#wins-${i}`).html(tanks[i].wins + "%");
              $(`#battles-${i}`).html(tanks[i].battles);

          }
      }
    }, timeout)
    resolve(tanks);
  });
}

const angarAnim = () => { // Start!
    getAccountId(trueNick)
      .then((accId) => {
         fetchTanks(accId)
           .then(() => {
             createList(tankID, tankName, tankBattles, tankLevel, tankWins)
                 .then((tanks) => {
                    innerValues(tanks, 100)
                      .then(() => {
                          for (let i = 0; i < tanks.length; i++) {
                            showFields(i)
                            setTimeout(() => {$(".tank-list, .sort, .goHome").css({display: "block"})}, 100);
                          }
                      })
                      .catch((err) => {
                        console.log(err);
                      })
                 })
            });
       });

  loadWait(1000); // Preload
  hidePages(); // Animation pages
  animateMenu(); // Animate menu


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
const sortForLevel = () => { // Sort by Level and adding to list
  $(".sort-level").css({backgroundColor: "rgba(50, 54, 62, 1)"})
    $(".sort-wins").css({backgroundColor: "rgba(40, 44, 52, 1)"})
  $(".sort-battles").css({backgroundColor: "rgba(40, 44, 52, 1)"})
  tanks.sort(sortLevel);
  for (var i = 0; i < tanks.length; i++) {
    if (tanks[i] == undefined) {

    }
    else {
      addColor(i);
      $(`#level-${i}`).html(tanks[i].level.rim);
      $(`#name-${i}`).html(tanks[i].name);
      $(`#wins-${i}`).html(tanks[i].wins + "%");
      $(`#battles-${i}`).html(tanks[i].battles);
    }
  }
}

const sortForBattles = () => { // Sort by Battles and adding to list
  $(".sort-level").css({backgroundColor: "rgba(40, 44, 52, 1)"})
  $(".sort-wins").css({backgroundColor: "rgba(40, 44, 52, 1)"})
  $(".sort-battles").css({backgroundColor: "rgba(50, 54, 62, 1)"})
  tanks.sort(sortBattles);
  for (var i = 0; i < tanks.length; i++) {
    if (tanks[i] == undefined) {

    }
    else {
      addColor(i);
      $(`#level-${i}`).html(tanks[i].level.rim);
      $(`#name-${i}`).html(tanks[i].name);
      $(`#wins-${i}`).html(tanks[i].wins + "%");
      $(`#battles-${i}`).html(tanks[i].battles);
    }
  }
}

const sortForWins = () => { // Sort by Wins and adding to list
  $(".sort-level").css({backgroundColor: "rgba(40, 44, 52, 1)"})
  $(".sort-battles").css({backgroundColor: "rgba(40, 44, 52, 1)"})
  $(".sort-wins").css({backgroundColor: "rgba(50, 54, 62, 1)"})
  tanks.sort(sortWins);
  for (var i = 0; i < tanks.length; i++) {
    if (tanks[i] == undefined) {

    }
    else {
      addColor(i);
      $(`#level-${i}`).html(tanks[i].level.rim);
      $(`#name-${i}`).html(tanks[i].name);
      $(`#wins-${i}`).html(tanks[i].wins + "%");
      $(`#battles-${i}`).html(tanks[i].battles);
    }
  }
}
