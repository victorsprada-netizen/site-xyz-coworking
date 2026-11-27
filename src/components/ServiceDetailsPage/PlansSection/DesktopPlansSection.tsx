"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { PlanPeriodSelector } from "./PlanPeriodSelector";
import { PlanCard } from "./PlanCard";
import parse from "html-react-parser";
import type { IServicePlan } from "@/data/types";
import Link from "next/link";

export interface IDesktopPlansSectionProps {
  plans: IServicePlan[];
  plansMessage?: string;
  plansMessageTarget?: string;
}

export const DesktopPlansSection = ({
  plans,
  plansMessage,
  plansMessageTarget,
}: IDesktopPlansSectionProps) => {
  const [selectedPlan, setSelectedPlan] = useState<number>(0);
  const hasSinglePlan = plans.length === 1;

  return (
    <Box>
      <Container maxWidth={false} sx={{ maxWidth: 450 }}>
        <Stack gap={4}>
          <Stack
            gap={2}
            alignItems={hasSinglePlan ? "center" : "flex-end"}
          >
            <Stack
              direction="row"
              justifyContent={hasSinglePlan ? "center" : "space-between"}
              width="100%"
              gap={12}
            >
              <Typography variant="h2" textAlign="center">
                Planos
              </Typography>

              <PlanPeriodSelector
                plans={plans}
                selectedPlan={selectedPlan}
                onSelectedPlanChange={(newPeriod) => setSelectedPlan(newPeriod)}
              />
            </Stack>

            {plansMessage && (
              <Typography
                color="secondary"
                lineHeight={1}
                textAlign={hasSinglePlan ? "center" : "right"}
                component={plansMessageTarget ? Link : "span"}
                href={plansMessageTarget}
              >
                {parse(plansMessage)}
              </Typography>
            )}
          </Stack>

          <PlanCard selectedPlan={plans[selectedPlan]} />
        </Stack>
      </Container>
    </Box>
  );
};
