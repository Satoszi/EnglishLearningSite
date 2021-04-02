export class GetWords  {
    async getAp(url, stateVar, func){
      const response = await fetch( url);
      const data = await response.json();
      
      const arr = []
      for (var key in data){
        arr.push({english: key, polish: data[key] })
      }
      console.log(stateVar)
      switch(stateVar) {
        case "wordsList":
          console.log("halo0")
          func(arr, stateVar)
          break;
        case "wordsListToLearn":
          func(arr, stateVar)
          break;
      }
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