# Deployment

## Source of Truth

This repository is configured as the GitHub Pages source for the public AICloudStrategist website.

- Repository: `support-aicloudstrategist/support-aicloudstrategist.github.io`
- Publishing branch: `main`
- Publishing path: `/`
- GitHub Pages default URL: `https://support-aicloudstrategist.github.io/`
- Intended custom domain: `https://aicloudstrategist.com/`

Any committed change pushed to `main` is built by GitHub Pages automatically.

## Current Custom Domain Status

GitHub Pages is configured with the custom domain `aicloudstrategist.com`, and the root `CNAME` file contains:

```text
aicloudstrategist.com
```

Cloudflare DNS was updated on April 30, 2026 to point `aicloudstrategist.com` and `www.aicloudstrategist.com` to GitHub Pages. Future pushed changes to `main` should publish through GitHub Pages.

## Required Cloudflare DNS Records

For the apex domain, Cloudflare should keep these DNS-only GitHub Pages records:

```text
Type  Name  Value
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
AAAA  @     2606:50c0:8000::153
AAAA  @     2606:50c0:8001::153
AAAA  @     2606:50c0:8002::153
AAAA  @     2606:50c0:8003::153
```

For `www`, keep:

```text
Type   Name  Value
CNAME  www   support-aicloudstrategist.github.io
```

After DNS propagates, return to GitHub repository settings and enable **Enforce HTTPS** if it is not enabled automatically. GitHub may need time to issue the certificate after DNS is changed.

Reference: GitHub Pages custom domain documentation.
