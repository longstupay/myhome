import React from 'react'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'

import {BASE_URL} from '../config/config'
//custom com
import {MyList} from "./List"
import { drugType } from '../home.interface';
import Taro from '@tarojs/taro';


interface Istate {
    current:number;
    drugtype:drugType[],
    select_id:number
}

class MyTabs extends React.Component<any,Istate> {

    constructor(props:any) {
        super(props)
        this.state = {
            current:0,
            drugtype:[],
            select_id:0
        }
    }

    handleClick = (index:number)=>{
        // console.log('tab的索引',index);
        if(index>0){
            console.log('选中分类id',this.state.drugtype[index-1].id)
            this.setState({
                select_id:this.state.drugtype[index-1].id
            })
        }
        
        this.setState({
            current:index
        })
    }

    async componentDidMount() {
        console.log(BASE_URL)
        const res = await Taro.request({
            // url:"http://127.0.0.1:7001/hspt/type"
            url:`${BASE_URL}hspt/type`
        })
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
                                <MyList />
                            </AtTabsPane>
                        ))
                    }
                    
                    
                    
                </AtTabs>

            </View>
        )
    }
}

export { MyTabs }