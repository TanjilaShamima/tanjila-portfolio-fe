# Contact Form Setup Guide

This guide explains how to set up the contact form functionality in your portfolio.

## Overview

The contact form has been integrated with multiple email service options:

1. **Custom API Route** (Recommended for production)
2. **EmailJS** (Client-side service)
3. **Formspree** (Client-side service)
4. **Development Fallback** (Simulates success in development)

## Setup Options

### Option 1: Custom API Route (Recommended)

This uses a Next.js API route with nodemailer to send emails directly from your server.

#### Prerequisites:
- SMTP server access (Gmail, Outlook, etc.)
- App password for your email service

#### Environment Variables:
Create a `.env.local` file in your project root:

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Contact email (where you want to receive messages)
CONTACT_EMAIL=tanjila.diu.edu@gmail.com
```

#### Gmail Setup:
1. Enable 2-factor authentication on your Google account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use this password as `SMTP_PASS`

### Option 2: EmailJS (Client-side)

EmailJS allows sending emails directly from the browser without a server.

#### Setup:
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your credentials

#### Environment Variables:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

#### Email Template Variables:
Your EmailJS template should include these variables:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{subject}}` - Message subject
- `{{message}}` - Message content

### Option 3: Formspree (Client-side)

Formspree is another client-side form handling service.

#### Setup:
1. Sign up at [Formspree](https://formspree.io/)
2. Create a new form
3. Get your form endpoint

#### Environment Variables:
```env
NEXT_PUBLIC_FORMSFREE_ENDPOINT=https://formspree.io/f/your_form_id
```

## Features

### Form Validation
- Name: Minimum 2 characters
- Email: Valid email format
- Subject: Minimum 5 characters
- Message: Minimum 10 characters

### Error Handling
- Real-time validation with error messages
- Toast notifications for success/error states
- Graceful fallback between services

### User Experience
- Loading states during submission
- Form reset after successful submission
- Responsive design with animations
- Dark theme toast notifications

## Testing

### Development Mode
In development, the form will simulate a successful submission without actually sending emails.

### Production Testing
1. Set up your preferred email service
2. Configure environment variables
3. Deploy to production
4. Test the form submission

## Troubleshooting

### Common Issues

1. **Emails not sending in production**
   - Check environment variables are set correctly
   - Verify SMTP credentials (if using custom API)
   - Check EmailJS/Formspree configuration

2. **Form validation errors**
   - Ensure all required fields are filled
   - Check field length requirements
   - Verify email format

3. **Toast notifications not showing**
   - Ensure react-toastify is properly imported
   - Check for CSS conflicts

### Debug Mode
Set `NODE_ENV=development` to see detailed error messages in the console.

## Security Considerations

1. **Environment Variables**: Never commit sensitive credentials to version control
2. **Rate Limiting**: Consider implementing rate limiting for the API route
3. **Spam Protection**: Consider adding CAPTCHA or honeypot fields
4. **Input Sanitization**: The form includes basic validation, but consider additional sanitization

## Customization

### Styling
The form uses Tailwind CSS classes. You can customize:
- Colors: Modify the gradient and border colors
- Animations: Adjust Framer Motion animations
- Layout: Change the grid layout and spacing

### Functionality
- Add additional fields (phone, company, etc.)
- Implement file uploads
- Add CAPTCHA integration
- Customize email templates

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify environment variable configuration
3. Test with different email services
4. Check the API route logs (if using custom API)
