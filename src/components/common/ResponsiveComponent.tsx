import { Box } from "@mui/material";
import { ReactElement } from "react";

export interface IResponsiveComponentProps {
  xs?: ReactElement;
  sm?: ReactElement;
  md?: ReactElement;
  lg?: ReactElement;
  xl?: ReactElement;
}

const breakpoints = ["xs", "sm", "md", "lg", "xl"] as const;

export const ResponsiveComponent = ({
  xs,
  sm,
  md,
  lg,
  xl,
}: IResponsiveComponentProps) => {
  const components = {
    xs: xs || sm || md || lg || xl,
    sm: sm || xs || md || lg || xl,
    md: md || sm || xs || lg || xl,
    lg: lg || md || sm || xs || xl,
    xl: xl || lg || md || sm || xs,
  };

  // Cada versão é renderizada uma única vez, visível nos breakpoints em que
  // é usada, para o conteúdo não se repetir no HTML
  const uniqueComponents = Array.from(new Set(Object.values(components)));

  return (
    <>
      {uniqueComponents.map((component, index) => (
        <Box
          key={index}
          sx={{
            display: Object.fromEntries(
              breakpoints.map((breakpoint) => [
                breakpoint,
                components[breakpoint] === component ? "block" : "none",
              ]),
            ),
          }}
        >
          {component}
        </Box>
      ))}
    </>
  );
};
