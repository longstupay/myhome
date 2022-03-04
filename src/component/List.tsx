import React from 'react'
import { View} from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"
import Taro from '@tarojs/taro';


interface hospitalInfo {
    name:string;
    phone:string;
    id:number;
}
interface Iprops {
    defualtProps:hospitalInfo[]
}

class MyList extends React.Component<Iprops,any> {
    
    static defualtProps:Iprops[];

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
                {
                    this.props.defualtProps.map(item=>(
                        <AtList>
                            <AtListItem
                                key={item.id}
                                title={item.name}
                                note={item.phone}
                                arrow='right'
                                thumb='https://web-1306059885.cos.ap-guangzhou.myqcloud.com/icon/icon-2.png'
                                onClick={this.nav2sub(item.id)}
                          
                            />
                        </AtList>

                    ))
                }       
            </View>
        )
    }
}


export { MyList }
