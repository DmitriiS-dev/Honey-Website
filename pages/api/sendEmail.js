import nodemailer from 'nodemailer';

// Create a transporter using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

export default async function handler(req, res) {
  //helps determine where the email will be sent:
  const {action, details} = req.body
  let mailOptions;


  if (req.method === 'POST' && action === "Validation Code") {
    const { name, email, verificationCode } = details;

    if (!name || !email || !verificationCode) {
      const missingFields = [];
      if (!name) missingFields.push('name');
      if (!email) missingFields.push('email');
      if (!verificationCode) missingFields.push('verificationCode');
      const errorMessage = `Missing required fields: ${missingFields.join(', ')}`;
      console.error(errorMessage); // Log the error message
      return res.status(400).json({ error: errorMessage });
    }

    mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Verification Code',
      text: `Your verification code is: ${verificationCode}`,
      html: `<h2>Hi ${name},</h2>
            <h2>Here is your 6 digit code:</h2>
            <h1>${verificationCode}</h1>
            `
    };

    
  }

  //Confimation Email to the user: 
  else if(req.method === 'POST' && action === "Confirmation"){

    let email = details[0].email;

    let userProducts = details[1];

    let totalPrice = details[2];


    let productsHtml = '';
    for (let i = 0; i < userProducts.length; i++) {
      productsHtml += `
        <h3>Product Name: ${userProducts[i].product_name}</h3>
        <h3>Quantity: ${userProducts[i].quantity}</h3>
        <h3>Pickup Location: ${userProducts[i].location}</h3>
        <br>
      `;
    }

    mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Honey reservation',
      text: `Reservation details: `,
      html: `<h2>Products reserved:</h2>
            <h3>Products Reserved: </h3>
            ${productsHtml}
            <h3>Total Price: £${totalPrice}</h3>
            <h3>The beekeeper will get in touch with you shortly</h3>
            `
    };
    
  }
  //Email to myself in order to know what the user has reserved
  else if(req.method === 'POST' && action === "Own Email"){
    //DataToSend Obejct: [{name,email,}, [{product_name, quantity, location}, ...], totalPrice ]
    let name = details[0].name;
    let email = details[0].email;

    let userProducts = details[1];

    let totalPrice = details[2];


    let productsHtml = '';
    for (let i = 0; i < userProducts.length; i++) {
      productsHtml += `
        <h3>Product Name: ${userProducts[i].product_name}</h3>
        <h3>Quantity: ${userProducts[i].quantity}</h3>
        <h3>Location: ${userProducts[i].location}</h3>
        <br>
      `;
    }

    mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: process.env.EMAIL_USERNAME,
      subject: 'Reservation Made',
      text: `Reservation details: `,
      html: `<h2>Reservation that was made by ${name}:</h2>
            <h3>Customer Email: ${email}</h3>
            <h3>Products Ordered: </h3>
            ${productsHtml}
            <h3>Total Price: £${totalPrice}</h3>
            `
    };
    
  }
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }

  try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
      const errorMessage = 'An error occurred while sending the email';
      console.error(errorMessage, error);
      return res.status(500).json({ error: errorMessage });
  }
  
}


