import {MerchantConfig} from "../tgMdk/MerchantConfig";
import {describe} from "mocha"
import assert = require('power-assert');

describe('MerchantConfig Test', () => {

    it("need mask (some case pattern)", () => {
        assert.equal(MerchantConfig.isNeedMask("cardNumber"), true);
        assert.equal(MerchantConfig.isNeedMask("cardnumber"), true);
        assert.equal(MerchantConfig.isNeedMask("ReqCardNumber"), true);
        assert.equal(MerchantConfig.isNeedMask("REQCARDNUMBER"), true);
    });

    it("not need mask", () => {
        assert.equal(MerchantConfig.isNeedMask("foo"), false);
    });

    it("null and empty", () => {
        assert.equal(MerchantConfig.isNeedMask(""), false);
        assert.equal(MerchantConfig.isNeedMask(null), false);
    });

    it("useragent check", () => {
        assert.equal(MerchantConfig.userAgent, "VeriTrans 4G MDK/1.0.1/1.0.1 (TypeScript)")
    })

});