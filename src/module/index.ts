import Taro from "@tarojs/taro"

async function getUserInfo(){
    //查询缓存的手机号
    try {
        var value = Taro.getStorageSync('phone')
        // console.log(value)
        if (value) {
            //根据token向服务端身份验证
            const res = await Taro.request({
                url: "http://127.0.0.1:7001/passport/jwt",
                method: "POST",
                header: {
                    Authorization: 'Bearer ' + value
                }
            })
            console.log(res)
            //服务端查不到token
            if (res.statusCode >= 400) {
                return {
                    code: res.statusCode
                }
            }
            console.log(res.data.phone)
            //根据登录手机查询信息
            const info = await Taro.request({
                url: "http://127.0.0.1:7001/user/phone/" + res.data.phone
            })
            if (info.statusCode >= 400) {
                return {
                    code: info.statusCode
                }
            }
            // console.log(info)
            return info.data

        }else{
            console.log('未登录');
            return {
                code:404
            }
        }
      } catch (e) {
        // Do something when catch error
        throw e
      }
}

export {
    getUserInfo
}