app.factory("bundle_details", function($http, config, $q) {
  return {
    addToCart: function(qty, alternative, pd_id) {
      var q = $q.defer();
      var suggestURL = config.addToCart;
      let data = {
        product_id: pd_id,
        quantity: qty,
        is_bundel: true
      };
      console.log(alternative);
      let alter = [];
      for (const key in alternative) {
        if (alternative.hasOwnProperty(key)) {
          const element = alternative[key];
          let is_alternaitve = element == key ? false : true;
          let alter_data = {
            pd_id: parseInt(element),
            is_alternaitve: is_alternaitve
          };
          alter.push(alter_data);
        }
      }
      data.bundel_items = alter;
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
    listAddToCart: function(qty, alter, pd_id) {
      var q = $q.defer();
      var suggestURL = config.addToCart;
      let data = {
        product_id: pd_id,
        quantity: qty,
        is_bundel: true,
        bundel_items: alter
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
    getBundleDetail: function(pd_id) {
      var q = $q.defer();
      var suggestURL = config.getbundleDetail + "?product_id=" + pd_id;
      let token = $.cookie("vcartAuth")
        ? JSON.parse($.cookie("vcartAuth"))
        : "";
      $http({
        method: "GET",
        url: suggestURL,
        type: "json",
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
    }
  };
});
