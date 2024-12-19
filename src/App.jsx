import { useEffect, useRef, useState } from 'react'
import Card from './components/Card'

const CARDS = [
  {
    id: 1,
    image: '../assets/Images/Bat.png',
    canFlip: true,
    toFlip: false
  },
  {
    id: 2,
    image: '../assets/Images/Bat.png',
    canFlip: true,
    toFlip: false
  },
  {
    id: 3,
    image: '../assets/Images/Bones.png',
    canFlip: true,
    toFlip: false
  },
  {
    id: 4,
    image: '../assets/Images/Bones.png',
    canFlip: true,
    toFlip: false
  },
  {
    id: 5,
    image: '../assets/Images/Cauldron.png',
    canFlip: true,
    toFlip: false
  },
  {
    id: 6,
    image: '../assets/Images/Cauldron.png',
    canFlip: true,
    toFlip: false
  },
  {
    id: 7,
    image: '../assets/Images/Dracula.png',
    canFlip: true,
    toFlip: false
  },
  {
    id: 8,
    image: '../assets/Images/Dracula.png',
    canFlip: true,
    toFlip: false
  },
  {
    id: 9,
    image: '../assets/Images/Eye.png',
    canFlip: true,
    toFlip: false
  },
  {
    id: 10,
    image: '../assets/Images/Eye.png',
    canFlip: true,
    toFlip: false
  }
  ,
  {
    id: 11,
    image: '../assets/Images/Ghost.png',
    canFlip: true,
    toFlip: false
  },
  {
    id: 12,
    image: '../assets/Images/Ghost.png',
    canFlip: true,
    toFlip: false
  },
  {
    id: 13,
    image: '../assets/Images/Pumpkin.png',
    canFlip: true,
    toFlip: false
  },
  {
    id: 14,
    image: '../assets/Images/Pumpkin.png',
    canFlip: true,
    toFlip: false
  }
  ,
  {
    id: 15,
    image: '../assets/Images/Skull.png',
    canFlip: true,
    toFlip: false
  },
  {
    id: 16,
    image: '../assets/Images/Skull.png',
    canFlip: true,
    toFlip: false
  }
]

const totalTime = 60;


