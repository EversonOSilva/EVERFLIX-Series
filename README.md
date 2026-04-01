# EVERFLIX Séries - SerieJournal-api

Projeto Fase 2 da disciplina de Desenvolvimento de Sistemas FrontEnd (PUCRS)

Aplicação web completa para gerenciamento e catalogação de séries de TV com arquitetura cliente-servidor. Permite cadastrar, listar, editar e excluir séries com interface moderna inspirada na Netflix e persistência de dados em servidor Node.js/Express.

## Evidências do funcionamento do projeto:
- Home.PNG localizada dentro da pasta src\img - Mostra a página inicial do projeto com uma recepção e uma breve explicação;
- Sobre.PNG localizada dentro da pasta src\img - Clicando no menu sanduíche de qualquer página ou no botão sobre da página inicial - tem alguns detalhes do projeto;
- Cadastro.PNG localizada dentro da pasta src\img - Clicando no menu sanduíche de qualquer página ou no botão Cadastro da página inicial - tem um formulário para preenchimento e cadastro de séries
- Lista.PNG localizada dentro da pasta src\img - Clicando no menu sanduíche de qualquer página ou no botão Lista da página inicial - Lista todas as séries cadastradas e possibilita editar e excluir séries, mantendo persistência em arquivo JSON.

## 🎯 Visão Geral

- **Frontend**: Aplicação React moderna com Vite, Material-UI e React Router
- **Backend**: API REST com Express.js que persiste dados em arquivo JSON
- **Integração**: Comunicação via HTTP/axios com endpoints CRUD completos
- **Dados**: 10 séries de exemplo pré-carregadas (Breaking Bad, Stranger Things, etc.)

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca para construção de interfaces reativas
- **Vite** - Build tool moderno com hot reload instantâneo
- **Material-UI (MUI)** - Componentes React com design Material
- **React Router DOM v6** - Roteamento de cliente (SPA)
- **Axios** - Cliente HTTP para requisições à API
- **Day.js** - Manipulação e formatação de datas
- **Emotion** - Solução CSS-in-JS para estilos

### Backend  
- **Node.js** - Runtime JavaScript para servidor
- **Express** - Framework web minimalista para APIs REST
- **CORS** - Middleware para requisições cross-origin
- **Nodemon** - Auto-restart automático durante desenvolvimento
- **File System (fs)** - Persistência de dados em JSON

## 📋 Pré-requisitos

- Node.js 16+ (com npm)
- Windows, macOS ou Linux
- Portas 5000 (API) e 5174 (Frontend) disponíveis

## ⚙️ Instalação

### 1. Clone e navegue até o projeto

```bash
cd "Área de Trabalho\everson_oliveira_da_silva-projeto-fase-2\fase2"
```

### 2. Instale dependências do Frontend

```bash
npm install
```

### 3. Instale dependências da API

```bash
cd src/serieJournal-api
npm install
cd ../..
```

## 🚀 Executando a Aplicação

A aplicação requer dois servidores rodando em paralelo:

### Terminal 1: Iniciar API Backend (porta 5000)

```bash
cd src/serieJournal-api
npm start
```

Saída esperada:
```
[nodemon] watching path(s): *.*
[nodemon] starting `node ./bin/www`
```

### Terminal 2: Iniciar Frontend (porta 5174)

```bash
npm run dev
```

Saída esperada:
```
VITE v4.5.14 ready in 699 ms
➜ Local: http://localhost:5174/
```

### 3. Acessar a Aplicação

Abra seu navegador e acesse: **http://localhost:5174**

## 📡 Arquitetura e Endpoints da API

### Fluxo de Dados

```
Navegador
   ↓ (React + Axios)
Frontend http://localhost:5174
   ↓ (HTTP requests)
Backend http://localhost:5000
   ↓ (fs.readFile/writeFile)
data/series.json
```

### Endpoints Disponíveis

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| **GET** | `/series` | Lista todas as séries |
| **GET** | `/series/:id` | Retorna série específica por ID |
| **POST** | `/series` | Cria nova série |
| **PUT** | `/series` | Atualiza série existente |
| **DELETE** | `/series/:id` | Remove série por ID |

### Exemplos de Requisição

**Listar todas as séries:**
```bash
curl http://localhost:5000/series
```

**Pegar série por ID:**
```bash
curl http://localhost:5000/series/1
```

**Criar nova série:**
```bash
curl -X POST http://localhost:5000/series \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Breaking Bad",
    "categoria": "Drama",
    "autor": "Vince Gilligan",
    "temporadas": 5,
    "lancamento": "2008",
    "assistidoEm": "2023-03-10",
    "sinopse": "Professor de química vira fabricante de metanfetamina"
  }'
```

