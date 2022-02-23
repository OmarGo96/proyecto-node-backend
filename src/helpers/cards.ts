import Cryptr from '@gc-sistemas/encrypt'
import * as validator from 'validator'
import moment from 'moment'
export class Card {

    static cryptr = new Cryptr(process.env.CRYPTR_KEY)
    /** Función el cual nos ayuda a encriptar una tarjeta */
    public encrypt(data) {
        try {
            /** Obtenemos la información correspondiente de la tarjeta y encriptamos */
            let cardholder: string = Card.cryptr.encrypt(data.cardholder)
            let cn1: string = Card.cryptr.encrypt(data.cn1)
            let cn2: string = Card.cryptr.encrypt(data.cn2)
            let cn3: string = Card.cryptr.encrypt(data.cn3)
            let cn4: string = Card.cryptr.encrypt(data.cn4)
            let cvv: string = Card.cryptr.encrypt(data.cvv)
            let month: string = Card.cryptr.encrypt(data.month)
            let year: string = Card.cryptr.encrypt(data.year)

            let card = { cardholder, cn1, cn2, cn3, cn4, cvv, month, year }
            return { ok: true, card }
        } catch (e) {
            console.log('Error tarjetas a las: ' + moment().format('YYYY-MM-DD HH:mm:ss') + ', ' + e)
            return { ok: false, error: 'Existen problemas al momento de encriptar la tarjeta' }
        }
    }
    /** Función para desencriptar tarjetas */
    public decrypt(data) {
        try {
            /** Obtenemos la información correspondiente de la tarjeta y desencriptamos */
            /*  let cardholder: string = Card.cryptr.decrypt(data.cardholder)
                let cn1: string = Card.cryptr.decrypt(data.cn1)
                let cn2: string = Card.cryptr.decrypt(data.cn2)
                let cn3: string = Card.cryptr.decrypt(data.cn3)
            */
            let cn4: string = Card.cryptr.decrypt(data.cn4)
            /*  let cvv: number = Card.cryptr.decrypt(data.cvv) */
            let month: number = Card.cryptr.decrypt(data.month)
            let year: number = Card.cryptr.decrypt(data.year)

            let result = { /* cardholder, cn1, cn2, cn3, */ cn4, /* cvv, */ month, year }

            return { ok: true, card: result }
        } catch (e) {
            console.log(e)
            return { ok: false, error: 'Existen problemas al momento de desencriptar la tarjeta' }
        }
    }
    /** Función para validar que los datos de la tarjeta sean correctos */
    public validate(data) {
        let brands = ['VISA', 'MASTERCARD', 'AMEX', 'DISCOVER', 'DINERS']
        try {
            if (validator.isEmpty(data.cardholder) == true) {
                return { ok: false, error: 'Favor de proporcionar al tarjetahabiente' }
            }
            if (!brands.includes(data.brand)) {
                return { ok: false, error: 'Favor de proporcionar una marca de tarjeta existente' }
            }
            if (validator.isNumeric(data.cn1) == false) {
                return { ok: false, error: 'Favor de proporcionar el número de tarjeta' }
            }
            if (validator.isNumeric(data.cn2) == false) {
                return { ok: false, error: 'Favor de proporcionar el número de tarjeta' }
            }
            if (validator.isNumeric(data.cn3) == false) {
                return { ok: false, error: 'Favor de proporcionar el número de tarjeta' }
            }
            if (validator.isNumeric(data.cn4) == false) {
                return { ok: false, error: 'Favor de proporcionar el número de tarjeta' }
            }

            if (validator.isNumeric(data.month) == false) {
                return { ok: false, error: 'Favor de proporcionar el mes de expiración' }
            }

            if (validator.isNumeric(data.year) == false) {
                return { ok: false, error: 'Favor de proporcionar el año de expiración' }
            }

            if (validator.isNumeric(data.cvv) == false) {
                return { ok: false, error: 'Favor de proporcionar el código de seguirdad (cvv/cvc)' }
            }

            if (data.cn1.length != 4) {
                return { ok: false, error: 'Favor de proporcionar 4 dígitos para el campo cn1' }
            }

            if (data.cn2.length != 4) {
                return { ok: false, error: 'Favor de proporcionar 4 dígitos para el campo cn2' }
            }

            if (data.cn3.length != 4) {
                return { ok: false, error: 'Favor de proporcionar 4 dígitos para el campo cn3' }
            }

            if (data.cn4.length < 2 || data.cn4.length > 4) {
                return { ok: false, error: 'Favor de proporcionar 2, 3, 4 dígitos para el campo cn4' }
            }

            if (data.month.length != 2) {
                return { ok: false, error: 'Favor de proporcionar 2 dígistos para el campo mes' }
            }

            if (data.year.length != 4) {
                return { ok: false, error: 'Favor de proporcionar 4 dígistos para el campo año' }
            }

            if (data.cvv.length < 3 || data.cvv.length > 4) {
                return { ok: false, error: 'Favor de proporcionar 3 o 4 dígistos para el campo cvv / cvc' }
            }

            return { ok: true }
        } catch (e) {
            console.log(e)
            return { ok: false }
        }

    }
}
