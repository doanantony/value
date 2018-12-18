(function (routeConfig) {
    "use strict";

    routeConfig.init = function (app) {
        // *** routes *** //
        const cityRouter = require("../routes/select_city");
        const areaRouter = require("../routes/select_area");
        const landingpageRouter = require("../routes/intro");
        const homeRouter = require("../routes/home");
        const cartRouter = require("../routes/cart");
        const checkoutRouter = require("../routes/checkout");
        const bundlelistRouter = require("../routes/bundle_list");
        const bundledetailRouter = require("../routes/bundle_details");
        const changepasswordRouter = require("../routes/change_password");
        const cancelorderRouter = require("../routes/cancelorder");
        const createbundleRouter = require("../routes/create-bundle");
        const productlistingRouter = require("../routes/product-listing");
        const productdetailsRouter = require("../routes/product-detail");
        const profileRouter = require("../routes/profile");
        const editprofileRouter = require("../routes/edit-profile");
        const mybundlesRouter = require("../routes/mybundles");
        const myordersRouter = require("../routes/myorders");
        const myorderdetailsRouter = require("../routes/myorder-details");
        const myshoppingRouter = require("../routes/myshopping");
        const myshoppingdashboardRouter = require("../routes/myshopping-dashboard");
        const newaddressRouter = require("../routes/new-address");
        const ordertrackingRouter = require("../routes/order-tracking");
        const otpRouter = require("../routes/otp");
        const replacementRouter = require("../routes/request-replacement");
        const replacementsuccessRouter = require("../routes/replacement-success");
        const servicerequestRouter = require("../routes/service-request");
        const subscribeRouter = require("../routes/subscribe");
        const wishlistRouter = require("../routes/mywishlist");
        const addressbookRouter = require("../routes/addressbook");
        const category = require("../routes/category.js");
        const schedule = require("../routes/schedule.js");
        const aboutusRouter = require("../routes/about-us.js");
        const faqRouter = require("../routes/faq.js");
        const termsRouter = require("../routes/terms.js");
        const privacyRouter = require("../routes/privacy-policy.js");
        const returnRouter = require("../routes/return-policy.js");
        const searchRouter = require("../routes/search.js");
        const contactUs = require("../routes/contact-us.js");

        // *** register routes *** //
        app.use("/city", cityRouter);
        app.use("/area", areaRouter);
        app.use("/intro", landingpageRouter);
        app.use("/", homeRouter);
        app.use("/cart", cartRouter);
        app.use("/checkout", checkoutRouter);

        /*** Bundle and product routes ***/
        app.use("/bundle-list", bundlelistRouter);
        app.use("/bundle-detail", bundledetailRouter);
        app.use("/product-listing", productlistingRouter);
        app.use("/product-detail", productdetailsRouter);
        app.use("/category", category);
        app.use("/schedule-bundle", schedule);

        /*** Myaccount routes ***/
        app.use("/change-password", changepasswordRouter);
        app.use("/cancel-order", cancelorderRouter);
        app.use("/create-bundle", createbundleRouter);
        app.use("/profile", profileRouter);
        app.use("/edit-profile", editprofileRouter);
        app.use("/mybundles", mybundlesRouter);
        app.use("/myorders", myordersRouter);
        app.use("/myorder-details", myorderdetailsRouter);
        app.use("/schedule-detail", myshoppingRouter);
        app.use("/schedule-list", myshoppingdashboardRouter);
        app.use("/new-address", newaddressRouter);
        app.use("/order-tracking", ordertrackingRouter);
        app.use("/otp", otpRouter);
        app.use("/request-replacement", replacementRouter);
        app.use("/replacement-success", replacementsuccessRouter);
        app.use("/service-request", servicerequestRouter);
        app.use("/subscribe", subscribeRouter);
        app.use("/mywishlist", wishlistRouter);
        app.use("/addressbook", addressbookRouter);
        app.use("/about-us", aboutusRouter);
        app.use("/faq", faqRouter);
        app.use("/terms-and-conditions", termsRouter);
        app.use("/privacy-policy", privacyRouter);
        app.use("/return-policy", returnRouter);
        app.use("/search", searchRouter);
        app.use("/contact-us", contactUs);
    };
})(module.exports);
