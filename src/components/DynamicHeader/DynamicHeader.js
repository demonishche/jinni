import React, { Component } from "react";
import PropTypes from "prop-types";
import { mobXConnect } from "../../tools/toolFunctions";
import {translate} from "react-i18next";
import {
    apiHost
} from "../../tools/envSettings";

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

  generateLink = () => {
    const { data, urlData } = this.props;
    if (!data.Discount)
        return '';

      const link = `?incentiveId=${data.IncentiveID}&incentiveCode=${urlData.incentiveCode}&mc=${urlData.mc}&jlpid=${urlData.jlpid}&btag=${urlData.bTag}&campaign=${urlData.campaign}&referral=${urlData.referral}&Lang=${urlData.lang}&redirectUrl=cart&action=pay`;
    
      return `https://${apiHost}${link}`;
  }

  generateImegas = (count, item, itemIndex) => {
      let result = [];
      for (let i = 0; i < count; i++) {
        result.push(
            <div key={i} className="ticket-item">
                <img style={{transform: `rotate(${270 + 7*itemIndex + i*4}deg)`}} src={`http://images.jinnilotto.com/lp/scratchcards/${item.name}.png`} alt="pick" />
            </div>
        )
      }
      return result;
  }

  render() {
	  const { lotto, jackpot, numberOfNotFree, t, data } = this.props;
	  const {ticketsData} = this.props.pickerStore;
      const lottoData = this.state.lottoData;
      const jackpotDisplay = jackpot ? this.constructJackpot(jackpot) : undefined;

      return (
        <div className='container__header'>
            {lotto.toLowerCase() !== "scratchcards" ? (<div className={`headerWrapper`}>
                <div className="top-bar">
                    <div className="cont-zone">
                    <img src="./assets/logo/logo_jinni-loto.svg" width="117" height="58" alt="Lotto Jinni" className="top-bar_logo" />
                    </div>
                </div>
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
            </div>) : (
            <div className={`headerWrapper`}>
                <header className="header-scratch" style={{ backgroundImage: `url(./assets/Header/bg/scratch.png)` }}>
                    <div className="header-scratch-wrapper">
                        <div className="logo-scratch">
                            <img src="./assets/Header/logo/scratchcards.svg" alt="logo" />
                        </div>
                        <div className="scrath-text">
                            <p>{t("jinnisScratchcards")}</p>
                        </div>
                        <div className="title-scratch">
                            <p>{data.gamesCount} {t("scratchcardsGamesCount")} €{data.PackagePrice}</p>
                        </div>
                        <div className="under-title-text">
                            <p dangerouslySetInnerHTML={{__html:t("scratchcardsTitle", {data: data})}}></p>
                            <p>{t("scratchcardsSubtitle")}</p>
                        </div>
                        <div className="scratch-price">
                            <span className="old-preice">
                                <p className="text">{t("scratchcardsOldPrice")}</p>
                                <p className="price">€{data.OriginPrice}</p>
                            </span>
                            <span className="curent-price">
                                <p className="text">{t("scratchcardsNowOnly")} </p>
                                <p className="price">€{data.PackagePrice}</p>
                            </span>
                        </div>
                        <div className="scratch-button">
                            <a href={this.generateLink()}>{t("scratchcardsPlayNow")}</a>
                        </div>
                    </div>
                    {!!data.games ? (<div className="scratch-tickets">
                        {data.games.map((item, itemIndex) => {
                             return (
                                <div key={itemIndex} className="ticket">
                                    {
                                        this.generateImegas(item.entries, item, itemIndex)
                                    }
                                </div>
                             )
                        })}
                    </div>) : ''}
                </header>
            </div>)}
        </div>
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
