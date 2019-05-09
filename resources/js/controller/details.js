//Modal Dialog start
app.controller('DialogController', function($scope, $mdDialog, $interval) {
    $scope.status = '  ';
    $scope.Timer = null;
    $scope.customFullscreen = false;
    $scope.showAdvanced = function(ev, beer) {
      $scope.objBeer = beer;
      $scope.objBeer.ingredients.hops.map((item,index)=> item.state = "IDLE");
      $mdDialog.show({
          controller: DialogController,
          templateUrl: 'details.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
          scope: $scope.$new()
      })
  };
  $scope.changeState=function(hops,time){
      var duration = time[0].duration;
      if(duration != null && duration != '' && duration != undefined){
          if(hops.state == "Running"){
              hops.state = "Pause";
              $scope.StopTimer();
          }else{
              hops.state = "Running";
              $scope.StartTimer(hops, duration);
          }
      }else{
            hops.state = "Done";
      }
  }
  //Timer start function.
  $scope.StartTimer = function (hops, duration) {
      //Initialize the Timer to run every 1000 milliseconds i.e. one second.
      $scope.Timer = $interval(function () {
          duration = duration-1;
          if(duration <= 0){
              $scope.StopTimer();
              hops.state = "Done";
          }
      }, 1000);
  };
  $scope.StopTimer = function () {
      //Cancel the Timer.
      if (angular.isDefined($scope.Timer)) {
          $interval.cancel($scope.Timer);
      }
  };
});

function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
      $mdDialog.hide();
  };

  $scope.cancel = function() {
      $mdDialog.cancel();
  };
}
//Modal Dialog end