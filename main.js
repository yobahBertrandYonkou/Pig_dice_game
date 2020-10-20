var changer = document.querySelector("#theme-switch");
        var theme = "css/main_css2.css";
        var color = "#1f3c88";

        changer.addEventListener("click", function(){
            document.getElementById("css-link").href = theme;
            document.getElementById("theme-switch").style.color = color;
            if(theme === "css/main_css2.css"){
                theme = "css/main_css.css";
                color = " #d6e0f0";
            }else{
                theme = "css/main_css2.css";
                color = "#1f3c88";
           }
        });


        //game logic
        var totalScore = [0,0], subScore = 0, activePlayer = 1, diceValue = null, dice, p1, p2, players;
        var hold = document.getElementById("hold");
        var diceRoller = document.getElementById("roller");

        function getNames(){
            //player 1
            do{
            p1 = prompt("Player 1's Name");
            }while(p1 == "");
            console.log(p1);

            document.querySelector(".p1").innerHTML = "<i class = 'fas fa-circle' style = 'color: #22ab50;'></i> " + p1.toUpperCase();

            //player 2
            do{
                p2 = prompt("Player 2's Name");
            }while(p2 == "");
            console.log(p2);

            document.querySelector(".p2").innerHTML = "<i class = 'fas fa-circle' style = 'color: #d42f2f;'></i> " + p2.toUpperCase();
            players = [p1.toUpperCase(),p2.toUpperCase()];
            console.log(players);
        }

        diceRoller.addEventListener("click", function(){
            //rolling the dice by generating a random value between 1 and 6
            diceValue = Math.floor(Math.random() * 6) + 1;

            //checking dice value
            if(diceValue === 1){
                document.getElementById("sc-p" + activePlayer).textContent = 0;
                setActivePlayer();

                subScore = 0;
                diceValue = 0;
            }
            //changes dice to the corresponding randomly generated dice value
            dice = "images/dice-" + diceValue + ".png";
            document.getElementById("dice").src = dice;

            //updating  subscore
            subScore += diceValue;
            document.getElementById("sc-p" + activePlayer).textContent = subScore;
        });

        //defines what happens when hold is pressed
        hold.addEventListener("click", function(){
            //updating total score of active player
            totalScore[activePlayer-1] += subScore;
            document.getElementById("ts-p" + activePlayer).textContent = totalScore[activePlayer-1];

            document.getElementById("sc-p" + activePlayer).textContent = 0;
            subScore = 0;
            diceValue = 0;
            
            //checks whether total score equals to required score
            if(totalScore[activePlayer-1] >= 100){
                
                document.getElementById("player").textContent = players[activePlayer-1] + " WINS!";
                document.getElementById("score").textContent = totalScore[activePlayer-1];
                document.getElementById("winner").style.display = "block";
            }else{
                setActivePlayer();
            }           
            
        });

        //determines active player
        function setActivePlayer(){
            if(activePlayer === 1) {
                activePlayer = 2;
                document.getElementById("container").style.borderTopColor = "#d42f2f";
             }else{
                activePlayer = 1;
                document.getElementById("container").style.borderTopColor = "#22ab50";
             }            
        }

        //resets game
        function newGame(){
            totalScore = [0,0];
            activePlayer = 1;
            subScore = 0;
            diceValue = 0;
            document.getElementById("container").style.borderTopColor = "#22ab50";
            document.getElementById("ts-p1").textContent = "0";
            document.getElementById("ts-p2").textContent = "0";
            document.getElementById("sc-p1").textContent = "00";
            document.getElementById("sc-p2").textContent = "00";
            document.getElementById("dice").src = "images/start.png";    
            document.getElementById("winner").style.display = "none";
        }