import React, { createContext, useContext, useEffect, useState } from 'react';
import { AffiliateBranding } from '../types';
import { mediaUrl, storefrontApi, type StorefrontTenant } from '../lib/api';

interface TenantContextType {
  tenant: AffiliateBranding;
  allTenants: AffiliateBranding[];
  setTenantById: (id: string) => void;
  setTenantByHostname: (hostname: string) => void;
  simulatedHostname: string;
  setSimulatedHostname: (host: string) => void;
  isSwitchingTenant: boolean;
  isLoadingTenants: boolean;
  tenantError: string | null;
  tenantReady: boolean;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'leanbloom_active_tenant_id';
const LOCAL_STORAGE_HOST_KEY = 'leanbloom_simulated_host';

const EMPTY_TENANT: AffiliateBranding = {
  id: '',
  name: '',
  slug: '',
  subdomain: '',
  customDomain: '',
  primaryColor: '#173B72',
  secondaryColor: '#4FAF4A',
  primaryColorSoft: 'rgba(23, 59, 114, 0.08)',
  businessName: 'LeanBloom',
  tagline: '',
  welcomeMessage: '',
  supportEmail: '',
  supportPhone: '',
  hidePoweredBy: false,
};

function softColor(hex: string, alpha = 0.14): string {
  const raw = hex.replace('#', '');
  if (raw.length !== 6) return `color-mix(in srgb, ${hex} ${Math.round(alpha * 100)}%, transparent)`;
  const r = parseInt(raw.slice(0, 2), 16);
  const g = parseInt(raw.slice(2, 4), 16);
  const b = parseInt(raw.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function mapTenant(t: StorefrontTenant): AffiliateBranding {
  return {
    id: t.id,
    name: t.name,
    slug: t.slug,
    subdomain: t.subdomain,
    customDomain: t.customDomain || '',
    logoUrl: mediaUrl(t.logoUrl) || undefined,
    primaryColor: t.primaryColor,
    secondaryColor: t.secondaryColor,
    primaryColorSoft: softColor(t.primaryColor, 0.14),
    businessName: t.businessName || t.name,
    tagline: t.tagline || '',
    welcomeMessage: t.welcomeMessage || '',
    supportEmail: t.supportEmail || '',
    supportPhone: t.supportPhone || '',
    hidePoweredBy: t.hidePoweredBy,
    clinicAddress: t.clinicAddress,
    businessHours: t.businessHours,
    clinicalPartnerNote: t.clinicalPartnerNote,
    trustBadgeText: t.trustBadgeText,
  };
}

function applyBrandCss(tenant: AffiliateBranding) {
  const root = document.documentElement;
  root.style.setProperty('--brand-primary', tenant.primaryColor);
  root.style.setProperty('--brand-secondary', tenant.secondaryColor);
  root.style.setProperty(
    '--brand-primary-soft',
    tenant.primaryColorSoft || softColor(tenant.primaryColor, 0.14)
  );
  root.style.setProperty(
    '--brand-secondary-soft',
    softColor(tenant.secondaryColor, 0.18)
  );
  root.style.setProperty('--gold', tenant.secondaryColor);
  root.style.setProperty('--gold-soft', softColor(tenant.secondaryColor, 0.15));
  document.title = tenant.businessName
    ? `${tenant.businessName} | Patient Portal`
    : 'Patient Portal';
}

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [allTenants, setAllTenants] = useState<AffiliateBranding[]>([]);
  const [tenant, setTenant] = useState<AffiliateBranding>(EMPTY_TENANT);
  const [simulatedHostname, setSimulatedHostnameState] = useState<string>(
    () => localStorage.getItem(LOCAL_STORAGE_HOST_KEY) || ''
  );
  const [isSwitchingTenant, setIsSwitchingTenant] = useState(false);
  const [isLoadingTenants, setIsLoadingTenants] = useState(true);
  const [tenantError, setTenantError] = useState<string | null>(null);
  const [tenantReady, setTenantReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setIsLoadingTenants(true);
      setTenantError(null);
      try {
        const host =
          typeof window !== 'undefined' ? window.location.hostname : '';
        const isLocal = /^(localhost|127\.0\.0\.1)$/i.test(host);

        let resolved: AffiliateBranding | undefined;

        if (!isLocal && host) {
          try {
            const { tenant: byHost } = await storefrontApi.resolveTenant({
              host,
            });
            resolved = mapTenant(byHost);
          } catch {
            // fall through to list
          }
        }

        const { tenants } = await storefrontApi.listTenants();
        if (cancelled) return;
        const mapped = tenants.map(mapTenant);
        setAllTenants(mapped);

        if (!resolved) {
          const savedId = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (savedId) {
            resolved = mapped.find((t) => t.id === savedId);
          }
        }

        if (!resolved && mapped.length) {
          resolved = mapped[0];
        }

        if (resolved) {
          setTenant(resolved);
          setSimulatedHostnameState(resolved.customDomain || resolved.subdomain);
          localStorage.setItem(LOCAL_STORAGE_KEY, resolved.id);
          localStorage.setItem(
            LOCAL_STORAGE_HOST_KEY,
            resolved.customDomain || resolved.subdomain
          );
          setTenantReady(true);
        } else {
          setTenantError('No active storefronts found');
          setTenantReady(false);
        }
      } catch (err) {
        if (!cancelled) {
          setTenantError(
            err instanceof Error ? err.message : 'Failed to load storefronts'
          );
          setTenantReady(false);
        }
      } finally {
        if (!cancelled) setIsLoadingTenants(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!tenant.id) return;
    applyBrandCss(tenant);
    localStorage.setItem(LOCAL_STORAGE_KEY, tenant.id);
  }, [tenant]);

  const setTenantById = (id: string) => {
    const target = allTenants.find((t) => t.id === id);
    if (target && target.id !== tenant.id) {
      setIsSwitchingTenant(true);
      setTimeout(() => {
        setTenant(target);
        setSimulatedHostnameState(target.customDomain || target.subdomain);
        localStorage.setItem(
          LOCAL_STORAGE_HOST_KEY,
          target.customDomain || target.subdomain
        );
        setIsSwitchingTenant(false);
      }, 180);
    }
  };

  const setTenantByHostname = async (host: string) => {
    setIsSwitchingTenant(true);
    setSimulatedHostnameState(host);
    localStorage.setItem(LOCAL_STORAGE_HOST_KEY, host);

    try {
      const { tenant: byHost } = await storefrontApi.resolveTenant({ host });
      setTenant(mapTenant(byHost));
    } catch {
      const matched = allTenants.find(
        (a) =>
          a.customDomain.toLowerCase() === host.toLowerCase() ||
          a.subdomain.toLowerCase() === host.toLowerCase() ||
          host.toLowerCase().startsWith(`${a.slug}.`)
      );
      if (matched) setTenant(matched);
    } finally {
      setIsSwitchingTenant(false);
    }
  };

  const setSimulatedHostname = (host: string) => {
    void setTenantByHostname(host);
  };

  return (
    <TenantContext.Provider
      value={{
        tenant,
        allTenants,
        setTenantById,
        setTenantByHostname,
        simulatedHostname,
        setSimulatedHostname,
        isSwitchingTenant: isSwitchingTenant || isLoadingTenants,
        isLoadingTenants,
        tenantError,
        tenantReady,
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
