app.controller("change_default_address", function(
    $scope,
    $rootScope,
    $location,
    $http,
    $timeout,
    $filter,
    config,
    addNewAddress
  ) {
    //Profile Update//
    var cp = document.forms.defaultAddress,
      elem = cp.elements;
    cp.onsubmit = function() {
      var a = 0;
      if (!elem.address_id.value) {
        toastr.error("Please Select Any One, To Make It As Your Default Address.");
        a = 1;
      }
  
      if (a == 1) {
        return false;
      } 
      else {
        var userAuth = typeof $.cookie("vcartAuth") ? JSON.parse($.cookie("vcartAuth")) : "";
        var userToken= (userAuth!="")?userAuth.token: "";
  
        let userData = {
          a_id: elem.address_id.value,
        };
        
        addNewAddress
        .change_default_address(userData, userToken)
        .then(function(response) {
          console.log(response);
          var res= response.data.results;
          toastr.success(response.data.results);
        })
        .catch(function(response) {
          console.log(response);
        });
      }
    };

    $scope.removeAddress = function(address_id, target) {
    
      var elem= angular.element(target);
      //console.log(wtype);
      let addressData = {
        a_id: address_id
      };
      var userAuth = typeof $.cookie("vcartAuth") ? JSON.parse($.cookie("vcartAuth")) : "";
      var usertoken= (userAuth!="")?userAuth.token: "";
  
      addNewAddress
        .remove_address(addressData, usertoken)
        .then(function(response) {
          console.log(response);
          var res= response.data.msg;
          if(res=="success"){
            elem.closest(".pannel_addressbook").remove();
            var numItems = $('.pannel_addressbook').length;
            if(numItems<=1){
              $(".empty-address").removeClass("hidden");
            }
            toastr.success(response.data.results);
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    };

  });
  