/**
 * Email validation function
 */
function validate_email(email) {
  // var e_mail = this.value;
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  var ev = emailPattern.test(email);
  console.log(ev);
  return ev;
}
$(function() {
  /**
   * Email validation
   */
  // $("#email").on("keyup", function() {
  //   var e_mail = this.value;
  //   var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  //   var ev = emailPattern.test(e_mail);
  //   if (ev == false) $(this).css("color", "red");
  //   else $(this).css("color", "initial");
  // });
  /**
   * Register function
   */
  $("#register-form").submit(function(e) {
    e.preventDefault();
    var username = $("#uname").val();
    var email = $("#email").val();
    var pwd = $("#pwd").val();
    var phone = $("#phone").val();
    var valid_email = validate_email(email);
    if (pwd == "") {
      $("#r_pwd").addClass("required");
      $("#pwd").focus();
    } else {
      $("#r_pwd").removeClass("required");
    }
    if (phone == "") {
      $("#r_phone").addClass("required");
      $("#phone").focus();
    } else {
      $("#r_phone").removeClass("required");
    }
    if (email == "") {
      $("#r_email").addClass("required");
      $("#email").focus();
    } else {
      $("#r_email").removeClass("required");
    }
    if (username == "") {
      $("#r_uname").addClass("required");
      $("#uname").focus();
    } else {
      $("#r_uname").removeClass("required");
    }
    if (email != "" && valid_email == false) {
      $("#r_email").addClass("required");
      toastr.error("Invalid email");
      $("#email").focus();
      return false;
    }
    if (username != "" && email != "" && pwd != "" && phone != "") {
      var refferrerUrl = $(".referrerInput").val();
      $.ajax({
        type: "POST",
        data: JSON.stringify({
          username: username,
          password: pwd,
          user_phone_no: phone,
          user_email: email,
          user_first_name: "",
          user_last_name: "",
          user_city: "",
          user_area: ""
        }),
        contentType: "application/json",
        url: APIURL + "/auth/register",
        success: function(resp) {
          //console.log(resp);
          /* if (resp.status == "success") {
            $("#register-form input").val("");
            toastr.success("Registered Successfully");
            $("#register-form-link").removeClass("active");
            $("#login-form-link").addClass("active");
            $("#login-form")
              .delay(100)
              .fadeIn(100);
            $("#register-form").fadeOut(100);
          } */
          if (resp.status == "success") {
            $("#register-form input").val("");
            resp.useremail = resp.email;
            $.cookie("vcartAuth", JSON.stringify(resp), {
              expires: 7,
              path: "/"
            });
            if (!resp.is_email_verified) {
              var base_url = window.location.origin;
              window.location.replace(base_url + "/otp");
            } else {
              if (refferrerUrl != "") {
                window.location.replace(refferrerUrl);
              } else {
                location.reload(true);
              }
            }
          } else {
            $(".login-action-msg")
              .html(resp.status)
              .addClass("has-error");
            toastr.error("Invalid Username/Password");
          }
        },
        error: function(error) {
          toastr.error(error.responseJSON.error);
        }
      });
    } else {
      return false;
    }
  });
});
window.fbAsyncInit = function() {
  // FB JavaScript SDK configuration and setup
  FB.init({
    appId: "195383424669976", // FB App ID
    cookie: true, // enable cookies to allow the server to access the session
    xfbml: true, // parse social plugins on this page
    version: "v3.1" // use graph api version 2.8
  });

  // Check whether the user already logged in
  FB.getLoginStatus(function(response) {
    if (response.status === "connected") {
      //display user data
      // getFbUserData();
    } else {
      console.log(response);
    }
  });
};

// Load the JavaScript SDK asynchronously
(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

// Facebook login with JavaScript SDK
function fbLogin(type) {
  FB.login(
    function(response) {
      if (response.authResponse) {
        getFbUserData(response.authResponse.accessToken);
      } else {
        toastr.error("User cancelled login or did not fully authorize.");
      }
    },
    { scope: "email" }
  );
}

// Fetch the user profile data from facebook
function getFbUserData(accessToken) {
  FB.api(
    "/me",
    {
      locale: "en_US",
      fields: "id,first_name,last_name,email,link,gender,locale,picture"
    },
    function(response) {
      $.ajax({
        type: "POST",
        data: JSON.stringify({
          username: response.first_name,
          user_id: response.id,
          user_phone_no: "",
          user_email: response.email,
          user_first_name: response.first_name,
          user_last_name: response.last_name,
          user_city: "",
          user_area: "",
          token: accessToken,
          sso_type: 2
        }),
        contentType: "application/json",
        url: APIURL + "/auth/sso",
        success: function(resp) {
          if (resp.status == "success") {
            resp.useremail = resp.email;
            $.cookie("vcartAuth", JSON.stringify(resp), {
              expires: 7,
              path: "/"
            });
            if (!resp.is_email_verified) {
              var base_url = window.location.origin;
              window.location.replace(base_url + "/otp");
            } else {
              location.reload(true);
            }
          }
        },
        error: function(error) {
          toastr.error(error.responseJSON.error);
        }
      });
    }
  );
}
