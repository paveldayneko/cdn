﻿var storeApp = angular
    .module('storeApp', ['infinite-scroll', 'ngRoute', 'ngSanitize', 'ngAnimate', 'ngTouch', 'chieffancypants.loadingBar', 'gsn.core', 'vcRecaptcha', 'ui.bootstrap', 'ui.map', 'ui.keypress', 'ui.event', 'ui.utils', 'facebook', 'angulartics', 'angulartics.gsn.ga'])
    .config(['$routeProvider', '$locationProvider', '$sceDelegateProvider', '$sceProvider', '$httpProvider', 'FacebookProvider', '$analyticsProvider', function ($routeProvider, $locationProvider, $sceDelegateProvider, $sceProvider, $httpProvider, FacebookProvider, $analyticsProvider) {

      gsn.applyConfig(window.globalConfig.data || {});
      
      if (gsn.config.Theme) {
        gsn.setTheme(gsn.config.Theme);
      }

      FastClick.attach(document.body);
      FacebookProvider.init(gsn.config.FacebookAppId);
      $analyticsProvider.init();

      //gets rid of the /#/ in the url and allows things like 'bootstrap collapse' to function
      $locationProvider.html5Mode(true).hashPrefix('!');
      $httpProvider.interceptors.push('gsnAuthenticationHandler');

      //#region security config
      // For security reason, please do not disable $sce 
      // instead, please use trustHtml filter with data-ng-bind-html for specific trust
      $sceProvider.enabled(!gsn.browser.isIE);

      $sceDelegateProvider.resourceUrlWhitelist(gsn.config.SceWhiteList || [
        'self', 'http://localhost:3000/**', 'https://**.gsn2.com/**', 'http://*.gsngrocers.com/**', 'https://*.gsngrocers.com/**']);

      // The blacklist overrides the whitelist so the open redirect here is blocked.
      // $sceDelegateProvider.resourceUrlBlacklist([
      //    'http://myapp.example.com/clickThru**']);

      //#endregion

      //#region route config
      // storeRequired attribute identify route require a store selection
      $routeProvider
          .when('/', {
            templateUrl: gsn.getContentUrl('/views/home.html'),
            caseInsensitiveMatch: true
          })
          .when('/article', {
            templateUrl: gsn.getThemeUrl('/views/engine/article.html'),
            caseInsensitiveMatch: true
          })
          .when('/careers', {
            templateUrl: gsn.getContentUrl('/views/engine/employment.html'),
            caseInsensitiveMatch: true
          })
          .when('/careers/apply', {
            templateUrl: gsn.getContentUrl('/views/engine/employment-apply.html'),
            caseInsensitiveMatch: true
          })
          .when('/changepassword', {
            templateUrl: gsn.getThemeUrl('/views/engine/profile-change-password.html'),
            requireLogin: true,
            caseInsensitiveMatch: true
          })
          .when('/circular', {
            templateUrl: gsn.getContentUrl('/views/engine/circular-view.html'),
            storeRequired: true,
            caseInsensitiveMatch: true
          })
          .when('/circular/flyer', {
            templateUrl: gsn.getContentUrl('/views/engine/circular-view.html'),
            storeRequired: true,
            caseInsensitiveMatch: true
          })
          .when('/circular/text', {
            templateUrl: gsn.getContentUrl('/views/engine/circular-view.html'),
            storeRequired: true,
            caseInsensitiveMatch: true
          })
          .when('/circular/list', {
            templateUrl: gsn.getContentUrl('/views/engine/circular-view.html'),
            storeRequired: true,
            caseInsensitiveMatch: true
          })
          .when('/circular/grid', {
            templateUrl: gsn.getContentUrl('/views/engine/circular-view.html'),
            storeRequired: true,
            caseInsensitiveMatch: true
          })
          .when('/community', {
            templateUrl: gsn.getThemeUrl('/views/engine/custom/community.html'),
            caseInsensitiveMatch: true
          })
          .when('/contactus', {
            templateUrl: gsn.getThemeUrl('/views/engine/contact-us.html'),
            controller: 'ContactUsCtrl',
            caseInsensitiveMatch: true
          })
          .when('/coupons', {
            templateUrl: gsn.getContentUrl('/views/coupons-view.html'),
            storeRequired: true,
            caseInsensitiveMatch: true
          })
          .when('/coupons/printable', {
            templateUrl: gsn.getContentUrl('/views/engine/coupons-printable.html'),
            storeRequired: true,
            caseInsensitiveMatch: true
          })
          .when('/coupons/digital', {
            templateUrl: gsn.getThemeUrl('/views/engine/coupons-digital.html'),
            storeRequired: true,
            caseInsensitiveMatch: true
          })
          .when('/coupons/store', {
            templateUrl: gsn.getContentUrl('/views/engine/coupons-instore.html'),
            storeRequired: true,
            caseInsensitiveMatch: true
          })
          .when('/mealplannerfull', {
            templateUrl: gsn.getThemeUrl('/views/engine/meal-planner.html'),
            caseInsensitiveMatch: true
          })
          .when('/savedlists', {
            templateUrl: gsn.getThemeUrl('/views/engine/saved-lists.html'),
            requireLogin: true,
            caseInsensitiveMatch: true
          })
          .when('/mylist', {
            templateUrl: gsn.getContentUrl('/views/engine/shopping-list.html'),
            caseInsensitiveMatch: true
          })
          .when('/mylist/print', {
            templateUrl: gsn.getThemeUrl('/views/engine/shopping-list-print.html'),
            layout: gsn.getThemeUrl('/views/layout-print.html'),
            caseInsensitiveMatch: true
          })
          .when('/mylist/email', {
            templateUrl: gsn.getThemeUrl('/views/engine/shopping-list-email.html'),
            caseInsensitiveMatch: true
          })
          .when('/emailpreview/registration', {
            templateUrl: gsn.getThemeUrl('/views/email/registration.html'),
            layout: gsn.getThemeUrl('/views/layout-empty.html'),
            caseInsensitiveMatch: true
          })
          .when('/emailpreview/registration-facebook', {
            templateUrl: gsn.getThemeUrl('/views/email/registration-facebook.html'),
            layout: gsn.getThemeUrl('/views/layout-empty.html'),
            caseInsensitiveMatch: true
          })
          .when('/mypantry', {
            templateUrl: gsn.getThemeUrl('/views/engine/my-pantry.html'),
            requireLogin: true,
            caseInsensitiveMatch: true
          })
          .when('/myrecipes', {
            templateUrl: gsn.getThemeUrl('/views/engine/my-recipes.html'),
            requireLogin: true,
            caseInsensitiveMatch: true
          })
          .when('/myspecials', {
            templateUrl: gsn.getThemeUrl('/views/engine/my-specials.html'),
            requireLogin: true,
            caseInsensitiveMatch: true
          })
          .when('/product', {
            templateUrl: gsn.getThemeUrl('/views/engine/product.html'),
            storeRequired: true,
            caseInsensitiveMatch: true
          })
          .when('/product/search', {
            templateUrl: gsn.getThemeUrl('/views/engine/product-search.html'),
            storeRequired: true,
            caseInsensitiveMatch: true
          })
					.when('/profile', {
            templateUrl: gsn.getContentUrl('/views/profile-edit.html'),
            requireLogin: true,
            caseInsensitiveMatch: true
          })
          .when('/profile/rewardcard', {
            templateUrl: gsn.getContentUrl('/views/engine/profile-rewardcard.html'),
            requireLogin: true,
            caseInsensitiveMatch: true
          })
          .when('/profile/rewardcard/updated', {
            templateUrl: gsn.getThemeUrl('/views/engine/profile-edit.html'),
            requireLogin: true,
            caseInsensitiveMatch: true
          })
					.when('/profile/fuelrewards', {
            templateUrl: gsn.getContentUrl('/views/fuelrewards.html'),
            requireLogin: true,
            caseInsensitiveMatch: true
          })
          .when('/recipe', {
            templateUrl: gsn.getThemeUrl('/views/engine/recipe-details.html'),
            caseInsensitiveMatch: true
          })
          .when('/recipe/print', {
            templateUrl: gsn.getThemeUrl('/views/engine/recipe-print.html'),
            layout: gsn.getThemeUrl('/views/layout-print.html'),
            caseInsensitiveMatch: true
          })
          .when('/recipecenter', {
            templateUrl: gsn.getThemeUrl('/views/engine/recipe-center.html'),
            caseInsensitiveMatch: true
          })
          .when('/recipe/search', {
            templateUrl: gsn.getThemeUrl('/views/engine/recipe-search.html'),
            caseInsensitiveMatch: true
          })
          .when('/recipevideo', {
            templateUrl: gsn.getThemeUrl('/views/engine/recipe-video.html'),
            caseInsensitiveMatch: true
          })
          .when('/recoverpassword', {
            templateUrl: gsn.getThemeUrl('/views/engine/recover-password.html'),
            caseInsensitiveMatch: true
          })
          .when('/recoverusername', {
            templateUrl: gsn.getThemeUrl('/views/engine/recover-username.html'),
            caseInsensitiveMatch: true
          })
          .when('/redirect', {
            templateUrl: gsn.getThemeUrl('/views/engine/redirect.html'),
            caseInsensitiveMatch: true
          })
          .when('/registration', {
            templateUrl: gsn.getContentUrl('/views/engine/registration.html'),
            caseInsensitiveMatch: true
          })
          .when('/registration/facebook', {
            templateUrl: gsn.getThemeUrl('/views/engine/registration.html'),
            caseInsensitiveMatch: true
          })
          .when('/search', {
            templateUrl: gsn.getThemeUrl('/views/engine/custom/search.html'),
            caseInsensitiveMatch: true
          })
          .when('/signin', {
            templateUrl: gsn.getThemeUrl('/views/engine/login.html'),
            caseInsensitiveMatch: true
          })
          .when('/specials', {
            templateUrl: gsn.getThemeUrl('/views/engine/specials.html'),
            storeRequired: true,
            caseInsensitiveMatch: true
          })
          .when('/storelocator', {
            templateUrl: gsn.getThemeUrl('/views/engine/store-locator.html'),
            caseInsensitiveMatch: true
          })
          .when('/unsubscribe', {
            templateUrl: gsn.getThemeUrl('/views/engine/unsubscribe.html'),
            caseInsensitiveMatch: true
          })
          .otherwise({
            templateUrl: gsn.getContentUrl('/views/engine/static-content.html'),
            caseInsensitiveMatch: true
          });
      //#endregion

    }])
    .run(['$window', '$timeout', '$rootScope', 'gsnApi', 'gsnProfile', 'gsnStore', 'gsnDfp', 'gsnYoutech', 'gsnAdvertising', '$localStorage', function ($window, $timeout, $rootScope, gsnApi, gsnProfile, gsnStore, gsnDfp, gsnYoutech, gsnAdvertising, $localStorage) {
      /// <summary></summary>
      /// <param name="$window" type="Object"></param> 
      /// <param name="$timeout" type="Object"></param>  
      /// <param name="$rootScope" type="Object"></param>    
      /// <param name="gsnApi" type="Object"></param>
      /// <param name="gsnProfile" type="Object"></param>
      /// <param name="gsnStore" type="Object"></param>
      /// <param name="gsnDfp" type="Object">kick start dfp</param>
      /// <param name="gsnYoutech" type="Object">kick start youtech</param>

      // init profile so we can get token
      gsnProfile.initialize();

    }]);

