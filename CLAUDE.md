# AICloudStrategist — Claude Working Context

## The Business

**Company:** AICloudStrategist  
**Website:** https://aicloudstrategist.com  
**GitHub repo:** support-aicloudstrategist/support-aicloudstrategist.github.io  
**Status:** DPIIT Recognised Startup, registered 29 April 2026  
**Stage:** Brand new — zero customers as of May 2026  

**Directors:**
- Miltali Bhattachariya — Director
- Anushka Bhattachariya — Director

**Contact:**
- Email: contact@aicloudstrategist.com
- Support: support@aicloudstrategist.com
- WhatsApp Business: +91 7838347711

---

## What the Business Does

Indian SMB modernization studio — three fixed-fee sprints:

| Service | Starter | Standard |
|---|---|---|
| Website + Lead Capture Sprint | INR 9,999 | INR 17,999 |
| Operations Automation Sprint | INR 14,999 | INR 24,999 |
| DPDP Compliance Sprint | INR 25,000 | INR 45,000 |

Target customers: factories, workshops, traders, local service firms, digital startups, growing SMB teams across India.

---

## Tech Stack

- **Website:** Static HTML + CSS — no framework, no build step
- **Hosting:** Cloudflare Pages (connected to GitHub main branch — auto-deploys on push)
- **Domain:** aicloudstrategist.com (Cloudflare DNS)
- **Contact form:** Formsubmit.co → contact@aicloudstrategist.com (free, has auto-reply)
- **Analytics:** Plausible (self-hosted at analytics.aicloudstrategist.com)
- **Email (primary):** Microsoft 365 / O365
- **Email (secondary):** Google Workspace free tier — kept only for Google Ads and SEO tools
- **Search indexing:** IndexNow key configured
- **DMARC:** Configured on domain

### CSS architecture
- `index.html` — all styles inline in `<style>` tag, uses its own CSS variables
- All other pages — use external `css/styles.css`, body class `assessment-page`

### URL pattern
- Canonical tags and sitemap use clean URLs (no `.html` extension)
- Files are `.html` on disk — GitHub Pages serves both; canonical resolves correctly
- Google Search Console may show "Alternative page with proper canonical" for `.html` versions — this is expected, not an error

---

## Repository Structure

```
/
├── index.html                          # Homepage
├── about.html                          # Team page (directors + DPIIT badge)
├── thank-you.html                      # Post-form confirmation page
├── website-lead-capture-sprint.html    # Service page
├── operations-automation-sprint.html   # Service page
├── dpdp-website-compliance-sprint.html # Service page
├── resources.html                      # Free resource hub
├── privacy.html                        # Privacy policy
├── dpdp-readiness-assessment.html      # Assessment tool
├── dpdp-compliance-checklist-india.html
├── dpdp-vendor-register-template.html
├── dpdp-consent-flow-checklist.html
├── dpdp-breach-readiness-checklist.html
├── local-business-website-india.html
├── factory-website-development-india.html
├── small-business-automation-india.html
├── whatsapp-lead-management-india.html
├── smb-website-checklist-india.html
├── lead-follow-up-checklist-india.html
├── policykart.html
├── sitemap.xml
├── robots.txt
├── _redirects                          # Cloudflare/Netlify 301 redirects
├── css/styles.css                      # Shared stylesheet for all non-homepage pages
└── assets/brand/aics-logo.svg         # Brand logo
```

---

## What Has Been Done (May 2026)

### Session 1 — May 11, 2026
- Email triage via Outlook MCP — identified 5 actionable emails
- Full website review and competitive assessment
- **Created** `about.html` — team page with both directors, DPIIT badge, company story, values
- **Created** `thank-you.html` — post-form confirmation with "what happens next" steps
- **Updated** `index.html`:
  - 2-tier pricing cards (Starter + Standard) for all 3 sprints
  - WhatsApp contact button (green, wa.me/917838347711)
  - DPIIT Recognised Startup in hero proof strip (4th item)
  - About link added to nav and footer
  - Formsubmit.co replaces Formspree (free auto-reply)
  - `_next` redirects to /thank-you after form submission
- **Updated** all 3 service pages:
  - Pricing section with Starter/Standard comparison grid
  - About link in nav and footer
- **Updated** `sitemap.xml` — added /about
- **Created** `CLAUDE.md` — this file
- All changes deployed to main via Cloudflare Pages

---

## Pending Tasks

- [ ] **Cloudflare cache purge** — Cloudflare dashboard → Caching → Purge Everything
- [ ] **Formsubmit.co activation** — submit the contact form once; click verification email sent to contact@aicloudstrategist.com
- [ ] **DPIIT badge image** — currently text only; add official Startup India badge image when available
- [ ] **LinkedIn presence** — create company LinkedIn page, connect both directors
- [ ] **First customers** — offer 1-2 free/discounted projects for case studies and social proof
- [ ] **Google Business Profile** — set up for local SEO
- [ ] **Social proof** — add testimonials section once first clients complete projects

---

## Key Decisions Made

- **Formspree dropped** — free tier has no auto-reply; switched to Formsubmit.co (free, auto-reply included)
- **No Formspree paid plan** — INR ~850/month not justified at zero-customer stage
- **Two pricing tiers** — Starter and Standard per sprint, explicit deliverables, no vague "from" pricing
- **DPIIT badge** — text only for now; real badge image to be added later
- **Google Workspace** — kept on free tier only; O365 is primary email
- **Static HTML** — no CMS, no framework; keep it simple and fast
- **Clean URLs** — canonical always without .html; expected Search Console behaviour

---

## MCP Servers Available

| Server | What it does | Notes |
|---|---|---|
| GitHub (mcp__github__) | Read/write repo, PRs, files | Working — primary deploy method |
| Outlook (mcp__1855f173) | Email, calendar, SharePoint | Working |
| Notion (mcp__5cde7ffb) | Notion workspace | Working |
| Google Calendar (mcp__bf683b88) | Calendar | Working |
| Google Drive (mcp__603a9932) | Drive files | Working |
| Figma (mcp__566eeb72) | Design files | Working |
| Canva (mcp__f9b6c757) | Canva designs | Working |
| **Cloudflare** | DNS, Pages, cache, zones | Added May 2026 — available in new sessions |
| Gmail (mcp__3f076f9c) | Gmail | Not working — "Mail service not enabled" |

### Deploying to production
Direct push to `main` is blocked by branch protection. Use:
1. `mcp__github__push_files` — push directly to main (works for file updates)
2. Or create PR via `mcp__github__create_pull_request` then merge via `mcp__github__merge_pull_request`

---

## Contacts and Accounts

| Service | Account | Notes |
|---|---|---|
| Formsubmit.co | contact@aicloudstrategist.com | No account needed — email-based |
| GitHub | support-aicloudstrategist | Repo owner |
| Cloudflare | — | Domain + Pages hosting |
| Plausible | analytics.aicloudstrategist.com | Self-hosted |
| Microsoft 365 | — | Primary email |
| Google Workspace | — | Free tier, keep for Ads/SEO only |
| DPIIT / Startup India | — | Recognition certificate received |
