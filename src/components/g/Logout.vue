<template>
    <div class="logout">
        <div class="logout-main pa-24 ma-8">
            <img src="@/assets/images/logout.png" alt="">
            <h1>Oh No! You're leaving...
                <br>
                Are You Sure?
            </h1>
            <div class="logout-btns">
                <router-link to="/user/chats" class="back-btn">Back</router-link>
                <router-link to="/auth/sign-in" class="logout-btn">Yes, Log Out</router-link>
            </div>
        </div>
    </div>
</template>