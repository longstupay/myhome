import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import {BASE_URL} from '../config/config'
//custom com
import {MyList} from "./List"
import { drugType } from '../home.interface';
import Taro from '@tarojs/taro';
import { AtList, AtListItem } from "taro-ui";
import { connect } from 'react-redux'
import ListHspt from './Test'
interface Istate {
    current:number;
    drugtype:drugType[],
    select_id:number;
    totalList:any[];
}
interface byTypeId {

}

class MyTabs extends React.Component<any,Istate> {
    private mytabs: any

    constructor(props:any) {
        super(props)
        this.state = {
            current:0,
            drugtype:[],
            select_id:0,
            totalList:[],

        }
    }

    handleClick = async (index:number)=>{
        // console.log('tab的索引',index);
        if(index>0){
            // console.log('选中分类id',this.state.drugtype[index-1].name)
            const res = await Taro.request({
                // url:"http://127.0.0.1:7001/hspt/total/id?type_id="
                url:`${BASE_URL}hspt/total/id?type_id=${this.state.drugtype[index-1].id}`
            })
            let mySet = new Set();
            res.data.map((item)=>{
                mySet.add(item.hsptId)
            })
            let hsptList = [];
            for (let item of mySet){
                const res = await Taro.request({
                    url:`${BASE_URL}hspt/byid/${item}`
                }).then(
                    function(value){
                        // console.log(value)
                        return value.data
                    }
                ).catch(function(err){
                    // console.log(err)
                    return err
                })
                hsptList.push(res)
            }
            // console.log(hsptList)
            this.props.setThread({data:hsptList})
            this.setState({
                select_id:this.state.drugtype[index-1].id,
                totalList:hsptList
            })
        }
        
        this.setState({
            current:index
        })
    }

    async componentDidMount() {
        // http://127.0.0.1:7001/hspt/total/id?type_id=2
        const res = await Taro.request({
            // url:"http://127.0.0.1:7001/hspt/type"
            url:`${BASE_URL}hspt/type`
        })
        this.setState({
            drugtype:res.data
        })
    }
   

    nav2sub =(id:number)=>{
        return ()=>{
            Taro.navigateTo({
                url: `/subpack/yuyue/index?id=${id}`,
            })
        }
    }
    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<Istate>, snapshot?: any): void {
       if(prevProps.selectValue==this.props.selectValue && prevProps.isSeach.seach==this.props.isSeach.seach){
           return
       }
       if(this.props.isSeach.seach){
        this.handleClick(0)
       }
       else{
           //根据分类名，检索list的index.
            const list:string[] = this.state.drugtype.map((item)=>{
                return item.name
            })
            const index:number =  list.indexOf(this.props.selectValue)
            // console.log(index)
            this.handleClick(index+1)
            
            
       }
    }

    render() {
        const myTabs = this.state.drugtype.map((item)=>{
            return {title:item.name}
        });
        
        return (
            <View>
                <AtTabs
                    ref={e=>this.mytabs=e}
                    current={this.state.current}
                    scroll
                    tabList={[
                        { title: '全部' },
                        ...myTabs
                    ]}
                    onClick={(index)=>{this.handleClick(index)}}>
                    
                    <AtTabsPane current={this.state.current} index={0}>
                        <MyList isSeach={this.props.isSeach}/>
                    </AtTabsPane>

                    {
                        this.state.drugtype.map((item,index)=>(
                            <AtTabsPane key={item.id} current={this.state.current} index={index+1}>
                               <ListHspt />
                            </AtTabsPane>
                        ))
                    }
                    
                    
                    
                </AtTabs>

            </View>
        )
    }
}

function mapStateToProps(state){
    return { atgird: state.atgird }
}

const mapDispatchToProps = dispatch => {
    return {
        setThread: thread => dispatch({ type: 'SET_CURRENT_THREAD', thread })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyTabs)