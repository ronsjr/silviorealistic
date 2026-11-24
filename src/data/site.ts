// Dados gerais do site. Fonte única para nome, contatos e flags de lançamento.

export const site = {
  nome: 'Silvio Muniz',
  descricao: 'Tatuador de realismo e cover up no Rio de Janeiro.',
  instagram: {
    usuario: 'silviorealistictattoo',
    url: 'https://www.instagram.com/silviorealistictattoo/',
  },
  // Número de WhatsApp no formato internacional, só dígitos: 55 + DDD + número.
  // Vazio até o Silvio confirmar qual número usar: enquanto vazio, o botão abre
  // o WhatsApp com a mensagem pronta, sem destinatário definido.
  whatsapp: '',
  mensagemWhatsapp: 'Olá, Silvio! Vi o seu portfólio e gostaria de fazer um orçamento.',
  // Site em construção: bloqueia a indexação em buscadores.
  // Mudar para false SÓ no lançamento.
  noindex: true,
};

export function linkWhatsapp(): string {
  const texto = encodeURIComponent(site.mensagemWhatsapp);
  const destino = site.whatsapp ? site.whatsapp : '';
  return `https://wa.me/${destino}?text=${texto}`;
}