// ContactUsCtrl
storeApp.controller('ContactUsCtrl', ['$scope', 'gsnProfile', 'gsnApi', '$timeout', 'gsnStore', '$interpolate', '$http', function ($scope, gsnProfile, gsnApi, $timeout, gsnStore, $interpolate, $http) {
  $scope.activate = activate;
  $scope.vm = { PrimaryStoreId: gsnApi.getSelectedStoreId(), ReceiveEmail: true };
  $scope.masterVm = { PrimaryStoreId: gsnApi.getSelectedStoreId(), ReceiveEmail: true };

  $scope.hasSubmitted = false;    // true when user has click the submit button
  $scope.isValidSubmit = true;    // true when result of submit is valid
  $scope.isSubmitting = false;    // true if we're waiting for result from server
  $scope.errorResponse = null;
  $scope.contactSuccess = false;
  $scope.topics = [];
  $scope.topicsByValue = {};
  $scope.storeList = [];
  $scope.captcha = {};
  $scope.storesById = {};

   var template;

  $http.get($scope.getContentUrl('/views/email/contact-us.html'))
    .success(function (response) {
      template = response.replace(/data-ctrl-email-preview/gi, '');
    });

  function activate() {
    gsnStore.getStores().then(function (rsp) {
      $scope.stores = rsp.response;

      // prebuild list base on roundy spec (ﾉωﾉ)
      // make sure that it is order by state, then by name
      $scope.storesById = gsnApi.mapObject($scope.stores, 'StoreId');
    });

    gsnProfile.getProfile().then(function (p) {
      if (p.success) {
        $scope.masterVm = angular.copy(p.response);
        $scope.doReset();
      }
    });

    $scope.topics = gsnApi.groupBy(getData(), 'ParentOption');
    $scope.topicsByValue = gsnApi.mapObject($scope.topics, 'key');
    $scope.parentTopics = $scope.topicsByValue[''];

    delete $scope.topicsByValue[''];
  }

  $scope.getSubTopics = function () {
    return $scope.topicsByValue[$scope.vm.Topic];
  };

  $scope.getFullStateName = function (store) {
    return '=========' + store.LinkState.FullName + '=========';
  };

  $scope.getStoreDisplayName = function (store) {
    return store.StoreName + ' - ' + store.PrimaryAddress + '(#' + store.StoreNumber + ')';
  };

  $scope.doSubmit = function () {
    var payload = $scope.vm;
    if ($scope.myContactUsForm.$valid) {
      payload.CaptchaChallenge = $scope.captcha.challenge;
      payload.CaptchaResponse = $scope.captcha.response;
      payload.Store = $scope.getStoreDisplayName($scope.storesById[payload.PrimaryStoreId]);
      $scope.email = payload;
      payload.EmailMessage = $interpolate(template)($scope);
      // prevent double submit
      if ($scope.isSubmitting) return;

      $scope.hasSubmitted = true;
      $scope.isSubmitting = true;
      $scope.errorResponse = null;
      gsnProfile.sendContactUs(payload)
          .then(function (result) {
            $scope.isSubmitting = false;
            $scope.isValidSubmit = result.success;
            if (result.success) {
              $scope.contactSuccess = true;
            } else if (typeof (result.response) == 'string') {
              $scope.errorResponse = result.response;
            } else {
              $scope.errorResponse = gsnApi.getServiceUnavailableMessage();
            }
          });
    }
  };

  $scope.doReset = function () {
    $scope.vm = angular.copy($scope.masterVm);
    $scope.vm.ConfirmEmail = $scope.vm.Email;
  };

  $scope.activate();
  //#region Internal Methods        
  function getData() {
    return [
        {
          "Value": "Company",
          "Text": "Company",
          "ParentOption": ""
        },
        {
          "Value": "Store",
          "Text": "Store (specify store below)",
          "ParentOption": ""
        },
        {
          "Value": "Other",
          "Text": "Other (specify below)",
          "ParentOption": ""
        },
        {
          "Value": "Employment",
          "Text": "Employment",
          "ParentOption": ""
        },
        {
          "Value": "Website",
          "Text": "Website",
          "ParentOption": ""
        },
        {
          "Value": "Pharmacy",
          "Text": "Pharmacy (specify store below)",
          "ParentOption": ""
        }
    ];
  }
}]);

