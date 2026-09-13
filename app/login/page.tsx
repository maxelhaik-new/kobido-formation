"use client";

import { useState, useTransition } from "react";
import { Eye, EyeOff, ArrowRight, Loader2, Lock } from "lucide-react";
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
      {/* 1. Header épuré */}
      <header className="w-full h-[53px] px-6 sm:px-10 flex items-center justify-between border-b border-black/[0.05]">
        <span className="font-serif text-[20px] sm:text-[22px] font-bold text-[#101010] tracking-tight select-none">
          L&apos;art du Geste
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#faf4f6] text-[#b54e71] text-[11px] font-semibold tracking-wide select-none">
          <Lock className="w-3 h-3 text-[#b54e71]" aria-hidden="true" />
          <span>Accès privé</span>
        </span>
      </header>

      {/* 2. Couverture panoramique */}
      <div className="relative w-full h-[24vh] min-h-[160px] max-h-[260px] overflow-hidden bg-[#faf8f5]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/cover.jpg"
          alt=""
          className="w-full h-full object-cover object-[center_65%] select-none pointer-events-none"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* 3. Contenu centré et distillé */}
      <main className="w-full max-w-[440px] mx-auto px-5 py-10 sm:py-14 flex-1 flex flex-col justify-center">
        <div className="text-center mb-6">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#101010] tracking-tight leading-tight">
            L’Art du Geste
          </h1>
          <p className="font-sans text-xs text-[#777777] mt-2 leading-relaxed">
            Formation Kobido Sensoa • Entrez votre mot de passe pour accéder aux cours et vidéos.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="site-password"
              className="block text-[11px] font-semibold uppercase tracking-wider text-[#666666] mb-2"
            >
              Mot de passe
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
                placeholder="Votre mot de passe..."
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 pr-11 rounded-[11px] bg-white border border-[#f5dae3] text-[#101010] text-sm placeholder-[#999999] focus:outline-none focus:ring-2 focus:ring-[#b54e71]/40 focus:border-[#b54e71] transition-all disabled:opacity-60"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#999999] hover:text-[#b54e71] transition-colors p-1 cursor-pointer focus:outline-none"
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
              className="p-3 rounded-[11px] bg-[#fff0f3] border border-[#ffd1dc] text-[#b54e71] text-xs font-medium"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-[11px] bg-[#b54e71] hover:bg-[#9f3e5e] active:bg-[#86314e] text-white font-semibold text-sm transition-all duration-200 shadow-[0_4px_14px_0_rgba(181,78,113,0.35)] hover:shadow-[0_6px_20px_rgba(181,78,113,0.45)] disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed group focus:outline-none focus:ring-2 focus:ring-[#b54e71] focus:ring-offset-2"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                <span>Validation...</span>
              </>
            ) : (
              <>
                <span>Accéder à la formation</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </>
            )}
          </button>
        </form>
      </main>

      {/* 4. Footer minimal */}
      <footer className="w-full py-4 text-center text-xs text-[#999999] border-t border-black/[0.04]">
        © {new Date().getFullYear()} Sensoa. Tous droits réservés.
      </footer>
    </div>
  );
}
