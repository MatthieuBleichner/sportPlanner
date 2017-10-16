angular.module('starter.controllers', [])


  .controller('ListCtrl', function ($scope,$ionicPlatform, $state, CompetitionDataService, $ionicModal, $ionicPopup) {
    $scope.$on('$ionicView.enter', function(e) {
        CompetitionDataService.getAll(function(data){
          $scope.itemsList = data
        })
        CompetitionDataService.getAllTrainings(function(dataTrainings){
          $scope.trainingList = dataTrainings
          for(it=0; it<$scope.trainingList.length;it++)
          {
            tmpDate = new Date($scope.trainingList[it].trainingDate);
            $scope.trainingList[it].displayDate = tmpDate.getTime();
          }
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
        $scope.trainingForm.date.setHours(9);
        $scope.trainingForm.date.setMinutes(30);
        $scope.trainingForm.date.setSeconds(0);
        $scope.trainingForm.content="";
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
        CompetitionDataService.getFutureCompetitions(function(data){
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
        $scope.competitionForm.date.setHours(9);
        $scope.competitionForm.date.setMinutes(30);
        $scope.competitionForm.date.setSeconds(0);
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


    $scope.dislayPastEvents = function()
    {
      CompetitionDataService.getAll(function(data){
        $scope.itemsList = data;
      })
    }

  })

  .filter('rangecal', function() {
      return function(input, total) {
          total = parseInt(total);

          for (var i=0; i<total; i++) {
              input.push(i);
          }

          return input;
      };
  })

  .controller('listTrainingCtrl', function ($scope,$ionicPlatform, $state, CompetitionDataService, $ionicModal, $ionicPopup) {
    $scope.$on('$ionicView.enter', function(e) {
        CompetitionDataService.getAllTrainings(function(data){
          $scope.trainingList = data
          $scope.displayWeekCalendar();
        })
        CompetitionDataService.getAllSports(function(dataSports){
          $scope.sportList = dataSports
        })


    })

    $scope.openTrainingList = function(){
      $state.go('listCompetition')
    }

    $scope.gotoEdit = function(idNote){
      $state.go('form', {id: idNote})
    }


    $ionicModal.fromTemplateUrl('templates/trainingModalForm.html',
    {
      scope: $scope,
      animation: 'slide-in-up'
    }).then( function( modal ) {
      $scope.loginModal = modal;
      console.info('ok');
    });

    $scope.openModalTrainingWithData = function(training) {
      console.info('openModalTrainingWithData');
      $scope.loginModal.show();

      $scope.sportType = 'triathlon';
      if(training){
          $scope.trainingForm = training;
          $scope.trainingForm.date = new Date(training.trainingDate);

          CompetitionDataService.getSportName($scope.trainingForm.sport_id, function(sportName){
            $scope.sportType = sportName.name
          })
      } else {
        $scope.trainingForm = {};
        $scope.trainingForm.date = new Date();
        $scope.trainingForm.date.setHours(9);
        $scope.trainingForm.date.setMinutes(30);
        $scope.trainingForm.date.setSeconds(0);
        $scope.trainingForm.content="";
      }

    };

    $scope.confirmDelete = function(idTraining) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Remove a training',
        template: 'Are you sure you want to remove this event ?'
      })

      confirmPopup.then(function(res) {
        if(res) {
          CompetitionDataService.deleteTraining(idTraining);
          $state.reload();
        }
      })
    }



    var calMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // these are the days of the week for each month, in order
    var calDaysForMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var selectedYear, selectedMonth, selectedDate, shortMonth;

    var CurrentDate = new Date();

    $scope.calMonths = [[{'id':0,'name':'Jan'},{'id':1,'name':'Feb'},{'id':2,'name':'Mar'},{'id':3,'name':'Apr'}],[{'id':4,'name':'May'},{'id':5,'name':'Jun'},{'id':6,'name':'Jul'},{'id':7,'name':'Aug'}],[{'id':8,'name':'Sep'},{'id':9,'name':'Oct'},{'id':10,'name':'Nov'},{'id':11,'name':'Dec'}]];

            selectedYear = CurrentDate.getFullYear(),
            selectedMonth = CurrentDate.getMonth(),
            selectedDate = CurrentDate.getDate();
            var selectedWeek = moment(CurrentDate).week();



            $scope.UICalendarDisplay = {};
            $scope.UICalendarDisplay.Week = true;
            $scope.UICalendarDisplay.Date = false;
            $scope.UICalendarDisplay.Month = false;
            $scope.UICalendarDisplay.Year = false;

            $scope.displayCompleteDate = function() {
                var timeStamp = new Date(selectedYear,selectedMonth,selectedDate).getTime();
                if(angular.isUndefined($scope.dateformat)) {
                    var format = "dd - MMM - yy";
                } else {
                    var format = $scope.dateformat;
                }
                //$scope.display = $filter('date')(timeStamp, format);
            }

            //Onload Display Current Date
            $scope.displayCompleteDate();

            $scope.UIdisplayDatetoMonth = function() {
                $scope.UICalendarDisplay.Week = false;
                $scope.UICalendarDisplay.Date = false;
                $scope.UICalendarDisplay.Month = true;
                $scope.UICalendarDisplay.Year = false;
            }

            $scope.UIdisplayWeekToDate = function() {
                $scope.UICalendarDisplay.Week = false;
                $scope.UICalendarDisplay.Date = true;
                $scope.UICalendarDisplay.Month = false;
                $scope.UICalendarDisplay.Year = false;
                $scope.displayMonthCalendar(); // uniquement pour week to date car il faut initialiser les données de displayMonthCalendar
            }

            $scope.UIdisplayMonthtoYear = function() {
                $scope.UICalendarDisplay.Week = false;
                $scope.UICalendarDisplay.Date = false;
                $scope.UICalendarDisplay.Month = false;
                $scope.UICalendarDisplay.Year = true;
            }

            $scope.UIdisplayYeartoMonth = function() {
                $scope.UICalendarDisplay.Week = false;
                $scope.UICalendarDisplay.Date = false;
                $scope.UICalendarDisplay.Month = true;
                $scope.UICalendarDisplay.Year = false;
            }
            $scope.UIdisplayMonthtoDate = function() {
                $scope.UICalendarDisplay.Week = false;
                $scope.UICalendarDisplay.Date = true;
                $scope.UICalendarDisplay.Month = false;
                $scope.UICalendarDisplay.Year = false;
            }

            $scope.selectedMonthPrevClick = function() {
                selectedDate = 1;
                if(selectedMonth == 0) {
                    selectedMonth = 11;
                    selectedYear--;
                } else {
                    $scope.dislayMonth = selectedMonth--;
                }
                $scope.displayMonthCalendar();
            }

            $scope.selectedMonthNextClick = function() {
                selectedDate = 1;
                if(selectedMonth == 11) {
                    selectedMonth = 0;
                    selectedYear++;
                } else {
                    $scope.dislayMonth = selectedMonth++;
                }
                $scope.displayMonthCalendar();
            }

            $scope.selectedWeekPrevClick = function() {
                selectedDate = 1;
                if(selectedWeek == 1) {
                    selectedWeek = 52;
                    selectedYear--;
                } else {
                    $scope.dislayWeek = selectedWeek--;
                }
                $scope.displayWeekCalendar();
            }

            $scope.selectedWeekNextClick = function() {
                selectedDate = 1;
                if(selectedWeek == 52) {
                    selectedWeek = 1;
                    selectedYear++;
                } else {
                    $scope.dislayWeek = selectedWeek++;
                }
                $scope.displayWeekCalendar();
            }

            $scope.selectedMonthYearPrevClick = function() {
                selectedYear--;
                $scope.displayYear = selectedYear;
                $scope.displayMonthCalendar();
            }

            $scope.selectedMonthYearNextClick = function() {
                selectedYear++;
                $scope.displayYear = selectedYear;
                $scope.displayMonthCalendar();
            }

            $scope.selectedDecadePrevClick = function() {
                selectedYear -= 10;
                $scope.displayMonthCalendar();
            }

            $scope.selectedDecadeNextClick = function() {
                selectedYear += 10;
                $scope.displayMonthCalendar();
            }

            $scope.selectedYearClick = function(year) {
                $scope.displayYear = year;
                selectedYear = year;
                $scope.displayMonthCalendar();
                $scope.UICalendarDisplay.Week = false;
                $scope.UICalendarDisplay.Date = false;
                $scope.UICalendarDisplay.Month = true;
                $scope.UICalendarDisplay.Year = false;
                $scope.displayCompleteDate();
            }

            $scope.selectedMonthClick = function(month) {
                $scope.dislayMonth = month;
                selectedMonth = month;
                $scope.displayMonthCalendar();
                $scope.UICalendarDisplay.Week = false;
                $scope.UICalendarDisplay.Date = true;
                $scope.UICalendarDisplay.Month = false;
                $scope.UICalendarDisplay.Year = false;
                $scope.displayCompleteDate();
            }

            $scope.selectedDateClick = function(date) {
                $scope.displayDate = date.date;
                selectedDate = date.date;

                if(date.type == 'newMonth') {
                    var mnthDate = new Date(selectedYear, selectedMonth, 32)
                    selectedMonth = mnthDate.getMonth();
                    selectedYear = mnthDate.getFullYear();
                    $scope.displayMonthCalendar();
                } else if(date.type == 'oldMonth') {
                    var mnthDate = new Date(selectedYear, selectedMonth, 0);
                    selectedMonth = mnthDate.getMonth();
                    selectedYear = mnthDate.getFullYear();
                    $scope.displayMonthCalendar();
                }
                $scope.displayCompleteDate();
            }

            $scope.displayMonthCalendar = function() {

                /*Year Display Start*/
                $scope.startYearDisp = (Math.floor(selectedYear/10)*10) - 1;
                $scope.endYearDisp = (Math.floor(selectedYear/10)*10) + 10;
                /*Year Display End*/


                $scope.datesDisp = [[],[],[],[],[],[]];
                    countDatingStart = 1;

                    if(calMonths[selectedMonth] === 'February') {
                        if(selectedYear%4 === 0) {
                            endingDateLimit = 29;
                        } else {
                            endingDateLimit = 28;
                        }
                    } else {
                        endingDateLimit = calDaysForMonth[selectedMonth];
                    }
                    startDay = new Date(selectedYear, selectedMonth, 1).getDay();

                $scope.displayYear = selectedYear;
                $scope.dislayMonth = calMonths[selectedMonth];
                $scope.shortMonth = calMonths[selectedMonth].slice(0,3);

                $scope.displayDate = selectedDate;

                var nextMonthStartDates = 1;
                var prevMonthLastDates = new Date(selectedYear, selectedMonth, 0).getDate();

                for (i=0;i<6;i++) {
                     if (typeof $scope.datesDisp[0][6] === 'undefined') {
                       //premiere ligne du mois
                        for(j=0;j<7;j++) {
                          if(j < startDay) {
                            $scope.datesDisp[i][j] = {"type":"oldMonth","date":(prevMonthLastDates - startDay + 1)+j};
                          } else {
                            $scope.datesDisp[i][j] = {"type":"currentMonth","date":countDatingStart++};
                          }
                        }
                     } else {
                       for(k=0;k<7;k++) {
                          if(countDatingStart <= endingDateLimit) {
                            $scope.datesDisp[i][k] = {"type":"currentMonth","date":countDatingStart++};
                          } else {
                            $scope.datesDisp[i][k] = {"type":"newMonth","date":nextMonthStartDates++};
                          }
                       }
                     }

                }
            }

            $scope.displayWeekCalendar = function() {

                $scope.displayYear = selectedYear;
                $scope.displayWeek = selectedWeek;



                $scope.weekDays = [];
                $scope.weekDaysEvents = [ [],[],[],[],[],[],[] ];
                for(dayIt=0;dayIt<7;dayIt++)
                {
                  fullDate = moment().day(dayIt).week(selectedWeek).year(selectedYear);
                  date = fullDate.format('dd Do');
                  $scope.weekDays[dayIt] = date;
                  realDate = fullDate.toDate();
                  realDate.setHours(9);
                  realDate.setMinutes(30);
                  realDate.setSeconds(0);
                  dayEvents = [];
                  nextPos = 0;
                  for(trainingIt=0;trainingIt<$scope.trainingList.length;trainingIt++)
                  {
                    if($scope.trainingList[trainingIt].trainingDate == realDate )
                    {
                      $scope.weekDaysEvents [dayIt][nextPos] = {"img" : $scope.trainingList[trainingIt].imgUrl ,"duration":$scope.trainingList[trainingIt].duration};
                      nextPos++;
                    }
                  }

                  /*
                   $scope.weekDaysEvents [dayIt][1] = {"type":"currentMonth","date":'a'};
                  $scope.weekDaysEvents [dayIt][1] = {"type":"currentMonth","date":'a'};
                  $scope.weekDaysEvents [dayIt][2] = {"type":"currentMonth","date":'c'};
                  */
                }

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


  .controller('trainingModalFormCtrl', function ($scope, $stateParams, $ionicPopup, $state, CompetitionDataService, $ionicTabsDelegate, $timeout) {
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

    $scope.sportChange = function(item) {
      console.log("Sport is :", item.id);
      $scope.trainingForm.sport_id = item.id;
      CompetitionDataService.getSportImgUrl(item.id, function(imgUrl){
        $scope.trainingForm.imgUrl  = imgUrl.logoURL
      })
    }

    function onSaveSuccess(){
      $state.go('list');
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
