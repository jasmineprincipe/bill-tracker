import {getMerchantListURL} from './service-url';
import {getBillListURL} from './service-url';
import axios from 'axios';

const getMerchantList = () => {
    return axios.get(getMerchantListURL);
}

export {
    getMerchantList
}

const getBillList = () => {
    return axios.get(getBillListURL);
}

export {
    getBillList
}