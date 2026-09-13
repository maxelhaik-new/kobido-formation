"use client";

import { useState, useTransition } from "react";
import { Lock, Eye, EyeOff, ArrowRight, Loader2, Sparkles, ShieldCheck, Home, Book, FileVideo } from "lucide-react";
import { verifyPassword } from "@/app/actions";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Veuillez saisir votre mot de passe.");
      return;
    }

    setError(null);
    startTransition(async () => {
      try {
        const result = await verifyPassword(password);
        if (result.success && result.redirectUrl) {
          window.location.href = result.redirectUrl;
        } else {
          setError(result.error || "Mot de passe incorrect.");
        }
      } catch {
        setError("Une erreur réseau est survenue. Veuillez réessayer.");
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] text-[#101010] selection:bg-[#f5dae3] selection:text-[#101010]">
      {/* 1. Super.so exact Navbar (53px height, Quattrocento logo, links) */}
      <nav
        aria-label="Navigation principale"
        className="sticky top-0 z-50 w-full h-[53px] bg-white/95 backdrop-blur-sm border-b border-black/[0.06] px-4 sm:px-8 flex items-center justify-between transition-colors"
      >
        <div className="flex items-center">
          <span className="font-serif text-[22px] font-bold text-[#101010] tracking-tight cursor-default select-none">
            L&apos;art du Geste
          </span>
        </div>

        {/* Navigation items matching Super.so */}
        <div className="hidden sm:flex items-center gap-1 text-[13px] font-medium text-[#101010]">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-black/[0.04] transition-colors cursor-default select-none">
            <Home className="w-3.5 h-3.5 text-[#101010]" aria-hidden="true" />
            <span>Accueil</span>
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-black/[0.04] transition-colors cursor-default opacity-80 select-none">
            <Book className="w-3.5 h-3.5 text-[#101010]" aria-hidden="true" />
            <span>Mes Modules</span>
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-black/[0.04] transition-colors cursor-default opacity-80 select-none">
            <FileVideo className="w-3.5 h-3.5 text-[#101010]" aria-hidden="true" />
            <span>Mes Leçons</span>
          </span>
        </div>

        {/* Mobile / Status lock badge */}
        <div className="flex items-center">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#faf4f6] border border-[#f5dae3] text-[#b54e71] text-[11px] font-semibold tracking-wide select-none">
            <Lock className="w-3 h-3 text-[#b54e71]" aria-hidden="true" />
            <span>Espace Privé</span>
          </span>
        </div>
      </nav>

      {/* 2. Super.so Notion Cover (Clean panoramic banner, exactly as on Notion) */}
      <div className="relative w-full h-[28vh] min-h-[200px] max-h-[320px] overflow-hidden bg-[#faf8f5]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/cover.jpg"
          alt="L’Art du Geste - Formation Kobido"
          className="w-full h-full object-cover object-[center_65.4%] select-none pointer-events-none"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* 3. Notion Content Flow Container */}
      <div className="w-full max-w-[900px] mx-auto px-5 sm:px-10 pt-8 sm:pt-10 pb-16 flex-1 flex flex-col items-center">
        {/* Page Title Centered as requested */}
        <header className="w-full text-center mb-8 sm:mb-10">
          <h1 className="font-serif text-3xl sm:text-[40px] font-bold text-[#101010] tracking-tight leading-tight">
            L’Art du Geste
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#888888] tracking-wider uppercase mt-2 font-medium">
            Formation Kobido & Massages d’Exception • Sensoa
          </p>
        </header>

        {/* Centered Login Card styled as Notion Callout */}
        <div className="w-full max-w-[480px] my-auto">
          <div className="bg-white rounded-[11px] border border-[#f5dae3] p-6 sm:p-9 shadow-[rgba(0,0,0,0.08)_0px_20px_40px_-10px] transition-all">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-12 h-12 rounded-[11px] bg-[#faf4f6] text-[#b54e71] border border-[#f5dae3] flex items-center justify-center mb-4 shadow-sm">
                <Sparkles className="w-5 h-5 text-[#b54e71]" aria-hidden="true" />
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#101010] tracking-tight">
                Bienvenue dans votre formation
              </h2>

              <p className="text-xs sm:text-[13px] text-[#555555] mt-2.5 leading-relaxed max-w-sm">
                Ce module e-learning présente les bases gestuelles du Kobido. Saisissez votre mot de passe pour déverrouiller vos cours, vidéos et protocoles.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="site-password"
                  className="block text-[11px] font-semibold uppercase tracking-wider text-[#666666] mb-2"
                >
                  Mot de passe d&apos;accès
                </label>
                <div className="relative">
                  <input
                    id="site-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError(null);
                    }}
                    disabled={isPending}
                    placeholder="Entrez votre mot de passe..."
                    autoComplete="current-password"
                    required
                    className="w-full px-4 py-3 pr-11 rounded-[11px] bg-[#ffffff] border border-[#f5dae3] text-[#101010] text-sm placeholder-[#999999] focus:outline-none focus:ring-2 focus:ring-[#b54e71]/40 focus:border-[#b54e71] transition-all disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#999999] hover:text-[#b54e71] transition-colors p-1 cursor-pointer focus:outline-none focus:text-[#b54e71]"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <Eye className="w-4 h-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div
                  role="alert"
                  className="p-3 rounded-[11px] bg-[#fff0f3] border border-[#ffd1dc] text-[#b54e71] text-xs font-medium flex items-center gap-2"
                >
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-[11px] bg-[#b54e71] hover:bg-[#9f3e5e] active:bg-[#86314e] text-white font-semibold text-sm transition-all duration-200 shadow-[0_4px_14px_0_rgba(181,78,113,0.35)] hover:shadow-[0_6px_20px_rgba(181,78,113,0.45)] disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed group focus:outline-none focus:ring-2 focus:ring-[#b54e71] focus:ring-offset-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    <span>Vérification en cours...</span>
                  </>
                ) : (
                  <>
                    <span>Accéder à la formation</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-[#f5dae3]/60 flex items-center justify-center gap-2 text-xs text-[#888888]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#b54e71]" aria-hidden="true" />
              <span>Portail officiel sécurisé Sensoa Kobido</span>
            </div>
          </div>

          <p className="text-center text-xs text-[#888888] mt-6">
            Un problème d&apos;accès ? Contactez votre formatrice Sensoa.
          </p>
        </div>
      </div>

      {/* 4. Super.so style Footer */}
      <footer className="w-full py-6 border-t border-black/[0.05] bg-white">
        <div className="max-w-[900px] mx-auto px-5 sm:px-10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#888888] gap-3">
          <span>© {new Date().getFullYear()} Sensoa — L&apos;art du Geste. Tous droits réservés.</span>
          <span className="text-[#b54e71] font-medium">Formation Kobido & Massages d&apos;Exception</span>
        </div>
      </footer>
    </div>
  );
}
