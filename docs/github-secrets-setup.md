# GitHub Secrets Configuration for CI/CD

This document provides instructions for configuring GitHub repository secrets required for the Cloudflare Workers deployment pipeline.

## Required Secrets

### 1. CLOUDFLARE_ACCOUNT_ID
- **Value**: `313d11072ad5982f8bfbd8914be2ce6b`
- **Description**: Your Cloudflare account identifier
- **Where to find**: Run `wrangler whoami` or check Cloudflare dashboard

### 2. CLOUDFLARE_API_TOKEN
- **Description**: API token with permissions to deploy Workers
- **Required permissions**:
  - Zone:Zone:Read
  - Zone:Zone Settings:Read
  - Account:Cloudflare Workers:Edit
  - Account:Workers KV Storage:Edit
  - Account:Workers Scripts:Edit

## Step-by-Step Setup

### 1. Navigate to Repository Settings
1. Go to https://github.com/FredMichel/react-starter-kit
2. Click on "Settings" tab
3. In the left sidebar, click on "Secrets and variables" → "Actions"

### 2. Add CLOUDFLARE_ACCOUNT_ID
1. Click "New repository secret"
2. Name: `CLOUDFLARE_ACCOUNT_ID`
3. Value: `313d11072ad5982f8bfbd8914be2ce6b`
4. Click "Add secret"

### 3. Create Cloudflare API Token
1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token"
3. Choose "Custom token" template
4. Configure the token:
   - **Token name**: `GitHub Actions - training-ai-agentic`
   - **Permissions**:
     - Zone → Zone → Read
     - Zone → Zone Settings → Read
     - Account → Cloudflare Workers → Edit
     - Account → Workers KV Storage → Edit
     - Account → Workers Scripts → Edit
     - Account → D1 → Edit
   - **Account Resources**: Include → All accounts
   - **Zone Resources**: Include → All zones
5. Click "Continue to summary"
6. Click "Create Token"
7. **IMPORTANT**: Copy the token immediately (it won't be shown again)

### 4. Add CLOUDFLARE_API_TOKEN
1. Back in GitHub repository settings
2. Click "New repository secret"
3. Name: `CLOUDFLARE_API_TOKEN`
4. Value: [Paste the token you just created]
5. Click "Add secret"

### 5. Optional: Add GCP Service Account Key
If you need GCP integration in CI/CD:
1. Click "New repository secret"
2. Name: `GCP_SERVICE_ACCOUNT_KEY`
3. Value: [Contents of gcp-service-key.json]
4. Click "Add secret"

## Verification

### Test Secret Access
1. Create a test branch
2. Add this temporary workflow to `.github/workflows/test-secrets.yml`:

```yaml
name: Test Secrets
on:
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Check secrets
        run: |
          echo "Account ID length: ${#CLOUDFLARE_ACCOUNT_ID}"
          echo "API Token length: ${#CLOUDFLARE_API_TOKEN}"
          echo "Account ID exists: $([[ -n "$CLOUDFLARE_ACCOUNT_ID" ]] && echo "Yes" || echo "No")"
          echo "API Token exists: $([[ -n "$CLOUDFLARE_API_TOKEN" ]] && echo "Yes" || echo "No")"
        env:
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

3. Run the workflow manually from GitHub Actions tab
4. Check the output to verify secrets are accessible
5. Delete the test workflow after verification

## Security Best Practices

1. **Never commit secrets** to the repository
2. **Rotate tokens regularly** (every 90 days recommended)
3. **Use minimal permissions** - only grant what's needed
4. **Monitor token usage** in Cloudflare dashboard
5. **Revoke compromised tokens** immediately

## Troubleshooting

### "Bad credentials" error
- Verify the token hasn't expired
- Check if the token has correct permissions
- Ensure no extra spaces when pasting the token

### "Account ID not found" error
- Verify the account ID matches `wrangler whoami` output
- Check if the secret name is exactly `CLOUDFLARE_ACCOUNT_ID`

### Deployment fails with permission error
- Token might be missing Workers permissions
- Regenerate token with all required permissions listed above

## Next Steps

After configuring secrets:
1. The CI/CD pipeline will automatically deploy on push to main
2. Preview deployments will work for pull requests
3. Monitor deployments in the Actions tab

---

*Last updated: 2025-07-26*