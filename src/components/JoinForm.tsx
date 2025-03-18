"use client";

import React, { useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { PhoneNumberUtil } from "google-libphonenumber";
import z from "zod";

const namePattern = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
const phoneUtil = PhoneNumberUtil.getInstance();

const phoneNumberValidation = z.string().refine(
  (number) => {
    try {
      const phoneNumber = phoneUtil.parseAndKeepRawInput(number, "MA");
      return phoneUtil.isValidNumber(phoneNumber);
    } catch {
      return false;
    }
  },
  {
    message: "Veuillez entrer un numéro de téléphone valide.",
  }
);

const formDataSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "Ce champ est obligatoire" })
    .regex(namePattern),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Ce champ est obligatoire" })
    .regex(namePattern),
  motivation: z
    .string()
    .trim()
    .min(10, { message: "Ce champ doit contenir au moins 10 caractères" })
    .max(500, { message: "Ce champ ne doit pas dépasser 500 caractères" }),
  phoneNum: phoneNumberValidation,
  email: z
    .string()
    .trim()
    .email({ message: "Veuillez entrer une adresse email valide" }),
  "h-captcha-response": z.string({ message: "Veuillez compléter le captcha" }),
  from_name: z.string(),
  subject: z.string(),
});

export type FormDataType = z.infer<typeof formDataSchema>;

export default function JoinForm() {
  const [status, setStatus] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: zodResolver(formDataSchema),
  });

  useEffect(() => {
    register("h-captcha-response", { required: true });
  });

  async function onSubmit(data: FormDataType) {
    const formData = formDataSchema.parse(data);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
        ...formData,
      }),
    });

    const result = await response.json();
    if (result.success) {
      setStatus("Votre candidature a été envoyée avec succès");
    } else {
      setStatus("Votre candidature n'a pas été envoyée");
    }
  }

  async function onHCaptchaChange(token: string) {
    setValue("h-captcha-response", token);
  }

  return (
    <form
      className="w-full md:w-[60%] bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 overflow-hidden"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="hidden"
        value="Nouvelle candidature"
        {...register("subject")}
      />
      <input
        type="hidden"
        value="Candidature JCI Rabat"
        {...register("from_name")}
      />

      <div className="mb-4">
        <p className="text-2xl text-gray-600">
          Les champs marqués d&apos;un * sont obligatoires
        </p>
      </div>
      {/* Nom Field */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="nom"
        >
          Nom *
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300 [&:user-invalid]:border-red-500"
          id="nom"
          type="text"
          placeholder="Votre nom"
          {...register("lastName")}
        />
        {errors.lastName?.message && (
          <p className="text-red-500 text-xs italic">
            {errors.lastName.message}
          </p>
        )}
      </div>

      {/* Prénom Field */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="prenom"
        >
          Prénom *
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300 [&:user-invalid]:border-red-500"
          id="prenom"
          type="text"
          placeholder="Votre prénom"
          {...register("firstName")}
        />
        {errors.firstName?.message && (
          <p className="text-red-500 text-xs italic">
            {errors.firstName.message}
          </p>
        )}
      </div>

      {/* Phone Number Field*/}

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="phoneNum"
        >
          Numéro de téléphone *
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300 [&:user-invalid]:border-red-500"
          id="phoneNum"
          type="text"
          placeholder="Votre numéro de téléphone"
          {...register("phoneNum")}
        />
        {errors.phoneNum?.message && (
          <p className="text-red-500 text-xs italic">
            {errors.phoneNum.message}
          </p>
        )}
      </div>

      {/* Email field */}

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email *
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300 [&:user-invalid]:border-red-500"
          id="email"
          type="email"
          placeholder="Votre adresse Email *"
          {...register("email")}
        />
        {errors.email?.message && (
          <p className="text-red-500 text-xs italic">{errors.email.message}</p>
        )}
      </div>

      {/* Motivation Field */}
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="motivation"
        >
          Motivations *
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300 h-32 resize-none [&:user-invalid]:border-red-500"
          id="motivation"
          placeholder="Expliquez pourquoi vous souhaitez nous rejoindre"
          {...register("motivation")}
        />
        {errors.motivation?.message && (
          <p className="text-red-500 text-xs italic">
            {errors.motivation.message}
          </p>
        )}
      </div>

      {/* HCaptcha */}
      <div className="mb-6">
        <div className="hcaptcha-wrapper w-full md:w-auto overflow-hidden">
          <div className="transform scale-90 md:scale-100 overflow-scroll">
            <HCaptcha
              sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
              reCaptchaCompat={false}
              onVerify={onHCaptchaChange}
            />
            {errors["h-captcha-response"]?.message && (
              <p className="text-red-500 text-xs italic">
                {errors["h-captcha-response"].message}
              </p>
            )}
          </div>
        </div>
      </div>
      {/* Submit Button */}
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
          type="submit"
        >
          Envoyer
        </button>
      </div>

      {/* Status Message */}
      {status && (
        <p className="mt-4 text-2xl text-sm text-gray-600">{status}</p>
      )}
    </form>
  );
}
