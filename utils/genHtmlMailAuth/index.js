function genHtmlMailAuth(linkAuth, name) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>EduHub</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Barlow&family=Jost:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
            .container {
                max-width: 500px;
                margin: auto;
                font-family: "Barlow", sans-serif;
                font-weight: 400;
                font-style: normal;
            }
            p {
                display: block;
                margin: 13px 0;
            }
            .btn {
                color: #fff;
                display: inline-block;
                padding: 12px 24px 10px;
                text-decoration: none;
                background-color: #ea4a40;
                font-weight: 600;
                border-radius: 4px;
            }
            .footer {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-top: 32px;
            }
            .email {
                text-decoration: none;
                font-weight: 600;
            }
            p {
                font-weight: 600;
            } 
            .contact i {
                margin: 0 12px;
                font-size: 24px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Hello ${name}!</h1>
            <h2>Thank you for signing up and welcome to EduHub!</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation 
                ullamco laboris nisi ut aliquip ex ea commodo 
                consequat.</p>
            <p>
                Vui lòng xác nhận địa chỉ email của bạn bằng cách nhấp vào nút dưới đây
            </p>
            <a href="${linkAuth}" class="btn">
                XÁC NHẬN
            </a>
            <div class="footer">
                <span>Have questions or need help? Email us at <a class="email" href="mailto:eduhub.ptit@gmail.com">eduhub.ptit@gmail.com</a></span>
            </div>
        </div>
    </body>
    </html>`
}

module.exports = {
    genHtmlMailAuth
}