import { motion } from "framer-motion";
import { Phone, Mail, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 relative overflow-hidden border-t border-border/50">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="font-display font-bold text-primary-foreground text-lg">S</span>
              </div>
              <span className="font-display font-bold text-xl">
                <span className="text-gradient">Serv</span>
                <span className="text-foreground">2all</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm">
              Desenvolvimento de websites e CRMs à medida. Baixos custos, alta performance.
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <a
              href="tel:966622017"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>966 622 017</span>
            </a>
            <a
              href="mailto:info@serv2all.pt"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>info@serv2all.pt</span>
            </a>
          </div>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg"
          >
            <ArrowUp className="w-5 h-5 text-primary-foreground" />
          </motion.button>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border/50 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Serv2all. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
