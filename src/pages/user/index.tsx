import React from "react";
import { Text, Picker, View } from '@tarojs/components'
import { AtNavBar, AtForm, AtInput, AtButton, AtList, AtListItem } from 'taro-ui'
import Taro from '@tarojs/taro'

import "./index.scss"
interface userState {
    inputvalue: string
    selector: string[],
    selectorChecked: string,
    dateSel: string
    idcar: string
    phone: string
    selectorSex: string[]
    selectorSexChecked: string
}

export default class User extends React.Component<any, userState> {

    constructor(props: any) {
        super(props)
        this.state = {
            inputvalue: "",
            selector: ['身份证', '护照', '港澳证件', '台胞证'],
            selectorSex: ['男', '女'],
            selectorChecked: '身份证',
            dateSel: '2018-04-22',
            idcar: "",
            phone: "",
            selectorSexChecked: "男"
        }
    }

    handleClick = () => {
        Taro.navigateTo({
            url: 'index?id=1'
        })
    }

    handleChange(value) {
        this.setState({

        })
    }
    onSubmit(event) {
        console.log(this.state.inputvalue)
    }

    onChange = e => {
        this.setState({
            selectorChecked: this.state.selector[e.detail.value]
        })
    }
    onDateChange = e => {
        this.setState({
            dateSel: e.detail.value
        })
    }

    onChangeSex = e => {
        this.setState({
            selectorSexChecked: this.state.selectorSex[e.detail.value]
        })
    }

    render(): React.ReactNode {


        return (

            <View>
                <AtNavBar
                    onClickLeftIcon={this.handleClick}
                    color='#000'
                    title='个人信息'
                    leftText='返回'

                />

                <AtForm
                    onSubmit={this.onSubmit.bind(this)}
                >
                    <AtInput
                        required={true}
                        name='value'
                        title='姓名'
                        type='text'
                        placeholder='请输入姓名'
                        value={this.state.inputvalue}
                        onChange={this.handleChange.bind(this, 'value')}
                    />

                    <AtInput
                        required={true}
                        name='value6'
                        border={false}
                        title='手机号码'
                        type='phone'
                        placeholder='手机号码'
                        value={this.state.phone}
                        onChange={this.handleChange.bind(this)}
                    />
                    <View className='container'>
                        <View className='page-body'>
                            <View className='page-section'>
                                <View>
                                    <Picker mode='selector' range={this.state.selectorSex} onChange={this.onChangeSex}>
                                        <AtList>
                                            <AtListItem
                                                title='性别'
                                                extraText={this.state.selectorSexChecked}
                                            />
                                        </AtList>
                                    </Picker>
                                </View>
                            </View>
                            <View className='page-section'>
                                <View>
                                    <Picker mode='selector' range={this.state.selector} onChange={this.onChange}>
                                        <AtList>
                                            <AtListItem
                                                title='证件类型'
                                                extraText={this.state.selectorChecked}
                                            />
                                        </AtList>
                                    </Picker>

                                    <AtInput
                                        required={true}
                                        name='value4'
                                        title='证件号码'
                                        type='idcard'
                                        placeholder='请输入证件号码'
                                        value={this.state.idcar}
                                        onChange={this.handleChange.bind(this)}
                                    />
                                </View>
                            </View>

                            <View className='page-section'>
                                <View>
                                    <Picker value="" mode='date' onChange={(e) => this.onDateChange(e)}>
                                        <AtList>
                                            <AtListItem title='生日' extraText={this.state.dateSel} />
                                        </AtList>
                                    </Picker>
                                </View>
                            </View>
                        </View>
                    </View>

                    <AtButton className="btn-form" type='primary' circle formType='submit'>提交</AtButton>
                </AtForm>
            </View>





        )
    }
}