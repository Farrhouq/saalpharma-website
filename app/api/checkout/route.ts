import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

interface Product {
  name: string
  quantity: number
}

interface OrderData {
  name: string
  email: string
  phone: string
  address: string
  products: Product[]
}

export async function POST(req: Request) {
  try {
    const data: OrderData = await req.json()

    // Brevo SMTP transporter
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: "9ee3ca001@smtp-brevo.com",
        pass: process.env.BREVO_API_KEY,
      },
    })

    // Create HTML table for products
    const productsHtml = data.products
      .map(
        (p) =>
          `<tr>
            <td style="padding: 12px; border-bottom: 1px solid #edf2f7; color: #2d3748;">${p.name}</td>
            <td style="padding: 12px; border-bottom: 1px solid #edf2f7; text-align: center; color: #2d3748;">${p.quantity}</td>
          </tr>`,
      )
      .join("")

    const htmlContent = `
      <div style="background-color: #f7fafc; padding: 40px 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          <div style="background-color: #2f855a; padding: 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 0.05em;">SAAL PHARMA</h1>
          </div>
          <div style="padding: 32px; color: #2d3748;">
            <h2 style="margin-top: 0; color: #2f855a; font-size: 20px; border-bottom: 2px solid #f0f4f8; padding-bottom: 12px;">New Order Received</h2>
            
            <div style="margin: 24px 0;">
              <p style="margin: 8px 0;"><strong style="color: #4a5568;">Customer:</strong> ${data.name}</p>
              <p style="margin: 8px 0;"><strong style="color: #4a5568;">Email:</strong> <a href="mailto:${data.email}" style="color: #2f855a; text-decoration: none;">${data.email}</a></p>
              <p style="margin: 8px 0;"><strong style="color: #4a5568;">Phone:</strong> ${data.phone}</p>
              <p style="margin: 8px 0;"><strong style="color: #4a5568;">Address:</strong><br/><span style="color: #718096; line-height: 1.5;">${data.address}</span></p>
            </div>

            <h3 style="font-size: 16px; text-transform: uppercase; letter-spacing: 0.05em; color: #718096; margin-bottom: 12px;">Order Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background-color: #f8fafc;">
                  <th style="padding: 12px; border-bottom: 2px solid #edf2f7; text-align: left; color: #4a5568;">Product</th>
                  <th style="padding: 12px; border-bottom: 2px solid #edf2f7; text-align: center; color: #4a5568; width: 80px;">Qty</th>
                </tr>
              </thead>
              <tbody>
                ${productsHtml}
              </tbody>
            </table>

            <div style="margin-top: 32px; padding-top: 24px; border-top: 2px solid #f0f4f8; font-size: 12px; color: #a0aec0; text-align: center;">
              <p>This order was placed through the SAAL Pharma website.</p>
              <p>&copy; ${new Date().getFullYear()} SAAL Pharma. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    `

    // Email options
    const mailOptions = {
      from: `SAAL Pharma Orders <no-reply@saalpharma.com>`,
      to: process.env.ORDER_TO_EMAIL,
      subject: `New Order from Website: ${data.name}`,
      html: htmlContent,
      text: `New order received from ${data.name}. Check the website for details.`,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: "Order email sent successfully" })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Failed to send order email", error }, { status: 500 })
  }
}
