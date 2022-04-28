import React from "react";
import { Picker, View } from '@tarojs/components'
import { AtNavBar, AtInput, AtButton, AtList, AtListItem,AtToast  } from 'taro-ui'
import Taro from '@tarojs/taro'
import "./index.scss"



interface userState {
    inputvalue: string
    selector: string[]
    selectorChecked: string
    dateSel: string
    idcar: string
    phone: string
    selectorSex: string[]
    selectorSexChecked: string
    isSaveErr:boolean
    isNotLogin:boolean
    loginPhone:string
    token:string
    islose:boolean
    isRegister:boolean
    user_uid:number
    isSuccess:boolean
    isUpdate:boolean
}

export default class User extends React.Component<any, userState> {

    constructor(props: any) {
        super(props)
        this.state = {
            inputvalue: "",
            selector: ['身份证', '护照', '港澳证件', '台胞证'],
            selectorSex: ['男', '女'],
            selectorChecked: '身份证',
            dateSel: '2018-04-22',
            idcar: "",
            phone: "",
            selectorSexChecked: "男",
            isSaveErr:false,
            isNotLogin:false,
            loginPhone:null,
            token:'',
            islose:false,
            isRegister:false,
            user_uid:null,
            isSuccess:false,
            isUpdate:false
        }
    }

    $instance = Taro.getCurrentInstance().router.params

    handleClick = () => {
        Taro.navigateBack({
           
        })
    }
    
  

    handleIdChange=(e)=>{
      this.setState({
          idcar:e
      })
    }

    handleNameChange=(e)=> {
       this.setState({
           inputvalue:e
       })
    }
    handlePhoneChange=(e)=>{
        this.setState({
            phone:e
        })
    }

    //查询是否登录，并根据登录凭证查询用户信息 并展示用户信息
    async componentDidMount() {
        console.log(this.$instance.update)
        if(this.$instance.update){
            this.setState({
                isUpdate:true
            },()=>{
                console.log('是否从订单更新用户信息',this.state.isUpdate)
            })
        }
        
        //查询缓存的手机号
        try {
            var value = Taro.getStorageSync('phone')
            if (value) {
                this.setState({
                    token:value
                },async()=>{
                    //根据token向服务端身份验证
                    console.log(this.state.token)
                    const res = await Taro.request({
                        url: "http://127.0.0.1:7001/passport/jwt",
                        method: "POST",
                        header: {
                            Authorization: 'Bearer ' + this.state.token
                        }
                    })
                    console.log(res)
                    if (res.statusCode >= 400) {
                        this.setState({
                            isNotLogin: true
                        })
                        let t = setTimeout(() => {
                            Taro.switchTab({
                                url: '/pages/index/index'
                            })
                        }, 2000);

                    }
                    console.log('缓存中的信息',res.data.phone)
                    //根据登录手机查询信息
                    this.setState({
                            isNotLogin:false,
                            loginPhone:""+res.data.phone
                        })
                    const info = await Taro.request({
                        url:"http://127.0.0.1:7001/user/phone/"+res.data.phone
                    })
                    if(info.statusCode>=400){
                        // this.setState({
                        //     islose:true
                        // })
                        console.log('未填写信息')
                    }
                    console.log(info)
                    const {birthday,id_card,idtype,loginphone,phone_number,sex,username,user_uid} = info.data

                    this.setState({
                        inputvalue:username,
                        selectorChecked:idtype,
                        dateSel:birthday,
                        idcar:id_card,
                        phone:phone_number,
                        selectorSexChecked:sex,
                        loginPhone:loginphone,
                        isRegister:true,
                        user_uid
                    })
                })
            }else{
                console.log('未登录');
                this.setState({
                    isNotLogin: true
                })
                let t = setTimeout(() => {
                    Taro.switchTab({
                        url: '/pages/index/index'
                    })
                }, 2000);
            }
          } catch (e) {
            // Do something when catch error
            throw e
          }

    }

