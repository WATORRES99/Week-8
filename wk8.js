//Create a menu app as seen in this week’s video. What you create is up to you as long as it meets the following requirements:
//Use at least one array.
//Use at least two classes.
//Your menu should have the options to create, view, and delete elements.


//This will create a class to write individual cryptocurrencies that can be "farmed" in order to obtain an airdrop token
//This code creates two classes, Crypto for each individual crypto that will be used to recieve two inputs, the name and amount invested.  
//This is meant to keep track of all the investments within the ecosystems and how much was invested.  
class Crypto {
    constructor(name, amountInvested){
        this.name = name;
        this.amountInvested = amountInvested;
    }

    describe() {
        return `You invested ${this.amountInvested} in ${this.name}.`;
     
    }
}

//This class was created for the creation of the Ecosystems that the cryptos belong to such as the
//Solana ecosystem verus the Ethereum ecosystem, etc.  This creates an array for each of the cryptos 
//within each ecosystem where each additional input is added to the array as the user adds more inputs.  

class Ecosystem {
    constructor(name){
        this.name = name;
        this.cryptos = [];
    }

    addCrypto(crypto){
        if(crypto instanceof Crypto){
            this.cryptos.push(crypto);
        }
        else {
            throw new Error(`You can only add an instance of Crypto.  Argument is not a crypto: ${crypto}`);
        }
    }

    describe() {
        return `${this.name} has ${this.cryptos.length} Cryptocurrencies in its Ecosystem.` ;  

    }
}

//This class creates the menu which the user will interact with.  This creates the array of the ecosystems, null is used
//to indicate we start with no inputs.  The first part is creating a while loop that waits for input from user.  depending on the
//selection, the while loop will redirect to the proper function.  If the user presses zero, then the program will except out of the 
//loop and close the program.  

class Menu{
    constructor(){
        this.ecosystems = [];
        this.selectedEcosystem = null;
    }
    
    start() {
        let selection  = this.showMainMenuOptions();

        while (selection != 0){
            switch (selection) {
                case '1':
                    this.createEcosystem();
                    break;
                case '2':
                    this.viewEcosystem();
                    break;
                case '3':
                    this.deleteEcosystem();
                    break;
                case '4':
                    this.displayEcosystems();
                   break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert("Goodbye!");


//These are the individual functions that the loop will choose based on input from the user.  The first is just to views
//the options in the main menus and the second one is to view the options in the specific ecosystems.       
    }
    showMainMenuOptions() {
       
        return prompt(` 
            0) exit 
            1) create new Ecosystem 
            2) view Ecosystem 
            3) delete Ecosystem 
            4) display all ecosystems
            `);
        
    }
    showEcosystemMenuOptions(ecosystemInfo){
        return prompt(`
            0) back 
            1) create Crypto
            2) delete crypto
            ${ecosystemInfo}
            `);
    }

    //  This is to display all the ecosystems that have been added.  
    displayEcosystems() {

        let ecosystemString = "";
        for (let i = 0; i < this.ecosystems.length; i++) {
            ecosystemString += i + ") " + this.ecosystems[i].name + "\n";
        }
        alert(ecosystemString);
    }


//This allows you to view a specific ecosystem in the array and allows you to add or delete a crypto within that ecosystem.      
    viewEcosystem() {
        let index = prompt("Enter the Ecosystem you want to view:   ")
        if(index > -1 && index < this.ecosystems.length) {
            this.selectedEcosystem = this.ecosystems[index];
            let description = "Ecosystem Name: " + this.selectedEcosystem.name + "\n";

            for (let i = 0; i < this.selectedEcosystem.cryptos.length; i++){
                description += i + ") " + this.selectedEcosystem.cryptos[i].name + " - "+ this.selectedEcosystem.cryptos[i].amountInvested + "\n";
                 
            }
            let selection = this.showEcosystemMenuOptions(description);
            switch(selection){
                case "1": 
                  this.createCrypto();
                  break;
                case "2":
                    this.deleteCrypto();
            }

        }
    }

    //finally, these are the functions to create crypto, delete crypto, delete ecosystems.
    createCrypto(){
        let name = prompt(`Enter new Crypto:`);
        let amountInvested = prompt(`Enter amount invested:`);
        this.selectedEcosystem.cryptos.push(new Crypto(name, amountInvested));
    }
    deleteCrypto(){
        let index = prompt(`Enter the index of the crypto you want to delete:`);
        if (index > -1 && index < this.selectedEcosystem.cryptos.length){
            this.selectedEcosystem.cryptos.splice(index, 1);
        }
    }
    deleteEcosystem(){
        let index = prompt(`Enter the index of the ecosystem you want to delete`);
        if (index > -1 && index < this.ecosystems.length){
            this.ecosystems.splice(index, 1);
        }
    }
   //This one creates a new ecosystem and adds it to the array ecosystems array 
   createEcosystem() {
    let name = prompt("Enter name for new Ecosystem: ");
    this.ecosystems.push(new Ecosystem(name));
} 
    

}
let menu = new Menu();
menu.start();

  