---

## ⚠️ IMPORTANTE: Alterações Realizadas na API (series.js)

> **ATENÇÃO PROFESSOR:** A seguir encontra-se um sumário das correções e adaptações feitas no arquivo `src/serieJournal-api/routes/series.js` para garantir o funcionamento completo do CRUD.

### 🔧 Alteração Principal: Endpoint PUT

**Problema Identificado:**
- O endpoint original era `router.put("/", ...)` (sem ID na rota)
- O frontend envia requisições para `PUT /series/:id`
- Isso causava falha na atualização de séries

**Solução Implementada:**
```javascript
// ANTES (Incorreto):
router.put("/", (req, res) => {
  const updatedSerie = req.body; // ID vinha no corpo
  // Lógica de atualização...
});

// DEPOIS (Correto):
router.put("/:id", (req, res) => {
  const serieId = parseInt(req.params.id, 10); // ID vem na URL
  const updatedSerie = { ...req.body, id: serieId };
  // Lógica de atualização...
});
```

**Impacto:**
- ✅ Edição de séries agora funciona corretamente
- ✅ Compatível com o padrão RESTful (`PUT /series/:id`)
- ✅ Mantém a persistência em arquivo JSON

**Arquivo afetado:**
```
src/serieJournal-api/routes/series.js
```

---

## 📊 Modelo de Dados

Cada série armazenada no sistema contém:

```json
{
  "id": 1,
  "titulo": "Breaking Bad",
  "categoria": "Drama",
  "autor": "Vince Gilligan",
  "temporadas": 5,
  "lancamento": "2008",
  "assistidoEm": "2023-03-10",
  "sinopse": "Professor de química vira fabricante de metanfetamina para garantir o futuro de sua família."
}
```

**Tipos de Dados:**
- `id` (number): Identificador único, gerado automaticamente
- `titulo` (string): Nome da série (obrigatório)
- `categoria` (string): Gênero/tipo (obrigatório)
- `autor` (string): Criador/produtor (obrigatório)
- `temporadas` (number): Quantidade de temporadas (obrigatório)
- `lancamento` (string): Ano no formato YYYY (obrigatório)
- `assistidoEm` (string): Data no formato YYYY-MM-DD (obrigatório)
- `sinopse` (string): Descrição/resumo (obrigatório)

## 🎨 Funcionalidades Principais

✅ **Listar Séries** - Visualizar todas as séries cadastradas em cards responsivos  
✅ **Visualizar Detalhes** - Informações completas de cada série  
✅ **Cadastrar** - Formulário com validação para criar novas séries  
✅ **Editar** - Atualizar informações de série existente  
✅ **Deletar** - Remover série com confirmação  
✅ **Seletor de Datas** - Componentes MUI DatePicker para data de exibição  
✅ **Validação** - Todos os campos são validados antes do envio  
✅ **Persistência** - Dados salvos permanentemente no servidor  
✅ **Responsivo** - Interface adapta-se a diferentes tamanhos de tela  
✅ **Tema Dark** - Design escuro Netflix-inspired

## 🗂️ Estrutura do Projeto

```
fase2/
├── src/
│   ├── components/
│   │   ├── Loading/
│   │   │   └── Loading.jsx
│   │   ├── NavBar/
│   │   │   └── NavBar.jsx
│   │   ├── SerieForm/
│   │   │   └── SerieForm.jsx
│   │   └── SerieList/
│   │       └── SerieList.jsx
│   ├── pages/
│   │   ├── Home.jsx       (Página inicial)
│   │   ├── Sobre.jsx      (Informações do projeto)
│   │   ├── Cadastro.jsx   (Criar/editar série)
│   │   └── Lista.jsx      (Listar séries)
│   ├── services/
│   │   └── api.js         (Serviço HTTP com axios)
│   ├── main.jsx
│   └── serieJournal-api/  (Backend Express)
│       ├── app.js
│       ├── bin/
│       │   └── www
│       ├── routes/
│       │   ├── index.js
│       │   └── series.js
│       ├── data/
│       │   └── series.json (Banco de dados)
│       ├── public/
│       ├── views/
│       └── package.json
├── App.jsx                (Componente raiz)
├── App.css
├── index.html
├── db.json                (Para fallback)
├── package.json           (Dependências frontend)
├── vite.config.js
├── README.md
└── main.jsx
```

## 📝 Scripts Disponíveis

### Frontend
```bash
npm run dev       # Inicia servidor de desenvolvimento (Vite)
npm run build     # Constrói versão otimizada para produção
npm run preview   # Visualiza build de produção localmente
```

