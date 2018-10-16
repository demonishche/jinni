import React from "react";
import {string, func} from "prop-types";
import {translate} from "react-i18next";

const Footer = ({offer, t, i18n}) => {
    const termsPages = {
        "freeticket": "1-ticket-free",
        "freeticketv2": "1-ticket-free",
        "4for1": "four-for-one",
        "4for2": "four-for-two",
        "3for1": "three-for-one",
        "2for1": "two-for-one",
        "6for3": "six-for-three",
        "10for5": "ten-for-five",
        "5for2": "five-for-two"
    }

    const linkLang = i18n.language;

    return (
        <footer className="footer">
            <section className="footer_affiliates">
                <div className="cont-zone">
                    <div className="footer_affiliates_sub-wrap">
                        <div>
                            <img src="./assets/logo/logo_18+.png" alt="18+" />
                        </div>
                        <div>
                            <img src="./assets/logo/logo_problem.png" alt="Gamcare: Problem Gaming Support" />
                        </div>
                        <div>
                            <img src="./assets/logo/logo_Isle-of-Man.png" alt="Isle of Man" />
                        </div>
                        <div className="hide-big">
                            <img src="./assets/logo/logo_secure-mob.svg" alt="Secure SSL encryption" />
                        </div>
                        <div target="_blank">
                            <img src="./assets/logo/logo_IBAS.png" alt="I.B.A.S." />
                        </div>
                        <div className="hide-sm">
                            <img src="./assets/logo/logo_secure.png" alt="Secure SSL encryption" />
                        </div>
                        {/*<div className="footer-logo">*/}
                          {/*<img src="./assets/logo/logo_jinni-loto.svg" alt="Logo"/>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </section>
            <section className="footer_copyright">
                <div className="cont-zone">
                    <a className="footer_terms-link" href={`https://jinnilotto.com/${linkLang}/${termsPages[offer]}`} target="_blank"><h6>{t("title")}</h6></a>
                    <div dangerouslySetInnerHTML={{__html:t("textHtml", {returnObjects: true}).join("")}}></div>
                </div>
            </section>
        </footer>
    )
};

Footer.propTypes = {
    offer: string,
    t: func.isRequired
};

export default translate("footerText")(Footer);