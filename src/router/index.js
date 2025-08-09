import { createWebHashHistory, createRouter, createWebHistory } from "vue-router";
import routes from "@/router/routes"

const router = createRouter({
    history: createWebHistory(),
    routes,
})


router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");

    if (!token && to.path !== "/auth/sign-in" && to.path !== "/auth/sign-up") {
        return next("/auth/sign-in");
    }

    if (to.path === "/") {
        return token ? next("/user/chats") : next("/auth/sign-in");
    }

    next();
});


export default router


