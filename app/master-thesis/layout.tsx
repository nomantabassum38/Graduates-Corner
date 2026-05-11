import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Master's Thesis Positions | Graduates Corner",
  description: "Find master thesis opportunities from universities and companies worldwide.",
}

export default function MasterThesisLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
