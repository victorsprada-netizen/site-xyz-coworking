import { sites, siteData } from "./sites";
import { IServicePlan, ISiteData } from "./types";

const ORGANIZATION_URL = "https://xyzcoworking.com";
const ORGANIZATION_ID = `${ORGANIZATION_URL}/#organization`;

const getUnitId = (site: ISiteData) => `${site.siteUrl}/#local`;

const stripHtml = (text: string) =>
  text
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();

const absoluteUrl = (site: ISiteData, path: string) =>
  encodeURI(path.startsWith("http") ? path : `${site.siteUrl}${path}`);

const formatPrice = (price: number) =>
  price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// Mesmo texto de preço exibido nos cards de plano do site
export const getPlanPriceText = (plan: IServicePlan) => {
  const prefix = plan.customPriceText ? `${plan.customPriceText} ` : "";

  return `${prefix}${formatPrice(plan.price)} / ${plan.period.toLowerCase()} (${plan.label})`;
};

const getOrganization = () => ({
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "XYZ Coworking",
  url: ORGANIZATION_URL,
  sameAs: [
    sites.joinville.socials.instagram,
    sites.joinville.socials.linkedin,
    sites.joinville.socials.tiktok,
    sites.joinville.socials.youtube,
  ],
  subOrganization: Object.values(sites).map((site) => ({
    "@id": getUnitId(site),
    name: site.unitInfo.name,
    url: site.siteUrl,
  })),
});

const getLocalBusiness = (site: ISiteData) => {
  const { unitInfo } = site;

  return {
    "@type": "LocalBusiness",
    "@id": getUnitId(site),
    name: unitInfo.name,
    description: site.homeData.metaDescription,
    url: site.siteUrl,
    image: absoluteUrl(site, site.homeData.heroSection.image),
    telephone: site.contact.phoneNumber,
    email: site.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: unitInfo.streetAddress,
      addressLocality: unitInfo.city,
      addressRegion: unitInfo.state,
      postalCode: unitInfo.postalCode,
      addressCountry: "BR",
    },
    geo: unitInfo.geo && {
      "@type": "GeoCoordinates",
      latitude: unitInfo.geo.latitude,
      longitude: unitInfo.geo.longitude,
    },
    hasMap: site.address.href,
    openingHoursSpecification: unitInfo.openingHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.days,
      opens: hours.opens,
      closes: hours.closes,
    })),
    foundingDate: unitInfo.foundingDate,
    floorSize: {
      "@type": "QuantitativeValue",
      value: unitInfo.areaM2,
      unitCode: "MTK",
    },
    amenityFeature: [
      `${unitInfo.privateRooms} salas privativas`,
      ...unitInfo.otherSpaces,
    ].map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    parentOrganization: { "@id": ORGANIZATION_ID },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Serviços do ${unitInfo.name}`,
      itemListElement: site.services.map((service) => ({
        "@type": "OfferCatalog",
        name: service.title,
        url: `${site.siteUrl}/servicos/${service.slug}`,
        itemListElement: service.detailsPage.plans.map((plan) => ({
          "@type": "Offer",
          name: `${service.title} - ${plan.label}`,
          url: `${site.siteUrl}/servicos/${service.slug}`,
          priceCurrency: "BRL",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            priceCurrency: "BRL",
            unitText: plan.period,
            ...(plan.customPriceText?.toLowerCase().startsWith("a partir")
              ? { minPrice: plan.price }
              : { price: plan.price }),
          },
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: stripHtml(service.description),
          },
        })),
      })),
    },
  };
};

export const getStructuredData = () => ({
  "@context": "https://schema.org",
  "@graph": [getOrganization(), getLocalBusiness(siteData)],
});

const getUnitSummary = (site: ISiteData) =>
  `${site.unitInfo.areaM2.toLocaleString("pt-BR")} m², ${site.unitInfo.privateRooms} salas privativas, ${site.unitInfo.foundingLabel}`;

export const getLlmsTxt = () => {
  const { unitInfo, contact, address } = siteData;

  const lines = [
    `# ${unitInfo.name}`,
    "",
    `> Coworking em ${unitInfo.city}/${unitInfo.state} da rede XYZ Coworking: ${getUnitSummary(siteData)}. Salas privativas, salas de reunião e atendimento, estações de trabalho e endereço fiscal e comercial.`,
    "",
    "## Sobre a unidade",
    "",
    `- Endereço: ${address.line1}, ${address.line2}`,
    `- Área: ${unitInfo.areaM2.toLocaleString("pt-BR")} m²`,
    `- Salas privativas: ${unitInfo.privateRooms}`,
    ...unitInfo.otherSpaces.map((space) => `- ${space}`),
    `- Em funcionamento ${unitInfo.foundingLabel}`,
    `- Horário: ${siteData.workingHours.join("; ")}`,
    `- Telefone: ${contact.phoneNumber}`,
    `- WhatsApp: ${contact.whatsappNumber}`,
    `- E-mail: ${contact.email}`,
    `- CNPJ: ${siteData.filialCNPJ}`,
    `- Como chegar: ${address.href}`,
    "",
    "## Serviços e preços",
    "",
    ...siteData.services.map((service) => {
      const prices = service.detailsPage.plans
        .map((plan) => getPlanPriceText(plan))
        .join("; ");

      return `- [${service.title}](${siteData.siteUrl}/servicos/${service.slug}): ${stripHtml(service.description)} Preços: ${prices}.`;
    }),
    "",
    "## Rede XYZ Coworking",
    "",
    ...Object.values(sites).map(
      (site) =>
        `- [${site.unitInfo.name}](${site.siteUrl}): ${site.address.line1}, ${site.address.line2}. ${getUnitSummary(site)}.`,
    ),
    `- Site institucional: ${ORGANIZATION_URL}`,
    "",
    "## Mais informações",
    "",
    `- [Todos os serviços](${siteData.siteUrl}/servicos)`,
    `- [Blog do X](${siteData.siteUrl}/blog): artigos sobre empreendedorismo, gestão e coworking`,
    "",
  ];

  return lines.join("\n");
};
