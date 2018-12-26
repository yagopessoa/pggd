<template>
  <v-layout class="page">
    <v-flex xs12 sm10 offset-sm1>
        <v-container grid-list-lg fluid>
          <div v-if="loading" class="text-xs-center progress-div">
            <v-progress-circular
              indeterminate
              color="accent"
            ></v-progress-circular>
          </div>
          <v-layout v-else row wrap>
            <v-flex v-for="game in games" :key="game.name">
                <v-card tile v-if="game.published && game.cover_url">
                    <v-img
                        :src="game.cover_url"
                        height="300px"
                        class="img"
                    ></v-img>

                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">{{game.title}}</h3>
                            <div v-if="game.short_text">{{game.short_text}}</div>
                            <div v-else><i>Sem descrição.</i></div>
                        </div>
                    </v-card-title>

                    <v-card-actions>
                        <v-btn :href="game.url" target="_blank" flat color="primary">
                          Visitar página
                          <v-icon right>open_in_new</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
          </v-layout>
        </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
  const axios = require('axios')
  export default {
    name: 'GamesPage',
    data () {
      return {
        games: [],
        loading: true
      }
    },
    mounted () {
      axios
        .get('https://cors-anywhere.herokuapp.com/https://itch.io/api/1/f3p8kQSK3qc5Ee01jsPjuYILTD3VBq7ya7D9Pg16/my-games')
        .then(response => {
          var games = response.data.games
          /* games.sort((a, b) => b.views_count - a.views_count) */
          games.sort((a, b) => {
            var aData, bData
            if (a.published_at) aData = a.published_at.split(' ')[0].split('-')
            else aData = [2000, 1, 1]
            if (b.published_at) bData = b.published_at.split(' ')[0].split('-')
            else bData = [2000, 1, 1]
            return (new Date(bData[0], bData[1], bData[2])) - (new Date(aData[0], aData[1], aData[2]))
          })
          this.games = games
          this.loading = false
        })
    }
  }
</script>

<style>
  .page{
    background-color: #ECEFF1;
    min-height: 100vh;
  }
  .progress-div{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80vh;
  }
  .img{
    min-width: 288px;
  }
</style>
