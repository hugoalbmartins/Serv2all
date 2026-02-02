import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

import portfolioCC11 from "@/assets/portfolio-cc11.png";
import portfolioMPgrupo from "@/assets/portfolio-mpgrupo.png";
import portfolioAskFernando from "@/assets/portfolio-askfernando.png";

const projects = [
  {
    name: "CC11",
    url: "https://cc11.pt",
    image: portfolioCC11,
    description: "Website profissional para empresa de lacagem, restauro e carpintaria.",
    category: "Website Institucional",
  },
  {
    name: "MPgrupo",
    url: "https://mpgrupo.pt",
    image: portfolioMPgrupo,
    description: "Plataforma digital para empresa de telecomunicações e energia com 20 anos de experiência.",
    category: "Website Empresarial",
  },
  {
    name: "Ask Fernando",
    url: "https://askfernando.pt",
    image: portfolioAskFernando,
    description: "Website para consultoria de serviços a expatriados em Portugal.",
    category: "Website de Serviços",
  },
];

const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden bg-card">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-10" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium mb-4 block">Portfólio</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Projetos que <span className="text-gradient">Falam por Nós</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Conheça alguns dos websites que desenvolvemos para clientes satisfeitos.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative block"
            >
              <div className="relative overflow-hidden rounded-2xl border border-border/50 hover-glow">
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-primary text-sm font-medium mb-2 block">{project.category}</span>
                  <h3 className="font-display font-semibold text-xl mb-2 flex items-center gap-2">
                    {project.name}
                    <ExternalLink className="w-4 h-4" />
                  </h3>
                  <p className="text-muted-foreground text-sm">{project.description}</p>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-full">
                  <span className="text-xs font-medium text-foreground">{project.category}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
