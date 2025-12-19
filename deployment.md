# Stranger Chat Deployment Guide

## Overview
This guide provides a complete free deployment plan for the Stranger Chat application using Railway as the hosting platform. Railway offers excellent free tiers for both frontend and backend deployment with WebSocket support.

## Prerequisites
- GitHub account with your stranger-chat repository pushed
- Railway account (https://railway.app)
- GoDaddy domain (strangerchat.co.in) - already purchased
- Node.js and npm installed locally for testing

## Pre-Deployment Checklist
- [ ] Code committed and pushed to GitHub
- [ ] Local testing completed (`npm run dev` for frontend, `npm start` for backend)
- [ ] WebSocket connection tested locally
- [ ] Deploy commands tested (`npm run deploy` in each service directory)
- [ ] All environment variables identified
- [ ] Domain DNS settings accessible
- [ ] Backup of current DNS records (recommended)

## 1. Choose Hosting Platform: Railway

### Why Railway?
- **Free Tier**: 512MB RAM, 1GB storage, 100 hours/month
- **Frontend Support**: Static site hosting with CDN
- **Backend Support**: Full server hosting with persistent connections
- **WebSocket Ready**: Perfect for real-time chat applications
- **SSL Included**: Automatic HTTPS certificates
- **Custom Domain**: Free domain pointing
- **Developer Friendly**: GitHub integration, logs, and monitoring

### Alternatives (if needed)
- **Frontend**: Netlify, Vercel (free static hosting)
- **Backend**: Render, Fly.io (free server hosting)
- **Note**: Railway will automatically run the build commands for each service

## Deployment Options

### Option 1: Single Railway Project (Recommended for Simplicity)
Deploy both frontend and backend as **separate services within one Railway project**:

**Advantages:**
- Single project to manage
- Services can communicate internally
- Shared environment and monitoring
- Easier domain configuration
- Cost-effective (one project instead of two)

**How it works:**
- Railway creates two services in one project
- Backend runs as a server service
- Frontend runs as a static site service
- Services communicate via Railway's internal networking

### Option 2: Separate Railway Projects
Deploy frontend and backend as **separate Railway projects** from their respective folders:

**Advantages:**
- Complete isolation between services
- Independent scaling and resource allocation
- Separate monitoring and logs
- More granular control

**Disadvantages:**
- Managing two separate projects
- More complex domain setup
- Higher management overhead

### Option 3: Monorepo Root Deployment
Deploy from the root directory using workspace configuration.

**Note:** Requires additional Railway configuration for workspace handling.

## 2. Single Railway Project Deployment (Recommended)

### Step 1: Create Railway Project
1. Log into Railway (https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Connect your GitHub account and select the stranger-chat repository
4. **Important**: Do NOT select a specific folder - deploy from the root directory
5. Railway will detect this as a monorepo project

### Step 2: Configure Services
Railway will automatically detect both services. You should see:

**Service 1: stranger-chat-service (Backend)**
- Railway will auto-detect Node.js
- Build Command: `npm run build` (from workspace)
- Start Command: `node dist/main.js`
- Root Directory: `stranger-chat-service`

**Service 2: stranger-chat-web (Frontend)**
- Railway will auto-detect as static site
- Build Command: `npm run build` (from workspace)
- Publish Directory: `dist`
- Root Directory: `stranger-chat-web`

### Step 3: Environment Variables

**Backend Service Environment Variables:**
```bash
NODE_ENV=production
PORT=8080
```

**Frontend Service Environment Variables:**
```bash
VITE_SOCKET_URL=https://stranger-chat-service.railway.internal
```

**Important**: Use Railway's internal networking URL for service-to-service communication.

### Step 4: Verify Deployment
- Check that both services deploy successfully
- Note the generated URLs:
  - Backend: `https://stranger-chat-service.up.railway.app/`
  - Frontend: `https://stranger-chat-web.up.railway.app/`

### Step 5: Test Internal Communication
- Update frontend environment variable to use the backend's Railway internal URL
- Test WebSocket connection between services

## 3. Backend Deployment (stranger-chat-service)

### Step 1: Deploy to Railway
1. Log into Railway (https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Connect your GitHub account and select the stranger-chat repository
4. Choose the `stranger-chat-service` folder
5. Railway will auto-detect Node.js settings
6. Configure build settings:
   - **Build Command**: `npm run build`
   - **Start Command**: `node dist/main.js`
   - **Root Directory**: `stranger-chat-service`

**Note**: You can also use `npm run deploy` locally to build and start the backend server for testing.

### Step 2: Environment Variables
Set these in Railway dashboard under your backend service:

```bash
NODE_ENV=production
PORT=8080
```

### Step 3: Verify Deployment
- Check Railway logs for successful startup
- Note the generated URL: `https://your-backend-name.up.railway.app`
- Test WebSocket endpoint: Should accept connections on port 8080

## 4. Frontend Deployment (stranger-chat-web)

### Step 1: Deploy to Railway
1. In the same Railway account, click "New Project" → "Deploy from GitHub"
2. Select the same repository
3. Choose the `stranger-chat-web` folder
4. Railway will auto-detect static site settings
5. Configure build settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Root Directory**: `stranger-chat-web`

**Note**: You can also use `npm run deploy` locally to build and preview the frontend (starts local server on port 4173).

### Step 2: Environment Variables
Set these in Railway dashboard under your frontend service:

```bash
VITE_SOCKET_URL=https://your-backend-name.up.railway.app
```

**Important**: Replace `your-backend-name` with your actual Railway backend URL.

### Step 3: Verify Deployment
- Check build logs for successful compilation
- Note the generated URL: `https://your-frontend-name.up.railway.app`
- Test basic page load and age verification modal

## 5. Domain Configuration (GoDaddy)

### Step 1: Access DNS Settings
1. Log into GoDaddy (https://www.godaddy.com)
2. Go to "My Products" → "Domains"
3. Find `strangerchat.co.in` → Click "DNS"

### Step 2: Add CNAME Records
For both frontend and backend (if needed):

**Frontend (www or root):**
- **Type**: CNAME
- **Name**: `www` (or `@` for root)
- **Value**: `your-frontend-name.up.railway.app`
- **TTL**: 600

**Backend (if direct access needed):**
- **Type**: CNAME
- **Name**: `api`
- **Value**: `your-backend-name.up.railway.app`
- **TTL**: 600

### Step 3: Configure Railway Domains
1. In Railway dashboard → Your frontend project
2. Go to "Settings" → "Domains"
3. Add `strangerchat.co.in` and `www.strangerchat.co.in`
4. Railway will provide SSL certificates automatically
5. For backend (optional): Add `api.strangerchat.co.in` if direct API access needed

### Step 4: DNS Propagation
- DNS changes take 24-48 hours to propagate globally
- Use tools like https://www.whatsmydns.net/ to check propagation
- Clear DNS cache if issues persist: `ipconfig /flushdns` (Windows) or `sudo killall -HUP mDNSResponder` (macOS)

### Step 4: Test
- Visit `https://strangerchat.co.in`
- Test age verification modal and terms acceptance
- Verify chat interface loads
- Open two browser tabs and test chat functionality
- Check WebSocket connection (browser dev tools → Network → WS)
- Test on mobile devices
- Verify theme toggle and responsive design

## 6. Scaling Considerations

### Free Tier Limits
- **Hours**: 100 hours/month (~3 hours/day)
- **RAM**: 512MB per service
- **Storage**: 1GB
- **Bandwidth**: Unlimited (fair use)

### When to Upgrade
- **Traffic Increase**: >100 concurrent users
- **Cost**: ~$5/month for Pro plan (more hours/RAM)

### Multiple Instances
- **Frontend**: Automatically handled by Railway CDN
- **Backend**: Requires Pro plan for multiple pods
- **WebSocket**: Sticky sessions needed for chat persistence

## 7. Monitoring & Troubleshooting

### Railway Dashboard
- **Logs**: Real-time application logs
- **Metrics**: CPU, memory, and request monitoring
- **Deployments**: Rollback to previous versions

### Common Issues
- **WebSocket Connection**: Check VITE_SOCKET_URL matches backend URL
- **Build Failures**: Ensure all dependencies are in package.json
- **Domain Propagation**: DNS changes take 24-48 hours

## 8. Backup & Maintenance

### Code Backup
- All code safely stored in GitHub
- Railway deployments are based on git commits

### Data Backup
- Currently stateless application
- No database to backup

### Updates
- Push code changes to GitHub
- Railway auto-deploys on new commits

## 8. Cost Summary

### Free Forever
- **Railway**: $0/month (within limits)
- **Domain**: Already paid
- **SSL**: Included

### Potential Costs
- **Overage**: $0.0004/hour beyond free limit
- **Pro Plan**: $5/month for higher limits

## 9. Post-Deployment Tasks

### Performance Optimization
- Enable Railway's CDN for faster global loading
- Consider adding service worker for caching
- Monitor Core Web Vitals in Railway dashboard

### Analytics & Monitoring
- Add Google Analytics (optional)
- Set up error tracking (Sentry, etc.)
- Monitor user engagement and chat metrics

### SEO & Discovery
- Add meta tags for better search visibility
- Submit sitemap to search engines
- Consider adding structured data

### User Support
- Add contact information for user support
- Create FAQ section
- Monitor user feedback

## 10. Emergency Procedures

### Rollback
1. In Railway dashboard, go to "Deployments"
2. Find previous working deployment
3. Click "Rollback" to revert changes

### Domain Issues
- If domain doesn't work, check DNS propagation
- Verify Railway domain settings
- Contact Railway support if needed

### Performance Issues
- Check Railway metrics for resource usage
- Scale up if needed (Pro plan)
- Optimize code if CPU/memory high

## 12. Timeline & Expectations

### Deployment Time
- **Backend**: 5-10 minutes
- **Frontend**: 3-5 minutes
- **Domain**: 24-48 hours for DNS propagation

### Go-Live Checklist
- [ ] Backend deployed and tested
- [ ] Frontend deployed and tested
- [ ] Domain configured
- [ ] SSL certificates active
- [ ] Chat functionality verified
- [ ] Mobile responsiveness tested
- [ ] Terms of Use accessible
- [ ] Age verification working

## 12. Security Considerations

### SSL/TLS
- Railway provides automatic SSL certificates
- All connections are HTTPS encrypted
- WebSocket connections use WSS protocol

### Environment Variables
- Never commit secrets to GitHub
- Use Railway's environment variable management
- Rotate API keys regularly

### Content Security
- Age verification prevents underage access
- Terms of Use require acceptance
- Monitor for inappropriate content

### DDoS Protection
- Railway provides basic DDoS protection
- Consider Cloudflare for additional security
- Monitor traffic patterns

## 13. Performance Optimization

### Frontend Optimization
- Vite build provides optimized bundles
- Images are compressed and cached
- Code splitting for better loading

### Backend Optimization
- NestJS provides efficient request handling
- Socket.io optimized for real-time communication
- Consider Redis for session management (future)

### CDN Integration
- Consider using CDN for static assets
- Railway provides global CDN for static sites
- Reduces latency for users worldwide

## 14. Analytics & Monitoring

### Railway Built-in Tools
- **Metrics Dashboard**: CPU, memory, response times
- **Logs**: Real-time application logs
- **Error Tracking**: Failed requests and exceptions

### External Monitoring
- **Google Analytics**: User behavior tracking
- **Sentry**: Error monitoring and alerting
- **UptimeRobot**: Website availability monitoring

### Key Metrics to Track
- Active users and chat sessions
- Message throughput
- Error rates and response times
- User engagement metrics

## 15. Cost Management

### Railway Free Tier
- 512MB RAM, 1GB disk
- 100 hours/month runtime
- Perfect for initial deployment

### Upgrade Considerations
- Pro plan: $10/month for more resources
- Team plan: For multiple developers
- Enterprise: For high-traffic applications

### Cost Optimization
- Monitor usage in Railway dashboard
- Scale down during low-traffic periods
- Optimize code to reduce resource usage

## 16. Future Enhancements

### Planned Features
- User profiles and avatars
- Chat rooms and categories
- File sharing capabilities
- Video chat integration

### Scalability Improvements
- Database integration for user data
- Redis for session management
- Load balancing for high traffic
- Microservices architecture

### Advanced Features
- Push notifications
- Offline message delivery
- Chat history and search
- Admin moderation tools

## 17. Troubleshooting Guide

### Common Deployment Issues

**Build Failures**
- Check package.json dependencies
- Verify Node.js version compatibility
- Review build logs for specific errors

**WebSocket Connection Issues**
- Verify VITE_SOCKET_URL environment variable
- Check CORS settings in backend
- Ensure Socket.io versions match

**Domain Not Working**
- Wait 24-48 hours for DNS propagation
- Check DNS settings in GoDaddy
- Verify CNAME record configuration

**SSL Certificate Issues**
- Railway handles SSL automatically
- Check if domain is properly configured
- Contact Railway support for custom certificates

### Performance Problems
- Monitor Railway metrics dashboard
- Check for memory leaks in application
- Optimize database queries (when added)
- Consider upgrading Railway plan

### User Experience Issues
- Test on multiple devices and browsers
- Check mobile responsiveness
- Verify age verification modal works
- Ensure terms of use are accessible

## 18. Support & Resources

### Railway Support
- **Documentation**: railway.app/docs
- **Community**: Discord and GitHub discussions
- **Support**: support@railway.app

### Development Resources
- **Vue.js Docs**: vuejs.org/guide
- **NestJS Docs**: docs.nestjs.com
- **Socket.io Docs**: socket.io/docs

### Community & Learning
- **GitHub Issues**: Report bugs and request features
- **Stack Overflow**: Get help with specific issues
- **Dev Communities**: Reddit, Discord servers

### Professional Services
- Consider hiring developers for complex features
- Use agencies for design and UX improvements
- Consult security experts for production hardening

---

*This deployment guide covers everything needed to successfully deploy and maintain the Stranger Chat application on Railway with a custom domain. Follow the steps in order and refer to the troubleshooting section if issues arise.*