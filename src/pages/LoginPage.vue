<template>
  <v-container fluid>
    <v-layout align-center justify-center column fill-height/>
        <v-layout row wrap>
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
              <v-btn color="primary" :style="'width: 100%; margin: 32px 0px'" contained  @click="onSignIn">
                Entrar
              </v-btn>
              <v-btn :disabled="isRequesting" :style="'width: 100%; margin: 0px'" flat :to="'/cadastro'">
                Ainda não tenho cadastro
              </v-btn>
            </v-flex>
        </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
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
      ],
      isRequesting: false
    }),
    computed: {
      user () {
        return this.$store.getters.user
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/home')
        }
      },
      loading (value) {
        this.isRequesting = false
      }
    },
    methods: {
      onSignIn () {
        if (this.valid) {
          this.isRequesting = true
          this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
        }
      }
    }
  }
</script>
