import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

export const AdminAuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen, login, isAuthenticated } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!authModalOpen && !isAuthenticated) return null;
  if (!authModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const success = login(email, password);
      setIsLoading(false);
      if (!success) {
        setErrorMsg('Invalid credentials. Check email & password or use Demo Credentials.');
      }
    }, 400);
  };

  const handleQuickDemo = () => {
    setEmail('admin@violetmuse.com');
    setPassword('admin123');
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 bg-inverse-surface/50 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="absolute inset-0" onClick={() => setAuthModalOpen(false)} />

      <div className="relative z-10 bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#eddcf6] animate-scaleUp">
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute right-5 top-5 w-8 h-8 rounded-full bg-[#faf0ff] flex items-center justify-center text-outline hover:text-on-surface cursor-pointer transition-colors border border-[#eddcf6]"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1 mb-6">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-primary to-primary-container text-white flex items-center justify-center mx-auto mb-3 shadow-md">
            <span className="material-symbols-outlined text-[26px]">admin_panel_settings</span>
          </div>
          <span className="text-xs text-primary uppercase tracking-widest font-bold">
            Atelier Management Portal
          </span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
            Admin Authentication
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs mx-auto mt-1">
            Sign in to access product inventory, live WhatsApp orders, and store configuration.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 mb-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl font-body-sm text-body-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-label-sm text-label-sm text-on-surface font-semibold block mb-1.5">
              Admin Email Address
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                mail
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@violetmuse.com"
                className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-[#faf0ff] border border-[#eddcf6] font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div>
            <label className="font-label-sm text-label-sm text-on-surface font-semibold block mb-1.5">
              Security Passcode
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                key
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-[#faf0ff] border border-[#eddcf6] font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* 1-Click Demo Credentials Pill */}
          <div className="p-3 rounded-xl bg-[#faf0ff] border border-[#eddcf6] flex items-center justify-between text-xs">
            <span className="text-on-surface-variant">
              Demo: <code className="font-mono text-primary font-bold">admin@violetmuse.com</code>
            </span>
            <button
              type="button"
              onClick={handleQuickDemo}
              className="text-primary hover:underline font-bold cursor-pointer"
            >
              Autofill
            </button>
          </div>

          <div className="pt-2 space-y-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-lg bg-primary hover:bg-primary-container text-white font-label-md text-label-md font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">login</span>
                  <span>Sign In to Dashboard</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setAuthModalOpen(false)}
              className="w-full py-2 text-center text-outline hover:text-on-surface font-label-sm text-label-sm cursor-pointer"
            >
              Return to Store
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
