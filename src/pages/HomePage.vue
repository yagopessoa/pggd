<template>
  <div id="start">
    <v-parallax class="parallax" src="https://i.ibb.co/pQBj77p/bg2.jpg">
      <div class="upper-session">
        <v-container grid-list-md text-xs-center>
          <v-layout hidden-xs-only row wrap>
            <v-flex xs12 sm8>
              <div class="title-n-subtitle">
                <p class="display-3 font-weight-medium">{{title}}</p>
                <p class="headline text-sm-justify">{{description}}</p>
              </div>
            </v-flex>
            <v-flex xs12 sm4>
              <img src="@/assets/brasao.png" class="brasao" alt="Brasão" />
            </v-flex>
            <v-flex xs12>
              <v-btn @click="$vuetify.goTo('#bottom')" flat color="accent" class="expand-btn">
                <v-icon large>expand_more</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
          <v-layout hidden-sm-and-up row wrap>
            <v-flex xs12 sm4>
              <img src="@/assets/brasao.png" class="brasao-small" alt="Brasão" />
            </v-flex>
            <v-flex xs12 sm8>
              <div class="title-n-subtitle">
                <p class="display-2 mb-4">{{title}}</p>
                <p class="subheading text-xs-justify">{{description}}</p>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </v-parallax>

    <div class="bottom-session" id="bottom">
      <v-flex xs12 sm8 offset-sm2 md10 offset-md1>
        <v-container fluid text-xs-center>
          <p class="display-1 mt-4">O que fazemos?</p>
        </v-container>
        <v-container grid-list-lg fluid text-xs-center class="pb-5">
          <v-layout row wrap>
            <v-flex v-for="card in cardsContent" :key="card.title" xs12 md4>
              <v-card class="card">
                <img :src="card.iconPath" class="icon" alt="Ícone" />
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline font-weight-medium mb-4 card-title">{{ card.title }}</h3>
                    <p class="subheading grey--text text--darken-3 px-1">{{ card.description }}</p>
                  </div>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'HomePage',
    data () {
      return {
        title: 'Fellowship of The Game',
        description: 'Grupo de extensão vinculado ao ICMC - USP focado em desenvolvimento de jogos e na disseminação do conhecimento através de cursos e eventos abertos ao público.',
        cardsContent: [
          {
            title: 'Desenvolvimento de Jogos',
            description: 'Desenvolvemos projetos de prototipação de jogos focado na aprendizagem de todo o processo de produção, onde programação, arte, música e coordenação se unem para alcançar as metas estipuladas. Uma vez finalizado, o jogo é publicado com acesso gratuito para toda comunidade.',
            iconPath: '/static/img/gamedev.png'
          },
          {
            title: 'Disseminação de Conhecimento',
            description: 'Com o intuito de levar o conhecimento adquirido por nossos membros para a comunidade, oferecemos regularmente minicursos oficializados pela USP sobre as mais diversas áreas de desenvolvimento de jogos. Eles são gratuitos e qualquer pessoa pode participar.',
            iconPath: '/static/img/class.png'
          },
          {
            title: 'Organização de Eventos',
            description: 'Com o objetivo de divulgar nosso grupo de extensão e nossos jogos, realizamos eventos como Playtest (para que todos possam jogar nossos jogos), Game Jams (maratonas de criação de jogos) e a anual USP Game Link, que além da tradicional Mostra de Jogos do ICMC, também traz palestras e conteúdo da área de game dev.',
            iconPath: '/static/img/events.png'
          }
        ]
      }
    }
  }
</script>

<style>
  .brasao{
    padding: 16px;
  }
  .brasao-small{
    max-width: 75%;
  }
  .title-n-subtitle{
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
  .upper-session{
    min-height: calc(100vh - 60px);
    display: flex;
    align-items: center;
  }
  .expand-btn{
    margin-top: 48px;
  }
  .bottom-session{
    /* min-height: 100vh; */
    width: 100%;
    background-color: rgba(53, 74, 95, 0.3);
    /* background-color: rgba(53,74,95, 0.3); */
    padding-top: 60px;
  }
  p{
    color: #000;
  }
  .parallax{
    min-height: calc(100vh - 60px);
    object-fit: cover;
  }
  .card{
    min-height: 450px;
    height: 100%;
    margin: 0px 16px;
  }
  .card-title{
    padding: 0px 32px;
    min-height: 64px;
  }
  .icon{
    padding: 16px;
    margin-top: 24px;
  }

  @media screen and (max-width: 1355px) {
    .card-title{
      padding: 0px 16px;
    } 
  }

  @media screen and (max-width: 1125px) {
    .card-title{
      padding: 0px 0px;
    } 
  }

  @media screen and (max-height: 959px) {
    .parallax{
      min-height: calc(100vh - 48px);
    }
    .bottom-session{
      padding-top: 16px;
    }
  }

  @media screen and (max-height: 639px) {
    .parallax{
      min-height: calc(100vh);
    }
  }
</style>
