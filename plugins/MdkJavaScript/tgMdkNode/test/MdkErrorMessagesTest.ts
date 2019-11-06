import {MdkErrorMessages} from "../tgMdk/MdkErrorMessages";
import {describe} from "mocha"
import assert = require('power-assert');

describe('MdkErrorMessages Test', () => {

    it("replace pattern", () => {
        assert.equal(MdkErrorMessages.getValue("MA01", []), "{0} is missing in the Config file");
        assert.equal(MdkErrorMessages.getValue("MA01", null), "{0} is missing in the Config file");
        assert.equal(MdkErrorMessages.getValue("MA01", ["host"]), "host is missing in the Config file");
        assert.equal(MdkErrorMessages.getValue("MA02", ["foo", "bar"]), "foo value \"bar\" in the Config file is not correct");
        assert.equal(MdkErrorMessages.getValue("MA02", ["foo", "bar", "baz"]), "foo value \"bar\" in the Config file is not correct");
        assert.equal(MdkErrorMessages.getValue("MF06", ["foo"]), "502 Bad Gateway")
    });

    it("not replace pattern", () => {
        assert.equal(MdkErrorMessages.getValue("MA01"), "{0} is missing in the Config file");
        assert.equal(MdkErrorMessages.getValue("MF99"), "System internal error");
    });

    it("not found pattern", () => {
        assert.equal(MdkErrorMessages.getValue("MA00"), "message undefined: MA00");
    });

});