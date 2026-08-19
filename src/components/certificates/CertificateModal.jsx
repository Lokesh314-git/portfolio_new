import React, { useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut, Award, Calendar, CheckCircle2 } from 'lucide-react';

export default function CertificateModal({ certificate, onClose }) {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!certificate) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-dark-900/90 backdrop-blur-xl animate-modal"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-dark-800 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Controls Header */}
        <div className="flex items-center justify-between mb-4 border-b border-slate-700/60 pb-3">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase">
            <Award className="w-4 h-4" />
            <span>OFFICIAL CERTIFICATION VIEW</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom(prev => Math.min(prev + 0.25, 2.5))}
              className="p-1.5 rounded-lg bg-dark-900 text-slate-300 hover:text-white border border-slate-700"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom(prev => Math.max(prev - 0.25, 1))}
              className="p-1.5 rounded-lg bg-dark-900 text-slate-300 hover:text-white border border-slate-700"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-dark-900 text-slate-300 hover:text-white border border-slate-700 ml-2"
              aria-label="Close Certificate Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Image View */}
        <div className="relative overflow-hidden rounded-xl bg-black border border-slate-800 flex items-center justify-center p-2 mb-6 min-h-[280px]">
          <img
            src={certificate.image}
            alt={certificate.title}
            className="max-h-[60vh] object-contain transition-transform duration-200"
            style={{ transform: `scale(${zoom})` }}
          />
        </div>

        {/* Certificate Metadata */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <h2 className="font-display text-2xl font-bold text-white">{certificate.title}</h2>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-cyan-300 font-semibold">
                {certificate.issuer}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                {certificate.year}
              </span>
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            {certificate.description}
          </p>

          {certificate.skills && certificate.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {certificate.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-dark-900 border border-slate-700 text-slate-300"
                >
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
