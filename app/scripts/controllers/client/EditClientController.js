(function(module) {
  mifosX.controllers = _.extend(module, {
    EditClientController: function(scope,webStorage, routeParams, resourceFactory, location, http,dateFilter,API_VERSION,$rootScope) {
        scope.offices = [];
        scope.date = {};
        scope.clientId = routeParams.id;
        var clientData = webStorage.get('clientData');
        scope.displayName=clientData.displayName;
        scope.statusActive=clientData.statusActive;
        scope.hwSerialNumber=clientData.hwSerialNumber;
        scope.accountNo=clientData.accountNo;
        scope.officeName=clientData.officeName;
        scope.balanceAmount=clientData.balanceAmount;
        scope.currency=clientData.currency;
        scope.imagePresent=clientData.imagePresent;
        scope.categoryType=clientData.categoryType;
        scope.email=clientData.email;
        scope.phone=clientData.phone;
        resourceFactory.clientResource.get({clientId: routeParams.id, template: 'true'} , function(data) {
            scope.offices = data.officeOptions;
            scope.staffs = data.staffOptions; 
            scope.officeId = data.officeId;
	   // scope.clientCategory=data.categoryType;
	    scope.clientCategoryDatas=data.clientCategoryDatas;

	    for(var i=0;i<scope.clientCategoryDatas.length;i++){
	    	if(scope.clientCategoryDatas[i].categoryType==data.categoryType){
	    		scope.clientCategory=scope.clientCategoryDatas[i].id;
	    	}
	    }

            scope.formData = {
              firstname : data.firstname,
              lastname : data.lastname,
              middlename : data.middlename,
              active : data.active,
              accountNo : data.accountNo, 
              staffId : data.staffId,
              email:data.email,
              phone:data.phone,
              homePhoneNumber:data.homePhoneNumber
            };
            var actDate = dateFilter(data.activationDate,'dd MMMM yyyy');
            scope.date.activationDate = new Date(actDate);
            if(data.active){
                scope.choice = 1;
            }

        });
        
        

        scope.onFileSelect = function($files) {
          scope.file = $files[0];
        };
        
        scope.submit = function() {
	     this.formData.officeId=scope.officeId;
             this.formData.clientCategory=scope.clientCategory;
             this.formData.locale = 'en';
             this.formData.dateFormat = 'dd MMMM yyyy';
             if(scope.date.activationDate){this.formData.activationDate = dateFilter(scope.date.activationDate,'dd MMMM yyyy');}
             resourceFactory.clientResource.update({'clientId': routeParams.id},this.formData,function(data){
              if (scope.file) {
                http.uploadFile({
                  url: $rootScope.hostUrl+ API_VERSION +'/clients/'+data.clientId+'/images', 
                  data: {},
                  file: scope.file
                }).then(function(imageData) {
                  // to fix IE not refreshing the model
                  if (!scope.$$phase) {
                    scope.$apply();
                  }
                  location.path('/viewclient/'+data.resourceId);
                });
              } else{
                location.path('/viewclient/' + data.resourceId);
              }
          });
        };
    }
  });
  mifosX.ng.application.controller('EditClientController', ['$scope','webStorage', '$routeParams', 'ResourceFactory', '$location', '$http','dateFilter','API_VERSION','$rootScope', mifosX.controllers.EditClientController]).run(function($log) {
    $log.info("EditClientController initialized");
  });
}(mifosX.controllers || {}));
