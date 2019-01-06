<template>
    <v-container fluid class="container">
        <v-layout row>
            <v-flex xs12 text-xs-center>
                <p v-if="isTeacher" class="title ma-2">Suas turmas</p>
                <p v-else class="title ma-2">Disciplinas matriculadas</p>
            </v-flex>
        </v-layout>
        <v-layout row class="mt-4">
            <v-flex xs12 sm8 md6 offset-sm2 offset-md3>
                <v-list v-if="!loading">
                    <v-list-tile
                        v-for="item in classes"
                        :key="item.id"
                        to="/turmas"
                    >
                        <v-list-tile-content>
                            <v-list-tile-title v-text="item.title" />
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <div class="spinner-container" v-else>
                    <v-progress-circular
                        indeterminate
                        color="primary"
                    ></v-progress-circular>
                </div>
            </v-flex>
        </v-layout>
        <v-layout v-if="!loading">
            <v-dialog
                v-model="dialog"
                width="500"
            >
                <v-btn 
                    fab
                    dark
                    color="primary"
                    :style="'position: fixed; bottom: 10px; right: 10px;'"
                    slot="activator"
                >
                    <v-icon dark>add</v-icon>
                </v-btn>
                <v-card>
                    <v-card-title
                        class="headline grey lighten-2"
                        primary-title
                    >
                        Nova turma
                    </v-card-title>
                    <v-card-text>
                        <v-form v-model="valid">
                            <v-text-field
                                autofocus
                                v-model="title"
                                label="Nome"
                                required
                                class="mb-2"
                                :rules="[v => !!v || 'Nome é obrigatório']"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-divider />
                    <v-card-actions>
                        <v-spacer />
                        <v-btn
                            color="error"
                            flat
                            @click="dialog = false"
                        >
                            Cancelar
                        </v-btn>
                        <v-btn
                            color="primary"
                            flat
                            @click="onCreateClass"
                        >
                            Criar turma
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    valid: false,
    title: ''
  }),
  computed: {
    isTeacher () {
      if (this.$store.getters.user) return true
    },
    classes () {
      return this.$store.getters.classes
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onCreateClass () {
      if (this.valid) {
        this.$store.dispatch('createClass', {title: this.title, teacher: this.$store.getters.user.id})
        this.dialog = false
        this.title = ''
      }
    }
  }
}
</script>

<style>
.container{
    height: calc(100vh - 64px);
}
.spinner-container{
    width: 100%;
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
@media screen and (max-width: 959px) {
    .container{
        height: calc(100vh - 56px);
    } 
}
</style>

