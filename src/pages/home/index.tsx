import { CommonEvent,  ScrollView, View ,Swiper, SwiperItem, Text} from "@tarojs/components";
import React, { ComponentClass } from "react";
import { AtButton,AtSearchBar, AtNoticebar,AtIcon, AtFloatLayout  } from "taro-ui";


import "./index.scss"
import "taro-ui/dist/style/components/button.scss" //按需引入
import "taro-ui/dist/style/components/search-bar.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/noticebar.scss";
import "taro-ui/dist/style/components/flex.scss";
import "taro-ui/dist/style/components/float-layout.scss";
import { AtFloatLayoutProps } from "taro-ui/types/float-layout";

interface Hstate {
    homeScrollHeight:string
    searchVal:string
    isOpen:boolean
}

export default class Home extends React.Component<any, Hstate>{

    constructor(porps:any){
        super(porps)
        this.state = {
            homeScrollHeight:'1720',
            searchVal:'',
            isOpen:true
        }
    }

    layout1:any= null;
    // or 使用箭头函数
    onScrollToUpper = () => {}

    //点击时
    onActionClick = ()=>{
        console.log('click-')
        this.setState({
            searchVal:''
        }
        )
            
    }
    //改变时搜索  
    onChange=(val:string)=>{
        console.log(val)
    }

    handleClose = ()=>{

    }

    showLayout = ()=>{
        console.log(this.layout1.props)
        this.setState(
            {
                isOpen:true
            }
        )
    }

    topLayou = (node:any)=>{
        // this.showLayout
    }

    render(): React.ReactNode {
        const scrollStyle = {
            height: this.state.homeScrollHeight+'px'
          }
          const scrollTop = 0
          const Threshold = 20
          const vStyleA = {
            height: '150px',
            'background-color': 'rgb(26, 173, 25)'
          }
          const vStyleB = {
             height: '150px',
            'background-color': 'rgb(39,130,215)'
          }
          const vStyleC = {
            height: '150px',
            'background-color': 'rgb(241,241,241)',
            color: '#333'
          }
        return (
            <>
                <ScrollView
                    className='scrollview'
                    scrollY
                    scrollWithAnimation
                    scrollTop={scrollTop}
                    style={scrollStyle}
                    lowerThreshold={Threshold}
                    upperThreshold={Threshold}
                    onScrollToUpper={this.onScrollToUpper} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
                
                >
                    <AtSearchBar
                        value={this.state.searchVal}
                        onChange={(val:string,e:CommonEvent<any>)=>{this.onChange(val)}}
                        onActionClick={this.onActionClick}
                    />

                    <Swiper
                        className='test-h'
                        indicatorColor='#999'
                        indicatorActiveColor='#333'
                        vertical={false}
                        circular
                        indicatorDots
                        autoplay>
                        <SwiperItem>
                            <View className='demo-text-1'>1</View>
                        </SwiperItem>
                        <SwiperItem>
                            <View className='demo-text-2'>2</View>
                        </SwiperItem>
                        <SwiperItem>
                            <View className='demo-text-3'>3</View>
                        </SwiperItem>
                    </Swiper>

                    <AtNoticebar single={false}>郑重提醒:请以平台内预约记录和接种门诊工作通知为准,请勿轻易相信任何电话或短信,谨防上当受骗!</AtNoticebar>
                    <View className="at-row at-row__justify--between cl1">
                        <View className='at-col at-col-5 cl11'><Text>疫苗预约</Text></View>
                        <View className="at-col at-col-2 cl12"><AtIcon onClick={this.showLayout} value='bullet-list' size='30' color='#ccc'></AtIcon></View>
                    </View>

                    <AtFloatLayout ref={(node:any)=>{this.layout1=node}} isOpened={this.state.isOpen} title="这是个标题" onClose={this.handleClose}>
                        这是内容区 随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写这是内容区
                        随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写
                    </AtFloatLayout>
                    <View style={vStyleA}>A</View>
                    <View style={vStyleB}>B</View>
                    <View style={vStyleC}>C</View>
                    <AtButton type="primary">提交</AtButton>
                </ScrollView>

                
            </>
        )
    }
}