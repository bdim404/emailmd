export interface Template {
  id: string;
  title: string;
  category: string;
  author: string;
  markdown: string;
}

export const templates: Template[] = [
  {
    id: "welcome",
    title: "Welcome Email",
    category: "Onboarding",
    author: "emailmd",
    markdown: `---
preheader: "Welcome aboard!"
---

::: header
![Logo](https://imgs.emailmd.dev/logoipsum-336.png){width="200"}
:::

# Welcome to Acme!

We're thrilled to have you on board. Your account is all set up and ready to go.

Here's what you can do next:

- **Complete your profile** — Add your details so we can personalize your experience.
- **Explore the dashboard** — Get familiar with the tools at your fingertips.
- **Invite your team** — Collaboration is better together.

[Go to Dashboard](https://example.com/dashboard){button}

::: callout
**Need help getting started?** Check out our [quick-start guide](https://example.com/guide) for a walkthrough of the key features.
:::

Cheers,
The Acme Team

::: footer
Acme Inc. | 123 Main St, San Francisco, CA 94102 | [Unsubscribe](https://example.com/unsub)
:::
`,
  },
  {
    id: "password-reset",
    title: "Password Reset",
    category: "Security",
    author: "emailmd",
    markdown: `---
preheader: "Reset your password"
---

::: header
![Logo](https://imgs.emailmd.dev/logoipsum-336.png){width="200"}
:::

# Reset Your Password

We received a request to reset the password for your account. Click the button below to choose a new password.

[Reset Password](https://example.com/reset?token=abc123){button}

This link will expire in **1 hour**. If you didn't request a password reset, you can safely ignore this email.

::: callout
**Didn't request this?** If you didn't make this request, please [contact support](https://example.com/support) immediately.
:::

::: footer
Acme Inc. | 123 Main St, San Francisco, CA 94102 | [Unsubscribe](https://example.com/unsub)
:::
`,
  },
  {
    id: "order-confirmation",
    title: "Order Confirmation",
    category: "E-Commerce",
    author: "emailmd",
    markdown: `---
preheader: "Your order has been confirmed"
---

::: header
![Logo](https://imgs.emailmd.dev/logoipsum-336.png){width="200"}
:::

# Order Confirmed

Thanks for your purchase! Your order **#12345** has been confirmed and is being processed.

## Order Summary

| Item | Qty | Price |
|------|-----|-------|
| Widget Pro | 2 | $49.98 |
| Gadget Lite | 1 | $29.99 |
| **Total** | | **$79.97** |

We'll send you a shipping confirmation with tracking details once your order ships.

[View Order](https://example.com/orders/12345){button}

::: callout
**Estimated delivery:** 3–5 business days
:::

::: footer
Acme Store | 456 Commerce Blvd | [Unsubscribe](https://example.com/unsub)
:::
`,
  },
  {
    id: "newsletter",
    title: "Monthly Newsletter",
    category: "Marketing",
    author: "emailmd",
    markdown: `---
preheader: "What's new this month"
---

::: header
![Logo](https://imgs.emailmd.dev/logoipsum-336.png){width="200"}
:::

# The Monthly Roundup

Here's what's been happening at Acme this month.

## New Features

We shipped **dark mode**, a redesigned dashboard, and faster load times across the board. [Read the full changelog →](https://example.com/changelog)

## From the Blog

**Building Emails with Markdown** — Learn how to create beautiful, responsive emails using simple markdown syntax. No HTML required. [Read more →](https://example.com/blog/markdown-emails)

## Community Spotlight

A huge shoutout to our community for reaching **10,000 members**! Your feedback and contributions make Acme better every day.

[Join the Community](https://example.com/community){button}

::: footer
Acme Inc. | 123 Main St, San Francisco, CA 94102 | [Manage preferences](https://example.com/preferences) · [Unsubscribe](https://example.com/unsub)
:::
`,
  },
  {
    id: "invoice",
    title: "Invoice",
    category: "Billing",
    author: "emailmd",
    markdown: `---
preheader: "Your invoice is ready"
---

::: header
![Logo](https://imgs.emailmd.dev/logoipsum-336.png){width="200"}
:::

# Invoice #INV-2025-0042

Hi Alex, your invoice for January 2025 is ready.

| Description | Amount |
|-------------|--------|
| Pro Plan (Monthly) | $29.00 |
| Additional Seats (3) | $27.00 |
| API Add-on | $9.00 |
| **Total Due** | **$65.00** |

**Due Date:** February 1, 2025

[Pay Now](https://example.com/invoices/42/pay){button}

::: callout
**Payment methods:** We accept all major credit cards and bank transfers. Need to update your payment method? [Go to billing settings](https://example.com/billing).
:::

::: footer
Acme Inc. | 123 Main St, San Francisco, CA 94102 | [Unsubscribe](https://example.com/unsub)
:::
`,
  },
  {
    id: "event-invitation",
    title: "Event Invitation",
    category: "Events",
    author: "emailmd",
    markdown: `---
preheader: "You're invited!"
---

::: header
![Logo](https://imgs.emailmd.dev/logoipsum-336.png){width="200"}
:::

# You're Invited!

Join us for **Acme Conf 2025** — a full day of talks, workshops, and networking with the best in the industry.

- **Date:** March 15, 2025
- **Time:** 9:00 AM – 5:00 PM PST
- **Location:** Moscone Center, San Francisco

## What to Expect

Keynotes from industry leaders, hands-on workshops, and a chance to connect with the Acme community in person.

[RSVP Now](https://example.com/events/acme-conf-2025){button}

::: callout
**Early bird pricing** ends February 28. Don't miss out!
:::

::: footer
Acme Inc. | 123 Main St, San Francisco, CA 94102 | [Unsubscribe](https://example.com/unsub)
:::
`,
  },
];

export function getTemplateById(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}
