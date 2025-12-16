'use client';

import { useState } from 'react';
import { FaXTwitter, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa6';
import ColorMatchGame from '@/components/ColorMatchGame';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData();
    formData.append('access_key', 'b3673d69-0a75-4567-8d2d-50786ba24382'); // Add your Web3Forms access key here
    formData.append('email', email);
    formData.append('subject', 'New Coming Soon Subscription');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-40 left-20 w-80 h-80 bg-blue-700 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          {/* Logo or brand name */}
          <div className="mb-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold font-heading bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent mb-3 tracking-tight">
              StyloFront
            </h1>
          </div>

          {/* Coming Soon Badge */}
          <div className="inline-block mb-6 animate-fade-in animation-delay-500">
            <span className="px-4 py-1.5 bg-white/10 font-heading backdrop-blur-md border border-white/20 rounded-full text-white/90 text-xs font-medium tracking-wider">
              COMING SOON
            </span>
          </div>

          {/* Main heading */}
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4 animate-fade-in animation-delay-1000 leading-tight">
            Something Amazing is
            <br />
            <span className="bg-gradient-to-r font-body from-blue-400 to-blue-500 bg-clip-text text-transparent">
              On Its Way
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-base md:text-lg text-white/60 font-body mb-10 max-w-xl mx-auto animate-fade-in animation-delay-1500 leading-relaxed">
            We're crafting an extraordinary experience that will revolutionize the way you build and design.
            Stay tuned for something truly special.
          </p>

          {/* Email notification form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto animate-fade-in animation-delay-2000">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full sm:flex-1 px-5 font-body py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full sm:w-auto px-6 py-3 cursor-pointer font-body bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-800 disabled:to-blue-900 text-white font-semibold rounded-lg transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 text-sm"
            >
              {status === 'sending' ? 'Sending...' : 'Notify Me'}
            </button>
          </form>

          {/* Status messages */}
          {status === 'success' && (
            <p className="mt-4 text-green-400 text-sm font-body animate-fade-in">
              Thanks! We'll notify you when we launch.
            </p>
          )}
          {status === 'error' && (
            <p className="mt-4 text-red-400 text-sm font-body animate-fade-in">
              Something went wrong. Please try again.
            </p>
          )}

          {/* Social links */}
          <div className="mt-12 animate-fade-in font-body animation-delay-2500">
            <p className="text-white/40 text-xs mb-3">
              Follow our journey
            </p>
            <div className="flex gap-5 justify-center">
              <a href="https://x.com/stylofront" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors transform hover:scale-110">
                <FaXTwitter className="w-5 h-5" />
              </a>
              <a href="https://facebook.com/stylofront" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors transform hover:scale-110">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/stylofront" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors transform hover:scale-110">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@stylofront" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors transform hover:scale-110">
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Game Section */}
      <ColorMatchGame />
    </>
  );
}
