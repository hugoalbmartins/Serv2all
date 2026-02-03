import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Globe, 
  Database, 
  Palette, 
  Smartphone, 
  Rocket, 
  Shield,
  ArrowRight,
  X,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const services = [
  {
    icon: Globe,
    title: "Websites Profissionais",
    description: "Sites institucionais, landing pages e lojas online com design moderno e SEO otimizado.",
    features: ["Responsive Design", "SEO Otimizado", "Performance Elevada"],
    fullDescription: "Criamos websites que não são apenas bonitos, mas também eficazes. Cada projeto é desenvolvido à medida das necessidades do seu negócio, garantindo uma experiência de utilizador impecável em todos os dispositivos.",
    benefits: [
      "Design exclusivo e personalizado",
      "Otimização para motores de busca (SEO)",
      "Velocidade de carregamento otimizada",
      "Compatível com todos os dispositivos",
      "Painel de gestão fácil de usar",
      "Certificado SSL incluído"
    ],
    process: "Começamos por entender o seu negócio e objetivos. Depois, criamos mockups para aprovação, desenvolvemos o site e realizamos testes extensivos antes do lançamento."
  },
  {
    icon: Database,
    title: "CRMs Personalizados",
    description: "Sistemas de gestão de clientes adaptados às necessidades específicas do seu negócio.",
    features: ["Gestão de Leads", "Automação", "Relatórios Avançados"],
    fullDescription: "Os nossos CRMs são desenvolvidos especificamente para o seu fluxo de trabalho. Esqueça as soluções genéricas - criamos sistemas que se adaptam perfeitamente à forma como a sua empresa opera.",
    benefits: [
      "Interface intuitiva e fácil de usar",
      "Automação de tarefas repetitivas",
      "Relatórios e dashboards personalizados",
      "Integração com email e calendário",
      "Gestão de pipeline de vendas",
      "Histórico completo de interações"
    ],
    process: "Analisamos os seus processos atuais, identificamos pontos de melhoria e desenvolvemos um sistema que aumenta a produtividade da sua equipa."
  },
  {
    icon: Palette,
    title: "Imagem Corporativa",
    description: "Criação de identidade visual completa: logótipos, papelaria e materiais de marketing.",
    features: ["Logótipos", "Branding Completo", "Design Gráfico"],
    fullDescription: "A sua marca é a primeira impressão que os clientes têm do seu negócio. Criamos identidades visuais memoráveis que comunicam os valores e a essência da sua empresa.",
    benefits: [
      "Logótipo profissional e único",
      "Manual de identidade visual",
      "Papelaria corporativa completa",
      "Templates para redes sociais",
      "Materiais de marketing impressos",
      "Ficheiros em todos os formatos necessários"
    ],
    process: "Estudamos o seu mercado e concorrência, criamos conceitos visuais, refinamos com o seu feedback e entregamos todos os materiais prontos a usar."
  },
  {
    icon: Smartphone,
    title: "Aplicações Web",
    description: "Desenvolvimento de aplicações web progressivas e dashboards interativos.",
    features: ["PWA", "Dashboards", "Integração APIs"],
    fullDescription: "Desenvolvemos aplicações web robustas que funcionam como apps nativas. Perfeitas para gestão interna, portais de clientes ou qualquer solução que precise de funcionalidades avançadas.",
    benefits: [
      "Funciona offline (PWA)",
      "Instalável no telemóvel",
      "Dashboards em tempo real",
      "Integração com sistemas externos",
      "Autenticação segura",
      "Escalável para milhares de utilizadores"
    ],
    process: "Definimos os requisitos funcionais, criamos protótipos interativos, desenvolvemos em sprints ágeis e lançamos com suporte contínuo."
  },
  {
    icon: Rocket,
    title: "E-Commerce",
    description: "Lojas online completas com gestão de produtos, pagamentos e stock.",
    features: ["Gestão de Stock", "Pagamentos Online", "Analytics"],
    fullDescription: "Criamos lojas online que vendem. Desde a apresentação dos produtos até ao checkout, otimizamos cada passo para maximizar as suas conversões e facilitar a gestão do negócio.",
    benefits: [
      "Checkout otimizado para conversão",
      "Múltiplos métodos de pagamento",
      "Gestão de stock automatizada",
      "Cálculo automático de portes",
      "Integração com marketplaces",
      "Relatórios de vendas detalhados"
    ],
    process: "Configuramos a loja com os seus produtos, integramos pagamentos e logística, e fornecemos formação para gerir tudo autonomamente."
  },
  {
    icon: Shield,
    title: "Manutenção & Suporte",
    description: "Suporte contínuo, atualizações de segurança e otimização do seu projeto.",
    features: ["Suporte 24/7", "Backups", "Atualizações"],
    fullDescription: "Um website precisa de cuidado contínuo para se manter seguro e eficiente. Os nossos planos de manutenção garantem que o seu projeto está sempre atualizado e protegido.",
    benefits: [
      "Monitorização 24/7",
      "Backups diários automáticos",
      "Atualizações de segurança",
      "Correção de bugs prioritária",
      "Pequenas alterações incluídas",
      "Relatórios mensais de performance"
    ],
    process: "Monitorizamos proativamente o seu site, aplicamos atualizações regularmente e estamos sempre disponíveis quando precisa de ajuda."
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  const slideVariants = {
    hidden: (direction: number) => ({
      opacity: 0,
      x: direction,
    }),
    visible: {
      opacity: 1,
      x: 0,
    }
  };

  return (
    <section id="servicos" className="py-24 relative overflow-hidden">
      {/* Semi-transparent background */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="glass rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto mb-16"
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
          {services.map((service, index) => {
            // Alternate slide direction: left, center (up), right
            const directions = [-100, 0, 100, -100, 0, 100];
            const direction = directions[index % 6];
            
            return (
              <motion.div
                key={service.title}
                custom={direction}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={slideVariants}
                transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
                className="group relative"
              >
                <div className="glass rounded-2xl p-8 h-full hover-glow border border-border/30 transition-all duration-500">
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

                  {/* Learn More Button */}
                  <button
                    onClick={() => setSelectedService(service)}
                    className="flex items-center text-primary hover:text-primary/80 transition-colors group/btn"
                  >
                    <span className="text-sm font-medium">Saber mais</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
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

      {/* Service Detail Dialog */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-2xl bg-card border-border/50 max-h-[90vh] overflow-y-auto">
          {selectedService && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <selectedService.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <DialogTitle className="font-display text-2xl">
                      {selectedService.title}
                    </DialogTitle>
                  </div>
                </div>
                <DialogDescription className="text-base text-muted-foreground leading-relaxed">
                  {selectedService.fullDescription}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {/* Benefits */}
                <div>
                  <h4 className="font-display font-semibold text-lg mb-4 text-foreground">
                    O Que Está Incluído
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {selectedService.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-muted-foreground text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Process */}
                <div className="glass rounded-xl p-6">
                  <h4 className="font-display font-semibold text-lg mb-3 text-foreground">
                    O Nosso Processo
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {selectedService.process}
                  </p>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button variant="hero" size="lg" className="flex-1" asChild>
                    <a href="#contactos" onClick={() => setSelectedService(null)}>
                      Pedir Orçamento
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  <Button 
                    variant="heroOutline" 
                    size="lg" 
                    onClick={() => setSelectedService(null)}
                  >
                    Fechar
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Services;
