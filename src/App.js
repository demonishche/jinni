import React, {
    Component,
    Fragment
} from "react";
import Media from "react-media";
import {
    object,
    func
} from "prop-types";
import axios from "axios";
import {
    translate
} from "react-i18next";
import easyScroll from "easy-scroll";

import DynamicHeader from "./components/DynamicHeader/DynamicHeader";
import DynamicMobileHeader from "./components/DynamicHeader/DynamicMobileHeader";
import Help from "./components/Help/Help";
import Fact from "./components/Fact/Fact";
import NumberPicker from "./components/NumberPicker/PickerContainer";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import Footer from "./components/Footer/Footer";

import MultipleTicketsPicker from "./components/MultipleTicketsPicker/MultiPickerContainer";

import {
    lottoParamsData,
    apiHost
} from "./tools/envSettings";
import allPickerLottoData from "./components/NumberPicker/pickerLottoData";
import {
    getParamFromCookieOrUrl,
    getParamFromURL,
    mobXConnect
} from "./tools/toolFunctions";
import sendDataModule from "./tools/sendDataModule";

class App extends Component {
    state = {
        lotteryOrientation: "megamillions",
        pickerLottoData: null,
        lottoData: {},
        urlData: null,
        numberOfNotFree: null,
        documentReady: false
    };

    stratchcardsName = 'scratchcards';

    formRef = React.createRef();

    async componentDidMount() {
        await this.setUrlData();

        let feedObject = {};

        if (this.state.urlData.lotteryOrientation === 'scratchcards') {
            // let lottoData = this.stratchcards;
            this.getScratchcardsInfo();
            let pickerLottoData = allPickerLottoData[this.state.urlData.lotteryOrientation];

            this.setState({
                // lottoData,
                pickerLottoData
            });
        } else {
            axios
                .get("https://feed.jinnilotto.com/feed.json")
                .then(response => {
                    feedObject = response;
                    this.selectLottoData(feedObject.data);
                })
                .catch(error => {
                    console.log("feed.json retrieving error");
                    console.log(error);
                });
        }
    }

    getScratchcardsInfo() {
        let fetchData = {};
        let incentiveID = getParamFromURL("incentiveId");
        let incentiveCode = getParamFromURL("incentiveCode");
        const offer = getParamFromURL("offer");

        if (!incentiveID)
            location.href = location.origin;

        if (!incentiveCode && !offer) {
            location.href = location.origin;
            
            if (!incentiveCode) {
                incentiveCode = this.state.urlData.incentiveCode;
            }
        }

        let link = 'https://' + apiHost + '/affiliate/getPackageByIncentive/package.json?incentiveId=';
        axios
            .get(link + incentiveID)
            .then(response => {
                fetchData = response.data;

                this.stratchcardsName = 'scratchcards';

                let lottoData = {
                    DrawDate: "2018-10-18 18:55:00",
                    PackageID: fetchData.PackageID,
                    Jackpot: fetchData.TotalJackpotAmount,
                    PackagePrice: fetchData.PackagePrice,
                    OriginPrice: fetchData.OriginPrice,
                    Jackpot: fetchData.TotalJackpotAmount,
                    LotteryCurrency: fetchData.currency,
                    incentiveID: incentiveID,
                    incentiveCode: incentiveCode,
                    currency: fetchData.currecy || 'Euro',
                    LotteryName: 'scratchcards',
                    // RoundedJackpot: 12320000,
                    // TimeToResolve: 170399,
                    // TimeZone: "+11:0",
                    WinningResult: "",
                    Discount: fetchData.Discount,
                    gamesCount: 0,
                    gamesTypesCount: 0,
                }

                lottoData['games'] = fetchData.Items.map(item => {
                    lottoData.gamesCount += parseInt(item.NumberOfEntries);
                    lottoData.gamesTypesCount++;

                        return {
                            id: item.ItemID,
                            name: item.Game.GameID,
                            entries: item.NumberOfEntries
                        }
                })

                this.setState({
                    lottoData
                });
            })
            .catch(error => {
                console.log("feed.json retrieving error");
                console.log(error);
            });
    }

    isLottoEqual = _lottoName => {
        return this.state.lottoData.LotteryName.toLowerCase().replace(/\s/g, "") === _lottoName;
    }

