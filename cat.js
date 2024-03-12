import axios from 'axios'
import {config} from './config.js'

export const getCat = async () => {
    try {
        const {data} = await axios.get(config.catUrl)
        console.log(data[0].url)
        return data[0].url
    } catch(err) {
        console.log(err)
        return 'Произошла ошибка'
    }
}