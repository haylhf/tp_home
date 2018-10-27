import Home from '../components/home.vue'
import NotFound from '../components/404.vue'
export default
[
    {
        path: '/404',
        component: NotFound,
        name: '404',
        hidden: true
    },
	{
        path: '/home',
        component: Home,
        name: 'home',
        hidden: true
    },
    {
        path: '*',
        redirect: '/home',
        hidden: true,
    },
]
