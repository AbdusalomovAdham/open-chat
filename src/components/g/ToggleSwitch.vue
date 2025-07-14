<template>
    <label class="switch">
        <input type="checkbox">
        <span class="slider round"></span>
    </label>
</template>

<style scoped>
.switch {
    position: relative;
    display: inline-block;
    width: 28px;
    height: 14px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    -webkit-transition: .4s;
    transition: .4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 10px;
    width: 10px;
    left: 1px;
    bottom: 1px;
    background: #e8e8e8;
    -webkit-transition: .2s;
    transition: .2s;
}

input:checked+.slider {
    background: #4fc9c9;
    border: 1px solid #4fc9c9;
}

input:checked+.slider:before {
    -webkit-transform: translateX(13px);
    -ms-transform: translateX(13px);
    transform: translateX(13px);
}

.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}
</style>

<style>
:root {
    --color-bg: #fff;
    --color-border: #ccc;
}

.dark {
    --color-bg: #2a2f52;
    --color-border: rgb(63, 68, 99);
}
</style>