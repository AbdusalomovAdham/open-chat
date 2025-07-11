<template>
    <div class="files">
        <div class="files-main" v-for="(file, idx) in $props?.media?.files" :key="idx">
            <div class="file-type">
                <component :is="getFileIconComponent(file?.name)" />
            </div>
            <div class="file-content">
                <div class="file-info">
                    <span class="file-name">{{ file?.name }}</span>
                    <small class="file-size">{{ file?.size }}</small>
                </div>
                <div class="file-action">
                    <a :href="file?.url" download="">
                        <IconDownload class="file-download" />
                    </a>
                    <IconFilesThreeDots class="file-menu" @click="activeMenu(idx)" />
                    <FileActionMenu v-if="menuActive === idx" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref, onMounted, onUnmounted } from 'vue'
import IconFilesThreeDots from '@/components/icon/FilesThreeDots.vue'
import IconPdf from '@/components/icon/Pdf.vue'
import IconZip from '@/components/icon/Zip.vue'
import IconJpg from '@/components/icon/Jpg.vue'
import IconVideoFile from '@/components/icon/VideoFile.vue'
import IconDownload from '@/components/icon/Download.vue'
import FileActionMenu from '@/components/g/FileActionMenu.vue'
import Links from '@/components/g/Links'
const $props = defineProps({
    media: {
        type: Object,
        default: () => ({ images: [], videos: [], files: [] })
    }
});

const menuActive = ref(null)

const activeMenu = (idx) => {
    if (menuActive.value === null) menuActive.value = idx
    else if (menuActive.value !== idx) menuActive.value = idx
    else menuActive.value = null
}

const onEscPress = (e) => {
    if (e.key === 'Escape') {
        menuActive.value = null
    }
}

onMounted(() => {
    window.addEventListener('keydown', onEscPress)
})

onUnmounted(() => {
    window.removeEventListener('keydown', onEscPress)
})

function getFileExtension(filename) {
    const parts = filename.split('.');
    return parts[parts.length - 1].toLowerCase();
}


const getFileIconComponent = (filename) => {
    const ext = ref(getFileExtension(filename))

    switch (ext.value) {
        case 'pdf': return IconPdf;
        case 'zip':
        case 'rar': return IconZip;
        case 'jpg':
        case 'jpeg':
        case 'png': return IconJpg;
        case 'mp4':
        case 'avi': return IconVideoFile;
        default: return IconPdf;
    }
}
</script>