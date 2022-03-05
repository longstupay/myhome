import { View ,Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { AtButton, AtSteps, AtCard,AtFloatLayout} from 'taro-ui'
import "./index.scss"
interface Istate {
    id:number;
    current:number;
    selectList:TimeList[]
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

    render(): React.ReactNode {
        const items:any = [
            { 'title': '步骤一', 'status':'success','desc': '选择接种日期' },
            { 'title': '步骤二', 'desc': '选择接种场次' },
            { 'title': '步骤三', 'desc': '填写预约信息' }
          ]

          const errItems:any = [
            { 'title': '步骤一', 'status':'error','desc': '选择接种日期' },
            { 'title': '步骤二', 'desc': '选择接种场次' },
            { 'title': '步骤三', 'desc': '填写预约信息' }
          ]
        return (
            <View>
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

                <AtCard
                    note='小Tips'
                    extra='额外信息'
                    title='这是个标题'
                    thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
                    >
                    这也是内容区 可以随意定义功能
                </AtCard>

                <AtFloatLayout isOpened title="预约场次：" onClose={this.handleClose.bind(this)}>
                    
                    {this.state.selectList.map((items,index)=>(
                        <View key={index} className="at-row myflex">
                            <View>{items.times}(可预约:)<Text className="text">{items.total}</Text>剂</View>
                            <AtButton  onClick={this.selectTime.bind(this,items)} className="btn" size="small" type="primary">预约</AtButton>
                        </View>
                    ))}
                </AtFloatLayout>
              
                
            </View>
            
        )
    }
}