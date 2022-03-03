import React from 'react'
import { AtFloatLayout, AtGrid } from "taro-ui"
import { AtButton } from 'taro-ui'

import "taro-ui/dist/style/components/float-layout.scss";
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/loading.scss";
import "./component.scss"
import "taro-ui/dist/style/components/grid.scss";


interface ILayoutProps {
    defaultProps: boolean
}

class FloatList extends React.Component<ILayoutProps, any> {

    constructor(props: ILayoutProps) {
        super(props)
        console.log(props.defaultProps)
    }


    topLayou = (node: any) => {
        // this.showLayout
    }
    handleClose = () => {

    }

    render(): React.ReactNode {
        return (
            <AtFloatLayout isOpened={this.props.defaultProps}  onClose={this.handleClose}>
                <AtGrid mode='rect' hasBorder={false} data={
                    [
                        {
                            value: '全部'
                        },
                        {
                            value: 'HPV疫苗'
                        },
                        {
                            value: '轮状疫苗'
                        },
                        {
                            value: '狂犬病疫苗'
                        },
                        {
                            value: '流感疫苗'
                        },
                        {
                            value: '乙肝疫苗'
                        },
                        {
                            value: '白百破疫苗'
                        },
                        {
                            value: '出血热疫苗'
                        },
                        {
                            value: '破伤风疫苗'
                        },
                        {
                            value: '森林脑炎疫苗'
                        },
                        {
                            value: '脊灰疫苗'
                        },
                        {
                            value: '新冠疫苗'
                        },
                        {
                            value: '肺炎疫苗'
                        },
                        {
                            value: '流脑疫苗'
                        },
                        {
                            value: '水痘疫苗'
                        },
                        {
                            value: '手足口病疫苗'
                        }
                    ]
                } />
            </AtFloatLayout>
        )
    }
}

export { FloatList }