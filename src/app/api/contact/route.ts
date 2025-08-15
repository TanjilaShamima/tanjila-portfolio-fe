import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

// Email configuration
const EMAIL_CONFIG = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
    },
};

// Recipient email
const RECIPIENT_EMAIL =  'tanjila.shamima.swe@gmail.com';

export async function POST(request: NextRequest) {
    try {
        const body: ContactFormData = await request.json();

        // Validate request body
        if (!body.name || !body.email || !body.subject || !body.message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Validate field lengths
        if (body.name.trim().length < 2) {
            return NextResponse.json(
                { error: 'Name must be at least 2 characters long' },
                { status: 400 }
            );
        }

        if (body.subject.trim().length < 5) {
            return NextResponse.json(
                { error: 'Subject must be at least 5 characters long' },
                { status: 400 }
            );
        }

        if (body.message.trim().length < 10) {
            return NextResponse.json(
                { error: 'Message must be at least 10 characters long' },
                { status: 400 }
            );
        }

        // Create transporter
        const transporter = nodemailer.createTransport(EMAIL_CONFIG);

        // Email content
        const mailOptions = {
            from: `"Portfolio Contact Form" <${EMAIL_CONFIG.auth.user}>`,
            to: RECIPIENT_EMAIL,
            replyTo: body.email,
            subject: `Portfolio Contact: ${body.subject}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${body.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${body.email}">${body.email}</a></p>
            <p><strong>Subject:</strong> ${body.subject}</p>
          </div>
          
          <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${body.message}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 14px;">
              This message was sent from your portfolio contact form at ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
            text: `
New Contact Form Submission

Contact Information:
- Name: ${body.name}
- Email: ${body.email}
- Subject: ${body.subject}

Message:
${body.message}

---
This message was sent from your portfolio contact form at ${new Date().toLocaleString()}
      `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Send confirmation email to sender (optional)
        const confirmationMailOptions = {
            from: `"Tanjila Shamima" <${EMAIL_CONFIG.auth.user}>`,
            to: body.email,
            subject: 'Thank you for your message - Tanjila Shamima',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
            Thank you for reaching out!
          </h2>
          
          <p>Dear ${body.name},</p>
          
          <p>Thank you for contacting me through my portfolio. I have received your message and will get back to you as soon as possible.</p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Your Message Summary</h3>
            <p><strong>Subject:</strong> ${body.subject}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; line-height: 1.6;">${body.message}</p>
          </div>
          
          <p>I typically respond within 24-48 hours. If you have any urgent inquiries, please don't hesitate to reach out through other channels.</p>
          
          <p>Best regards,<br>
          <strong>Tanjila Shamima</strong><br>
          Full Stack Developer</p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 14px;">
              Portfolio: <a href="https://tanjila-shamima.web.app">tanjila-shamima.web.app</a>
            </p>
          </div>
        </div>
      `,
        };

        try {
            await transporter.sendMail(confirmationMailOptions);
        } catch (confirmationError) {
            console.warn('Failed to send confirmation email:', confirmationError);
            // Don't fail the main request if confirmation email fails
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Message sent successfully! I\'ll get back to you soon.',
                timestamp: new Date().toISOString()
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Contact form error:', error);

        return NextResponse.json(
            {
                error: 'Failed to send message. Please try again later.',
                details: process.env.NODE_ENV === 'development' ? error : undefined
            },
            { status: 500 }
        );
    }
}

// Handle other HTTP methods
export async function GET() {
    return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
    );
}

export async function PUT() {
    return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
    );
}

export async function DELETE() {
    return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
    );
}
