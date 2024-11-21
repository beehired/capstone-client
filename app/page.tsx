
import Homepage from "@/components/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BeeHired: A Job Board for Filipino Freelance Website",
  creator: "UST-CICS Group 7 BeeHired",
  authors: [
    { name: "Joshua Rembulat" },
    { name: "Gabrielle Joanna Marie Belgar" },
    { name: "Charlene Arlante" },
    { name: "Louis Ivan Virgo" },
  ],
  keywords: ["next js", "vercel", "heroku", "beehired", "hired", "freelance", "filipino", "filipino freelance"],
  openGraph: {
    type: "website",
    countryName: "Philippines",
    alternateLocale: "PH"
  }
}


export default function Home() {




  return (
    <div>
      <Homepage />
    </div >
  );
}
