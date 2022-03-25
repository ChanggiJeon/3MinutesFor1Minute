FROM node:lts-alpine as build-stage
WORKDIR /app
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL $REACT_APP_API_URL
COPY . .
RUN npm install
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]