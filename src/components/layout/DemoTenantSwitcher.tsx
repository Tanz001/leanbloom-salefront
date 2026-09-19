import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';
import { Sparkles, Globe, ChevronDown, ChevronUp, Layers, CheckCircle2 } from 'lucide-react';

export const DemoTenantSwitcher: React.FC = () => {
  const { tenant, allTenants, setTenantById, simulatedHostname, setSimulatedHostname } = useTenant();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [customHostInput, setCustomHostInput] = useState<string>('');

  const handleCustomHostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customHostInput.trim()) {
      setSimulatedHostname(customHostInput.trim());
      setCustomHostInput('');
    }
  };

  return (
    <div id="demo-tenant-bar" className="bg-[#0b1727] text-slate-200 border-b border-slate-800 text-xs py-2 px-3 sm:px-6 relative z-50 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Mode indication & Active Affiliate */}
        <div className="flex items-center gap-2.5 flex-wrap justify-center md:justify-start">
          <span className="inline-flex items-center gap-1.5 bg-sky-950/80 text-sky-400 font-semibold px-2 py-0.5 rounded-full border border-sky-800/60 uppercase tracking-wider text-[10px]">
            <Sparkles className="w-3 h-3 text-sky-400" />
            Multi-Tenant White-Label Demo
          </span>

          <span className="text-slate-400 hidden sm:inline">|</span>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Active Storefront:</span>
            <span className="font-semibold text-white flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full inline-block ring-2 ring-white/20"
                style={{ backgroundColor: tenant.primaryColor }}
              />
              {tenant.businessName}
            </span>
            <span className="text-slate-400 text-[11px] font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800 hidden lg:inline">
              {simulatedHostname}
            </span>
          </div>
        </div>

        {/* Right: Fast Switcher & Toggle */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <div className="flex items-center bg-slate-900/90 rounded-lg p-1 border border-slate-800 gap-1">
            {allTenants.map((t) => {
              const isActive = t.id === tenant.id;
              return (
                <button
                  key={t.id}
                  id={`tenant-switch-btn-${t.slug}`}
                  onClick={() => setTenantById(t.id)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                  title={`Switch to ${t.name} (${t.subdomain})`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: t.primaryColor }}
                  />
                  <span>{t.slug.toUpperCase()}</span>
                  {isActive && <CheckCircle2 className="w-3 h-3 text-emerald-400 ml-0.5" />}
                </button>
              );
            })}
          </div>

          <button
            id="toggle-tenant-details-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-slate-400 hover:text-slate-200 px-2 py-1 rounded text-[11px] hover:bg-slate-800 transition-colors"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tenant Config</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expanded Details Drawer */}
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-slate-800/80 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 pb-2 animate-in fade-in duration-200">
          <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
            <h4 className="font-semibold text-slate-300 text-[11px] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              Domain Resolution Architecture
            </h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              In production, the storefront dynamically resolves the tenant using{' '}
              <code className="text-sky-300 bg-slate-950 px-1 py-0.5 rounded">window.location.hostname</code>.
              Custom domains (e.g. <span className="text-slate-200">{tenant.customDomain}</span>) and subdomains map to this affiliate config automatically.
            </p>
            <form onSubmit={handleCustomHostSubmit} className="mt-2.5 flex gap-1.5">
              <input
                type="text"
                placeholder="e.g. shop.partnerb.com"
                value={customHostInput}
                onChange={(e) => setCustomHostInput(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[11px] text-slate-200 flex-1 focus:outline-none focus:border-sky-500"
              />
              <button
                type="submit"
                className="bg-sky-600 hover:bg-sky-500 text-white px-2.5 py-1 rounded text-[11px] font-medium transition-colors"
              >
                Simulate Host
              </button>
            </form>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
            <h4 className="font-semibold text-slate-300 text-[11px] uppercase tracking-wider mb-1.5">
              Active Affiliate CSS Variables
            </h4>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between text-slate-300">
                <span className="font-mono text-slate-400">--brand-primary:</span>
                <span className="flex items-center gap-1.5 font-mono">
                  <span className="w-3 h-3 rounded" style={{ backgroundColor: tenant.primaryColor }} />
                  {tenant.primaryColor}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="font-mono text-slate-400">--brand-secondary:</span>
                <span className="flex items-center gap-1.5 font-mono">
                  <span className="w-3 h-3 rounded" style={{ backgroundColor: tenant.secondaryColor }} />
                  {tenant.secondaryColor}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Powered By LeanBloom:</span>
                <span className={`font-medium ${tenant.hidePoweredBy ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {tenant.hidePoweredBy ? 'Hidden (White-Labeled)' : 'Visible in Footer'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
            <h4 className="font-semibold text-slate-300 text-[11px] uppercase tracking-wider mb-1.5">
              Direct Contact & Fulfillment Handoff
            </h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Patients contact <strong className="text-slate-200">{tenant.supportEmail}</strong> or{' '}
              <strong className="text-slate-200">{tenant.supportPhone}</strong>. Prescriptions & fulfillment are routed asynchronously into LeanBloom/MyDose network.
            </p>
            <div className="mt-2 text-[10px] text-slate-500 font-mono">
              Affiliate ID: {tenant.id}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
