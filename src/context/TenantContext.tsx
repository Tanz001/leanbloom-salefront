import React, { createContext, useContext, useEffect, useState } from 'react';
import { DEMO_AFFILIATES, DEFAULT_AFFILIATE, resolveAffiliateByHostname } from '../data/affiliates';
import { AffiliateBranding } from '../types';

interface TenantContextType {
  tenant: AffiliateBranding;
  allTenants: AffiliateBranding[];
  setTenantById: (id: string) => void;
  setTenantByHostname: (hostname: string) => void;
  simulatedHostname: string;
  setSimulatedHostname: (host: string) => void;
  isSwitchingTenant: boolean;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'leanbloom_active_tenant_id';
const LOCAL_STORAGE_HOST_KEY = 'leanbloom_simulated_host';

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tenant, setTenant] = useState<AffiliateBranding>(() => {
    // Check if user previously saved a tenant selection in demo mode
    const savedTenantId = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedTenantId) {
      const found = DEMO_AFFILIATES.find((t) => t.id === savedTenantId);
      if (found) return found;
    }

    // Otherwise check hostname if in a real environment
    if (typeof window !== 'undefined' && window.location.hostname) {
      const resolved = resolveAffiliateByHostname(window.location.hostname);
      if (resolved && resolved.id !== 'leanbloom-default') {
        return resolved;
      }
    }

    return DEFAULT_AFFILIATE;
  });

  const [simulatedHostname, setSimulatedHostnameState] = useState<string>(() => {
    return localStorage.getItem(LOCAL_STORAGE_HOST_KEY) || tenant.subdomain;
  });

  const [isSwitchingTenant, setIsSwitchingTenant] = useState<boolean>(false);

  // Apply CSS Variables dynamically whenever active tenant changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--brand-primary', tenant.primaryColor);
    root.style.setProperty('--brand-secondary', tenant.secondaryColor);
    
    // Generate soft tints
    const primarySoft = tenant.primaryColorSoft || `${tenant.primaryColor}14`;
    const secondarySoft = `${tenant.secondaryColor}1a`;
    root.style.setProperty('--brand-primary-soft', primarySoft);
    root.style.setProperty('--brand-secondary-soft', secondarySoft);

    // Dynamic browser title update
    document.title = `${tenant.businessName} | Patient Portal`;

    localStorage.setItem(LOCAL_STORAGE_KEY, tenant.id);
  }, [tenant]);

  const setTenantById = (id: string) => {
    const target = DEMO_AFFILIATES.find((t) => t.id === id);
    if (target && target.id !== tenant.id) {
      setIsSwitchingTenant(true);
      setTimeout(() => {
        setTenant(target);
        setSimulatedHostnameState(target.subdomain);
        localStorage.setItem(LOCAL_STORAGE_HOST_KEY, target.subdomain);
        setIsSwitchingTenant(false);
      }, 180);
    }
  };

  const setTenantByHostname = (host: string) => {
    setIsSwitchingTenant(true);
    setSimulatedHostnameState(host);
    localStorage.setItem(LOCAL_STORAGE_HOST_KEY, host);
    const resolved = resolveAffiliateByHostname(host);
    setTimeout(() => {
      setTenant(resolved);
      setIsSwitchingTenant(false);
    }, 180);
  };

  const setSimulatedHostname = (host: string) => {
    setTenantByHostname(host);
  };

  return (
    <TenantContext.Provider
      value={{
        tenant,
        allTenants: DEMO_AFFILIATES,
        setTenantById,
        setTenantByHostname,
        simulatedHostname,
        setSimulatedHostname,
        isSwitchingTenant,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
};

export function useTenant(): TenantContextType {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}