    selectLottoData = data => {
        let lottoData = data.filter(object => {
            return (
                object.LotteryName.toLowerCase().replace(/\s/g, "") ===
                this.state.urlData.lotteryOrientation
            );
        })[0];
        let pickerLottoData = allPickerLottoData[this.state.urlData.lotteryOrientation];
        this.setState({
            lottoData,
            pickerLottoData
        });
    };

    setUrlData = async () => {
        const bTag = getParamFromCookieOrUrl("btag"),
            campaign = getParamFromCookieOrUrl("campaign"),
            couponCode = getParamFromCookieOrUrl("couponCode"),
            referral = getParamFromCookieOrUrl("referral"),
            mc = getParamFromCookieOrUrl("mc"),
            jlpid = getParamFromCookieOrUrl("jlpid"),
            lotteryOrientation = getParamFromURL("lottery").toLowerCase() || "euromillions",
            lang = getParamFromURL("lang") || "en",
            offer = getParamFromURL("offer").toLowerCase() || "freeticket",
            redirectUrl = getParamFromURL("redirectUrl") || "/cart",
            affiliateId = bTag.length > 0 ? bTag.substring(0, bTag.indexOf("_")) : "",
            incentiveCode =
            lottoParamsData[lotteryOrientation.toLowerCase()][`${offer}_incentiveCode`] ||
            "free_ticket_em",
            packageId = lottoParamsData[lotteryOrientation.toLowerCase()][`${offer}_packageId`] || "255";

        const numberOfTickets = this.setNumberOfTicketsInStore(offer);
        this.setNumberOfNotfreetickets(offer);

        const urlData = {
            bTag,
            couponCode,
            campaign,
            affiliateId,
            mc,
            jlpid,
            lotteryOrientation,
            lang,
            offer,
            incentiveCode,
            packageId,
            redirectUrl,
            referral: referral.length > 0 ? referral : window.location.href
        };

        const newUrlData = Object.assign({}, this.state.urlData, urlData);

        this.setState({
            urlData: newUrlData
        });
        this.getPrice(packageId, numberOfTickets);
    };

    getPrice = async (packageId, numberOfTickets = 1) => {
        const resp = await axios.get(
            `https://${apiHost}/affiliate/getPackage/response.json?packageId=${packageId}`
        );
        const data = resp.data;
        const price = (parseFloat(data.OnlinePrice) / numberOfTickets).toFixed(2);
        const currencySign = data.currency || 'Euro';

        const priceString = `${currencySign}${price}`;
        this.setState({
            price: priceString
        });
    };

    setNumberOfTicketsInStore = offer => {
        const {
            setNumberOfEmptyTickets
        } = this.props.pickerStore;
        let number = 1;

        if (offer.indexOf("freeticket") === -1) {
            number = parseInt(offer.substring(0, offer.indexOf("for")));
        }

        setNumberOfEmptyTickets(number);
        return number;
    };

    setNumberOfNotfreetickets = offer => {
        let number = 0;

        if (offer.indexOf("freeticket") === -1) {
            number = parseInt(offer.substring(offer.indexOf("for") + 3));
        }

        this.setState({
            numberOfNotFree: number
        });
    };

    openModal = index => {
        if (this.numberPicker.getWrappedInstance) {
            this.numberPicker.getWrappedInstance().wrappedInstance.openMobileModal(index);
        } else {
            this.numberPicker.wrappedInstance.openMobileModal(index);
        }
    };

    passDataToSendingModule = (formData, errorNode) => {
        const {
            lottoData,
            urlData,
            pickerLottoData
        } = this.state;
        const {
            ticketsData,
            checkIfAllTicketsAreFilled
        } = this.props.pickerStore;
        const {
            numbersAmount,
            bonusAmount
        } = pickerLottoData;
        const {
            t
        } = this.props;

        Object.keys(formData).forEach(key => formData[key].trim());

        let pickerInstance = undefined;

        if (this.numberPicker.getWrappedInstance) {
            pickerInstance = this.numberPicker.getWrappedInstance().wrappedInstance;
        } else {
            pickerInstance = this.numberPicker.wrappedInstance;
        }

        if (pickerInstance.state.hasError || pickerInstance.state.hasEmpty) {
            return;
        }

        if (!checkIfAllTicketsAreFilled(numbersAmount, bonusAmount)) {
            errorNode.classList.add("-shown");
            errorNode.innerHTML = t("notFilledTicketsError");
            return;
        }

        const data = Object.assign({},
            formData, {
                lotteryId: lottoData.LotteryID,
                lotteryOrientation: urlData.lotteryOrientation,
                ticketsData
            },
            urlData
        );
        sendDataModule.prepareDataToSend(data, errorNode);
    };

