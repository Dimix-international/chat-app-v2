import icon1 from '../assets/users/1.png'
import icon2 from '../assets/users/2.png'
import icon3 from '../assets/users/3.png'
import icon4 from '../assets/users/4.png'
import icon5 from '../assets/users/5.png'
import icon6 from '../assets/users/6.png'
import icon7 from '../assets/users/7.png'
import icon8 from '../assets/users/8.png'


export const giveAvatar = (avatar:string) => {
    switch (avatar) {
        case "1.png": {
            return icon1
        }
        case "2.png": {
            return icon2
        }
        case "3.png": {
            return icon3
        }
        case "4.png": {
            return icon4
        }
        case "5.png": {
            return icon5
        }
        case "6.png": {
            return icon6
        }
        case "7.png": {
            return icon7
        }
        case "8.png": {
            return icon8
        }
        default: return icon1
    }
}
