import { View ,Text} from "@tarojs/components";
import Taro from "@tarojs/taro";
import React,{ Component } from "react";
import { AtCard, AtList, AtListItem } from "taro-ui";
import './index.scss'

export default class DescribeOrder extends Component<any,any>{

    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }

    $instance = Taro.getCurrentInstance()

    async componentWillMount () {
        const {id} = this.$instance.router.params
        console.log(id)
        try {
            const res =  await Taro.request({
                url:`http://127.0.0.1:7001/order/${id}`
            })
            if(res.statusCode<=299){
                this.setState({
                    data:res.data
                })
            }
    
        } catch (error) {
            throw error
        }
       
      }

    render(): React.ReactNode {
        return (
            <View>
                <View className="info-card">
                    <AtCard className="info-card" title="个人信息">
                        <AtList>
                            <View className="info-flex ">
                                <AtListItem className="info-head" title='姓名' />
                                <View className="info-text">{this.state.data.username}</View>
                            </View>
                            <View className="info-flex ">
                                <AtListItem className="info-head" title='生日' />
                                <Text>{this.state.data.birthday}</Text>
                            </View>
                            <View className="info-flex ">
                                <AtListItem className="info-head" title='手机号码' />
                                <Text>{this.state.data.order_phone}</Text>
                            </View>
                            <View className="info-flex ">
                                <AtListItem className="info-head" title='性别' />
                                <Text>{this.state.data.sex}</Text>
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
                                <View className="info-text">{this.state.data.Booking_place}</View>
                            </View>
                            <View className="info-flex ">
                                <AtListItem className="info-head" title='预约时间' />
                                <Text>{this.state.Predate} {this.state.data.booking_time}</Text>
                            </View>
                            <View className="info-flex ">
                                <AtListItem className="info-head" title='预约项目' />
                                <Text>{this.state.data.Drug_name}</Text>
                            </View>
                        
                        </AtList>
                    
                    </AtCard>
                </View>
            </View>
        )
    }
}