const axios = require('axios');

const a = axios.create();

const baseAPIUrl = 'https://na1.api.riotgames.com/lol';
const riotDevKey = 'RGAPI-68edf0cb-ebbf-48a4-89b5-8314b496c4cf';

a.defaults.headers.common['Content-type'] = "application/json";
a.defaults.headers.common['X-Parse-Application-Id'] = $('#appId').val();


let Riot = {
    getSummonerInfo(summonerName, success, error) {
        let url = baseAPIUrl + "/summoner/v4/summoners/by-name/" + summonerName + "api_key=" + riotDevKey;
        a.post(url).then((response) => {
            success(response);
        }, (err) => {
            error(err);
        });
    },
    
    getMatchInfo(matchId, success, error) {
        let url = baseAPIUrl + "/match/v4/matches/" + matchId + "?api_key=" + riotDevKey;
        a.post(url).then((response) => {
            success(response);
        }, (err) => {
            error(err);
        });
    },

    getChampionInfo(championName, success, error) {
        let url = baseAPIUrl + "/static-data/v4/champions/" + championName + "?local=en_US&dataById=true&api_key=" + riotDevKey;
        a.post(url).then((response) => {
            success(response);
        }, (err) => {
            error(err);
        });
    }
};

module.exports = Riot;