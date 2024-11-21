import { Inter } from "next/font/google";
import "./globals.scss";
import Provider from "@/lib/provider";
import { ApolloWrapper } from "@/lib/apolloWrapper";
import ProgressBars from "@/components/progressbar";
import { LightPoppins } from "@/components/typograhy";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={LightPoppins.className}>
        <ApolloWrapper>
          <Provider>
            <ProgressBars>
              {children}
            </ProgressBars>
          </Provider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
