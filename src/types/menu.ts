export type DietaryType = 'veg' | 'non-veg' | 'dessert' | 'beverage' | 'combo';

export interface PriceOption {
  label: string; // e.g. "5 pcs", "10 pcs", "Small", "Medium", "Large", "2 pieces", "4 pieces", "12 pieces"
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  dietary: DietaryType;
  // If single price:
  price?: number;
  // If multiple portion sizes:
  portions?: PriceOption[];
  description?: string;
  isPopular?: boolean;
  isSpecial?: boolean;
  needsVerification?: boolean;
  verificationNote?: string;
  sourceType?: string;
  status: 'published' | 'draft';
}

export interface ComboItem {
  id: string;
  name: string;
  price: number;
  sourceType: string;
  description: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  dietary: DietaryType;
  description: string;
  iconName: string;
  items: MenuItem[];
  section?: string;
  sectionTitle?: string;
  sectionDescription?: string;
}

export interface OwnerVerificationEntry {
  id: string;
  title: string;
  category: string;
  currentDisplay: string;
  conflictDescription: string;
  options: {
    source: string;
    details: string;
  }[];
  suggestedAction: string;
  isConfirmed: boolean;
}
