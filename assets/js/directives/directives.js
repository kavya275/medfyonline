angular.module('medfyApp.directives', [])
.directive('homenav', function ($timeout) {
        return {
            restrict: 'AEC',
            scope: {
					
            },
            link: function (scope, element, attrs) {
					
            },
            templateUrl: 'directives/homenav.html',
            controller:'headerCtrl'
            
        };

    })
.directive('profileinfo', function ($timeout) {
        return {
            restrict: 'AEC',
            scope: {
                  userdetail:'=',
                  relid:'=' 
            },
            link: function (scope, element, attrs) {
                    
            },
            templateUrl: 'directives/profileinfo.html',
            controller:'profileinfoCtrl'
            
        };

    })
.directive('submenu', function ($timeout) {
        return {
            restrict: 'AEC',
            scope: {
                    
            },
            link: function (scope, element, attrs) {
                    
            },
            templateUrl: 'directives/submenu.html',
            
        };

    })
.directive('menubar', function ($timeout) {
        return {
            restrict: 'AEC',
            scope: {
               
            },
            link: function (scope, element, attrs) {
                
            },
            templateUrl: 'directives/menubar.html',
            controller:'recordCntrl'
        };

    })
 .directive('footer', function ($timeout) {
        return {
            restrict: 'AEC',
            scope: {
                    
            },
            link: function (scope, element, attrs) {
                    
            },
            templateUrl: 'directives/footer.html'
        };

    })
    .directive('onError', function() {
      return {
        restrict:'A',
        link: function(scope, element, attr) {
          element.on('error', function() {
            element.attr('src', attr.onError);
          })
        }
      }
    })
     .directive('loadingMain', function ($timeout) {
        return {
            restrict: 'AE',
            scope: {

            },
            link: function (scope, element, attrs) {

            },
            templateUrl: 'directives/loading.html'
        };
    })
         .directive('viewRecord', function ($timeout) {
        return {
          replace:true,
            restrict: 'E',
            scope: {
                  history:'=' 
                  // limtval:'=' 
            },
            link: function ($scope, element, attrs) {
              console.log("DIRECTIVE check");
                   

            },
            templateUrl: 'directives/viewrecord.html'
            // controller:'headerCtrl'
        };

    })
              .directive('imgView', function ($timeout) {
        return {
          replace:true,
            restrict: 'AEC',
            scope: {
                  imagdata:'='  
            },
            link: function (scope, element, attrs) {
                    
            },
            templateUrl: 'directives/recordimgview.html'
            // controller:'userdetailsController'
        };

    })
      .directive('recordView', function ($timeout) {
        return {
            restrict: 'AEC',
            scope: {
                  recorddata:'='  
            },
            link: function (scope, element, attrs) {
                    
            },
            templateUrl: 'directives/recordnoti.html',
            controller:'notificationcntrl'
        };

    })
       .directive('memberAdd', function ($timeout) {
        return {
            restrict: 'AEC',
            scope: {
                    memberdata:'=',
                    indexval:'='
            },
            link: function (scope, element, attrs) {
              console.log(scope.indexval)
              console.log(scope.memberdata)
                    
            },
            templateUrl: 'directives/memberaddnoti.html',
            controller:'notificationcntrl'
        };

    })
         .directive('lazyLoad', function() {
        return function() {
            var bLazy = new Blazy();
        };
    })
    .directive('colorbox', function () {
    return {
      restrict: 'A',
      scope:{
        ondelete:'='
      },

      link: function (scope,compile) {

          //var temp = $compile("html")($scope);
          $(".group1").colorbox({
              rel:'group1',
              width:"75%",
              height:"75%",

              onComplete:function(compile,scope){
                 var html='<div class="report_spl popup_buttons"  title="Delete  this report"></div>';
                 $('#cboxLoadedContent').zoom({
                  on:'grab'
                 }); 
                  // $('#cboxCurrent').html(html);
                  // $('#cboxCurrent').css({'display':'block'})
                  $('[data-toggle="tooltip"]').tooltip()
              }
          });
          function somethingclick(data){
            console.log(data)
          }
      //      $('body').on('click','.report_spl',function (eve) {
           
      //   })  
      //  $('body').on('click','.group1',function (eve) {
      // // console.log(eve)

      //    console.log($(this).children('img').attr('id'))
         
      //   }) 
      }
    };
})
    .directive('fileUpload', function () {
    return {
        scope: true,        //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {

                var files = event.target.files;
                //iterate files since 'multiple' may be specified on the element
                //https://www.gbmb.org/mb-to-bytes
                for (var i = 0;i<files.length;i++) {
                  console.log(files[i])
                  if (files[i].size> 10590617.6) {
                    console.log("size is more than 10mb")
                    scope.$emit("imagesize");
                    scope.$emit("fileSelected", { file: files[i] })
                  }
                  else{
                    //  emit event file
                    scope.$emit("fileSelected", { file: files[i] });
                  }
                   
                } 
            });
        }
    };
})
    .directive('filemulUpload', function () {
    return {
        scope: true,        //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
              var files=[]
                 files.push(event.target.files) ;
                //iterate files since 'multiple' may be specified on the element
                for (var i = 0;i<files.length;i++) {
                    //emit event upward
                    scope.$emit("filemulSelected", { file: files[i] });
                } 
            });
        }
    };
})


    .filter('agecal', function() {
        return function(input) {
          var date = new Date(input);       
           var ageDifMs = Date.now() - date.getTime();   
           var ageDate = new Date(ageDifMs); // miliseconds from epoch
           var age = parseInt(Math.abs(ageDate.getUTCFullYear() - 1970));
            return age
        }
        
    })
      .filter('replacename', function() {
        return function(input) {
          var str=input.replace("_icn.", ".");
            return str;
        }
    })
    .directive('ngConfirmClick', [
       function(){
           return {
               link: function (scope, element, attr) {
                   var msg = attr.ngConfirmClick || "Are you sure?";
                   var clickAction = attr.confirmedClick;
                   element.bind('click',function (event) {
                       if ( window.confirm(msg) ) {
                           console.log(msg);
                           scope.$eval(clickAction)
                       }
                   });
               }
           };
       }])
     .directive('myUpload', [function () {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        scope.image = e.target.result;
                        // console.log(scope.image)
                        scope.$emit("filedisplay", { filename: scope.image });
                        scope.$apply();
                    }

                    elem.on('change', function() {
                        reader.readAsDataURL(elem[0].files[0]);
                    });
                }
            };
        }])

       .directive('formattedDate', function(dateFilter) {
      return {
        require: 'ngModel',
        scope: {
          format: "="
        },
        link: function(scope, element, attrs, ngModelController) {
          ngModelController.$parsers.push(function(data) {
            //convert data from view format to model format
            return dateFilter(data, scope.format); //converted
          });
    
          ngModelController.$formatters.push(function(data) {
            //convert data from model format to view format
            return dateFilter(data, scope.format); //converted
          });
        }
      }
    })
       .filter('myDate',function(){
             var s = 1000;
             var m = s * 60;
             var h = m * 60;
             return function(date) {
              console.log(date)
                var now = Date.now();
                console.log(now)
                var d = date.getTime() - now;
                console.log(d);
                if (d > h)
                    return '' + d / h + ' hours ago';
                if (d > m)
                    return '' + d / m + ' minutes ago';
                if (d > s)
                    return '' + d / s + ' seconds ago';
                return '' + d + ' ms ago';
              }
       })
           .filter('timeago', function() {
        return function(input, p_allowFuture) {
            var substitute = function (stringOrFunction, number, strings) {
                    var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, dateDifference) : stringOrFunction;
                    var value = (strings.numbers && strings.numbers[number]) || number;
                    return string.replace(/%d/i, value);
                },
                nowTime = (new Date()).getTime(),
                date = (new Date(input)).getTime(),
                //refreshMillis= 6e4, //A minute
                allowFuture = p_allowFuture || false,
                strings= {
                    prefixAgo: null,
                    prefixFromNow: null,
                    suffixAgo: "ago",
                    suffixFromNow: "from now",
                    seconds: "less than a minute",
                    minute: "about a minute",
                    minutes: "%d minutes",
                    hour: "about an hour",
                    hours: "about %d hours",
                    day: "a day",
                    days: "%d days",
                    month: "about a month",
                    months: "%d months",
                    year: "about a year",
                    years: "%d years"
                },
                dateDifference = nowTime - date,
                words,
                seconds = Math.abs(dateDifference) / 1000,
                minutes = seconds / 60,
                hours = minutes / 60,
                days = hours / 24,
                years = days / 365,
                separator = strings.wordSeparator === undefined ?  " " : strings.wordSeparator,
            
                // var strings = this.settings.strings;
                prefix = strings.prefixAgo,
                suffix = strings.suffixAgo;
                
            if (allowFuture) {
                if (dateDifference < 0) {
                    prefix = strings.prefixFromNow;
                    suffix = strings.suffixFromNow;
                }
            }

            words = seconds < 45 && substitute(strings.seconds, Math.round(seconds), strings) ||
            seconds < 90 && substitute(strings.minute, 1, strings) ||
            minutes < 45 && substitute(strings.minutes, Math.round(minutes), strings) ||
            minutes < 90 && substitute(strings.hour, 1, strings) ||
            hours < 24 && substitute(strings.hours, Math.round(hours), strings) ||
            hours < 42 && substitute(strings.day, 1, strings) ||
            days < 30 && substitute(strings.days, Math.round(days), strings) ||
            days < 45 && substitute(strings.month, 1, strings) ||
            days < 365 && substitute(strings.months, Math.round(days / 30), strings) ||
            years < 1.5 && substitute(strings.year, 1, strings) ||
            substitute(strings.years, Math.round(years), strings);

            return $.trim([prefix, words, suffix].join(separator));
            // conditional based on optional argument
            // if (somethingElse) {
            //     out = out.toUpperCase();
            // }
            // return out;
        }
    })
            .directive('owlCarousel', function () {
       return {
           restrict: 'A',
           link: function (scope,element) {

               if(scope.$last) {
                   console.log("DESTROY")

                   if(element.parent('').attr('class')=="owl-carousel owl-theme"){
                       console.log("Destroy............")
                       element.parent('').data('owlCarousel').destroy();
                    //   element.parent('#owl-team').owlCarousel(defaultOptions);
                   }
                   var defaultOptions = {
                   };
                   var customOptions =scope.$eval(element.parent('').attr('data-options'));
                   // combine the two options objects
                   console.log("OWL OPTIONS FIRST ")
                   console.log(customOptions);
                   for(var key in customOptions) {
                       defaultOptions[key] = customOptions[key];
                   }
                   console.log("OWL OPTIONS")
                   console.log(defaultOptions);
                   console.log(element.parent('#owl-team').attr('class'));

                   if(element.parent('#owl-team').attr('class')=="owl-carousel owl-theme"){
                       console.log("IF IF IF IF")
                       //element.parent('#owl-team').data('owlCarousel').destroy();
                       element.parent('').owlCarousel(defaultOptions);
                   }else{
                       console.log("ELSE")
                       element.parent('').owlCarousel(defaultOptions);
                   }


               }
           }
       }
   })
