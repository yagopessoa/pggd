<template>
    <v-container fluid class="container">
        <v-layout row>
            <v-flex xs12 text-xs-center>
                <p class="headline ma-2">{{ loadedClass.title }} - Módulos</p>
            </v-flex>
        </v-layout>
        <v-layout row v-if="loadedClass.accessKey">
            <v-flex xs12 text-xs-center>
                <p class="body-2 ma-2">Código de acesso: {{ loadedClass.accessKey }}</p>
            </v-flex>
        </v-layout>
        <v-layout row class="mt-4">
            <v-flex xs12 sm8 md6 offset-sm2 offset-md3>
                <v-list v-if="!loading && loadedClass.modules.length > 0">
                    <v-list-tile
                        v-for="item in loadedClass.modules"
                        :key="item.id"
                        @click="onLoadModule(item.id)"
                    >
                        <v-list-tile-content>
                            <v-list-tile-title v-text="item.title" />
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <p
                    class="text-xs-center"
                    v-if="!loading && loadedClass.modules.length < 1"
                ><i>Ainda não há módulos cadastrados.</i></p>
                <div class="spinner-container" v-if="loading">
                    <v-progress-circular
                        indeterminate
                        color="primary"
                    ></v-progress-circular>
                </div>
            </v-flex>
        </v-layout>
        <v-layout v-if="!loading && isTeacher">
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
                        <p>Novo módulo</p>
                    </v-card-title>
                    <v-card-text>
                        <v-form v-model="valid">
                            <v-text-field
                                autofocus
                                v-model="title"
                                label="Nome"
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
                            @click="dialog = false"
                        >
                            Cancelar
                        </v-btn>
                        <v-btn
                            color="primary"
                            flat
                            @click="onCreateModule"
                        >
                            Criar módulo
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  props: ['id'],
  data: () => ({
    dialog: false,
    valid: false,
    title: ''
  }),
  computed: {
    isTeacher () {
      if (this.$store.getters.user) return this.$store.getters.user.isTeacher
    },
    loadedClass () {
      return this.$store.getters.loadedClass(this.id)
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onCreateModule () {
      if (this.valid) {
        this.$store.dispatch('createModule', {classId: this.loadedClass.id, title: this.title, teacher: this.$store.getters.user.id})
        this.dialog = false
        this.title = ''
      }
    },
    onLoadModule (id) {
      this.$router.push('/modulo/' + id)
    }
  },
  mounted () {
    this.$store.dispatch('loadClass', {id: this.id})
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
