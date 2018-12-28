<template>
  <v-container fluid>
    <v-layout row v-if="error">
      <v-flex xs12 sm8 md6 lg4 offset-sm2 offset-md3 offset-lg4>
        <app-alert @dismissed="onDismissed" class="mb-3" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
        <v-flex xs10 sm8 md6 lg4 offset-xs1 offset-sm2 offset-md3 offset-lg4 text-xs-center>
          <v-form v-model="valid">
            <v-text-field
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
      if (this.userIsAuthenticated) this.$router.push('/home')
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
        v => v.length >= 8 || 'A senha deve ter pelo menos 8 caracteres'
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
          this.$router.push('/home')
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
