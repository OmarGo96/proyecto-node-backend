import { Response, Request } from 'express'
import { JsonResponse } from '../enums/jsonResponse'
import { Crypto } from '../helpers/crypto'
import { Pdf } from '../helpers/pdf'

export class ExampleController {
    static crypto: Crypto = new Crypto()
    static pdf: Pdf = new Pdf()

    public async example(req: Request, res: Response) {
        return res.status(200).json({
            ok: true,
            message: 'Hola mundo, Soy un ejemplo!'
        })
    }

    public async users(req: Request, res: Response) {
        return res.status(JsonResponse.OK).json({
            ok: true,
            users: [
                { 'name': 'Xavier', 'password': 'Xavier123--' },
                { 'name': 'Peter', 'password': 'Peter123--' },
                { 'name': 'María', 'password': 'Maria123--' },
                { 'name': 'Jhon', 'password': 'Jhon123--' },
                { 'name': 'Adele', 'password': 'Adele123--' },
            ]
        })
    }

    public async encrypt(req: Request, res: Response) {
        let body = req.body

        let result = await ExampleController.crypto.encryptInformation(body)

        return res.status(200).json({
            ok: true,
            result
        })
    }

    public async decrypt(req: Request, res: Response) {
        let body = req.body
        let key = body.key
        let data = body.data

        let result = await ExampleController.crypto.decryptInformation(key, data)

        return res.status(200).json({
            ok: true,
            data: result.data.data
        })
    }

    public async pdf(req: Request, res: Response) {
        let body = req.body

        let template = body.template
        let name = body.name

        let result = await ExampleController.pdf.generate({
            template, name
        })

        return res.status(200).contentType('application/pdf').send(result.pdf)
    }
}