import React, {Component} from "react";
import {string, func} from "prop-types";
import {translate} from "react-i18next";

import lottoDataFacts from "./factLottoData";

import iconQuestion from "../../assets/Fact/icon/icon_question.svg"

class Fact extends Component {
    state = {
        text: lottoDataFacts[this.props.lotto][0]
    };

    render() {
        const {text} = this.state;
        const {t} = this.props;

        return (
            <section className="fact">
                <div className="cont-zone">
                    <img src={iconQuestion} alt="" className="fact_icon"/>
                    <h4 className="fact_title">{t("title")}</h4>
                    <p className="fact_text">{text}</p>
                </div>
            </section>
        )
    }
}

Fact.propTypes = {
    lotto: string.isRequired,
    t: func.isRequired
}

export default translate("factSectionText")(Fact);