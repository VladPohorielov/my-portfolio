// svgo.config.js — безпечна конфігурація для портфоліо-проєкту
// Принципи: не ламати viewBox, не видаляти accessibility-атрибути,
// не пошкоджувати масштабування SVG.

module.exports = {
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          // Ніколи не видаляти viewBox — це зламає масштабування
          removeViewBox: false,

          // Не зливати path агресивно — може змінити вигляд
          mergePaths: false,

          // Не чистити ID — можуть використовуватись як CSS-анкори або у <use>
          cleanupIds: false,

          // Залишати title та desc для accessibility
          removeTitle: false,
          removeDesc: false,
        },
      },
    },
  ],
};
