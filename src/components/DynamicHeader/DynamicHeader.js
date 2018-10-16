import React, { Component } from "react";
import PropTypes from "prop-types";
import { mobXConnect } from "../../tools/toolFunctions";
import {translate} from "react-i18next";

import allLottoData from "./headerLottoData";

import {roundDecimal, roundMillions, reverseString, mapStringToImages} from "./jackpotTools";

class DynamicHeader extends Component {
  state = {
      lottoData: allLottoData[this.props.lotto]
  };

  constructJackpot = jackpot => {
      let jackpotReversed = reverseString(jackpot);
      
      const decimalString = jackpotReversed.slice(4,6);
      const roundedDecimalString = roundDecimal(decimalString);

      if (jackpotReversed.length > 6) {
          const millionsString = jackpotReversed.slice(6);

          if (millionsString.length >= 3 || Number(roundedDecimalString) >= 10 || Number(roundedDecimalString) === 0) {
              const roundedMillionsString = roundMillions(millionsString, roundedDecimalString);
              return mapStringToImages(roundedMillionsString);  
          }

          else {
              return mapStringToImages(roundedDecimalString.charAt(0) + "." + millionsString);
          }
      }
      else {
          return mapStringToImages(roundedDecimalString.charAt(0) + ".0");
      }
  };


  render() {

	  const { lotto, jackpot, numberOfNotFree, t } = this.props;
	  const {ticketsData} = this.props.pickerStore;
      const lottoData = this.state.lottoData;

      const jackpotDisplay = jackpot ? this.constructJackpot(jackpot) : undefined;

      return (

          <header className="header" style={{ backgroundImage: `url(${lottoData.bg})` }}>
              <img src={lottoData.people} alt="" className="header_people" />
              <div className="cont-zone">
			  {numberOfNotFree === 0 ? (
				  <h2 className="header_title -with-logo" dangerouslySetInnerHTML={{__html:t("freeticketTitle",
				  {lotteryLogo: lottoData.logo, lotteryName: lotto})}}>
                      </h2>
			  )  : (
					  <h2 className="header_title -with-logo" dangerouslySetInnerHTML={{__html:t("notfreeTitle",
					  {numberOfTickets:ticketsData.length, lotteryLogo: lottoData.logo, lotteryName: lotto, numberOfNotFree})}} >
					  </h2>
			  )}
                  <div
                      className="header_jackpot"
                      dangerouslySetInnerHTML={{ __html: jackpotDisplay }}
                  />
              </div>
          </header>
      );
  }
}

DynamicHeader.propTypes = {
    lotto: PropTypes.string.isRequired,
    jackpot: PropTypes.string,
    pickerStore: PropTypes.object.isRequired,
    numberOfNotFree: PropTypes.number.isRequired,
    t: PropTypes.func.isRequired
};

export default translate("headerDesktopText")(mobXConnect("pickerStore")(DynamicHeader));
