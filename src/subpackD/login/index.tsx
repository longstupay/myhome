import { View,Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { ReactNode } from "react";
import { AtButton, AtInput,AtActivityIndicator } from "taro-ui";
import './index.scss'

interface IState {
    value:string;
    value1:string;
    isSend:boolean;
    height:string;
    isNav2Idenx:boolean;
}
export default class Login extends React.Component<any, IState>{

    constructor(props) {
        super(props)
        this.state = {
            value: "",
            value1:"",
            isSend:false,
            height:"",
            isNav2Idenx:false,
        }
    }

 
    handlePhoneChange(e) {
        if(e.length<12){
            this.setState({
                value:e
            })
        }
        
    }
    handleCodeChange(e){
        this.setState({
            value1:e
        })
    }
    toLogin=()=>{
        const {value,value1} = this.state
        console.log(value,value1);
        this.setState({
            isNav2Idenx:true
        },()=>{
            setTimeout(()=>{
                Taro.switchTab({
                    url:`/pages/index/index`
                })
            },3000)
        })
       
    }
    sendCode=()=>{
        this.setState({
            isSend:true
        })
        setTimeout(()=>{
            this.setState({
                isSend:false
            })
        },60000)

    }
    componentDidMount() {
        try {
            const res = Taro.getSystemInfoSync()
            this.setState({
                height:""+res.windowHeight
            },()=>{
                console.log(this.state.height)
            })
            
            
          } catch (e) {
            // Do something when catch error
            throw e
          }
    }

    render(): ReactNode {
        return (
            <View>
                {
                    this.state.isNav2Idenx ? 
                        <View className="loading" style={{
                            height: this.state.height + "px"
                        }}><AtActivityIndicator content='登录中...' mode='center'></AtActivityIndicator></View> :
                        <View className="contian" style={{
                            height: this.state.height + "px"
                        }}>
                            <View
                                className="login-view"
                            >
                                <AtInput
                                    name='value'
                                    border={false}
                                    type='text'
                                    title='手机号码'
                                    placeholder='手机号码'
                                    value={this.state.value}
                                    onChange={this.handlePhoneChange.bind(this)}
                                />
                                <View className="v-code">
                                    <AtInput
                                        name='value1'
                                        type='text'
                                        placeholder='请短信输入验证码'
                                        value={this.state.value1}
                                        onChange={this.handleCodeChange.bind(this)}
                                    />
                                    {
                                        this.state.isSend ?
                                            <AtButton className="c-sended-btn" loading={true} size="small" circle={true} type="secondary"></AtButton> :
                                            <AtButton className="c-btn" size="small" onClick={this.sendCode} circle={true} type="secondary">发送验证码</AtButton>
                                    }

                                </View>

                                <AtButton onClick={this.toLogin}>登录</AtButton>
                            </View>
                            <View className="b-text"> <Text >登录有疑问,联系客服</Text></View>

                        </View>
                }
                
            </View>
            
        )
    }
}