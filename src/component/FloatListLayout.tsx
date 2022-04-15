import Taro from '@tarojs/taro'
import React from 'react'
import { connect } from 'react-redux'
import { AtFloatLayout, AtGrid } from "taro-ui"
import {BASE_URL} from "../config/config"
import { drugType } from '../home.interface'

import "./component.scss"



interface ILayoutProps {
    defaultProps: boolean;
    setName?:any;
    setOption:any;
}

interface drugState {
    typeList:drugType[],
}

class FloatList extends React.Component<ILayoutProps, drugState> {
    layout: any

    constructor(props: ILayoutProps) {
        super(props)
        this.state={
            typeList:[],
        }
    }

    async componentDidMount() {
        const res =  await Taro.request({
            // url:'http://127.0.0.1:7001/hspt/type'
            url:`${BASE_URL}hspt/type`
        })

        // console.log(res.data)

        this.setState({
            typeList:res.data
        })
    }

    topLayou = (node: any) => {
        // this.showLayout
    }
    handleClose = () => {

    }

    getValue=(data:any)=>{
        // console.log(data.value)
        this.props.setOption({value:data.value,toOpen:false})
        // this.props.setName({data:data.value})
    }

    render(): React.ReactNode {
        const drutTypeList = this.state.typeList.map((item)=>{
            return {value:item.name}
        })
      
        // console.log(drutTypeList)
        return (
            //弹出层浮动分类列表
            <AtFloatLayout ref={e=>this.layout =e} isOpened={this.props.defaultProps}  onClose={this.handleClose}>
                <AtGrid onClick={(e)=>this.getValue(e)} mode='rect' hasBorder={false} data={drutTypeList} />
            </AtFloatLayout>
        )
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         setName: atgird => dispatch({ type: 'SET_CURRENT_NAME', atgird })
//     }
// }

export default FloatList