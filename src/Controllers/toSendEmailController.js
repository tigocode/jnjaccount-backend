const nodemailer = require("nodemailer");
const xl = require("excel4node");
const path = require("path");

const fs = require('fs');
const { promisify } = require('util');

const wb = new xl.Workbook();
const ws = wb.addWorksheet("REGISTER");

module.exports = {  
  async CreateRegister(request, response) {
    const { grupo, razao_social, nome_fantasia, cpf_cnpj, inscricao_estadual, 
      contribuinte_icms="", data_nascimento, endereco, numero, complemento, bairro, 
      cep, cidade, uf, telefone, telefone_celular, email, email_nfe } =  request.body;
     
      const register = [
      {
        grupo,
        razao_social,
        nome_fantasia,
        cpf_cnpj,
        inscricao_estadual,
        contribuinte_icms,
        data_nascimento,
        endereco,
        numero,
        complemento,
        bairro,
        cep,
        cidade,
        uf,
        telefone,
        telefone_celular,
        email,
        email_nfe
      }
    ];
    const headColumnName = [
      "grupo",
      "razao_social",
      "nome_fantasia",
      "cpf_cnpj",
      "inscricao_estadual",
      "contribuinte_icms",
      "data_nascimento",
      "endereco",
      "numero",
      "complemento",
      "bairro",
      "cep",
      "cidade",
      "uf",
      "telefone",
      "telefone_celular",
      "email",
      "email_nfe"
    ];

    let headColumnIndex = 1;
    headColumnName.forEach(heading => {
      ws.cell(1, headColumnIndex++).string(heading.toLocaleUpperCase());
    });

    let rowIndex = 2;
    register.forEach(increment => {
      let columnIndex = 1;
      Object.keys(increment).forEach(columnName => {
        ws.cell(rowIndex, columnIndex++).string(increment[columnName].toLocaleUpperCase());
      });
      rowIndex++;
    });

    wb.write(path.resolve(__dirname, "..", "..", "tmp", 'uploads', "FORMULARIO_DE_CADASTRO.xlsx"));
    
    const transporter = nodemailer.createTransport({
      host: process.env.HOT_SMTP,
      port: process.env.PORT_SMTP,
      secure: false,
      tls: {
        rejectUnauthorized: false
      },
      auth: {
        user: process.env.USER_SMTP,
        pass: process.env.PASSWORD_SMTP,
      }
    });
  
    const message = {
      from: user= process.env.USER_SMTP,
      to: user= process.env.USER_SMTP,
      replyTo: email,
      subject: `ACUVUE | Solicitação de Cadastro` + ` - ${nome_fantasia.toLocaleUpperCase()}`,
      attachments: [
        {
          filename: "FORMULARIO_DE_CADASTRO.xlsx",
          path: path.resolve(__dirname, "..", "..", "tmp", 'uploads', "FORMULARIO_DE_CADASTRO.xlsx")
        }
      ],
      html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>ACUVUE - Solicitação de Cadastro</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@700&family=Inter:wght@700&family=Poppins&display=swap');

              table {
                font-family: 'Archivo', sans-serif;
                font-family: 'Inter', sans-serif;
                font-family: 'Poppins', sans-serif;
              }     
            </style>
          </head>
          <body style="margin: 0; padding: 0;">
           <table border="0" cellspacing="0" cellpadding="0" width="100%">
            <tr>
              <td>
                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="border-collapse: collapse;">
                  <tr>
                    <td bgcolor="#00539B" height="66.66" style="padding: 0px 0px 0px 505px;">
                      <img src="./assets/logoAcuvue.svg" alt="logo Acuvue" style="width: 74px; height: 16.94px;">
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#00539B" height="26.66" style="padding: 0px 0px 6px 62px;">
                      <p style="width: 284px; height: 24px; font-family: 'Archivo';
                      font-style: normal; font-weight: 700; font-size: 17px; line-height: 42px;
                      color: #FFFFFF;">Solicitação de Cadastro - ACUVUE.</p>
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#E3E3E4" height="216.66">
                      <table align="center" border="0" cellspacing="0" cellpadding="0" width="528.19" height="208.41" style="border-collapse: collapse;">
                        <tr>
                          <td bgcolor="#FFFFFF" style="border-radius: 8px; background: #FFFFFF;">
                            <p style="font-family: 'Inter'; font-style: normal; font-weight: 700;
                            font-size: 22px; line-height: 27px; text-align: center; text-transform: uppercase;
                            color: #1B57B0;">
                              olá recebemos uma solicitação de cadastro, vamos conferir?
                            </p>
                          </td>       
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
           </table>
          </body>
        </html>
      `,
    };  

    transporter.sendMail(message, function(error) {
      if (error) {
        response.status(400).json({
          message: "Erro: E-mail não enviado com sucesso!!"
        })
      }
    });

    promisify(fs.unlink)(path.resolve(__dirname, "..", "..", "tmp", 'uploads', "FORMULARIO_DE_CADASTRO.xlsx"));
    return response.status(201).send();
  }  
}