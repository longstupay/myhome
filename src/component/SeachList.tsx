import Taro from "@tarojs/taro"
import { useEffect, useState } from "react"
import { AtListItem } from "taro-ui"

const SeachList=(porps:any,state:any)=>{
    const [list,setList] = useState([])
    const [seach,setSeach] = useState([])
    const [filterList,setFList] = useState([])
    async function Http(){
        const res = await Taro.request({
            url:"http://127.0.0.1:7001/hspt"
        })
        setList(res.data)
        const arr = res.data?.map((item)=>{
            return item.hspt_name
        })
        setSeach(arr)
    }
    useEffect(()=>{
        Http()
    },[])
    
    function filterArr(query){
        return seach.filter(function(el) {
            return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
        })
    }
    useEffect(()=>{
        const res = filterArr(porps.option.value);
        // console.log(res);
        const arr2= list.filter(item=>item.hspt_name==res);
        console.log(arr2)
        setFList(arr2)
    },[porps.option])
    const nav2sub =(id:number)=>{
        return ()=>{
            Taro.navigateTo({
                url: `/subpack/yuyue/index?id=${id}`,
            })
        }
    }

    if(filterList.length>0){
        return (<>
            {
                filterList.map((item)=>{
                    return <AtListItem
                            key={item.hspt_id}
                            title={item.hspt_name}
                            note={item.hspt_phone}
                            arrow='right'
                            thumb='https://web-1306059885.cos.ap-guangzhou.myqcloud.com/icon/icon-2.png'
                            onClick={nav2sub(item.hspt_id)}

                            />
                 })
            }
        </>)
    }
    return (
        <>
            {
                list.map((item)=>{
                    return <AtListItem
                            key={item.hspt_id}
                            title={item.hspt_name}
                            note={item.hspt_phone}
                            arrow='right'
                            thumb='https://web-1306059885.cos.ap-guangzhou.myqcloud.com/icon/icon-2.png'
                            onClick={nav2sub(item.hspt_id)}

                            />
                 })
            }
        </>
    )
}

export default SeachList