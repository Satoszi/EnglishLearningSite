export class GetWords  {


    async getAp(url, stateVar, func){
      const response = await fetch( url);
      const data = await response.json();
      
      const arr = []
      for (var key in data){
        arr.push({english: key, polish: data[key] })
      }
      //console.log(stateVar)
      switch(stateVar) {
        case "wordsList":
          //console.log("halo0")
          func(arr, stateVar)
          break;
        case "wordsListToLearn":
          func(arr, stateVar)
          break;
      }
    }

    async wordsToLearnBySetAndState(userId, status, setName, callBack){
      
      const url = "http://bitex122.vot.pl/getwordsbystatusbyset.php?userid=" + userId + "&status= " + status + "&setname=" + setName;
      const response = await fetch( url);
      const data = await response.json();
      
      const wordsListToLearnBySet = []
      for (var key in data){
        wordsListToLearnBySet.push({english: key, polish: data[key] })
      }
      callBack(wordsListToLearnBySet)
    }

    async wordsToLearnBySet(userId, setName, callBack){
      
      const url = "http://bitex122.vot.pl/getwordsbyset.php?userid=" + userId + "&setname=" + setName;
      const response = await fetch( url);
      const data = await response.json();
      
      const wordsListToLearnBySet = []
      for (var key in data){
        wordsListToLearnBySet.push({english: key, polish: data[key] })
      }
      callBack(wordsListToLearnBySet)
    }


    async howManyWordsPerSet(userId, setName, callBack){

      const url = "http://bitex122.vot.pl/howManyWordsPerSet.php?userid=" + userId + "&setname=" + setName;

      const response = await fetch(url);
      const data = await response.json();
      
      const arr = []
      for (var key in data){
        arr.push(data[key]);
      }

      callBack(arr);
    }


    async getSets(userId, callBack){
      const response = await fetch("http://bitex122.vot.pl/getsets.php?userid=9");
      const data = await response.json();

      const arr = []
      for (let key in data){
        arr.push(data[key])
      }
      
      callBack(arr)
    }

    newSet = (userId, setName) => {
      fetch( "http://bitex122.vot.pl/insertnewset.php?userid=9&setname=" + setName);
    }
  }







  export default GetWords