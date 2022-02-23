import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import pdf from 'html-pdf';
import moment from 'moment';

export class Pdf {
    public async generate(data) {
        let template = path.join(__dirname, '../../files/templates/pdfs/' + data.template + '.hbs');
        let templateHTML = fs.readFileSync(template, 'utf8')
        let compileHTML = handlebars.compile(templateHTML);
        let html = await compileHTML(data);
        let fileName = moment().unix() + '.pdf';
        let filePath = path.join(__dirname, '../../files/templates/pdfs/');

        try {
            let createPDFHTML = await new Promise((resolve, reject) => {
                pdf.create(html).toFile(filePath + fileName, (err, res) => {
                    if (!err) {
                        resolve({ ok: true, fileName })
                    } else {
                        reject({ ok: false, err })
                    }
                })
            })
            return { ok: true, pdf: fs.readFileSync(filePath + fileName) };
        } catch (e) {
            return { ok: false, message: 'Error al momento de crear el PDF' }
        }
    }
}