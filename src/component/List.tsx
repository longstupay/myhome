import React from 'react'
import { View} from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"

import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/icon.scss";


interface hospitalInfo {
    name:string,
    phone:string
}
interface Iprops {
    defualtProps:hospitalInfo[]
}

class MyList extends React.Component<Iprops,any> {
    
    static defualtProps:Iprops[];

    render(): React.ReactNode {
        return (
            <View>
                {
                    this.props.defualtProps.map(item=>(
                        <AtList>
                            <AtListItem
                                title={item.name}
                                note={item.phone}
                                arrow='right'
                                thumb='https://web-1306059885.cos.ap-guangzhou.myqcloud.com/icon/icon-2.png'
                            />
                        </AtList>

                    ))
                }       
            </View>
        )
    }
}


export { MyList }
