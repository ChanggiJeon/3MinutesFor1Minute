# as -> dockerfile이 멀티일 때
FROM node:16-alpine3.11 as build-stage
# 폴더 생성
RUN mkdir /app
# 기본 경로 설정
WORKDIR /app
COPY ./ ./
RUN npm install
RUN npm run build

FROM nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]