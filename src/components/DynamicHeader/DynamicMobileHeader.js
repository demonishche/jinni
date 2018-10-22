import React, {Component} from "react";
import {string, func, object, number} from "prop-types";
import {translate} from "react-i18next";
import {
    apiHost
} from "../../tools/envSettings";

import headerLottoData from "./headerLottoData";
import pickerLottoData from "../NumberPicker/pickerLottoData";
import {roundDecimal, roundMillions, reverseString, roundBillions} from "./jackpotTools";
import {mobXConnect} from "../../tools/toolFunctions";

const liveHost = "lp.jinnilotto.com";

class DynamicMobileHeader extends Component {
  state = {
      lottoData: headerLottoData[this.props.lotto],
      pickerLottoData: pickerLottoData[this.props.lotto]
  };

  formatJackpot = jackpot => {
      const {lottoData} = this.state;
      const {t} = this.props;

      let jackpotReversed = reverseString(jackpot);

      const decimalString = jackpotReversed.slice(4, 6);
      const roundedDecimalString = roundDecimal(decimalString);

      if (jackpotReversed.length > 9) {
        const billionsString = jackpotReversed.slice(6);
        const roundedBillionString = roundBillions(billionsString);
        return `${lottoData.currency} ${reverseString(roundedBillionString)} ${t("billion")}`;
      }
      if (jackpotReversed.length > 6) {
          const millionsString = jackpotReversed.slice(6);

          if (
              millionsString.length >= 3 ||
        Number(roundedDecimalString) >= 10 ||
        Number(roundedDecimalString) === 0
          ) {
              const roundedMillionsString = roundMillions(millionsString, roundedDecimalString);
              return `${lottoData.currency}
			  ${reverseString(roundedMillionsString)} ${t("million")}`;
          } else {
              return `${lottoData.currency}
			  ${reverseString(roundedDecimalString.charAt(0) + "." + millionsString)} ${t("million")}`;
          }
      } else {
          return `${lottoData.currency}
		  ${reverseString(roundedDecimalString.charAt(0) + ".0")} ${t("million")}`;
      }
  };

  formatJackpotString = jackpotString => {
      let reversedJackpotArray = jackpotString.split("").reverse();

      reversedJackpotArray.forEach((symbol, index) => {
          let actualIndex = index + 1;
          if (actualIndex % 3 === 0 && actualIndex !== reversedJackpotArray.length) {
              reversedJackpotArray[index] = `,${symbol}`;
          }
      });

      return reversedJackpotArray.reverse().join("");
  };

  generateNumsCircles = pickedNums => {
      const numCircles = [];
      const {numbersAmount} = this.state.pickerLottoData;

      for (let x = 1; x <= numbersAmount; x++) {
          const number = pickedNums.length >= x ? pickedNums[x - 1] : undefined;
          const classString = `numbers-widget_circle -num-circle${number ? " -filled" : ""}`;
          numCircles.push(
              <div key={x} className={classString}>
                  {number}
              </div>
          );
      }
      return numCircles;
  };

  generateBonusCircles = pickedBonus => {
      const numCircles = [];
      const {bonusAmount} = this.state.pickerLottoData;

      for (let x = 1; x <= bonusAmount; x++) {
          const number = pickedBonus.length >= x ? pickedBonus[x - 1] : undefined;
          const classString = `numbers-widget_circle -bonus-circle${
              isFinite(number) ? " -filled" : ""
          }`;
          numCircles.push(
              <div key={x} className={classString}>
                  {number}
              </div>
          );
      }
      return numCircles;
  };

  generateLink = () => {
    const { data, urlData } = this.props;
    if (!data.Discount)
        return '';

      const link = `?incentiveId=${data.incentiveID}&incentiveCode=${data.incentiveCode}&mc=${urlData.mc}&jlpid=${urlData.jlpid}&btag=${urlData.bTag}&campaign=${urlData.campaign}&referral=${urlData.referral}&Lang=${urlData.lang}&redirectUrl=cart&action=pay`

        return `https://${apiHost}${link}`;
  }