.directive('checkList', function() {
  return {
    scope: {
      list: '=checkList',
      value: '@'
    },
    link: function(scope, elem, attrs) {
      var handler = function(setup) {
        var checked = elem.prop('checked');
        var index = scope.list.indexOf(scope.value);

        if (checked && index == -1) {
          if (setup) elem.prop('checked', false);
          else scope.list.push(scope.value);
        } else if (!checked && index != -1) {
          if (setup) elem.prop('checked', true);
          else scope.list.splice(index, 1);
        }
      };
      
      var setupHandler = handler.bind(null, true);
      var changeHandler = handler.bind(null, false);
            
      elem.on('change', function() {
        scope.$apply(changeHandler);
      });
      scope.$watch('list', setupHandler, true);
    }
  };
})
 .directive('maximumWordsValidation', function () {
    'use strict';
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {
        // console.log("yyyyyyyyyyyyyyyy")
        // Figure out name of count variable we will set on parent scope
        var wordCountName = attrs.ngModel.replace('.', '_') + '_words_count';

        scope.$watch(function () {
          return ngModelCtrl.$modelValue;
        }, function (newValue) {
            // console.log(newValue)
          var str = newValue && newValue.replace('\n', '');
          // Dont split when string is empty, else count becomes 1
          var wordCount = str ? str.split(' ').length : 0;
          // Set count variable
          scope.$parent[wordCountName] = wordCount;
          // Update validity
          var max = attrs.maximumWordsValidation;
          // console.log(wordCount)
          // console.log(max)


          ngModelCtrl.$setValidity('maximumWords', wordCount <= max);
             // console.log("vvvvvv",ngModelCtrl)
        });
      }
    };
  })
    .filter('Filesize', function () {
    return function (size) {
      if (isNaN(size))
        size = 0;

      if (size < 1024)
        return size + ' Bytes';

      size /= 1024;

      if (size < 1024)
        return size.toFixed(2) + ' Kb';

      size /= 1024;

      if (size < 1024)
        return size.toFixed(2) + ' Mb';

      size /= 1024;

      if (size < 1024)
        return size.toFixed(2) + ' Gb';

      size /= 1024;

      return size.toFixed(2) + ' Tb';
    };
  })