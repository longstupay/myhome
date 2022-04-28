import { View,Text,PickerView, PickerViewColumn, BaseEventOrig, PickerViewProps } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React from "react";
import { AtButton, AtCalendar, AtCard ,AtSteps, AtFloatLayout,  AtList, AtListItem } from "taro-ui"

import "./index.scss"

interface Istate {
    id:string;
    date:string;
    total:number;
    current:number;
    canNext:boolean;
    isShow:boolean;
    pickViewVal:number[];
    hours:string[];
    min:string[];
    time:string; //选择后的时间 hours+min
    serverTime:string[]; //从服务器获取的销售时间

}


export default class SelectDate extends React.Component<any,Istate> {

    constructor(props:any){
        super(props)
         
        const hours = ['08','09','10','11','15','16','17','18']
        const min = ['45','30','15','00']

        this.state = {
            id:'',
            date:"",
            total:0,
            current:0,
            canNext:false,
            isShow:false,
            hours,
            min,
            pickViewVal:[1,1],
            time:"",
            serverTime:[]
        }
    }

    $instance = Taro.getCurrentInstance()

    async componentDidMount () {
        // 获取路由参数
        console.log(this.$instance.router.params)
        const {total} = this.$instance.router.params
        this.setState({
            total:+total
        })
        // const {id} =this.$instance.router.params// 输出 { id: 2, type: 'test' }
        // console.log(id)
        // this.setState({
        //     id:id
        // })
        
        //获取列表数据
        try {
            const time =  await Taro.request({
                url:"http://127.0.0.1:7001/time",
                method:"GET"
            })
            if(time.statusCode<=299){
            //    console.log(time.data.time)
                this.setState({
                    serverTime:time.data.time
                },()=>{
                    console.log(this.state.serverTime)
                })
            }
        } catch (error) {
            throw error
        }
    }

    getDate = (item:{ value: string })=>{
        console.log(item.value)
        this.setState({
            date:item.value,
            canNext:true
        })
    }



    onStepChange =()=>{}

    nav2Time =()=>{
        const {current,time,date} = this.state;
        const {name,drug_id,local} = this.$instance.router.params
        console.log(time)
        if(current==0){
            this.setState({
                isShow:true,
                // current:1
            })
        }
        if(current==1){
            Taro.navigateTo({
                 url:`/subpackC/time/index?drug_id=${drug_id}&current=${current}&name=${name}&local=${local}&date=${date}&time=${time}`
            })
        }
        
        
    }

    handleClose(){
       
    }

    onPickChange=(v: BaseEventOrig<PickerViewProps.onChangeEventDetail>)=>{
        const arr = v.detail.value
        const time = this.state.hours[arr[0]] +":"+this.state.min[arr[1]]
        this.setState({
            pickViewVal:arr,
            time,
            current:1
        })
    }
   
  

    render(): React.ReactNode {
        const items = [
            { 'title': '步骤一', 'desc': '选择接种日期' },
            { 'title': '步骤二', 'desc': '选择接种场次' },
            { 'title': '步骤三', 'desc': '填写预约信息' }
          ]
        const {serverTime} = this.state;
        const timeObj = serverTime.map((item)=>{
            return {
                value:item
            }
        })
        console.log(timeObj)
        const data =timeObj || [ { value: '2022/04/30' } ]
        return (
            
            <View>
                <AtCalendar
                    onDayClick = {(item:{ value: string })=>this.getDate(item)}
                    isVertical
                    validDates={data}
                />
                <View>

                <AtSteps
                    customStyle={"margin:8px 8px;"}
                    items={items}
                    current={this.state.current}
                    onChange={this.onStepChange}
                />

                <AtCard
                    note='当前选择日期'
                    title={this.state.total?`当前可预约${this.state.total}`:"药品已售罄"}
                    thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
                >
                    <Text>{this.state.date?this.state.date:'请先选择日期'}
                    &nbsp;&nbsp;&nbsp;
                            {this.state.time?this.state.time:""}</Text>
                </AtCard>
                {this.state.canNext && this.state.total?
                <AtButton onClick={this.nav2Time} customStyle={"margin-top:25px;width:78%;"} type="primary">下一步</AtButton>:
                <AtButton customStyle={"margin-top:25px;width:78%;"} disabled type='secondary'>下一步</AtButton>
                }
                
                <AtFloatLayout isOpened={this.state.isShow}  onClose={this.handleClose.bind(this)}>
                    <PickerView indicatorStyle='height: 50px;' 
                        style='width: 100%; height: 300px;'
                        value={this.state.pickViewVal}
                        onChange={(v)=>this.onPickChange(v)}>
                        <PickerViewColumn className="text-center">
                            {this.state.hours.map((items,index) => (
                                <View key={index}>{items}时</View>
                            ))}
                        </PickerViewColumn>
                       
                        <PickerViewColumn className="text-center">
                            {this.state.min.map((item,index)=>(
                                <View key={index+'min'}>{item}分</View>
                            ))}
                        </PickerViewColumn>
                    </PickerView>
                </AtFloatLayout>
                </View>
            </View>
        )
    }
}