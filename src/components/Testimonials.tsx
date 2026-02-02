import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "CC11 - Lacagem & Carpintaria",
    role: "Proprietário",
    website: "cc11.pt",
    content: "A Serv2all transformou a nossa presença online por completo. O website ficou moderno, profissional e os nossos clientes adoram! O serviço foi impecável do início ao fim.",
    rating: 5,
  },
  {
    name: "MPgrupo",
    role: "Diretor Geral",
    website: "mpgrupo.pt",
    content: "20 anos de experiência mereciam um site à altura. A equipa da Serv2all entendeu perfeitamente a nossa visão e entregou um resultado que superou todas as expectativas. Recomendo vivamente!",
    rating: 5,
  },
  {
    name: "Ask Fernando",
    role: "Fundador",
    website: "askfernando.pt",
    content: "Trabalhar com a Serv2all foi uma experiência excelente. Profissionais dedicados, prazos cumpridos e um resultado final que transmite exatamente a confiança que quero passar aos meus clientes.",
    rating: 5,
  },
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testemunhos" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium mb-4 block">Testemunhos</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            O Que Dizem os <span className="text-gradient">Nossos Clientes</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A satisfação dos nossos clientes é a nossa maior conquista.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              <div className="card-elevated rounded-2xl p-8 h-full border border-border/50 hover-glow">
                {/* Quote Icon */}
                <div className="absolute -top-4 left-8">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Quote className="w-4 h-4 text-primary-foreground" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-6 pt-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-foreground mb-8 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="border-t border-border/50 pt-6">
                  <h4 className="font-display font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                  <a
                    href={`https://${testimonial.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm hover:underline mt-1 inline-block"
                  >
                    {testimonial.website}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
