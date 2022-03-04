import { Button, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { Component } from "react";

import { AtTag ,AtDivider ,AtModal, AtModalHeader, AtModalContent, AtModalAction, AtCard ,AtList, AtListItem, AtIcon, AtButton} from "taro-ui"

import './index.scss'

interface ModelHeadState {
    isShow: boolean;
    ModalText: string;
    hospitalInfo:InfoHospital
}

interface InfoHospital {
    naem:string,
    phone:string,
    listOrder:ListOrder[]
                
}

interface ListOrder {
    drugCtg:string,
    drugID:number,
    drugName:string,
    tags:any[],
    total:number,
    price:string
}

interface drugTag {

}

export default class OrderList extends Component<any, ModelHeadState> {
    constructor(porps: any) {
        super(porps)
        this.state = {
            isShow: true,
            ModalText: "",
            hospitalInfo: {
                naem:"南宁青秀区仙葫社区卫生服务中心",
                phone:"0770-4186171",
                listOrder:[
                    {
                        drugCtg:"a1",
                        drugID:1,
                        drugName:"四价人乳头瘤病毒疫苗",
                        tags:['国产','9-45','3针次'],
                        total:0,
                        price:'1150'
                    }
                ]
            }
        }
    }
    //请求服务端数据
    componentDidMount(): void {
        this.setState({
            hospitalInfo:
                {
                    naem:"广西南宁青秀区仙葫社区卫生服务中心",
                    phone:"0770-4186171",
                    listOrder:[
                        {
                            drugCtg:"a1",
                            drugID:1,
                            drugName:"四价人乳头瘤病毒疫苗",
                            tags:['国产联合','9-45','3针次'],
                            total:0,
                            price:"1330",
                        },
                        {
                            drugCtg:"a1",
                            drugID:2,
                            drugName:"九价人乳头瘤病毒疫苗(二、三针)",
                            tags:['进口','16-26','3针次','默沙东'],
                            total:0,
                            price:"830",
                        },
                        {
                            drugCtg:"a1",
                            drugID:3,
                            drugName:"四价人乳头瘤病毒疫苗(只约第一针)",
                            tags:['进口','默沙东','9-45','3针次'],
                            total:0,
                            price:"830",
                        },
                        ,
                        {
                            drugCtg:"a1",
                            drugID:2,
                            drugName:"九价人乳头瘤病毒疫苗(只约第一针)",
                            tags:['进口','16-26','3针次','默沙东'],
                            total:0,
                            price:"1330",
                        },
                    ]

                }
            
        })
    }

    nav2order = (id)=>{
        // console.log(id)
        return ()=>{
            Taro.navigateTo({
                url: `/subpackB/date/index?id=${id}`,
            })
        }
    }

    onConfirm = () => {
        this.setState({
            isShow: false
        })
    }
    render(): React.ReactNode {
        return (
            <View>
                <AtCard
                    title={this.state.hospitalInfo.naem}
                >
                    <AtList>
                        <AtListItem
                            title='单位简介'
                            arrow='right'
                            iconInfo={{ size: 25, color: '#78A4FA', value: 'home', }}
                        />
                        <AtListItem
                            title='南宁市青秀区长福路6号'
                            arrow='right'
                            iconInfo={{ size: 25, color: '#78A4FA', value: 'map-pin', }}
                        />
                        <AtListItem
                            title='0771-4186171'
                            arrow='right'
                            iconInfo={{ size: 25, color: '#78A4FA', value: 'phone', }}
                        />
                    </AtList>
                </AtCard>
                <AtDivider>
                    <AtIcon value='chevron-up'></AtIcon>
                </AtDivider>

                {this.state.hospitalInfo.listOrder.map(item=>(
                    <View>
                        <AtCard
                            extra={`参考价:￥${item.price}`}
                            title={item.drugName}    
                        >
                            <View className="f-box">
                                <AtTag className="t-left"  circle active={true} size='small'>国产联合</AtTag>
                                <AtButton onClick={this.nav2order(item.drugID)} className="b-right" customStyle={"width:88px"} circle size="small" type='primary'>立即预约</AtButton>
                            </View>
                        </AtCard>
                    </View>
                ))}

                <View>
                    <AtCard 
                         extra='参考价:￥1330'
                        title={this.state.hospitalInfo.listOrder[0].drugName}
                    >
                        <View className="f-box">
                            <AtTag className="t-left"  circle active={true} size='small'>{this.state.hospitalInfo.listOrder[0].tags[0]}</AtTag>
                            <AtButton className="b-right" customStyle={"width:88px"} onClick={this.nav2order} circle size="small" type='primary'>立即预约</AtButton>
                            {/* <AtButton circle customStyle={"color:#ccc"} >暂未开始</AtButton> */}
                        </View>
                    </AtCard>
                </View>
                

                <AtModal isOpened={this.state.isShow}>
                    <AtModalHeader>单位公告</AtModalHeader>
                    <AtModalContent>
                        尊敬的女士：因本次疫苗少量到货，请您注意阅读完本次放苗公告:1、本次预约宫颈癌疫苗仅限第一针,四价宫颈癌疫苗不限制户籍,九价宫颈癌疫苗仅限本地户籍,所有符合接种年龄的均可预约;2、因预约系统在升级维护中,个别群众在预约时会出现“区域不匹配”为正常现象。出现此等情况者可等后续系统升级完毕再预约;3、为预体现公平公正原则,本次预约成功的女士们请带好身份证按时接种,预约成功未按照预约日期过来接种的则视为放弃本次预约!后边需重新在此平台预约,不接受电话预约和现场预约,预约成四功第1针的,后续第2、第3针次也需要重新在本平;4、疫苗接种时间为周一至周五上午8:00-11:20;下午14:30-17:00
                    </AtModalContent>
                    <AtModalAction> <Button onClick={this.onConfirm}>确定</Button> </AtModalAction>
                </AtModal>
            </View>
        )
    }
}