(function(module) {
  mifosX.controllers = _.extend(module, {
    DataTableController: function(scope, resourceFactory,location,PermissionService) {
    	scope.PermissionService = PermissionService;
        resourceFactory.DataTablesResource.getAllDataTables(function(data) {
            scope.datatables = data;
        });
        scope.routeTo = function(tablename){
        			location.path('/viewdatatable/'+ tablename);
          };

    }
  });
  mifosX.ng.application.controller('DataTableController', ['$scope', 'ResourceFactory','$location','PermissionService', mifosX.controllers.DataTableController]).run(function($log) {
    $log.info("DataTableController initialized");
  });
}(mifosX.controllers || {}));
