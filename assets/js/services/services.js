angular.module('medfyApp.services', [])

.service('urls', function (BASE_API_URL, BASE_URL_HREF) {
        this.apiUrl = BASE_API_URL;
        this.href = BASE_URL_HREF;
        this.imageUrl = 'http://api.medfyonline.com/';

    })
  .factory('userAuth',function ($localStorage,$http) {
    return{
        checkLogin:function () {
            var result = false;
            var userDetail = $localStorage.userDetail;
            if (userDetail != undefined) {
            if (userDetail._id != null || userDetail._id != undefined) {
                if (userDetail._id != 0) {
                    if (userDetail._id != "") {
                        result = true;
                    }
                }
            }
        }
            return result;
        },
        getUserHeader:function(){
        	var headertoken=$localStorage.headertoken;
        	// console.log(headertoken)
        	var header={};
        	if(headertoken==undefined || headertoken==null){
        		header={
			            headers : {
			                'Authorization': '',
			                'Content-Type': 'application/x-www-form-urlencoded'
			            }
			        }
			    }else{
			    	header={
			                headers : {
			                    'Authorization': 'Bearer '+headertoken,
			                    'Content-Type': 'application/x-www-form-urlencoded'
			                }
			            }
			    }
        	
            return header;
        },
         renewtoken:function(){
        	var token=$localStorage.refreshtoken;
        	var data=$.param({
        		refreshToken:token
        	})
        	$http.post('http://api.medfyonline.com/api/v1/auth/refreshToken',data,this.getUserHeader())
        	.success(function (response, status, headers, config) {
      console.log(response)
      // $rootScope.myApp.hidePleaseWait()
                if(response.meta.code==0){
             console.log(response.data);
            $localStorage.headertoken=response.data.accessToken;
            console.log($localStorage.headertoken)
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
    }
})

 