// My Country Mart Account
storeApp.controller('DahlsAccountCtrl', ['$scope', 'gsnProfile', 'gsnMidax', 'gsnApi', '$timeout', 'gsnStore', '$rootScope', function controller($scope, gsnProfile, gsnMidax, gsnApi, $timeout, gsnStore, $rootScope) {

  $scope.activate = activate;
  $scope.profile = { PrimaryStoreId: gsnApi.getSelectedStoreId(), ReceiveEmail: true };

  $scope.hasSubmitted = false;    // true when user has click the submit button
  $scope.isValidSubmit = true;    // true when result of submit is valid
  $scope.isSubmitting = false;    // true if we're waiting for result from server
  $scope.profileUpdated = false;
  $scope.isFacebook = false;

  function activate() {
    gsnStore.getStores().then(function (rsp) {
      $scope.stores = rsp.response;
    });

    gsnProfile.getProfile().then(function (p) {
      if (p.success) {
        $scope.profile = angular.copy(p.response);
        $scope.isFacebook = (gsnApi.isNull($scope.profile.FacebookUserId, '').length > 0);
      }

      if ($scope.profile.ExternalId)
        gsnMidax.updateProfileWithMidax($scope.profile,$scope.profile.ExternalId).then(function(result){
        	if(result.success)
        	 $scope.profile = angular.copy(result.response)
        });
        
    });

    //$scope.profileUpdated = ($scope.currentPath == '/profile/rewardcard/updated');
  }

  ////
  // Is the profile updated. (Note: when we get loyalty working, this has to go!!)
  ////
  $scope.isProfileUpdated = function () {

    return true === $scope.profileUpdated;
  };

  $scope.updateProfile = function () {
    var profile = $scope.profile;
    if ($scope.myForm.$valid) {

      // prevent double submit
      if ($scope.isSubmitting) return;

      $scope.hasSubmitted = true;
      $scope.isSubmitting = true;
      if (profile.ExternalId) {
        gsnMidax.SaveCardMember(profile)
               .then(function (result) {

                 updateGsnProfile(profile);

                 if (!result.success) {
                   if (result.response == "Unexpected error occurred.") {
                     $location.url('/maintenance');
                   } else if (typeof (result.response) === 'string') {
                     $scope.errorMessage = result.message;
                   }
                 }
               });
      }
      else
        updateGsnProfile(profile);
    }
  };

  $scope.activate();

  function updateGsnProfile(profile) {
    gsnProfile.updateProfile(profile)
           .then(function (result) {
             $scope.isSubmitting = false;
             $scope.isValidSubmit = result.success;
             if (result.success) {
               gsnApi.setSelectedStoreId(profile.PrimaryStoreId);

               // trigger profile retrieval
               gsnProfile.getProfile(true);

               // Broadcast the update.
               $rootScope.$broadcast('gsnevent:updateprofile-successful', result);

               // Success.
               $scope.profileUpdated = true;
             }
           });
  }
}]);

