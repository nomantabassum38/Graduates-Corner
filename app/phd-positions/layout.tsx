import { Metadata } from "next"

export const metadata: Metadata = {
  title: "PhD Positions | GraduatesCorner",
  description: "Find PhD positions and doctoral opportunities from top institutions.",
}

export default function PhDPositionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
