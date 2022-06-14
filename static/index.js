import router from './components/router/router.js';
import routes from './routes.js';

window.addEventListener('DOMContentLoaded', () => {
    const application = window.document.querySelector('#Application');
    const routerPoint = application.querySelector('#Router');
    router.update(application, routerPoint, routes);
});
