import React from 'react'
import { View} from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"
import Taro from '@tarojs/taro';
import Http from "../utils/HTTP"
import { hospitalInfo } from '../home.interface';
import { BASE_URL } from '../config/config';



class MyList extends React.Component<any,any> {
    
    constructor(props:any){
        super(props)
        this.state={
            typeid: 0
        }
    }

    nav2sub =(id:number)=>{
        return ()=>{
            Taro.navigateTo({
                url: `/subpack/yuyue/index?id=${id}`,
            })
        }
    }

    render(): React.ReactNode {
        
        
        return (
            <View>
                <AtList>
                    { this.state.typeid!==0?
                        <Http.Get
                            url={`${BASE_URL}`+`hspt/total/id?type_id=${this.state.typeid}`}
                            // url='http://127.0.0.1:7001/hspt'
                            delay={100}
                            loading={
                                <AtListItem
                                    title='南宁市疾病预防控制中心(门诊部)'
                                    note='0771=5672212 暂停服务'
                                    arrow='right'
                                    thumb='https://web-1306059885.cos.ap-guangzhou.myqcloud.com/icon/icon-2.png'
                                />
                            }
                        >
                            {
                                (data?: hospitalInfo[]) => {
                                    return data.map(item => (
                                        <AtListItem
                                            key={item.hspt_id}
                                            title={item.hspt_name}
                                            note={item.hspt_phone}
                                            arrow='right'
                                            thumb='https://web-1306059885.cos.ap-guangzhou.myqcloud.com/icon/icon-2.png'
                                            onClick={this.nav2sub(item.hspt_id)}

                                        />
                                    ))
                                }
                            }
                        </Http.Get>:
                            <Http.Get
                                url={`${BASE_URL}`+'hspt/'}
                                // url='http://127.0.0.1:7001/hspt'
                                delay={100}
                                loading={
                                    <AtListItem
                                        title='南宁市疾病预防控制中心(门诊部)'
                                        note='0771=5672212 暂停服务'
                                        arrow='right'
                                        thumb='https://web-1306059885.cos.ap-guangzhou.myqcloud.com/icon/icon-2.png'
                                    />
                                }
                            >
                                {
                                    (data?: hospitalInfo[]) => {
                                        return data.map(item => (
                                            <AtListItem
                                                key={item.hspt_id}
                                                title={item.hspt_name}
                                                note={item.hspt_phone}
                                                arrow='right'
                                                thumb='https://web-1306059885.cos.ap-guangzhou.myqcloud.com/icon/icon-2.png'
                                                onClick={this.nav2sub(item.hspt_id)}

                                            />
                                        ))
                                    }
                                }
                            </Http.Get>
                    
                    }
                    
                </AtList>
                
            </View>
        )
    }
}


export { MyList }
