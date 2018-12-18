app.factory("cart", function($http, config, $q) {
  return {
    quantityUpdate: function(qty, cart_id) {
      var q = $q.defer();
      var suggestURL = config.cartupdate;
      let data = {
        cart_id: cart_id,
        quantity: qty
      };
      let token = $.cookie("vcartAuth")
        ? JSON.parse($.cookie("vcartAuth"))
        : "";
      $http({
        method: "POST",
        url: suggestURL,
        type: "json",
        data: data,
        headers: {
          Authorization: "Bearer " + token.token,
          "Content-Type": "application/json"
        }
      })
        .then(function(success) {
          q.resolve(success);
        })
        .catch(function(err) {
          q.reject(err);
        });
      return q.promise;
    },
    removeCart: function(productData, userData) {
      var q = $q.defer();
      var suggestURL = config.cartRemove;
      var data = productData;
      $http({
        method: "DELETE",
        url: suggestURL,
        type: "json",
        data: data,
        headers: {
          Authorization: "Bearer " + userData,
          "Content-Type": "application/json"
        }
      })
        .then(function(success) {
          q.resolve(success);
        })
        .catch(function(err) {
          q.reject(err);
        });
      return q.promise;
    },
    verifyCoupon: function(coupon, total, userData) {
      var q = $q.defer();
      var suggestURL =
        config.checkCoupon + "?coupon_code=" + coupon + "&grand_total=" + total;
      $http({
        method: "GET",
        url: suggestURL,
        type: "json",
        headers: {
          Authorization: "Bearer " + userData,
          "Content-Type": "application/json"
        }
      })
        .then(function(success) {
          q.resolve(success);
        })
        .catch(function(err) {
          q.reject(err);
        });
      return q.promise;
    },
    removeUserbundle: function(id, userData) {
      var q = $q.defer();
      var suggestURL = config.deleteUserBundle + "?ub_id=" + id;
      $http({
        method: "DELETE",
        url: suggestURL,
        type: "json",
        headers: {
          Authorization: "Bearer " + userData,
          "Content-Type": "application/json"
        }
      })
        .then(function(success) {
          q.resolve(success);
        })
        .catch(function(err) {
          q.reject(err);
        });
      return q.promise;
    },
    updateBundleName: function(data, userData) {
      var q = $q.defer();
      var suggestURL = config.updateBundleName;
      $http({
        method: "PATCH",
        url: suggestURL,
        data: data,
        type: "json",
        headers: {
          Authorization: "Bearer " + userData,
          "Content-Type": "application/json"
        }
      })
        .then(function(success) {
          q.resolve(success);
        })
        .catch(function(err) {
          q.reject(err);
        });
      return q.promise;
    },
    getsetting: function() {
      var q = $q.defer();
      var suggestURL = config.settings;
      $http({
        method: "GET",
        url: suggestURL,
        type: "json",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(function(success) {
          q.resolve(success);
        })
        .catch(function(err) {
          q.reject(err);
        });
      return q.promise;
    }
  };
});
