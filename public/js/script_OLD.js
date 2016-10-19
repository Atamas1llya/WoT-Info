
var myid = "";
var battles, wins, wins_count, hits_super, maxXp;
function go() {
  var nick = document.getElementById('login').value;
    // =========================================================
  fetch(`https://api.worldoftanks.ru/wot/account/list/?application_id=8f5364a34f86dfcb5e74149187e31190&language=ru&limit=3&type=exact&search=${nick}`)
    .then((res) => {
       return res.json();
     })
      .then((json) => {
          myid = json.data[0].account_id;
        })
         .catch((err) => {
            console.log(err);
          })
//================================
        .then(() => {
        fetch(`https://api.worldoftanks.ru/wot/account/info/?application_id=8f5364a34f86dfcb5e74149187e31190&account_id=${myid}&language=ru`)
           .then((res) => {
              return res.json();
              })
              .then((json) => {
                  battles = json.data[myid].statistics.all.battles;
                  wins_count = json.data[myid].statistics.all.wins;
                  wins =  (wins_count / battles) * 100;
                  hits_super = json.data[myid].statistics.all.hits_percents;
                  maxXp = json.data[myid].statistics.all.max_xp;
                })
             .catch((err) => {
               console.log(err);
             })
          })

//============================================================================

//============================================================================
function show() {
  function stat(){

    document.getElementById('nickn').innerHTML = nick;
    document.getElementById('battles-count').innerHTML = battles;
    document.getElementById('hitssuper').innerHTML = hits_super+ "%<pre>    </pre>";
    document.getElementById('wins-count').innerHTML = wins.toFixed(2) + "%";
    document.getElementById('maxexp').innerHTML = maxXp;
    if (wins > 64) {
        $("#wins-count").css({
       color: "purple",
      });
      }
    else if (wins > 57 && wins < 65) {
        $("#wins-count").css({
       color: "deepskyblue",
      });
      }
    else if (wins > 52.4 && wins < 58) {
        $("#wins-count").css({
       color: "green"
      });
      }
    else if (wins > 48 && wins < 52.6) {
        $("#wins-count").css({
        color: "yellow"
        });
        }
    else if (wins > 46 && wins < 49) {
        $("#wins-count").css({
        color: "orange",
        });
    }
    else if (wins > -1 && wins < 47) {
        $("#wins-count").css({
        color: "red",
        });
      }
  }
  setTimeout(stat, 100);

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
    function filt(){
      $(".backgr").css({
        filter: "none"
      });
    }
    setTimeout(filt, 800);



}
    setTimeout(show, 800);
}
