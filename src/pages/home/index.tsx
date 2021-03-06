import { CommonEvent,  ScrollView, View ,Swiper, SwiperItem, Text, Image} from "@tarojs/components";
import React from "react";
import { AtSearchBar, AtNoticebar,AtIcon } from "taro-ui";
import "./index.scss"
//组件
import MyTabs from '../../component/Tabs'
import FloatList from '../../component/FloatListLayout'

interface Hstate {
    homeScrollHeight:string
    searchVal:string
    tabList:tablist[]
    isOpen:boolean
    layoutSelect:string
    isSeach:boolean
}

interface tablist {
    id:number;
    title:string;
}

export default class Home extends React.Component<any, Hstate>{

    constructor(porps:any){
        super(porps)
        this.state = {
            homeScrollHeight:'1720',
            searchVal:'',
            tabList:[],
            isOpen:false,
            layoutSelect:'',
            isSeach:false
        }
    }

    layout1:any= null;
    // or 使用箭头函数
    onScrollToUpper = () => {}

    //点击时
    onActionClick = ()=>{
        console.log('click-',this.state.searchVal)
        this.setState({
            isSeach:true
        })
    }
    //改变时搜索  
    onChange=(val:string)=>{
       this.setState({
           searchVal:val,
       })
       setTimeout(()=>{
        this.setState((state)=>{
            return {
                isSeach:!state.isSeach
            }
        })
       },600)
    }

    showLayout = ()=>{
        this.setState(
            {
                isOpen:true
            }
        )
    }

    componentDidMount(): void {
    
    }
    setOption=(option:{value:string,toOpen:boolean})=>{
        const {value,toOpen} =option;
        this.setState({
            isOpen:toOpen,
            layoutSelect:value
        })
    }

    render(): React.ReactNode {
        // const scrollStyle = {
        //     height: this.state.homeScrollHeight+'px'
        //   }
          const scrollTop = 0
          const Threshold = 20
    

        return (
            <>
                <ScrollView   
                    className='scrollview'
                    scrollY
                    scrollWithAnimation
                    scrollTop={scrollTop}
                    // style={scrollStyle}
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
                            <Image
                                mode="aspectFit"
                                style='background: #fff;width:100%;'
                                src='https://web-1306059885.cos.ap-guangzhou.myqcloud.com/images/10002.jpg'
                            />
                        </SwiperItem>
                        <SwiperItem>
                            <Image
                                mode="aspectFit"
                                style='background: #fff;width:100%;'
                                src='https://web-1306059885.cos.ap-guangzhou.myqcloud.com/images/10003.jpg'
                            />
                        </SwiperItem>
                        <SwiperItem>
                            <Image
                                mode="aspectFit"
                                style='background: #fff;width:100%;'
                                src='https://web-1306059885.cos.ap-guangzhou.myqcloud.com/images/10001.jpg'
                            />
                        </SwiperItem>
                    </Swiper>

                    <AtNoticebar single={false}>郑重提醒:请以平台内预约记录和接种门诊工作通知为准,请勿轻易相信任何电话或短信,谨防上当受骗!</AtNoticebar>
                    <View className="at-row at-row__justify--between cl1">
                        <View className='at-col at-col-5 cl11'><Text>疫苗预约</Text></View>
                        <View className="at-col at-col-2 cl12"><AtIcon onClick={this.showLayout} value='bullet-list' size='30' color='#ccc'></AtIcon></View>
                    </View>

                    <MyTabs isSeach={{seach:this.state.isSeach,value:this.state.searchVal}} selectValue={this.state.layoutSelect} />
                    
                    <FloatList setOption={this.setOption} defaultProps={this.state.isOpen} />
                  
                </ScrollView>

                
            </>
        )
    }
}