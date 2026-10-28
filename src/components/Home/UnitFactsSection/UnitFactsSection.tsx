"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Animate } from "@/components/common/Animate";
import { TrackingWrapper } from "@/components/common/TrackingWrapper";
import { siteData, siteKey, sites } from "@/data/sites";
import { IUnitInfo } from "@/data/types";
import { useAbTest } from "@/hooks/useAbTest";

const MONTHS = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

// "2018-06" -> "jun/2018"; "2006" -> "2006"
const getFoundingShort = (foundingDate: string) => {
  const [year, month] = foundingDate.split("-");

  return month ? `${MONTHS[Number(month) - 1]}/${year}` : year;
};

const getFacts = (unitInfo: IUnitInfo) => [
  {
    value: `${unitInfo.areaM2.toLocaleString("pt-BR")} m²`,
    label: "de estrutura",
  },
  {
    value: String(unitInfo.privateRooms),
    label: "salas privativas",
  },
  {
    value: getFoundingShort(unitInfo.foundingDate),
    label: "início das atividades",
  },
];

const animateProps = {
  initial: { opacity: 0, y: 10 },
  transition: { duration: 1, type: "spring" as const },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-20%" },
};

export interface IUnitFactsSectionProps {}

export const UnitFactsSection = (props: IUnitFactsSectionProps) => {
  const isGoogle = useAbTest();
  const { unitInfo } = siteData;
  const facts = getFacts(unitInfo);

  const otherUnits = Object.entries(sites)
    .filter(([key]) => key !== siteKey)
    .map(([key, site]) => ({ key, site }));

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        backgroundColor: "white",
        pt: { xs: 18, md: 10 },
      }}
    >
      <Container>
        <Stack gap={{ xs: 8, md: 10 }}>
          <Stack gap={4}>
            <Animate {...animateProps}>
              <Typography variant="h2" maxWidth="25ch">
                {unitInfo.name} em números
              </Typography>
            </Animate>

            <Box
              display="grid"
              gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr 1fr" }}
            >
              {facts.map((fact, index) => (
                <Box
                  key={fact.label}
                  sx={{
                    py: { xs: 3, sm: 4 },
                    px: { xs: 0, sm: 4 },
                    borderTop: { xs: index === 0 ? "none" : ".5px solid #d0d0d0", sm: "none" },
                    borderLeft: { xs: "none", sm: index === 0 ? "none" : ".5px solid #d0d0d0" },
                    pl: { sm: index === 0 ? 0 : 4 },
                  }}
                >
                  <Animate {...animateProps}>
                    <Typography
                      component="p"
                      sx={{
                        fontSize: { xs: 40, md: 56 },
                        fontWeight: 700,
                        lineHeight: 1,
                        color: "primary.main",
                      }}
                    >
                      {fact.value}
                    </Typography>

                    <Typography sx={{ mt: 1 }}>{fact.label}</Typography>
                  </Animate>
                </Box>
              ))}
            </Box>

            <Animate {...animateProps}>
              <Typography maxWidth="70ch">
                Também temos {unitInfo.otherSpaces.join(" e ")}.
              </Typography>
            </Animate>
          </Stack>

          <Stack gap={4}>
            <Animate {...animateProps}>
              <Stack gap={1}>
                <Typography variant="h2" maxWidth="25ch">
                  Conheça a rede XYZ Coworking
                </Typography>

                <Typography maxWidth="60ch">
                  Além de {siteData.filialName}, você encontra o XYZ Coworking
                  em{" "}
                  {otherUnits.map(({ site }) => site.filialName).join(" e ")}.
                </Typography>
              </Stack>
            </Animate>

            <Box
              display="grid"
              gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
              gap={4}
            >
              {otherUnits.map(({ key, site }) => (
                <Animate key={key} {...animateProps}>
                  <Stack
                    gap={2}
                    alignItems="flex-start"
                    sx={{
                      height: "100%",
                      p: { xs: 3, md: 4 },
                      borderRadius: "2rem",
                      backgroundColor: "#f4f4f4",
                    }}
                  >
                    <Typography
                      component="h3"
                      sx={{ fontSize: 20, fontWeight: 700 }}
                    >
                      {site.unitInfo.name}
                    </Typography>

                    <Typography>
                      {site.address.line1}
                      <br />
                      {site.address.line2}
                    </Typography>

                    <Typography>
                      {site.unitInfo.areaM2.toLocaleString("pt-BR")} m² ·{" "}
                      {site.unitInfo.privateRooms} salas privativas ·{" "}
                      {site.unitInfo.foundingLabel}
                    </Typography>

                    <TrackingWrapper
                      section="rede"
                      action={`ir-para-${key}`}
                      isGoogle={isGoogle}
                    >
                      <Button
                        variant="outlined"
                        color="inherit"
                        href={site.siteUrl}
                        sx={{ mt: "auto" }}
                      >
                        conhecer a unidade
                      </Button>
                    </TrackingWrapper>
                  </Stack>
                </Animate>
              ))}
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
