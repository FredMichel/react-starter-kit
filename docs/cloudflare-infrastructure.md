# Cloudflare Infrastructure Documentation

## Overview

This document provides comprehensive documentation for the Cloudflare infrastructure setup for the Training AI Agentic platform. The setup includes Workers for edge computing, D1 database for persistent storage, and R2 buckets for object storage.

## Infrastructure Components

### 1. Cloudflare Workers
- **Service Name**: `training-ai-agentic`
- **Main Entry Point**: `./edge/dist/index.js`
- **Compatibility Date**: `2025-05-05`
- **Compatibility Flags**: `["nodejs_compat"]`

### 2. Cloudflare D1 Database
- **Database Name**: `training-ai-agentic-db`
- **Database ID**: `61064224-3226-4352-add2-08aa6cc0cee8`
- **Binding Name**: `DB`
- **Type**: SQLite edge database
- **Migrations Directory**: `./db/migrations`

### 3. Cloudflare R2 Storage
- **Bucket Name**: `training-ai-agentic-images`
- **Binding Name**: `IMAGES`
- **Purpose**: Image and asset storage
- **Status**: Pending R2 service enablement

### 4. Static Assets
- **Source Directory**: `./app/dist`
- **Binding Name**: `ASSETS`
- **Purpose**: React application static files

## Account Configuration

### Cloudflare Account
- **Account ID**: `313d11072ad5982f8bfbd8914be2ce6b`
- **Account Email**: `frederic.michel@oppchain.com`

### Environment Configurations

#### Development Environment
```json
{
  "vars": {
    "ENVIRONMENT": "development",
    "APP_NAME": "Formation IA Agentique (Dev)",
    "ALLOWED_ORIGINS": "http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173"
  },
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "training-ai-agentic-db",
      "database_id": "61064224-3226-4352-add2-08aa6cc0cee8"
    }
  ]
}
```

#### Production Environment
```json
{
  "vars": {
    "ENVIRONMENT": "production",
    "APP_NAME": "Formation IA Agentique",
    "ALLOWED_ORIGINS": "https://training-ai-agentic.workers.dev"
  },
  "routes": [
    {
      "pattern": "example.com/*",
      "custom_domain": true
    }
  ],
  "r2_buckets": [
    {
      "binding": "IMAGES",
      "bucket_name": "training-ai-agentic-images"
    }
  ],
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "training-ai-agentic-db",
      "database_id": "61064224-3226-4352-add2-08aa6cc0cee8"
    }
  ]
}
```

## Setup Instructions

### Prerequisites
- Cloudflare account with appropriate permissions
- Bun runtime (>=1.2.0)
- Wrangler CLI installed globally

### Initial Setup

#### 1. Install Wrangler CLI
```bash
bun install -g wrangler
```

#### 2. Authenticate with Cloudflare
```bash
wrangler login
# Follow browser authentication flow
wrangler whoami  # Verify authentication
```

#### 3. Verify Account Access
```bash
wrangler whoami
# Expected output includes account ID: 313d11072ad5982f8bfbd8914be2ce6b
```

### Database Setup

#### 1. Verify D1 Database
```bash
wrangler d1 list
# Should show: training-ai-agentic-db (61064224-3226-4352-add2-08aa6cc0cee8)
```

#### 2. Check Database Schema
```bash
wrangler d1 execute training-ai-agentic-db --command=".schema"
```

#### 3. Run Database Migrations (if needed)
```bash
wrangler d1 migrations apply training-ai-agentic-db
```

### R2 Storage Setup

#### 1. Enable R2 Service
- Visit: https://dash.cloudflare.com/313d11072ad5982f8bfbd8914be2ce6b/r2
- Enable R2 service in Cloudflare Dashboard

#### 2. Create R2 Bucket
```bash
wrangler r2 bucket create training-ai-agentic-images
```

#### 3. Verify Bucket Creation
```bash
wrangler r2 bucket list
# Should show: training-ai-agentic-images
```

## Deployment Procedures

### Development Deployment
```bash
# Build the project
bun run build

# Deploy to default environment (development)
wrangler deploy edge/dist/index.js --env=""
```

### Production Deployment
```bash
# Note: Requires R2 service to be enabled
wrangler deploy --env production
```

### Register Workers.dev Subdomain
If you need a public URL, register a workers.dev subdomain:
- Visit: https://dash.cloudflare.com/313d11072ad5982f8bfbd8914be2ce6b/workers/onboarding
- Choose a subdomain name

## Development Workflow

### Local Development
```bash
# Start local development server
wrangler dev --local

# Access locally at:
# http://localhost:8787/
```