  generateImegas = (count, item, itemIndex) => {
    const { data } = this.props;
      const delta = 90 / data.gamesTypesCount;
      let result = [];
      for (let i = 0; i < 3; i++) {
        result.push(
            <div key={i} className="ticket-item">
                <img style={{transform: `rotate(${270 + delta*(itemIndex - Math.floor(data.gamesTypesCount/2))+ i*2}deg)`, left: /*(delta < 30 ? 30 : delta)**/itemIndex + '%', bottom: -60 - itemIndex*30}} src={`http://images.jinnilotto.com/lp/scratchcards/${item.name}.png`} alt="pick" />
            </div>
        )
      }
      return result;
  }

  render() {
      const {lotto, jackpot, modalOpenHandler, numberOfNotFree, price, t, data} = this.props;
      const {ticketsData, clearTicket} = this.props.pickerStore;
      const {lottoData, pickerLottoData} = this.state;
      const jackpotString = jackpot ? this.formatJackpot(jackpot) : undefined;

      return (
        <div className='container__header'>
            {lotto.toLowerCase() !== "scratchcards" ? (<div className={`headerWrapper`}>
                <div className="top-bar">
                    <div className="cont-zone">
                    <img src="./assets/logo/logo_jinni-loto.svg" width="117" height="58" alt="Lotto Jinni" className="top-bar_logo" />
                    </div>
                </div>
                <header className="mob-header" style={{backgroundImage: `url(${lottoData.bgMob})`}}>
                    <div className="cont-zone">
                        <img className="mob-header_logo" src={lottoData.logo} alt={lotto} />
                        {numberOfNotFree === 0 ? (
                            <h2
                                className="mob-header_title"
                                dangerouslySetInnerHTML={{__html: t("freeticketTitle")}}
                            />
                        ) : (
                            <h2
                                className="mob-header_title"
                                dangerouslySetInnerHTML={{
                                    __html: t("notfreeTitle", {numberOfTickets: ticketsData.length, numberOfNotFree})
                                }}
                            />
                        )}
                        <h3 className="mob-header_jackpot">{`${jackpotString}`}</h3>
                        {ticketsData.map((ticket, index) => (
                            <div
                                key={`ticket-widget-${index}`}
                                className={`numbers-widget -theme_${pickerLottoData.ballsTheme}`}>
                                {this.generateNumsCircles(ticket.pickedNums).map(circle => circle)}
                                {this.generateBonusCircles(ticket.pickedBonus).map(circle => circle)}
                                <button
                                    className="numbers-widget_btn -edit-btn"
                                    onClick={() => modalOpenHandler(index)}
                                />
                                {numberOfNotFree === 0 ? (
                                    <button
                                        className="numbers-widget_btn -clear-btn"
                                        onClick={() => clearTicket(index)}
                                    />
                                ) : index + 1 > numberOfNotFree ? (
                                    <p className="numbers-widget_text">{t("freeLabel")}</p>
                                ) : (
                                    <p className="numbers-widget_text">{price}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </header>
            </div>) : (
                <div className={`headerWrapper`}>
                 {!data.jsonFormatError ? (<header className="header-scratch" style={{ backgroundImage: `url(./assets/Header/bg/scratch.png)` }}>
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
                                <g style={{opacity:0.2, 'clip-path':'url(#clipper)'}}>
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
                                        this.generateImegas(item.entries, item, itemIndex)
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
                                <h2 className='jsonFormatError jsonFormatError--mobile'>{t("wrongJsonFormat")}</h2>
                            </div>
                        </div>
                    </header>
                    )
                 }
            </div>
            )}
        </div>
      );
  }
}

DynamicMobileHeader.propTypes = {
    lotto: string.isRequired,
    jackpot: string,
    price: string,
    modalOpenHandler: func.isRequired,
    pickerStore: object.isRequired,
    numberOfNotFree: number.isRequired,
    t: func.isRequired,
    i18n: object.isRequired
};

export default translate("headerMobileText")(mobXConnect("pickerStore")(DynamicMobileHeader));