### Backend
```bash
cd src/serieJournal-api
npm start         # Inicia servidor com auto-reload (nodemon)
```

## 🔄 Fluxo de Uso da Aplicação

1. **Home** (`/`) - Página inicial com boas-vindas
2. **Sobre** (`/sobre`) - Informações técnicas e endpoints da API
3. **Cadastro** (`/cadastro`) - Criar nova série via formulário
4. **Lista** (`/lista`) - Visualizar todas as séries com opções editar/deletar
5. **Editar** (`/cadastro/:id`) - Atualizar série existente

## 🔧 Configuração da API

### Mudando a porta da API

Edite `src/serieJournal-api/bin/www`:
```javascript
var port = normalizePort(process.env.PORT || '5000');
```

### Mudando a porta do Frontend

Edite `vite.config.js`:
```javascript
server: {
  port: 5174
}
```

## 🐛 Troubleshooting

### Porta já está em uso

**Erro**: `EADDRINUSE: address already in use :::5000`

**Solução - Windows PowerShell**:
```powershell
# Para porta 5000 (API)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Para porta 5174 (Frontend)
netstat -ano | findstr :5174
taskkill /PID <PID> /F
```

### API respondendo com erro CORS

Verifique se o middleware CORS está configurado em `src/serieJournal-api/app.js`:
```javascript
app.use(cors());
```

### Dados não são salvos

Verifique se o arquivo `src/serieJournal-api/data/series.json` existe e tem permissões de escrita.

## 📚 Componentes Principais

### App.jsx
- Configuração de rotas com React Router
- Tema Material-UI customizado (cores Netflix)
- Layout com NavBar

### SerieForm.jsx
- Formulário de cadastro/edição de séries
- Validação de campos obrigatórios
- Seletor de data com MUI DatePicker

### SerieList.jsx
- Componente de grade responsiva
- Cards com informações de série
- Botões editar e deletar

### api.js
- Camada de serviço com Axios
- Métodos: getSeries, getSerie, createSerie, updateSerie, deleteSerie
- Fallback para localStorage se API cair

## 🎓 Aprendizados

Este projeto demonstra:
- Arquitetura cliente-servidor real
- Integração React com API REST
- Gerenciamento de estado com hooks (useState, useEffect)
- Componentes Material-UI
- Roteamento com React Router
- Validação de formulários
- Requisições HTTP com axios
- CORS e segurança web
- Persistência de dados no servidor

## 👨‍💼 Autor

Desenvolvido por **Everson Oliveira da Silva** para a disciplina Desenvolvimento de Sistemas Frontend - PUCRS

## 📄 Licença

Projeto educacional para fins de aprendizado.

---

**Última atualização:** Abril de 2026  
**Status:** ✅ Completo e funcionando

Projeto Fase 2 da disciplina de Desenvolvimento de Sistemas FrontEnd (PUCRS)

Aplicação web completa para gerenciamento e catalogação de séries de TV com arquitetura cliente-servidor. Permite cadastrar, listar, editar e excluir séries com interface moderna inspirada na Netflix e persistência de dados em servidor Node.js/Express.

## 🎯 Visão Geral

- **Frontend**: Aplicação React moderna com Vite, Material-UI e React Router
- **Backend**: API REST com Express.js que persiste dados em arquivo JSON
- **Integração**: Comunicação via HTTP/axios com endpoints CRUD completos
- **Dados**: 10 séries de exemplo pré-carregadas (Breaking Bad, Stranger Things, etc.)

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca para construção de interfaces reativas
- **Vite** - Build tool moderno com hot reload instantâneo
- **Material-UI (MUI)** - Componentes React com design Material
- **React Router DOM v6** - Roteamento de cliente (SPA)
- **Axios** - Cliente HTTP para requisições à API
- **Day.js** - Manipulação e formatação de datas
- **Emotion** - Solução CSS-in-JS para estilos

### Backend  
- **Node.js** - Runtime JavaScript para servidor
- **Express** - Framework web minimalista para APIs REST
- **CORS** - Middleware para requisições cross-origin
- **Nodemon** - Auto-restart automático durante desenvolvimento
- **File System (fs)** - Persistência de dados em JSON

## 📋 Pré-requisitos

- Node.js 16+ (com npm)
- Windows, macOS ou Linux
- Portas 5000 (API) e 5174 (Frontend) disponíveis

## ⚙️ Instalação

### 1. Clone e navegue até o projeto

```bash
cd "Caminho\Para\Desenvolvimentos de Sistemas FrontEnd\fase2"
```

### 2. Instale dependências do Frontend

