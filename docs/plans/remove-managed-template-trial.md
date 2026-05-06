# Удалить trial-механизм Open Agents

## Цель

Полностью убрать «hosted demo trial» из форка. Сейчас он триггерит:

- 5-message limit в чате
- 1 trial session limit
- Запрет удаления сообщений
- Запрет code editor
- Запрет GitHub-backed сессий
- Фильтрацию Claude Opus моделей

Локально срабатывает потому что: `NODE_ENV=development` + `localhost` + Vercel-логин (см. `apps/web/lib/managed-template-trial.ts:43-63`).

В проде (на не-`open-agents.dev` домене) всё равно срабатывало бы локально и могло сработать в проде если случайно поставить `VERCEL_PROJECT_PRODUCTION_URL=open-agents.dev`. Лучше выпилить совсем.

## Что нужно сделать

### Подход

Самый чистый: удалить файл `apps/web/lib/managed-template-trial.ts` и все его импорты, вместе с условными ветками `if (isManagedTemplateTrialUser(...)) { ... }` в коде.

Минимально-инвазивная альтернатива (если торопимся): сделать `isManagedTemplateDeployment` и `isManagedTemplateTrialUser` всегда возвращать `false` — все ветки превратятся в мёртвый код, поведение исчезнет, но импорты и константы останутся. Это safe но грязно.

Рекомендую полное удаление.

### Файлы для правки (21 шт.)

**Источник (удалить):**

- `apps/web/lib/managed-template-trial.ts` — удалить файл

**Production-код (удалить импорты + условные ветки):**

- `apps/web/app/[username]/[repo]/page.tsx`
- `apps/web/app/api/auth/info/route.ts`
- `apps/web/app/api/chat/route.ts` — главный лимитер 5 сообщений (строки 91–108)
- `apps/web/app/api/github/app/callback/route.ts`
- `apps/web/app/api/github/app/install/route.ts`
- `apps/web/app/api/github/post-link/route.ts`
- `apps/web/app/api/sessions/[sessionId]/chats/[chatId]/messages/[messageId]/route.ts` — запрет удаления
- `apps/web/app/api/sessions/[sessionId]/code-editor/route.ts` — запрет code editor
- `apps/web/app/api/sessions/route.ts` — 1-session limit
- `apps/web/app/api/settings/model-variants/route.ts`
- `apps/web/app/codespace/[sessionId]/layout.tsx`
- `apps/web/app/get-started/get-started-flow.tsx` — текст «In the hosted demo…»
- `apps/web/app/get-started/page.tsx`
- `apps/web/app/platform/[sessionId]/chats/[chatId]/page.tsx` — наш роут
- `apps/web/app/sessions/[sessionId]/chats/[chatId]/page.tsx`
- `apps/web/app/settings/accounts-section.tsx` — текст «GitHub connections are disabled…»
- `apps/web/components/session-starter.tsx`
- `apps/web/lib/model-access.ts` — фильтрация Claude Opus (упростить: возвращать инпут как есть)
- `apps/web/lib/session/types.ts` — если есть trial-related поля, проверить

**Тесты (удалить trial-кейсы или весь тест если он только про trial):**

- `apps/web/app/api/auth/info/route.test.ts`
- `apps/web/app/api/chat/route.test.ts` — тесты «blocks a sixth message», «does not let trial users replay…» (строки ~353–421)
- `apps/web/app/api/github/app/install/route.test.ts`
- `apps/web/app/api/models/route.test.ts`
- `apps/web/app/api/sessions/[sessionId]/chats/[chatId]/messages/[messageId]/route.test.ts`
- `apps/web/app/api/sessions/[sessionId]/code-editor/route.test.ts`
- `apps/web/app/api/sessions/route.test.ts` — тест «hosted demo includes 1 trial session»
- `apps/web/app/api/settings/model-variants/route.test.ts`
- `apps/web/app/api/settings/preferences/route.test.ts`

## Шаги по порядку

1. Грепнуть `MANAGED_TEMPLATE_TRIAL\|isManagedTemplateTrialUser\|isManagedTemplateDeployment\|hasAllowedManagedTemplateEmail` по всему apps/web/, кроме `.next/` и `node_modules` — собрать карту использований (74 hits в 21 файле сейчас).
2. По каждому production-файлу: убрать импорт, удалить if-ветку с trial-проверкой и весь её body (он всегда возвращает ошибку или модифицирует данные ограничивающим образом). Где было `if (trial) { return error } else { proceed }` — оставить только `proceed`. Где было `const x = trial ? restrictedX : x` — оставить `const x = x`.
3. В `lib/model-access.ts` упростить: `filterModelsForSession`, `filterModelVariantsForSession`, `sanitizeSelectedModelIdForSession`, `sanitizeUserPreferencesForSession` — все эти функции просто возвращают входной аргумент (либо удалить и заменить вызовы сырыми значениями).
4. Удалить `apps/web/lib/managed-template-trial.ts`.
5. По тестам: удалить trial-specific тест-кейсы. Если файл целиком про trial — удалить файл.
6. Прогнать `bun run ci` — должны пройти все проверки.

## Что должно работать после

- На localhost с Vercel-логином можно отправить ≥6 сообщений, сессий больше 1, удалить сообщение, открыть code editor, выбрать любую Claude Opus модель.
- Все остальные тесты остались зелёные.
- В чате/сессиях/настройках не появляется текст «hosted demo» / «trial».

## Связанные UI-тексты вне trial-проверок

- `apps/web/app/deploy-your-own/page.tsx:73` — «This hosted demo has limited functionality. Deploy your own copy to…» — это статичный текст на странице `/deploy-your-own`, удалять или нет — на усмотрение. Эта страница вообще, возможно, не нужна для нашего форка ИИ-ХАБ. Можно удалить весь роут `/deploy-your-own`.

## Время

Прикинуть час-полтора с тестами. Делается монотонно, риска мало (компилятор сразу укажет на сломанные импорты).
