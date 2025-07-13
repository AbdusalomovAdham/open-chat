<template>
    <div class="privacy-card-wrapper mx-24 mt-24 pa-24 radius-8">
        <div class="card-wrapper-title mb-24">
            <h4>Privacy</h4>
        </div>

        <div class="privacy-settings">
            <div class="setting-row" v-for="(setting, idx) in settings" :key="idx">
                <label>{{ setting.label }} :</label>
                <select v-if="setting.type === 'select'">
                    <option v-for="option in setting.options" :key="option" :value="option" class="option">
                        {{ option }}
                    </option>
                </select>
                <ToggleTwichVue v-else/>
            </div>
        </div>
    </div>
</template>

<script setup>
import ToggleTwichVue from "@/components/g/ToggleSwitch.vue";

const settings = [
    {
        label: "Profile",
        type: "select",
        options: ["Everyone", "Selected", "Nobody"],
    },
    {
        label: "Last seen",
        type: "toggle",
    },
    {
        label: "Status",
        type: "select",
        options: ["Everyone", "Selected", "Nobody"],
    },
    {
        label: "Groups",
        type: "toggle",
    },
];
</script>