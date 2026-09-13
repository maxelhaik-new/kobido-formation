"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Lock, Eye, EyeOff, ArrowRight, Loader2, Sparkles, ShieldCheck } from "lucide-react";
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
    <div className="min-h-screen flex flex-col bg-[#ffffff] text-[#101010]">
      {/* 1. Super.so style Sticky Navbar */}
      <nav className="sticky top-0 z-50 w-full h-[60px] bg-white/95 backdrop-blur-sm border-b border-[#f5dae3]/60 px-6 sm:px-12 flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-3">
          <span className="font-serif text-[22px] font-bold tracking-tight text-[#101010]">
            L&apos;art du Geste
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#faf4f6] border border-[#f5dae3] text-[#b54e71] text-xs font-semibold tracking-wide">
            <Lock className="w-3 h-3 text-[#b54e71]" />
            <span>Espace Apprenants</span>
          </span>
        </div>
      </nav>

      {/* 2. Super.so Hero Cover Banner */}
      <div className="relative w-full h-[220px] sm:h-[280px] bg-[#f7f2f4] overflow-hidden">
        <Image
          src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/fdd0bd70-cc71-42ec-9f14-91bfba397d51/DSCF0578/w=1920,quality=90,fit=scale-down"
          alt="L'Art du Geste - Sensoa Formation Kobido"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_65%]"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        <div className="absolute bottom-4 left-6 sm:left-12 text-white drop-shadow-md">
          <span className="text-xs uppercase tracking-widest font-semibold text-white/90">
            Sensoa Formation
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mt-0.5">
            L’Art du Geste
          </h2>
        </div>
      </div>

      {/* 3. Main Body Container (Notion / Super.so centered column) */}
      <main className="flex-1 max-w-[560px] w-full mx-auto px-5 py-8 sm:py-12 flex flex-col justify-center">
        {/* Card matching Super callout / card design */}
        <div className="bg-white rounded-[11px] border border-[#f5dae3] p-7 sm:p-9 shadow-[rgba(0,0,0,0.12)_0px_20px_40px_-10px] transition-all">
          <div className="flex flex-col items-center text-center mb-7">
            <div className="w-13 h-13 w-12 h-12 rounded-[11px] bg-[#faf4f6] text-[#b54e71] border border-[#f5dae3] flex items-center justify-center mb-4 shadow-sm">
              <Sparkles className="w-5 h-5 text-[#b54e71]" />
            </div>

            <h1 className="font-serif text-2xl sm:text-[26px] font-bold text-[#101010] tracking-tight">
              Bienvenue dans votre formation
            </h1>

            <p className="text-xs sm:text-sm text-[#555555] mt-2.5 leading-relaxed max-w-sm">
              Ce module e-learning présente les bases gestuelles du Kobido. Veuillez saisir votre mot de passe pour accéder à vos leçons, vidéos et protocoles.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="site-password"
                className="block text-xs font-semibold uppercase tracking-wider text-[#777777] mb-2"
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
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#999999] hover:text-[#b54e71] transition-colors p-1 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
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
              className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-[11px] bg-[#b54e71] hover:bg-[#9f3e5e] active:bg-[#86314e] text-white font-semibold text-sm transition-all duration-200 shadow-[0_4px_14px_0_rgba(181,78,113,0.39)] hover:shadow-[0_6px_20px_rgba(181,78,113,0.45)] disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed group"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Vérification en cours...</span>
                </>
              ) : (
                <>
                  <span>Accéder à la formation</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#f5dae3]/60 flex items-center justify-center gap-2 text-xs text-[#888888]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#b54e71]" />
            <span>Portail officiel sécurisé Sensoa Kobido</span>
          </div>
        </div>

        {/* Discreet footer note */}
        <p className="text-center text-xs text-[#888888] mt-6">
          Un problème d&apos;accès ? Contactez directement votre formatrice.
        </p>
      </main>

      {/* 4. Footer */}
      <footer className="w-full py-5 border-t border-[#f5dae3]/40 text-center text-xs text-[#999999] bg-white">
        <p>© {new Date().getFullYear()} Sensoa — L&apos;art du Geste. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
