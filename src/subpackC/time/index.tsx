import { View ,Text, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { AtButton, AtSteps,AtNoticebar,AtCard ,AtList, AtListItem, AtForm} from 'taro-ui'
import "./index.scss"
interface Istate {
    id:number;
    current:number;
    selectList:TimeList[];
    
}


interface Routerparams {
    id:string;
    current:string;
    $taroTimestamp:any;
    
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
            id:1,
            current:null,
            selectList:[{uid:1,times:"08:00-09:00",total:15}]
        }
    }

    $instance:Routerparams = Taro.getCurrentInstance().router.params as unknown as Routerparams

    componentDidMount () {
      // 获取路由参数
      const {id,current} = this.$instance;
      const list = [
        {uid:1,times:"08:00-09:00",total:15},
        {uid:1,times:"09:00-10:00",total:20},
        {uid:1,times:"10:00-11:00",total:25},
        {uid:1,times:"11:00-12:00",total:26},
        {uid:1,times:"15:00-16:00",total:40},
        {uid:1,times:"16:00-17:00",total:122},
        ]
      this.setState({
            id:+id,
            current:(+current)+1,
            selectList:list
      })
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

    infoConfirm= ()=>{

    }

    nav2edit = ()=>{
        const {id} = this.state
        Taro.navigateTo({
            url:`/pages/user/index?${id}&update=true`,
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
                                <View className="info-text">王昭君</View>
                            </View>
                            <View className="info-flex ">
                                <AtListItem className="info-head" title='生日' />
                                <Text>1998-12-07</Text>
                            </View>
                            <View className="info-flex ">
                                <AtListItem className="info-head" title='手机号码' />
                                <Text>15676197507</Text>
                            </View>
                            <View className="info-flex ">
                                <AtListItem className="info-head" title='性别' />
                                <Text>男</Text>
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
                                <View className="info-text">南宁市兴宁虎邱社区卫生服务站</View>
                            </View>
                            <View className="info-flex ">
                                <AtListItem className="info-head" title='预约时间' />
                                <Text>2022-03-11 16:30</Text>
                            </View>
                            <View className="info-flex ">
                                <AtListItem className="info-head" title='预约项目' />
                                <Text>二价人乳头瘤病毒疫苗(大肠杆菌)</Text>
                            </View>
                        
                        </AtList>
                    
                    </AtCard>
                </View>
                
                <AtButton circle customStyle={"margin-top:16px;width:68%"} type="primary" onClick={this.infoConfirm}>确定预约</AtButton>
         

                {/* <AtFloatLayout isOpened title="预约场次：" onClose={this.handleClose.bind(this)}>
                    
                    {this.state.selectList.map((items,index)=>(
                        <View key={index} className="at-row myflex">
                            <View>{items.times}(可预约:)<Text className="text">{items.total}</Text>剂</View>
                            <AtButton  onClick={this.selectTime.bind(this,items)} className="btn" size="small" type="primary">预约</AtButton>
                        </View>
                    ))}
                </AtFloatLayout> */}
              
                
            </View>
            
        )
    }
}