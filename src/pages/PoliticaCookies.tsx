import { motion } from "framer-motion";
import { ArrowLeft, Cookie } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PoliticaCookies = () => {
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
                  <Cookie className="w-7 h-7 text-primary-foreground" />
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-bold">
                  Política de Cookies
                </h1>
              </div>

              <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
                <p className="text-lg">
                  <strong className="text-foreground">Última atualização:</strong> Janeiro 2025
                </p>

                <section>
                  <h2 className="text-xl font-display font-semibold text-foreground mb-3">
                    O Que São Cookies?
                  </h2>
                  <p>
                    Cookies são pequenos ficheiros de texto armazenados no seu dispositivo quando visita um website. 
                    São amplamente utilizados para fazer os websites funcionarem de forma mais eficiente, 
                    bem como para fornecer informações aos proprietários do site.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-display font-semibold text-foreground mb-3">
                    Como Utilizamos os Cookies
                  </h2>
                  <p>A Serv2all utiliza cookies para:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-3">
                    <li>Lembrar as suas preferências e configurações</li>
                    <li>Melhorar a velocidade e segurança do site</li>
                    <li>Analisar como os visitantes utilizam o nosso site</li>
                    <li>Personalizar o conteúdo e a publicidade</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-display font-semibold text-foreground mb-3">
                    Tipos de Cookies que Utilizamos
                  </h2>
                  
                  <div className="space-y-4 mt-4">
                    <div className="bg-background/50 rounded-lg p-4">
                      <h3 className="font-semibold text-foreground mb-2">Cookies Essenciais</h3>
                      <p className="text-sm">
                        Necessários para o funcionamento básico do site. Não podem ser desativados.
                      </p>
                    </div>
                    
                    <div className="bg-background/50 rounded-lg p-4">
                      <h3 className="font-semibold text-foreground mb-2">Cookies de Desempenho</h3>
                      <p className="text-sm">
                        Recolhem informações sobre como os visitantes utilizam o site, permitindo-nos melhorar o seu funcionamento.
                      </p>
                    </div>
                    
                    <div className="bg-background/50 rounded-lg p-4">
                      <h3 className="font-semibold text-foreground mb-2">Cookies Funcionais</h3>
                      <p className="text-sm">
                        Permitem que o site se lembre das suas escolhas e forneça funcionalidades melhoradas.
                      </p>
                    </div>
                    
                    <div className="bg-background/50 rounded-lg p-4">
                      <h3 className="font-semibold text-foreground mb-2">Cookies de Marketing</h3>
                      <p className="text-sm">
                        Utilizados para apresentar anúncios relevantes para si e medir a eficácia das campanhas publicitárias.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-display font-semibold text-foreground mb-3">
                    Gerir as Suas Preferências
                  </h2>
                  <p>
                    Pode controlar e/ou eliminar cookies como desejar. Pode eliminar todos os cookies que já estão 
                    no seu computador e pode configurar a maioria dos navegadores para impedir que sejam instalados. 
                    No entanto, se o fizer, poderá ter de ajustar manualmente algumas preferências sempre que visitar 
                    um site e alguns serviços e funcionalidades podem não funcionar.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-display font-semibold text-foreground mb-3">
                    Contacto
                  </h2>
                  <p>
                    Se tiver questões sobre a nossa utilização de cookies, contacte-nos através de{" "}
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

export default PoliticaCookies;
