import Taro from '@tarojs/taro';
import React, { ReactNode } from 'react'

interface IProp {
    url:string;
    loading:ReactNode;
    ['any']?:any;
    children:any;
    delay:number;
}

interface HttpIstate {
    data:any[];
    mycomponent:ReactNode;
    ['any']?:any
}

class Get extends React.Component<IProp,HttpIstate> {
    constructor(props:IProp){
        super(props)
        this.state={
            mycomponent:this.props.loading || '',
            data:[]
        }
    }
    async componentDidMount(): Promise<any> {
        const mychildren = this.props.children
        const {delay} = this.props
        const res =  await Taro.request({
            url:this.props.url,
            header: {
                'content-type': 'application/json'
            },
        })
        console.log(res.data)
        this.setState({
            data:res.data
        },()=>{
            setTimeout(()=>{
                this.setState({
                    mycomponent:mychildren(this.state.data)
                })
            },delay||0)
        }
        )
    }
    render(): React.ReactNode {
        return this.state.mycomponent
    }
}

export default Get
