# 第一阶段
FROM node:19-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
ARG REACT_APP_REQUEST_DOMAIN
ENV REACT_APP_REQUEST_DOMAIN $REACT_APP_REQUEST_DOMAIN
# 第二阶段
FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]