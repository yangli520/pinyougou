/*商家审核*/
app.controller("sellerController",function ($scope,$controller,baseService) {

    $controller("baseController",{$scope:$scope});

    /**查询条件对象*/
    $scope.searchEntity={status:"0"};
    /**多条件分页查询*/
    $scope.search=function (page,rows) {
      baseService.findByPage("/seller/findByPage",page,rows,$scope.searchEntity).then(function (response) {
          $scope.dataList=response.data.rows;
          $scope.paginationConf.totalItems=response.data.total;
      });
    };

    /**修改商家状态*/
    $scope.updateStatus=function (sellerId,status) {
      baseService.sendGet("/seller/updateStatus?sellerId="+sellerId +"&status="+status)
          .then(function (response) {
              if(response.data){
                  /**重新加载*/
                  $scope.reload();
              }else{
                  alert("修改失败");
              }
          });
    };
    /**显示修改*/
    $scope.show=function (entity) {
        /*把json对象转化成一个新的json对象*/
        $scope.entity=JSON.parse(JSON.stringify(entity));
    };
});