storeApp.controller('DahlsRegistrationCtrl', ['$scope', 'gsnProfile', 'gsnApi', '$timeout', 'gsnStore', 'gsnMidax', '$interpolate', '$http', '$rootScope', '$route', '$window', '$location', function controller($scope, gsnProfile, gsnApi, $timeout, gsnStore, gsnMidax, $interpolate, $http, $rootScope, $route, $window, $location) {

  $scope.activate = activate;
  $scope.totalSavings = '';
  $scope.profile = { PrimaryStoreId: gsnApi.getSelectedStoreId(), ReceiveEmail: true };

  $scope.hasSubmitted = false;    // true when user has click the submit button
  $scope.isValidSubmit = true;    // true when result of submit is valid
  $scope.isSubmitting = false;    // true if we're waiting for result from server
  $scope.isFacebook = $scope.currentPath == '/registration/facebook';
  $scope.errorMessage = '';
  var template;
  var templateUrl = $scope.isFacebook ? '/views/email/registration-facebook.html' : '/views/email/registration.html';
  if (gsnApi.getThemeConfigDescription('registration-custom-email', false)) {
    templateUrl = $scope.getThemeUrl(templateUrl);
  } else {
    templateUrl = $scope.getContentUrl(templateUrl);
  }

  $http.get(templateUrl)
    .success(function (response) {
      template = response.replace(/data-ctrl-email-preview/gi, '');
    });

  function activate() {
    if ($scope.isFacebook) {
      if (gsnApi.isNull($scope.facebookData.accessToken, '').length < 1) {
        $scope.goUrl('/');
        return;
      }

      var user = $scope.facebookData.user;
      $scope.profile.Email = user.email;
      $scope.profile.FirstName = user.first_name;
      $scope.profile.LastName = user.last_name;
    }

    gsnStore.getManufacturerCouponTotalSavings().then(function (rst) {
      if (rst.success) {
        $scope.totalSavings = gsnApi.isNaN(parseFloat(rst.response), 0.00).toFixed(2);
      }
    });

    gsnStore.getStores().then(function (rsp) {
      $scope.stores = rsp.response;
    });

  }

  $scope.registerProfile = function () {
    var payload = angular.copy($scope.profile);
    if ($scope.myForm.$valid) {

      // prevent double submit
      if ($scope.isSubmitting) return;

      $scope.hasSubmitted = true;
      $scope.isSubmitting = true;
      $scope.errorMessage = '';

      // setup email registration stuff
      if ($scope.isFacebook) {
        payload.FacebookToken = $scope.facebookData.accessToken;
      }

      payload.ChainName = gsnApi.getChainName();
      payload.FromEmail = gsnApi.getRegistrationFromEmailAddress();
      payload.ManufacturerCouponTotalSavings = '$' + $scope.totalSavings;
      payload.CopyrightYear = (new Date()).getFullYear();
      payload.UserName = gsnApi.isNull(payload.UserName, payload.Email);
      payload.WelcomeSubject = 'Welcome to ' + payload.ChainName + ' online.';

      $scope.email = payload;
      payload.WelcomeMessage = $interpolate(template.replace(/(data-ng-src)+/gi, 'src').replace(/(data-ng-href)+/gi, 'href'))($scope);
          
      registerGsnProfile(payload);
    }
  };

  $scope.$on('gsnevent:login-success', function (evt, result) {
    $scope.isSubmitting = false;
    if (gsnApi.isNull($scope.profile.ExternalId, '').length > 2) {
      $scope.goUrl('/profile/rewardcardupdate?registration=' + $scope.profile.ExternalId);
    } else {
      $route.reload();
    }
    // otherwise, do nothing since isLoggedIn will show thank you message
  });

  $scope.activate();

  //#region Internal Methods    

  function registerGsnProfile(profile) {
    gsnProfile.registerProfile(profile)
         .then(function (result) {
           $scope.isSubmitting = false;
           $scope.isValidSubmit = result.success;
           if (result.success) {
             $scope.isSubmitting = true;

             $rootScope.$broadcast('gsnevent:registration-successful', result);

             // since we have the password, automatically login the user
             if ($scope.isFacebook) {
               gsnProfile.loginFacebook(result.response.UserName, profile.FacebookToken);
             } else {
               gsnProfile.login(result.response.UserName, profile.Password);
             }
           } else {
             if (result.response == "Unexpected error occurred.") {
               $location.url('/maintenance');
             } else if (typeof (result.response) === 'string') {
               $scope.errorMessage = result.response;
             }
           }
         });
  }
  //#endregion

}]);

