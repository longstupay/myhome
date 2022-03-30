import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React,{ Component } from "react";
import { AtCard } from "taro-ui";
import './index.scss'


type myorder = {
    order_uid:number
    username: string
    birthday: string
    order_phone: string
    sex: string
    drug_id: number
    Drug_name: string
    Booking_place: string
    booking_time: string
    userId: number
}

type listState = {
    orderlist:myorder[]
}



export default class OrderList extends Component<any,listState>{

    constructor(props){
        super(props)
        this.state={
            orderlist:[]
        }
    }
 

    onShareAppMessage (res) {
        if (res.from === 'button') {
          // 来自页面内转发按钮
          console.log(res.target)
        }
        return {
          title: '自定义转发标题',
          path: '/subpack/index'
        }
      }

    //获取用户信息
    getUserInfo =async ()=>{
        //查询缓存的手机号
        try {
            var value = Taro.getStorageSync('phone')
            // console.log(value)
            if (value) {
                //根据token向服务端身份验证
                const res = await Taro.request({
                    url: "http://127.0.0.1:7001/passport/jwt",
                    method: "POST",
                    header: {
                        Authorization: 'Bearer ' + value
                    }
                })
                console.log(res)
                //服务端查不到token
                if (res.statusCode >= 400) {
                    return {
                        code: res.statusCode
                    }
                }
                console.log(res.data.phone)
                //根据登录手机查询信息
                const info = await Taro.request({
                    url: "http://127.0.0.1:7001/user/phone/" + res.data.phone
                })
                if (info.statusCode >= 400) {
                    return {
                        code: info.statusCode
                    }
                }
                // console.log(info)
                return info.data
    
            }else{
                console.log('未登录');
                return {
                    code:404
                }
            }
          } catch (e) {
            // Do something when catch error
            throw e
          }
    }

    async componentDidMount() {
        try {
            
            const res = await this.getUserInfo();
            // console.log('获取用户信息',res)
            const {user_uid} = res
            const order = await Taro.request({
                url:`http://127.0.0.1:7001/user/order/${user_uid}`

            })
            if(order.statusCode<299){
                const lsit =  order.data.order as myorder[]
                console.log(lsit)
                this.setState({
                    orderlist:lsit.reverse()
                })
            }
        } catch (e) {
            throw e
        }
        
    }

    nav2des=(id)=>{
        console.log(id)
        Taro.navigateTo({
            url: `/subpack/des/index?id=${id}`,
          })
    }

    render(): React.ReactNode {
        return (
            <View>
             {
                 this.state.orderlist.map((item,index)=>(
                     <View key={index}  className="card-item"  onClick={()=>this.nav2des(item.order_uid)}>
                        <AtCard
                            note={item.booking_time}
                            extra='预约成功'
                            title={item.Drug_name}
                            thumb='https://web-1306059885.cos.ap-guangzhou.myqcloud.com/pic/pic-5.png'
                            >
                            <View>{item.Booking_place}</View>
                        </AtCard>
                    </View>
                 ))
             }
            </View>
        )
    }
}