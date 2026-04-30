import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col items-center justify-center p-gutter overflow-hidden">
      {/* Background Wave Visual */}
      <div className="animated-wave-bg">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,500 C200,400 300,600 500,500 C700,400 800,600 1000,500 L1000,1000 L0,1000 Z" fill="url(#wave-grad)" opacity="0.5">
            </path>
            <defs>
              <linearGradient id="wave-grad" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" style={{stopColor: '#00e5ff', stopOpacity: 0.2}}></stop>
                <stop offset="100%" style={{stopColor: '#43ed9c', stopOpacity: 0.1}}></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      
      {/* Login Shell */}
      <main className="w-full max-w-[440px] z-10">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 bg-gradient-to-tr from-primary-container to-secondary rounded-xl flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(0,229,255,0.3)]">
            <span className="material-symbols-outlined text-on-primary-container text-4xl" data-weight="fill">graphic_eq</span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-white tracking-tighter">SONIC NOIR</h1>
          <p className="font-body-md text-on-surface-variant mt-2">Enter the nocturnal sanctuary of sound.</p>
        </div>
        
        {/* Center Login Card */}
        <div className="glass-card rounded-[24px] p-10 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-container via-secondary to-primary-container opacity-50"></div>
          <form className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase ml-1" htmlFor="email">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">mail</span>
                <input className="w-full bg-surface-container-highest/50 border border-outline-variant/30 rounded-xl py-4 pl-12 pr-4 text-white font-body-md cyan-glow-focus transition-all duration-300 placeholder:text-outline/50" id="email" placeholder="curator@sonicnoir.com" type="email"/>
              </div>
            </div>
            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase" htmlFor="password">Password</label>
                <Link to="#" className="font-label-sm text-label-sm text-outline hover:text-primary-container transition-colors duration-200">Forgot Password?</Link>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">lock</span>
                <input className="w-full bg-surface-container-highest/50 border border-outline-variant/30 rounded-xl py-4 pl-12 pr-12 text-white font-body-md cyan-glow-focus transition-all duration-300 placeholder:text-outline/50" id="password" placeholder="••••••••" type="password"/>
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-white transition-colors" type="button">
                  <span className="material-symbols-outlined text-[20px]">visibility</span>
                </button>
              </div>
            </div>
            {/* Sign In Button */}
            <Link to="/dashboard" className="w-full bg-primary-container text-on-primary-container font-headline-md text-body-lg py-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(0,229,255,0.2)] hover:shadow-[0_12px_24px_rgba(0,229,255,0.3)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300">
              <span>Sign In</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </form>
        </div>
        
        {/* Footer Navigation */}
        <div className="mt-8 text-center">
          <p className="font-body-md text-on-surface-variant">
            New to the lounge? 
            <Link to="/register" className="text-secondary font-semibold hover:text-primary transition-colors duration-200 ml-1 border-b border-secondary/0 hover:border-secondary/100">Create an account</Link>
          </p>
        </div>
      </main>
      
      {/* Decorative Corner Element */}
      <div className="fixed bottom-12 right-12 opacity-40 hidden lg:block">
        <div className="flex items-end gap-1 h-12">
          <div className="w-1 bg-primary-container h-8 rounded-full"></div>
          <div className="w-1 bg-primary-container h-12 rounded-full"></div>
          <div className="w-1 bg-secondary h-6 rounded-full"></div>
          <div className="w-1 bg-primary-container h-10 rounded-full"></div>
          <div className="w-1 bg-secondary h-4 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