```bash
npm install
```

### 3. Instale dependências da API

```bash
cd src/serieJournal-api
npm install
cd ../..
```

## 🚀 Executando a Aplicação

A aplicação requer dois servidores rodando em paralelo:

### Terminal 1: Iniciar API Backend (porta 5000)

```bash
cd src/serieJournal-api
npm start
```

Saída esperada:
```
[nodemon] watching path(s): *.*
[nodemon] starting `node ./bin/www`
```

### Terminal 2: Iniciar Frontend (porta 5174)

```bash
npm run dev
```

Saída esperada:
```
VITE v4.5.14 ready in 699 ms
➜ Local: http://localhost:5174/
```

### 3. Acessar a Aplicação

Abra seu navegador e acesse: **http://localhost:5174**

## 📡 Arquitetura e Endpoints da API

### Fluxo de Dados

```
Navegador
   ↓ (React + Axios)
Frontend http://localhost:5174
   ↓ (HTTP requests)
Backend http://localhost:5000
   ↓ (fs.readFile/writeFile)
data/series.json
```

### Endpoints Disponíveis

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| **GET** | `/series` | Lista todas as séries |
| **GET** | `/series/:id` | Retorna série específica por ID |
| **POST** | `/series` | Cria nova série |
| **PUT** | `/series` | Atualiza série existente |
| **DELETE** | `/series/:id` | Remove série por ID |

### Exemplos de Requisição

**Listar todas as séries:**
```bash
curl http://localhost:5000/series
```

**Pegar série por ID:**
```bash
curl http://localhost:5000/series/1
```

**Criar nova série:**
```bash
curl -X POST http://localhost:5000/series \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Breaking Bad",
    "categoria": "Drama",
    "autor": "Vince Gilligan",
    "temporadas": 5,
    "lancamento": "2008",
    "assistidoEm": "2023-03-10",
    "sinopse": "Professor de química vira fabricante de metanfetamina"
  }'
```

---

## ⚠️ IMPORTANTE: Alterações Realizadas na API (series.js)

> **ATENÇÃO PROFESSOR:** A seguir encontra-se um sumário das correções e adaptações feitas no arquivo `src/serieJournal-api/routes/series.js` para garantir o funcionamento completo do CRUD.

### 🔧 Alteração Principal: Endpoint PUT

**Problema Identificado:**
- O endpoint original era `router.put("/", ...)` (sem ID na rota)
- O frontend envia requisições para `PUT /series/:id`
- Isso causava falha na atualização de séries

**Solução Implementada:**
```javascript
// ANTES (Incorreto):
router.put("/", (req, res) => {
  const updatedSerie = req.body; // ID vinha no corpo
  // Lógica de atualização...
});

// DEPOIS (Correto):
router.put("/:id", (req, res) => {
  const serieId = parseInt(req.params.id, 10); // ID vem na URL
  const updatedSerie = { ...req.body, id: serieId };
  // Lógica de atualização...
});
```

**Impacto:**
- ✅ Edição de séries agora funciona corretamente
- ✅ Compatível com o padrão RESTful (`PUT /series/:id`)
- ✅ Mantém a persistência em arquivo JSON

**Arquivo afetado:**
```
src/serieJournal-api/routes/series.js
```

---

## 📊 Modelo de Dados

Cada série armazenada no sistema contém:

```json
{
  "id": 1,
  "titulo": "Breaking Bad",
  "categoria": "Drama",
  "autor": "Vince Gilligan",
  "temporadas": 5,
  "lancamento": "2008",
  "assistidoEm": "2023-03-10",
  "sinopse": "Professor de química vira fabricante de metanfetamina para garantir o futuro de sua família."
}
```

**Tipos de Dados:**
- `id` (number): Identificador único, gerado automaticamente
- `titulo` (string): Nome da série (obrigatório)
- `categoria` (string): Gênero/tipo (obrigatório)
- `autor` (string): Criador/produtor (obrigatório)
- `temporadas` (number): Quantidade de temporadas (obrigatório)
- `lancamento` (string): Ano no formato YYYY (obrigatório)
- `assistidoEm` (string): Data no formato YYYY-MM-DD (obrigatório)
- `sinopse` (string): Descrição/resumo (obrigatório)

## 🎨 Funcionalidades Principais

✅ **Listar Séries** - Visualizar todas as séries cadastradas em cards responsivos  
✅ **Visualizar Detalhes** - Informações completas de cada série  
✅ **Cadastrar** - Formulário com validação para criar novas séries  
✅ **Editar** - Atualizar informações de série existente  
✅ **Deletar** - Remover série com confirmação  
✅ **Seletor de Datas** - Componentes MUI DatePicker para data de exibição  
✅ **Validação** - Todos os campos são validados antes do envio  
✅ **Persistência** - Dados salvos permanentemente no servidor  
✅ **Responsivo** - Interface adapta-se a diferentes tamanhos de tela  
✅ **Tema Dark** - Design escuro Netflix-inspired

