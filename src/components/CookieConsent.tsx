import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show popup after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-50"
        >
          <div className="glass rounded-2xl p-6 border border-border/50 shadow-2xl">
            {/* Close button */}
            <button
              onClick={declineCookies}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Content */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shrink-0">
                <Cookie className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-semibold text-lg mb-2">
                  🍪 Utilizamos Cookies
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  Utilizamos cookies para melhorar a sua experiência. Ao continuar a navegar, concorda com a nossa{" "}
                  <Link to="/politica-cookies" className="text-primary hover:underline">
                    Política de Cookies
                  </Link>
                  .
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="hero" size="sm" onClick={acceptCookies}>
                    Aceitar Todos
                  </Button>
                  <Button variant="heroOutline" size="sm" onClick={declineCookies}>
                    Apenas Essenciais
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
