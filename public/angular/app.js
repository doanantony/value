var app = angular
  .module("myapp", ["ngRoute", "ngMessages", "ngSanitize"])
  .directive("onFinishRender", function($timeout) {
    return {
      restrict: "A",
      link: function(scope, element, attr) {
        if (scope.$last === true) {
          $timeout(function() {
            scope.$emit(
              attr.broadcasteventname
                ? attr.broadcasteventname
                : "ngRepeatFinished"
            );
          });
        }
      }
    };
  })
  .directive("ngConfirmClick", [
    function() {
      return {
        link: function(scope, element, attr) {
          var msg = attr.ngConfirmClick || "Are you sure?";
          var clickAction = attr.confirmedClick;
          element.bind("click", function(event) {
            if (window.confirm(msg)) {
              scope.$eval(clickAction);
            }
          });
        }
      };
    }
  ]);
var baseurl = APIURL;
app.constant("config", {
  baseURL: baseurl,
  getproduct_list: baseurl + "/product/list/product/post",
  getbundleList: baseurl + "/product/list/product_bundle/post",
  getbundleDetail: baseurl + "/product/details_pb/get",
  submitBundle_review: baseurl + "/product/review/post",
  unsubscribeBundle: baseurl + "/user_bundle/unSubscribeUserBundle",
  updateBundleName: baseurl + "/user_bundle/reNameUserBundle",
  addToCart: baseurl + "/cart/add",
  cartupdate: baseurl + "/cart/quantity",
  cartRemove: baseurl + "/cart/remove",
  addWishList: baseurl + "/wishList/addproducttowishlist",
  removeWishList: baseurl + "/wishList/removewishlist",
  change_password: baseurl + "/auth/resetpassword",
  addAddress: baseurl + "/userProfile/addnewaddress/v2",
  updateAddress: baseurl + "/userProfile/updateaddress/v2",
  changeDefaultAddress: baseurl + "/userProfile/makedefaultaddress",
  removeAddress: baseurl + "/userProfile/deleteaddress",
  user_profileUpdate: baseurl + "/userProfile/update",
  mybundel_list: baseurl + "/user_bundle/list/get",
  view_mybundle: baseurl + "/user_bundle/details/get",
  edit_mybundle: baseurl + "/user_bundle/edit/put",
  update_mybundle_single: baseurl + "/user_bundle/addProductToUserBundle",
  shppingListUrl: baseurl + "/shopping_list",
  addressList: baseurl + "/userProfile/useraddresslist",
  emailVerify: baseurl + "/auth/otpverify",
  orderList: baseurl + "/order/list/get",
  orderDetails: baseurl + "/order/details/get",
  create_user_bundle: baseurl + "/user_bundle/create/post",
  forgotpassword: baseurl + "/auth/forgetpassword",
  sentotptoemail: baseurl + "/auth/sentotptoemail",
  checkCoupon: baseurl + "/coupon/applyCoupon",
  deleteUserBundle: baseurl + "/user_bundle/bundleDelete/delete",
  createWithproduct: baseurl + "/user_bundle/createWithproduct/post",
  cancelorder: baseurl + "/order/",
  getcityarealist: baseurl + "/userProfile/getcityarealist",
  update_mybundle_singlewithoutbundleid:
    baseurl + "/user_bundle/addProductToUserBundleWithoutBundleId",
  adduserbundletocart: baseurl + "/cart/adduserbundletocart",
  settings: baseurl + "/settings"
});
app.config(function($routeProvider, $locationProvider, $httpProvider) {
  // $locationProvider.html5Mode(true);
});

app.filter("spaceless", function() {
  return function(input) {
    if (input) {
      return input.replace(/\s+/g, "-");
    }
  };
});
app.filter("toster"),
  function() {
    return function(type, msg) {
      // Display a success toast, with a title
      toastr.success("Have fun storming the castle!", "Miracle Max Says");
    };
  };
