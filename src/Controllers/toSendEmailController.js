const nodemailer = require("nodemailer");
const xl = require("excel4node");
const path = require("path");

const fs = require('fs')
const { promisify } = require('util')

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
        ws.cell(rowIndex, columnIndex++).string(increment[columnName]);
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
      subject: "ACUVUE | Solicitação de Cadastro",
      attachments: [
        {
          filename: "FORMULARIO_DE_CADASTRO.xlsx",
          path: path.resolve(__dirname, "..", "..", "tmp", 'uploads', "FORMULARIO_DE_CADASTRO.xlsx")
        }
      ],
      html: `<p>Olá ${nome_fantasia} esse e-mail é apenas um teste, por favor não responde!</p>`,
    };
  
    transporter.sendMail(message, function(error) {
      if (error) {
        response.status(400).json({
          message: "Erro: E-mail não enviado com sucesso!!"
        })
      }
    });

    promisify(fs.unlink(path.resolve(__dirname, "..", "..", "tmp", 'uploads', "FORMULARIO_DE_CADASTRO.xlsx")))
    return response.status(201).send();
  }  
}