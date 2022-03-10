import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtAvatar, AtButton, AtList, AtListItem } from 'taro-ui'
import Taro from '@tarojs/taro'
import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.scss'
import "taro-ui/dist/style/components/avatar.scss";
import "taro-ui/dist/style/components/flex.scss";
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/icon.scss";

interface Ustate {
  isLogin:boolean
}
export default class Index extends Component<any,Ustate> {

  constructor(props:any){
    super(props)
    this.state={
      isLogin:false
    }
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() {
    Taro.showShareMenu({
      withShareTicket: true,
      showShareItems:['wechatFriends', 'wechatMoment']
    })
   }

  componentDidHide() { }

  navToUser =()=>{
    Taro.navigateTo({
      url: '/pages/user/index?id=1',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
        },
        someEvent: function(data) {
          console.log(data)
        }
        
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      }
    })
  }

  nav2Login=()=>{
    Taro.redirectTo({
      url:"/subpackD/login/index"
    })
  }

  render() {
    return (
      <View>
       
          {
            this.state.isLogin?
            <View className='at-row at-row__align--center '>
              <AtAvatar className='myavatar' circle text='岐' size="large"></AtAvatar>
              <Text className='text at-col'>不知岐黄幽魂耳</Text>
            </View>:
            <View className='login-center'>
                <AtButton onClick={this.nav2Login}>立即登录</AtButton>
            </View>
          }
          

       

        <View>
          <AtList>
            <AtListItem
              className='h-item'
              title='个人信息'
              arrow='right'
              thumb='https://web-1306059885.cos.ap-guangzhou.myqcloud.com/pic/pic-4.png'
              onClick={this.navToUser}
            />

            <AtListItem
              className='h-item'
              title='预约信息'
              arrow='right'
              thumb='https://web-1306059885.cos.ap-guangzhou.myqcloud.com/pic/pic-1.png'
            />
            <AtListItem
              className='h-item'
              title='订阅通知'
              arrow='right'
              thumb='https://web-1306059885.cos.ap-guangzhou.myqcloud.com/pic/pic-2.png'
            />
            <AtListItem
              className='h-item'
              title='设置'
              arrow='right'
              thumb='https://web-1306059885.cos.ap-guangzhou.myqcloud.com/pic/pic-3.png'
            />

          </AtList>

        </View>
      </View>
    )
  }
}
