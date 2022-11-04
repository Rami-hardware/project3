import img from './media/marbella.png';

//import API's  
import { getCountyName } from './js/geoAPI'
import { getWeather } from './js/weatherAPI'
import { getImg } from './js/pixAPI'
import { Cal } from './js/app'
 // import all the styles all styles must bee scss
import "./style/styles.scss"
import "./style/grid.scss"
// export the functionlty 
export {
    getCountyName ,
    getWeather,
    getImg,
    Cal
}
