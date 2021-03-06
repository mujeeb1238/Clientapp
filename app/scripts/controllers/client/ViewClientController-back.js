(function(module) {
  mifosX.controllers = _.extend(module, {
    ViewClientController: function(scope,webStorage, routeParams , route, location, resourceFactory,paginatorService, http,$modal,dateFilter,API_VERSION,$rootScope,PermissionService) {
    	 scope.client = [];
         scope.error = {};
         scope.identitydocuments = [];
         scope.buttons = [];
         scope.clientdocuments = [];
         scope.clientcarddetails = [];
         scope.staffData = {};
         scope.orders = [];
         scope.scheduleorders=[];
         scope.formData = {};
 		 scope.start = {};
         scope.start.date = new Date();
         scope.payment="PAYMENT";
         scope.invoice="INVOICE";
         scope.adjustment="ADJUSTMENT";
         scope.PermissionService = PermissionService;
         
            var callingTab = webStorage.get('callingTab',null);
         if(callingTab == null){
         	callingTab="";
         }else{
 		  scope.displayTab=callingTab.someString;
 		 
 		  if( scope.displayTab == "identities"){
 			 
 			  scope.identitiesTab = true;
 			  webStorage.remove('callingTab');
 		  }
 		  else if(scope.displayTab == "documents"){
  			  scope.documentsTab = true;
 			  webStorage.remove('callingTab');
 		  }
 		  else if(scope.displayTab == "Tickets"){
 			  scope.TicketsTab = true;
 			  webStorage.remove('callingTab');
 		  }
 		  else if(scope.displayTab == "hardware"){
 			  scope.hardwareTab =  true;
 			  webStorage.remove('callingTab');
 		  }
 		  else if(scope.displayTab == "Sale"){
 			  scope.SaleTab =  true;
 			  scope.eventsaleC="active";
 			  scope.eventorderC="";
 			  webStorage.remove('callingTab');
 		  }else if(scope.displayTab == "Statements"){
 			  scope.StatementsTab =  true;
 			  webStorage.remove('callingTab');
 		  }else if(scope.displayTab == "eventOrders"){
 			scope.SaleTab = true;
 			scope.eventsaleC="";
 			scope.eventorderC="active";
 			webStorage.remove('callingTab');
 		  }else
 		  {
 			  webStorage.remove('callingTab');
 		  };
 		 
         }
         
         scope.routeTogeneral = function(orderid,clientid){
             location.path('/vieworder/'+orderid+'/'+clientid);
           };
           
         scope.routeToOwnHardware = function(id){
               location.path('/viewownhardware/'+ id);
             };
           
         scope.routeToticket = function(clientId,ticketid){
               location.path('/viewTicket/'+clientId+'/'+ticketid);
         };
         scope.routeTostatement = function(statementid){
             location.path('/viewstatement/'+statementid);
        };
        scope.routeTofinancial = function(transactionId,transtype,clientid){
        	
        	if(transtype == 'INVOICE'){
               location.path('/viewfinancialtran/'+transactionId+'/'+clientid);
        	}
        }; 
        scope.routeToItemSale = function(onetimesaleid,clientid){
            location.path('/viewonetimesale/'+onetimesaleid+'/'+clientid);
        };
        
<<<<<<< HEAD
        scope.routeToCardDetails = function(clientid,id,cardType){
            location.path('/viewcarddetails/'+clientid+'/'+id+'/'+cardType);
          };
       
=======
        var bookOrder = PermissionService.showMenu('CREATE_ORDER')&&PermissionService.showMenu('READ_ORDER');
        var riseTicket = PermissionService.showMenu('CREATE_TICKET')&&PermissionService.showMenu('READ_TICKET');
        var makePayment = PermissionService.showMenu('CREATE_PAYMENT')&&PermissionService.showMenu('READ_GETPAYMENT');
        var payInvoice = PermissionService.showMenu('CREATE_PAYMENT')&&PermissionService.showMenu('READ_GETPAYMENT')&&PermissionService.showMenu('READ_INVOICEMAP');
        var distribute =  PermissionService.showMenu('CREATE_CREDITDISTRIBUTION')&&PermissionService.showMenu('READ_CREDITDISTRIBUTION');
        var postAdjustment =  PermissionService.showMenu('CREATE_ADJUSTMENT')&&PermissionService.showMenu('READ_ADJUSTMENT');
        var doInvoice = PermissionService.showMenu('CREATE_INVOICE');
        var statement = PermissionService.showMenu('READ_BILLMASTER');
        var edit = PermissionService.showMenu('UPDATE_CLIENT');
        var acceptTransfer = PermissionService.showMenu('ACCEPTTRANSFER_CLIENT');
        var rejectTransfer = PermissionService.showMenu('REJECTTRANSFER_CLIENT');
        var undoTransfer = PermissionService.showMenu('WITHDRAWTRANSFER_CLIENT');
>>>>>>> upstream/master
        var getDetails = function(){
        	
        	resourceFactory.clientResource.get({clientId: routeParams.id} , function(data) {
                scope.orders = [];
                    scope.client = data;
                    scope.statusActive=scope.client.status.code;
                                
                    webStorage.add("clientData", {clientId:routeParams.id,balanceAmount: data.balanceAmount, displayName: data.displayName,hwSerialNumber: data.hwSerialNumber,
                     statusActive: data.status.value, accountNo: data.accountNo, officeName: data.officeName,
                     currency: data.currency, imagePresent: data.imagePresent,phone:data.phone,email:data.email,categoryType:data.categoryType });
                    
                    scope.staffData.staffId = data.staffId;
                    if (data.imagePresent) {
                      http({
                        method:'GET',
                        url: $rootScope.hostUrl+ API_VERSION +'/clients/'+routeParams.id+'/images'
                      }).then(function(imageData) {
                        scope.image = imageData.data;
                      });
                    }
                  

                    //if (data.status.value == "Active") {
                      scope.buttons = [{
                                          name:"button.neworder",
                                          href:"#/neworder/0",
                                          icon :"icon-plus-sign",
                                          ngShow : bookOrder
                                        	 
                                        },


                                        /*{

                                      	  name:"button.eventorder",
                                      	  href:"#/eventorder",
                                      	  icon:"icon-barcode"
                                         	},*/
                                        {
                                          name:"button.newTicket",
                                          href:"#/newTicket",
                                          icon :"icon-flag",
                                          ngShow : riseTicket
                                        },
                                        
                                        /*{

                                            name:"button.payments",
                                            href:"#/payments",
                                            icon :"icon-usd",
                                            ngShow : makePayment
                                         },
                                            icon :"icon-usd"
                                         },*/
                                         {

                                             name:"button.payments",
                                             href:"#/payinvoice",
                                             icon :"icon-usd",
                                             ngShow : payInvoice
                                          },
                                         /* {

                                              name:"button.distribution",
                                              href:"#/creditDistribution",
                                              icon :"icon-usd",
                                              ngShow : distribute
                                           },
                                              icon :"icon-usd"
                                           },*/
                                          
                                         {
                                             name:"button.adjustments",
                                             href:"#/adjustments",
                                             icon :"icon-adjust",
                                             ngShow : postAdjustment
                                         },
                                         {
                                             name:"button.invoice",
                                             href:"#/clientinvoice",
                                             icon :"icon-play",
                                             ngShow : doInvoice
                                          },
                                          {
                                             name:"button.statement",
                                             href:"#/statement",
                                             icon :"icon-file",
                                             ngShow : statement
                                         },                                                                              

                                         {
	                                        name:"button.edit",
	                                        href:"#/editclient",
	                                        icon :"icon-edit",
	                                        ngShow : edit
                                        },
                                        {
                                        	name:"Close",
                                        	href:"#/closeclient",
                                        	icon:"icon-remove",
                                        	 ngShow : "true"
                                        },
                                        {
	                                          name:"",	
	                                          href:"#/viewclient",
	                                          icon :"icon-refresh",
	                                          ngShow : "true"
                                        }
                                      ]

                   

                    if (data.status.value == "Transfer in progress") {
                      scope.buttons = [{
                                        name:"button.accept.transfer",
                                        href:"#/client",
                                        subhref:"acceptclienttransfer",
                                        icon :"icon-check-sign",
                                        ngShow : acceptTransfer
                                      },
                                      {
                                        name:"button.reject.transfer",
                                        href:"#/client",
                                        subhref:"rejecttransfer",
                                        icon :"icon-remove",
                                        ngShow : rejectTransfer
                                      },
                                      {
                                        name:"button.undo.transfer",
                                        href:"#/client",
                                        subhref:"undotransfer",
                                        icon :"icon-undo",
                                        ngShow : undoTransfer
                                      }]
                    }

                    if (data.status.value == "Transfer on hold") {
                      scope.buttons = [{
                                        name:"button.undo.transfer",
                                        href:"#/client",
                                        subhref:"undotransfer",
                                        icon :"icon-undo",
                                        ngShow : undoTransfer
                                      }]
                    }
                if(PermissionService.showMenu('READ_ORDER'))
                  resourceFactory.getOrderResource.getAllOrders({clientId: routeParams.id} , function(data) {
                      scope.orders = data.clientOrders;
                  });
                  resourceFactory.EventActionResource.get({clientId: routeParams.id} , function(data) {
                      scope.scheduleorders = data;
                      
                  });
                });
        };
        getDetails();
        var Approve = function($scope,$modalInstance){
        	
			$scope.accept = function(date){
				$scope.flagapprove1 = true;
			        	scope.formData.locale = 'en';
			        	var reqDate = dateFilter(date,'dd MMMM yyyy');
			            scope.formData.dateFormat = 'dd MMMM yyyy';
			            scope.formData.systemDate=reqDate;
			            resourceFactory.clientInvoiceResource.save({'clientId': routeParams.id},scope.formData,function(data,putResponseHeaders){
			            	$modalInstance.close('delete');
			            	getDetails();
			          },function(errData){

			        		$scope.flagapprove1 = false;

			        	  $scope.error = errData.data.errors[0].userMessageGlobalisationCode;
			          });
			};
			$scope.reject = function(){
				$modalInstance.dismiss('cancel');
			};
		};
		
		  var CancelPayment = function($scope,$modalInstance,getPaymentId){
				$scope.accept = function(cancelRemark){
					$scope.flagcancelpayment=true;
					var paymentId=getPaymentId;
					scope.formData.cancelRemark=cancelRemark;
				            resourceFactory.cancelPaymentResource.update({'paymentId':paymentId},scope.formData,function(data){
				            	$modalInstance.close('delete');
				            	getDetails();

				            	scope.getAllFineTransactions();
				          },function(errData){
				        		$scope.flagcancelpayment = false;
				          });

				            
				};
				$scope.reject = function(){
					$modalInstance.dismiss('cancel');
				};
			};
			
        scope.cancelPayment=function(id){
        	$modal.open({
                templateUrl: 'cancelpayment.html',
                controller: CancelPayment,
                resolve:{
                	 getPaymentId:function(){
                 		return id;
                 	  }
                }
            });
        }
		scope.getMe = function(href,cId,subHref){
        	var url = href.replace("#","")+"/"+cId+""+(subHref==undefined?"":"/"+subHref);
        	console.log(url);
        	if(href=="#/clientinvoice"){
        		$modal.open({
                    templateUrl: 'approve1.html',
                    controller: Approve,
                    resolve:{}
                });
        	}else if(href=="#/statement"){
        		$modal.open({
                    templateUrl: 'StatementPop.html',
                    controller: StatementPopController,
                    resolve:{}
                });
        	}else if(href=="#/viewclient"){
        		route.reload();
        	}else{
        		location.path(url);
        	}
        };
        
 var StatementPopController = function($scope,$modalInstance){
        	
        	$scope.start = {};
        	
            $scope.start.date = new Date();
        	$scope.acceptStatement = function(){
        		$scope.flagStatementPop = true;
        		console.log("Accept Statement");
        		
        		
        		this.formData.locale = 'en';
   	         	var reqDate = dateFilter($scope.start.date,'dd MMMM yyyy');
   	         	this.formData.dateFormat = 'dd MMMM yyyy';
   	         	this.formData.dueDate=reqDate;
        		
        		resourceFactory.statementResource.save({'clientId': routeParams.id},this.formData,function(data) {
                    location.path('/billmaster/' +routeParams.id);
                    $modalInstance.close('delete');
                },function(errorData){
                	$scope.flagStatementPop = false;
                	$scope.stmError = errorData.data.errors[0].userMessageGlobalisationCode;
                	console.log(errorData);
                	console.log($scope.stmError);
                });
        	};
        	$scope.rejectStatement = function(){
        		console.log("Reject Statement");
        		$modalInstance.dismiss('cancel');
        	};
        };
        
        scope.deleteClient = function () {
            $modal.open({
                templateUrl: 'deleteClient.html',
                controller: ClientDeleteCtrl
            });
        };
        scope.unassignStaffCenter = function () {
            $modal.open({
                templateUrl: 'clientunassignstaff.html',
                controller: ClientUnassignCtrl
            });
        };
        var ClientDeleteCtrl = function ($scope, $modalInstance) {
            $scope.delete = function () {
                resourceFactory.clientResource.delete({clientId: routeParams.id}, {}, function(data){
                    location.path('/clients');
                });
                $modalInstance.close('delete');
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
        var ClientUnassignCtrl = function ($scope, $modalInstance) {
            $scope.unassign = function () {
                resourceFactory.clientResource.save({clientId: routeParams.id, command : 'unassignstaff'}, scope.staffData,function(data){
                    route.reload();
                });
                $modalInstance.close('unassign');
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
        scope.getClientNotes = function(){
        	if(PermissionService.showMenu('READ_CLIENTNOTE')){
        		resourceFactory.clientNotesResource.getAllNotes({clientId: routeParams.id} , function(data) {
        			scope.clientNotes = data;
        		});
        	}
        }
        scope.getClientIdentityDocuments = function () {
          resourceFactory.clientResource.getAllClientDocuments({clientId: routeParams.id, anotherresource: 'identifiers'} , function(data) {
              scope.identitydocuments = data;
              for(var i = 0; i<scope.identitydocuments.length; i++) {
                resourceFactory.clientIdentifierResource.get({clientIdentityId: scope.identitydocuments[i].id} , function(data) {
                  for(var j = 0; j<scope.identitydocuments.length; j++) {
                     if(data.length > 0 && scope.identitydocuments[j].id == data[0].parentEntityId)
                      {
                        scope.identitydocuments[j].documents = data;
                      }
                  }
                });
              }
          });
        };
//leftside orderMenu function
     /*   scope.selectedOrder = function(status){
        	if(status="ACTIVE")
        		scope.orderMenu = true;
        }*/
        
        
        scope.getClientTemplateDocuments = function() {
          resourceFactory.templateResource.get({entityId : 0, typeId : 0}, function(data) {
            scope.clientTemplateData = data;
          });
        }

        /*scope.getTransactionHistory = function () {
            resourceFactory.transactionHistoryResource.getTransactionHistory({clientId: routeParams.id} , function(data) {
              scope.transactionhistory = data;
            });
          };*/
        
        scope.getTransactionHistoryFetchFunction = function(offset, limit, callback) {
  			resourceFactory.transactionHistoryResource.getTransactionHistory({clientId: routeParams.id ,offset: offset, limit: limit} , callback);
  			};
  			
  		  scope.getClientDistributionFetchFunction = function(offset, limit, callback) {
    			resourceFactory.creditDistributionResource.get({clientId: routeParams.id ,offset: offset, limit: limit} , callback);
    			};		
          scope.getTransactionHistory = function () {
          	scope.transactionhistory = paginatorService.paginate(scope.getTransactionHistoryFetchFunction, 14);
          };
      
          scope.getClientDistribution =function(){
        		scope.clientDistribution = paginatorService.paginate(scope.getClientDistributionFetchFunction, 14);
          }
          scope.searchTransactionHistory123 = function(offset, limit, callback) {
	    	  resourceFactory.transactionHistoryResource.getTransactionHistory({ clientId: routeParams.id ,
	    		  offset: offset, limit: limit ,sqlSearch: scope.filterText } , callback); 
	          };
	  		
	  		scope.searchTransactionHistory = function(filterText) {
	  			scope.transactionhistory = paginatorService.paginate(scope.searchTransactionHistory123, 14);
	  		}; 
        
        
        
        scope.getClientTemplate = function(templateId) {
          scope.selectedTemplate = templateId;
          http({
            method:'POST',
            url: $rootScope.hostUrl+ API_VERSION +'/templates/'+templateId+'?clientId='+routeParams.id,
            data: {}
          }).then(function(data) {
            scope.template = data.data;
          });
        }

       /* resourceFactory.DataTablesResource.getAllDataTables({apptable: 'm_client'} , function(data) {
          scope.clientdatatables = data;
        });*/
        
        scope.getClientStatements = function () {
            resourceFactory.statementResource.get({clientId: routeParams.id} , function(data) {	
                   scope.states = data;
                   scope.url = mifosX.models.url;
                   scope.mail = mifosX.models.mail;
                 });
               };
               
               scope.getClientAssociation = function () {
                   resourceFactory.associationResource.get({clientId: routeParams.id} , function(data) {	
                          scope.associations = data;
                         
                        });
                      };        
               

         scope.downloadFile = function (statementId){
              window.open($rootScope.hostUrl+ API_VERSION +'/billmaster/'+statementId+'/print?tenantIdentifier=default');
         };
         
         scope.cancelScheduleOrder =function(id){
        	 resourceFactory.OrderSchedulingResource.delete({'clientId':id},{},function(data){
        		// location.path('/viewclient/' + routeParams.id);
        		 route.reload();
     	    	
             });
         }
       
         scope.getAllTickets=function(){      
               resourceFactory.ticketResource.getAll({clientId: routeParams.id},function(data) {	        
   	            scope.tickets = data;
   	            scope.clientId= routeParams.id;	  
   	        });
         };
	
	scope.financialsummeryTab = function(){
        	 scope.financialsummaryC="active";
        	 scope.invoicesC="";
        	 scope.paymentsC="";
        	 scope.adjustmentsC="";
        	 scope.financialtransactions = paginatorService.paginate(scope.getFinancialTransactionsFetchFunction, 14);
         }
         scope.invoicesTab = function(){
        	 scope.financialsummaryC="";
        	 scope.paymentsC="";
        	 scope.invoicesC="active";
        	 scope.adjustmentsC="";
        	 scope.financialInvoices = paginatorService.paginate(scope.getInvoice, 14);
         }
         scope.paymentsTab = function(){
        	 scope.financialsummaryC="";
        	 scope.invoicesC="";
        	 scope.paymentsC="active";
        	 scope.adjustmentsC="";
        	 scope.financialPayments = paginatorService.paginate(scope.getPayments, 14);
         }
         scope.adjustmentsTab = function(){
        	 scope.financialsummaryC="";
        	 scope.invoicesC="";
        	 scope.paymentsC="";
        	 scope.adjustmentsC="active";
        	 scope.financialAdjustments = paginatorService.paginate(scope.getAdjustments, 14);
         }
         scope.eventsaleTab = function(){
        	 scope.eventsaleC="active";
        	 scope.eventorderC="";
         }
         scope.eventorderCTab = function(){
        	 scope.eventsaleC="";
        	 scope.eventorderC="active";
         }
               scope.getOneTimeSale = function () {
            	   scope.eventsaleC="active";
            	   scope.eventorderC="";
            	   if(scope.displayTab == "eventOrders"){
            		   scope.eventsaleC="";
                	   scope.eventorderC="active";
            	   }
                   resourceFactory.oneTimeSaleResource.getOneTimeSale({clientId: routeParams.id} , function(data) {
                     scope.onetimesales = data.oneTimeSaleData;
                     scope.eventOrders = data.eventOrdersData;
                   });
                 };
        scope.dataTableChange = function(clientdatatable) {
          resourceFactory.DataTablesResource.getTableDetails({datatablename: clientdatatable.registeredTableName,
          entityId: routeParams.id, genericResultSet: 'true'} , function(data) {
            scope.datatabledetails = data;
            scope.datatabledetails.isData = data.data.length > 0 ? true : false;
            scope.datatabledetails.isMultirow = data.columnHeaders[0].columnName == "id" ? true : false;

            for(var i in data.columnHeaders) {
              if (scope.datatabledetails.columnHeaders[i].columnCode) {
                for (var j in scope.datatabledetails.columnHeaders[i].columnValues){
                  for(var k in data.data) {
                    if (data.data[k].row[i] == scope.datatabledetails.columnHeaders[i].columnValues[j].id) {
                      data.data[k].row[i] = scope.datatabledetails.columnHeaders[i].columnValues[j].value;
                    }
                  }
                }
              } 
            }

          });
        };

        scope.deleteAll = function (apptableName, entityId) {
          resourceFactory.DataTablesResource.delete({datatablename:apptableName, entityId:entityId, genericResultSet:'true'}, {}, function(data){
            route.reload();
          });
        };

        scope.getClientDocuments = function () {
<<<<<<< HEAD
        	
          resourceFactory.clientDocumentsResource.getAllClientDocuments({clientId: routeParams.id} , function(data) {
            scope.clientdocuments = data;      
          });      
          
          resourceFactory.creditCardSaveResource.get({clientId: routeParams.id} , function(data1) {
              scope.clientcarddetails = data1;
              for ( var i in scope.clientcarddetails) {	

                  if(scope.clientcarddetails[i].cardType=='CreditCard'){
                	  
                	    var decrypted = CryptoJS.AES.decrypt(scope.clientcarddetails[i].name, "Secret Passphrase");
                	    scope.clientcarddetails[i].name = decrypted.toString(CryptoJS.enc.Utf8);
                	    
				        var decrypted1 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].cardNumber, "Secret Passphrase");
				        scope.clientcarddetails[i].cardNumber = decrypted1.toString(CryptoJS.enc.Utf8);
				        
				        var decrypted2 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].cardExpiryDate, "Secret Passphrase");
				        scope.clientcarddetails[i].cardExpiryDate = decrypted2.toString(CryptoJS.enc.Utf8);
				        
                  }else if(scope.clientcarddetails[i].cardType=='ACH'){
                	  
                	    var decrypted = CryptoJS.AES.decrypt(scope.clientcarddetails[i].name, "Secret Passphrase");
              	        scope.clientcarddetails[i].name = decrypted.toString(CryptoJS.enc.Utf8);
              	        
				        var decrypted1 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].routingNumber, "Secret Passphrase");
				        scope.clientcarddetails[i].routingNumber = decrypted1.toString(CryptoJS.enc.Utf8);
				        
				        var decrypted2 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].bankAccountNumber, "Secret Passphrase");
				        scope.clientcarddetails[i].bankAccountNumber = decrypted2.toString(CryptoJS.enc.Utf8);
				        
				        var decrypted3 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].bankName, "Secret Passphrase");
				        scope.clientcarddetails[i].bankName = decrypted3.toString(CryptoJS.enc.Utf8);
                  }
              }
            });
