<template>
    <div class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<style scoped>
.typing-indicator {
    display: flex;
    align-items: center;
    gap: 3px;
    height: 15px;
}

.typing-indicator span {
    width: 5px;
    height: 5px;
    background-color: var(--doto-bg);
    border-radius: 50%;
    animation: bounce 1.3s infinite ease-in-out;
}

.typing-indicator span:nth-child(2) {
    animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes bounce {

    0%,
    80%,
    100% {
        transform: scale(0.7);
        opacity: 0.3;
    }

    40% {
        transform: scale(1);
        opacity: 1;
    }
}
</style>

<style>
:root {
    --doto-bg: #617fab;
}

.dark {
    --doto-bg: #959ccb;
}
</style>