import { observable, decorate } from "mobx";

class Ticket {
  pickedNums = new Array();
  pickedBonus = new Array();
}

class PickerState {
  ticketsData = new Array();

  setNumberOfEmptyTickets = number => {
      let ticketsData = [...this.ticketsData];

      for (let x = 1; x <= number; x++) {
          ticketsData.push(new Ticket());
      }

      this.ticketsData = ticketsData;
  };

  addNumber = (value, ticketIndex = 0, positionIndex) => {
      let ticketsData = [...this.ticketsData];
      let ticket = Object.assign({}, this.ticketsData[ticketIndex]);

      if (positionIndex || positionIndex === 0) {
          ticket.pickedNums[positionIndex] = value;
      } else {
          ticket.pickedNums.push(value);
      }

      this.ticketsData = [
          ...ticketsData.slice(0, ticketIndex),
          ticket,
          ...ticketsData.slice(ticketIndex + 1)
      ];
  };

  removeNumber = (value, ticketIndex = 0) => {
      let ticketsData = [...this.ticketsData];
      let ticket = Object.assign({}, this.ticketsData[ticketIndex]);

      const index = ticket.pickedNums.indexOf(value);
      ticket.pickedNums.splice(index, 1);
      this.ticketsData = [
          ...ticketsData.slice(0, ticketIndex),
          ticket,
          ...ticketsData.slice(ticketIndex + 1)
      ];
  };

  addBonus = (value, ticketIndex = 0, positionIndex) => {
	  let ticketsData = [...this.ticketsData];
      let ticket = Object.assign({}, ticketsData[ticketIndex]);

      if (positionIndex || positionIndex === 0) {
          ticket.pickedBonus[positionIndex] = value;
      } else {
          ticket.pickedBonus.push(value);
      }

      this.ticketsData = [
          ...ticketsData.slice(0, ticketIndex),
          ticket,
          ...ticketsData.slice(ticketIndex + 1)
      ];
  };

  removeBonus = (value, ticketIndex = 0) => {
      let ticketsData = [...this.ticketsData];
      let ticket = Object.assign({}, this.ticketsData[ticketIndex]);

      const index = ticket.pickedBonus.indexOf(value);
      ticket.pickedBonus.splice(index, 1);
      this.ticketsData = [
          ...ticketsData.slice(0, ticketIndex),
          ticket,
          ...ticketsData.slice(ticketIndex + 1)
      ];
  };

  clearTicket = (ticketIndex = 0, callback) => {
      let ticketsData = [...this.ticketsData];
      let ticket = Object.assign({}, ticketsData[ticketIndex]);
      let { pickedNums, pickedBonus } = ticket;

      pickedNums.splice(0, pickedNums.length);
      pickedBonus.splice(0, pickedBonus.length);

      this.ticketsData = [
          ...ticketsData.slice(0, ticketIndex),
          ticket,
          ...ticketsData.slice(ticketIndex + 1)
      ];

      callback && callback();
  };
}

decorate(PickerState, {ticketsData: observable})

export default PickerState;