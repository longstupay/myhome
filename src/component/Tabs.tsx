import React from 'react'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'

import "taro-ui/dist/style/components/tabs.scss";

//custom com
import {MyList} from "./List"


interface Istate {
    current:number
}

class MyTabs extends React.Component<any,Istate> {

    constructor(props:any) {
        super(props)
        this.state = {
            current:0
        }
    }

    handleClick = (index:number)=>{
        this.setState({
            current:index
        })
    }

    render() {
        return (
            <View>
                <AtTabs
                    current={this.state.current}
                    scroll
                    tabList={[
                        { title: '全部' },
                        { title: 'HPV疫苗' },
                        { title: '轮状疫苗' },
                        { title: '狂犬病疫苗' },
                        { title: '流感疫苗' },
                        { title: '乙肝疫苗' }
                    ]}
                    onClick={(index)=>{this.handleClick(index)}}>
                    <AtTabsPane current={this.state.current} index={0}>
                        <MyList  defualtProps={
                            [
                                {
                                    name:'南宁市西乡塘卫生院',
                                    phone:'0771-23264'
                                },
                                {
                                    name:'南宁市青秀区七星社区卫生服务中心',
                                    phone:'0771-2842899'
                                },
                                {
                                    name:'南宁市青秀区南湖社区卫生服务中心',
                                    phone:'0771-5501022'
                                },
                                {
                                    name:'南宁市西乡塘卫生院',
                                    phone:'0771-23264'
                                },
                                {
                                    name:'南宁市青秀区七星社区卫生服务中心',
                                    phone:'0771-2842899'
                                },
                                {
                                    name:'南宁市青秀区南湖社区卫生服务中心',
                                    phone:'0771-5501022'
                                }
                            ]
                        }/>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={1}>
                        <View style='font-size:18px;text-align:center;height:100px;'>标签页二的内容</View>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={2}>
                        <MyList  defualtProps={
                                [
                                    {
                                        name:'南宁市西乡塘卫生院',
                                        phone:'0771-23264'
                                    },
                                    {
                                        name:'南宁市青秀区七星社区卫生服务中心',
                                        phone:'0771-2842899'
                                    },
                                    {
                                        name:'南宁市青秀区南湖社区卫生服务中心',
                                        phone:'0771-5501022'
                                    }
                                ]
                            }/>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={3}>
                        <View style='font-size:18px;text-align:center;height:100px;'>标签页四的内容</View>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={4}>
                        <View style='font-size:18px;text-align:center;height:100px;'>标签页五的内容</View>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={5}>
                        <View style='font-size:18px;text-align:center;height:100px;'>标签页六的内容</View>
                    </AtTabsPane>
                </AtTabs>

            </View>
        )
    }
}

export { MyTabs }