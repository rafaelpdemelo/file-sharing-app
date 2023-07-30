#!/bin/sh

# Navega para o diretório /backend e constrói a imagem Docker para o servidor Node.js
cd backend/
docker build -t [username]/node-app:latest -f node.Dockerfile .

# Navega para o diretório /frontend e constrói a imagem Docker para o aplicativo React
cd ../frontend/
docker build -t [username]/react-app:latest -f react.Dockerfile .

# Para todos os contêineres Docker em execução
docker stop $(docker ps -a | grep '[username]/node-app:latest' | awk '{print $1}') && docker stop $(docker ps -a | grep '[username]/react-app:latest' | awk '{print $1}')

sleep 1

# Remove todos os contêineres Docker
docker rm $(docker ps -a | grep '[username]/node-app:latest' | awk '{print $1}') && docker rm $(docker ps -a | grep '[username]/react-app:latest' | awk '{print $1}')

# Inicia um contêiner Docker para o aplicativo React na porta 80
docker run -p 80:80 -d [username]/react-app:latest

# Inicia um contêiner Docker para o servidor Node.js na porta 3001
docker run -p 3001:3001 -d [username]/node-app:latest
