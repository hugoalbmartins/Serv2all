import { motion } from "framer-motion";
import { ArrowLeft, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TermosUso = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Fixed background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="py-6 px-4">
          <div className="container mx-auto">
            <Button variant="ghost" asChild>
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Voltar ao Site
              </Link>
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="container mx-auto px-4 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="glass rounded-2xl p-8 md:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <FileText className="w-7 h-7 text-primary-foreground" />
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-bold">
                  Termos de Uso
                </h1>
              </div>

              <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
                <p className="text-lg">
                  <strong className="text-foreground">Última atualização:</strong> Janeiro 2025
                </p>

                <section>
                  <h2 className="text-xl font-display font-semibold text-foreground mb-3">
                    Aceitação dos Termos
                  </h2>
                  <p>
                    Ao aceder e utilizar o website da Serv2all, aceita e concorda em ficar vinculado por estes 
                    Termos de Uso e por todas as leis e regulamentos aplicáveis. Se não concordar com algum 
                    destes termos, está proibido de usar ou aceder a este site.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-display font-semibold text-foreground mb-3">
                    Serviços
                  </h2>
                  <p>
                    A Serv2all oferece serviços de desenvolvimento web, criação de CRMs personalizados, 
                    design de imagem corporativa e manutenção de websites. Os detalhes específicos de cada 
                    projeto são acordados individualmente através de propostas e contratos específicos.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-display font-semibold text-foreground mb-3">
                    Propriedade Intelectual
                  </h2>
                  <p>
                    Todo o conteúdo presente neste website, incluindo textos, gráficos, logótipos, ícones, 
                    imagens e software, é propriedade da Serv2all ou dos seus fornecedores de conteúdo e 
                    está protegido pelas leis de propriedade intelectual portuguesas e internacionais.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-display font-semibold text-foreground mb-3">
                    Uso Permitido
                  </h2>
                  <p>Ao utilizar este site, concorda em:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-3">
                    <li>Não utilizar o site para qualquer finalidade ilegal ou não autorizada</li>
                    <li>Não tentar aceder a áreas restritas do site</li>
                    <li>Não transmitir vírus ou código de natureza destrutiva</li>
                    <li>Não recolher ou armazenar dados pessoais de outros utilizadores</li>
                    <li>Não reproduzir, duplicar, copiar ou revender qualquer parte do site</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-display font-semibold text-foreground mb-3">
                    Limitação de Responsabilidade
                  </h2>
                  <p>
                    O conteúdo deste site é fornecido "tal como está". A Serv2all não garante que o site 
                    estará sempre disponível ou livre de erros. Não seremos responsáveis por quaisquer danos 
                    indiretos, incidentais, especiais, consequenciais ou punitivos resultantes do uso deste site.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-display font-semibold text-foreground mb-3">
                    Links Externos
                  </h2>
                  <p>
                    Este site pode conter links para websites de terceiros. Estes links são fornecidos apenas 
                    para conveniência e não implicam endosso. A Serv2all não é responsável pelo conteúdo de 
                    sites externos.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-display font-semibold text-foreground mb-3">
                    Orçamentos e Propostas
                  </h2>
                  <p>
                    Os orçamentos fornecidos através deste website são indicativos e sujeitos a confirmação 
                    após análise detalhada das necessidades do projeto. Os preços finais e condições são 
                    definidos em proposta comercial formal.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-display font-semibold text-foreground mb-3">
                    Alterações aos Termos
                  </h2>
                  <p>
                    A Serv2all reserva-se o direito de modificar estes termos a qualquer momento. As alterações 
                    entram em vigor imediatamente após a sua publicação no site. O uso continuado do site após 
                    as alterações constitui aceitação dos novos termos.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-display font-semibold text-foreground mb-3">
                    Lei Aplicável
                  </h2>
                  <p>
                    Estes termos são regidos pelas leis de Portugal. Qualquer disputa será submetida à 
                    jurisdição exclusiva dos tribunais portugueses.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-display font-semibold text-foreground mb-3">
                    Contacto
                  </h2>
                  <p>
                    Para questões sobre estes Termos de Uso, contacte-nos através de{" "}
                    <a href="mailto:info@serv2all.pt" className="text-primary hover:underline">
                      info@serv2all.pt
                    </a>.
                  </p>
                </section>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default TermosUso;
