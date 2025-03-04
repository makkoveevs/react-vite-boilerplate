# Template для фронтенд проекта

0. Окружение

Используется:

- react
- typescript
- vite
- antd
- styled components

Для работы необходимы:

- NodeJS версии 20.17+
- npm версии 10.8+

Для запуска локально:

- git pull
- npm ci
- npm run start

В случае успеха, проект будет доступен на http://localhost:8088

1. Билд

- npm run build

2. Контейнеризация

Для развертывания на сервере проект собирается в контейнер. Основой служит docker образ nginx. Внутрь контекйнера включается статика - результат команды npm run build.

- docker build -t front .
- docker save --output ./front.tar front

3. Развертывание на сервере

- docker load -i путь\до\front.tar

4. При развёртывании на сервер положить .env с переменными
   API=http://localhost:8081

API - урл, где развернут бэк

5. запуск контейнера (указана локальная строка запуска с хардкодом переменных)

- docker run -e API=http://localhost:8081 -p 80:80 front
