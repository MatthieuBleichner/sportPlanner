angular.module('starter.services', ['ngCordova'])
  .factory('CompetitionDataService', function ($cordovaSQLite, $ionicPlatform) {
    var db, dbName = "competition106.db"

    function useWebSql() {
      db = window.openDatabase(dbName, "1.0", "Note database", 200000)
      console.info('Using webSql')
    }

    function useSqlLite() {
      db = $cordovaSQLite.openDB({name: dbName, location : 1})
      console.info('Using SQLITE')
    }

    function initSportDB() {
            console.info('initSportDB')
      $cordovaSQLite.execute(db, 'INSERT INTO T_SPORT ( name, isDistanceAvailable, isTimeAvailable, isOccurenceAvailable, logoURL) VALUES( "running" , "yes" , "yes" , "no" , "img/run.svg")');
      $cordovaSQLite.execute(db, 'INSERT INTO T_SPORT ( name, isDistanceAvailable, isTimeAvailable, isOccurenceAvailable, logoURL) VALUES( "cycling" , "yes" , "yes" , "no" , "img/bike.svg")');
      $cordovaSQLite.execute(db, 'INSERT INTO T_SPORT ( name, isDistanceAvailable, isTimeAvailable, isOccurenceAvailable, logoURL) VALUES( "swimming" , "yes" , "yes" , "no" , "img/swim.svg")');
      $cordovaSQLite.execute(db, 'INSERT INTO T_SPORT ( name, isDistanceAvailable, isTimeAvailable, isOccurenceAvailable, logoURL) VALUES( "tennis" , "yes" , "no" , "no" , "img/tennis.svg")');
      $cordovaSQLite.execute(db, 'INSERT INTO T_SPORT ( name, isDistanceAvailable, isTimeAvailable, isOccurenceAvailable, logoURL) VALUES( "triathlon" , "yes" , "yes" , "no" , "img/triathlon.svg")');
    }

    function initDatabase(){
      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS T_COMPETITION (id integer primary key, title, content, activityDate date, sport_id, imgUrl)')
        .then(function(res){
        }, onErrorQuery)


      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS T_SPORT (id integer primary key, name, isDistanceAvailable, isTimeAvailable, isOccurenceAvailable, logoURL, UNIQUE(name))')
        .then(function(res){
        }, onErrorQuery)

        initSportDB();

      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS T_TRAINING (id integer primary key, sport_id, duration, distance, trainingDate date, imgUrl, title)')
        .then(function(res){
        }, onErrorQuery)
    }

    $ionicPlatform.ready(function () {
      if(window.cordova){
        useSqlLite()
      } else {
        useWebSql()
      }

      initDatabase()
    })

    function onErrorQuery(err){
      console.error(err)
    }

    return {

      //Competitions
      createCompetition: function (competition) {
        return $cordovaSQLite.execute(db, 'INSERT INTO T_COMPETITION (title, content, activityDate, sport_id, imgUrl) VALUES(?, ?, ?, ?, ?)', [competition.title, competition.content, competition.date.getTime(), competition.sport_id, competition.imgUrl ])
        .then(function(res){
        }, onErrorQuery)
      },

      updateCompetition: function(competition){

        return $cordovaSQLite.execute(db, 'UPDATE T_COMPETITION set title = ?, content = ?, activityDate = ?, sport_id = ?, imgUrl = ? where id = ?', [competition.title, competition.content, competition.date.getTime(), competition.sport_id, competition.imgUrl, competition.id ])
        .then(function(res){
        }, onErrorQuery)
      },

      getSportImgUrl: function(id, callback){
        $ionicPlatform.ready(function () {
          $cordovaSQLite.execute(db, 'SELECT logoURL FROM T_SPORT where id = ?', [id]).then(function (results) {
            var res = results.rows.item(0);
            callback(res);
          })
        })
      },
      getSportById: function(id, callback){
        $ionicPlatform.ready(function () {
          $cordovaSQLite.execute(db, 'SELECT * FROM T_SPORT where id = ?', [id]).then(function (results) {
            var res = results.rows.item(0);
            callback(res);
          })
        })
      },
      /*
      getSportImgUrl: function(sport_id, callback){
        var imgURL="img/run.svg";
                $ionicPlatform.ready(function () {
        $cordovaSQLite.execute(db, 'SELECT * FROM T_COMPETITION ORDER BY activityDate').then(function (results) {
          var data = []

          for (i = 0, max = results.rows.length; i < max; i++) {
            data.push(results.rowdatedatedates.item(i))
          }
          //imgURL = data[0];
          callback(imgURL);
          }, onErrorQuery)
        })

          $cordovaSQLite.execute(db, 'SELECT * FROM T_COMPETITION ORDER BY activityDate').then(function (results) {
            var data = []

            for (i = 0, max = results.rows.length; i < max; i++) {
              data.push(results.rows.item(i))
            }

            callback(data)
          }, onErrorQuery)
        },
*/
      getAll: function(callback){
        $ionicPlatform.ready(function () {
          $cordovaSQLite.execute(db, 'SELECT * FROM T_COMPETITION ORDER BY activityDate').then(function (results) {
            var data = []

            for (i = 0, max = results.rows.length; i < max; i++) {
              data.push(results.rows.item(i))
            }

            callback(data)
          }, onErrorQuery)
        })
      },
      getFutureCompetitions: function(callback){
        $ionicPlatform.ready(function () {
          $cordovaSQLite.execute(db, 'SELECT * FROM T_COMPETITION WHERE activityDate > (julianday(datetime("now"))-julianday(datetime("1970-01-01"))*1000*60) ORDER BY activityDate ').then(function (results) {
            var data = []

            for (i = 0, max = results.rows.length; i < max; i++) {
              data.push(results.rows.item(i))
            }

            callback(data)
          }, onErrorQuery)
        })
      },
      getDate: function(id){
          return $cordovaSQLite.execute(db, 'SELECT activityDate FROM T_COMPETITION where id = ?', [id])
      },

      deleteCompetition: function(id){
        return $cordovaSQLite.execute(db, 'DELETE FROM T_COMPETITION where id = ?', [id])
      },

      getById: function(id, callback){
        $ionicPlatform.ready(function () {
          $cordovaSQLite.execute(db, 'SELECT * FROM T_COMPETITION where id = ?', [id]).then(function (results) {
            callback(results.rows.item(0))
          })
        })
      },

      //TRainings
      createTraining: function (training) {
      console.info('create training')
        return $cordovaSQLite.execute(db, 'INSERT INTO T_TRAINING (sport_id, duration, distance, trainingDate, imgUrl, title) VALUES( ? , ? , ? , ? , ? , ?)', [training.sport_id, training.duration, training.distance,training.date,training.imgUrl, training.title]).then(function(res){
        }, onErrorQuery)
      },
      updateTraining: function(training){
        return $cordovaSQLite.execute(db, 'UPDATE T_TRAINING set sport_id = ?, duration = ?, distance = ?, trainingDate = ?, imgUrl = ?, title = ? where id = ?', [training.sport_id, training.duration, training.distance, training.date, training.imgUrl, training.title, training.id])
      },
      getAllTrainings: function(callback){
        $ionicPlatform.ready(function () {
          $cordovaSQLite.execute(db, 'SELECT * FROM T_TRAINING ORDER BY trainingDate').then(function (results) {
            var trainingData = []

            for (i = 0, max = results.rows.length; i < max; i++) {
              trainingData.push(results.rows.item(i))
            }

            callback(trainingData)
          }, onErrorQuery)
        })
      },
      getTrainingDate: function(id){
          return $cordovaSQLite.execute(db, 'SELECT activityDate FROM T_TRAINING where id = ?', [id])
      },
      getTrainingsByDate: function(callback){

        $ionicPlatform.ready(function () {
          $cordovaSQLite.execute(db, 'SELECT * FROM T_TRAINING').then(function (results) {
            var trainingData = []

            for (i = 0, max = results.rows.length; i < max; i++) {
              trainingData.push(results.rows.item(i))
            }

            callback(trainingData)
          }, onErrorQuery)
          })
      },

      deleteTraining: function(id){
        return $cordovaSQLite.execute(db, 'DELETE FROM T_TRAINING where id = ?', [id])
      },

      getTrainingById: function(id, callback){
        $ionicPlatform.ready(function () {
          $cordovaSQLite.execute(db, 'SELECT * FROM T_TRAINING where id = ?', [id]).then(function (results) {
            callback(results.rows.item(0))
          })
        })
      },


      //sport
      getAllSports: function(callback){
        $ionicPlatform.ready(function () {
          $cordovaSQLite.execute(db, 'SELECT * FROM T_SPORT').then(function (results) {
            var sportData = []

            for (i = 0, max = results.rows.length; i < max; i++) {
              sportData.push(results.rows.item(i))
            }

            callback(sportData)
          }, onErrorQuery)
        })
      },



    }
  })
