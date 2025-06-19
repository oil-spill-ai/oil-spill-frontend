# Oil Spill AI Frontend

Веб-интерфейс для системы автоматического обнаружения разливов нефти. Реализован на Next.js с поддержкой мультиязычности, загрузки архивов, интеграции с backend и современной стилизацией.

---

## Стек технологий

- **Next.js** (App Router, SSR/SSG, TypeScript)
- **React** (функциональные компоненты, хуки)
- **next-intl** — мультиязычность (i18n)
- **Tailwind CSS** — стилизация и адаптивность
- **Framer Motion** — анимации
- **Three.js** — 3D-визуализация (Planet)
- **React Icons** — иконки

---

## Структура проекта

```
frontend/
├── src/
│   ├── app/                # Страницы и layout (Next.js App Router)
│   │   ├── [locale]/       # Локализованные страницы (about, team, privacy, terms и др.)
│   │   ├── api/            # Клиентские сервисы для API (uploadService.ts)
│   │   ├── globe-context.tsx # Контекст для 3D-глобуса
│   │   └── globals.css     # Глобальные стили (Tailwind + кастомные шрифты)
│   ├── components/         # UI-компоненты (Navbar, Footer, UploadModal, Planet и др.)
│   ├── geo-files/          # Геоданные для визуализации
│   ├── i18n/               # Локализация (routing.ts, request.ts)
│   └── middleware.ts       # Middleware для мультиязычности
├── messages/               # JSON-файлы переводов (en.json, ru.json)
├── public/                 # Статические файлы (шрифты, фото, видео)
├── @types/                 # Типы для внешних библиотек (three.js)
├── tailwind.config.js      # Tailwind CSS конфиг
├── next.config.ts          # Next.js конфиг с next-intl
├── package.json            # Зависимости и скрипты
└── README.md               # Документация (этот файл)
```

---

## Основные возможности

- **Мультиязычность:** поддержка английского и русского языков (next-intl, messages/en.json, messages/ru.json)
- **Загрузка архивов:** drag&drop и прогресс-бар, интеграция с backend (UploadModal, uploadService.ts)
- **3D-визуализация:** интерактивная модель планеты (Planet.tsx, Three.js)
- **Современный UI:** адаптивная верстка, анимации, кастомные шрифты (Exo 2)
- **Навигация:** App Router, локализованные маршруты, middleware для выбора языка
- **Документация, команда, политика, условия:** отдельные страницы с переводами

---

## Быстрый старт

1. Установите зависимости:
   ```bash
   npm install
   # или
   yarn install
   # или
   bun install
   ```

2. Запустите dev-сервер:
   ```bash
   npm run dev
   # или yarn dev, bun dev, pnpm dev
   ```

3. Откройте [http://localhost:3000](http://localhost:3000) в браузере.

---

## Сборка и деплой

- Для production-сборки:
  ```bash
  npm run build
  npm start
  ```
- Для деплоя на Vercel — поддерживается из коробки.

---

## Локализация (i18n)

- Используется [next-intl](https://next-intl-docs.vercel.app/).
- Локализованные маршруты: `/en/about`, `/ru/about` и т.д.
- Переводы хранятся в `messages/en.json`, `messages/ru.json`.
- Middleware и конфиг уже настроены для автоматического выбора языка.
- Для добавления нового языка:
  1. Добавьте новый JSON-файл в `messages/` (например, `fr.json`).
  2. Зарегистрируйте язык в `src/i18n/routing.ts`.

---

## Взаимодействие с backend

- Загрузка архива: POST `/api/upload` (см. `src/app/api/uploadService.ts`)
- Проверка статуса, скачивание результатов — через backend API
- Все запросы идут на backend, адрес которого можно вынести в переменную окружения

---

## Переменные окружения

- Для большинства случаев не требуется, но если API backend размещён не на localhost, настройте переменную окружения (например, `NEXT_PUBLIC_API_URL`) и используйте её в `uploadService.ts`.
- Для добавления переменных создайте файл `.env.local` в корне проекта:
  ```env
  NEXT_PUBLIC_API_URL=https://your-backend-url
  ```

---

## Расширение проекта

- **Добавить язык:**
  - Создайте новый файл перевода в `messages/` (например, `fr.json`).
  - Добавьте язык в массив `locales` в `src/i18n/routing.ts`.
- **Добавить страницу:**
  - Создайте новый файл в `src/app/[locale]/` (например, `newpage/page.tsx`).
  - Добавьте переводы для новой страницы в JSON-файлы.
- **Добавить компонент:**
  - Создайте компонент в `src/components/` и используйте его в нужной странице.

---

## Полезные ссылки

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [next-intl Docs](https://next-intl-docs.vercel.app/)
- [Three.js Docs](https://threejs.org/docs/)
