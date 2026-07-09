import { IPayLoad } from "./orders.interface"

const createOrder = async(payLoad : IPayLoad)=>{
    const {gearId, endDate} = payLoad;


}

export const orderServices = {
    createOrder
}