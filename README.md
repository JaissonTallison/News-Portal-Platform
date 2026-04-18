#  News Portal Platform

Plataforma de notícias automatizada com IA, personalização em tempo real, sistema de assinaturas e módulos avançados de monetização e utilidade pública.

---

##  Visão Geral

O **News Portal Platform** é uma plataforma de mídia digital moderna que combina:

* Ingestão automatizada de conteúdo
* Processamento editorial com Inteligência Artificial
* Personalização por usuário
* Sistema de assinaturas (PIX e cartão)
* Dashboard administrativo completo
* Módulos de classificados, empregos e tendências

Projetado para operar como um **produto escalável, white-label e comercializável**.

---

##  Arquitetura do Sistema

```
Fontes externas
   ↓
IA 1 (Coletora)
   ↓
Fila (Redis + BullMQ)
   ↓
IA 2 (Processamento)
   ↓
Revisão humana (quando necessário)
   ↓
CMS / Publicação
   ↓
Distribuição (Portal, Push, Social)
   ↓
IA 3 (Personalização)
```

---

##  Stack Tecnológica

### Frontend & Backend (BFF)

* Next.js (App Router)
* TypeScript
* TailwindCSS

### Backend & Infra

* PostgreSQL
* Prisma ORM
* Redis
* BullMQ
* Docker

### IA

* OpenAI (ou compatível)

### Pagamentos

* Mercado Pago

---

##  Estrutura do Projeto

```
apps/
  web/                      # Frontend + API (Next.js)
  worker-ingestion/         # IA 1
  worker-processing/        # IA 2
  worker-personalization/   # IA 3

packages/
  db/                       # Prisma + schema
  ai/                       # Serviços de IA
  queue/                    # Filas (BullMQ)
  auth/                     # Autenticação
  config/                   # Configurações globais
  utils/                    # Utilitários
  types/                    # Tipagens

infra/
  docker/                   # Containers (Postgres, Redis)
  nginx/                    # Proxy reverso
```

---

##  Setup do Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/JaissonTallison/News-Portal-Platform.git
cd News-Portal-Platform
```

---

### 2. Instalar dependências

```bash
pnpm install
```

---

### 3. Subir containers (Postgres + Redis)

```bash
docker compose -f infra/docker/docker-compose.yml up -d
```

---

### 4. Configurar variáveis de ambiente

Crie um `.env` na raiz:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/portal"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-secret"
OPENAI_API_KEY=""
MERCADO_PAGO_ACCESS_TOKEN=""
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

### 5. Rodar migrations

```bash
cd packages/db
npx prisma migrate dev
```

---

### 6. Rodar o projeto

```bash
pnpm dev
```

---

## 🗄️ Banco de Dados

Principais entidades:

* User
* Subscription
* Payment
* Post
* Classified
* AnalyticsEvent
* AIProcessingLog
* FeatureFlag

---

##  Segurança

* JWT com refresh token
* Hash de senha com bcrypt
* RBAC (controle por perfil)
* Logs e auditoria
* Compliance com LGPD

---

##  Funcionalidades

### Portal Público

* Home personalizada
* Notícias por editoria
* Busca avançada
* Conteúdo premium

### Área do Assinante

* Dashboard personalizado
* Favoritos
* Preferências
* Histórico de assinatura

### Administração

* CMS editorial
* Fila de revisão
* Analytics em tempo real
* Gestão de usuários e assinaturas

### IA

* IA 1: coleta de conteúdo
* IA 2: reescrita e verificação
* IA 3: personalização e recomendação

---

##  Monetização

* Assinaturas (PIX e cartão)
* Conteúdo premium
* Anúncios
* White-label
* Dados analíticos

---

##  Roadmap

### MVP

* Autenticação
* CMS básico
* IA 1 + IA 2
* Publicação automática
* Assinaturas

### Expansão

* IA 3 avançada
* Push notifications
* Clima e trânsito
* Analytics avançado

### Escala

* App mobile
* BI executivo
* White-label
* Versão governo

---

##  Ferramentas de Desenvolvimento

* Prisma Studio (visualização do banco)
* Docker
* ESLint
* TypeScript

---

##  Contribuição

1. Fork o projeto
2. Crie uma branch
3. Commit suas alterações
4. Abra um Pull Request

---

##  Licença

Este projeto está sob licença MIT.

---

##  Autor

Desenvolvido por **Jaisson Tallison**
Projeto focado em arquitetura real de produto digital escalável.
