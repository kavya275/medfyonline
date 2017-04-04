angular.module('medfyApp.controllers', [
    'medfyApp.services',
    'medfyApp.directives'
])
.controller('homeCtrl', function($scope,$rootScope,$stateParams, $state,urls,$http,userAuth,$localStorage) {
    console.log('hai...........');
    if(userAuth.checkLogin()){
   console.log($localStorage.headertoken)
   console.log($localStorage.userDetail)
    }

               $rootScope.myApp = $rootScope.myApp || (function () {
            var pleaseWaitDiv = $('#pleaseWaitDiv');
             return {
                    showPleaseWait: function () {
                        pleaseWaitDiv.show();
                    },
                    hidePleaseWait: function () {
                        pleaseWaitDiv.hide();
                    },

                };
            })();
            

            /* 	LOADING Function */
     $rootScope.myApp.hidePleaseWait();
   // $rootScope.myApp.showPleaseWait();
})
.controller('headerCtrl', function($scope, $stateParams, $state,urls,$http,$localStorage,userAuth,toastr) {
 
  if(userAuth.checkLogin()){
  console.log("logged in")
  $scope.loginstatus=true;
  $scope.usermobile=$localStorage.userDetail.mobileVerified;
    }  else{
    	$scope.loginstatus=false;
    	console.log("not logged in")
    }

    $scope.logout=function(){
    	console.log("logout")
    	 // $localStorage.$reset();
    // $state.go('generalhome')
          // $http.post(urls.apiUrl+'auth/logout',userAuth.getUserHeader())

    $http({
  method:"POST",
  url:urls.apiUrl+'auth/logout',
  headers: {"Authorization": "Bearer "+$localStorage.headertoken+""  }
}).success(function(response){
    			console.log(response)
    		if (response.meta.code==0) {
    			toastr.success(response.data)
    		  	console.log("logout")
    	 // $localStorage.$reset();
       delete $localStorage.userDetail
       	 $state.go('generalhome')
    		}else{

    			toastr.error("error")
    		}
    	}).error(function (data, status, header, config) {
            	console.log(data)
            	toastr.error(data.meta.debugMessage)
            	  // $rootScope.myApp.hidePleaseWait();
            })
  
    }
    $scope.deleteuser=function(){
      $scope.loginuserid=$localStorage.userDetail._id;
         $http({
                method:"DELETE",
                url:urls.apiUrl+'users/'+$scope.loginuserid,
                headers: {"Authorization": "Bearer "+$localStorage.headertoken+""  }
                }).success(function (response, status, headers, config) {
                console.log(response)
                if(response.meta.code==0){
                  toastr.success(response.data)
                 // $localStorage.$reset();
                 delete $localStorage.userDetail
         $state.go('generalhome')
                  console.log("deleted")
                  // $scope.$emit('refresh')
                }else{
              console.log("error")
                } 
                }).error(function (data, status, header, config) {
              console.log(JSON.stringify(data))
              // toastr.error(data.meta.debugMessage)
              // $rootScope.myApp.hidePleaseWait();
              })

    }
    $scope.getnotification=function(){
        $http.get(urls.apiUrl+'notifications',userAuth.getUserHeader())
    .success(function (response, status, headers, config) {
      console.log(response)
               if(response.meta.code==0){
                $scope.notificationlist=response.data;
                $scope.notificationNumber=$scope.notificationlist.length;
               console.log(response.data)
             }else{
              console.log("error")
             }   
            })
            .error(function (data, status, header, config) {
              console.log(data)
            });
    }
    $scope.getnotification();
    $scope.$on('refresh',function(){
      $scope.getnotification();
    })
     $scope.$on('updatescope',function(evt,args){
      console.log(args.index)
      $scope.notificationlist.splice(args.index,1)
                    
                })
$(document).mouseup(function (e)
{
    var container = $(".notofication_dropdown");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.removeClass('show_notification');
    }
});


$scope.opennoti=function(event){
  $(event.currentTarget).addClass('show_notification')
}
     $scope.deleteinfonoti=function(event,type){
      console.log("clickable")
      console.log(event)
      console.log(type)
      // $(event.currentTarget).addClass('show_notification')
      console.log($scope.notificationlist.length)
      if($scope.notificationlist.length>0){
        console.log("jjjj")
        // if (type=="all") {
        //   var deleteall=false
        // }else{
        //   var deleteall=true
        // }
        for(i=0;i<$scope.notificationlist.length;i++){
          console.log("ff",$scope.notificationlist[i].type)
            if ($scope.notificationlist[i].type=="informative") {
            $scope.notificationNumber--;
            console.log($scope.notificationlist[i]._id)
                 $http({
                method:"DELETE",
                url:urls.apiUrl+'notifications/'+$scope.notificationlist[i]._id,
                headers: {"Authorization": "Bearer "+$localStorage.headertoken+""  }
                }).success(function (response, status, headers, config) {
                console.log(response)
                if(response.meta.code==0){
            $state.go('home')
                  console.log("deleted")
                  // $scope.$emit('refresh')
                }else{
              console.log("error")
                } 
                }).error(function (data, status, header, config) {
              console.log(JSON.stringify(data))
              // toastr.error(data.meta.debugMessage)
              // $rootScope.myApp.hidePleaseWait();
              })
          }else{

          }
          }
      }
     }
   
})
.controller("notificationcntrl", function ($scope, $rootScope,$stateParams, $state,urls,$http,$localStorage,userAuth,toastr) {
console.log("in notificationcntrl")
$scope.notifirequest=function(request,notiid,notitype){
console.log(request)
console.log(notitype)
console.log('http://api.medfyonline.com/api/v1'+request)
console.log(JSON.stringify(userAuth.getUserHeader()))
 // $http.post('http://api.medfyonline.com/api/v1'+request,userAuth.getUserHeader())

$http({
  method:"POST",
  url:'http://api.medfyonline.com/api/v1'+request,
  headers: {"Authorization": "Bearer "+$localStorage.headertoken+""  }
}).success(function (response, status, headers, config) {
      console.log(response)
               if(response.meta.code==0){
                $http({
                method:"DELETE",
                url:urls.apiUrl+'notifications/'+notiid,
                headers: {"Authorization": "Bearer "+$localStorage.headertoken+""  }
                }).success(function (response, status, headers, config) {
                console.log(response)
                if(response.meta.code==0){
                  $scope.$emit('refresh')
                }else{
              console.log("error")
                } 
                }).error(function (data, status, header, config) {
              console.log(JSON.stringify(data))
              // toastr.error(data.meta.debugMessage)
              // $rootScope.myApp.hidePleaseWait();
              })
if(notitype=="newRecord"){
    // toastr.success(response.data)
     $scope.$emit('refresh')
  }else{
      toastr.success(response.data)
  }
              
               console.log(response.data)
             }else{
              console.log("error")
             }   
            })
            .error(function (data, status, header, config) {
              console.log(data)
              toastr.error(data.meta.debugMessage)
            });
}
$scope.notifinewrequest=function(request,notiid,indexval){
console.log(request)
console.log('http://api.medfyonline.com/api/v1'+request)
console.log(JSON.stringify(userAuth.getUserHeader()))
 // $http.post('http://api.medfyonline.com/api/v1'+request,userAuth.getUserHeader())

$http({
  method:"POST",
  url:'http://api.medfyonline.com/api/v1'+request,
  headers: {"Authorization": "Bearer "+$localStorage.headertoken+""  }
}).success(function (response, status, headers, config) {
      console.log(response)
               if(response.meta.code==0){
                $scope.$emit('updatescope',{
                    index:indexval
                })

                toastr.success("Lab Report Accepted")
               console.log(response.data)
             }else{
              console.log("error")
             }   
            })
            .error(function (data, status, header, config) {
              console.log(data)
              toastr.error(data.meta.debugMessage)
            });
}
$scope.deletesinglenoti=function(notiid){
  console.log(notiid)
$http({
                method:"DELETE",
                url:urls.apiUrl+'notifications/'+notiid,
                headers: {"Authorization": "Bearer "+$localStorage.headertoken+""  }
                }).success(function (response, status, headers, config) {
                console.log(response)
                if(response.meta.code==0){
                  toastr.success("Notification deleted")
                  $scope.$emit('refresh')
                }else{
              console.log("error")
                } 
                }).error(function (data, status, header, config) {
              console.log(JSON.stringify(data))
              // toastr.error(data.meta.debugMessage)
              // $rootScope.myApp.hidePleaseWait();
              })  
}
})
.controller('profileinfoCtrl', function($scope,md5,$stateParams , $state,urls,$localStorage,$http,userAuth,toastr) {
console.log("pppppp",$stateParams.userId)
$scope.useridentifier=$stateParams.userId;
$scope.loginuserid=$localStorage.userDetail._id;
   // $scope.userdetail=$localStorage.userDetail;
$scope.currentstate=$state.current.name
   // console.log($scope.userdetail)
  $scope.openmodal=function(opt){
  $scope.modstatus="open";
  $scope.otptype=opt;
}
$scope.removephoto=function(){
   $scope.userdetail.profilePic="";
   $scope.$emit('removephoto',{
    removeProfilePic:1
   })
}

 $scope.$emit('removephoto',{
  removeProfilePic:0
 })
$scope.$on("filedisplay", function (event, args) {
        $scope.$apply(function () {            
            //add the file object to the scope's files collection
            $scope.userdetail.profilePic=args.filename;
        });
    })
$scope.$on('imagesize',function(){
  $scope.errormsg="Image size is larger than 10 Mb"
})
  $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {            
    $scope.imagesize=args.file.size
    console.log($scope.imagesize)
        });
    })

      $scope.removefm=function(rmuserid){
        var loginid=$localStorage.userDetail._id
      console.log(rmuserid)
var form = new FormData();
form.append("user", rmuserid);


$http({
  method:"DELETE",
  url:urls.apiUrl+'users/'+loginid+'/relative',
  data:form,
  headers: {"Authorization": "Bearer "+$localStorage.headertoken+""  }
}).success(function (response, status, headers, config) {
console.log(response)
                if(response.meta.code==0){
               $scope.successmsg=response.data;
              toastr.success($scope.successmsg)
              $state.go('home')
             }else{
              console.log("error")
             } 
}).error(function (data, status, header, config) {
              console.log(JSON.stringify(data))
              toastr.error(data.meta.debugMessage)
              // $rootScope.myApp.hidePleaseWait();
              }); 
       console.log(urls.apiUrl+'users/'+$localStorage.userDetail._id+'/relative')
    }
    $scope.verifyotp=function(otptype,otp,email){
      console.log(otp)
      if(otptype=='verify'){
      var data=$.param({
        otp:otp.otpnum,
        email:email,
        password:md5.createHash(otp.password || '')
      }) 
      var requestapi=$localStorage.userDetail._id+"/verifyotp";
    }else{
      var data=$.param({
        email:email,
        password:md5.createHash(otp.password || '')
      })
      var requestapi=$localStorage.userDetail._id+"/resendotp";
    }
      
      
      $http.post(urls.apiUrl+'users/'+requestapi,data,userAuth.getUserHeader())
    .success(function (response, status, headers, config) {
      console.log(headers)
      console.log(response)
      // $rootScope.myApp.hidePleaseWait();
               if(response.meta.code==0){
                if (otptype=='verify') {
                $scope.successmsg=response.data.verified;
                }else{
                  $scope.successmsg=response.data.OTPSent;
                }
              toastr.success($scope.successmsg)
              $scope.modstatuss="hide";
               $scope.otp=""
             }else{
              $scope.modstatuss="hide";
              console.log("error")
               $scope.otp=""
             }   
            })
            .error(function (data, status, header, config) {
              console.log(JSON.stringify(data))
              $scope.modstatuss="hide";
               $scope.otp=""
              toastr.error(data.meta.debugMessage)
              // $rootScope.myApp.hidePleaseWait();
              }); 
    }


})
// .controller('logincntrl',function($scope, $stateParams, $state,urls,$http,$localStorage,userAuth){
// 	console.log("in logincntrl")
// 	$scope.login=function(userdata){
// 		console.log(userdata)
// 	var something="email="+"Sunil_nyam@yahoo.com";	
// 	var password="&password="+"934a77353ce8764b48fb84a0f17d0dda";
// 	console.log(urls.apiUrl+'auth/email/login?'+something+password)
// 	   $http.post(urls.apiUrl+'auth/email/login?'+something+password).
//         success(function (response, status, headers, config) {
//            console.log(response)
//             if(response.meta.code==0){
//            	   $localStorage.userDetail=response.data.user;
// 	           }else{
// 	           	console.log("error")
// 	           }
//         console.log($localStorage.userDetail)
//             }).
//             error(function (response, status, headers, config) {
//             });
// 	}
// })

