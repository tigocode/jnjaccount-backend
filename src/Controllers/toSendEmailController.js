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

          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@700&family=Inter:wght@700&family=Poppins&display=swap" rel="stylesheet">
          <style type="text/css">    
            * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            }
            body {
                width: 100vw;
            
              font-family: 'Archivo', sans-serif;
              font-family: 'Inter', sans-serif;
              font-family: 'Poppins', sans-serif;
            }
            .content {
              width: 600px;
              height: 348.75px;
            
              background: #F0F0F7;
            }
            .topo {
              width: 600px;
                height: 113.33px;
            
              background: #00539B;
            }
            .topo img {
              width: 74px;
              height: 16.94px;
              margin: 27px 0 0 493px;
            }
            .topo h1 {
              width: 384px;
              height: 24px;
                padding: 0 0 0 86px;
            
              font-family: 'Archivo';
              font-style: normal;
              font-weight: 700;
              font-size: 17px;
                line-height: 42px;
            
              color: #FFFFFF;
            }
            .content-data {
              width: 514px;
              height: 208.41px;
                margin: 8px 0 0 43px;
            
              background: #FFFFFF;
              border: 1px solid #C4C4C4;
              border-radius: 8px;
            }
            .content-data p {
              width: 455px;
              height: 59px;
                padding: 74.41px 0 0 47.62px;
            
              font-family: 'Archivo';
              font-style: normal;
              font-weight: 700;
              font-size: 22px;
              line-height: 32px;
              text-align: center;
                text-transform: uppercase;
            
              color: #1B57B0;
            }
          </style>
        </head>
        <body>
          <div class="content">
            <header>
              <div class="topo">
                <img src="https://tigocode.s3.amazonaws.com/logoAcuvue.svg" alt="Logo ACUVUE!">
                <h1>Solicitação de Cadastro - ACUVUE.</h1>
              </div>
            </header>
            <div class="content-data">
              <p>olá recebemos uma solicitação de cadastro, vamos conferir?</p>
            </div>
          </div>
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