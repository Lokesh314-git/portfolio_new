import React, { useState } from 'react';
import { Award, Calendar, ExternalLink } from 'lucide-react';
import { certificatesData } from '../data/certificates';
import CertificateModal from '../components/certificates/CertificateModal';

export default function CertificatesSection() {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certificates" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>VERIFIED ACHIEVEMENTS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Certificates & Achievements
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Microsoft Azure AI certifications, Xebia Xe-Conclave participation, and cloud security applied skills.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-3 rounded-full" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificatesData.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="group cursor-pointer p-4 rounded-2xl bg-dark-800/90 border border-slate-800 hover:border-cyan-500/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Certificate Thumbnail */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-dark-900 border border-slate-700/60">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-dark-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1 rounded-full bg-cyan-500 text-white font-mono text-xs font-bold shadow-neon-cyan flex items-center gap-1">
                      <ExternalLink className="w-3.5 h-3.5" /> Inspect
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                  <span>{cert.issuer}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Calendar className="w-3 h-3" /> {cert.year}
                  </span>
                </div>

                <h3 className="font-display font-bold text-base text-white group-hover:text-cyan-400 transition-colors leading-snug mb-2">
                  {cert.title}
                </h3>
              </div>

              <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mt-2 pt-2 border-t border-slate-800">
                {cert.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedCert && (
        <CertificateModal
          certificate={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </section>
  );
}
