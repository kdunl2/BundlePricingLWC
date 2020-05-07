/* eslint-disable no-console */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import { LightningElement, wire, track } from 'lwc';
import getPrograms from '@salesforce/apex/GetPrograms.getAllProgs';
import getStations from '@salesforce/apex/GetPrograms.getAllStations';


let i=0;
export default class Bundlepricing extends LightningElement {
    @track programs = []; //this will hold key, value pair 
    @track stations = []; //this will hold key, value pair 
    @track value = ''; //initialize combo box value
    @track chosenProgram = ''; //holds the id of the Program
    @track chosenStation = ''; //holds the id of the Program
    // eslint-disable-next-line @lwc/lwc/valid-wire

//BEGIN WIRES TO RETRIVE SALESFORCE DATA
    @wire(getPrograms)
    wiredProgramRoles({ error, data }) {
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

    @wire(getStations)
    wiredStationRoles({ error, data }) {
        if (data) {
            //create array with elements which has been retrieved 
            //here value will be Id and label of combobox will be Name of the Program
            for(i=0; i<data.length; i++)  {
                if(i === 0){
                    this.stations = [{value: data[i].Id , label: data[i].Name} ];     
                }
                else{
                this.stations = [...this.stations ,{value: data[i].Id , label: data[i].Name} ];        
                }                           
            }                
            this.error = undefined;
        } else if (error) {
            console.log("error")
            this.error = error;
            this.stations = undefined;
        }

    }
// END WIRES

//OPTIONS
    get programOptions() {
        return this.programs;
    }
    get stationOptions() {
        return this.stations;
    }
// END OPTIONS

//CHANGE EVENTS
    handleProgramChange(event) {
        // Get the string of the "value" attribute on the selected option
        const selectedOption = event.detail.value;
        console.log('selected value=' + selectedOption);
        this.chosenProgram = selectedOption;
    }
    handleStationChange(event) {
        this.chosenStation = event.detail.value;
        
    }
// END CHANGE EVENTS

//SELETED VALUES
    //this value will be shown as selected value of combobox item
    get selectedValue(){
        return this.chosenProgram;
    }

    get selectedStation(){
        return this.chosenStation;
    }

// END SELECTED VALUES

}