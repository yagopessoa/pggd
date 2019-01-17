<template>
  <v-container fluid class="page-container">
    <v-layout v-if="error">
      <v-flex xs12 sm8 md6 lg4 offset-sm2 offset-md3 offset-lg4 align-self-center>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout>
        <v-flex xs10 sm8 md6 lg4 offset-xs1 offset-sm2 offset-md3 offset-lg4 text-xs-center align-self-center>
          <h1 class="mb-4 py-2 primary--text">Gestão de Dúvidas</h1>
          <v-form v-model="valid" class="mt-4">
            <v-text-field
              autocapitalize="off"
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
              class="mb-2"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Senha"
              required
              :type="'password'"
              class="mb-2"
            ></v-text-field>
          </v-form>
          <v-btn :disabled="loading" :loading="loading" color="primary" :style="'width: 100%; margin: 32px 0px'" contained  @click="onSignIn">
            Entrar
            <span slot="loader" class="custom-loader">
              <v-icon light>cached</v-icon>
            </span>
          </v-btn>
          <v-btn :style="'width: 100%; margin: 0px'" flat :to="'/cadastro'">
            Ainda não tenho cadastro
          </v-btn>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    created () {
      if (this.userIsAuthenticated) this.$router.push('/turmas')
    },
    data: () => ({
      valid: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail é obrigatório',
        v => /.+@.+\.+./.test(v) || 'E-mail deve ser válido'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Senha é obrigatória',
        v => v.length >= 6 || 'A senha deve ter pelo menos 6 caracteres'
      ]
    }),
    computed: {
      user () {
        return this.$store.getters.user
      },
      loading () {
        return this.$store.getters.loading
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      error () {
        return this.$store.getters.error
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/turmas')
        }
      }
    },
    methods: {
      onSignIn () {
        if (this.valid) {
          this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
        }
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>

<style>
.page-container{
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
}
.content-container{
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>

