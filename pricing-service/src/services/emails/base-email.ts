const wrapBaseEmail = ({ html }: { html: string }) => {
  return `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>
              Your email from Nimo Industries
          </title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                "Helvetica Neue", Ubuntu, sans-serif;
              background-color: #f6f6f6;
              margin: 0;
              padding: 0;
              color: #525f7f;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
    
            .footer {
              font-size: 12px;
              color: #525f7f;
              margin-top: 20px;
            }
    
            .a {
              color: #6772e5;
              text-decoration: none;
            }
    
            .divider {
              border-top: 1px solid #e0e6ed;
              height: 1px;
            }
    
            .button {
              background-color: #6772e5 !important;
              color: white !important;
              padding: 10px 20px !important;
              text-decoration: none !important;
              border-radius: 5px !important;
              display: inline-block !important;
            }
          </style>
        </head>
        <body>
          <table
            role="presentation"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
          >
            <tr>
              <td style="padding: 40px 0; background-color: #f6f6f6" align="center">
                <table
                  role="presentation"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="600"
                  style="
                    max-width: 600px;
                    width: 100%;
                    background-color: #ffffff;
                    padding: 40px;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  "
                >
                  <tr>
                    <td style="padding-bottom: 10px">
                      <a href="https://nimoindustries.com/" >
                        <img
                          src="https://nimoindustries.com/wp-content/uploads/2020/05/Nimo-industries.svg"
                          alt="Company Logo"
                          style="max-width: 140px"
                        />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td 
                        class="divider"
                    ></td>
                  </tr>
    
                  ${html}

                  <td>
                    <p>
                       You are receiving this email because you have an account with Nimo Industries. 
                        <a
                        href="https://support.stripe.com/"
                        style="display: inline-block"
                        >Visit our support site</a
                        >
                        if you have questions or need help.
                    </p>
                  </td>
                  
                  <tr>
                    <td 
                        class="divider"
                    ></td>
                  </tr>
                  <tr>
                    <td class="footer">
                      <p>
                        Stripe, 354 Oyster Point Blvd, South San Francisco, CA 94080
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>`;
};

export default wrapBaseEmail;
