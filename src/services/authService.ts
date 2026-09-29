import { SupportedCurrencyCode, SupportedLanguageCode, UserProfile } from '../types';

export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authProvider: 'local_development' | 'firebase' | 'oauth_google';
  pendingPhoneVerification?: {
    phoneNumber: string;
    generatedOtp: string;
    expiresAt: number;
  };
}

const STORAGE_KEY = 'digital_product_auth_session';

class AuthService {
  private state: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    authProvider: 'local_development',
  };

  private listeners: ((state: AuthState) => void)[] = [];

  constructor() {
    this.loadSession();
  }

  private loadSession() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.user) {
          this.state = {
            user: parsed.user,
            isAuthenticated: true,
            isLoading: false,
            authProvider: parsed.authProvider || 'local_development',
          };
        }
      }
    } catch {
      // Ignore storage errors
    }
  }

  private persistSession() {
    try {
      if (this.state.user) {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            user: this.state.user,
            authProvider: this.state.authProvider,
          })
        );
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Ignore
    }
    this.notify();
  }

  public subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.push(listener);
    listener(this.state);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l({ ...this.state }));
  }

  public getState(): AuthState {
    return { ...this.state };
  }

  // --- Email Authentication ---

  public async signInWithEmail(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (!password || password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    this.state.isLoading = true;
    this.notify();

    // In production with Firebase Auth, you would call:
    // await signInWithEmailAndPassword(auth, email, password);
    await new Promise((res) => setTimeout(res, 600));

    const name = email.split('@')[0];
    const user: UserProfile = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email: email.toLowerCase(),
      role: email.includes('admin') ? 'admin' : 'business_creator',
      preferredLanguage: 'en',
      preferredCurrency: 'USD',
      plan: 'pro',
      company: 'Global Brands Ltd.',
      createdAt: new Date().toISOString(),
    };

    this.state = {
      user,
      isAuthenticated: true,
      isLoading: false,
      authProvider: 'local_development',
    };
    this.persistSession();
    return { success: true };
  }

  public async signUpWithEmail(
    email: string,
    password: string,
    name: string,
    company?: string
  ): Promise<{ success: boolean; error?: string }> {
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please provide a valid email.' };
    }
    if (!password || password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }
    if (!name || name.trim().length < 2) {
      return { success: false, error: 'Please enter your full name.' };
    }

    this.state.isLoading = true;
    this.notify();

    await new Promise((res) => setTimeout(res, 600));

    const user: UserProfile = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      email: email.toLowerCase(),
      role: 'business_creator',
      preferredLanguage: 'en',
      preferredCurrency: 'USD',
      plan: 'free',
      company: company || 'My Growth Startup',
      createdAt: new Date().toISOString(),
    };

    this.state = {
      user,
      isAuthenticated: true,
      isLoading: false,
      authProvider: 'local_development',
    };
    this.persistSession();
    return { success: true };
  }

  // --- Phone + OTP Authentication ---

  public async sendPhoneOtp(phoneNumber: string): Promise<{ success: boolean; testOtp?: string; error?: string }> {
    const cleaned = phoneNumber.replace(/[^0-9+]/g, '');
    if (cleaned.length < 8) {
      return { success: false, error: 'Please enter a valid international phone number (e.g. +1 555-0192 or +251 911-234567).' };
    }

    // Generate 6 digit code for dev verification
    const generatedOtp = '482910';

    this.state.pendingPhoneVerification = {
      phoneNumber: cleaned,
      generatedOtp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    };
    this.notify();

    return { success: true, testOtp: generatedOtp };
  }

  public async verifyPhoneOtp(otp: string): Promise<{ success: boolean; error?: string }> {
    if (!this.state.pendingPhoneVerification) {
      return { success: false, error: 'No active OTP verification session found. Please request a new code.' };
    }

    if (Date.now() > this.state.pendingPhoneVerification.expiresAt) {
      return { success: false, error: 'Verification code expired. Please request a new code.' };
    }

    // Allow the test OTP or standard sandbox code
    if (otp !== this.state.pendingPhoneVerification.generatedOtp && otp !== '123456') {
      return { success: false, error: 'Invalid verification code. Please check and retry.' };
    }

    const phone = this.state.pendingPhoneVerification.phoneNumber;
    const user: UserProfile = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: `User ${phone.slice(-4)}`,
      email: `user_${phone.slice(-4)}@digitalproduct.ai`,
      phone,
      role: 'business_creator',
      preferredLanguage: 'en',
      preferredCurrency: 'USD',
      plan: 'free',
      createdAt: new Date().toISOString(),
    };

    this.state = {
      user,
      isAuthenticated: true,
      isLoading: false,
      authProvider: 'local_development',
      pendingPhoneVerification: undefined,
    };
    this.persistSession();
    return { success: true };
  }

  // --- Google OAuth Flow ---

  public async signInWithGoogle(): Promise<{ success: boolean; error?: string }> {
    this.state.isLoading = true;
    this.notify();

    await new Promise((res) => setTimeout(res, 800));

    const user: UserProfile = {
      id: 'usr_google_' + Math.random().toString(36).substr(2, 8),
      name: 'Alex Rivera',
      email: 'alex.rivera@globalbrands.io',
      role: 'business_creator',
      preferredLanguage: 'en',
      preferredCurrency: 'USD',
      plan: 'pro',
      company: 'Rivera Growth Agency',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      createdAt: new Date().toISOString(),
    };

    this.state = {
      user,
      isAuthenticated: true,
      isLoading: false,
      authProvider: 'oauth_google',
    };
    this.persistSession();
    return { success: true };
  }

  // --- Password Reset ---

  public async requestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    await new Promise((res) => setTimeout(res, 500));
    return {
      success: true,
      message: `Password reset instructions have been dispatched to ${email}.`,
    };
  }

  public async resetPassword(newPassword: string): Promise<{ success: boolean; message: string }> {
    if (!newPassword || newPassword.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters.' };
    }
    await new Promise((res) => setTimeout(res, 500));
    return {
      success: true,
      message: 'Password successfully updated. You may now sign in with your new credentials.',
    };
  }

  // --- Profile Updates & Logout ---

  public updateProfile(updates: Partial<UserProfile>) {
    if (this.state.user) {
      this.state.user = { ...this.state.user, ...updates };
      this.persistSession();
    }
  }

  public logout() {
    this.state = {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      authProvider: 'local_development',
      pendingPhoneVerification: undefined,
    };
    this.persistSession();
  }
}

export const authService = new AuthService();
