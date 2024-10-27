module.exports = {
  extends: [
    'next', // Стандартная конфигурация Next.js
    'next/core-web-vitals', // Проверка оптимизации для Core Web Vitals
    'prettier', // Использование конфигурации prettier для ESLint
  ],
  rules: {
    // Здесь можно указать дополнительные правила или переопределить существующие
    // Например:
    // "react/react-in-jsx-scope": "off", // Отключить правило для React в JSX (в Next.js это не нужно)
  },
};
