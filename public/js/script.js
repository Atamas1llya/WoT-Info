const appId = '8f5364a34f86dfcb5e74149187e31190';
let trueNick;

const getAccountId = (nickName) => {
  return new Promise((resolve, reject) => {
    fetch(`https://api.worldoftanks.ru/wot/account/list/?application_id=${appId}&language=ru&limit=3&type=exact&search=${nickName}`)
      .then((res) => {
         return res.json();
       })
        .then((json) => {
            resolve(json.data[0].account_id);
            trueNick = json.data[0].nickname;
          })
        .catch((err) => {
            $("#login").css({background: "rgba(255, 0, 0, 0.1)"});
            setTimeout(() => {
              $("#login").css({background: "none"})
            }, 1000);
        })
   })
}


const fetchData = (accId) => {
  return new Promise((resolve, reject) => {
    fetch(`https://api.worldoftanks.ru/wot/account/info/?application_id=${appId}&account_id=${accId}&language=ru`)
       .then((res) => {
          return res.json();
        })
         .then((json) => {
            resolve(json)
          })
         .catch((err) => {
            console.log(err);
         })
    })
}


const render = (json, accId, nickName) => {

  const {battles, wins, hits_percents, max_xp, max_damage, tanking_factor, battle_avg_xp, damage_dealt, frags, max_frags, avg_damage_assisted} =  json.data[accId].statistics.all
  let wins_level = (wins / battles) * 100;
  let avgDmgAnim = (damage_dealt / battles).toFixed(0);
  let avgKills = (frags / battles).toFixed(2)
  $('#nickn').html(trueNick);
  $('#battles-count').html(battles);
  $('#hitssuper').html(hits_percents);
  $('#wins-count').html(wins_level.toFixed(2) + "%");
  $('#max-exp').html(max_xp);
  $('#avg-exp').html(battle_avg_xp);
  $('#max-dmg').html(max_damage);
  $('#tanking').html(tanking_factor);
  $('#avg-dmg').html(avgDmgAnim);
  $('#avg-frags').html(avgKills);
  $('#max-frags').html(max_frags);
  $('#avg-assist').html(avg_damage_assisted);




  let animateWins = (color) => {
    $("#wins-count").css({
      color: color
    })
  }

  if (wins_level > 64) {
      animateWins("purple")
    }  else if (wins_level > 57 && wins_level < 65) {
      animateWins("deepskyblue")
    }  else if (wins_level > 52.4 && wins_level < 58) {
      animateWins("green")
    } else if (wins_level > 48 && wins_level < 52.6) {
      animateWins("yellow")
    } else if (wins_level > 46 && wins_level < 49) {
      animateWins("orange")
    } else if (wins_level > -1 && wins_level < 47) {
      animateWins("red")
    }


    let animateHits = (color) => {
      $("#hitssuper").css({
        color: color
      })
    }

    if (hits_percents > 79) {
        animateHits("purple")
      }  else if (hits_percents > 69 && hits_percents < 80) {
        animateHits("deepskyblue")
      }  else if (hits_percents > 59 && hits_percents < 70) {
        animateHits("green")
      } else if (hits_percents > 49 && hits_percents < 60) {
        animateHits("yellow")
      } else if (hits_percents > 39 && hits_percents < 50) {
        animateHits("orange")
      } else if (hits_percents > -1 && hits_percents < 40) {
        animateHits("red")
      }


      let animateBlock = (color) => {
        $("#tanking").css({
          color: color
        })
      }

      if (tanking_factor > 0.59) {
          animateBlock("purple")
        }  else if (tanking_factor > 0.49 && tanking_factor < 0.6) {
          animateBlock("deepskyblue")
        }  else if (tanking_factor> 0.39 && tanking_factor < 0.5) {
          animateBlock("green")
        } else if (tanking_factor > 0.29 && tanking_factor < 0.4) {
          animateBlock("yellow")
        } else if (tanking_factor > 0.19 && tanking_factor < 0.3) {
          animateBlock("orange")
        } else if (tanking_factor > -1 && tanking_factor < 0.2) {
          animateBlock("red")
        }


        let animateAvgDmg = (color) => {
          $("#avg-dmg").css({
            color: color
          })
        }

        if (avgDmgAnim > 1999) {
            animateAvgDmg("purple")
          }  else if (avgDmgAnim > 1499 && avgDmgAnim < 2000) {
            animateAvgDmg("deepskyblue")
          }  else if (avgDmgAnim > 1199 && avgDmgAnim < 1500) {
            animateAvgDmg("green")
          } else if (avgDmgAnim > 799 && avgDmgAnim < 1200) {
            animateAvgDmg("yellow")
          } else if (avgDmgAnim > 299 && avgDmgAnim < 800) {
            animateAvgDmg("orange")
          } else if (avgDmgAnim > -1 && avgDmgAnim < 300) {
            animateAvgDmg("red")
          }


          let animateAvgExp = (color) => {
            $("#avg-exp").css({
              color: color
            })
          }

          if (battle_avg_xp > 899) {
              animateAvgExp("purple")
            }  else if (battle_avg_xp > 699 && battle_avg_xp < 900) {
              animateAvgExp("deepskyblue")
            }  else if (battle_avg_xp > 499 && battle_avg_xp < 700) {
              animateAvgExp("green")
            } else if (battle_avg_xp > 349 && battle_avg_xp < 500) {
              animateAvgExp("yellow")
            } else if (battle_avg_xp > 249 && battle_avg_xp < 350) {
              animateAvgExp("orange")
            } else if (battle_avg_xp > -1 && battle_avg_xp < 250) {
              animateAvgExp("red")
            }


            let animateAvgKills = (color) => {
              $("#avg-frags").css({
                color: color
              })
            }

            if (avgKills > 1.49) {
                animateAvgKills("purple")
              }  else if (avgKills > 1.29 && avgKills < 1.5) {
                animateAvgKills("deepskyblue")
              }  else if (avgKills > 0.99 && avgKills < 1.3) {
                animateAvgKills("green")
              } else if (avgKills > 0.79 && avgKills < 1) {
                animateAvgKills("yellow")
              } else if (avgKills > 0.39 && avgKills < 0.8) {
                animateAvgKills("orange")
              } else if (avgKills > -1 && avgKills < 0.4) {
                animateAvgKills("red")
              }


   $(".overlay").animate({
     top: "-90%"
    }, { queue:false, duration:800 });
   $(".backgr").animate({
     top: "-90%",
    }, { queue:false, duration:800 });
   $("#login, .search").animate({
     top: "1.5%"
   }, { queue:false, duration:800 });
   $(".overlay").animate({
      opacity: "0.6"
    }, { queue:false, duration:800 });


}// end render func

const go = () => {
  let nickName = document.getElementById('login').value;
    getAccountId(nickName)
      .then((accId) => {
         fetchData(accId)
            .then((json) => {
              render(json, accId, nickName)
            })
            .catch((err) => {
              console.log(err);
            })
         })
       .catch((err) => {
      console.log(err)
    })
}
