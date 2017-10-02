angular.module('starter.controllers', [])

  .controller('ListCtrl', function ($scope,$ionicPlatform, $state, CompetitionDataService, $ionicModal, $ionicPopup) {
    $scope.$on('$ionicView.enter', function(e) {
        CompetitionDataService.getAll(function(data){
          $scope.itemsList = data
        })
        CompetitionDataService.getAllTrainings(function(dataTrainings){
          $scope.trainingList = dataTrainings
        })
        CompetitionDataService.getAllSports(function(dataSports){
          $scope.sportList = dataSports
        })
    })

    $scope.gotoEdit = function(idCompetition){
      $state.go('form', {id: idCompetition})
    }

    $scope.gotoEditTraining = function(idTraining){
      $state.go('trainingForm', {id: idTraining})
    }


    $ionicModal.fromTemplateUrl('templates/trainingModalForm.html',
    {
      scope: $scope,
      animation: 'slide-in-up'
    }).then( function( modal ) {
      $scope.loginModal = modal;
      console.info('ok');
    });

    $scope.openModalTrainingWithData = function(trainingID) {
      $scope.loginModal.show();

      if(trainingID){
        CompetitionDataService.getTrainingById(trainingID, function(item){
          $scope.trainingForm = item
        })
      } else {
        $scope.trainingForm = {};
        $scope.trainingForm.date = new Date();
      }
    };


    $ionicModal.fromTemplateUrl('templates/competitionModalForm.html',
    {
      scope: $scope,
      animation: 'slide-in-up'
    }).then( function( modal ) {
      $scope.competitionModal = modal;
      console.info('ok');
    });

    $scope.openModalCompetitionWithData = function(competition) {
      console.info('openModalCompetitionWithData');
      $scope.competitionModal.show();

      $scope.sportType = 'triathlon';
      if(competition){
          $scope.competitionForm = competition;
          $scope.competitionForm.date = new Date(competition.activityDate);

          CompetitionDataService.getSportName($scope.competitionForm.sport_id, function(sportName){
            $scope.sportType = sportName.name
          })
      } else {
        $scope.competitionForm = {};
        $scope.competitionForm.date = new Date();
        $scope.competitionForm.content="";
      }

    };


    $scope.confirmDelete = function(idCompetition) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Remove a competition',
        template: 'Are you sure you want to remove this event ?'
      })

      confirmPopup.then(function(res) {
        if(res) {
          CompetitionDataService.deleteCompetition(idCompetition);
          $state.reload();
        }
      })
    }

    $scope.showKeyboard = function($event) {
      $scope.keyboardVisible = true;
    }

  })

  .controller('listCompetitionCtrl', function ($scope,$ionicPlatform, $state, CompetitionDataService, $ionicModal, $ionicPopup) {
    $scope.$on('$ionicView.enter', function(e) {
        CompetitionDataService.getAll(function(data){
          $scope.itemsList = data
        })
        CompetitionDataService.getAllSports(function(dataSports){
          $scope.sportList = dataSports
        })
    })

    $scope.openCompetitionList = function(){
      $state.go('listCompetition')
    }

    $scope.gotoEdit = function(idNote){
      $state.go('form', {id: idNote})
    }


    $ionicModal.fromTemplateUrl('templates/competitionModalForm.html',
    {
      scope: $scope,
      animation: 'slide-in-up'
    }).then( function( modal ) {
      $scope.competitionModal = modal;
      console.info('ok');
    });

    $scope.openModalCompetitionWithData = function(competition) {
      console.info('openModalCompetitionWithData');
      $scope.competitionModal.show();

      $scope.sportType = 'triathlon';
      if(competition){
          $scope.competitionForm = competition;
          $scope.competitionForm.date = new Date(competition.activityDate);

          CompetitionDataService.getSportName($scope.competitionForm.sport_id, function(sportName){
            $scope.sportType = sportName.name
          })
      } else {
        $scope.competitionForm = {};
        $scope.competitionForm.date = new Date();
        $scope.competitionForm.content="";
      }

    };

    $scope.confirmDelete = function(idCompetition) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Remove a competition',
        template: 'Are you sure you want to remove this event ?'
      })

      confirmPopup.then(function(res) {
        if(res) {
          CompetitionDataService.deleteCompetition(idCompetition);
          $state.reload();
        }
      })
    }

  })

  .controller('FormCtrl', function ($scope, $stateParams, $ionicPopup, $state, CompetitionDataService) {
    $scope.$on('$ionicView.enter', function(e) {
      initForm()
    })

    function initForm(){
      if($stateParams.id){
        CompetitionDataService.getById($stateParams.id, function(item){
          $scope.competitionForm = item
        })
      } else {
        $scope.competitionForm = {};
        $scope.competitionForm.myDate = new Date();
        $scope.competitionForm.myDate.setHours(9);
        $scope.competitionForm.myDate.setMinutes(30);
        $scope.competitionForm.myDate.setSeconds(0);
        $scope.competitionForm.sportType = 1;
      }
    }
    function onSaveSuccess(){
      $state.go('list')
    }
    $scope.saveCompetition = function(){

      if(!$scope.competitionForm.id){
        CompetitionDataService.createCompetition($scope.competitionForm).then(onSaveSuccess)
      } else {
        CompetitionDataService.updateCompetition($scope.competitionForm).then(onSaveSuccess)
      }
    }

    $scope.getCompetitionDate = function(idCompetition){
        return NotesDataService.getDate(idNote);
    }

    $scope.confirmDelete = function(idCompetition) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Remove a competition',
        template: 'Are you sure you want to remove this event ?'
      })

      confirmPopup.then(function(res) {
        if(res) {
          CompetitionDataService.deleteCompetition(idCompetition).then(onSaveSuccess)
        }
      })
    }

  })


  .controller('TrainingFormCtrl', function ($scope, $stateParams, $ionicPopup, $state, CompetitionDataService) {
    $scope.$on('$ionicView.enter', function(e) {
      initForm()
    })

    function initForm(){
      if($stateParams.id){
        CompetitionDataService.getTrainingById($stateParams.id, function(item){
          $scope.trainingForm = item
        })
      } else {
        $scope.trainingForm = {};
        $scope.trainingForm.date = new Date();
      }
    }
    function onSaveSuccess(){
      $state.go('list')
    }
    $scope.saveTraining = function(){

      if(!$scope.trainingForm.id){
        CompetitionDataService.createTraining($scope.trainingForm).then(onSaveSuccess)
      } else {
        CompetitionDataService.updateTraining($scope.trainingForm).then(onSaveSuccess)
      }
    }


    $scope.confirmDeleteTraining = function(idTraining) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Remove a training',
        template: 'Are you sure you want to remove this event ?'
      })

      confirmPopup.then(function(res) {
        if(res) {
          CompetitionDataService.deleteTraining(idTraining).then(onSaveSuccess)
        }
      })
    }

  })


  .controller('trainingModalFormCtrl', function ($scope,$ionicPlatform, $stateParams, CompetitionDataService) {
    $scope.$on('$ionicView.enter', function(e) {
      initForm()
    })

    function initForm(){
      if($stateParams.id){
        CompetitionDataService.getTrainingById($stateParams.id, function(item){
          $scope.trainingForm = item
        })
      } else {
        $scope.trainingForm = {};
        $scope.trainingForm.date = new Date();
      }
    }

      $scope.saveTraining = function(){

        if(!$scope.trainingForm.id){
          CompetitionDataService.createTraining($scope.trainingForm).then(onSaveSuccess)
        } else {
          CompetitionDataService.updateTraining($scope.trainingForm).then(onSaveSuccess)
        }
      }
        $scope.closeModal = function() {
          $ionicTabsDelegate.select(0); //by pass pour avoir la premiere tab sélectionnée par defaut
          $scope.loginModal.hide();
        };

        $scope.saveModal = function() {
          $scope.saveTraining();
          $ionicTabsDelegate.select(0); //by pass pour avoir la premiere tab sélectionnée par defaut
          CompetitionDataService.getAllTrainings(function(data){
            $scope.itemsList = data
          })

          $scope.loginModal.hide();
          $state.reload();
        };
  })


  .controller('competitionModalFormCtrl', function ($scope, $stateParams, $ionicPopup, $state, CompetitionDataService, $ionicTabsDelegate, $timeout) {
    $scope.$on('$ionicView.enter', function(e) {
      $ionicTabsDelegate.select(1);
    })

    $scope.sportChange = function(item) {
      console.log("Sport is :", item.id);
      $scope.competitionForm.sport_id = item.id;
      CompetitionDataService.getSportImgUrl(item.id, function(imgUrl){
        $scope.competitionForm.imgUrl  = imgUrl.logoURL
      })

/*
      CompetitionDataService.getAll(function(data){
        $scope.itemsList = data
      })*/

        $timeout(function(){
        $ionicTabsDelegate.select(1);
      }, 700);

    }

    $scope.numbers = '';
    $scope.keyboardVisible = true;
  	$scope.keyboardSettings = {
  		action: function(number) {
        $scope.numbers += number
  		},
      leftButton: {
			html: '<i class="icon ion-backspace"></i>',
			action: function() {
				$scope.numbers = $scope.numbers.slice(0, -1);
			}
		},
		rightButton: {
			html: '<i class="icon ion-checkmark-circled"></i>',
			action: function() {
				// Submit stuff
        $scope.competitionForm.distance = $scope.number;
        $timeout(function(){
        $ionicTabsDelegate.select(2);
      }, 700);
			}
		}

  	}

    function onSaveSuccess(){
      $state.go('list');
    }

    $scope.saveCompetition = function(){

      if(!$scope.competitionForm.id){
        CompetitionDataService.createCompetition($scope.competitionForm)
      } else {
        CompetitionDataService.updateCompetition($scope.competitionForm)
      }

      $scope.competitionForm.activityDate = new Date( $scope.competitionForm.date )

      onSaveSuccess();

    }



    $scope.closeModal = function() {
      $ionicTabsDelegate.select(0); //by pass pour avoir la premiere tab sélectionnée par defaut
      $scope.competitionModal.hide();
    };

    $scope.saveModal = function() {
      $scope.saveCompetition();
      $ionicTabsDelegate.select(0); //by pass pour avoir la premiere tab sélectionnée par defaut
      CompetitionDataService.getAll(function(data){
        $scope.itemsList = data
      })

      $scope.competitionModal.hide();
      $state.reload();
    };



  })
