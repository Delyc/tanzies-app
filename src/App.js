import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useState } from "react";


 


const App = () => {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  const  generateNewDie = (() => {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }
  )
  const  allNewDice = (() => {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }
  )

  const rollDice = (() =>{
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }
  )

  const holdDice = ((id) => {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  })

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main className="flex w-full h-screen justify-center items-center ">
      <div className="bg-white h-96 max-w-3xl rounded-md p-5 flex flex-col justify-around items-center">
        {tenzies && <Confetti />}
        <h1 className="text-4xl m-0">Tenzies</h1>
        <p className="font-normal mt-0 text-center">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="flex flex-wrap w-2/4 items-center justify-center gap-4">
          {diceElements}
        </div>
        <button
          className="h-12 w-36 border-none rounded-md text-white text-base cursor-pointer bg-indigo-600 active:shadow-lg"
          onClick={rollDice}
        >
          {tenzies ? "New Game" : "Roll"}
        </button>
      </div>
    </main>
  );
}

export default App;
