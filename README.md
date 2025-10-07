# Awesome Works API

API backend para gestão de departamentos, colaboradores, dispositivos e chamados técnicos.

## Tecnologias

- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Swagger](https://swagger.io/) para documentação

## Instalação

```bash
git clone https://github.com/seu-usuario/awesome-works.git
cd awesome-works
npm install
```

## Configuração

1. Crie um arquivo `.env` com sua conexão PostgreSQL:
   ```
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/awesomeworks"
   ```

2. Gere o Prisma Client:
   ```
   npx prisma generate
   ```

3. Execute as migrations (se necessário):
   ```
   npx prisma migrate dev
   ```

## Executando

```bash
npm start
```

Acesse a documentação Swagger em:  
[http://localhost:3000/api](http://localhost:3000/api)

## Endpoints principais

- **Department:** CRUD de departamentos
- **Employee:** CRUD de colaboradores
- **Device:** CRUD de dispositivos
- **Ticket:** CRUD de chamados técnicos

## Exemplos de uso

### Criar um departamento

```json
POST /department
{
  "name": "IT Department",
  "description": "Handles internal technical support"
}
```

### Criar um chamado

```json
POST /ticket
{
  "issueDescription": "Monitor not working",
  "status": "open",
  "technician": "João Rodrigues",
  "employeeId": 1,
  "deviceId": 5
}
```

## Testes

Utilize o Swagger para testar todos os endpoints de forma interativa.

---

**Desenvolvido por [Victor Erick]**