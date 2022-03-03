import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtAvatar, AtList, AtListItem } from 'taro-ui'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.scss'
import "taro-ui/dist/style/components/avatar.scss";
import "taro-ui/dist/style/components/flex.scss";
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/icon.scss";
export default class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View>
        <View className='myavatar at-row at-row__align--center'>
          <AtAvatar className='' circle text='岐' size="large"></AtAvatar>
          <Text className='text at-col'>不知岐黄幽魂耳</Text>
        </View>

        <View>
          <AtList>
            <AtListItem
              className='h-item'
              title='个人信息'
              arrow='right'
              thumb='https://web-1306059885.cos.ap-guangzhou.myqcloud.com/pic/pic-4.png'
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