## 🗂️ Estrutura do Projeto

```
fase2/
├── src/
│   ├── components/
│   │   ├── Loading/
│   │   │   └── Loading.jsx
│   │   ├── NavBar/
│   │   │   └── NavBar.jsx
│   │   ├── SerieForm/
│   │   │   └── SerieForm.jsx
│   │   └── SerieList/
│   │       └── SerieList.jsx
│   ├── pages/
│   │   ├── Home.jsx       (Página inicial)
│   │   ├── Sobre.jsx      (Informações do projeto)
│   │   ├── Cadastro.jsx   (Criar/editar série)
│   │   └── Lista.jsx      (Listar séries)
│   ├── services/
│   │   └── api.js         (Serviço HTTP com axios)
│   ├── main.jsx
│   └── serieJournal-api/  (Backend Express)
│       ├── app.js
│       ├── bin/
│       │   └── www
│       ├── routes/
│       │   ├── index.js
│       │   └── series.js
│       ├── data/
│       │   └── series.json (Banco de dados)
│       ├── public/
│       ├── views/
│       └── package.json
├── App.jsx                (Componente raiz)
├── App.css
├── index.html
├── db.json                (Para fallback)
├── package.json           (Dependências frontend)
├── vite.config.js
├── README.md
└── main.jsx
```

## 📝 Scripts Disponíveis

### Frontend
```bash
npm run dev       # Inicia servidor de desenvolvimento (Vite)
npm run build     # Constrói versão otimizada para produção
npm run preview   # Visualiza build de produção localmente
```

### Backend
```bash
cd src/serieJournal-api
npm start         # Inicia servidor com auto-reload (nodemon)
```

## 🔄 Fluxo de Uso da Aplicação

1. **Home** (`/`) - Página inicial com boas-vindas
2. **Sobre** (`/sobre`) - Informações técnicas e endpoints da API
3. **Cadastro** (`/cadastro`) - Criar nova série via formulário
4. **Lista** (`/lista`) - Visualizar todas as séries com opções editar/deletar
5. **Editar** (`/cadastro/:id`) - Atualizar série existente

## 🔧 Configuração da API

### Mudando a porta da API

Edite `src/serieJournal-api/bin/www`:
```javascript
var port = normalizePort(process.env.PORT || '5000');
```

### Mudando a porta do Frontend

Edite `vite.config.js`:
```javascript
server: {
  port: 5174
}
```

## 🐛 Troubleshooting

### Porta já está em uso

**Erro**: `EADDRINUSE: address already in use :::5000`

**Solução - Windows PowerShell**:
```powershell
# Para porta 5000 (API)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Para porta 5174 (Frontend)
netstat -ano | findstr :5174
taskkill /PID <PID> /F
```

### API respondendo com erro CORS

Verifique se o middleware CORS está configurado em `src/serieJournal-api/app.js`:
```javascript
app.use(cors());
```

### Dados não são salvos

Verifique se o arquivo `src/serieJournal-api/data/series.json` existe e tem permissões de escrita.

## 📚 Componentes Principais

### App.jsx
- Configuração de rotas com React Router
- Tema Material-UI customizado (cores Netflix)
- Layout com NavBar

### SerieForm.jsx
- Formulário de cadastro/edição de séries
- Validação de campos obrigatórios
- Seletor de data com MUI DatePicker

### SerieList.jsx
- Componente de grade responsiva
- Cards com informações de série
- Botões editar e deletar

### api.js
- Camada de serviço com Axios
- Métodos: getSeries, getSerie, createSerie, updateSerie, deleteSerie
- Fallback para localStorage se API cair

## 🎓 Aprendizados

Este projeto demonstra:
- Arquitetura cliente-servidor real
- Integração React com API REST
- Gerenciamento de estado com hooks (useState, useEffect)
- Componentes Material-UI
- Roteamento com React Router
- Validação de formulários
- Requisições HTTP com axios
- CORS e segurança web
- Persistência de dados no servidor

## 👨‍💼 Autor

Desenvolvido por **Everson Oliveira da Silva** para a disciplina Desenvolvimento de Sistemas Frontend - PUCRS

## 📄 Licença

Projeto educacional para fins de aprendizado.

---

**Última atualização:** Abril de 2026  
**Status:** ✅ Completo e funcionando
