<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

let user = JSON.parse(localStorage.getItem('user'))
</script>

<template>
    <div class="p-4 bg-zinc-800">
        <div class="flex justify-between items-center">
            <div class="text-lg">
            </div>
            <div class="relative group">
                <button class="text-white">{{ user.first_name }} {{ user.last_name }}</button>
                <div class="absolute right-0 mt-2 w-40 text-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-700">
                    <button @click="router.push('/logout')" class="block w-full text-left px-4 py-2 text-sm hover:bg-zinc-600">Logout</button>
                </div>
            </div>
        </div>
    </div>
</template>
