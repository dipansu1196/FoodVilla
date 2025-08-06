# CORS Fix for Food Ordering App

## Problem
The application was experiencing CORS (Cross-Origin Resource Sharing) errors when making API calls to Swiggy's endpoints directly from the browser. This happens because Swiggy's servers don't allow cross-origin requests from web browsers.

## Solutions Implemented

### Solution 1: Proxy Server (Recommended for Production)

1. **Install Dependencies**
   ```bash
   npm install cors express http-proxy-middleware concurrently
   ```

2. **Run the Application**
   ```bash
   # Start both proxy server and React app
   npm run dev
   
   # Or run separately:
   # Terminal 1: npm run server
   # Terminal 2: npm start
   ```

3. **How it works:**
   - A Node.js proxy server runs on port 5000
   - It forwards API requests to Swiggy's servers
   - React app makes requests to localhost:5000 instead of directly to Swiggy
   - No CORS issues since the proxy server handles the external requests

### Solution 2: React Proxy (Development Only)

1. **Already configured in package.json:**
   ```json
   "proxy": "https://www.swiggy.com"
   ```

2. **To use this approach:**
   - Replace `constants.js` with `constants-proxy.js`
   - Run `npm start` normally
   - React dev server will proxy API calls automatically

## Files Modified

1. **server.js** - New proxy server
2. **package.json** - Added dependencies and scripts
3. **src/utils/constants.js** - Updated API endpoints
4. **src/components/Body.js** - Updated to use new API endpoint
5. **src/utils/useRestaurantMenu.js** - Updated to use new API endpoint

## Important Notes

- **For Development**: Use either solution
- **For Production**: Use Solution 1 (proxy server) and deploy both the React app and proxy server
- **Alternative for Production**: Use a backend API that handles these requests server-side

## Deployment Considerations

When deploying to production:
1. Deploy the proxy server to a service like Heroku, Vercel, or AWS
2. Update the API endpoints in constants.js to point to your deployed proxy server
3. Deploy your React app normally

## Troubleshooting

If you still get CORS errors:
1. Make sure the proxy server is running on port 5000
2. Check that your API endpoints in constants.js are correct
3. Ensure both React app and proxy server are running simultaneously