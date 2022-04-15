import Taro from "@tarojs/taro"
import { Component } from "react"
import { connect } from "react-redux"
import { AtListItem } from "taro-ui"

class ListHspt extends Component<any,any>{

    state ={
        list:[]
    }
    nav2sub =(id:number)=>{
        return ()=>{
            Taro.navigateTo({
                url: `/subpack/yuyue/index?id=${id}`,
            })
        }
    }

    render(): React.ReactNode {
        const {data}  = this.props.thread
        if(data){
            let list:any[] =data;
            return (
               <>
                {list.map((item)=>{
                    return <AtListItem
                    key={item.hspt_id}
                    title={item.hspt_name}
                    note={item.hspt_phone}
                    arrow='right'
                    thumb='https://web-1306059885.cos.ap-guangzhou.myqcloud.com/icon/icon-2.png'
                    onClick={this.nav2sub(item.hspt_id)}
                />
                })}
               </>
            )
        }else{
            return (
                <AtListItem
                    title='系统异常'
                    note='暂停服务'
                    arrow='right'
                    thumb='https://web-1306059885.cos.ap-guangzhou.myqcloud.com/icon/icon-2.png'
                />
            )
        }
       
            
    
    }
}
//++++
function mapStateToProps (state){
    return { thread: state.thread}
}

export default  connect(mapStateToProps)(ListHspt)