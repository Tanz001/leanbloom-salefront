const API_BASE =
  (import.meta as ImportMeta & { env: Record<string, string> }).env
    ?.VITE_API_URL || 'http://localhost:4000';

export function mediaUrl(path?: string | null): string | null {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;
}

export type StorefrontTenant = {
  id: string;
  name: string;
  slug: string;
  subdomain: string;
  customDomain: string;
  logoUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  businessName: string;
  tagline: string;
  welcomeMessage: string;
  supportEmail: string;
  supportPhone: string;
  hidePoweredBy: boolean;
  clinicAddress?: string;
  businessHours?: string;
  clinicalPartnerNote?: string;
  trustBadgeText?: string;
};

export type StorefrontProductDto = {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string | null;
  buyUrl?: string | null;
  price: number;
  basePrice: number;
  minimumPrice: number;
  stockStatus: string;
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> | undefined),
  };
  if (!headers['Content-Type'] && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      (data as { message?: string }).message || `Request failed (${res.status})`
    );
  }
  return data as T;
}

export const storefrontApi = {
  listTenants() {
    return request<{ tenants: StorefrontTenant[] }>('/api/storefront/tenants');
  },

  resolveTenant(params: { host?: string; slug?: string; id?: string }) {
    const q = new URLSearchParams();
    if (params.host) q.set('host', params.host);
    if (params.slug) q.set('slug', params.slug);
    if (params.id) q.set('id', params.id);
    return request<{ tenant: StorefrontTenant }>(
      `/api/storefront/tenant?${q.toString()}`
    );
  },

  listProducts(affiliateId: string) {
    return request<{
      tenant: StorefrontTenant;
      products: StorefrontProductDto[];
    }>(`/api/storefront/${affiliateId}/products`);
  },

  checkout(payload: {
    affiliateId: string;
    fullName: string;
    email: string;
    phone?: string;
    state?: string;
    shippingAddress?: {
      addressLine1?: string;
      addressLine2?: string;
      city?: string;
      state?: string;
      zipCode?: string;
    };
    items: { productId: string; quantity: number }[];
  }) {
    return request<{
      message: string;
      patientId: string;
      orderIds: string[];
      orderNumbers: string[];
      primaryOrderNumber: string;
      total: number;
      affiliateName: string;
      patient: {
        fullName: string;
        email: string;
        phone: string;
        state: string;
        shippingAddress: string;
      };
      items: {
        productId: string;
        productName: string;
        quantity: number;
        unitPrice: number;
        lineTotal: number;
      }[];
    }>('/api/storefront/checkout', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};
