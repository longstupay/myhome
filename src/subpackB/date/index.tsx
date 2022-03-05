import { View,Text,PickerView, PickerViewColumn } from "@tarojs/components";
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

}


export default class SelectDate extends React.Component<any,Istate> {

    constructor(props:any){
        super(props)
         
        const hours = ['08','09','10','11','15','16','17','18']
        const min = ['00','30']

        this.state = {
            id:'',
            date:"",
            total:0,
            current:0,
            canNext:false,
            isShow:false,
            hours,
            min,
            pickViewVal:[1,1]
        }
    }

    $instance = Taro.getCurrentInstance()

    componentDidMount () {
        // 获取路由参数
        const {id} =this.$instance.router.params// 输出 { id: 2, type: 'test' }
        console.log(id)
        this.setState({
            id:id
        })
    }

    getDate = (item:{ value: string })=>{
        console.log(item.value)
        this.setState({
            date:item.value,
            total:25,
            canNext:true
        })
    }

    onChange (current) {
        this.setState({
            current:1
        })
    }

    nav2Time =()=>{
        const {id,current} = this.state;
        if(current==0){
            this.setState({
                isShow:true,
                current:current+1
            })
        }
        
        // Taro.navigateTo({
        //     url:`/subpackC/time/index?id=${id}&current=${current}`
        // })
    }

    handleClose(){
       
    }

    onPickChange=(v)=>{
        console.log(v)
    }
   
  

    render(): React.ReactNode {
        const items = [
            { 'title': '步骤一', 'desc': '选择接种日期' },
            { 'title': '步骤二', 'desc': '选择接种场次' },
            { 'title': '步骤三', 'desc': '填写预约信息' }
          ]
      
        return (
            
            <View>
                <AtCalendar
                    onDayClick = {(item:{ value: string })=>this.getDate(item)}
                    isVertical
                    validDates={ [ { value: '2022/03/04' },{ value: '2022/03/05' },{ value: '2022/03/06' },{ value: '2022/03/07' },{ value: '2022/03/08' },{ value: '2022/03/09' } ] }
                />
                <View>

                <AtSteps
                    customStyle={"margin:8px 8px;"}
                    items={items}
                    current={this.state.current}
                    onChange={this.onChange}
                />

                <AtCard
                    note='当前选择日期'
                    title={this.state.total?`当前可预约${this.state.total}`:""}
                    thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
                >
                    <Text>{this.state.date?this.state.date:'请先选择日期'}</Text>
                </AtCard>
                {this.state.canNext?
                <AtButton onClick={this.nav2Time} customStyle={"margin-top:25px;width:78%;"} type="primary">下一步</AtButton>:
                <AtButton customStyle={"margin-top:25px;width:78%;"} disabled type='secondary'>下一步</AtButton>
                }
                
                <AtFloatLayout isOpened={this.state.isShow}  onClose={this.handleClose.bind(this)}>
                    <PickerView indicatorStyle='height: 50px;' 
                        style='width: 100%; height: 300px;'
                        value={this.state.pickViewVal}
                        onChange={(v)=>this.onPickChange(v)}>
                        <PickerViewColumn className="text-center">
                            {this.state.hours.map(items => (
                                <View>{items}时</View>
                            ))}
                        </PickerViewColumn>
                       
                        <PickerViewColumn className="text-center">
                            {this.state.min.map(item=>(
                                <View>{item}分</View>
                            ))}
                        </PickerViewColumn>
                    </PickerView>
                </AtFloatLayout>
                </View>
            </View>
        )
    }
}