import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const activeProject = projects[activeIndex];

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden bg-card">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium mb-4 block">Portfólio & Testemunhos</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Projetos que <span className="text-gradient">Falam por Nós</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Conheça alguns dos websites que desenvolvemos e o que os nossos clientes têm a dizer.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          {/* Project Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-2xl border border-border/50"
              >
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden cursor-pointer" onClick={() => setIsImageOpen(true)}>
                  <img
                    src={activeProject.image}
                    alt={activeProject.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                  <div className="flex gap-3">
                    <Button variant="hero" size="lg" asChild>
                      <a href={activeProject.url} target="_blank" rel="noopener noreferrer">
                        Visitar Site
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                    <Button variant="glass" size="lg" onClick={() => setIsImageOpen(true)}>
                      <Maximize2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 glass px-4 py-2 rounded-full">
                  <span className="text-sm font-medium text-foreground">{activeProject.category}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
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

          {/* Project Info & Testimonial */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Project Name */}
                <div>
                  <h3 className="font-display text-3xl md:text-4xl font-bold mb-3">
                    {activeProject.name}
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    {activeProject.description}
                  </p>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {activeProject.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1.5 glass rounded-full text-sm text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Testimonial Card */}
                <div className="card-elevated rounded-2xl p-6 border border-border/50 relative mt-8">
                  {/* Quote Icon */}
                  <div className="absolute -top-4 left-6">
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Quote className="w-4 h-4 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4 pt-2">
                    {Array.from({ length: activeProject.testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-foreground leading-relaxed mb-6 italic">
                    "{activeProject.testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-display font-semibold text-foreground">
                        {activeProject.testimonial.author}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {activeProject.testimonial.role} · {activeProject.name}
                      </p>
                    </div>
                    <a
                      href={activeProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm flex items-center gap-1"
                    >
                      {activeProject.url.replace('https://', '')}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-3 mt-8">
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
          </motion.div>
        </div>

        {/* Project Thumbnails */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center gap-4 mt-16"
        >
          {projects.map((project, index) => (
            <motion.button
              key={project.name}
              onClick={() => setActiveIndex(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                index === activeIndex
                  ? "border-primary shadow-lg shadow-primary/20"
                  : "border-border/50 opacity-60 hover:opacity-100"
              }`}
            >
              <div className="w-24 h-16 md:w-32 md:h-20 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {index === activeIndex && (
                <motion.div
                  layoutId="activeThumbnail"
                  className="absolute inset-0 border-2 border-primary rounded-xl"
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Fullscreen Image Dialog */}
      <Dialog open={isImageOpen} onOpenChange={setIsImageOpen}>
        <DialogContent className="max-w-5xl bg-card/95 border-border/50 p-2">
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
