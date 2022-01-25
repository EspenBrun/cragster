import React from 'react';

function lol() {
  return 2+2
}
const Espen = () => { 
 console.log("Dette vil logge til consollen i browseren")
 console.log(`Man kan også kalle på funksjoner som printes ut til konosllen ${lol()}`)
  return (
    <h1>Hei Preben, her inne kan du skrive html!</h1>
    // Lag din egen funksjon som du printer her hehe
  );
};  

export default Espen;
