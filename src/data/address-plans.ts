import type { IAddressPlan } from "./types";

export const addressPlans = [
  {
    slug: "mei",
    label: "MEI",
    title: "Endereço MEI",
    included: ["Endereço fiscal para o seu MEI."],
    price: 490,
    period: "ano",
    paymentOption: { label: "ou", value: "12x de R$ 49", note: "no cartão" },
    annualSavings: "98",
  },
  {
    slug: "basico",
    label: "Básico",
    title: "Endereço Básico",
    included: ["Endereço fiscal e comercial para a sua empresa."],
    price: 99.8,
    period: "mês",
    paymentOption: { label: "Plano anual:", value: "R$ 998" },
    annualSavings: "199,60",
  },
  {
    slug: "completo",
    label: "Completo",
    title: "Endereço Completo",
    included: ["Recebimento de encomendas e 50% de desconto em salas."],
    price: 144,
    period: "mês",
    paymentOption: { label: "Plano anual:", value: "R$ 1.445" },
    annualSavings: "283",
  },
  {
    slug: "mais-completo",
    label: "Mais completo",
    title: "Endereço com atendimento telefônico",
    included: ["Tudo do Completo, mais um número atendido pela nossa recepção."],
    price: 299,
    period: "mês",
    paymentOption: { label: "Plano anual:", value: "R$ 2.900" },
    annualSavings: "688",
  },
] as const satisfies readonly IAddressPlan[];

const meiPlan = addressPlans[0];
export const addressPlansFloatingCta = `A partir de R$ ${meiPlan.price}/${meiPlan.period}`;