storeApp.controller('ctrlFuelRewards', ['$scope', 'gsnProfile', 'gsnMidax', function controller($scope, gsnProfile, gsnMidax) {
    $scope.activate = activate;
    $scope.profile = {};
    $scope.midaxNumber = null;
    $scope.currentBalance = 0;
    $scope.expiredRewards = 0;
    $scope.usedRewards = 0;
    $scope.purchases = [];

    function activate() {
      gsnProfile.getProfile().then(function (p) {
        if (p.success) {
          $scope.profile = angular.copy(p.response);
          $scope.midaxNumber = $scope.profile.ExternalId;
          if ($scope.midaxNumber !== null && $scope.midaxNumber > 0)
            loadMidax();
        }
      });
    }

    function loadMidax() {
      gsnMidax.GetFuelPointsHistory($scope.midaxNumber).then(function (response) {
        //Temp
        $scope.currentBalance = 1;
        $scope.expiredRewards = 2;
        $scope.usedRewards = 3;
        $scope.purchases = [{ Date: "Jan 17", Exp: "March 18", Cost: "9c" }, { Date: "Jan 24", Exp: "March 25", Cost: "10c" }];
        if (response.success && response.response !== null) {
          //Load data to the view
					var result = JSON.parse(response.response);
					console.log(result);
        }
      });
    }

    $scope.activate();
}]);