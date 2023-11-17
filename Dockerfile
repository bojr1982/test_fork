#stage 1
#FROM node:18.10.0 as node

#RUN npm install 
#RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY dist/app /usr/share/nginx/html/app-mims
