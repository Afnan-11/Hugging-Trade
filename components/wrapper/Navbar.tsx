"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronUp, MenuIcon, XCircle } from "lucide-react"
import { useAuth } from "@clerk/nextjs"
import { UserProfile } from "../user-profile"
import LanguageSwitcher from "../LanguageSwitcher"
// import {useTranslations} from "next-intl";

export default function Navbar({ locale }: { locale: string }) {
  const user = useAuth()
  const userId = user?.userId
  const [Navbar, setNavbar] = useState<boolean>(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const effectiveLocale = locale || "en"

  // const t = useTranslations("NavBar");

  const pathname = usePathname()

  const Menu = () => {
    setNavbar(!Navbar)
  }

  useEffect(() => {
    const handleResize = () => {
      setNavbar(false)
    }

    window.addEventListener("resize", handleResize)

    // cleanup function
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    if (Navbar) {
      
      document.body.style.overflow = "hidden"
    } else {
      
      document.body.style.overflow = "unset"
    }
    
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [Navbar])

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName))
  }

  const handleDropdownItemClick = () => {
    setOpenDropdown(null)
    setNavbar(false)
  }

  return (
    <nav className="sticky top-0 z-[30] w-full bg-white bg-opacity-30 px-4 py-2 backdrop-blur-md lg:flex lg:items-center lg:justify-between lg:px-20">
      <div className="lg:flex lg:items-center lg:justify-start">
        <div className="flex items-center justify-between gap-20 md:gap-96 lg:gap-0">
          <Link
            href={`/`}
            onClick={() => {
              setNavbar(false)
            }}
          >
            <Image src={"/logo.svg"} alt="img" width={283} height={23} loading="eager" priority className="xl:w-60" />
          </Link>

          {!Navbar ? (
            <span className="cursor-pointer text-black lg:hidden" onClick={Menu}>
              <MenuIcon />
            </span>
          ) : (
            <span className="cursor-pointer text-black lg:hidden" onClick={Menu}>
              <XCircle />
            </span>
          )}
        </div>

        <ul
          className={`flex h-[100vh]  flex-col items-center justify-center gap-6 bg-opacity-50 text-center text-xl font-semibold text-[#111827] lg:flex lg:h-0 lg:w-auto lg:flex-row lg:items-center lg:justify-center lg:gap-10 lg:pb-0 lg:pt-1 lg:text-[16px] ${
            Navbar ? "block" : "hidden"
          }`}
        >
          <li>
            <div className="relative z-50 inline-block text-left">
              <div
                className="flex cursor-pointer items-center justify-start rounded-xl px-3 py-2 hover:bg-blue-50"
                onClick={() => toggleDropdown("company")}
              >
                <button className="flex justify-center font-medium text-black focus:outline-none">
                  {" "}
                  {/* {t("company")} */}
                  {effectiveLocale === "en"
                    ? "Company"
                    : effectiveLocale === "de"
                      ? "Unternehmen"
                      : effectiveLocale === "es"
                        ? "Compañía"
                        : effectiveLocale === "fr"
                          ? "Entreprise"
                          : effectiveLocale === "it"
                            ? "Azienda"
                            : "Empresa"}
                </button>
                {openDropdown === "company" ? <ChevronUp /> : <ChevronDown />}
              </div>

              {/* Dropdown Menu */}
              {openDropdown === "company" && (
                <div className="absolute mt-2 w-56 -translate-x-5 rounded-xl bg-white shadow-lg" role="menu">
                  <div className="py-1" role="none">
                    <Link
                      href={`/affiliate`}
                      className="m-2 block rounded-xl px-4 py-2 text-[16px] font-light text-black hover:bg-blue-50"
                      role="menuitem"
                      onClick={handleDropdownItemClick}
                    >
                      {/* {t("affiliateProgram")} */}
                      {effectiveLocale === "en"
                        ? "Affiliate Program"
                        : effectiveLocale === "de"
                          ? "Partnerprogramm"
                          : effectiveLocale === "es"
                            ? "Programa de Afiliados"
                            : effectiveLocale === "fr"
                              ? "Programme d'Affiliation"
                              : effectiveLocale === "it"
                                ? "Programma di Affiliazione"
                                : "Programa de Afiliados"}
                    </Link>

                    <Link
                      href={`/contact-us`}
                      className="m-2 block rounded-xl px-4 py-2 text-[16px] font-light text-black hover:bg-blue-50"
                      role="menuitem"
                      onClick={handleDropdownItemClick}
                    >
                      {/* {t("contactInfo")} */}
                      {effectiveLocale === "en"
                        ? "Contact Info"
                        : effectiveLocale === "de"
                          ? "Kontaktinformationen"
                          : effectiveLocale === "es"
                            ? " Información de Contacto"
                            : effectiveLocale === "fr"
                              ? "Informations de Contact"
                              : effectiveLocale === "it"
                                ? "Informazioni di Contatto"
                                : "Informações de Contato"}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </li>

          <li>
            <div className="relative inline-block text-left">
              <div
                className="flex cursor-pointer items-center justify-start rounded-xl px-3 py-2 hover:bg-blue-50"
                onClick={() => toggleDropdown("resources")}
              >
                <button className="flex justify-center font-medium text-black focus:outline-none">
                  {" "}
                  {/* {t("resources")} */}
                  {effectiveLocale === "en"
                    ? "Resources"
                    : effectiveLocale === "de"
                      ? "Ressourcen"
                      : effectiveLocale === "es"
                        ? "Recursos"
                        : effectiveLocale === "fr"
                          ? "Ressources"
                          : effectiveLocale === "it"
                            ? "Risorse"
                            : "Recursos"}
                </button>
                {openDropdown === "resources" ? <ChevronUp /> : <ChevronDown />}
              </div>

              {/* Dropdown Menu */}
              {openDropdown === "resources" && (
                <div className="absolute mt-2 w-56 -translate-x-5 rounded-xl bg-white shadow-lg" role="menu">
                  <div className="py-1" role="none">
                    <Link
                      href={"/investment-calculator"}
                      className="m-2 block rounded-xl px-4 py-2 text-[16px] font-light text-black hover:bg-blue-50"
                      role="menuitem"
                      onClick={handleDropdownItemClick}
                    >
                      {/* {t("investmentCalculator")} */}
                      {effectiveLocale === "en"
                        ? "Investment Calculator"
                        : effectiveLocale === "de"
                          ? "Investitionsrechner"
                          : effectiveLocale === "es"
                            ? "Calculadora de Inversiones"
                            : effectiveLocale === "fr"
                              ? " Calculateur d'Investissement"
                              : effectiveLocale === "it"
                                ? "Calcolatore di Investimenti"
                                : "Calculadora de Investimento"}
                    </Link>
                    {/* <Link
                      href="#"
                      className="m-2 block rounded-xl px-4 py-2 text-[16px] font-light text-black hover:bg-blue-50"
                      role="menuitem"
                      onClick={handleDropdownItemClick}
                    >
                      Blog
                    </Link> */}
                    <a
                      href="https://help.huggingtrade.com"
                      className="m-2 block rounded-xl px-4 py-2 text-[16px] font-light text-black hover:bg-blue-50"
                      role="menuitem"
                      onClick={handleDropdownItemClick}
                    >
                      {/* {t("helpCenter")} */}
                      {effectiveLocale === "en"
                        ? "Help Center"
                        : effectiveLocale === "de"
                          ? "Hilfezentrum"
                          : effectiveLocale === "es"
                            ? "Centro de Ayuda"
                            : effectiveLocale === "fr"
                              ? "Centre d'Aide"
                              : effectiveLocale === "it"
                                ? "Centro Assistenza"
                                : "Central de Ajuda"}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </li>

          <li
            onClick={() => {
              setNavbar(false)
            }}
            className="cursor-pointer rounded-xl px-3 py-2 hover:bg-blue-50"
          >
            <Link href={`/pricing`} className={pathname === `/pricing` ? "text-black" : "font-medium text-black"}>
              {/* {t("pricing")} */}
              {effectiveLocale === "en"
                ? "Pricing"
                : effectiveLocale === "de"
                  ? "Preisgestaltung"
                  : effectiveLocale === "es"
                    ? "Precios"
                    : effectiveLocale === "fr"
                      ? "Tarification"
                      : effectiveLocale === "it"
                        ? "Prezzi"
                        : "Preços"}
            </Link>
          </li>

          <li className="inline-block lg:hidden">
            <LanguageSwitcher />
          </li>

          <li
            onClick={() => {
              setNavbar(false)
            }}
            className="cursor-pointer rounded-xl px-3 py-2 text-black hover:bg-blue-50 lg:hidden"
          >
            {userId ? (
              <UserProfile />
            ) : (
              <Link href="/sign-in">
                {/* {t("logIn")} */}
                {effectiveLocale === "en"
                  ? "Log In"
                  : effectiveLocale === "de"
                    ? "Anmelden"
                    : effectiveLocale === "es"
                      ? "Iniciar Sesión"
                      : effectiveLocale === "fr"
                        ? "Se Connecter"
                        : effectiveLocale === "it"
                          ? "Accedi"
                          : "Entrar"}
              </Link>
            )}
          </li>

          <li
            onClick={() => {
              setNavbar(false)
            }}
            className="cursor-pointer rounded-xl border-[1px] border-[#2563EB] px-3 py-2 text-[#2563EB] hover:border-blue-400 hover:text-blue-400 lg:hidden"
          >
            {userId ? (
              <Link href="/dashboard">
                {/* {t("dashboard")} */}
                {effectiveLocale === "en"
                  ? "Dashboard"
                  : effectiveLocale === "de"
                    ? "Dashboard"
                    : effectiveLocale === "es"
                      ? "Panel de Control"
                      : effectiveLocale === "fr"
                        ? "Tableau de Bord"
                        : effectiveLocale === "it"
                          ? "Pannello di Controllo"
                          : "Painel de Controle"}
              </Link>
            ) : (
              <Link href="https://t.me/huggingtradeofficial">
                {effectiveLocale === "en"
                  ? "Join Community"
                  : effectiveLocale === "de"
                    ? "Community beitreten"
                    : effectiveLocale === "es"
                      ? "Unirse a la comunidad"
                      : effectiveLocale === "fr"
                        ? "Rejoindre la communauté"
                        : effectiveLocale === "it"
                          ? "Unisciti alla comunità"
                          : "Participar da comunidade"}
              </Link>
            )}
          </li>
        </ul>
      </div>

      <div className="flex items-center justify-center gap-5 lg:gap-1">
        <div className="hidden lg:block">
          <LanguageSwitcher />
        </div>
        <div className="hidden cursor-pointer rounded-xl px-3 py-2 text-black hover:bg-blue-50 lg:block">
          {userId ? (
            <UserProfile />
          ) : (
            <Link href="/sign-in">
              {effectiveLocale === "en"
                ? "Log In"
                : effectiveLocale === "de"
                  ? "Anmelden"
                  : effectiveLocale === "es"
                    ? "Iniciar Sesión"
                    : effectiveLocale === "fr"
                      ? "Se Connecter"
                      : effectiveLocale === "it"
                        ? "Accedi"
                        : "Entrar"}
            </Link>
          )}
        </div>
        <div className="hidden cursor-pointer rounded-xl border-[1px] border-[#2563EB] px-3 py-2 text-[#2563EB] hover:border-blue-400 hover:text-blue-400 lg:block">
          {userId ? (
            <Link href="/dashboard">
              {/* {t("dashboard")} */}
              {effectiveLocale === "en"
                ? "Dashboard"
                : effectiveLocale === "de"
                  ? "Dashboard"
                  : effectiveLocale === "es"
                    ? "Panel de Control"
                    : effectiveLocale === "fr"
                      ? "Tableau de Bord"
                      : effectiveLocale === "it"
                        ? "Pannello di Controllo"
                        : "Painel de Controle"}
            </Link>
          ) : (
            <Link href="https://t.me/huggingtradeofficial">
              {effectiveLocale === "en"
                ? "Join Community"
                : effectiveLocale === "de"
                  ? "Community beitreten"
                  : effectiveLocale === "es"
                    ? "Unirse a la comunidad"
                    : effectiveLocale === "fr"
                      ? "Rejoindre la communauté"
                      : effectiveLocale === "it"
                        ? "Unisciti alla comunità"
                        : "Participar da comunidade"}
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
