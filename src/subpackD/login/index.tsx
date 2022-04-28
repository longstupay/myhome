import { View,Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { ReactNode } from "react";
import { AtButton, AtInput,AtActivityIndicator,AtMessage  } from "taro-ui";
import './index.scss'
// import {BASE_URL} from '../../config/config'


interface IState {
    value:string;
    value1:string;
    isSend:boolean;
    height:string;
    isNav2Idenx:boolean;
    notPhone:boolean;
    isActiveBtn:boolean;
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
            notPhone:true,
            isActiveBtn:false
        }
    }

 
    handlePhoneChange(e) {
        this.setState({
            value: e,
        })
    }
    handleCodeChange(e){
        this.setState({
            value1:e,
            isActiveBtn:true
        })
    }
    toLogin = async ()=>{
        //value 电话，value1 验证码
        const {value,value1} = this.state
        console.log(value,value1);
        const res = await Taro.request({
            // url: `${BASE_URL}sms/getcode`, 
            url:"http://127.0.0.1:7001/sms/getcode",
            method:"POST",
            data: {
              phone:`${value}`,
              value:value1
            }
          })
        console.log(res)
        
        if(res.statusCode>=400){
            Taro.atMessage({
                'message': '验证码错误',
                'type': "error",
              })
            return 
        }
        //存jwt的token到本地
        const jwt = await Taro.request({
            // url:`${BASE_URL}jwt/${value}`,
            url:`http://127.0.0.1:7001/jwt/${value}`,
            method:"POST"
        })
        console.log(jwt.data.t)
        if(jwt.statusCode==200){
            try {
                Taro.setStorageSync('phone', `${jwt.data.t}`)
                Taro.setStorageSync('loginphone', `${value}`)
              } catch (e) {
                    Taro.atMessage({
                    'message': '未知错误请联系客服',
                    'type': "error",
                    })
                  throw e
               }
        }
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
    sendCode = async()=>{
        const {value} = this.state
        if(value.length!==11){
            Taro.atMessage({
                'message': '输入正确手机号',
                'type': "error",
              })
            return 
        }
        this.setState({
            isSend:true
        })
        
        const res = await Taro.request({
            // url: `${BASE_URL}sms/`, 
            url:"http://127.0.0.1:7001/sms",
            data: {
             phone:`${value}`
            },
            method:"POST",
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log(res.data)
            }
          })
        console.log(res)
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
                <AtMessage />
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
                                {
                                    this.state.isActiveBtn?<AtButton className="l-btn" onClick={this.toLogin}>登录</AtButton>:
                                    <AtButton className="l-btn" disabled={true} >登录</AtButton>
                                }
                                
                            </View>
                            <View className="b-text"> <Text >登录有疑问,联系客服</Text></View>

                        </View>
                }
                
            </View>
            
        )
    }
}