=======
        	if(PermissionService.showMenu('READ_DOCUMENT')){
        		resourceFactory.clientDocumentsResource.getAllClientDocuments({clientId: routeParams.id} , function(data) {
        				scope.clientdocuments = data;
        		});
        	}
>>>>>>> upstream/master
        };

        scope.deleteDocument = function (documentId, index) {
          resourceFactory.clientDocumentsResource.delete({clientId: routeParams.id, documentId: documentId}, '', function(data) {
            scope.clientdocuments.splice(index,1);
          });
        };

        scope.downloadDocument = function(documentId,index) {
        	window.open($rootScope.hostUrl+ API_VERSION +'/clients/'+routeParams.id+'/documents/'+documentId+'?tenantIdentifier=default');
            /*resourceFactory.clientDocumentsResource.get({clientId: routeParams.id, documentId: documentId}, '', function(data) {
                scope.clientdocuments.splice(index,1);
            });*/
        };
        scope.isNotClosed = function(loanaccount) {
          if(loanaccount.status.code === "loanStatusType.closed.written.off" || 
            loanaccount.status.code === "loanStatusType.rejected") {
            return false;
          } else{
             return true;
          }
        };

        scope.isClosed = function(loanaccount) {
          if(loanaccount.status.code === "loanStatusType.closed.written.off" || 
            loanaccount.status.code === "loanStatusType.rejected") {
            return true;
          } else{
             return false;
          }
        };
        
        scope.getAllOwnHardware = function () {
            resourceFactory.HardwareResource.getAllOwnHardware({clientId: routeParams.id} , function(data) {
              scope.ownhardwares = data;
            });
            
           
        };
        
        scope.cancelSale = function(otsId,index){
        	resourceFactory.deleteOneTimeSaleResource.update({saleId: otsId} , function(data) {
        		console.log(index)
        		scope.onetimesales.splice(index, 1);
        		getDetails();
            },function(errorData){
            	
            });
        };
        scope.unallocateDevice = function(otsId,serialNo){
        	this.formData.clientId=routeParams.id;
        	this.formData.serialNo=serialNo;
        	resourceFactory.unallocateDeviceResource.update({allocationId: otsId} ,this.formData,function(data) {
        		route.reload();
            },function(errorData){
            	
            });
        }; 
       /*scope.getAllFineTransactions = function () {
              resourceFactory.FineTransactionResource.getAllFineTransactions({clientId: routeParams.id} , function(data) {
                scope.financialtransactions = data;
                
                
             });

            };*/

          scope.getFinancialTransactionsFetchFunction = function(offset, limit, callback) {
  			resourceFactory.FineTransactionResource.getAllFineTransactions({clientId: routeParams.id ,offset: offset, limit: limit} , callback);
  			};
	
  			scope.getInvoice = function(offset, limit, callback,invoice) {
  	  			resourceFactory.Filetrans.get({clientId: routeParams.id ,offset: offset, limit: limit,type:scope.invoice} , callback);
  	  		};
  			
  	  		scope.getPayments = function(offset, limit, callback,payment) {
	  			resourceFactory.Filetrans.get({clientId: routeParams.id ,offset: offset, limit: limit,type:scope.payment} , callback);
	  		};
	  		
	  		scope.getAdjustments = function(offset, limit, callback,adjustment) {
  	  			resourceFactory.Filetrans.get({clientId: routeParams.id ,offset: offset, limit: limit,type:scope.adjustment} , callback);
  	  		};
          scope.getAllFineTransactions = function () {
		  scope.financialsummaryC="active";
       	   	  scope.invoicesC="";
       	   	  scope.paymentsC="";
       	   	  scope.adjustmentsC="";
          	scope.financialtransactions = paginatorService.paginate(scope.getFinancialTransactionsFetchFunction, 14);
          };
          
          
          scope.searchFinancialTransactions123 = function(offset, limit, callback) {
	    	  resourceFactory.FineTransactionResource.getAllFineTransactions({ clientId: routeParams.id ,
	    		  offset: offset, limit: limit ,sqlSearch: scope.filterText } , callback); 
	          };
	  		
	  		scope.searchFinancialTransactions = function(filterText) {
	  			scope.financialtransactions = paginatorService.paginate(scope.searchFinancialTransactions123, 14);
	  		};  
          


        scope.saveNote = function() {   
            resourceFactory.clientResource.save({clientId: routeParams.id, anotherresource: 'notes'}, this.formData , function(data){
            var today = new Date();
            temp = { id: data.resourceId , note : scope.formData.note , createdByUsername : "test" , createdOn : today } ;
            scope.clientNotes.push(temp);
            scope.formData.note = "";
            scope.predicate = '-id';
          });
        }

        scope.deleteClientIdentifierDocument = function (clientId, entityId, index){
          resourceFactory.clientIdenfierResource.delete({clientId: clientId, id: entityId}, '', function(data) {
            scope.identitydocuments.splice(index,1);
          });
        };

        scope.downloadClientIdentifierDocument=function (identifierId, documentId){
          console.log(identifierId,documentId);
        };

		// *********************** InVenture controller ***********************
        scope.fetchInventureScore = function(){
          // dummy data for the graph - DEBUG purpose
          var inventureScore = getRandomInt(450,800);
          var natAverage = getRandomInt(450,800);
          var industryAverage = getRandomInt(450,800);
          var inventureMinScore = 300;
          var inventureMaxScore = 850;

          // dummy data for inventure loan recommendation - DEBUG purpose
          scope.inventureAgricultureLimit = '21,000';
          scope.inventureFishermenLimit = '27,500';
          scope.inventureHousingLimit = '385,000';
          scope.inventureBusinessLimit = '10,000';

          // this part is used to generate data to see the look of the graph
          function getRandomInt (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          }

          // CHART1 - comparison chart control
          var comparisonData = [
            {
              key: "Score Comparison",
                values: [
                  { 
                    "label" : "National Average",
                    "value" : (natAverage)
                  }, 
                  { 
                    "label" : "Agriculture Average", 
                    "value" : (industryAverage)
                  }, 
                  { 
                    "label" : "This Client", 
                    "value" : (inventureScore)
                  }
                ]
              }
            ];

          // add the comparison chart to the viewclient.html
          nv.addGraph(function() {
            var comparisonChart = nv.models.discreteBarChart()
              .x(function(d) { return d.label })
              .y(function(d) { return d.value })
              .staggerLabels(true)
              .tooltips(true)
              .showValues(true);
                
            // set all display value to integer
            comparisonChart.yAxis.tickFormat(d3.format('d'));
            comparisonChart.valueFormat(d3.format('d'));
            comparisonChart.forceY([inventureMinScore, inventureMaxScore]);

            d3.select('#inventureBarChart svg')
              .datum(comparisonData)
              .transition().duration(1500)
              .call(comparisonChart);

            nv.utils.windowResize(comparisonChart.update);
            return comparisonChart;
          });

          // CHART2 - inventure score bullet chart control
          nv.addGraph(function() {  
            var bullet = nv.models.bulletChart()
              .tooltips(false);

            d3.select('#inventureBulletChart svg')
              .datum(scoreData())
              .transition().duration(1500)
              .call(bullet);

            nv.utils.windowResize(bullet.update);
            return bullet;
          });

          function scoreData() {
            return {
              "title": "",
              "ranges": [(inventureMinScore - 300), (inventureMaxScore - 300)],
              "measures": [(inventureScore - 300)],
              "markers": [(inventureScore - 300)]};	
          }

          // this will be used to display the score on the viewclient.html
          scope.inventureScore = inventureScore;
        };
    }
  });
  mifosX.ng.application.controller('ViewClientController', ['$scope','webStorage', '$routeParams', '$route', '$location', 'ResourceFactory', 'PaginatorService','$http','$modal','dateFilter','API_VERSION','$rootScope','PermissionService', mifosX.controllers.ViewClientController]).run(function($log) {
    $log.info("ViewClientController initialized");
  });
}(mifosX.controllers || {}));
