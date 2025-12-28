import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

interface ContactData {
  name: string
  email: string
  phone: string
  message: string
}

export async function POST(req: Request) {
  try {
    const data: ContactData = await req.json()

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: "9ee3ca001@smtp-brevo.com",
        pass: process.env.BREVO_API_KEY,
      },
    })

    const htmlContent = `
      <div style="background-color: #f7fafc; padding: 40px 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          <div style="background-color: #2f855a; padding: 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 0.05em;">SAAL PHARMA</h1>
          </div>
          <div style="padding: 32px; color: #2d3748;">
            <h2 style="margin-top: 0; color: #2f855a; font-size: 20px; border-bottom: 2px solid #f0f4f8; padding-bottom: 12px;">New Contact Message</h2>
            
            <div style="margin: 24px 0; background-color: #f8fafc; padding: 20px; border-radius: 6px;">
              <p style="margin: 8px 0;"><strong style="color: #4a5568;">Name:</strong> ${data.name}</p>
              <p style="margin: 8px 0;"><strong style="color: #4a5568;">Email:</strong> <a href="mailto:${data.email}" style="color: #2f855a; text-decoration: none;">${data.email}</a></p>
              <p style="margin: 8px 0;"><strong style="color: #4a5568;">Phone:</strong> ${data.phone}</p>
            </div>

            <h3 style="font-size: 16px; text-transform: uppercase; letter-spacing: 0.05em; color: #718096; margin-bottom: 12px;">Message</h3>
            <div style="padding: 16px; background-color: #ffffff; border: 1px solid #edf2f7; border-radius: 6px; line-height: 1.6; color: #2d3748; white-space: pre-line;">
              ${data.message}
            </div>

            <div style="margin-top: 32px; padding-top: 24px; border-top: 2px solid #f0f4f8; font-size: 12px; color: #a0aec0; text-align: center;">
              <p>Sent via the SAAL Pharma website contact form.</p>
              <p>&copy; ${new Date().getFullYear()} SAAL Pharma. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    `

    await transporter.sendMail({
      from: `SAAL Pharma <no-reply@saalpharma.com>`,
      to: process.env.CONTACT_TO_EMAIL,
      subject: `New Contact Message — ${data.name}`,
      html: htmlContent,
      text: data.message,
      replyTo: {
        name: data.name,
        address: data.email,
      },
    })

    return NextResponse.json({ message: "Message sent successfully" })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Failed to send message", error }, { status: 500 })
  }
}