function App() {

  const [objects, setObjects] = useState([]); // Array of objects
  const [clickCount, setClickCount] = useState(0); // Count clicks
  const [shuffledCards, setShuffledCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [matchCount, setMatchCount] = useState(0);
  const [canClick, setCanClick] = useState(true);
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [started, setStarted] = useState(false);
  const intervalRef = useRef(null);
  const bgSoundRef = useRef(null);

  function checkCardMatch(card) {
    // console.log('Card:', card);
    if (!card.canFlip || !canClick) return; 

    

    const audio = new Audio('../assets/Audio/flip.wav');
    audio.play();

    setCanClick(false); // Disable further clicks

    setShuffledCards((prevCards) =>
      prevCards.map((c) =>
        c.id === card.id ? { ...c, toFlip: true } : c
      )
    );

    setObjects((prevObjects) => {
      const updatedObjects = [...prevObjects, card];
      // console.log('Updated Objects:', updatedObjects); // Log the updated state
      return updatedObjects;
    });
    setClickCount((prevCount) => {
      const newCount = prevCount + 1;
      // console.log('New Click Count:', newCount); // Log the updated click count
      return newCount;
    });
  }

  useEffect(() => {
    // Shuffle the cards once
    resetCards();

    // Cleanup interval on component unmount
    return () => clearInterval(intervalRef.current);
  }, []); // Runs only once after the component mounts

  function resetCards(){
    const shuffled = [...CARDS].sort(() => 0.5 - Math.random());
    setShuffledCards(shuffled);
  }

  function resetGame() {
    resetCards();
    setClickCount(0);
    setMatchCount(0);
    setObjects([]);
    // setStarted(false);
    setVictory(false);
    setTimeLeft(totalTime);
  }

  function startGame(){
    setStarted(true);
    bgSoundRef.current = new Audio('../assets/Audio/creepy.mp3');
    bgSoundRef.current.play();
    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if(prevTime===0){
          const audio = new Audio('../assets/Audio/gameOver.wav');
          audio.play();
          clearInterval(intervalRef.current);
          bgSoundRef.current.pause();
          setGameOver(true);
          resetGame();
          return 0;
        }
        else{
          return prevTime - 1;
        }
      });
    }, 1000);
  }

  function restartGame(){
    setGameOver(false);
    resetGame();
    startGame();
  }

  useEffect(() => {
    if (clickCount > 1 && clickCount % 2 === 0) {
      const currentObject = objects[objects.length - 1];
      const previousObject = objects[objects.length - 2];
      if (currentObject && previousObject) {
        // console.log('Comparing:', previousObject, currentObject);
        if (currentObject.image === previousObject.image) {
          // currentObject.card.canFlip = false;
          // previousObject.card.canFlip = false;
          const audio = new Audio('../assets/Audio/match.wav');
          audio.play();
          setShuffledCards((prevCards) =>
            prevCards.map((card) =>
              card.id === currentObject.id || card.id === previousObject.id
                ? { ...card, canFlip: false }
                : card
            )
          );
          setMatchCount((prevCount) => prevCount + 2);
          // console.log(matchCount)
          if (matchCount === CARDS.length - 2) {
            setVictory(true);
            bgSoundRef.current.pause();
            const audio = new Audio('../assets/Audio/victory.wav');
            audio.play();
            // console.log('victory', victory);

            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null; // Ensure the ref is reset
            }
          }
          // console.log('Both object values are equal.');
          // setCanClick(true); // Re-enable clicking
        } else {
          // currentObject.card.toFlip = true;
          // previousObject.card.toFlip = true;
          setTimeout(() => {
            setShuffledCards((prevCards) =>
              prevCards.map((card) =>
              card.id === currentObject.id || card.id === previousObject.id
                  ? { ...card, toFlip: false }
                  : card
              )
            );
            // setCanClick(true); // Re-enable clicking
          }, 1000);
          // console.log('Both object values are not equal.');
        }        
      }
    }

    setCanClick(true); // Re-enable clicking
  }, [clickCount, objects]);

  return (
    <div className="h-screen font-lunacy">
      <h1 className="font-creepy text-mm-yellow font-normal text-8xl text-center my-16">Mix-Or-Match</h1>

      <div className={`fixed top-0 left-0 right-0 bottom-0 z-50 justify-center items-center flex-col text-mm-yellow font-creepy transition-all duration-500 animate-overlay-grow overlay-text ${!started ? 'visible' : 'hidden'}`} onClick={startGame}>
          Click to Start
      </div>

      {gameOver && (
        <div className={`fixed top-0 left-0 right-0 bottom-0 z-50 justify-center items-center flex-col text-mm-yellow font-creepy transition-all duration-500 animate-overlay-grow overlay-text visible`} onClick={restartGame}>
          GAME OVER
          <span className="text-lg">Click to Restart</span>
        </div>
      )}
      
      {victory && (
        <div className={`fixed top-0 left-0 right-0 bottom-0 z-50 justify-center items-center flex-col text-mm-yellow font-creepy transition-all duration-500 animate-overlay-grow overlay-text visible`} onClick={restartGame}>
          VICTORY
          <span className="text-lg">Click to Restart</span>
        </div>
      )}
      <div className="my-12 mx-auto max-w-[530px] grid grid-cols-2 sm:grid-cols-4 gap-3 justify-center perspective-normal">
        <div className="col-span-full flex justify-between *:text-mm-orange text-4xl">
          <div className="">Time {timeLeft}</div>
          <div className="">Flips {clickCount}</div>
        </div>
        {shuffledCards.map((card) => (<Card item={card} key={card.id} checkCard={()=>checkCardMatch({...card})}/>))}
      </div>
    </div>
  )
}

export default App
