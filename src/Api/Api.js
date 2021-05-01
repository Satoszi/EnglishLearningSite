import {API} from '../constants';
const userId = 9;
export class Api  {

    async getAllWords(cb){
      let rangeFrom = 100;
      let rangeTo = 215
      let pathname = "getuserwordsnotlearned.php"
      //const url = API.BASE_URL + 'getuserwordsnotlearned.php?userid=${userId}&from= ' + rangeFrom + "&to= " + rangeTo;
      const url = new URL (API.BASE_URL + pathname)
      url.searchParams.append("userid", userId)
      url.searchParams.append("from", rangeFrom)
      url.searchParams.append("to", rangeTo)

      const response = await fetch( url);
      const data = await response.json();
      
      const arr = []
      for (var key in data) arr.push({english: key, polish: data[key] })
      cb(arr)
    }


    async wordsToLearnBySetAndState(status, setName, callBack){
      
      const url = API.BASE_URL + "getwordsbystatusbyset.php?userid=" + userId + "&status= " + status + "&setname=" + setName;
      const response = await fetch( url);
      const data = await response.json();
      
      const wordsListToLearnBySet = []
      for (var key in data){
        wordsListToLearnBySet.push({english: key, polish: data[key] })
      }
      callBack(wordsListToLearnBySet)
    }

    async wordsToLearnBySet(setName, callBack){
      
      const url = API.BASE_URL + "getwordsbyset.php?userid=" + userId + "&setname=" + setName;
      const response = await fetch( url);
      const data = await response.json();
      
      const wordsListToLearnBySet = []
      for (var key in data){
        wordsListToLearnBySet.push({english: key, polish: data[key] })
      }
      callBack(wordsListToLearnBySet)
    }


    async howManyWordsPerSet(setName, callBack){
      
      const url = API.BASE_URL + "howManyWordsPerSet.php?userid=" + userId + "&setname=" + setName;

      const response = await fetch(url);
      const data = await response.json();
      
      const arr = []
      for (var key in data){
        arr.push(data[key]);
      }
      
      callBack(arr);
    }


    async getSets(callBack){

      const url = API.BASE_URL + "getsets.php?userid=" + userId;
      const response = await fetch(url);
      const data = await response.json();

      const arr = []
      for (let key in data){
        arr.push(data[key])
      }
      
      callBack(arr)
    }

    async moveWordsToProperFlashBox(isWordKnownList){
      const url = API.BASE_URL + "moveWordsToProperFlashBox.php";

      let words = [];
      for (var key in isWordKnownList) words[key.toString()] = isWordKnownList[key]
      let data = {'words': words, 'userid': userId};

      fetch(url, {
          method: "post", 
          headers: {
              'Content-Type': 'application/json',
            },
          body: JSON.stringify(data)
        })

    }

    async addWordToSuite(english, Suite){
      const url = API.BASE_URL + "insertwordtoset.php?userid=" + userId + "&engword=" + english + "&setname=" + Suite;
      fetch(url);
    }

    async removeWordFromSuite(english){
      const url = API.BASE_URL + "deletefromstatus.php?userid=" + userId + "&engword=" + english; //Nie trzeba statusu
      fetch(url);
    }

    newSet = (setName) => {
      fetch( API.BASE_URL + "insertnewset.php?userid=" + userId + "&setname=" + setName);
    }

    removeList = (setName) => {
      fetch( API.BASE_URL + "removeset.php?userid=" + userId + "&setname=" + setName);
    }

  }

  export default Api