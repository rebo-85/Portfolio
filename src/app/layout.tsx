import "./globals.css"

export const metadata = {
  title: "ReBo — Minecraft Developer",
  description: "Minecraft Bedrock Developer Portfolio",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#071026] text-slate-200 antialiased min-h-screen">
        <div id="app" className="flex flex-col min-h-screen">{children}</div>
      </body>
    </html>
  )
}
