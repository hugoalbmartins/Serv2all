import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Star, Quote, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

import portfolioCC11 from "@/assets/portfolio-cc11.png";
import portfolioMPgrupo from "@/assets/portfolio-mpgrupo.png";
import portfolioAskFernando from "@/assets/portfolio-askfernando.png";

const projects = [
  {
    name: "CC11",
    url: "https://cc11.pt",
    image: portfolioCC11,
    description: "Website profissional para empresa de lacagem, restauro e carpintaria com mais de 30 anos de experiência.",
    category: "Website Institucional",
    testimonial: {
      author: "Carlos Costa",
      role: "Proprietário",
      content: "A Serv2all transformou a nossa presença online por completo. O website ficou moderno, profissional e os nossos clientes adoram! O serviço foi impecável do início ao fim. Recomendo a 100%!",
      rating: 5,
    },
    features: ["Design Moderno", "Galeria de Projetos", "Formulário de Contacto", "SEO Otimizado"],
  },
  {
    name: "MPgrupo",
    url: "https://mpgrupo.pt",
    image: portfolioMPgrupo,
    description: "Plataforma digital completa para empresa de telecomunicações e energia com 20 anos de experiência no mercado.",
    category: "Website Empresarial",
    testimonial: {
      author: "Manuel Pereira",
      role: "Diretor Geral",
      content: "20 anos de experiência mereciam um site à altura. A equipa da Serv2all entendeu perfeitamente a nossa visão e entregou um resultado que superou todas as expectativas. Parceiros de confiança!",
      rating: 5,
    },
    features: ["Simulador de Poupança", "Portal de Parceiros", "Design Premium", "Integração CRM"],
  },
  {
    name: "Ask Fernando",
    url: "https://askfernando.pt",
    image: portfolioAskFernando,
    description: "Website bilingue para consultoria de serviços a expatriados em Portugal, com foco em utilidades e seguros.",
    category: "Website de Serviços",
    testimonial: {
      author: "Fernando Mendes",
      role: "Fundador",
      content: "Trabalhar com a Serv2all foi uma experiência excelente. Profissionais dedicados, prazos cumpridos e um resultado final que transmite exatamente a confiança que quero passar aos meus clientes.",
      rating: 5,
    },
    features: ["Multilingue", "Estatísticas Dinâmicas", "Design Escuro", "Mobile First"],
  },
];

const Portfolio = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const activeProject = projects[activeIndex];

  // Calculate positions for 3D carousel
  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff = ((diff + projects.length) % projects.length);
    
    // Map to -1, 0, 1 for left, center, right
    let position = normalizedDiff;
    if (normalizedDiff > projects.length / 2) {
      position = normalizedDiff - projects.length;
    }

    const isCenter = position === 0;
    const isLeft = position === -1 || (projects.length === 3 && position === 2);
    const isRight = position === 1;

    if (isCenter) {
      return {
        x: 0,
        scale: 1,
        zIndex: 30,
        rotateY: 0,
        opacity: 1,
      };
    } else if (isLeft || position === -1 || position === 2) {
      return {
        x: -200,
        scale: 0.75,
        zIndex: 20,
        rotateY: 35,
        opacity: 0.7,
      };
    } else if (isRight) {
      return {
        x: 200,
        scale: 0.75,
        zIndex: 20,
        rotateY: -35,
        opacity: 0.7,
      };
    }
    
    return {
      x: 0,
      scale: 0.5,
      zIndex: 10,
      rotateY: 0,
      opacity: 0,
    };
  };

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden">
      {/* Semi-transparent background */}
      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
      
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="glass rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium mb-4 block">Portfólio & Testemunhos</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Projetos que <span className="text-gradient">Falam por Nós</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Conheça alguns dos websites que desenvolvemos e o que os nossos clientes têm a dizer.
          </p>
        </motion.div>

        {/* 3D Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative h-[400px] md:h-[450px] mb-12"
          style={{ perspective: "1200px" }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {projects.map((project, index) => {
              const style = getCardStyle(index);
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={project.name}
                  animate={{
                    x: style.x,
                    scale: style.scale,
                    rotateY: style.rotateY,
                    opacity: style.opacity,
                    zIndex: style.zIndex,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                  }}
                  className="absolute cursor-pointer"
                  style={{ 
                    transformStyle: "preserve-3d",
                  }}
                  onClick={() => !isActive && setActiveIndex(index)}
                >
                  <div 
                    className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                      isActive 
                        ? "border-primary shadow-2xl shadow-primary/20" 
                        : "border-border/30"
                    }`}
                  >
                    <div className="w-[300px] md:w-[500px] aspect-[16/10] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    
                    {/* Overlay for non-active */}
                    {!isActive && (
                      <div className="absolute inset-0 bg-background/40" />
                    )}

                    {/* Category Badge - only on active */}
                    {isActive && (
                      <div className="absolute top-4 left-4 glass px-4 py-2 rounded-full">
                        <span className="text-sm font-medium text-foreground">{project.category}</span>
                      </div>
                    )}

                    {/* Hover Overlay - only on active */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                        <div className="flex gap-3">
                          <Button variant="hero" size="lg" asChild>
                            <a href={project.url} target="_blank" rel="noopener noreferrer">
                              Visitar Site
                              <ExternalLink className="w-4 h-4 ml-2" />
                            </a>
                          </Button>
                          <Button variant="glass" size="lg" onClick={() => setIsImageOpen(true)}>
                            <Maximize2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-4 z-40">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevProject}
              className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextProject}
              className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-3 mb-12">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>

        {/* Project Info & Testimonial */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <div className="glass rounded-2xl p-8 md:p-10">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Project Info */}
                  <div>
                    <h3 className="font-display text-3xl font-bold mb-3">
                      {activeProject.name}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {activeProject.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm text-muted-foreground"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="bg-background/50 rounded-xl p-6 relative">
                    <div className="absolute -top-3 left-6">
                      <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <Quote className="w-4 h-4 text-primary-foreground" />
                      </div>
                    </div>

                    <div className="flex gap-1 mb-4 pt-2">
                      {Array.from({ length: activeProject.testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>

                    <p className="text-foreground text-sm leading-relaxed mb-4 italic">
                      "{activeProject.testimonial.content}"
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground text-sm">
                          {activeProject.testimonial.author}
                        </h4>
                        <p className="text-muted-foreground text-xs">
                          {activeProject.testimonial.role} · {activeProject.name}
                        </p>
                      </div>
                      <a
                        href={activeProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-xs flex items-center gap-1"
                      >
                        {activeProject.url.replace('https://', '')}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Fullscreen Image Dialog */}
      <Dialog open={isImageOpen} onOpenChange={setIsImageOpen}>
        <DialogContent className="max-w-5xl glass border-border/50 p-2">
          <img
            src={activeProject.image}
            alt={activeProject.name}
            className="w-full h-auto rounded-lg"
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <Button variant="hero" asChild>
              <a href={activeProject.url} target="_blank" rel="noopener noreferrer">
                Visitar {activeProject.name}
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Portfolio;