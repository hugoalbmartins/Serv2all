import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Globe, 
  Database, 
  Palette, 
  Smartphone, 
  Rocket, 
  Shield,
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Globe,
    title: "Websites Profissionais",
    description: "Sites institucionais, landing pages e lojas online com design moderno e SEO otimizado.",
    features: ["Responsive Design", "SEO Otimizado", "Performance Elevada"],
  },
  {
    icon: Database,
    title: "CRMs Personalizados",
    description: "Sistemas de gestão de clientes adaptados às necessidades específicas do seu negócio.",
    features: ["Gestão de Leads", "Automação", "Relatórios Avançados"],
  },
  {
    icon: Palette,
    title: "Imagem Corporativa",
    description: "Criação de identidade visual completa: logótipos, papelaria e materiais de marketing.",
    features: ["Logótipos", "Branding Completo", "Design Gráfico"],
  },
  {
    icon: Smartphone,
    title: "Aplicações Web",
    description: "Desenvolvimento de aplicações web progressivas e dashboards interativos.",
    features: ["PWA", "Dashboards", "Integração APIs"],
  },
  {
    icon: Rocket,
    title: "E-Commerce",
    description: "Lojas online completas com gestão de produtos, pagamentos e stock.",
    features: ["Gestão de Stock", "Pagamentos Online", "Analytics"],
  },
  {
    icon: Shield,
    title: "Manutenção & Suporte",
    description: "Suporte contínuo, atualizações de segurança e otimização do seu projeto.",
    features: ["Suporte 24/7", "Backups", "Atualizações"],
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="servicos" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium mb-4 block">Os Nossos Serviços</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Soluções <span className="text-gradient">Completas</span> para o Seu Negócio
          </h2>
          <p className="text-muted-foreground text-lg">
            Da ideia à implementação, oferecemos todos os serviços que precisa para ter uma presença digital de sucesso.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="card-elevated rounded-2xl p-8 h-full hover-glow border border-border/50 transition-all duration-500">
                {/* Icon */}
                <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="font-display font-semibold text-xl mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover Arrow */}
                <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Saber mais</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Button variant="hero" size="xl" asChild>
            <a href="#contactos" className="flex items-center gap-2">
              Pedir Orçamento Gratuito
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
