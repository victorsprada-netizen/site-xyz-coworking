"use client";

import { Animate } from "@/components/common/Animate";
import { TrackingWrapper } from "@/components/common/TrackingWrapper";
import type { IAddressPlan } from "@/data/types";
import { useAbTest } from "@/hooks/useAbTest";
import { useWhatsappLink } from "@/hooks/useWhatsappLink";
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

const priceFormat = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

interface AddressPlanCardProps {
  plan: IAddressPlan;
  isGoogle: boolean;
}

const AddressPlanCard = ({ plan, isGoogle }: AddressPlanCardProps) => {
  const href = useWhatsappLink(
    `tenho interesse em contratar o plano ${plan.title}.`,
  );
  const { paymentOption } = plan;

  return (
    <Animate
      initial={{ opacity: 0, y: 10 }}
      transition={{ duration: 2, type: "spring" }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      style={{ display: "grid" }}
    >
      <Stack
        component="article"
        gap={2}
        sx={(theme) => ({
          backgroundColor: "#363636",
          color: "common.white",
          border: "2px solid transparent",
          borderRadius: 4,
          p: { xs: 2.5, md: 2, lg: 3 },
          transition: "border-color 180ms ease",
          [`${theme.breakpoints.up("md")} and (hover: hover) and (pointer: fine)`]: {
            "& .address-plan-cta": {
              opacity: 0,
              pointerEvents: "none",
              transition: "opacity var(--cta-fade-duration, 180ms) ease",
            },
            "&:hover, &:focus-within": {
              borderColor: "primary.main",
              "--cta-fade-duration": "350ms",
              "& .address-plan-cta": {
                opacity: 1,
                pointerEvents: "auto",
              },
            },
          },
          "@media (prefers-reduced-motion: reduce)": {
            transition: "none",
            "& .address-plan-cta": { transition: "none" },
          },
        })}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography color="primary" fontWeight={700} sx={{ mb: 0.75 }}>
            {plan.label}
          </Typography>
          <Typography
            component="h3"
            sx={{
              fontSize: { xs: 24, md: 22, lg: 26 },
              fontWeight: 700,
              lineHeight: 1.15,
              mb: 1.5,
            }}
          >
            {plan.title}
          </Typography>
          <Typography color="rgba(255, 255, 255, 0.8)" lineHeight={1.4}>
            {plan.included[0]}
          </Typography>
        </Box>

        <Box>
          <Typography
            color="primary"
            sx={{
              fontSize: { xs: 42, md: "clamp(2rem, 3.5vw, 3.25rem)" },
              fontWeight: 700,
              lineHeight: 1.05,
              whiteSpace: "nowrap",
            }}
          >
            R$ {priceFormat.format(plan.price).replace(/,00$/, "")}
          </Typography>
          <Typography color="rgba(255, 255, 255, 0.8)" sx={{ mt: 0.5 }}>
            por {plan.period}
          </Typography>
          <Divider sx={{ my: 1.75, borderColor: "rgba(255, 255, 255, 0.2)" }} />
          <Box sx={{ minHeight: { md: "5.4em", xl: "4.05em" } }}>
            <Typography lineHeight={1.35}>
              {paymentOption.label}{" "}
              <Box component="strong" color="primary.main">
                {paymentOption.value}
              </Box>
              {paymentOption.note ? ` ${paymentOption.note}` : null}
            </Typography>
            <Typography lineHeight={1.35}>
              Economize R$ {plan.annualSavings} com o plano anual
            </Typography>
          </Box>
        </Box>

        <TrackingWrapper
          section="card-preco"
          action={`contato-${plan.slug}`}
          isGoogle={isGoogle}
        >
          <Button
            className="address-plan-cta"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            aria-label={`Contratar agora – ${plan.title}`}
            fullWidth
            sx={{
              px: { xs: 1, md: 0.5, lg: 1 },
              fontSize: { md: 14, lg: 16 },
              whiteSpace: "nowrap",
            }}
          >
            CONTRATAR AGORA
          </Button>
        </TrackingWrapper>
      </Stack>
    </Animate>
  );
};

export const AddressPlansSection = ({
  plans,
}: {
  plans: readonly IAddressPlan[];
}) => {
  const isGoogle = useAbTest();

  return (
    <Container
      component="section"
      aria-labelledby="address-plans-title"
      maxWidth={false}
      sx={{
        maxWidth: { xs: 560, md: 1440 },
        width: { md: "92%", lg: "90%" },
        px: { md: 4, lg: 6 },
      }}
    >
      <Box component="header" sx={{ mb: { xs: 3, md: 5 } }}>
        <Typography
          sx={{
            color: "#363636",
            fontWeight: 700,
            letterSpacing: "0.16em",
            mb: 1,
          }}
        >
          PLANOS DE ENDEREÇO
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ md: "baseline" }}
          justifyContent="space-between"
          gap={{ xs: 1, md: 3 }}
        >
          <Typography
            id="address-plans-title"
            variant="h2"
            sx={{ fontSize: { xs: 32, sm: 40, lg: 52 }, lineHeight: 1.1 }}
          >
            Escolha o plano da sua empresa
          </Typography>
          <Typography color="text.secondary" whiteSpace="nowrap">
            Valores em reais (R$)
          </Typography>
        </Stack>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            md: "repeat(4, minmax(0, 1fr))",
          },
          gap: { xs: 2, lg: 2.5 },
        }}
      >
        {plans.map((plan) => (
          <AddressPlanCard key={plan.slug} plan={plan} isGoogle={isGoogle} />
        ))}
      </Box>
      <Typography color="text.secondary" fontSize={14} sx={{ mt: 2 }}>
        *Planos mensais mediante cadastro e aprovação do cadastro.
      </Typography>
    </Container>
  );
};
