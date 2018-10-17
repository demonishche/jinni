import React from "react";
import i18n from "../../tools/i18nextSetup";

const lottoData = {
    /* eslint-disable react/display-name */
    /* eslint-disable react/no-unescaped-entities*/
    megamillions: {
        firstStep: pickerData => (
            <p className="help_step_text" dangerouslySetInnerHTML={{__html: i18n.t("helpSectionText:firstStepText.megamillions", 
                {numbersAmount: pickerData.numbersAmount, bonusAmount: pickerData.bonusAmount, maxNumber: pickerData.maxNumber, maxBonus:pickerData.maxBonus, bonusName: pickerData.bonusAmount <= 1 ? pickerData.bonusName : pickerData.pluralBonusName})}}>
            </p>
        ),
        desktop: timeRemains => (
            <p className="help_step_text" dangerouslySetInnerHTML={{__html: i18n.t("helpSectionText:thirdStep.text.megamillions.desktop", 
                {timeRemains})}}>
            </p>
        ),
        mobile: timeRemains => (
            <p className="help_step_text" dangerouslySetInnerHTML={{__html: i18n.t("helpSectionText:thirdStep.text.megamillions.mobile", 
                {timeRemains})}}>
            </p>
        )
    },
    euromillions: {
        firstStep: pickerData => (
            <p className="help_step_text" dangerouslySetInnerHTML={{__html: i18n.t("helpSectionText:firstStepText.euromillions", 
                {numbersAmount: pickerData.numbersAmount, bonusAmount: pickerData.bonusAmount, bonusName: pickerData.bonusAmount <= 1 ? pickerData.bonusName : pickerData.pluralBonusName})}}>
            </p>
        ),
        desktop: timeRemains => (
            <p className="help_step_text" dangerouslySetInnerHTML={{__html: i18n.t("helpSectionText:thirdStep.text.euromillions.desktop", 
                {timeRemains})}}>
            </p>
        ),
        mobile: timeRemains => (
            <p className="help_step_text" dangerouslySetInnerHTML={{__html: i18n.t("helpSectionText:thirdStep.text.euromillions.mobile", 
                {timeRemains})}}>
            </p>
        )
    },
    eurojackpot: {
        firstStep: pickerData => (
            <p className="help_step_text" dangerouslySetInnerHTML={{__html: i18n.t("helpSectionText:firstStepText.eurojackpot", 
                {numbersAmount: pickerData.numbersAmount, bonusAmount: pickerData.bonusAmount, maxNumber: pickerData.maxNumber, maxBonus:pickerData.maxBonus, minBonus: pickerData.minBonus, bonusName: pickerData.bonusAmount <= 1 ? pickerData.bonusName : pickerData.pluralBonusName})}}>
            </p>
        ),
        desktop: timeRemains => (
            <p className="help_step_text" dangerouslySetInnerHTML={{__html: i18n.t("helpSectionText:thirdStep.text.eurojackpot.desktop", 
                {timeRemains})}}>
            </p>
        ),
        mobile: timeRemains => (
            <p className="help_step_text" dangerouslySetInnerHTML={{__html: i18n.t("helpSectionText:thirdStep.text.eurojackpot.mobile", 
                {timeRemains})}}>
            </p>
        )
    },
    powerball: {
        firstStep: pickerData => (
            <p className="help_step_text" dangerouslySetInnerHTML={{__html: i18n.t("helpSectionText:firstStepText.eurojackpot", 
                {numbersAmount: pickerData.numbersAmount, maxNumber: pickerData.maxNumber, bonusName:pickerData.bonusName, maxBonus: pickerData.maxBonus, minBonus: pickerData.minBonus})}}>
            </p>
        ),
        desktop: timeRemains => (
            <p className="help_step_text" dangerouslySetInnerHTML={{__html: i18n.t("helpSectionText:thirdStep.text.powerball.desktop", 
                {timeRemains})}}>
            </p>
        ),
        mobile: timeRemains => (
            <p className="help_step_text" dangerouslySetInnerHTML={{__html: i18n.t("helpSectionText:thirdStep.text.powerball.mobile", 
                {timeRemains})}}>
            </p>
        )
    },
    ["6aus49"]: {
        firstStep: pickerData => (
            <p className="help_step_text" dangerouslySetInnerHTML={{__html: i18n.t("helpSectionText:firstStepText.eurojackpot", 
                {numbersAmount: pickerData.numbersAmount, maxNumber: pickerData.maxNumber, bonusName: pickerData.bonusAmount <= 1 ? pickerData.bonusName : pickerData.pluralBonusName, maxBonus:pickerData.maxBonus, minBonus: pickerData.minBonus})}}>
            </p>
        ),
        desktop: timeRemains => (
            <p className="help_step_text" dangerouslySetInnerHTML={{__html: i18n.t("helpSectionText:thirdStep.text.6aus49.desktop", 
                {timeRemains})}}>
            </p>
        ),
        mobile: timeRemains => (
            <p className="help_step_text" dangerouslySetInnerHTML={{__html: i18n.t("helpSectionText:thirdStep.text.6aus49.mobile", 
                {timeRemains})}}>
            </p>
        )
    },
    "irishlottery": {
        firstStep: pickerData => (
            <p className="help_step_text" dangerouslySetInnerHTML={{__html: i18n.t("helpSectionText:firstStepText.irishlottery",
                {numbersAmount: pickerData.numbersAmount, maxNumber: pickerData.maxNumber})}}>
            </p>
        ),
        desktop: timeRemains => (
            <p className="help_step_text" dangerouslySetInnerHTML={{__html: i18n.t("helpSectionText:thirdStep.text.irishlottery.desktop",
                {timeRemains})}}>
            </p>
        ),
        mobile: timeRemains => (
            <p className="help_step_text" dangerouslySetInnerHTML={{__html: i18n.t("helpSectionText:thirdStep.text.irishlottery.mobile",
                {timeRemains})}}>
            </p>
        )
    },

  "scratchcards": {
    firstStep: pickerData => (
     <p className="help_step_text" dangerouslySetInnerHTML={{__html: i18n.t("helpSectionText:firstStepText.scratchcards",
        {numbersAmount: pickerData.numbersAmount, maxNumber: pickerData.maxNumber})}}>
     </p>
    ),
    desktop: timeRemains => (
     <p className="help_step_text" dangerouslySetInnerHTML={{__html: i18n.t("helpSectionText:thirdStep.text.scratchcards.desktop",
        {timeRemains})}}>
     </p>
    ),
    mobile: timeRemains => (
     <p className="help_step_text" dangerouslySetInnerHTML={{__html: i18n.t("helpSectionText:thirdStep.text.scratchcards.mobile",
        {timeRemains})}}>
     </p>
    )
  },


};

export default lottoData;
