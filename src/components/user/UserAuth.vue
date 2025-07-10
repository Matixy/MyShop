<template>
  <div class="auth">
    <div class="container-sm mb-4">
        <ul class="nav nav-underline justify-content-center">
        <li class="nav-item">
          <a
            @click.prevent="register = false"
            aria-current="page"
            class="nav-link text-dark"
            :class="{active : !register}"
            href=""
          >Zaloguj</a>
        </li>
        <li class="nav-item">
          <a
            @click.prevent="register = true"
            class="nav-link text-dark"
            :class="{active : register}"
            href=""
          >Zarejestruj</a>
        </li>
      </ul>
    </div>
    <div class="auth-form">
      <div class="card">
      <div class="card-body">
        <h5 class="card-title text-center"> {{ formTitle }} </h5>
        <form
          @submit.prevent="(e)=> onSubmit(e, credentials)"
          novalidate
          class="needs-validation"
        >
          <div class="form-floating mb-3">
            <input
              v-model="credentials.email"
              aria-describedby="validationEmailFeedback"
              class="form-control"
              id="email"
              name="email"
              type="email"
              placeholder=" "
              required
            >
            <label for="email" class="form-label">Adres Email</label>
            <div id="validationEmailFeedback" class="invalid-feedback">
              Podaj poprawny adres email.
            </div>
          </div>
          <div class="form-floating mb-3">
            <input
              v-model="credentials.password"
              aria-describedby="validationEmailFeedback"
              class="form-control"
              id="password"
              name=""
              type="password"
              placeholder=" "
              required
            >
            <label for="password" class="form-label">Hasło</label>
            <div id="validationPasswordFeedback" class="invalid-feedback">
              Podaj poprawne hasło.
            </div>
          </div>
          <div class="d-flex align-items-center w-50">
            <button
              @click.prevent="storeAuth.loginGoogleUser"
              class="rounded me-2 w-25 btn"
            >
              <font-awesome-icon icon="fa-brands fa-google" />
            </button>
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-outline-dark "> {{ formTitle }}</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
// 
// import
// 

  import { computed, ref, reactive } from 'vue';
  // auth store
  import { useStoreAuth } from '@/stores/storeAuth';

// 
// store
// 

  const storeAuth = useStoreAuth()

// 
// register / login
// 

  const register = ref(false)

// 
// form title
// 

  const formTitle = computed(() => register.value ? 'Zarejestruj' : 'Zaloguj')

// 
// credentials
// 

  const credentials = reactive({
    email: '',
    password: ''
  })

// 
// onSubmit
// 


  const onSubmit = (e, data) => {
    const emailFeedback = e.target.elements['email']
    const passwordFeedback = e.target.elements['password']
    
    let validEmail = false
    let validPassword = false

    if (!data.email) {
      emailFeedback.classList.add('is-invalid')
    } else {
      validEmail = true
      emailFeedback.classList.remove('is-invalid')
    }

    if (!data.password) {
      passwordFeedback.classList.add('is-invalid')
    } else {
      validPassword = true
      passwordFeedback.classList.remove('is-invalid')
    }

    if (validEmail && validPassword && register.value) {
      storeAuth.registerUser(credentials)
    } else if (validEmail && validPassword && !register.value) {
      storeAuth.loginUser(credentials)
    }
  }

</script>

<style>
.auth-form {
  max-width: 400px;
  margin: 0% auto
}

</style>
