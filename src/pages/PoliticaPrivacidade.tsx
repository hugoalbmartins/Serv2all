import { motion } from "framer-motion";
import { ArrowLeft, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PoliticaPrivacidade = () => {
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
                  <Shield className="w-7 h-7 text-primary-foreground" />
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-bold">
                  Política de Privacidade
                </h1>
              </div>

              <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
                <p className="text-lg">
                  <strong className="text-foreground">Última atualização:</strong> Janeiro 2025
                </p>

                <section>
                  <h2 className="text-xl font-display font-semibold text-foreground mb-3">
                    Introdução
                  </h2>
                  <p>
                    A Serv2all compromete-se a proteger a sua privacidade. Esta política explica como recolhemos, 
                    utilizamos e protegemos as suas informações pessoais quando utiliza o nosso website e serviços.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-display font-semibold text-foreground mb-3">
                    Dados que Recolhemos
                  </h2>
                  <p>Podemos recolher os seguintes tipos de informação:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-3">
                    <li><strong className="text-foreground">Informação de contacto:</strong> nome, email, telefone quando nos contacta</li>
                    <li><strong className="text-foreground">Dados de navegação:</strong> endereço IP, tipo de browser, páginas visitadas</li>
                    <li><strong className="text-foreground">Informação de projeto:</strong> detalhes fornecidos ao solicitar orçamentos</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-display font-semibold text-foreground mb-3">
                    Como Utilizamos os Seus Dados
                  </h2>
                  <p>Utilizamos as suas informações para:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-3">
                    <li>Responder aos seus pedidos de contacto e orçamentos</li>
                    <li>Prestar os serviços contratados</li>
                    <li>Melhorar o nosso website e serviços</li>
                    <li>Cumprir obrigações legais</li>
                    <li>Enviar comunicações de marketing (apenas com o seu consentimento)</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-display font-semibold text-foreground mb-3">
                    Base Legal
                  </h2>
                  <p>
                    Tratamos os seus dados pessoais com base no seu consentimento, na execução de contratos, 
                    no cumprimento de obrigações legais e nos nossos interesses legítimos de melhorar os nossos serviços.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-display font-semibold text-foreground mb-3">
                    Partilha de Dados
                  </h2>
                  <p>
                    Não vendemos nem partilhamos os seus dados pessoais com terceiros, exceto quando necessário 
                    para prestar os nossos serviços (ex: alojamento web) ou quando exigido por lei.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-display font-semibold text-foreground mb-3">
                    Segurança dos Dados
                  </h2>
                  <p>
                    Implementamos medidas técnicas e organizacionais apropriadas para proteger os seus dados 
                    contra acesso não autorizado, alteração, divulgação ou destruição.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-display font-semibold text-foreground mb-3">
                    Os Seus Direitos
                  </h2>
                  <p>Ao abrigo do RGPD, tem os seguintes direitos:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-3">
                    <li><strong className="text-foreground">Acesso:</strong> solicitar cópia dos seus dados pessoais</li>
                    <li><strong className="text-foreground">Retificação:</strong> corrigir dados incorretos</li>
                    <li><strong className="text-foreground">Apagamento:</strong> solicitar a eliminação dos seus dados</li>
                    <li><strong className="text-foreground">Portabilidade:</strong> receber os seus dados em formato estruturado</li>
                    <li><strong className="text-foreground">Oposição:</strong> opor-se ao tratamento dos seus dados</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-display font-semibold text-foreground mb-3">
                    Retenção de Dados
                  </h2>
                  <p>
                    Mantemos os seus dados apenas pelo tempo necessário para cumprir as finalidades para as quais 
                    foram recolhidos, incluindo obrigações legais, contabilísticas ou de reporte.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-display font-semibold text-foreground mb-3">
                    Contacto
                  </h2>
                  <p>
                    Para exercer os seus direitos ou esclarecer dúvidas sobre esta política, contacte-nos através de{" "}
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

export default PoliticaPrivacidade;
