const appId = '8f5364a34f86dfcb5e74149187e31190';


const getAccountId = (nickName) => {
  return new Promise((resolve, reject) => {
    fetch(`https://api.worldoftanks.ru/wot/account/list/?application_id=${appId}&language=ru&limit=3&type=exact&search=${nickName}`)
      .then((res) => {
         return res.json();
       })
        .then((json) => {
            resolve(json.data[0].account_id);
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

  const {battles, wins, hits_percents, max_xp} =  json.data[accId].statistics.all
  let wins_level = (wins / battles) * 100;

  $('#nickn').html(nickName);
  $('#battles-count').html(battles);
  $('#hitssuper').html(`${hits_percents}% `);
  $('#wins-count').html(wins_level.toFixed(2) + "%");
  $('#maxexp').html(max_xp);

  let animate = (color) => {
    $("#wins-count").css({
      color: color
    })
  }

  if (wins_level > 64) {
      animate("purple")
    }  else if (wins_level > 57 && wins_level < 65) {
      animate("deepskyblue")
    }  else if (wins_level > 52.4 && wins_level < 58) {
      animate("green")
    } else if (wins_level > 48 && wins_level < 52.6) {
      animate("yellow")
    } else if (wins_level > 46 && wins_level < 49) {
      animate("orange")
    } else if (wins_level > -1 && wins_level < 47) {
      animate("red")
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
