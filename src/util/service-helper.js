import {getMerchantListURL} from './service-url';
import axios from 'axios';

const getMerchantList = () => {
    return axios.get(getMerchantListURL);
}

export {
    getMerchantList
}