
<div align="center">
  <h1>🚗 DriversFriend API</h1>
  <p>API para gerenciamento de veículos, abastecimentos e consumo médio, desenvolvida com <b>Node.js</b>, <b>Express</b> e <b>Prisma ORM</b>.</p>
  <img src="src/images/logo.png" width="200" alt="Calculator"/>
</div>

---

## ✨ Funcionalidades

- 👤 Cadastro e autenticação de usuários
- 🚙 Gerenciamento de veículos (CRUD)
- ⛽ Registro de abastecimentos
- 📊 Cálculo de consumo médio

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** + **Express**
- **TypeScript**
- **Prisma ORM** (MySQL)
- **JWT** para autenticação
- **Zod** para validação

---

## ⚡ Instalação

1. **Clone o repositório:**
    ```bash
    git clone https://github.com/MylenaOliveiras/driversfriend-api.git
    cd driversfriend-api
    ```
2. **Instale as dependências:**
    ```bash
    pnpm install
    ```
3. **Configure o banco de dados:**
    - Crie um arquivo `.env` com a variável `DATABASE_URL` apontando para seu banco MySQL.
4. **Gere o client Prisma:**
    ```bash
    pnpm prisma generate
    ```
5. **Inicie o servidor em modo desenvolvimento:**
    ```bash
    pnpm dev
    ```

---

## 🚦 Rotas Principais

### 🔐 Autenticação

| Método | Rota                | Descrição               |
|--------|---------------------|-------------------------|
| POST   | `/auth/register`    | Cadastro de usuário     |
| POST   | `/auth/login`       | Login do usuário        |

### 🚗 Veículos

| Método | Rota                        | Descrição                |
|--------|-----------------------------|--------------------------|
| GET    | `/vehicles`                 | Lista veículos do usuário|
| POST   | `/vehicles`                 | Cadastra novo veículo    |
| PUT    | `/vehicles/:vehicleId`      | Atualiza veículo         |
| DELETE | `/vehicles/:vehicleId`      | Remove veículo           |

### ⛽ Abastecimentos

| Método | Rota                                   | Descrição                   |
|--------|----------------------------------------|-----------------------------|
| POST   | `/fueling/:vehicleId`                  | Registra abastecimento      |
| GET    | `/fueling/:vehicleId`                  | Lista abastecimentos        |
| DELETE | `/fueling/:vehicleId/:fuelingId`       | Remove abastecimento        |

### 📊 Consumo Médio

| Método | Rota                        | Descrição                       |
|--------|-----------------------------|---------------------------------|
| GET    | `/consumption/:vehicleId`   | Calcula consumo médio do veículo|

---

## 📜 Scripts úteis

- `pnpm dev` — Inicia o servidor em modo desenvolvimento
- `pnpm build` — Compila o projeto
- `pnpm lint` — Lint nos arquivos

---

<div align="center">
  <b>Feito por Mylena Oliveira</b>
</div>


