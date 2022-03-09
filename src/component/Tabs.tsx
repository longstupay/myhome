import React from 'react'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'


//custom com
import {MyList} from "./List"
import { drugType } from '../home.interface';
import HTTP from '../utils/HTTP';
import Taro from '@tarojs/taro';


interface Istate {
    current:number;
    drugtype:drugType[]
}

class MyTabs extends React.Component<any,Istate> {

    constructor(props:any) {
        super(props)
        this.state = {
            current:0,
            drugtype:[]
        }
    }

    handleClick = (index:number)=>{
        this.setState({
            current:index
        })
    }

    async componentDidMount() {
        const res = await Taro.request({
            url:"http://127.0.0.1:7001/hspt/type"
        })

        // console.log(res.data)
        this.setState({
            drugtype:res.data
        })
    }

    render() {
        
        const myTabs = this.state.drugtype.map((item)=>{
            return {title:item.name}
        });

        return (
            <View>
                <AtTabs
                    current={this.state.current}
                    scroll
                    tabList={[
                        { title: '全部' },
                        ...myTabs
                    ]}
                    onClick={(index)=>{this.handleClick(index)}}>
                    
                    <AtTabsPane current={this.state.current} index={0}>
                        <MyList/>
                    </AtTabsPane>

                    {
                        this.state.drugtype.map((item,index)=>(
                            <AtTabsPane key={item.id} current={this.state.current} index={index+1}>
                                <MyList/>
                            </AtTabsPane>
                        ))
                    }
                    
                    
                    
                </AtTabs>

            </View>
        )
    }
}

export { MyTabs }