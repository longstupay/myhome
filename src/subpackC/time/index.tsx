import { View ,Text, Button } from "@tarojs/components";
import Taro, { eventCenter } from "@tarojs/taro";
import React, { Component } from "react";
import { AtButton, AtSteps,AtNoticebar,AtCard ,AtList, AtListItem, AtForm, AtToast} from 'taro-ui'
import {getUserInfo} from "../../module"

import "./index.scss"
interface Istate {
    drug_id:number;
    current:number;
    name:string;
    local:string;   //预约地点
    Predate:string; //预约时间
    time:string;
    username:string; 
    birthday:string;
    phone_number:string;
    sex:string;
    user_uid:number;
    isNullInfo:boolean
}

type UserInfo = {
    birthday:string, //生日
    id_card:string,  //证件类型
    idtype:string,
    loginphone:string,
    phone_number:string,
    sex:string,
    user_uid:number,
    username:string,
    
}

interface Routerparams {
    drug_id:string;
    current:string;
    $taroTimestamp:any;
    name:string;
    local:string;
    date:string;
    time:string;
}

interface TimeList {
    uid:number;
    times:string;
    total:number;
}

export default class selectTime extends Component<any,Istate> {

    constructor(props:any) {
        super(props)
        this.state = {
            drug_id:1,
            current:null,
            name:"",
            local:"",
            Predate:"",
            time:"",
            username:'',
            birthday:'',
            phone_number:'',
            sex:'',
            user_uid:null,
            isNullInfo:false
        }
    }

    $instance:Routerparams = Taro.getCurrentInstance().router.params as unknown as Routerparams

    $pageinstance = Taro.getCurrentInstance()

    componentWillMount () {
        const onShowEventId = this.$pageinstance.router.onShow
        // 监听
        eventCenter.on(onShowEventId, this.onShow)
    }

    componentWillUnmount () {
        const onShowEventId = this.$pageinstance.router.onShow
        // 卸载
        eventCenter.off(onShowEventId, this.onShow)
    }

     onShow = async () => {
        console.log('onShow--页面显示')
        const info = await getUserInfo()
      console.log(info)
      if(info.code){
        this.setState({
            isNullInfo: true
        })
        let t = setTimeout(() => {
            Taro.switchTab({
                url: '/pages/user/index'
            })
        }, 2000);
      }else{
          info as UserInfo
          const { username, birthday, phone_number, sex, user_uid } = info
          //获取用户信息
          this.setState({
              username,
              birthday,
              phone_number,
              sex,
              user_uid
          })
      }
    }


    async componentDidMount () {
      // 获取路由参数
      console.log(this.$instance)
      const {drug_id,current,name,date,local,time} = this.$instance;
      const info = await getUserInfo()
      console.log(info)
      if(info.code){
        this.setState({
            isNullInfo: true
        })
        let t = setTimeout(() => {
            Taro.switchTab({
                url: '/pages/user/index'
            })
        }, 2000);
      }else{
          info as UserInfo
          const { username, birthday, phone_number, sex, user_uid } = info
          //获取用户信息
          this.setState({
            drug_id: +drug_id,
              current: (+current) + 1,
              name: name,//预约项目
              Predate: date,
              local: local,
              time: time,
              username,
              birthday,
              phone_number,
              sex,
              user_uid

          })
      }
      
    }

    onChange(){

    }

    nav2Home(){

    }
    handleClose(){

    }

    selectTime (item:any){
        console.log(item)
    }

    infoConfirm= async()=>{
        console.log(this.state)
        const {Predate,birthday,drug_id,local,name,phone_number,sex,time,user_uid,username} =this.state
        try {
            const order =  await Taro.request({
                url:"http://127.0.0.1:7001/order",
                method:"POST",
                data:{
                    "username": username,
                    "birthday": birthday,
                    "order_phone": phone_number,
                    "sex": sex,
                    "drug_id": drug_id,
                    "Drug_name": name,
                    "Booking_place": local,
                    "booking_time": Predate+" "+time,
                    "userId": user_uid
                }
            })
            if(order.statusCode<=299){
                console.log('跳转到订单页')
                Taro.reLaunch({
                    url: '/subpack/order/index'
                })
            }
        } catch (error) {
            throw error
        }
    }

    nav2edit = ()=>{
        const {user_uid} = this.state
        Taro.navigateTo({
            url:`/pages/user/index?${user_uid}&update=true`,
        })
    }
    

    render(): React.ReactNode {
        const items:any = [
            { 'title': '步骤一', 'status':'success','desc': '选择接种日期' },
            { 'title': '步骤二', 'status':'success','desc': '选择接种场次' },
            { 'title': '步骤三', 'desc': '填写预约信息' }
          ]

          const errItems:any = [
            { 'title': '步骤一', 'status':'error','desc': '选择接种日期' },
            { 'title': '步骤二', 'status':'error','desc': '选择接种场次' },
            { 'title': '步骤三', 'desc': '填写预约信息' }
          ]
        return (
            <View>
                <AtToast isOpened={this.state.isNullInfo} status="error" text="请先修改填写用户信息" icon="{icon}"></AtToast>
                <AtNoticebar close icon='volume-plus'>
                温馨提示：您提交后可以去(我的-预约信息)查看是否预约成功
                </AtNoticebar>

                {
                this.state.current?
                <AtSteps
                    items={items}
                    current={this.state.current}
                    onChange={this.onChange.bind(this)}
                />:
                <View>
                    <AtSteps
                    items={errItems}
                    current={this.state.current}
                    onChange={this.onChange.bind(this)}
                    />
                </View>
                
                }

                <View className="info-card">
                    <AtCard className="info-card" title="个人信息">
                        <AtList>
                            <View onClick={this.nav2edit} className="no-flex">修改</View>
                            <View className="info-flex ">
                                <AtListItem className="info-head" title='姓名' />
                                <View className="info-text">{this.state.username}</View>
                            </View>
                            <View className="info-flex ">
                                <AtListItem className="info-head" title='生日' />
                                <Text>{this.state.birthday}</Text>
                            </View>
                            <View className="info-flex ">
                                <AtListItem className="info-head" title='手机号码' />
                                <Text>{this.state.phone_number}</Text>
                            </View>
                            <View className="info-flex ">
                                <AtListItem className="info-head" title='性别' />
                                <Text>{this.state.sex}</Text>
                            </View>
                        
                        </AtList>
                    </AtCard>
                </View>
                
                <View className="info-card">
                    <AtCard
                        title='预约信息'
                        >
                        <AtList>
                            
                            <View className="info-flex ">
                                <AtListItem className="info-head" title='预约地点' />
                                <View className="info-text">{this.state.local}</View>
                            </View>
                            <View className="info-flex ">
                                <AtListItem className="info-head" title='预约时间' />
                                <Text>{this.state.Predate} {this.state.time}</Text>
                            </View>
                            <View className="info-flex ">
                                <AtListItem className="info-head" title='预约项目' />
                                <Text>{this.state.name}</Text>
                            </View>
                        
                        </AtList>
                    
                    </AtCard>
                </View>
                
                <AtButton circle customStyle={"margin-top:16px;width:68%"} type="primary" onClick={this.infoConfirm}>确定预约</AtButton>
         
                
            </View>
            
        )
    }
}