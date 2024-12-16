<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

try {
    const token = localStorage.getItem('spellblade-token')

    const response = await fetch('http://localhost:8000/api/logout/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
    })

    localStorage.removeItem('spellblade-token')
    localStorage.removeItem('spellblade-user')

    router.push('/login')
} catch (error) {}

</script>
