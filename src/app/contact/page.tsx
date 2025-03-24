import React from "react";
import { Phone } from "lucide-react";
import Socials from "@/components/Socials";
import { getSocialsData } from "@/lib/socials";
import { getContactPageData } from "@/lib/contact";

export default async function ContactPage() {
  const socials = await getSocialsData();
  const data = await getContactPageData();

  return (
    <div className="flex flex-col items-center gap-16 px-4 md:px-8 py-16">
      {/* Header and Subtitle */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{data.title}</h1>
        <p className="text-lg text-gray-600">{data.subtitle}</p>
      </div>

      {/* Socials Section */}
      <section className="w-full max-w-4xl">
        <h2 className="text-center text-2xl font-bold mb-8 text-gray-800">
          Mes réseaux sociaux
        </h2>
        <Socials
          socials={socials}
          size={64}
          className="mb-8 flex justify-center gap-12 px-16"
        />
      </section>

      {/* Contact Info Section */}
      <section className="w-full max-w-4xl flex justify-center gap-8">
        {/* Phone Card */}
        <div className="flex flex-col items-center p-8 rounded-xl shadow-lg transition-shadow duration-300">
          <Phone size={64} className="mb-4" />
          <p className="text-gray-600 text-center text-lg md:text-xl leading-relaxed">
            {socials.phone}
          </p>
        </div>
      </section>
    </div>
  );
}
