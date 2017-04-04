angular.module('medfyApp', ['ui.router','ui.bootstrap',
    'medfyApp.controllers',
    'medfyApp.services',
     'medfyApp.directives',
    'ngStorage','ui.materialize','angular-md5','creatise.material' ,'toastr','naif.base64','angularLazyImg'])

// .constant('BASE_URL_HREF', 'http://demo.creatise.in/medfy/#/')
.constant('BASE_URL_HREF', 'http://localhost/medfy/#/')

.constant('BASE_API_URL', 'http://api.medfyonline.com/api/v1/')


.config(function ($stateProvider, $urlRouterProvider,$locationProvider) {
        $stateProvider
         .state('loginsignup', {
                url: '/loginsignup',
                templateUrl: 'views/loginsignup.html',
                controller:'logincntrl'
            })
            .state('generalhome', {
                url: '/generalhome',
                templateUrl: 'views/generalhome.html',
              //  controller:'userdetailsController'
            })
            .state('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                controller:'userdetailsController'
            })
             .state('viewhistory', {
                url: '/viewhistory/?userId/?relId',
                templateUrl: 'views/viewhistory.html',
                controller:'userdetailsController'
            })

              .state('myform', {
                url: '/myform',
                templateUrl: 'views/myform.html',
                controller:'myformcntrl'
            })
               .state('profileedit', {
                url: '/profileedit/:userId',
                templateUrl: 'views/profileedit.html',
                controller:'userdetailsController'
            })
               .state('addmember', {
                url: '/addmember',
                templateUrl: 'views/addmember.html',
                controller:'addmembercntrl'
            })
               .state('existingmember', {
                url: '/existingmember',
                templateUrl: 'views/existingmember.html',
                controller:'addexistingmem'
            })
                .state('privacypolicy', {
                url: '/privacypolicy',
                templateUrl: 'views/privacypolicy.html',
            })
                .state('aboutus', {
                url: '/aboutus',
                templateUrl: 'views/aboutus.html',
            })

                 .state('contactus', {
                url: '/contactus',
                templateUrl: 'views/contactus.html',
            })
                .state('termsofuse', {
                url: '/termsofuse',
                templateUrl: 'views/termsofuse.html',
            })
                .state('faq', {
                url: '/faq',
                templateUrl: 'views/faq.html',
            })
              .state('viewotherhistory', {
                url: '/viewotherhistory',
                templateUrl: 'views/viewotherhistory.html',
                controller:'viewotherhistoryCntrl'
            })
               .state('moreentryform', {
                url: '/moreentryform/:formId/:title',
                templateUrl: 'views/moreentryform.html',
                controller:'moreentryCntrl'
            })
              .state('notification',{
                url:'/notification',
                templateUrl:'views/notification.html',
                controller:'headerCtrl'
              })
            .state('recorddetails',{
                url:'/recorddetails/:userId',
                templateUrl:'views/recorddetails.html',
                controller:'recorddetaisCntrl'

              })
             .state('verifyotp',{
                url:'/verifyotp',
                templateUrl:'views/verifyotp.html',
                controller:'verifyotpcntrl'

              })
             .state('resendotp',{
                url:'/resendotp',
                templateUrl:'views/resendotp.html',
                controller:'verifyotpcntrl'

              })
 $urlRouterProvider.otherwise('/generalhome');
    });

