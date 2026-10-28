import { Metadata } from "next";

// A página /servicos é um client component e não pode exportar metadata
export const metadata: Metadata = {
  alternates: {
    canonical: "/servicos",
  },
};

export default function ServicosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
