//Modal Dialog start
app.controller('DialogController', function($scope, $mdDialog, $interval) {
    $scope.status = '  ';
    //$scope.Timer = null;
    $scope.customFullscreen = false;
    $scope.showAdvanced = function(ev, beer) {
      $scope.objBeer = beer;
      $scope.objBeer.ingredients.hops.map((item,index)=> {
          item.state = "IDLE";
          item.timer = "";
          item.isDisabled = true;
          item.duration = $scope.objBeer.method.mash_temp[0].duration;
      });
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
  $scope.changeState=function(hops){
      var duration = hops.duration;
      if(duration != null && duration != '' && duration != undefined){
          if(hops.state == "Running"){
              hops.state = "Pause";
              $scope.StopTimer(hops.timer);
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
      hops.timer = $interval(function () {
          if(hops.duration > 0){
            duration = duration-1;
            hops.duration = duration;
          }else{
            hops.state = "Done";
            $scope.StopTimer(hops.timer);
          }
      }, 1000);
  };
  $scope.StopTimer = function (Timer) {
      //Cancel the Timer.
      if (angular.isDefined(Timer)) {
          $interval.cancel(Timer);
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
