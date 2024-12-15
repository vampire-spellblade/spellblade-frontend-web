<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const router = useRouter()

const login = async () => {
    errorMessage.value = ''

    const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value,
        }),
    })

    const data = await response.json()

    if (response.ok) {
        localStorage.setItem('token', data.user.token)
        localStorage.setItem('user', JSON.stringify({
            email: data.user.email,
            first_name: data.user.first_name,
            last_name: data.user.last_name,
        }))
        router.push('/dashboard')
    } else {
        errorMessage.value = data.error
    }
}
</script>

<template>
    <div class="flex items-center justify-center min-h-screen">
        <div class="w-full max-w-md p-6">
            <h2 class="text-4xl font-semibold text-center mb-4">Login</h2>

            <form @submit.prevent="login">
                <div class="mb-4">
                    <label for="email" class="block font-medium">Email</label>
                    <input type="email" id="email" class="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-900" v-model="email" placeholder="Enter your email" required/>
                </div>

                <div class="mb-4">
                    <label for="password" class="block font-medium">Password</label>
                    <input type="password" id="password" class="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-900" v-model="password" placeholder="Enter your password" required />
                </div>

                <p v-if="errorMessage" class="text-red-500 mt-4 text-center">{{ errorMessage }}</p>

                <button type="submit" class="mt-4 w-full py-2 bg-blue-800 rounded-md hover:bg-blue-600 transition duration-200 text-white">Login</button>

                <div class="text-center mt-4">
                    <p>Don't have an account? <button @click="router.push('/signup')" class="text-blue-600 hover:text-blue-800">Sign Up</button></p>
                </div>
            </form>
        </div>
    </div>
</template>
