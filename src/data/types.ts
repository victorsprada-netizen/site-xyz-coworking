import { IDifferentialItem } from "@/components/Home/DifferentialsSection/DifferentialSection";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface IServicePlan {
  label: string;
  period: string;
  price: number;
  included: string[];
  whatsappMessage?: string;
  whatsappMessageOriginal?: string;
  customPriceText?: string;
  [key: string]: any;
}

export interface IServiceItem {
  title: string;
  seoTitle: string;
  description: string;
  image: string;
  slug: string;
  heroText: string;
  homeCard: {
    title: string;
    description: string;
  };
  detailsPage: {
    h1: string;
    subtitle: string;
    heroCTAText: string;
    benefitsSection: {
      h2: string;
      subtitle: string;
      items: {
        icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> | null;
        text: string;
      }[];
    };
    stepsSection: {
      h2: string;
      subtitle: string;
      items: string[];
    };
    plans: IServicePlan[];
    plansMessage?: string;
    plansMessageTarget?: string;
    floatingCtaMessage: string;
  };
}

export type TUtmSourceKeys = "googleads" | "instagram";

// Dados usados nos dados estruturados (JSON-LD) e no llms.txt
export interface IUnitInfo {
  name: string;
  streetAddress: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode?: string;
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours: {
    days: (
      | "Monday"
      | "Tuesday"
      | "Wednesday"
      | "Thursday"
      | "Friday"
      | "Saturday"
      | "Sunday"
    )[];
    opens: string;
    closes: string;
  }[];
  areaM2: number;
  privateRooms: number;
  // Outros espaços, como o Vitor descreveu (ex.: "10 salas de reunião e atendimento")
  otherSpaces: string[];
  foundingDate: string;
  foundingLabel: string;
}

export interface ISiteData {
  utmSourceMessages?: Partial<Record<TUtmSourceKeys, string>> & {
    fallback: string;
  };
  siteUrl: string;
  unitInfo: IUnitInfo;
  filialCNPJ: string;
  filialName: string;
  pricesTableFileId?: string;
  termsAndConditionFileId?: string;
  urlConexa: string;
  gtmId: string;
  contact: {
    phoneNumber: string;
    whatsappNumber: string;
    email: string;
  };
  services: IServiceItem[];
  workingHours: string[];
  address: {
    line1: string;
    line2: string;
    href: string;
  };
  homeData: {
    metaTitle: string;
    metaDescription: string;
    heroSection: {
      h1: string;
      subtitle: string;
      image: string;
    };
    diferencialSection: {
      differentialItems: IDifferentialItem[];
    };
    phraseSection: {
      text: string;
      image1: string;
      image2: string;
    };
    mapSection: {
      h2: string;
      mapAddress: string;
    };
  };
  servicesPage: {
    heroImage: string;
  };
  socials: {
    instagram: string;
    linkedin: string;
    tiktok: string;
    youtube: string;
  };
}
