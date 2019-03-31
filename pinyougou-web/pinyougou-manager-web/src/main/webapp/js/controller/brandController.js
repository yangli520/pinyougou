/*添加控制器*/
app.controller("brandController",function ($scope,$controller,baseService) {
    /** 指定继承baseController */
    $controller("baseController",{$scope:$scope});
    /*读取列表数据绑定到表格中*/
    $scope.findAll=function () {
        $http.get("/brand/findAll").then(function (response) {
            $scope.dataList=response.data;
        });
    };

    /*添加或者修改品牌*/
    $scope.addOrUpdate=function () {
        /*定义请求URL*/
        var url="save";//添加品牌
        if($scope.entity.id){
            url="update";//修改品牌
        }
        /*发送post请求*/
        baseService.sendPost("/brand/"+url,$scope.entity).then(function (response) {
            if(response.data){
                /*重新加载品牌数据*/
                $scope.reload();
            }else{
                alert("操作失败!");
            }
        });
    };

    /*为修改按钮绑定点击事件*/
    $scope.show=function (entity) {
        //把entity中的json对象转化成一个新的json对象
        $scope.entity=JSON.parse(JSON.stringify(entity));
    };

/*    /!*定义初始化指令需要的配置信息对象*!/
    $scope.paginationConf={
        currentPage: 1,//当前页码
        totalItems: 0,//总记录数(必须指定)
        itemsPerpage:10,//页大小
        perPageOptions:[10,15,20,25,30],//页面下拉列表框
        onChange:function () {	//页面发生改变会调用的函数
            $scope.reload();

        }
    };*/
/*    /!*重新加载数据*!/
    $scope.reload=function () {
        /!** 切换页码  *!/
        $scope.search($scope.paginationConf.currentPage,
            $scope.paginationConf.itemsPerPage);

    };*/


    /*分页多条件查询品牌*/
    /*定义查询条件对象*/
    $scope.searchEntity={};
    $scope.search=function (page,rows) {
        //发送异步请求
        baseService.findByPage("/brand/findByPage",page,rows,$scope.searchEntity)
            .then(function (response) {
            $scope.dataList=response.data.rows;
            $scope.paginationConf.totalItems=response.data.total;
        });
    };

/*    /!*定义选中的ids数组*!/
    $scope.ids= [];
    /!*为复选框绑定点击事件*!/
    $scope.updateSelection=function ($event,id) {
        /!*如果被选中,就增加到数组*!/
        if($event.target.checked){
            $scope.ids.push(id);
        }else{
            var index=$scope.ids.indexOf(id);
            $scope.ids.splice(index,1);
        }
    };*/

    /*批量删除*/
    $scope.delete= function () {
        if($scope.ids.length > 0){
            /*发送异步请求*/
            baseService.deleteById("/brand/delete",$scope.ids).then(function (response) {
                    if(response.data){
                        /*重新加载品牌数据*/
                        $scope.reload();
                    }
                }
            );
        }else{
            alert("请选择你要删除的品牌");
        }
    };
});