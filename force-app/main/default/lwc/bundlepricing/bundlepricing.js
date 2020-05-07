/* eslint-disable no-console */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import { LightningElement, wire, track } from 'lwc';
import getPrograms from '@salesforce/apex/GetPrograms.getAllProgs';

let i=0;
export default class Bundlepricing extends LightningElement {
    @track programs = []; //this will hold key, value pair 
    @track value = ''; //initialize combo box value
    @track chosenValue = ''; //holds the id of the Program
    // eslint-disable-next-line @lwc/lwc/valid-wire
    @wire(getPrograms)
    wiredUserRoles({ error, data }) {
        if (data) {
            //create array with elements which has been retrieved 
            //here value will be Id and label of combobox will be Name of the Program
            for(i=0; i<data.length; i++)  {
                if(i === 0){
                    this.programs = [{value: data[i].Id , label: data[i].Name} ];     
                }
                else{
                this.programs = [...this.programs ,{value: data[i].Id , label: data[i].Name} ];        
                }                           
            }                
            this.error = undefined;
        } else if (error) {
            console.log("error")
            this.error = error;
            this.programs = undefined;
        }

    }

    get programOptions() {
        return this.programs;
    }

    handleChange(event) {
        // Get the string of the "value" attribute on the selected option
        const selectedOption = event.detail.value;
        console.log('selected value=' + selectedOption);
        this.chosenValue = selectedOption;
    }
    
    //this value will be shown as selected value of combobox item
    get selectedValue(){
        return this.chosenValue;
    }

}