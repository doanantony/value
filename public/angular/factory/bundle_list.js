app.factory("getbundleList", function($http, config, $q) {
  return {
    getlist: function(queryParam, page) {
      var q = $q.defer();
      var suggestURL = config.getbundleList;
      let data = {
        cat_id: queryParam.cat_id,
        page_no: page
      };
      if (queryParam.sub_cat) {
        data["sub_cat_id"] = queryParam.sub_cat;
      }
      if (queryParam.price_start) {
        data["price_start"] = queryParam.price_start;
      }
      if (queryParam.price_end) {
        data["price_end"] = queryParam.price_end;
      }
      if (queryParam.discount_start) {
        data["discount_start"] = queryParam.discount_start;
      }
      if (queryParam.discount_end) {
        data["discount_end"] = queryParam.discount_end;
      }
      // if (queryParam.brand) {
      //   data["brand"] = queryParam.brand.split(",");
      // }
      if (queryParam.order_by) {
        data["order_by"] = queryParam.order_by;
      }

      var headers={};
      headers["Content-Type"]= "application/json";
      var userAuth = $.cookie("vcartAuth") ? JSON.parse($.cookie("vcartAuth")) : "";
      if(userAuth.status=="success"){
        headers["Authorization"]="Bearer " + userAuth.token;
      }

      $http({
        method: "POST",
        url: suggestURL,
        type: "json",
        data: data,
        headers: headers
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
