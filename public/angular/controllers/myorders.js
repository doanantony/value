app.controller("order_list", function(
  $scope,
  $rootScope,
  $location,
  $http,
  $timeout,
  $filter,
  config,
  getMyorderlist
) {
  $scope.orderData = [];
  $scope.page = 1;
  $scope.nextcall = 1;
  /**
   * get product list for onload and as well in scroll
   */
  $scope.getlist = function() {
    var userAuth = typeof $.cookie("vcartAuth")
      ? JSON.parse($.cookie("vcartAuth"))
      : "";
    var usertoken = userAuth != "" ? userAuth.token : "";
    getMyorderlist
      .getlist($scope.page, usertoken)
      .then(function(response) {
        let listdata = response.data.results.response;
        if (listdata != "") {
          angular.forEach(listdata, function(value, key) {
            const ordDate = new Date(value.o_added_dt);
            value.o_delivery_dt = moment(ordDate)
              .add("days", 2)
              .format("MMM Do YYYY");
            $scope.orderData.push(value);
          });
          $scope.nextcall = 1;
          $scope.page++;
        } else {
          $scope.nextcall = 0;
        }
      })
      .catch(function(response) {
        console.log(response.status);
      });
  };

  $scope.getlist();

  /**
   * scroll listener
   */
  $(window).scroll(function() {
    var bodypos = $("body")[0].scrollHeight;
    var windowh = $(window).height();
    bodypos = bodypos - windowh;
    var windowpos = $(window).scrollTop();
    var persentage = Math.round((windowpos / bodypos) * 100);
    if (Math.round(persentage) > 80 && $scope.nextcall == 1) {
      $scope.nextcall = 0;
      $scope.getlist();
    }
  });
});