.controller("logincntrl", function ($scope, $rootScope,$stateParams, $state,urls,$http,$localStorage,userAuth, md5,toastr) {
console.log("in logincntrl")
console.log($localStorage.userDetail)
console.log(userAuth.checkLogin())
if(userAuth.checkLogin()==true){
	$state.go('home')
}
var config = {
                headers : {
                    'Authorization': '',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        $scope.login = function (userdata) {
           // use $.param jQuery function to serialize data from JSON 
            var data = $.param({
                email: userdata.email,
                password: md5.createHash(userdata.password || '')
            });
            
   			$rootScope.myApp.showPleaseWait();
			$http.post(urls.apiUrl+'auth/email/login',data,userAuth.getUserHeader()).success(function (response, status, headers, config) {
			console.log(response)
			  $rootScope.myApp.hidePleaseWait();
                if(response.meta.code==0){
           	   $localStorage.userDetail=response.data.user;
           	   console.log(response.data.accessToken)
           	    $localStorage.headertoken=  response.data.accessToken;
                $localStorage.refreshtoken= response.data.refreshToken;
           	   $state.go('home');
           	    toastr.success("successfully logged in..")
	           }else{
	           	console.log("error")
	           	 toastr.error("error")
	           }
            })
            .error(function (data, status, header, config) {
            	console.log(data.meta.debugMessage)
            	toastr.error(data.meta.debugMessage)
            	  $rootScope.myApp.hidePleaseWait();
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
           // $http.post(urls.apiUrl+'auth/email/login', form,config)
            
        };
        $scope.signup=function(userdata){
          // $scope.opensignupmod="open";
        	console.log(userdata)
        	 var data = $.param({
                name: userdata.username,
                email: userdata.email,
                password:md5.createHash(userdata.password || ''),
                mobileNumber:userdata.mobileno
            });
        	console.log(data)
        	$rootScope.myApp.showPleaseWait(); 
        	$http.post(urls.apiUrl+'users',data,config).success(function (response, status, headers, config) {
			console.log(response)
			$rootScope.myApp.hidePleaseWait();
                if(response.meta.code==0){
           	   // $localStorage.userDetail=response.data;
               $scope.signupForm="";
               $scope.signupForm={};
               $scope.data=""
           	   console.log(response.data.accessToken)
           	      // $localStorage.headertoken=response.data.accessToken;
                  $scope.opensignupmod="open";
                  // toastr.success("you have signed up successfully.please verify your email id to log into your account")
           	   // $state.go('loginsignup');
	           }else{
	           	console.log("error")
	           }
            })
            .error(function (data, status, header, config) {
            	console.log(data)
              toastr.error(data.meta.debugMessage)
            	$rootScope.myApp.hidePleaseWait();
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
        }
        $scope.forgotmod=function(){
          $scope.forgot="open";
        }
      $scope.forgotpassword=function(mailid){
      console.log(mailid)
      var data=$.param({
        email:mailid
      })
  $http.post(urls.apiUrl+'auth/forgot',data,config).success(function (response, status, headers, config) {
      console.log(response)
                if(response.meta.code==0){
               console.log(response.data)
                  toastr.success(response.data)
                  $scope.forgot="hide";
                  $scope.mailid="";
             }else{
              $scope.forgot="hide";
              console.log("error")
             }
            })
            .error(function (data, status, header, config) {
              $scope.forgot="hide";
              toastr.error(error)
              console.log(data)
                
      })
          }
    })
.controller("userdetailsController", function ($scope, $rootScope,$stateParams, $state,urls,$http,$localStorage,userAuth,toastr,$window) {
	if(!userAuth.checkLogin()){
		$state.go('loginsignup')
    }

    if (userAuth.checkLogin()) {
      if($localStorage.verifyotp==undefined){
         if($localStorage.userDetail.mobileVerified==false){
         var openverifystate=true; 
         $localStorage.verifyotp=true; 
        $state.go('verifyotp')
      }
      }
    }
    // $scope.limit_to_img=4;
    // $scope.changelimit=function(limit,index){
    //   console.log(limit)
    //   console.log(index)
    //     $scope.limit_to_img=limit;
       
    //     $scope.hide_box=true;
    // }
		  console.log(userAuth.getUserHeader()) 
		  console.log($stateParams.userId)  
		  if ($stateParams.userId=="" || $stateParams.userId==null || $stateParams.userId==undefined) {
		  var userID=$localStorage.userDetail._id;	
      var requesturl="users/"
		}else{
      if($stateParams.userId==$localStorage.userDetail._id){ 
        var userID=$localStorage.userDetail._id;  
      var requesturl="users/"
    }else{
        var userID=$stateParams.userId;
        $scope.relationurl="relations";
      var requesturl="relations/";
    }

		
		}
		  
		  $scope.getuserdetails=function(userid){
		  	$rootScope.myApp.showPleaseWait();
console.log(urls.apiUrl+requesturl+userID)
console.log(JSON.stringify(userAuth.getUserHeader()))
		  	$http.get(urls.apiUrl+requesturl+userID,userAuth.getUserHeader())
		.success(function (response, status, headers, config) {
			console.log(response)
			$rootScope.myApp.hidePleaseWait();
               if(response.meta.code==0){
                if (requesturl=='relations/') {
                  $scope.relationID=response.data._id;
                   $scope.userinfo=response.data.relative;
                   $scope.userinfo.relation=response.data.relation
               console.log($scope.userinfo)
               console.log($scope.userinfo.relation)
                  if($state.current.name=='viewhistory'){
               console.log($scope.userinfo.recordYears[0])
              $scope.viewhistory($scope.userinfo.recordYears[0],$scope.userinfo._id)
             }
             }else{
              $scope.relationID="";
               $scope.userinfo=response.data;
               $localStorage.userDetail=$scope.userinfo
               console.log(JSON.stringify($scope.userinfo))
               if($state.current.name=='viewhistory'){
               console.log($scope.userinfo.recordYears[0])
              $scope.viewhistory($scope.userinfo.recordYears[0],$scope.userinfo._id)
             }
             }
 
	           }else{
	           	console.log("error")
	           }   
            })
            .error(function (data, status, header, config) {
            	console.log(data)
              if (data.meta.code==2001) {
                  userAuth.renewtoken()
                  // window.location.reload();
              }
             
            	$rootScope.myApp.hidePleaseWait();
            	toastr.error(data.meta.debugMessage)
            });
		  }
		$scope.getuserdetails(userID);
        //listen for the file selected event
    $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {            
            //add the file object to the scope's files collection
            $scope.files=args.file;
    console.log($scope.files)
    $scope.imagesize=args.file.size
    console.log($scope.imagesize)
        });
    })
    $scope.$on('removephoto',function(event,args){
     console.log(args.removeProfilePic)
      $scope.removeProfilePic=args.removeProfilePic;
    })
		$scope.updateuserdetail=function(userdata){
       var userloginID=$localStorage.userDetail._id; 
			console.log(JSON.stringify(userdata))
var model=false;

      if(userdata._id==userloginID){
        if (userdata.emailVerified==false) {
          model=true;
        }
      }
if(model==true){
$scope.openmailmod="open";
}

      else{
if (userdata.asthma==1) {
        var asthma=true;
      }else{
        var asthma=false;
      }
      if (userdata.diabetes==1) {
        var diabetes=true;
      }else{
        var diabetes=false;
      }
      // if(userdata.mobileVerified==true){
          var mobileno=userdata.mobileNumber;
      // }else{
            // var mobileno=userdata.mobileNumberToVerify
      // }
       var data = $.param({
                name: userdata.name,
                mobileNumber:mobileno,
                birthday: userdata.birthday,
                gender: userdata.gender,
                maritalStatus: userdata.maritalStatus,
                height: userdata.height,
                weight: userdata.weight,
                diet: userdata.diet,
                foodAllergies: userdata.foodAllergies,
                medicalAllergies: userdata.medicalAllergies,
                asthma: asthma,
                diabetes: diabetes,
                removeProfilePic:$scope.removeProfilePic,
                avoidEmailCheck:true
            });

       // users/:userId
       // $rootScope.myApp.showPleaseWait()
       console.log("bbbbb",data)
       console.log(urls.apiUrl+'users/'+userdata._id)
$http.put(urls.apiUrl+'users/'+userdata._id,data,userAuth.getUserHeader())
    .success(function (response, status, headers, config) {
      console.log(response)
      // $rootScope.myApp.hidePleaseWait();
               if(response.meta.code==0){
               // $scope.userinfo=response.data;
               if(userdata._id!=userloginID){
  $scope.updaterelationid(userdata)
}
if($scope.files==undefined){
 console.log($localStorage.mobileVerified)
  if (userdata._id==userloginID) {
    if($localStorage.mobileVerified==undefined)
    // if(response.data.mobileVerified==false)
    {
      // if(userdata.mobileNumber!=""){}
      console.log($localStorage.mobileVerified)
      $localStorage.mobileVerified=true;
      $state.go('verifyotp')
    }else{
       $state.go('home')
    }
 // $state.go('home')
  }
 
  toastr.success("Profile Updated successfully")
}
               // console.log($scope.userinfo)
             // $state.go('home')
             }else{
              console.log("error")
             }   
            })
            .error(function (data, status, header, config) {
              console.log(data)
              toastr.error(data.meta.debugMessage)
              // $rootScope.myApp.hidePleaseWait();
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
      }
      
		}
    $scope.updaterelationid=function(relationdata){
      console.log(relationdata)
       // var userloginID=$localStorage.userDetail._id; 
      var data=$.param({
        user:relationdata._id ,
        relation:relationdata.relation
      })
      $http.put(urls.apiUrl+'relations/'+$stateParams.userId,data,userAuth.getUserHeader())
    .success(function (response, status, headers, config) {
      console.log(response)
      // $rootScope.myApp.hidePleaseWait();
               if(response.meta.code==0){
                      console.log(response.data)
                       $state.go('home')
             }else{
              console.log("error")
             }   
            })
            .error(function (data, status, header, config) {
              console.log(data)
              // toastr.error(data.meta.debugMessage)
              // $rootScope.myApp.hidePleaseWait();
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
    }
		$scope.removefm=function(rmuserid){

			console.log(rmuserid)
			 var data = $.param({
			 	user:rmuserid
			 });
       console.log(data)
       console.log(JSON.stringify(userAuth.getUserHeader()))
			 // users/:userId
			 // $rootScope.myApp.showPleaseWait()

       console.log(urls.apiUrl+'users/'+$localStorage.userDetail._id+'/relative')
$http.delete(urls.apiUrl+'users/'+$localStorage.userDetail._id+'/relative',userAuth.getUserHeader(),data)
		.success(function (response, status, headers, config) {
      console.log(headers)
			console.log(response)
			// $rootScope.myApp.hidePleaseWait();
               if(response.meta.code==0){
           	   $scope.successmsg=response.data;
           	  toastr.success($scope.successmsg)
           	 
	           }else{
	           	console.log("error")
	           }   
            })
            .error(function (data, status, header, config) {
              console.log(JSON.stringify(data))
              toastr.error(data.meta.debugMessage)
            	// $rootScope.myApp.hidePleaseWait();
              });	
		}
		$scope.viewhistory=function(year,useridr){
      $scope.yeartab=year;
			console.log(year,"-------")
      // http://api.medfyonline.com/api/v1/records?user=<user_id>&year=<year>
$http.get(urls.apiUrl+'records?user='+useridr+'&year='+year,userAuth.getUserHeader())
			// $http.get(urls.apiUrl+'records?year='+year,userAuth.getUserHeader())
		.success(function (response, status, headers, config) {
			console.log(response)
			$rootScope.myApp.hidePleaseWait();
               if(response.meta.code==0){
           	   $scope.historydata=response.data;
           	   console.log(JSON.stringify($scope.historydata))
           	 
	           }else{
	           	console.log("error")
	           }   
            })
            .error(function (data, status, header, config) {
            	console.log(data)
            	$rootScope.myApp.hidePleaseWait();
            });
		}
     $scope.$on('refreshhistory',function(args,evnt){
 
      console.log(evnt)
      $scope.viewhistory(evnt.year,evnt.user)
     })

//     $scope.viewhistoryrel=function(year,relationID){
// console.log(urls.apiUrl+'records?user='+relationID)
// console.log(JSON.stringify(userAuth.getUserHeader()))
//    $http.get(urls.apiUrl+'records?user='+relationID,userAuth.getUserHeader())
//        .success(function (response, status, headers, config) {
//                   console.log(response)
//                   if(response.meta.code==0){
//                   console.log(response.data);
//                   $scope.historydata=response.data
//                   }else{
//                   console.log("error")
//                  }
//             })
//             .error(function (data, status, header, config) {
//               console.log(data)
//               $scope.errormsg=data.meta.errorMessage;
//               // toastr.error("error")
//             }); 
//     }
$scope.imgupload=function(res,file){
  console.log(res)

var formData = new FormData();
formData.append("AWSAccessKeyId",res.AWSAccessKeyId);
formData.append("signature", res.signature);
formData.append("policy", res.policy);
formData.append("key", res.keys);
formData.append("acl", res.acl);
formData.append("success_action_status", res.success_action_status);
formData.append("file", file);
// $http.post(res.uploadURL, form, {
//             headers: {
//               'Content-Type': 'multipart/form-data'
//             },
//             transformRequest: angular.identity
//           })
$rootScope.myApp.showPleaseWait()
$http.post(res.uploadURL, formData, {
   transformRequest: angular.identity,
   headers: {'Content-Type': undefined}
})
.success(function(response){
  if (response=="") {
      $http.get(res.redirectURL+res.keys,userAuth.getUserHeader())
      .success(function (response, status, headers, config) {
      console.log(response)
          $rootScope.myApp.hidePleaseWait();

      $state.go('home')
      // $scope.userinfo.profilePic=$scope.userinfo.profilePic.concat(response.data.profilePic)
            })
            .error(function (data, status, header, config) {
              console.log(data)
            });
  }
  // console.log(res)
})
.error(function(data){
console.log(data)
$rootScope.myApp.hidePleaseWait();
});

}

    // $scope.$watch('files',function(newval,oldval){
    //   console.log(newval)
    //   $scope.jjjj=newval
    // })
		$scope.uploadimage=function(userinfo){
      console.log("lllllkkk",userinfo)
      if($stateParams.userId!=''){
        var userID=userinfo._id;
      }else{
        var userID=$localStorage.userDetail._id;
      }
      if ($scope.files!=undefined) {
        var string=$scope.files.name
       var hhh= string.split('.');
        console.log(hhh[1])
      var data=$.param({
        extension:hhh[1],
        redirect:false
      })

$http.post(urls.apiUrl+'users/'+userID+'/picture',data,userAuth.getUserHeader())
.success(function (response, status, headers, config) {
      console.log(response)
                if(response.meta.code==0){
                  var imgd=response.data
               console.log(response.data)
               $scope.imgupload(imgd,$scope.files)
                 }else{
              console.log("error")
             }
            })
            .error(function (data, status, header, config) {
              console.log(data)
                });

}else{
  // $state.go('home');
}
}



$scope.openmodal=function(){
console.log("hhhh")
$scope.modstatus="open";
}
$scope.transferrecord=function(mail,userId){
  console.log(userId)
console.log(mail)
$scope.modstatus="hide";
var data=$.param({
  user:userId,
  email:mail
})
$http.post(urls.apiUrl+'transfers',data,userAuth.getUserHeader())
.success(function (response, status, headers, config) {
      console.log(response)
      // $rootScope.myApp.hidePleaseWait()
                if(response.meta.code==0){
               console.log(response.data)
               toastr.success(response.data)
                 }else{
              console.log("error")
             }
            })
            .error(function (data, status, header, config) {
              console.log(data)
              toastr.error(data.meta.debugMessage)
              // $rootScope.myApp.hidePleaseWait();
                });
}
$scope.getrecorddetails=function(recordID,index){
  console.log(recordID)
  $scope.editrecord="open";
  $scope.indexval=index;
  $http.get(urls.apiUrl+'records/'+recordID,userAuth.getUserHeader())
.success(function (response, status, headers, config) {
      console.log(response)
      // $rootScope.myApp.hidePleaseWait()
                if(response.meta.code==0){
             $scope.recoddetails=response.data;
             console.log($scope.recoddetails)
                 }else{
              console.log("error")
             }
            })
            .error(function (data, status, header, config) {
              console.log(data)
              toastr.error(data.meta.debugMessage)
              // $rootScope.myApp.hidePleaseWait();
                });
}
$scope.deleterecord=function(recordId,indexval){
  $http.delete(urls.apiUrl+'records/'+recordId,userAuth.getUserHeader())
.success(function (response, status, headers, config) {
      console.log(response)
      // $rootScope.myApp.hidePleaseWait()
                if(response.meta.code==0){
             console.log(response.data);
             $scope.editrecord="hide";
             toastr.success(response.data);
             $scope.historydata.splice(indexval,1)
                 }else{
                  $scope.editrecord="hide";
              console.log("error")
             }
            })
            .error(function (data, status, header, config) {
              console.log(data)
              $scope.editrecord="hide";
              toastr.error(data.meta.debugMessage)
              // $rootScope.myApp.hidePleaseWait();
                });
}
$scope.checked_reptimg=[];
$scope.deletereport=function(recordId,reportId,indexval,index){
  console.log(reportId)
  console.log(indexval)
  // console.log($scope.reportids)
   // var hhhh= String(reportId).split(',')
   // console.log(hhhh)
  // for(var i=0;i<reportId.length;i++){
  //   console.log(reportId[i])
  
  // }
  // $scope.reportids=[]
  // $scope.reportids.push(reportId)
  // var data=$.param({
  //   reports:JSON.stringify($scope.reportids)
  // })
  var form = new FormData();
form.append("reports", JSON.stringify(reportId));
               $http({
                method:"DELETE",
                url:urls.apiUrl+'records/'+recordId+'/reports',
                headers: {"Authorization": "Bearer "+$localStorage.headertoken+""  },
                 data:form
                })
  // $http.delete(urls.apiUrl+'records/'+recordId+'/reports',userAuth.getUserHeader(),data)
.success(function (response, status, headers, config) {
      console.log(response)
      // $rootScope.myApp.hidePleaseWait()
                if(response.meta.code==0){
             console.log(response.data);
             $scope.editrecord="hide";
              $scope.checked_reptimg=[]
             toastr.success("Report Deleted Successfully");
               $scope.$emit('refreshhistory',{
                user:response.data.user,
                year:response.data.year
               })
             $scope.recoddetails[indexval].reports.splice(indexval,1)
                 }else{
                  $scope.editrecord="hide";
              console.log("error")
             }
            })
            .error(function (data, status, header, config) {
              console.log(data)
              $scope.editrecord="hide";
              toastr.error(data.meta.debugMessage)
              // $rootScope.myApp.hidePleaseWait();
                });
}
    $scope.$on("filemulSelected", function (event, args) {
        $scope.$apply(function () {            
            //add the file object to the scope's files collection
            $scope.mulfiles=args.file;
    console.log($scope.mulfiles)
        });
    })
$scope.updaterecord=function(recorddetails,indexval){
      $scope.extension=[];
    if ($scope.mulfiles!=undefined) {
          for(i=0;i<$scope.mulfiles.length;i++){
console.log($scope.mulfiles[i].name);
var data=$scope.mulfiles[i].name.split('.')
$scope.extension.push(data[1])
    }
    }

      var v1=recorddetails.createdTimestamp;
             var d = new Date(); // for now
           var  datetext=v1+" "+d.getHours()+": "+d.getMinutes()+": "+d.getSeconds();
             console.log(datetext)
  var data=$.param({
    type:recorddetails.type,
    description:recorddetails.description,
    fileExtensions:JSON.stringify($scope.extension),
    date:datetext,
    redirect:false

  })
  $http.put(urls.apiUrl+'records/'+recorddetails._id,data,userAuth.getUserHeader())
.success(function (response, status, headers, config) {
      console.log(response)
      // $rootScope.myApp.hidePleaseWait()
                if(response.meta.code==0){
             console.log(response.data);
              $scope.editrecord="hide";
              $scope.historydata[indexval]=response.data;
               if($scope.mulfiles!=undefined)
                  {
                   $scope.uploaddata=response.data.upload
                   console.log(JSON.stringify($scope.uploaddata))
                  $scope.imgmulupload($scope.uploaddata,$scope.mulfiles,response.data.user,response.data.year)

                  }
              toastr.success("Record Updated successfully")
                 }else{
                  $scope.editrecord="hide";
              console.log("error")
             }
            })
            .error(function (data, status, header, config) {
              console.log(data)
              $scope.editrecord="hide";
              toastr.error(data.meta.debugMessage)
                });
}
$scope.openrecordmodal=function(img,type,clsno){
  $scope.imgname=img
  $scope.recordmod="open";
  $scope.recordtype=type;
  console.log(img)
  $scope.clsno=clsno;
}
// add record


$scope.addrecord=function(record,rtype){
  console.log(record)
  console.log(rtype)
    $scope.extension=[];
    if ($scope.mulfiles!=undefined) {
          for(i=0;i<$scope.mulfiles.length;i++){
console.log($scope.mulfiles[i].name);
var data=$scope.mulfiles[i].name.split('.')
$scope.extension.push(data[1])
    }
    }
          var v1=record.date;
             var d = new Date(); // for now
           var  datetext=v1+" "+d.getHours()+": "+d.getMinutes()+": "+d.getSeconds();
             console.log(datetext)

$scope.recordmod="hide";
var data=$.param({
  user:$localStorage.userDetail._id,
  type:rtype,
  description:record.desc,
  fileExtensions:JSON.stringify($scope.extension),
  date:datetext,
  redirect:false
})
      $http.post(urls.apiUrl+'records',data,userAuth.getUserHeader())
       .success(function (response, status, headers, config) {
      console.log(response)
                if(response.meta.code==0){
                  console.log(response.data);
                  $scope.recordmod="hide";
                  if($scope.mulfiles!=undefined)
                  {
                   $scope.uploaddata=response.data.upload
                   console.log(JSON.stringify($scope.uploaddata))
                  $scope.imgmulupload($scope.uploaddata,$scope.mulfiles,response.data.user,response.data.year)
                  }
                  
                  $scope.record="";
                  toastr.success("record created successfully")
                 }else{
                $scope.recordmod="hide"

              console.log("error")
             }
            })
            .error(function (data, status, header, config) {
              console.log(data)
             $scope.recordmod="hide";
toastr.error("error")
            }); 
}
$scope.imgmulupload=function(res,file,userids,yeard){
  console.log(res)
  for(var i = 0; i <res.keys.length; i++) { 
                        (function(i){
console.log(res.keys[i]);
console.log(file[i])
var redirectKey="";
 redirectKey=res.keys[i];
   console.log("REDIRECT : " ,redirectKey)
var formData = new FormData();
formData.append("AWSAccessKeyId",res.AWSAccessKeyId);
formData.append("signature", res.signature);
formData.append("policy", res.policy);
formData.append("key", res.keys[i]);
formData.append("acl", res.acl);
formData.append("success_action_status", res.success_action_status);
formData.append("file", file[i]);
// $http.post(res.uploadURL, form, {
//             headers: {
//               'Content-Type': 'multipart/form-data'
//             },
//             transformRequest: angular.identity
//           })
$rootScope.myApp.showPleaseWait()
$http.post(res.uploadURL, formData, {
   transformRequest: angular.identity,
   headers: {'Content-Type': undefined}
})
.success(function(response){
  if (response=="") {
    console.log("jjj",res.redirectURL+redirectKey)
      $http.get(res.redirectURL+redirectKey,userAuth.getUserHeader())
      .success(function (response, status, headers, config) {
      console.log(response)
          $rootScope.myApp.hidePleaseWait();
            $scope.viewhistory(yeard,userids)
        var $el = $('#mulimg');
        $el.wrap('<form>').closest('form').get(0).reset();
        $el.unwrap();
      // $state.go('home')
      // $scope.userinfo.profilePic=$scope.userinfo.profilePic.concat(response.data.profilePic)
            })
            .error(function (data, status, header, config) {
              console.log(data)
            });
  }
  // console.log(res)
})
.error(function(data){
console.log(data)
$rootScope.myApp.hidePleaseWait();
});
 })(i)
}
}
    })
.controller("addmembercntrl", function ($scope,$rootScope,$stateParams, $state,urls,$http,$localStorage,userAuth, md5,toastr) {
$scope.$on('imagesize',function(){
  $scope.errormsg="Image size is larger than 10 Mb"
})
    $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {            
            //add the file object to the scope's files collection
            $scope.mulfiles=args.file;
    console.log($scope.mulfiles)
        });
    })

    $scope.addfamember=function(member){ 
    	console.log(member)
      if($scope.mulfiles!=undefined){
          var string=$scope.mulfiles.name
       var hhh= string.split('.');
        console.log(hhh[1])
      }else{
        var hhh=""
      }

  
            // var data = $.param(member);
           var data = $.param({
              relation:member.relation,
              name:member.name,
              email:member.email,
              mobileNumber:member.mobileNumber,
              birthday:member.birthday,
              gender:member.gender,
              maritalStatus:member.maritalStatus,
              height:member.height,
              weight:member.weight,
              diet:member.diet,
              foodAllergies:member.foodAllergies,
              medicalAllergies:member.medicalAllergies,
              asthma:member.asthma,
              diabetes:member.diabetes,
              fileExtension:hhh[1],
              redirect:false
            })
            $rootScope.myApp.showPleaseWait()
			$http.post(urls.apiUrl+'users/'+$localStorage.userDetail._id+'/newrelative',data,userAuth.getUserHeader()).success(function (response, status, headers, config) {
			console.log(response)
			$rootScope.myApp.hidePleaseWait()
                if(response.meta.code==0){
           	   console.log(JSON.stringify(response.data))
                     if($scope.mulfiles!=undefined){
                       $scope.uploaddata=response.data.relative.upload;
                  console.log(JSON.stringify($scope.uploaddata))
                  $scope.imgmulupload($scope.uploaddata,$scope.mulfiles)
                     }
                     else{
                       toastr.success("Member Created successfully")
                       $state.go('home');

                     }
               
           	   
	           }else{
	           	console.log("error")
	           }
            })
            .error(function (data, status, header, config) {
            	console.log(data)
            	$rootScope.myApp.hidePleaseWait();
                toastr.error(data.meta.debugMessage)
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
   
 }
 $scope.imgmulupload=function(res,file){
  console.log(res)
console.log(res.keys);
console.log(file)
 redirectKey=res.keys;
   console.log("REDIRECT : " ,redirectKey)
var formData = new FormData();
formData.append("AWSAccessKeyId",res.AWSAccessKeyId);
formData.append("signature", res.signature);
formData.append("policy", res.policy);
formData.append("key", res.keys);
formData.append("acl", res.acl);
formData.append("success_action_status", res.success_action_status);
formData.append("file", file);

$rootScope.myApp.showPleaseWait()
$http.post(res.uploadURL, formData, {
   transformRequest: angular.identity,
   headers: {'Content-Type': undefined}
})
.success(function(response){
  if (response=="") {
    console.log("jjj",res.redirectURL+redirectKey)
      $http.get(res.redirectURL+redirectKey,userAuth.getUserHeader())
      .success(function (response, status, headers, config) {
      console.log(response)
          $rootScope.myApp.hidePleaseWait();
 toastr.success("Member Created successfully")
      $state.go('home')
            })
            .error(function (data, status, header, config) {
              console.log(data)
            });
  }
})
.error(function(data){
console.log(data)
$rootScope.myApp.hidePleaseWait();
});
}

    })
.controller('addexistingmem',function($scope,$rootScope,$state,$http,toastr,urls,$localStorage,userAuth){
console.log("in addexistingmem cntrl");
 $scope.addexistingmem=function(id,relation){ 
    	console.log(id,relation)
            var data = $.param({
				user:id,
				relation:relation
            });
            // $rootScope.myApp.showPleaseWait()
			$http.post(urls.apiUrl+'users/'+$localStorage.userDetail._id+'/relative',data,userAuth.getUserHeader()).success(function (response, status, headers, config) {
			console.log(response)
			// $rootScope.myApp.hidePleaseWait()
               $scope.openmod="hide";
                if(response.meta.code==0){
           	   console.log(response.data)
           	  toastr.success("successfully added")
	           }else{
	           	//toastr.error()
	           	console.log("error")
	           }
            })
            .error(function (data, status, header, config) {
            	console.log(data)
            	$scope.openmod="hide";
              if(data.meta.code==5001){
                toastr.error("Please Choose Relation")
              }else{
                  toastr.error(data.meta.debugMessage)
              }
            
            	$rootScope.myApp.hidePleaseWait();
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
   
 }
 $scope.openmodal=function(mail,relation){
 	console.log(mail, "relation--" , relation)
 	$scope.mailid=mail._id;
 	$scope.mailname=mail.name;
 	 $scope.mailrelation=relation;
$scope.openmod="open";
 }
 $scope.searchbyemail=function(email){
 	console.log(email)
            // $rootScope.myApp.showPleaseWait()
			$http.get(urls.apiUrl+'users?email='+email,userAuth.getUserHeader()).success(function (response, status, headers, config) {
			console.log(response)
			// $rootScope.myApp.hidePleaseWait()
                if(response.meta.code==0){
           	   console.log(response.data)
           	   $scope.listofmail=response.data;
           	   console.log($scope.listofmail)
           	     }else{
	           	console.log("error")
	           }
            })
            .error(function (data, status, header, config) {
            	console.log(data)
            	$rootScope.myApp.hidePleaseWait();
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
 }
})

.controller('myformcntrl',function($scope,$rootScope,$state,$http,toastr,urls,$localStorage,userAuth,$filter){
     $scope.openmodalform=function(formname){
      if(formname=='newform'){
              $scope.newform="open";
      }else{
            $scope.newentryformd="open";
      }
     }
      $scope.items=[{
          fieldname:"",
            unit:""
        }]
      $scope.add=function(){
        $scope.items.push({
                   fieldname:"",
                  unit:""
                })
      }
    $scope.remove = function (item) {
            var index = $scope.items.indexOf(item);
            $scope.items.splice(index, 1);
    };
    $scope.insertnewform=function(formname,formdata){

         var rv = {};
       angular.forEach(formdata, function(value , key) {
              console.log(value.fieldname+"--"+value.unit)
                  // rv+="'"+value.fieldname+"':'"+value.unit+"',";
                  rv[value.fieldname]=value.unit;
        })
        // rv=rv.replace(/,+$/,'');
        // rv+="}";
      var data=$.param({
        title:formname,
        elements:JSON.stringify(rv)
      })
      console.log(data)
      console.log(userAuth.getUserHeader())
      console.log(urls.apiUrl+'forms')
     $http.post(urls.apiUrl+'forms',data,userAuth.getUserHeader()).success(function (response, status, headers, config) {
      console.log(response)
      // $rootScope.myApp.hidePleaseWait()
                if(response.meta.code==0){
               console.log(response.data)
                      $scope.newform="hide"; 
                      $scope.formname="";
                       $scope.items=[{
                              fieldname:"",
                                unit:""
                            }]
                              // $scope.newaddForm={"items":[ {
                              //                         "fieldname": "",
                              //                         "unit": ""
                              //                       }]
                              //                     };
                 $scope.listforms=$scope.listforms.concat(response.data)
                 }else{
                         $scope.newform="hide"; 

              console.log("error")
             }
            })
            .error(function (data, status, header, config) {
              console.log(data)
              $rootScope.myApp.hidePleaseWait();
                     $scope.newform="hide"; 

                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            }); 
    }
    $scope.listforms=function(){
       $http.get(urls.apiUrl+'forms',userAuth.getUserHeader())
       .success(function (response, status, headers, config) {
      console.log(response)
                if(response.meta.code==0){
                  $scope.listforms=response.data;
               console.log(response.data)
                 }else{
              console.log("error")
             }
            })
            .error(function (data, status, header, config) {
              console.log(data)
                if (data.meta.code==2001) {
                  userAuth.renewtoken()
                  // window.location.reload();
              }
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            }); 
    }
     $scope.listforms()
     $scope.formentry=function(form){
      $scope.formentrydata=form;
      console.log(JSON.stringify($scope.formentrydata))
      console.log(urls.apiUrl+'formentries?form='+form._id)
      console.log(JSON.stringify(userAuth.getUserHeader()))
      $http.get(urls.apiUrl+'formentries?form='+form._id,userAuth.getUserHeader())
       .success(function (response, status, headers, config) {
      console.log(response)

                if(response.meta.code==0){
                  $scope.formentries=response.data;
               console.log(JSON.stringify(response))
               // $scope.formval=response.data.value
                   $scope.graphcat=[];
                   $scope.graphval=[];
                   $scope.graphname=[];
                   var graphData={};
                   for(i=0;i<$scope.formentries.length;i++){
                    var datef= $filter('date')($scope.formentries[i].createdTimestamp)
                     console.log(datef)
                    $scope.graphcat.push(datef)
                    console.log($scope.formentries[i].values)
                    for(j=0;j<$scope.formentries[i].values.length;j++){

                      // $scope.graphval.push($scope.formentries[i].values[j].value)
                       // $scope.graphname.push($scope.formentries[i].values[j].formElement.title)
                       var title=$scope.formentries[i].values[j].formElement.title;
                       var val=$scope.formentries[i].values[j].value;
                      
                       if(graphData[title]==undefined){
                        graphData[title]=[];
                       }
                       graphData[title].push(val)

                       /*$scope.graphname.push({
                        name:$scope.formentries[i].values[j].formElement.title,
                        data:$scope.formentries[i].values[j].value
                        })*/
                      }
                   }
                   console.log(JSON.stringify($scope.graphcat))
                   

 $scope.graphname=[];
angular.forEach(graphData,function(value,ke){
console.log("ACTUAL Graph")
console.log(ke)
  console.log(value)
  $scope.graphname.push({
                        name:ke,
                        data:value
                        })
})
   console.log("SOMETHING")
console.log(JSON.stringify($scope.graphname))


              // $scope.graphdata=response.data.values;
// function getgraph(){
  
// }
                option={
       title: {
            text: 'Graph',
            x: -20 //center
        },
        credits: {
    enabled: true
  },
        subtitle: {
            text: '',
            x: -20
        },
        xAxis: {
            categories:$scope.graphcat
        },
        yAxis: {
            title: {
                text: 'Count'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: ''
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },

        series:  $scope.graphname
    }

    // option.series[0]={name:'Cause',data:$scope.details.causeCreationGraph.graph_data}
     // option.xAxis.categories[0]=$scope.details.causeCreationGraph.graph_data
console.log("************************************************")
     console.log(option)
    $('#highchartdisplay1').highcharts(option);
    // $scope.$on('fornewentry',function(){
    //   $('#highchartdisplay1').highcharts(option);
    // })
                 }else{
              console.log("error")

             }
            })
            .error(function (data, status, header, config) {
              console.log(data)

            }); 
     }
     // $scope.listgraph=function(formid){


     // }
      $scope.newformentry=function(formentry,examinationdate){
      console.log(JSON.stringify(formentry))
      console.log(urls.apiUrl+'formentries')
      if (examinationdate==undefined) {
        examinationdate=new Date();
      }
      console.log(examinationdate)
         $scope.correctdata= function(checkdata){
        if(checkdata==undefined || checkdata==''){
          checkdata='';
        }
        return checkdata;
       }
        var rv = {};
       angular.forEach(formentry.elements, function(value , key) {
                  rv[value._id]=value.value;
        })
        console.log("--------------------RV-----------------")
        console.log(rv)
        console.log(JSON.stringify(rv))
         
      var data=$.param({
        form:formentry._id,
        values:JSON.stringify(rv),
        date:$scope.correctdata(examinationdate)
      })
      $http.post(urls.apiUrl+'formentries',data,userAuth.getUserHeader())
       .success(function (response, status, headers, config) {
      console.log(response)
                if(response.meta.code==0){
                  console.log(response.data);
                  $scope.newentryformd="hide"
                  $scope.formentries=$scope.formentries.concat(response.data)
                  // $scope.newentryForm={};
                  $scope.examinationdate="";
                  // $scope.formentrydata.elements={
                  //   value:""
                  // }
                  // $scope.elements={
                  //   value:""
                  // }
        $scope.formentry(formentry)
               console.log(JSON.stringify($scope.formentries))
                 }else{
                $scope.newentryformd="hide"

              console.log("error")
             }
            })
            .error(function (data, status, header, config) {
              console.log(data)
             $scope.newentryformd="hide";

            }); 
     }
     $scope.deleteform=function(formId,indexval){
      console.log(formId)
      console.log(indexval)
       $http.delete(urls.apiUrl+'forms/'+formId,userAuth.getUserHeader())
       .success(function (response, status, headers, config) {
      console.log(response)
                if(response.meta.code==0){
                  console.log(response.data);
               toastr.success(response.data)
               $scope.listforms.splice(indexval,1)


                 }else{
              console.log("error")
             }
            })
            .error(function (data, status, header, config) {
              console.log(data)
              toastr.error(data.meta.debugMessage)
            }); 
     }
        $scope.deleteformentry=function(entryId,indexval){
      console.log(entryId)
      console.log(indexval)
       $http.delete(urls.apiUrl+'formentries/'+entryId,userAuth.getUserHeader())
       .success(function (response, status, headers, config) {
      console.log(response)
                if(response.meta.code==0){
                  console.log(response.data);
               toastr.success(response.data)
               $scope.formentries.splice(indexval,1)
               // $scope.$emit('fornewentry')
                 }else{
              console.log("error")
             }
            })
            .error(function (data, status, header, config) {
              console.log(data)
              toastr.error(data.meta.debugMessage)
            }); 
     }
     $scope.openeditformentry=function(forentryval){
      $scope.editformval="open";
      console.clear()
      console.log(forentryval)
      $scope.forentryval=forentryval;
     }
         $scope.editformentry=function(entryval){
      console.clear()
      console.log(entryval)
         var rv = {};
       angular.forEach(entryval.values, function(value , key) {
                  rv[value.formElement._id]=value.value;
        })
        var data=$.param({
          form:entryval.form,
          values:JSON.stringify(rv),
          date:entryval.createdTimestamp
        })
          $http.put(urls.apiUrl+'formentries/'+entryval._id,data,userAuth.getUserHeader())
          .success(function (response, status, headers, config) {
              console.log(response)
                    $scope.editformval="hide";

               if(response.meta.code==0){
                 toastr.success("Form Entry Updated successfully")

             }else{
              console.log("error")
             }   
            })
            .error(function (data, status, header, config) {
              console.log(data)
              $scope.editformval="hide";
             
            });
     }
})
.controller('moreentryCntrl',function($scope,$rootScope,$stateParams,$state,$http,toastr,urls,$localStorage,userAuth){
console.log($stateParams.formId)
var form=$stateParams.formId;
$scope.title=$stateParams.title;
     // $scope.formentry=function(form){
      console.log(urls.apiUrl+'formentries?form='+form)
      console.log(JSON.stringify(userAuth.getUserHeader()))
      $http.get(urls.apiUrl+'formentries?form='+form,userAuth.getUserHeader())
       .success(function (response, status, headers, config) {
      console.log(response)
                if(response.meta.code==0){
                  $scope.formentries=response.data;
               console.log(JSON.stringify($scope.formentries))
                 }else{
              console.log("error")

             }
            })
            .error(function (data, status, header, config) {
              console.log(data)

            }); 
     // }
         $scope.openeditformentry=function(forentryval){
      $scope.editformval="open";
      console.clear()
      console.log(forentryval)
      $scope.forentryval=forentryval;
     }
         $scope.editformentry=function(entryval){
      console.clear()
      console.log(entryval)
         var rv = {};
       angular.forEach(entryval.values, function(value , key) {
                  rv[value.formElement._id]=value.value;
        })
        var data=$.param({
          form:entryval.form,
          values:JSON.stringify(rv),
          date:entryval.createdTimestamp
        })
          $http.put(urls.apiUrl+'formentries/'+entryval._id,data,userAuth.getUserHeader())
          .success(function (response, status, headers, config) {
              console.log(response)
                    $scope.editformval="hide";

               if(response.meta.code==0){
                 toastr.success("Form Entry Updated successfully")

             }else{
              console.log("error")
             }   
            })
            .error(function (data, status, header, config) {
              console.log(data)
              $scope.editformval="hide";
             
            });
     }
            $scope.deleteformentry=function(entryId,indexval){
      console.log(entryId)
      console.log(indexval)
       $http.delete(urls.apiUrl+'formentries/'+entryId,userAuth.getUserHeader())
       .success(function (response, status, headers, config) {
      console.log(response)
                if(response.meta.code==0){
                  console.log(response.data);
               toastr.success(response.data)
               $scope.formentries.splice(indexval,1)
                 }else{
              console.log("error")
             }
            })
            .error(function (data, status, header, config) {
              console.log(data)
              toastr.error(data.meta.debugMessage)
            }); 
     }
})
.controller('recordCntrl',function($scope,$stateParams,$filter,$rootScope,$state,$http,toastr,urls,$localStorage,userAuth){

console.log($stateParams.relId)
if($stateParams.relId=="" || $stateParams.relId==undefined){
  $scope.userloginid=$localStorage.userDetail._id
}else{
  $scope.userloginid=$stateParams.relId
}
$scope.openrecordmodal=function(img,type){
  $scope.imgname=img
  $scope.recordmod="open";
  $scope.recordtype=type;
  console.log(img)
}
    //listen for the file selected event
    $scope.$on("filemulSelected", function (event, args) {
        $scope.$apply(function () {            
            //add the file object to the scope's files collection
            $scope.files=args.file;
    console.log($scope.files)
        });

    })

$scope.addrecord=function(record,rtype){
  console.log(record)
  console.log(rtype)
   console.log($scope.userloginid)
  $scope.extension=[];
  if ($scope.files!=undefined) {
        for(i=0;i<$scope.files.length;i++){
console.log($scope.files[i].name);
var data=$scope.files[i].name.split('.')
$scope.extension.push(data[1])
    }
  }
  var v1=record.date;
             var d = new Date(); // for now
           var  datetext=v1+" "+d.getHours()+": "+d.getMinutes()+": "+d.getSeconds();
console.log(datetext)
//   var date1=$filter('date')(record.date, "yyyy-MM-ddTHH:mm:ss.SSSZ")
//    var date2=$filter('date')(record.date, "yyyy-MM-ddT", "HH:mm:ss.SSSZ")
//    console.log("aaa",date1)
//    console.log("bbb",date2)
// var v2 = new Date(record.date);
//   var hhhh=v2.toISOString()
//   console.log(hhhh)
 // console.log( new Date(Date.parse(record.date)));
 //  console.log(new Date(record.date))
  console.log(JSON.stringify($scope.extension))
$scope.recordmod="hide";
var data=$.param({
  user:$scope.userloginid,
  type:rtype,
  description:record.desc,
  fileExtensions:JSON.stringify($scope.extension),
  date:datetext,
  redirect:false
})
console.log(data)
console.log(urls.apiUrl+'records')
console.log(JSON.stringify(userAuth.getUserHeader()))
console.log( {"Authorization": "Bearer "+$localStorage.headertoken+""  })

      $http.post(urls.apiUrl+'records',data,userAuth.getUserHeader())
       .success(function (response, status, headers, config) {
      console.log(response)
                if(response.meta.code==0){
                  console.log(response.data);
                  if ($scope.files!=undefined) {
                  $scope.uploaddata=response.data.upload
                  console.log(JSON.stringify($scope.uploaddata))
                  $scope.imgupload($scope.uploaddata,$scope.files,response.data.user,response.data.year) 
                  }
                    $scope.$emit('refreshhistory',{
                      user:response.data.user,
                      year:response.data.year
                    })
                  $scope.recordmod="hide";
                  $scope.record="";
                  toastr.success("record created successfully")
                 }else{
                $scope.recordmod="hide"

              console.log("error")
             }
            })
            .error(function (data, status, header, config) {
              console.log(data)
             $scope.recordmod="hide";
            toastr.error(data.meta.errorMessage)
            }); 
}
$scope.imgupload=function(res,file,userd,year){
  console.log(res)
  console.log(userd,"ddddddddd")
  console.log(year)
  for(var i = 0; i <res.keys.length; i++) { 
                        (function(i){
console.log(res.keys[i]);
console.log(file[i])
var redirectKey="";
 redirectKey=res.keys[i];
   console.log("REDIRECT : " ,redirectKey)
var formData = new FormData();
formData.append("AWSAccessKeyId",res.AWSAccessKeyId);
formData.append("signature", res.signature);
formData.append("policy", res.policy);
formData.append("key", res.keys[i]);
formData.append("acl", res.acl);
formData.append("success_action_status", res.success_action_status);
formData.append("file", file[i]);
// $http.post(res.uploadURL, form, {
//             headers: {
//               'Content-Type': 'multipart/form-data'
//             },
//             transformRequest: angular.identity
//           })
$rootScope.myApp.showPleaseWait()
$http.post(res.uploadURL, formData, {
   transformRequest: angular.identity,
   headers: {'Content-Type': undefined}
})
.success(function(response){
  if (response=="") {
    console.log("jjj",res.redirectURL+redirectKey)
      $http.get(res.redirectURL+redirectKey,userAuth.getUserHeader())
      .success(function (response, status, headers, config) {
      console.log(response)
         var $el = $('#mulimg');
        $el.wrap('<form>').closest('form').get(0).reset();
        $el.unwrap();
          $rootScope.myApp.hidePleaseWait();
          $scope.$emit('refreshhistory',{
                      user:userd,
                      year:year
                    })
      // $state.go('home')
      // $scope.userinfo.profilePic=$scope.userinfo.profilePic.concat(response.data.profilePic)
            })
            .error(function (data, status, header, config) {
              console.log(data)
                $rootScope.myApp.hidePleaseWait();
            });
  }
  // console.log(res)
})
.error(function(data){
console.log(data)
$rootScope.myApp.hidePleaseWait();
});
 })(i)
}
}

    $scope.uploadimage=function(){
var userID=$localStorage.userDetail._id;
      if ($scope.files!=undefined) {
        var string=$scope.files.name
       var hhh= string.split('.');
        console.log(hhh[1])
      var data=$.param({
        extension:hhh[1],
        redirect:false
      })

$http.post(urls.apiUrl+'users/'+userID+'/picture',data,userAuth.getUserHeader())
.success(function (response, status, headers, config) {
      console.log(response)
                if(response.meta.code==0){
                  var imgd=response.data
               console.log(response.data)
               $scope.imgupload(imgd,$scope.files)
                 }else{
              console.log("error")
             }
            })
            .error(function (data, status, header, config) {
              console.log(data)
                });

}else{
  // $state.go('home');
}
}

})
.controller('viewotherhistoryCntrl',function($scope,$rootScope,$state,$http,toastr,urls,$localStorage,userAuth){
$scope.requestType='approved';
$scope.getotherhistory=function(type){
  $scope.requestType=type;
  if (type=='pending') {
    var request="requests?list=pending";
  }else if(type=='sharedwithuser'){
    var request="requests";
  }else if(type=='approved'){
    var request="requests?list=approved";
  }
   $http.get(urls.apiUrl+request,userAuth.getUserHeader())
       .success(function (response, status, headers, config) {
      console.log(response)
                if(response.meta.code==0){
                  console.log(response.pagination);
                  $scope.historylist=response.data
                 }else{

              console.log("error")
             }
            })
            .error(function (data, status, header, config) {
              console.log(data)
                if (data.meta.code==2001) {
                  userAuth.renewtoken()
                  // window.location.reload();
              }
toastr.error("error")
            }); 
}
$scope.getotherhistory($scope.requestType)
 $scope.searchby=function(searchdata){
  $scope.requestType="searchby";
  console.log(searchdata)
  if(searchdata.match(/^\d+$/)) {
    console.log("hhhhhh")
    var reqtype="users?mobileNumber="+searchdata;
}else{
  var reqtype="users?email="+searchdata;
  console.log("nnnnnn")
}
         // $rootScope.myApp.showPleaseWait()
      $http.get(urls.apiUrl+reqtype,userAuth.getUserHeader()).success(function (response, status, headers, config) {
      console.log(response)
      // $rootScope.myApp.hidePleaseWait()
                if(response.meta.code==0){
               console.log(response.data)
              $scope.historylist=response.data
                 }else{
              console.log("error")
             }
            })
            .error(function (data, status, header, config) {
              console.log(data)
              $rootScope.myApp.hidePleaseWait();
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
 }
 $scope.sendreq=function(identifier){
  var data =$.param({
    user:identifier
  })
 $http.post(urls.apiUrl+'requests',data,userAuth.getUserHeader())
 .success(function (response, status, headers, config) {
      console.log(response)
                if(response.meta.code==0){
                 toastr.success("Request sent")
                 }else{
              console.log("error")
             }
            })
            .error(function (data, status, header, config) {
              console.log(data)
              toastr.error(data.meta.debugMessage)
              $rootScope.myApp.hidePleaseWait();
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
 }
 $scope.currentPage =1;
                    $scope.itemsPerPage = 10;
                    $scope.maxSize = 5;
                    var totalSearchCount = 5;
                    $scope.totalItems = totalSearchCount;

                    $scope.$watch('currentPage + itemsPerPage', function () {
                        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
                        end = begin + $scope.itemsPerPage;

                    });   
                    $scope.deletereq=function(reqId,indexval){
                      console.log(reqId)
                      $http({
                method:"DELETE",
                url:urls.apiUrl+'requests/'+reqId,
                headers: {"Authorization": "Bearer "+$localStorage.headertoken+""  }
                }).success(function (response, status, headers, config) {
                console.log(response)
                if(response.meta.code==0){
                  toastr.success(response.data)
                  $scope.historylist.splice(indexval,1)
                  console.log("deleted")
                  // $scope.$emit('refresh')
                }else{
              console.log("error")
                } 
                }).error(function (data, status, header, config) {
              console.log(JSON.stringify(data))
              // toastr.error(data.meta.debugMessage)
              // $rootScope.myApp.hidePleaseWait();
              })
                    }
})
.controller('recorddetaisCntrl',function($scope,$rootScope,$state,$stateParams,$http,toastr,urls,$localStorage,userAuth){
// $stateParams.userId
var userId=$stateParams.userId;
console.log(urls.apiUrl+'records?user='+userId)
console.log(JSON.stringify(userAuth.getUserHeader()))
   $http.get(urls.apiUrl+'records?user='+userId,userAuth.getUserHeader())
       .success(function (response, status, headers, config) {
                  console.log(response)
                  if(response.meta.code==0){
                  console.log(response.data);
                  $scope.recorddetail=response.data
                  }else{
                  console.log("error")
                 }
            })
            .error(function (data, status, header, config) {
              console.log(data)
              $scope.errormsg=data.meta.errorMessage;
              // toastr.error("error")
            }); 
})
.controller('verifyotpcntrl',function($scope,$rootScope,md5,$state,$stateParams,$http,toastr,urls,$localStorage,userAuth){
      
      $scope.userdetail=$localStorage.userDetail
console.log($scope.userdetail)
      $scope.verifyotp=function(otptype,otp,email){
      console.log(otp)
      if(otptype=='verify'){
      var data=$.param({
        otp:otp.otpnum,
        email:email,
        password:md5.createHash(otp.password || '')
      }) 
      var requestapi=$localStorage.userDetail._id+"/verifyotp";
    }else{
      var data=$.param({
        email:email,
        password:md5.createHash(otp.password || '')
      })
      var requestapi=$localStorage.userDetail._id+"/resendotp";
    }
      
      
      $http.post(urls.apiUrl+'users/'+requestapi,data,userAuth.getUserHeader())
    .success(function (response, status, headers, config) {
      console.log(headers)
      console.log(response)
      // $rootScope.myApp.hidePleaseWait();
               if(response.meta.code==0){
                if (otptype=='verify') {
                $scope.successmsg=response.data.verified;
                $state.go('home')
                }else{
                   $state.go('verifyotp')
                  $scope.successmsg=response.data.OTPSent;
                }
              toastr.success($scope.successmsg)
             
             }else{
              console.log("error")
             }   
            })
            .error(function (data, status, header, config) {
              console.log(JSON.stringify(data))
              toastr.error(data.meta.debugMessage)
              // $rootScope.myApp.hidePleaseWait();
              }); 
    }
})