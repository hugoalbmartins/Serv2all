import { motion } from "framer-motion";
import { ArrowRight, Code2, Palette, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Fixed Background Image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-80" />
      </div>

      {/* Grid Pattern */}
      <div className="fixed inset-0 bg-grid opacity-30 z-0" />

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-1/4 left-10 w-20 h-20 border border-primary/30 rounded-xl rotate-45 hidden lg:block z-0"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="fixed bottom-1/4 right-20 w-16 h-16 bg-gradient-primary opacity-20 rounded-lg hidden lg:block z-0"
      />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20 min-h-screen flex flex-col justify-center">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Anos de Experiência em Desenvolvimento Web</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="font-display text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6"
          >
            Websites & CRMs
            <br />
            <span className="text-gradient">à Medida do Seu Negócio</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10"
          >
            Baixos custos, alta performance e construções totalmente personalizadas. 
            Transformamos a sua visão em experiências digitais impactantes.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12 md:mb-16"
          >
            <Button variant="hero" size="xl" asChild>
              <a href="#contactos" className="flex items-center gap-2">
                Iniciar Projeto
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href="#portfolio">Ver Portfólio</a>
            </Button>
          </motion.div>

          {/* Feature Cards with Slide-in Animation */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto pb-8">
            {[
              {
                icon: Code2,
                title: "Websites à Medida",
                description: "Design único e desenvolvimento personalizado",
                delay: 0.4,
                direction: -100,
              },
              {
                icon: Zap,
                title: "Alta Performance",
                description: "Velocidade e otimização garantidas",
                delay: 0.5,
                direction: 0,
              },
              {
                icon: Palette,
                title: "Imagem Corporativa",
                description: "Branding completo para a sua empresa",
                delay: 0.6,
                direction: 100,
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: feature.direction, y: index === 1 ? 50 : 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, delay: feature.delay, ease: "easeOut" }}
                className="glass p-6 rounded-xl hover-glow group"
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
