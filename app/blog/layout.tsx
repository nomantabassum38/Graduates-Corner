import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | GraduatesCorner",
  description: "Read the latest news, advice, and insights from the GraduatesCorner community.",
}

export default function BlogListLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
