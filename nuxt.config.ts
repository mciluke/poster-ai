// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/node_modules/bootstrap/dist/css/bootstrap.min.css', '~/node_modules/bootstrap-icons/font/bootstrap-icons.css'],
  plugins: [
    {
      src: '~/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
      mode: 'client',
    },
  ],
});
