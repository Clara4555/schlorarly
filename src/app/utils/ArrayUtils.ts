export const distinctList = <T>(list: T[], property: keyof T, compareFn?:(a: T, b: T) => number): T[]=>{

    const newDistinct: T[] = [];

    list.forEach((_channel)=>{
      const i = newDistinct.findIndex(chat => chat[property] === _channel[property]);
      if(i === -1){
        newDistinct.push(_channel);
      }else{
        newDistinct[i] = _channel;
      }
    })
    
    if(compareFn){
        newDistinct.sort(compareFn);
    }

    return newDistinct;

}