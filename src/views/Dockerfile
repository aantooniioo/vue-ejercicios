# Usamos Node
FROM node:18

# Carpeta de trabajo
WORKDIR /app

# Copiamos archivos
COPY . .

# Instalamos dependencias
RUN npm install

# Exponemos puerto de Vite
EXPOSE 5173

# Ejecutamos la app
CMD ["npm", "run", "dev"]