    scrollToForm = () => {
        const formFrame = this.formRef.current.getWrappedInstance().formFrame.current;

        easyScroll({
            scrollableDomEle: window,
            direction: "bottom",
            duration: 500,
            easingPreset: "easeInQuad",
            scrollAmount: formFrame.offsetTop - window.scrollY
        });
    };

    render() {
        const {lottoData, urlData} = this.state;
        const {t} = this.props;
        if (!urlData) {
            return <div className="loader" />;
        }
  
        const {offer} = urlData;
        const lottoName = lottoData.LotteryName ? lottoData.LotteryName.toLowerCase().replace(/\s/g, "") : urlData.lotteryOrientation;
        const lottoNameOrginal = lottoData.LotteryName ? lottoData.LotteryName : "";
        // const lottoName = urlData.lotteryOrientation;
  
        const drawDateString = lottoData.DrawDate
            ? `${lottoData.DrawDate} ${lottoData.TimeZone}`
            : undefined;
        const jackpotString = lottoData.Jackpot ? lottoData.Jackpot.toString() : undefined;
  
        return (
            <Fragment>
                <Media query="(min-width: 768px)">
                    {matches =>
                        matches ? (
                            <DynamicHeader
                                lotto={lottoName}
                                jackpot={jackpotString}
                                offer={offer}
                                numberOfNotFree={this.state.numberOfNotFree}
                                data={this.state.lottoData}
                                urlData={this.state.urlData}
                            />
                        ) : (
                            <DynamicMobileHeader
                                lotto={lottoName}
                                jackpot={jackpotString}
                                modalOpenHandler={this.openModal}
                                numberOfNotFree={this.state.numberOfNotFree}
                                price={this.state.price}
                                data={this.state.lottoData}
                                urlData={this.state.urlData}
                            />
                        )
                    }
                </Media>
                <div className={`main ${lottoName.toLowerCase() === this.stratchcardsName ? "main--hidden" : ""}`}>
                    <div className="cont-zone">
                        {offer === "freeticket" && (
                            <h1
                                className="main_title"
                                dangerouslySetInnerHTML={{__html: t("freeticketMainTitle")}}
                            />
                        )}
                        <div className={`main_subwrap ${offer !== "freeticket" ? "-vertical" : ""}`}>
                            {offer !== "freeticket" ? (
                                <MultipleTicketsPicker
                                    scrollAppToForm={this.scrollToForm}
                                    lotto={lottoName}
                                    numberOfNotFree={this.state.numberOfNotFree}
                                    ref={picker => (this.numberPicker = picker)}
                                    price={this.state.price}
                                />
                            ) : (
                                <NumberPicker
                                    scrollAppToForm={this.scrollToForm}
                                    lotto={lottoName}
                                    ref={picker => (this.numberPicker = picker)}
                                />
                            )}
                            <RegisterForm
                                ref={this.formRef}
                                offer={offer}
                                submitHandler={this.passDataToSendingModule}
                            />
                        </div>
                    </div>
                </div>
                <Help
                    offer={offer}
                    numberOfNotFree={this.state.numberOfNotFree}
                    lotto={lottoName}
                    lottoOriginal={lottoNameOrginal}
                    drawDate={drawDateString}
                />
                {lottoName.toLowerCase() !== this.stratchcardsName ? (<Fact lotto={lottoName} />) : ''}
                <Footer offer={offer} lotto={lottoName} />
            </Fragment>
        );
    }
  }
  
  App.propTypes = {
      pickerStore: object.isRequired,
      t: func.isRequired
  };
  
  export default translate("AppText")(mobXConnect("pickerStore")(App));