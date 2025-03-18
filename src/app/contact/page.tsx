import React from "react";
import { MapPinned, Phone } from "lucide-react";
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
          Suivez nous
        </h2>
        <Socials
          socials={socials}
          size={64}
          className="grid grid-cols-2 md:grid-cols-4 mb-8 justify-items-center gap-4 px-16"
        />
      </section>

      {/* Contact Info Section */}
      <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Address Card */}
        <div className="flex flex-col items-center bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <MapPinned size={64} className="mb-4" />
          <p className="text-gray-600 text-center text-lg md:text-xl max-w-[65ch] leading-relaxed">
            {socials.address}
          </p>
        </div>

        {/* Phone Card */}
        <div className="flex flex-col items-center bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <Phone size={64} className="mb-4" />
          <p className="text-gray-600 text-center text-lg md:text-xl leading-relaxed">
            {socials.phone}
          </p>
        </div>
      </section>
    </div>
  );
}
