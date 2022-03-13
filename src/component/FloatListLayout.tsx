import Taro from '@tarojs/taro'
import React from 'react'
import { AtFloatLayout, AtGrid } from "taro-ui"
import {BASE_URL} from "../config/config"
import { drugType } from '../home.interface'

import "./component.scss"



interface ILayoutProps {
    defaultProps: boolean
}

interface drugState {
    typeList:drugType[]
}

class FloatList extends React.Component<ILayoutProps, drugState> {

    constructor(props: ILayoutProps) {
        super(props)
        this.state={
            typeList:[]
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

    render(): React.ReactNode {
        const drutTypeList = this.state.typeList.map((item)=>{
            return {value:item.name}
        })
        
        console.log(drutTypeList)
        return (
            //弹出层浮动分类列表
            <AtFloatLayout isOpened={this.props.defaultProps}  onClose={this.handleClose}>
                <AtGrid mode='rect' hasBorder={false} data={drutTypeList} />
            </AtFloatLayout>
        )
    }
}

export { FloatList }