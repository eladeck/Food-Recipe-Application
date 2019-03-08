
import axios from 'axios' // it is extnernal. no path needed. only name
export default class Search {
    constructor(query) {
        this.query = query; // the query that the user typed like 'pizza'
        //this.result = null; // the result from the server (like pizza recipes)
    }

    //get Result doesn't return the recipes data, but stores it in this.result property and keeps it encapsulated.
    async getResults() {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = '1f21814749b5c18a412a3db9259754c5';
        try {
            //axios is better than fetch in terms of brining data from ser
            const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
        } catch(error) {
            alert(error);
        } // end catch block
    } // getResult
} // class Serach