### Testing Endpoints
```bash
# Health check
curl http://localhost:8787/health

# API endpoints
curl http://localhost:8787/api

# Static assets
curl http://localhost:8787/
```

### Monitoring and Logs
```bash
# View live logs
wrangler tail training-ai-agentic

# View deployment history
wrangler deployments list

# View Worker versions
wrangler versions list
```

## Environment Variables

### Required Variables
- `ENVIRONMENT`: Environment identifier (development/production)
- `APP_NAME`: Application display name
- `ALLOWED_ORIGINS`: CORS allowed origins

### Database Variables
- `DB`: D1 database binding (automatically configured)

### Storage Variables
- `IMAGES`: R2 bucket binding (when R2 is enabled)
- `ASSETS`: Static assets binding (automatically configured)

## Security Considerations

### Environment Isolation
- Development and production environments are completely isolated
- Different database instances for each environment
- Separate environment variables and configurations

### Access Control
- Worker bindings restrict access to only authorized resources
- CORS policies configured per environment
- Environment variables are encrypted and managed by Cloudflare

### Secrets Management
- Use `wrangler secret put` for sensitive configuration
- Never commit secrets to version control
- Use environment-specific `.env.local` files for local development

### Example Secret Management
```bash
# Set production secrets
wrangler secret put OPENAI_API_KEY --env production

# Set development secrets
wrangler secret put OPENAI_API_KEY --env development
```

## Troubleshooting

### Common Issues

#### 1. R2 Bucket Not Found
**Error**: `R2 bucket 'training-ai-agentic-images' not found`
**Solution**: 
1. Enable R2 service in Cloudflare Dashboard
2. Create the bucket: `wrangler r2 bucket create training-ai-agentic-images`
3. Verify: `wrangler r2 bucket list`

#### 2. Workers.dev Subdomain Required
**Error**: `You need to register a workers.dev subdomain`
**Solution**: Visit https://dash.cloudflare.com/313d11072ad5982f8bfbd8914be2ce6b/workers/onboarding

#### 3. Authentication Issues
**Error**: `Authentication error`
**Solution**: 
```bash
wrangler logout
wrangler login
```

#### 4. Database Connection Issues
**Solution**: 
```bash
# Test database connection
wrangler d1 execute training-ai-agentic-db --command="SELECT 1"
```

#### 5. Environment Configuration Not Found
**Error**: `No environment found in configuration with name "development"`
**Solution**: Verify `wrangler.jsonc` contains the environment configuration

### Debugging Commands
```bash
# Check Wrangler version
wrangler --version

# Verify account information
wrangler whoami

# Test Worker configuration
wrangler dev --local

# Check deployment status
wrangler deployments list

# View Worker bindings
wrangler deploy --dry-run
```

## Performance Optimization

### Worker Performance
- **Cold Start Time**: ~70ms (measured)
- **Bundle Size**: 1.8MB (1807.29 KiB)
- **Gzip Compression**: ~352 KiB (80% reduction)

### Database Performance
- D1 provides global edge replication
- Sub-100ms query latency worldwide
- Automatic backup and recovery

### Monitoring Recommendations
1. Set up Cloudflare Analytics
2. Monitor Worker usage and errors
3. Track D1 database performance
4. Monitor R2 storage usage

## Maintenance Procedures

### Regular Tasks
1. **Weekly**: Check deployment logs for errors
2. **Monthly**: Review resource usage and costs
3. **Quarterly**: Update Wrangler CLI and dependencies

### Backup Procedures
- D1 databases are automatically backed up by Cloudflare
- Export critical data regularly: `wrangler d1 export training-ai-agentic-db`
- Store R2 backups in separate bucket if needed

### Updates and Migrations
1. Test all changes in development environment first
2. Use `--dry-run` flag to verify deployment configuration
3. Monitor deployment logs during production updates
4. Keep rollback plan ready with previous version

## Cost Management

### Resource Limits
- **Workers**: 100,000 requests/day (free tier)
- **D1**: 5 million row reads/day (free tier)
- **R2**: 10GB storage (free tier)

### Cost Optimization
- Use appropriate caching strategies
- Optimize bundle sizes
- Monitor usage through Cloudflare Dashboard

## Support and Resources

### Documentation Links
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)
- [Cloudflare R2](https://developers.cloudflare.com/r2/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

### Getting Help
- Cloudflare Community: https://community.cloudflare.com/
- Cloudflare Support: https://support.cloudflare.com/
- Workers Discord: https://discord.gg/cloudflaredev

---

*Documentation created: 2025-07-26*  
*Last updated: 2025-07-26*  
*Maintainer: Formation IA Agentique Team*