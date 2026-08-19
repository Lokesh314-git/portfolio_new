import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Send, Download, Terminal, Check } from 'lucide-react';
import { personalData } from '../data/personal';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>COMMUNICATION CONSOLE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Contact Me
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Based in Chennai, India. Reach out for web development projects, AI/ML opportunities, or tech collaborations.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-3 rounded-full" />
        </div>

        {/* Communication Console Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Email Console */}
          <div className="p-6 rounded-2xl bg-dark-800/90 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-1">Email Station</h3>
              <p className="text-slate-400 text-xs font-mono mb-4">Direct inbox link</p>
              <a
                href={`mailto:${personalData.email}`}
                className="text-cyan-400 hover:underline font-mono text-xs break-all font-semibold"
              >
                {personalData.email}
              </a>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex gap-2">
              <a
                href={`mailto:${personalData.email}`}
                className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs text-center shadow-neon-cyan flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Send Email
              </a>
              <button
                onClick={handleCopyEmail}
                className="py-2 px-3 rounded-xl bg-dark-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-mono"
                title="Copy email to clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-cyan-400" /> : 'Copy'}
              </button>
            </div>
          </div>

          {/* LinkedIn Console */}
          <div className="p-6 rounded-2xl bg-dark-800/90 border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-4">
                <Linkedin className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-1">LinkedIn Profile</h3>
              <p className="text-slate-400 text-xs font-mono mb-4">Professional Network</p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Connect with me on LinkedIn for regular project updates and tech networking.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <a
                href={personalData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-dark-900 hover:bg-slate-800 border border-blue-500/40 text-blue-400 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Linkedin className="w-4 h-4" /> Connect on LinkedIn
              </a>
            </div>
          </div>

          {/* Phone & Resume Console */}
          <div className="p-6 rounded-2xl bg-dark-800/90 border border-slate-800 hover:border-orange-500/40 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/40 flex items-center justify-center text-orange-400 mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-1">Direct Call</h3>
              <p className="text-slate-400 text-xs font-mono mb-4">{personalData.phone}</p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Available during standard business hours in IST (Chennai, India).
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col gap-2">
              <a
                href={`tel:${personalData.phone}`}
                className="w-full py-2 px-3 rounded-xl bg-dark-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-orange-400" /> Call {personalData.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
