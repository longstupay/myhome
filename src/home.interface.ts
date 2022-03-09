
//res.data的数据结构
/**
 * -----hospital---
 * data:[
 *  {
 *  hspt_id:number;
 *  hspt_name:string;
 *  hspt_phone:string;
 *  hspt_notice:string;
 *  hspt_location:string;
 *  hspt_desc:string
 *  }
 * ]
 * 
 */
export interface hospitalInfo {
    hspt_id: number;
    hspt_name: string;
    hspt_phone: string;
    hspt_notice: string;
    hspt_location: string;
    hspt_desc: string
}
/**
 * ----drugInfo--------
 * drug_id:number;
 * drug_name:string;
 * drug_tag:string[];
 * drug_price:string;
 * drug_type:string;
 * drug_time:number
 */
export interface drugInfo {
    drug_id: number;
    drug_name: string;
    drug_tag: string[];
    drug_price: string;
    drug_type: string;
    drug_time: number;
}

export interface drugType {
    id:number;
    name:string;
}