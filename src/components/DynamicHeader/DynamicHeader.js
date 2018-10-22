import React, { Component } from "react";
import PropTypes from "prop-types";
import { mobXConnect } from "../../tools/toolFunctions";
import {translate} from "react-i18next";
import {
    apiHost
} from "../../tools/envSettings";

import allLottoData from "./headerLottoData";

import {roundDecimal, roundMillions, reverseString, mapStringToImages, roundBillions} from "./jackpotTools";

class DynamicHeader extends Component {
  state = {
      lottoData: allLottoData[this.props.lotto]
  };

  prevAngle = 0;

  constructJackpot = jackpot => {
      let jackpotReversed = reverseString(jackpot);
      
      const decimalString = jackpotReversed.slice(4,6);
      const roundedDecimalString = roundDecimal(decimalString);

      if (jackpotReversed.length > 9) {
        const billionsString = jackpotReversed.slice(6);
        const roundedBillionString = roundBillions(billionsString);
        return mapStringToImages(roundedBillionString, 'billion');  
      }
      else if (jackpotReversed.length > 6) {
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

      const link = `?incentiveId=${data.incentiveID}&incentiveCode=${data.incentiveCode}&mc=${urlData.mc}&jlpid=${urlData.jlpid}&btag=${urlData.bTag}&campaign=${urlData.campaign}&referral=${urlData.referral}&Lang=${urlData.lang}&redirectUrl=cart&action=pay`;
    
      return `https://${apiHost}${link}`;
  }

  generateImegas = (count, item, itemIndex, gamesCount) => {
    const { data } = this.props;
      const delta = 90 / data.gamesTypesCount;
      let result = [];
    
      if (this.prevAngle === 0) {
        this.prevAngle = 270 + delta/0.9*(0 - Math.floor(data.gamesTypesCount/2));
      } else {
          this.prevAngle = this.prevAngle + delta/3;
      }
      for (let i = 0; i < 3; i++) {
        this.prevAngle = this.prevAngle + 2;

        result.push(
            <div key={i} className="ticket-item">
                <img style={{transform: `rotate(${270 + delta/1.2*(itemIndex - Math.floor(data.gamesTypesCount/2))+ i*2}deg)`, left: (data.gamesTypesCount < 6 ? 80 : delta)*itemIndex, bottom: -60 - itemIndex*30}} src={`http://images.jinnilotto.com/lp/scratchcards/${item.name}.png`} alt="pick" />
                {/* {<img style={{transform: `rotate(${this.prevAngle}deg)`, left: (data.gamesTypesCount < 6 ? 80 : delta)*itemIndex, bottom: -60 - itemIndex*30}} src={`http://images.jinnilotto.com/lp/scratchcards/${item.name}.png`} alt="pick" />} */}
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
               {!data.jsonFormatError ? ( <header className="header-scratch" style={{ backgroundImage: `url(./assets/Header/bg/scratch.png)` }}>
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
                            <a href={this.generateLink()}>
                            <svg className='btnAnimation' version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 200 40" xmlSpace="preserve">
                                <defs>
                                    <polygon id="polyclip" points="-42.167,40 -230,40 -190,0 -2.167,0"/>
                                </defs>
                                <clipPath id="clipper">
                                    <use xlinkHref="#polyclip"  style={{overflow:'visible'}}/>
                                </clipPath>
                                <g style={{opacity:0.2, clipPath:'url(#clipper)'}}>
                                    <path style={{fill:'#FFFFFF'}} d="M200,20c0,11.046-8.954,20-20,20H20C8.954,40,0,31.046,0,20l0,0C0,8.954,8.954,0,20,0h160C191.046,0,200,8.954,200,20L200,20z"/>
                                </g>
                                <animateTransform xlinkHref="#polyclip" attributeName="transform" type="translate" from="-1000 0" to="2500 0" begin="0s" dur="3s" repeatCount="indefinite" />
                            </svg>
                            {t("scratchcardsPlayNow")}
                            </a>
                        </div>
                    </div>
                    {!!data.games ? (<div className="scratch-tickets">
                        {data.games.map((item, itemIndex) => {
                             return (
                                <div key={itemIndex} className="ticket">
                                    {
                                        this.generateImegas(item.entries, item, itemIndex, data.gamesCount)
                                    }
                                </div>
                             )
                        })}
                    </div>) : ''}
                </header>) : (
                    <header className="header-scratch jsonformatError__header" style={{ backgroundImage: `url(./assets/Header/bg/scratch.png)` }}>
                        <div className="header-scratch-wrapper">
                            <div className="logo-scratch">
                                <img src="./assets/Header/logo/scratchcards.svg" alt="logo" />
                            </div>
                            <div className="scrath-text">
                                <h2 className='jsonFormatError'>{t("wrongJsonFormat")}</h2>
                            </div>
                        </div>
                    </header>
                    )
                }
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
