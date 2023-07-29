#!/bin/sh

# Navega para o diretório /backend e constrói a imagem Docker para o servidor Node.js
cd backend/
docker buildx build -t rafaelpdemelo/node-app:latest -f node.Dockerfile .

# Navega para o diretório /frontend e constrói a imagem Docker para o aplicativo React
cd ../frontend/
docker buildx build -t rafaelpdemelo/react-app:latest -f react.Dockerfile .

# Para todos os contêineres Docker em execução
docker stop $(docker ps -aq)

# Remove todos os contêineres Docker
docker rm $(docker ps -aq)

# Inicia um contêiner Docker para o aplicativo React na porta 80
docker run -p 80:80 -d rafaelpdemelo/react-app:latest

# Inicia um contêiner Docker para o servidor Node.js na porta 3001
docker run -p 3001:3001 -d rafaelpdemelo/node-app:latest
