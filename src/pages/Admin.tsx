import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw, Mail, AlertCircle } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  project_type: string;
  message: string;
  status: string;
  created_at: string;
}

export default function Admin() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [testing, setTesting] = useState(false);
  const { toast } = useToast();

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os contactos',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const testEmail = async () => {
    try {
      setTesting(true);
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`;

      const testData = {
        name: 'Teste Admin',
        email: 'teste@serv2all.pt',
        phone: '123456789',
        projectType: 'Teste de Email',
        message: 'Este é um email de teste enviado através do painel de administração.',
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.details || 'Erro ao enviar email');
      }

      toast({
        title: 'Email de teste enviado',
        description: result.message,
      });

      fetchContacts();
    } catch (error) {
      toast({
        title: 'Erro ao enviar email',
        description: error instanceof Error ? error.message : 'Erro desconhecido',
        variant: 'destructive',
      });
    } finally {
      setTesting(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Painel de Administração</h1>
            <p className="text-gray-600 mt-2">Gestão de contactos recebidos</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={testEmail}
              disabled={testing}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              {testing ? 'Enviando...' : 'Testar Email'}
            </Button>
            <Button
              onClick={fetchContacts}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
          </div>
        </div>

        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardHeader>
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <CardTitle className="text-blue-900">Informação sobre Email</CardTitle>
                <CardDescription className="text-blue-700 mt-2">
                  Os emails são enviados via SMTP diretamente para info@serv2all.pt
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Verifique a pasta de spam/lixo caso não encontre o email</li>
                    <li>Use o botão "Testar Email" para enviar um email de teste</li>
                    <li>Todos os contactos são sempre guardados na base de dados</li>
                  </ul>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-gray-400" />
            <p className="mt-4 text-gray-600">A carregar contactos...</p>
          </div>
        ) : contacts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-600">Ainda não há contactos recebidos</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <Card key={contact.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{contact.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {formatDate(contact.created_at)}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">{contact.project_type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {contact.email}
                        </a>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Telefone</p>
                        <a
                          href={`tel:${contact.phone}`}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {contact.phone || 'Não fornecido'}
                        </a>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Mensagem</p>
                      <p className="text-gray-900 whitespace-pre-wrap bg-gray-50 p-3 rounded-md">
                        {contact.message}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
