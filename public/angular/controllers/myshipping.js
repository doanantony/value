app.controller("myshippingList", function (
  $scope,
  $rootScope,
  $location,
  $http,
  $timeout,
  $filter,
  config,
  myShipping
) {

  //Prdouct Review Controler
  $scope.removeShippingList = function (shipping_id, item) {

    var elem = angular.element(item);
    var userAuth = typeof $.cookie("vcartAuth") ? JSON.parse($.cookie("vcartAuth")) : "";
    var usertoken = (userAuth != "") ? userAuth.token : "";

    myShipping
      .removeShipping(shipping_id, usertoken)
      .then(function (response) {
        console.log(response);
        var res = response.data.results;
        if (res == true) {
          elem.closest(".shiplist_block").remove();
          var numItems = $('.shiplist_block').length;
          if (numItems < 1) {
            $(".empty-panel").removeClass("hidden");
          }
          toastr.success("Deleted Successfully!!");
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  $scope.qty_plus = function (fieldName, index) {
    var currentVal = parseInt($("input[name=" + fieldName + index + "]").val());
    $scope.qty = currentVal + 1;
    if (parseInt(currentVal) >= 5) {
      toastr.warning("Cannot add more than 5 items of same product.");
      return
    }
    // If is not undefined
    if (!isNaN(currentVal)) {
      // Increment
      $("input[name=" + fieldName + index + "]").val(currentVal + 1);
      $("input[name=" + fieldName + index + "]").attr("data-qty", currentVal + 1);
    } else {
      // Otherwise put a 0 there
      $("input[name=" + fieldName + index + "]").val(1);
      $("input[name=" + fieldName + index + "]").attr("data-qty", 1);
    }
    $scope.cartTotal();
  };

  // This button will decrement the value till 0
  $scope.qty_minus = function (fieldName, index) {
    var currentVal = parseInt($("input[name=" + fieldName + index + "]").val());
    $scope.qty = currentVal - 1;
    // If is not undefined
    if (!isNaN(currentVal) && currentVal > 1) {
      // Increment
      $("input[name=" + fieldName + index + "]").val(currentVal - 1);
      $("input[name=" + fieldName + index + "]").attr("data-qty", currentVal - 1);
    } else {
      // Otherwise put a 0 there
      $("input[name=" + fieldName + index + "]").val(1);
      $("input[name=" + fieldName + index + "]").attr("data-qty", 1);
    }
    $scope.cartTotal();
  };

  $scope.cartTotal = function () {
    var subtotal = 0, savingstotal = 0;
    angular.forEach(angular.element(".productcount"), function (value, key) {
      var a = angular.element(value);
      subtotal += parseFloat(a.attr("data-price")) * parseFloat(a.attr("data-qty"));
      savingstotal += parseFloat(a.attr("data-savings")) * parseFloat(a.attr("data-qty"));
    });
    var delivery_price = parseInt(15);
    var grandtotal = parseFloat(subtotal) + parseFloat(delivery_price);
    $(".subTotal").html(subtotal + " AED");
    $(".savingsTotal").html(subtotal + " AED");
    $(".grandTotal").html(grandtotal + " AED");
    $scope.grandTotal = grandtotal;
  };

  $scope.updateShiplist = function (listData, listId) {
    var userAuth = typeof $.cookie("vcartAuth") ? JSON.parse($.cookie("vcartAuth")) : "";
    var usertoken = (userAuth != "") ? userAuth.token : "";

    myShipping
      .updateShipping(listData, listId, usertoken)
      .then(function (response) {
        console.log(response);
        var res = response.data.results;
        if (res == true) {
          toastr.success(response.data.results);
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  $scope.getshiplist = function () {
    var sTitle = $(".shiplistTitle").val();
    var sList = [];
    angular.forEach(angular.element(".productcount"), function (value, key) {
      var a = angular.element(value);
      var pdata = { "slprod_id": a.data("id"), "qty": a.attr("data-qty") }
      sList.push(pdata);
    });

    var sData = { "sl_name": sTitle, "item": sList };
    var sId = $(".shiplistId").val();
    //console.log(sList);
    $scope.updateShiplist(sData, sId);
  };

  $scope.change_title = function () {
    if ($scope.edit_title == 0) {
      $scope.edit_title = 1;
    } else {
      $scope.edit_title = 0;
    }
  };

});
