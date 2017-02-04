       function reset(){
            document.getElementById("serverResponse").innerText="";
            document.getElementById("timer").innerText="";
            xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange=callback;
            var url ="NumGenServlet"+"?requestRestartGame=1";
            xmlHttp.open("GET",url,true);
            xmlHttp.send();
        }

         function guess(){
             xmlHttp = new XMLHttpRequest();
             xmlHttp.onreadystatechange=callback;
             var url ="NumGenServlet"+"?requestGuessNumber="+document.getElementById("number").value;
             xmlHttp.open("GET",url,true);
             xmlHttp.send();
         }

        function guessLink(givenValue) {
            xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange=callback;
            var url ="NumGenServlet"+"?requestGuessNumber="+givenValue;
            xmlHttp.open("GET",url,true);
            xmlHttp.send();
        }

         function callback() {
             if(xmlHttp.readyState==4 && xmlHttp.status==200) {
                 var jSonMessage = JSON.parse(xmlHttp.responseText);
                 var keyRestartGame=jSonMessage.keyRestartGame;
                 if (keyRestartGame != undefined && keyRestartGame.length > 0) {
                     alert("Restart successful, game restarted!");
                     document.getElementById("number").value="";
                     return;

                 }

                 var keyError = jSonMessage.keyError;
                 if (keyError != undefined && keyError.length > 0) {
                     alert("Insert a valid number!");
                     return;
                 }
                var keySuccess = jSonMessage.keySuccess;
                 var keyHint = jSonMessage.keyHint;
                 var keyNrGuesses = jSonMessage.keyNrGuesses;
                 var diffNew = jSonMessage.getDiff;

                 if(keySuccess=="false") {
                     if (keyHint == "higher")
                         document.getElementById("serverResponse").innerHTML = "WRONG, Try a Higher nr!";
                     else if (keyHint == "lower")
                         document.getElementById("serverResponse").innerHTML = "WRONG, Try a Lower nr!";
                 }


             else
                 if(keySuccess=="true")
                 {
                     document.getElementById("serverResponse").innerHTML = "Congrats, you guessed  number " + document.getElementById("number").value + " after " + keyNrGuesses + " tries.";
                     document.getElementById("timer").innerHTML = "and"+ " " +  diffNew + "sec";
                 }
             }
         }