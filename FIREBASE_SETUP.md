# Firebase Authentication Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard:
   - Enter project name (e.g., "Astro Emporium")
   - Enable/disable Google Analytics (optional)
   - Click "Create project"

## Step 2: Enable Google Authentication

1. In your Firebase project, go to **Authentication** in the left sidebar
2. Click **Get Started** (if first time)
3. Go to the **Sign-in method** tab
4. Click on **Google** provider
5. Toggle **Enable** to ON
6. Enter your project support email
7. Click **Save**

## Step 3: Get Firebase Configuration

1. In Firebase Console, click the gear icon ⚙️ next to "Project Overview"
2. Select **Project settings**
3. Scroll down to **Your apps** section
4. Click the **Web** icon (`</>`) to add a web app
5. Register your app:
   - Enter app nickname (e.g., "Astro Emporium Web")
   - Check "Also set up Firebase Hosting" (optional)
   - Click **Register app**
6. Copy the Firebase configuration object

## Step 4: Add Environment Variables

Create a `.env.local` file in your project root (if it doesn't exist) and add:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

**Important:** 
- Replace all values with your actual Firebase config values
- The `NEXT_PUBLIC_` prefix is required for Next.js to expose these to the browser
- Never commit `.env.local` to version control (it's already in `.gitignore`)

## Step 5: Configure Authorized Domains

1. In Firebase Console, go to **Authentication** > **Settings**
2. Scroll to **Authorized domains**
3. Add your domains:
   - `localhost` (already added for development)
   - Your production domain (e.g., `yourdomain.com`)

## Step 6: Test the Setup

1. Start your development server: `npm run dev`
2. Navigate to `/login`
3. Click "Sign in with Google"
4. You should see the Google sign-in popup
5. After signing in, your account details will be saved automatically

## Account Storage

User account details are automatically saved to:
- **localStorage** (browser storage)
- Includes: email, display name, photo URL, provider, creation date, last login

### Viewing Saved Accounts

Accounts are stored in localStorage under:
- `astro_user_accounts` - Array of all user accounts
- `astro_current_user` - Current logged-in user

You can view these in browser DevTools > Application > Local Storage

## Troubleshooting

### "Firebase: Error (auth/popup-closed-by-user)"
- User closed the sign-in popup
- This is normal behavior, not an error

### "Firebase: Error (auth/unauthorized-domain)"
- Your domain is not authorized
- Add it in Firebase Console > Authentication > Settings > Authorized domains

### "Firebase: Error (auth/operation-not-allowed)"
- Google sign-in method is not enabled
- Enable it in Firebase Console > Authentication > Sign-in method

### Environment variables not working
- Make sure variables start with `NEXT_PUBLIC_`
- Restart your dev server after adding/changing env variables
- Check that `.env.local` is in the project root

## Security Notes

- Never expose your Firebase Admin SDK keys
- Only use `NEXT_PUBLIC_` prefixed variables for client-side code
- Firebase automatically handles security rules
- User authentication is handled securely by Firebase

## Production Deployment

When deploying to production:
1. Add your production domain to authorized domains
2. Update environment variables in your hosting platform
3. Ensure all `NEXT_PUBLIC_` variables are set correctly
4. Test Google sign-in on production domain
