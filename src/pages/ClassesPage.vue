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
                <v-list v-if="!loading && classes.length > 0">
                    <v-list-tile
                        v-for="item in classes"
                        :key="item.id"
                        @click="onLoadClass(item.id)"
                    >
                        <v-list-tile-content>
                            <v-list-tile-title v-text="item.title" />
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <p
                    class="text-xs-center"
                    v-if="!loading && classes.length < 1 && isTeacher"
                >Ainda não há turmas cadastradas.</p>
                <p
                    class="text-xs-center"
                    v-if="!loading && classes.length < 1 && !isTeacher"
                >Nenhuma disciplina matriculada.</p>
                <div class="spinner-container" v-if="loading">
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
                        <p v-if="isTeacher">Nova turma</p>
                        <p v-else>Matrícula</p>
                    </v-card-title>
                    <v-card-text>
                        <v-form v-model="valid">
                            <p v-if="!isTeacher">Insira o código da disciplina:</p>
                            <v-text-field
                                autofocus
                                v-model="title"
                                :label="isTeacher ? 'Nome' : 'Código'"
                                required
                                class="mb-2"
                                :rules="[v => !!v || 'Campo obrigatório']"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-divider />
                    <v-card-actions>
                        <v-spacer />
                        <v-btn
                            color="error"
                            flat
                            @click="dialog = false; title = ''"
                        >
                            Cancelar
                        </v-btn>
                        <v-btn
                            v-if="isTeacher"
                            color="primary"
                            flat
                            @click="onCreateClass"
                        >
                            Criar turma
                        </v-btn>
                        <v-btn
                            v-else
                            color="primary"
                            flat
                            @click="onJoinClass"
                        >
                            Matricular-se
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
      if (this.$store.getters.user) return this.$store.getters.user.isTeacher
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
    },
    onJoinClass () {
      if (this.valid) {
        this.$store.dispatch('joinClass', {id: this.title})
        this.dialog = false
        this.title = ''
      }
    },
    onLoadClass (id) {
      this.$router.push('turma/' + id)
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
