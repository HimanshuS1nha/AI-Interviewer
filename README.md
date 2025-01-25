# AI Interviewer

AI Interviewer is a smart, AI-powered tool designed for businesses to streamline their hiring process. Simply provide job details, and our AI generates tailored interview questions. Share the interview link with candidates, and receive in-depth results, highlighting their strengths and weaknesses, to make more informed hiring decisions.

## Get started

1. Add following environment variables : DATABASE_URL, JWT_SECRET (for signing tokens), API_KEY (Google Gemini API key), SMTP_EMAIL (for sending emails using nodemailer), SMTP_PASS (for sending emails using nodemailer), RAZORPAY_SECRET, NEXT_PUBLIC_RAZORPAY_KEY, NEXT_PUBLIC_URL (http://localhost:3000 in development)

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the dev server

   ```bash
    npm run dev
   ```

## Features

- Login/Signup
- OTP verification
- Middleware to protect routes
- Create and Delete AI powered interview
- Get in-depth results on candidate's performance
- Payment integration with Razorpay

## TECH STACK USED

- Next.js
- Tailwind CSS
- Shadcn UI
- Prisma
- PostgreSQL
- Razorpay
- Google Gemini
- Nodemailer
- Zustand
- Zod

## Demo

Live Demo - [Click Here](https://aiinterviewerapp.vercel.app)

## 🚀 About Me

My name is Himanshu Sinha and I'm a full stack developer.
