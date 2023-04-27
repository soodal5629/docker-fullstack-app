# nginx가 제공해줄 빌드 파일들을 생성하는 단계
FROM node:alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

# nginx 가동하고 윗 단계에서 생성된 빌드 파일들을 제공
# defult.conf 에서 해준 설정을 nginx 컨테이너 안에 있는 설정이 되도록 복사
FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html