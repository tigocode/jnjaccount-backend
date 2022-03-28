const nodemailer = require("nodemailer");

module.exports = {
  async ToSendClientConfirm(request, response) {
    const { email } = request.body;

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
    const messageClient = {
      from: user= process.env.USER_SMTP,
      to: email,
      replyTo: user=process.env.USER_SMTP,
      subject: "ACUVUE | Solicitação de Cadastro",
      html: `
         <p>Teste</p>
      `,
    };
    
    transporter.sendMail(messageClient, function(error) {
      if (error) {
        response.status(400).json({
          message: "Erro: E-mail não enviado com sucesso!!"
        })
      }
    });
    
    return response.status(201).send();
  }
}