<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const router = useRouter()

const login = async () => {
    errorMessage.value = ''

    try {
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

        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify({
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
        }))
        router.push('/dashboard')
    } catch (error) {
        errorMessage.value = 'Invalid email or password'
    }
}
</script>

<template>
    <div class="flex items-center justify-center min-h-screen">
        <div class="w-full max-w-md p-6 text-white">
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

                <button type="submit" class="mt-4 w-full py-2 bg-blue-800 rounded-md hover:bg-blue-600 transition duration-200">Login</button>
            </form>

            <p v-if="errorMessage" class="text-red-500 mt-4 text-center">{{ errorMessage }}</p>
        </div>
    </div>
</template>
