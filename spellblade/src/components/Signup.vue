<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const first_name = ref('')
const last_name = ref('')
const email = ref('')
const password1 = ref('')
const password2 = ref('')
const errorMessage = ref('')

const router = useRouter()

const signup = async () => {
    errorMessage.value = ''

    if (password1.value !== password2.value) {
        errorMessage.value = 'Passwords do not match.'
    } else {
        const response = await fetch('http://localhost:8000/api/signup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: first_name.value,
                last_name: last_name.value,
                email: email.value,
                password: password1.value,
            }),
        })

        const data = await response.json()

        if (response.ok) {
            localStorage.setItem('spellblade-token', data.user.token)
            localStorage.setItem('spellblade-user', JSON.stringify({
                email: data.user.email,
                first_name: data.user.first_name,
                last_name: data.user.last_name,
            }))
            router.push('/dashboard')
        } else {
            errorMessage.value = data.error
        }
    }
}
</script>

<template>
    <div class="flex items-center justify-center min-h-screen">
        <div class="w-full max-w-md p-6">
            <h2 class="text-4xl font-semibold text-center mb-4">Sign Up</h2>

            <form @submit.prevent="signup">
                <div class="mb-4">
                    <label for="first_name" class="block font-medium">First Name</label>
                    <input type="text" id="first_name" class="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-900" v-model="first_name" placeholder="Enter your first name" required/>
                </div>

                <div class="mb-4">
                    <label for="last_name" class="block font-medium">Last Name</label>
                    <input type="text" id="last_name" class="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-900" v-model="last_name" placeholder="Enter your last name" required/>
                </div>

                <div class="mb-4">
                    <label for="email" class="block font-medium">Email</label>
                    <input type="email" id="email" class="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-900" v-model="email" placeholder="Enter your email" required/>
                </div>

                <div class="mb-4">
                    <label for="password1" class="block font-medium">Password</label>
                    <input type="password" id="password1" class="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-900" v-model="password1" placeholder="Enter your password" required />
                </div>

                <div class="mb-4">
                    <label for="password2" class="block font-medium">Confirm Password</label>
                    <input type="password" id="password2" class="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-900" v-model="password2" placeholder="Enter your password" required />
                </div>

                <p v-if="errorMessage" class="text-red-500 mt-4 text-center">{{ errorMessage }}</p>

                <button type="submit" class="mt-4 w-full py-2 bg-blue-800 rounded-md hover:bg-blue-600 transition duration-200 text-white">Sign Up</button>

                <div class="text-center mt-4">
                    <p>Already have an account? <button @click="router.push('/login')" class="text-blue-600 hover:text-blue-800">Login</button></p>
                </div>
            </form>
        </div>
    </div>
</template>
