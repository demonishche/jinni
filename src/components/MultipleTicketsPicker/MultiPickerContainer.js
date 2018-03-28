import React, { Component } from "react";

import MultiPickerDesktop from "./MultiPickerDesktop";
import lottoData from "../NumberPicker/pickerLottoData";
import { mobXConnect } from "../../tools/toolFunctions";

class MultipleTicketsPickerContainer extends Component {
  state = {
      minNumber: lottoData[this.props.lotto].minNumber,
      minBonus: lottoData[this.props.lotto].minBonus,
	  maxNumber: lottoData[this.props.lotto].maxNumber,
	  maxBonus: lottoData[this.props.lotto].maxBonus,
	  numbersAmount: lottoData[this.props.lotto].numbersAmount,
	  bonusAmount: lottoData[this.props.lotto].bonusAmount,
	  bonusName: lottoData[this.props.lotto].bonusName,
	  ballsTheme: lottoData[this.props.lotto].ballsTheme,
	  quickPickDelay: 150,
	  numberOfNotFree: this.props.numberOfNotFree
  };

  onNumberChange = (event, ticketIndex, numberIndex) => {
      const value = event.target.value;
	  const { addNumber } = this.props.pickerStore;

      addNumber(value, ticketIndex, numberIndex);
  };

  onBonusChange = (event, ticketIndex, bonusIndex) => {
      const value = event.target.value;
      const { addBonus } = this.props.pickerStore;

	  addBonus(value, ticketIndex, bonusIndex);
  };

  validateValue = (valueType, value, event, ticketIndex) => {
	  const { maxNumber, minNumber, maxBonus, minBonus} = this.state;
	  const {ticketsData} = this.props.pickerStore;
      const inputNode = event.target;
      let isValid = true;
      switch (valueType) {
      case "bonus":
          isValid =
          value <= maxBonus &&
          value >= minBonus &&
          ticketsData[ticketIndex].pickedBonus.indexOf(value) ===
            ticketsData[ticketIndex].pickedBonus.lastIndexOf(value);
          break;
      default:
          isValid =
          value <= maxNumber &&
          value >= minNumber &&
          ticketsData[ticketIndex].pickedNums.indexOf(value) ===
            ticketsData[ticketIndex].pickedNums.lastIndexOf(value);
      }
      isValid ? inputNode.classList.remove("-invalid") : inputNode.classList.add("-invalid");
  };

  generateNumbers = ticketIndex => {
      const numsHtmlArray = [];
      const { numbersAmount } = this.state;
      const {ticketsData} = this.props.pickerStore;
      const { pickedNums } = ticketsData[ticketIndex];
      for (let x = 1; x <= numbersAmount; x++) {
          const value = pickedNums.length >= x ? pickedNums[x - 1] : undefined;
          const numHtml = (
              <input
                  key={`ticket-${ticketIndex}-num-${x}`}
                  type="number"
                  max="70"
                  min="1"
                  className={`multi-picker_ticket_input -num ${value && "-filled"}`}
                  value={value ? value : ""}
                  onChange={e => this.onNumberChange(e, ticketIndex, x - 1)}
                  onBlur={e => this.validateValue("number", value, e, ticketIndex)}
              />
          );
          numsHtmlArray.push(numHtml);
      }
      return numsHtmlArray;
  };

  generateBonuses = ticketIndex => {
      const bonusHtmlArray = [];
	  const { bonusAmount} = this.state;
      const {ticketsData} = this.props.pickerStore;	  
      const { pickedBonus } = ticketsData[ticketIndex];
      for (let x = 1; x <= bonusAmount; x++) {
          const value = pickedBonus.length >= x ? pickedBonus[x - 1] : undefined;
          const bonusHtml = (
              <input
                  key={`ticket-${ticketIndex}-num-${x}`}
                  type="number"
                  max="70"
                  min="1"
                  className={`multi-picker_ticket_input -bonus ${value && "-filled"}`}
                  value={value ? value : ""}
                  onChange={e => this.onBonusChange(e, ticketIndex, x - 1)}
                  onBlur={e => this.validateValue("bonus", value, e, ticketIndex)}
              />
          );
          bonusHtmlArray.push(bonusHtml);
      }
      return bonusHtmlArray;
  };

  quickPick = ticketIndex => {
	  const {clearTicket} = this.props.pickerStore;
      clearTicket(ticketIndex, () => {
          let singleTicketData = this.props.pickerStore.ticketsData[ticketIndex];
          this.quickPickNumber(singleTicketData, ticketIndex);
      });
  };

  quickPickNumber = (singleTicketData, ticketIndex) => {
	  const { maxNumber, minNumber, numbersAmount, quickPickDelay } = this.state;
	  const {addNumber} = this.props.pickerStore;
      if (singleTicketData.pickedNums.length === numbersAmount) {
          return this.quickPickBonus(singleTicketData, ticketIndex);
      }

      let newNumber = (Math.floor(Math.random() * maxNumber) + minNumber).toString();

      if (singleTicketData.pickedNums.indexOf(newNumber) !== -1) {
          return this.quickPickNumber(singleTicketData, ticketIndex);
      }
	  
	  addNumber(newNumber, ticketIndex);
	  setTimeout(() => {
          this.quickPickNumber(singleTicketData, ticketIndex);
      }, quickPickDelay);
  };

  quickPickBonus = (singleTicketData, ticketIndex) => {
	  const { maxBonus, minBonus, bonusAmount, quickPickDelay } = this.state;
	  const {addBonus} = this.props.pickerStore;
	  
      if (singleTicketData.pickedBonus.length === bonusAmount) {
          return;
      }

      let newBonus = (Math.floor(Math.random() * maxBonus) + minBonus).toString();

      if (singleTicketData.pickedBonus.indexOf(newBonus) !== -1) {
          return this.quickPickBonus(singleTicketData, ticketIndex);
	  }
	  
	  addBonus(newBonus, ticketIndex);

      setTimeout(() => {
          this.quickPickBonus(singleTicketData, ticketIndex);
      }, quickPickDelay);
  };

  pickerMethods = {
      generateNumbers: this.generateNumbers,
      generateBonuses: this.generateBonuses,
      onNumberChange: this.onNumberChange,
      quickPick: this.quickPick
  };

  render() {
	  const {ticketsData} = this.props.pickerStore;
      return (
          <MultiPickerDesktop
              ticketsData={ticketsData}
              numberOfNotFree={this.state.numberOfNotFree}
              numbersAmount={this.state.numbersAmount}
              bonusAmount={this.state.bonusAmount}
			  pickerMethods={this.pickerMethods}
			  minBonus={this.state.minBonus}
			  maxNumber={this.state.maxNumber}
			  maxBonus={this.state.maxBonus}
			  minNumber={this.state.minNumber}
			  bonusName={this.state.bonusName}
          />
      );
  }
}

export default mobXConnect("pickerStore")(MultipleTicketsPickerContainer);
