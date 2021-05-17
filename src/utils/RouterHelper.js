import routers from '@/router/index'
export class RouterHelper{
  constructor() {

  }

  getRouters(){
    return routers.getRoutes().filter(router=>!!router.path).map(item=>{
      return{
        path:item.path,
        name:item.name,
        props:item.props
      }
    })
  }

  getRouterMapper(){
    return{
      'scriptGen':{name:'脚本生成',icon:''}
    }
  }
}
