FROM node:20-alpine

WORKDIR /usr/src/app

# Instalar dependencias de desarrollo necesarias
RUN apk add --no-cache python3 make g++

# Copiar archivos de dependencias
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Instalar pnpm y dependencias
RUN npm install -g pnpm
RUN pnpm install

# Copiar el resto del código
COPY . .

# Construir la aplicación
RUN pnpm run build

# Exponer el puerto
EXPOSE 3000

# Comando para desarrollo
CMD ["pnpm", "run", "start:dev"] 