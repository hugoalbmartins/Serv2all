import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, Mail, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactInfo = [
  {
    icon: Phone,
    label: "Telefone",
    value: "966 622 017",
    href: "tel:966622017",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@serv2all.pt",
    href: "mailto:info@serv2all.pt",
  },
];

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectType: "",
          message: "",
        });
        setTimeout(() => setIsSubmitted(false), 3000);
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contactos" className="py-24 relative overflow-hidden">
      {/* Semi-transparent background */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="glass rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium mb-4 block">Contacte-nos</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Vamos Criar <span className="text-gradient">Algo Incrível</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Entre em contacto connosco e descubra como podemos ajudar o seu negócio a crescer online.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="glass rounded-2xl p-8">
              <h3 className="font-display text-2xl font-semibold mb-8">Fale Connosco</h3>

              <div className="space-y-6 mb-12">
                {contactInfo.map((info, index) => (
                  <motion.div 
                    key={info.label} 
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shrink-0">
                      <info.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">{info.label}</p>
                      {info.href ? (
                        <a href={info.href} className="text-foreground font-medium hover:text-primary transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-foreground font-medium">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="bg-background/50 rounded-xl p-6">
                <h4 className="font-display font-semibold mb-6">Porque Escolher a Serv2all?</h4>
                <ul className="space-y-4">
                  {[
                    "Baixos custos, alta qualidade",
                    "Projetos 100% personalizados",
                    "Anos de experiência comprovada",
                    "Suporte dedicado pós-lançamento",
                  ].map((item, index) => (
                    <motion.li 
                      key={item} 
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    >
                      <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="glass rounded-2xl p-8 border border-border/30">
              <h3 className="font-display text-2xl font-semibold mb-6">Pedir Orçamento</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Nome</label>
                    <Input
                      type="text"
                      name="name"
                      placeholder="O seu nome"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-muted/50 border-border/50 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="email@exemplo.pt"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-muted/50 border-border/50 focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Telefone</label>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="O seu número"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-muted/50 border-border/50 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Tipo de Projeto</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-lg bg-muted/50 border border-border/50 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="website">Website</option>
                    <option value="crm">CRM</option>
                    <option value="ecommerce">E-Commerce</option>
                    <option value="branding">Imagem Corporativa</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Mensagem</label>
                  <Textarea
                    name="message"
                    placeholder="Descreva o seu projeto..."
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="bg-muted/50 border-border/50 focus:border-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="xl"
                  className="w-full"
                  disabled={isSubmitted || isLoading}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Enviado com Sucesso!
                    </>
                  ) : isLoading ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensagem
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
