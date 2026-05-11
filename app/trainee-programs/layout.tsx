import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Graduate Trainee Programs | GraduatesCorner",
  description: "Discover graduate trainee programs to kickstart your career at top companies.",
}

export default function TraineeProgramsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
