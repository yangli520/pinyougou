/*定义控制层*/
app.controller("specificationController",function ($scope,$controller,baseService) {
    /*指定继承baseController*/
    $controller("baseController",{$scope:$scope});

    /*查询条件对象*/
    $scope.searchEntity={};
    /*分页查询(查询条件)*/
    $scope.search=function (page,rows) {
        baseService.findByPage("/specification/findByPage",page,rows,$scope.searchEntity)
            .then(function (response) {
                $scope.dataList=response.data.rows;
                /*更新分页总记录数*/
                $scope.paginationConf.totalItems=response.data.total;
            });
    };

    /*添加或修改*/
    $scope.saveOrUpdate=function () {
      var url="save";
      if($scope.entity.id){
          url="update";
      }
      /*发送post请求*/
      baseService.sendPost("/specification/"+url,$scope.entity).then(function (response) {
          if(response.data){
              $scope.reload();
          }else{
              alert("操作失败!");
          }
      });
    };

    /*新增规格选项行*/
    $scope.addTableRow=function () {
        $scope.entity.specificationOptions.push({});
    };
    /*删除规格选项行*/
    $scope.deleteTableRow=function (index) {
        $scope.entity.specificationOptions.splice(index,1);
    };


});