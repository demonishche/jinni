const stageHost = "stage-lp.jinnilotto.com";

const liveApi = "api.jinnilotto.com";
const stageApi = "stage-api.jinnilotto.com";

const liveRedirect = "jinnilotto.com";
const stageRedirect = "stage.jinnilotto.com";

import liveLottoParamsData from "./liveLottoParamsData";
import stageLottoParamsData from "./stageLottoParamsData";


const liveSettings = {
    apiHost: liveApi,
    redirectHost:liveRedirect,
    lottoParamsData: liveLottoParamsData
}

const stageSettings = {
    apiHost: stageApi,
    redirectHost:stageRedirect,
    lottoParamsData: stageLottoParamsData
}

module.exports = window.location.hostname.includes(stageHost) ? stageSettings : liveSettings;
// module.exports = liveSettings;