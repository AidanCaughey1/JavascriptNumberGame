//Aidan Caughey
// Array to store generated numbers
let numbers = [];
// Variable to store the goal number
let goal;
// Variables to keep track of win and loss counts
let winCount = 0;
let lossCount = 0;
// Variable to store the order of the operation
let selectionOrder = 0;
// Variable to store the number of equations performed
let equationNum = 0;
// Variables for equations
let firstNum;
let equationOperator;
let secondNum;
let result;
// Function to generate random numbers
function generateNumbers() {
    numbers = [];
    //Filling out numbers array
    for (let i = 0; i < 4; i++) {
        numbers.push(Math.floor(Math.random() * 10) + 1);
    }
    //Generate a random goal number using the numbers array
    evaluateGoal(numbers);
}



function evaluateGoal(numbers) {
    //Ensures goal is within a reasonable range (-100, 100)
    while (goal != Math.max(-100, Math.min(goal, 100))) {
        //Make new array so to not remove numbers from original array
        const tempArray = [...numbers];
        // Select a random number index from the array
        const randomNumberIndex = Math.floor(Math.random() * tempArray.length);
        const selectedNumber = tempArray[randomNumberIndex];
        //Remove selected index from random selection
        tempArray.splice(randomNumberIndex, 1);

        // Select a random operator from the list of operators
        const operators = ['+', '-', '*'];
        const randomOperator = operators[Math.floor(Math.random() * operators.length)];

        // Select another random number from the array
        const secondNumberIndex = Math.floor(Math.random() * tempArray.length);
        const secondNumber = tempArray[secondNumberIndex];
        tempArray.splice(secondNumberIndex, 1);

        // Perform an operation using the selected numbers and operator to calculate the goal number
        switch (randomOperator) {
            case '+':
                goal = selectedNumber + secondNumber;
                break;
            case '-':
                goal = selectedNumber - secondNumber;
                break;
            case '*':
                goal = selectedNumber * secondNumber;
                break;
        }

        //Next number
        const thirdNumberIndex = Math.floor(Math.random() * tempArray.length);
        const thirdNumber = tempArray[thirdNumberIndex];
        tempArray.splice(thirdNumberIndex, 1);

        //Rand operator
        secondRandomOperator = operators[Math.floor(Math.random() * operators.length)];

        switch (secondRandomOperator) {
            case '+':
                goal = goal + thirdNumber;
                break;
            case '-':
                goal = goal - thirdNumber;
                break;
            case '*':
                goal = goal * thirdNumber;
                break;
        }

        //Last number
        const fourthNumber = tempArray[0];
        tempArray.splice(0, 1);

        //Rand operator
        thirdRandomOperator = operators[Math.floor(Math.random() * operators.length)];

        switch (thirdRandomOperator) {
            case '+':
                goal = goal + fourthNumber;
                break;
            case '-':
                goal = goal - fourthNumber;
                break;
            case '*':
                goal = goal * fourthNumber;
                break;
        }
        console.log(selectedNumber);
        console.log(randomOperator);
        console.log(secondNumber);
        console.log(secondRandomOperator);
        console.log(thirdNumber);
        console.log(thirdRandomOperator);
        console.log(fourthNumber);
    }
    renderNumbers();
}

// Function to render numbers on the board
function renderNumbers() {
    numbers.forEach((num, index) => {
        // Update button text with generated numbers
        document.getElementById(`num${index + 1}`).innerText = num;
        // Enable and make visible the number buttons
        document.getElementById(`num${index + 1}`).disabled = false;
        document.getElementById(`num${index + 1}`).style.visibility = 'visible';
        document.getElementById('goal').innerText = goal;
        document.getElementById('wins').innerText = winCount;
        document.getElementById('losses').innerText = lossCount;
    });
}

// Function to check if the goal is achieved
function checkGoal() {
    // If the last number remaining equals the goal
    if (result == goal) {
        document.getElementById('message').innerText = 'You Win!';
        winCount++;
        document.getElementById('wins').innerText = winCount;
        selectionOrder = -1;
    }
    // If only one number is left and it does not match the goal, user loses
    else if (result != goal) {
        document.getElementById('message').innerText = 'Better luck next time!';
        lossCount++;
        document.getElementById('losses').innerText = lossCount;
        selectionOrder = -1;
    }
}

// Event listener for the new game button
document.getElementById('newGame').addEventListener('click', () => {
    // Reset message
    document.getElementById('message').innerText = 'Let\'s play!';
    //Reset order variables
    selectionOrder = 0;
    equationNum = 0;
    goal = -101;
    // Clear the workspace
    document.getElementById('equation').innerText = '';
    //Remove 'disabled' buttons
    document.querySelectorAll('#board .number').forEach(button => {
        button.classList.remove('disabled');
    });
    generateNumbers();
});

// Event listener for number buttons
document.querySelectorAll('#board .number').forEach(button => {
    button.addEventListener('click', () => {
        const selectedNumber = parseInt(button.innerText);
        const equationDisplay = document.getElementById('equation');

            // Check the selection order
            if (selectionOrder === 0) {
                // Allow selection of the first number
                equationDisplay.innerText += ` ${selectedNumber}`;
                firstNum = selectedNumber
                button.classList.add('disabled'); // Grey out the button
                selectionOrder = 1; // Move to the next selection order
                document.getElementById('message').innerText = 'Select an operator';
            } else if (selectionOrder === 2) {
                equationDisplay.innerText += ` ${selectedNumber}`;
                secondNum = selectedNumber;
                selectionOrder = 0; // Move back to selecting the operator

                //Equation
                console.log(firstNum)
                console.log(equationOperator)
                console.log(secondNum)
                switch (equationOperator) {
                    case '+':
                        result = firstNum + secondNum;
                        break;
                    case '-':
                        result = firstNum - secondNum;
                        break;
                    case '*':
                        result = firstNum * secondNum;
                        break;
                        }
                console.log(result)
                // Store the result in the second number array spot
                numbers[numbers.indexOf(secondNum)] = result;
                equationNum++;

                // Update the board
                equationDisplay.innerText += ` = ${result}\n`;
                renderNumbers();
                // Check goal if the proper amount of equations occurred
                if (equationNum == 3){
                    checkGoal();
                }
            }
        });
    });

        // Event listener for operator button
        document.querySelectorAll('#operators .operator').forEach(operator => {
            operator.addEventListener('click', () => {
                const operatorSymbol = operator.innerText;
                const equationDisplay = document.getElementById('equation');

                // Check the selection order
                if (selectionOrder === 1) {
                    // Allow selection of the operator
                    equationDisplay.innerText += ` ${operatorSymbol}`;
                    equationOperator = operatorSymbol;
                    selectionOrder = 2; // Move to the next selection order
                    document.getElementById('message').innerText = 'Select a number';
                }
            });
        });


        // Start the game by generating initial numbers
        generateNumbers();