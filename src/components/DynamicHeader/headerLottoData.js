import megaBG from "../../assets/Header/bg/megamillions.png";
import megaBGMob from "../../assets/Header/mob-bg/megamillions.png";
import megaPeople from "../../assets/Header/people/megamillions.png";
import megaLogo from "../../assets/Header/logo/megamillions.png";

import euroMillBG from "../../assets/Header/bg/euromillions.png";
import euroMillBGMob from "../../assets/Header/mob-bg/euromillions.png";
import euroMillPeople from "../../assets/Header/people/euromillions.png";
import euroMillLogo from "../../assets/Header/logo/euromillions.png";

import euroJackBG from "../../assets/Header/bg/eurojackpot.png";
import euroJackBGMob from "../../assets/Header/mob-bg/eurojackpot.png";
import euroJackPeople from "../../assets/Header/people/eurojackpot.png";
import euroJackLogo from "../../assets/Header/logo/eurojackpot.png";

import powerballBG from "../../assets/Header/bg/powerball.png";
import powerballBGMob from "../../assets/Header/mob-bg/powerball.png";
import powerballPeople from "../../assets/Header/people/powerball.png";
import powerballLogo from "../../assets/Header/logo/powerball.png";

import lotto6aus49BG from "../../assets/Header/bg/6aus49.png";
import lotto6aus49BGMob from "../../assets/Header/mob-bg/powerball.png";
import lotto6aus49People from "../../assets/Header/people/6aus49.png";
import lotto6aus49Logo from "../../assets/Header/logo/6aus49.png";

import irishlottoBG from "../../assets/Header/bg/irishlotto.jpg";
import irishlottoBGMob from "../../assets/Header/mob-bg/irishlotto.jpg";
import irishlottoPeople from "../../assets/Header/people/irishlotto.png";
import irishlottoLogo from "../../assets/Header/logo/irishlotto.png";


import scratchcardsBG from "../../assets/Header/bg/scratch.png";
import scratchcardsBGMob from "../../assets/Header/mob-bg/scratch.png"

const allLottoData = {
    ["megamillions"]: {
        bg: megaBG,
        logo: megaLogo,
        currency: "$",
        bgMob: megaBGMob,
        people: megaPeople
    },
    ["euromillions"]: {
        bg: euroMillBG,
        logo: euroMillLogo,
        currency: "€",
        bgMob: euroMillBGMob,
        people: euroMillPeople
    },
    ["eurojackpot"]: {
        bg: euroJackBG,
        logo: euroJackLogo,
        currency: "€",
        bgMob: euroJackBGMob,
        people: euroJackPeople
    },
    ["powerball"]: {
        bg: powerballBG,
        logo: powerballLogo,
        currency: "€",
        bgMob: powerballBGMob,
        people: powerballPeople
    },
    ["6aus49"]: {
        bg: lotto6aus49BG,
        logo: lotto6aus49Logo,
        currency: "€",
        bgMob: lotto6aus49BGMob,
        people: lotto6aus49People
    },
    ["irishlottery"]: {
        bg: irishlottoBG,
        logo: irishlottoLogo,
        currency: "€",
        bgMob: irishlottoBGMob,
        people: irishlottoPeople
    },
    ["scratchcards"]: {
      bg: scratchcardsBG,
      // logo: irishlottoLogo,
      currency: "€",
      bgMob: scratchcardsBGMob
      // people: irishlottoPeople
    }
};


export default allLottoData;