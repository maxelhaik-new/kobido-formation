"use client";

import { useState, useTransition } from "react";
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
          // Redirection vers le portail proxifié
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
    <main className="min-h-screen flex flex-col items-center justify-between p-6 sm:p-10 relative overflow-hidden bg-[#FAF8F5]">
      {/* Subtle decorative background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#E8DED2]/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#D7C6B2]/30 blur-3xl pointer-events-none" />

      {/* Top Brand Header */}
      <header className="w-full max-w-md pt-4 sm:pt-8 flex flex-col items-center text-center z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4EFE8] border border-[#E8DED2] text-[#8B6A51] text-xs uppercase tracking-widest font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Espace de Formation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-wider text-[#2D241E] uppercase">
          Sensoa
        </h1>
        <p className="text-xs sm:text-sm text-[#8B6A51] tracking-wide mt-1 font-light">
          Art Ancestral du Kobido & Massages d&apos;Exception
        </p>
      </header>

      {/* Main Access Card */}
      <section className="w-full max-w-md my-auto py-8 z-10">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-7 sm:p-9 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E8DED2]/70 transition-all">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#F4EFE8] text-[#8B6A51] flex items-center justify-center mb-4 shadow-inner">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-semibold text-[#2D241E]">
              Accès réservé aux apprenants
            </h2>
            <p className="text-xs text-[#715744] mt-2 max-w-xs leading-relaxed">
              Veuillez saisir votre mot de passe pour accéder aux modules de cours, protocoles et vidéos.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="site-password"
                className="block text-xs font-medium uppercase tracking-wider text-[#715744] mb-2"
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
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-[#FAF8F5] border border-[#E8DED2] text-[#2D241E] text-sm placeholder-[#A68263]/60 focus:outline-none focus:ring-2 focus:ring-[#B59473]/50 focus:border-[#B59473] transition-all disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A68263] hover:text-[#715744] transition-colors p-1"
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
                className="p-3 rounded-xl bg-red-50/80 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-fadeIn"
              >
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#2D241E] hover:bg-[#43362E] active:bg-[#1E1713] text-[#FAF8F5] font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed group"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Validation en cours...</span>
                </>
              ) : (
                <>
                  <span>Accéder à la formation</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#E8DED2]/60 flex items-center justify-center gap-2 text-xs text-[#8B6A51]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Portail officiel sécurisé Sensoa</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-md pb-4 text-center text-xs text-[#A68263] z-10">
        <p>
          Besoin d&apos;assistance ? Rapprochez-vous de votre formatrice.
        </p>
        <p className="text-[11px] text-[#A68263]/70 mt-1">
          © {new Date().getFullYear()} Sensoa. Tous droits réservés.
        </p>
      </footer>
    </main>
  );
}
