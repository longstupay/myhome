import { Button, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { Component } from "react";

import { AtTag ,AtDivider ,AtModal, AtModalHeader, AtModalContent, AtModalAction, AtCard ,AtList, AtListItem, AtIcon, AtButton} from "taro-ui"

import './index.scss'

interface ModelHeadState {
    isShow: boolean;
    ModalText: string;
    hospitalInfo:InfoHospital;
    id:number;
}

interface InfoHospital {
    hspt_id: number;
    hspt_name: string;
    hspt_phone: string;
    hspt_notice: string;
    hspt_location: string;
    hspt_desc: string;
    hspt_total?:ListOrder[];

}

interface ListOrder {
    drug_id: number;
    drug_name: string;
    drug_tag: string[];
    drug_price: string;
    drug_type: string;
    drug_time: number;
    drug_total: number;
}

interface drugTag {

}

export default class OrderList extends Component<any, ModelHeadState> {
    constructor(porps: any) {
        super(porps)
        this.state = {
            isShow: true,
            ModalText: "",
            id:2,
            hospitalInfo:{
                hspt_id:1,
                hspt_name:'南宁市疾病控制中心',
                hspt_phone:'1231321',
                hspt_notice:'公对公刚刚',
                hspt_location:'位置位置',
                hspt_desc:'描述描述',
                hspt_total:[
                    {
                        drug_id: 1,
                        drug_name: '狂犬1',
                        drug_tag: ['国产', '进口'],
                        drug_price: '1800',
                        drug_type: '狂犬',
                        drug_time: 3,
                        drug_total:200,
                    },
                    {
                        drug_id: 2,
                        drug_name: '新冠1',
                        drug_tag: ['印度'],
                        drug_price: '10',
                        drug_type: '新冠',
                        drug_time: 2,
                        drug_total:500,
                    }
                ]
            }
        }
    }

    private $instance = Taro.getCurrentInstance()
    //根据id查找
    async componentDidMount() {
        const {id} = this.$instance.router.params
    
        const res = await Taro.request({
            url:`http://127.0.0.1:7001/hspt/byid/${id}`
        })
        console.log(res.data)
        this.setState({
            hospitalInfo:res.data
        })
    }

    nav2order = (item: ListOrder,local: string)=>{
        const {drug_name,drug_id,drug_total} = item;
        return ()=>{
            Taro.navigateTo({
                url: `/subpackB/date/index?name=${drug_name}&id=${drug_id}&total=${drug_total}&local=${local}`,
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
                    title={this.state.hospitalInfo.hspt_name}
                >
                    <AtList>
                        <AtListItem
                            title='单位简介'
                            arrow='right'
                            iconInfo={{ size: 25, color: '#78A4FA', value: 'home', }}
                        />
                        <AtListItem
                            title={this.state.hospitalInfo.hspt_location}
                            arrow='right'
                            iconInfo={{ size: 25, color: '#78A4FA', value: 'map-pin', }}
                        />
                        <AtListItem
                            title={this.state.hospitalInfo.hspt_phone}
                            arrow='right'
                            iconInfo={{ size: 25, color: '#78A4FA', value: 'phone', }}
                        />
                    </AtList>
                </AtCard>
                <AtDivider>
                    <AtIcon value='chevron-up'></AtIcon>
                </AtDivider>


                {this.state.hospitalInfo.hspt_total.map(item=>(
                    <View>
                        <AtCard
                            extra={`参考价:￥${item.drug_price}`}
                            title={item.drug_name}    
                        >
                            <View className="f-box">
                                <AtTag className="t-left"  circle active={true} size='small'>国产联合</AtTag>
                                <AtButton onClick={this.nav2order(item,this.state.hospitalInfo.hspt_name)} className="b-right" customStyle={"width:88px"} circle size="small" type='primary'>立即预约</AtButton>
                            </View>
                        </AtCard>
                    </View>
                ))}

               
                

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