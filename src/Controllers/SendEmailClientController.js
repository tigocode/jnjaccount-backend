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
      <!DOCTYPE svg PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
            width: 484px;
            height: 24px;
            margin: 6px 0 0 60px;
      
            font-family: 'Archivo';
            font-style: normal;
            font-weight: 700;
            font-size: 14px;
            line-height: 18px;
      
            color: #FFFFFF;
          }
      
          .topo h3 {
            width: 204px;
            height: 24px;
            margin: 2px 0 0 60px;
      
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 400;
            font-size: 8px;
            line-height: 15px;
      
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
          .content-data strong {
            width: 56px;
            height: 8px;
            margin: 39px 0 0 18px;
            display: block;
      
            font-family: 'Archivo';
            font-style: normal;
            font-weight: 700;
            font-size: 18px;
            line-height: 8px;
      
            color: #4C4766;
          }
          .content-data span {
            width: 52px;
            height: 10px;
      
            font-family: 'Inter';
            font-style: normal;
            font-weight: 700;
            font-size: 7px;
            line-height: 10px;
            
            color: #C4C4C4;
          }    
          .content-data #one {
            margin: 37.58px 0 0 2.81px;
            color: #00DA6D;
          }
          .content-data #two {
            margin: 0px 0 0 69px;
            color: #00DA6D;
          }
          .content-data #three {
            margin: 0px 0 0 72px;    
            color: #C4C4C4;
          }
          .content-data #for {
            margin: 0px 0 0 60px;
            color: #C4C4C4;
          }
          .stat {
            padding: 28px 0 12px 22px;
          }
          .line {
            display: flex;
            margin-left: 40px;
            padding-top: 5px;;
          }
          .line2 {
            width: 418px;
            height: 2.26px;
      
            background: #C4C4C4;
            border: 1px solid #C4C4C4;
          }
          .create {
            width: 9.5px;
            height: 9.5px;
      
            background: #00DA6D;
            border-radius: 50%;
          }
          .hover-create {
            width: 110px;
            height: 3px;
            margin-top: 3.5px;
            margin-left: 0px;
      
            background: #00DA6D;
            border: 1px solid #00DA6D;
          }
          .analysis {
            width: 9.5px;
            height: 9.5px;
      
            background: #FFFFFF;
            border: 3px solid #00DA6D;
            border-radius: 50%;
          }
          .hover-analysis {
            width: 130px;
            height: 3px;
            margin-top: 3.5px;
            margin-left: 0px;
      
            background: #C4C4C4;
            border: 1px solid #C4C4C4;
          }
          .register {
            width: 9.5px;
            height: 9.5px;
      
            background: #FFFFFF;
            border: 3px solid #C4C4C4;
            border-radius: 50%;
          }
          .hover-register {
            width: 140px;
            height: 3px;
            margin-top: 3.5px;
            margin-left: 0px;
      
            background: #C4C4C4;
            border: 1px solid #C4C4C4;
          }
          .training {
            width: 9.5px;
            height: 9.5px;
      
            background: #FFFFFF;
            border: 3px solid #C4C4C4;
            border-radius: 50%;
          }
        </style>
      </head>
      <body>
        <div class="content">
          <header>
            <div class="topo">
              <img src="https://tigocode.s3.amazonaws.com/logo.png" alt="Logo ACUVUE!">
              <h1>Fique atento as etapas do seu cadastro - ACUVUE.</h1>
              <h3>Bem-vindo a rede de empresas credenciadas para trabalhar com Lentes de Contato.</h3> 
            </div>
          </header>
          <div class="content-data">
            <strong>Status</strong>
            <div class="stat">
              <span id="one">EM CRIAÇÃO</span>      
              <span id="two">EM ANÁLISE</span>      
              <span id="three">CADASTRO FINALIZADO</span>
              <span id="for">AGENDE TREINAMENTO</span>
            </div>
            <div class="line">
              <div class="create"></div>
              <div class="hover-create"></div>
              <div class="analysis"></div>
              <div class="hover-analysis"></div>
              <div class="register"></div>
              <div class="hover-register"></div>
              <div class="training"></div>
            </div>
          </div>
          </div>
        </div>
      </body>
      </html>
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