    submitInfo= async()=>{
        const { 
            inputvalue,
            selectorChecked,
            dateSel,
            idcar,
            phone,
            selectorSexChecked,
            loginPhone,
            isRegister     
        } = this.state;
        console.log('是否注册',isRegister)
        if(isRegister){
            //注册过信息，则为提交更新
            const {user_uid} =this.state
            const patchInfo = await Taro.request({
                url:"http://127.0.0.1:7001/user/"+user_uid,
                method:"PUT",
                data:{
                    "username": inputvalue,
                    "id_card": idcar,
                    "phone_number": phone,
                    "sex": selectorSexChecked,
                    "idtype":selectorChecked,   //证件类型
                    "birthday":dateSel,       //生日
                    "loginphone":loginPhone
                }
            })
            console.log('错误--',patchInfo.statusCode)
            if(patchInfo.statusCode <=299){
                if(!this.state.isUpdate){
                    this.setState({
                        isSuccess:true
                    })
                    let t =setTimeout(()=>{
                        Taro.switchTab({
                            url: '/pages/index/index'
                        })
                    },1100)
                }else{
                    console.log('----????---')
                    this.setState({
                        isSuccess:true
                    })
                }

            }
            // 未填写信息的bug,逻辑待优化
            if(patchInfo.statusCode>=400){
                const lgnum = Taro.getStorageSync('loginphone')
                console.log('登录手机号',lgnum)
           
                const res = await Taro.request({
                    // url:`${BASE_URL}user`,
                    url:"http://127.0.0.1:7001/user",
                    method:"POST",
                    data: {
                        "username": inputvalue,
                        "id_card": idcar,
                        "phone_number": phone,
                        "sex": selectorSexChecked,
                        "idtype":selectorChecked,   //证件类型
                        "birthday":dateSel,       //生日
                        "loginphone":lgnum
                    },
                    header: {
                        'content-type': 'application/json' 
                    },
                })

                if(res.statusCode<299){
                    console.log('注册成功',res.statusCode)
                    if(!this.state.isUpdate){
                        Taro.switchTab({
                            url: '/pages/index/index'
                        })
                    }
                }else{
                    
                }
            }
        }else{
            console.log('未注册过')
            const res = await Taro.request({
                // url:`${BASE_URL}user`,
                url:"http://127.0.0.1:7001/user",
                method:"POST",
                data: {
                    "username": inputvalue,
                    "id_card": idcar,
                    "phone_number": phone,
                    "sex": selectorSexChecked,
                    "idtype":selectorChecked,   //证件类型
                    "birthday":dateSel,       //生日
                    "loginphone":loginPhone
                },
                header: {
                    'content-type': 'application/json' 
                },
            })
            
            if(res.statusCode<299){
                console.log('注册成功',res.statusCode)
                if(!this.state.isUpdate){
                    Taro.switchTab({
                        url: '/pages/index/index'
                    })
                }
            }else{
                this.setState({
                    isSaveErr:!this.state.isSaveErr
                })
            }
           
        }
       

    }

    onChange = e => {
        this.setState({
            selectorChecked: this.state.selector[e.detail.value]
        })
    }
    onDateChange = e => {
        this.setState({
            dateSel: e.detail.value
        })
    }

    onChangeSex = e => {
        this.setState({
            selectorSexChecked: this.state.selectorSex[e.detail.value]
        })
    }
 
    render(): React.ReactNode {
        console.log(`render@${this.state.idcar}`)
        return (
           
            <View>
                {/* 错误提示 */}
                <AtToast isOpened={this.state.isSaveErr} status="error" text="保存失败" icon="{icon}"></AtToast>
                 {/* 登录提示 */}
                 <AtToast isOpened={this.state.isNotLogin} status="error" text="请先登录" icon="{icon}"></AtToast>
                 <AtToast isOpened={this.state.islose} status="error" text="请认真填写用户信息" icon="{icon}"></AtToast>
                 <AtToast isOpened={this.state.isSuccess} status="success" text="提交成功" icon="{icon}"></AtToast>
                <AtNavBar
                    onClickLeftIcon={this.handleClick}
                    color='#000'
                    title='个人信息'
                    leftText='返回'

                />

                    <AtInput
                        required={true}
                        name='value'
                        title='姓名'
                        type='text'
                        placeholder='请输入姓名'
                        value={this.state.inputvalue}
                        onChange={this.handleNameChange}
                    />

                    <AtInput
                        required={true}
                        name='value6'
                        border={false}
                        title='手机号码'
                        type='phone'
                        placeholder='手机号码'
                        value={this.state.phone}
                        onChange={this.handlePhoneChange}
                    />
                    <View className='container'>
                        <View className='page-body'>
                            <View className='page-section'>
                                <View>
                                    <Picker mode='selector' range={this.state.selectorSex} onChange={this.onChangeSex}>
                                        <AtList>
                                            <AtListItem
                                                title='性别'
                                                extraText={this.state.selectorSexChecked}
                                            />
                                        </AtList>
                                    </Picker>
                                </View>
                            </View>
                            <View className='page-section'>
                                <View>
                                    <Picker mode='selector' range={this.state.selector} onChange={this.onChange}>
                                        <AtList>
                                            <AtListItem
                                                title='证件类型'
                                                extraText={this.state.selectorChecked}
                                            />
                                        </AtList>
                                    </Picker>

                                    <AtInput
                                        required={true}
                                        name='value4'
                                        title='证件号码'
                                        type='idcard'
                                        placeholder='请输入证件号码'
                                        value={this.state.idcar}
                                        onChange={this.handleIdChange}
                                    />
                                </View>
                            </View>

                            <View className='page-section'>
                                <View>
                                    <Picker value="" mode='date' onChange={(e) => this.onDateChange(e)}>
                                        <AtList>
                                            <AtListItem title='生日' extraText={this.state.dateSel} />
                                        </AtList>
                                    </Picker>
                                </View>
                            </View>
                        </View>
                    </View>

                    <AtButton className="btn-form" type='primary' circle onClick={this.submitInfo}>提交</AtButton>
 
            </View>





        )
    }
}