## Next-Nest-Pgsql

```
docker run --name mypg \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=yourpass \
  -e POSTGRES_DB=testdb \
  -p 5432:5432 \
  -d postgres:15

---
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=yourpass
DB_NAME=testdb
PORT=3001
---
- npm install dotenv
---
>> src/main.ts
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 3001);
}
bootstrap();

---
From Backend

- curl http://localhost:3001/users

- curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Soe"}'

- curl http://localhost:3001/users

- PGPASSWORD=yourpass psql -h localhost -U postgres -d testdb -c "select * from \"user\";"
---
# open psql shell inside container
docker exec -it mypg psql -U postgres -d testdb

# then at psql prompt:
\dt
select * from "user";
\q
---
Fronted

.env.local

NEXT_PUBLIC_API_URL=http://localhost:3001

---
cd backend
npm run start:dev

cd frontend
npm install   # if not already done
npm run dev

---

If use aws rds

version: "3.8"

services:
  backend:
    build:
      context: ./backend
    environment:
      DB_HOST: mydb.cluster-xxxx.us-east-1.rds.amazonaws.com
      DB_PORT: 5432
      DB_USER: postgres
      DB_PASS: yourpass
      DB_NAME: testdb
      PORT: 3001
    ports:
      - "3001:3001"

  frontend:
    build:
      context: ./frontend
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:3001
    ports:
      - "3000:3000"
    depends_on:
      - backend


```