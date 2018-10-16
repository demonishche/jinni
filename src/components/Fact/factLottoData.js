import i18n from "../../tools/i18nextSetup";
const factsData = i18n.t("factSectionText:facts", { returnObjects: true });

const lottoData = {
    "megamillions": factsData.megamillions,
    "euromillions": factsData.euromillions,
    "eurojackpot": factsData.eurojackpot,
    "powerball": factsData.powerball,
    "6aus49": factsData["6aus49"],
    "irishlottery": factsData.irishlottery,
    "scratchcards": factsData.scratchcards
};


export default lottoData