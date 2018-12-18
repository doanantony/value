app.controller("mywishlist", function(
  $scope,
  $rootScope,
  $location,
  $http,
  $timeout,
  $filter,
  config,
  getWishList
) {

  //Prdouct Review Controler
  $scope.removeWish = function(product_id, is_bundle, item) {
    
    var elem= angular.element(item);
    var wtype= elem.attr('data-type');
    //console.log(wtype);
    let productData = {
      product_id: product_id,
      is_bundle: is_bundle,
      wish_type: wtype
    };
    var userAuth = typeof $.cookie("vcartAuth") ? JSON.parse($.cookie("vcartAuth")) : "";
    var usertoken= (userAuth!="")?userAuth.token: "";

    getWishList
      .addWish(productData, usertoken)
      .then(function(response) {
        console.log(response);
        var res= response.data.msg;
        if(res=="success"){
          elem.closest(".productpanel").remove();
          var numItems = $('.productpanel').length;
          if(numItems<1){
            $(".empty-panel").removeClass("hidden");
          }
          toastr.success(response.data.results);
        }
      })
      .catch(function(response) {
        console.log(response);
      });
  };
});
