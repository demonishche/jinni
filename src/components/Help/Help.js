import React from "react";
import { string, number, object, func } from "prop-types";
import Media from "react-media";
import { mobXConnect } from "../../tools/toolFunctions";
import {translate} from "react-i18next";

import Timer from "./Timer";

import pickerLottoData from "../NumberPicker/pickerLottoData";
import helpLottoData from "./helpLottoData";

import iconArrow from "../../assets/Help/icons/ic_arrow.svg";
import iconPick from "../../assets/Help/icons/ic_pick.svg";
import iconGet from "../../assets/Help/icons/ic_get.svg";
import iconCollect from "../../assets/Help/icons/ic_collect.svg";
import iconScratch from "../../assets/Help/icons/ic_lotto.png";

const Help = ({ drawDate, lotto, lottoOriginal, offer, pickerStore, numberOfNotFree, t }) => {

    const lottoSelector = lotto.toLowerCase().replace(/\s/g, "");

    const currHelpLottoData = helpLottoData[lottoSelector];
    const currPickerLottoData = pickerLottoData[lottoSelector];
    console.log(lottoSelector)
    return (
        <section className="help">
            <div className="cont-zone">
                <h2 className="help_title">{t("title", {lotteryName: lottoOriginal})}</h2>
                <div className="help_subwrap">
                    <div className="help_step">
                        <img src={iconPick} alt="" className="help_step_icon" />
                        <h4 className="help_step_title">{lotto !== 'scratchcards' ? t("firstStepTitle") : t("firstStepScratchTitle")}</h4>
                        {currHelpLottoData.firstStep(currPickerLottoData)}
                    </div>
                    <img src={iconArrow} alt="next" className="help_arrow" />
                    {offer.indexOf("freeticket") !== -1 ? (
                        <div className="help_step">
                            <img src={lotto !== 'scratchcards' ? iconGet : iconScratch} alt="" className="help_step_icon" />
                            <h4 className="help_step_title">{lotto !== 'scratchcards' ? t("secondStep.freeticket.title") : t("secondStep.ScratchSecondStep.title")}</h4>
                            <Media query="(min-width: 768px)">
                                {matches =>
                                    matches ? (
                                        <p className="help_step_text" dangerouslySetInnerHTML={{__html: lotto !== 'scratchcards' ? t("secondStep.freeticket.text.desktop") : t("secondStep.ScratchSecondStep.text")}}>
                                        </p>
                                    ) : (
                                        <p className="help_step_text" dangerouslySetInnerHTML={{__html: lotto !== 'scratchcards' ? t("secondStep.freeticket.text.mobile") : t("secondStep.ScratchSecondStep.text")}}>
                                        </p>
                                    )
                                }
                            </Media>
                        </div>
                    ) : (
                        <div className="help_step">
                            <img src={lotto !== 'scratchcards' ? iconGet : iconScratch} alt="" className="help_step_icon" />
                            <h4 className="help_step_title">
                                {lotto !== 'scratchcards' ? t("secondStep.notfree.title", {numberOfFreeLines: pickerStore.ticketsData.length - numberOfNotFree}) : t("secondStep.ScratchSecondStep.title")}
                            </h4>
                            <p className="help_step_text" dangerouslySetInnerHTML={{__html: lotto !== 'scratchcards' ? (
                                t("secondStep.notfree.text", {numberOfTickets: pickerStore.ticketsData.length, numberOfNotFree:numberOfNotFree})
                                ) : t("secondStep.ScratchSecondStep.text")}}>
                            </p>
                        </div>
                    )}
                    <img src={iconArrow} alt="next" className="help_arrow" />
                    <div className="help_step">
                        <img src={iconCollect} alt="" className="help_step_icon" />
                        <h4 className="help_step_title">{lotto !== 'scratchcards' ? t("thirdStep.title") : t("thirdStep.thirdScratchTitle")}</h4>
                        <Timer lotto={lottoSelector} drawDate={drawDate} />
                    </div>
                </div>
            </div>
        </section>
    );
};

Help.propTypes = {
    drawDate: string,
    lotto: string.isRequired,
    lottoOriginal: string,
    offer: string.isRequired,
    pickerStore: object.isRequired,
    numberOfNotFree: number.isRequired,
    t: func.isRequired
};

export default translate("helpSectionText")(mobXConnect("pickerStore")(Help));
