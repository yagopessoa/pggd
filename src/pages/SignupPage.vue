<template>
  <v-container fluid>
    <v-layout row  v-if="error">
      <v-flex xs12 sm8 md6 lg4 offset-sm2 offset-md3 offset-lg4>
        <app-alert @dismissed="onDismissed" class="mb-3" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs10 sm8 md6 lg4 offset-xs1 offset-sm2 offset-md3 offset-lg4 text-xs-center>
        <v-form v-model="valid">
          <v-text-field
            v-model="name"
            label="Nome"
            required
            class="mb-2"
            :rules="[v => !!v || 'Nome é obrigatório']"
          ></v-text-field>

          <v-flex xs12 sm6 md4>
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="date"
              persistent
              lazy
              full-width
              width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="dateFormatted"
                label="Data de nascimento"
                prepend-icon="event"
                readonly
                required
                :rules="[v => !!v || 'Nascimento é obrigatório']"
              ></v-text-field>
              <v-date-picker 
                full-width
                v-model="date"
                no-title 
                scrollable 
                locale="pt-br"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
              >
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal = false">Cancelar</v-btn>
                <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
            class="mb-2 mt-2"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Senha"
            required
            :type="'password'"
            class="mb-2"
          ></v-text-field>
          <v-text-field
            v-model="confirmPassword"
            :rules="[comparePasswords, v => !!v || 'Confirmação é obrigatória' ]"
            label="Confirmar senha"
            required
            :type="'password'"
            class="mb-2"
          ></v-text-field>
        </v-form>
        <v-btn :disabled="loading" :loading="loading" color="primary" :style="'width: 100%; margin: 32px 0px'" contained @click="onSignUp">
          Cadastrar
          <span slot="loader" class="custom-loader">
            <v-icon light>cached</v-icon>
          </span>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: (vm) => ({
      valid: false,
      name: '',
      date: null,
      dateFormatted: null,
      modal: false,
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
      confirmPassword: ''
    }),
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'As senhas devem ser iguais' : true
      },
      user () {
        return this.$store.getters.user
      },
      loading () {
        return this.$store.getters.loading
      },
      error () {
        return this.$store.getters.error
      }
    },
    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      onSignUp () {
        if (this.valid) {
          this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
        }
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>
