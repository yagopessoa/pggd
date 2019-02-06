<template>
    <v-container fluid class="container">
        <v-layout row>
            <v-flex xs12 text-xs-center>
                <p class="title ma-2">{{ loadedClass.title }}: {{ loadedModule.title }}</p>
                <p class="title ma-2">Dúvidas</p>
            </v-flex>
        </v-layout>
        <v-layout row class="mt-4">
            <v-flex xs12 sm8 md6 offset-sm2 offset-md3>
                <!-- <v-list v-if="!loading && loadedDoubts.length > 0">
                    <v-list-tile
                        v-for="item in loadedDoubts"
                        :key="item.id"
                    >
                        <v-list-tile-content>
                            <v-list-tile-title v-text="item.title" />
                            <v-list-tile-sub-title v-text="item.doubt" />
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list> -->
                <v-card
                    v-if="!loading && loadedDoubts.length > 0"
                    v-for="item in loadedDoubts"
                    :key="item.id"
                    class="mb-2"
                >
                    <v-card-title primary-title>
                        <div>
                            <div class="headline">{{ item.title }}</div>
                            <span class="subheading grey--text">{{ item.doubt }}</span>
                        </div>
                    </v-card-title>

                    <v-card-actions v-if="!isTeacher">
                        <v-spacer></v-spacer>
                        <v-btn icon @click="handleVote(item.id)">
                            <v-icon v-if="item.voted">thumb_up</v-icon>
                            <v-icon v-else class="grey--text">thumb_up</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
                <p
                    class="text-xs-center"
                    v-if="!loading && loadedDoubts.length < 1"
                >Ainda não há dúvidas submetidas.</p>
                <div class="spinner-container" v-if="loading">
                    <v-progress-circular
                        indeterminate
                        color="primary"
                    ></v-progress-circular>
                </div>
            </v-flex>
        </v-layout>
        <v-layout v-if="!loading && !isTeacher">
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
                            <v-text-field
                                v-model="doubt"
                                label="Dúvida"
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
                            @click="onCreateDoubt"
                        >
                            Submeter dúvida
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
    title: '',
    doubt: ''
  }),
  computed: {
    isTeacher () {
      if (this.$store.getters.user) return this.$store.getters.user.isTeacher
    },
    loadedClass () {
      return this.$store.getters.loadedClass
    },
    loadedModule () {
      return this.$store.getters.loadedModule(this.id)
    },
    loadedDoubts () {
      return this.$store.getters.loadedDoubts
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onCreateDoubt () {
      if (this.valid) {
        this.$store.dispatch('createDoubt', {
          teacher: this.loadedClass.teacher,
          classId: this.loadedClass.id,
          moduleId: this.loadedModule.id,
          title: this.title,
          doubt: this.doubt,
          author: this.$store.getters.user.id
        })
        this.dialog = false
        this.title = ''
        this.doubt = ''
      }
    },
    handleVote (id) {
      this.$store.dispatch('voteDoubt', {teacher: this.loadedClass.teacher, classId: this.loadedClass.id, moduleId: this.id, userId: this.$store.getters.user.id, id: id, student: this.$store.getters.user.id})
    }
  },
  mounted () {
    if (this.isTeacher) this.$store.dispatch('loadDoubts', {teacher: this.$store.getters.user.id, classId: this.loadedClass.id, moduleId: this.id, userId: '-1'})
    else this.$store.dispatch('loadDoubts', {teacher: this.loadedClass.teacher, classId: this.loadedClass.id, moduleId: this.id, userId: this.$store.getters.user.id})
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
