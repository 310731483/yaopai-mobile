import Reflux from 'reflux'
import HttpFactory from '../HttpFactory'
import API from '../api'

var ActivityActions = Reflux.createActions({
  'get' : {children:['success','failed']},
  'search':{children : ['success','failed']}
})

ActivityActions.search.listen(function(pageIndex = 1 ,pageSize = 10){
  var data = {
    PageIndex:pageIndex,
    PageSize:pageSize,
    Fields : 'Id,Cover,Link'
  }
  HttpFactory.post(API.ACTIVITY.search,data,this.success,this.failed)
})

ActivityActions.get.listen(function(Id){
  var data ={
    Id: Id,
    Fields : 'Id,Title,Cover,Content'
  }
  HttpFactory.post(API.ACTIVITY.get,data,this.success,this.failed)
})

export {ActivityActions as default}