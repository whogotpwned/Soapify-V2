import {createRouter, createWebHistory} from '@ionic/vue-router';
import {RouteRecordRaw} from 'vue-router';
import TabsPage from '@/views/TabsPage.vue'
import LoginPage from "@/views/login/LoginPage.vue";
import {userSessionStore} from "@/lib/store/userSession";
import RegisterPage from "@/views/register/RegisterPage.vue";
import {supabase} from "@/lib/supabase/supabaseClient";
import {nhost} from "@/lib/nhostSrc/client/nhostClient";

const routes: Array<RouteRecordRaw> = [{
    path: '/', redirect: '/tabs/chats',
}, {
    path: '/login', component: LoginPage
}, {
    path: '/register', component: RegisterPage
}, {
    path: '/tabs/', component: TabsPage, meta: {
        requiresAuth: true
    }, children: [{
        path: '', redirect: '/tabs/chats',
    }, {
        path: 'chats', component: () => import('@/views/chats/ChatsPage.vue'),
    }, {
        path: 'dialogue', component: () => import('@/views/dialogue/DialoguePage.vue'),
    }, {
        path: 'contacts', component: () => import('@/views/contacts/ContactsPage.vue'),
    }, {
        path: 'profile', component: () => import('@/views/profile/ProfilePage.vue'),
    }]
}]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), routes
})


router.beforeEach(async (to, from, next) => {
    const userSession = userSessionStore()

    if (to.meta.requiresAuth) {

        // TODO: Clear this and make it ti userSession
        // UserSession is deleted after refresh but on the other hand data.session has no working timeout ...
        // For development purposes using data.session is fine ...
        if (userSession.getSessionID) {
            return next()
        } else {
            return next('/login')
        }
    }

    return next()
})
export default router
