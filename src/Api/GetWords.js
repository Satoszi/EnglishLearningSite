export class GetWords  {
    async getAp(url, stateVar, func){
      const response = await fetch( url);
      const data = await response.json();
      
      const arr = []
      for (var key in data){
        arr.push({english: key, polish: data[key] })
      }

      switch(stateVar) {
        case "wordsList":
          func(arr, stateVar)
          break;
        case "wordsListToLearn":
          func(arr, stateVar)
          break;
      }
    }
  }

  export default GetWords
