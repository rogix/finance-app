export const SESSION_DURATION = 60 * 1000 * 3; // 3 minutos: duração da sessão
export const MAX_ITEMS = 10; // Número máximo de itens na listagem: limita a quantidade de ações e moedas exibidas na tela inicial
export const INTERVAL_FETCH_TIME = 60 * 1000; // Intervalo de tempo para atualização dos dados (1 minuto): tempo entre as requisições à API

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.hgbrasil.com/finance"; // URL da API
