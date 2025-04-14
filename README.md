# MASHNO

<div style="text-align: center; padding: 2rem 1rem;">
  <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem;">Bringing Authentic Indian Handicrafts to the World</h1>
  <p style="font-size: 1.1rem; max-width: 700px; margin: 0 auto 1rem;">Mashno is your gateway to India's rich artistic heritage. We connect you with genuine, handcrafted products at fair prices, directly supporting local artisans and preserving historical traditions. No middlemen, no inflated costs—just authentic craftsmanship, delivered with integrity.</p>
  <a href="https://mashno.com" style="display: inline-block; background-color: #1a202c; color: white; padding: 0.75rem 1.5rem; border-radius: 0.375rem; text-decoration: none; margin-top: 1rem;">Visit Store</a>
</div>

---

<div style="text-align: center; margin: 3rem 0;">
  <h2 style="font-size: 2rem; margin-bottom: 1rem;">🛍️ Storefront Preview</h2>
  <img src="https://pub-885bf39444c24ed3aff23a9bbf2eff6d.r2.dev/Screenshot%202025-04-14%20at%202.56.25%E2%80%AFPM.png" alt="Mashno Storefront Preview" style="max-width: 100%; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); margin-top: 1rem;" />
</div>

---

<div style="text-align: center; margin: 3rem 0;">
  <h2 style="font-size: 2rem; margin-bottom: 1rem;">🛍️ Admin Preview</h2>
  <img src="https://pub-885bf39444c24ed3aff23a9bbf2eff6d.r2.dev/Screenshot%202025-04-14%20at%202.56.38%E2%80%AFPM.png" alt="Mashno Storefront Preview" style="max-width: 100%; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); margin-top: 1rem;" />
</div>

---

<div style="text-align: center; margin: 3rem 0;">
  <h2 style="font-size: 2rem; margin-bottom: 1rem;">🛍️ Storefront Preview</h2>
  <img src="https://pub-885bf39444c24ed3aff23a9bbf2eff6d.r2.dev/Screenshot%202025-04-14%20at%202.57.07%E2%80%AFPM.png" alt="Mashno Storefront Preview" style="max-width: 100%; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); margin-top: 1rem;" />
</div>

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15.2.4](https://nextjs.org/)
- **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://authjs.dev/) with Prisma Adapter
- **Payments**: Stripe + Razorpay
- **UI/UX**: TailwindCSS, Headless UI, Framer Motion, Lucide Icons
- **Email**: [Resend](https://resend.com)
- **Image Uploads**: AWS S3
- **Forms**: React Hook Form + Zod + @hookform/resolvers
- **State Management**: React Query

---

## 📁 Environment Variables
Copy `.env.example` and fill in your details:

```env
AUTH_SECRET= # Added by `npx auth`. Read more: https://cli.authjs.dev
DATABASE_URL=

RESEND_API_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

---

## 🚀 Getting Started

1. **Install dependencies**
```bash
yarn install
```

2. **Set up Prisma**
```bash
npx prisma generate
npx prisma migrate dev
```

3. **Run the app**
```bash
yarn dev
```

---

## 🔒 Privacy Policy

Welcome to Mashno, an online marketplace committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information.

### Information We Collect
- **Personal Information**: Name, email address, phone number, billing details, and shipping address.
- **Usage Data**: IP address, browser type, device information, and interaction with our platform.
- **Transaction Data**: Purchase history, payment details (handled via third-party payment processors), and order fulfillment information.
- **Cookies & Tracking**: We use cookies and analytics to enhance user experience and improve our services.

### How We Use Your Information
- **Order Processing**: To fulfill your purchases and provide customer support.
- **Security & Fraud Prevention**: Detect and prevent fraud or unauthorized activities.
- **Marketing & Communication**: Send promotional offers and service-related updates (opt-out available).
- **User Experience Enhancement**: Analyze trends and usage to improve our platform.

### Data Sharing & Third Parties
We do not sell your personal data. However, we may share your data with:
- **Payment Processors**: To handle transactions securely.
- **Logistics Partners**: For order fulfillment and delivery.
- **Legal Authorities**: When required by law or to protect our rights.

All third-party services comply with relevant data protection laws.

### Your Rights & Choices
- **Access & Correction**: Request a copy of your data or update incorrect information.
- **Deletion Request**: Ask us to delete your personal data (subject to legal obligations).
- **Opt-Out**: Unsubscribe from marketing emails at any time.
- **Cookies Control**: Adjust browser settings to manage cookies and tracking.

### Data Security
We implement industry-standard security measures to protect your data:
- **Encryption**: Securing sensitive data during transmission and storage.
- **Access Controls**: Restricting access to authorized personnel only.
- **Regular Audits**: Conducting security reviews to prevent vulnerabilities.

---

## 📬 Contact Us

If you have any questions about this project or the Privacy Policy, feel free to reach out:

📧 **support@mashno.com**  
🌐 **[Sarvagya Kumar](https://thesarvagyakumar.site)**

---

Thank you for supporting Indian artisans with **Mashno** 🇮🇳

