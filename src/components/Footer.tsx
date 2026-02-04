import { motion } from "framer-motion";
import { Phone, Mail, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 relative overflow-hidden border-t border-border/30">
      {/* Semi-transparent background */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
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
        </motion.div>

        {/* Legal Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 pt-6 border-t border-border/30 flex flex-wrap justify-center gap-4 md:gap-8"
        >
          <Link 
            to="/politica-cookies" 
            className="text-muted-foreground hover:text-primary text-sm transition-colors"
          >
            Política de Cookies
          </Link>
          <Link 
            to="/politica-privacidade" 
            className="text-muted-foreground hover:text-primary text-sm transition-colors"
          >
            Política de Privacidade
          </Link>
          <Link 
            to="/termos-uso" 
            className="text-muted-foreground hover:text-primary text-sm transition-colors"
          >
            Termos de Uso
          </Link>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-center"
        >
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Serv2all. Todos os direitos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
