const disassembler = require("../utils/disassembler");
const assert = require('assert');

describe('Disassembler', function() {
    it('Translate opcode', function() {
        assert.equal(disassembler.translateOpcode(0x00E0), '00E0: CLS');
        assert.equal(disassembler.translateOpcode(0x00EE), '00EE: RET');

        assert.equal(disassembler.translateOpcode(0x1000), '1000: JP 0x000');
        assert.equal(disassembler.translateOpcode(0x1FFF), '1FFF: JP 0xFFF');

        assert.equal(disassembler.translateOpcode(0x2000), '2000: CALL 0x000');
        assert.equal(disassembler.translateOpcode(0x2FFF), '2FFF: CALL 0xFFF');

        assert.equal(disassembler.translateOpcode(0x3000), '3000: SE V0, 0x00');
        assert.equal(disassembler.translateOpcode(0x3FFF), '3FFF: SE VF, 0xFF');

        assert.equal(disassembler.translateOpcode(0x4000), '4000: SNE V0, 0x00');
        assert.equal(disassembler.translateOpcode(0x4FFF), '4FFF: SNE VF, 0xFF');

        assert.equal(disassembler.translateOpcode(0x5000), '5000: SE V0, V0');
        assert.equal(disassembler.translateOpcode(0x5FFF), '5FFF: SE VF, VF');

        assert.equal(disassembler.translateOpcode(0x6000), '6000: LD V0, 0x00');
        assert.equal(disassembler.translateOpcode(0x6FFF), '6FFF: LD VF, 0xFF');

        assert.equal(disassembler.translateOpcode(0x7000), '7000: ADD V0, 0x00');
        assert.equal(disassembler.translateOpcode(0x7FFF), '7FFF: ADD VF, 0xFF');

        assert.equal(disassembler.translateOpcode(0x8000), '8000: LD V0, V0');
        assert.equal(disassembler.translateOpcode(0x80F0), '80F0: LD V0, VF');
        assert.equal(disassembler.translateOpcode(0x8FF0), '8FF0: LD VF, VF');

        assert.equal(disassembler.translateOpcode(0x8001), '8001: OR V0, V0');
        assert.equal(disassembler.translateOpcode(0x80F1), '80F1: OR V0, VF');
        assert.equal(disassembler.translateOpcode(0x8FF1), '8FF1: OR VF, VF');

        assert.equal(disassembler.translateOpcode(0x8002), '8002: AND V0, V0');
        assert.equal(disassembler.translateOpcode(0x80F2), '80F2: AND V0, VF');
        assert.equal(disassembler.translateOpcode(0x8FF2), '8FF2: AND VF, VF');

        assert.equal(disassembler.translateOpcode(0x8003), '8003: XOR V0, V0');
        assert.equal(disassembler.translateOpcode(0x80F3), '80F3: XOR V0, VF');
        assert.equal(disassembler.translateOpcode(0x8FF3), '8FF3: XOR VF, VF');

        assert.equal(disassembler.translateOpcode(0x8004), '8004: ADD V0, V0');
        assert.equal(disassembler.translateOpcode(0x80F4), '80F4: ADD V0, VF');
        assert.equal(disassembler.translateOpcode(0x8FF4), '8FF4: ADD VF, VF');

        assert.equal(disassembler.translateOpcode(0x8005), '8005: SUB V0, V0');
        assert.equal(disassembler.translateOpcode(0x80F5), '80F5: SUB V0, VF');
        assert.equal(disassembler.translateOpcode(0x8FF5), '8FF5: SUB VF, VF');

        assert.equal(disassembler.translateOpcode(0x8006), '8006: SHR V0 {, V0}');
        assert.equal(disassembler.translateOpcode(0x80F6), '80F6: SHR V0 {, VF}');
        assert.equal(disassembler.translateOpcode(0x8FF6), '8FF6: SHR VF {, VF}');

        assert.equal(disassembler.translateOpcode(0x8007), '8007: SUBN V0, V0');
        assert.equal(disassembler.translateOpcode(0x80F7), '80F7: SUBN V0, VF');
        assert.equal(disassembler.translateOpcode(0x8FF7), '8FF7: SUBN VF, VF');

        assert.equal(disassembler.translateOpcode(0x800E), '800E: SHL V0 {, V0}');
        assert.equal(disassembler.translateOpcode(0x80FE), '80FE: SHL V0 {, VF}');
        assert.equal(disassembler.translateOpcode(0x8FFE), '8FFE: SHL VF {, VF}');

        assert.equal(disassembler.translateOpcode(0x9000), '9000: SNE V0, V0');
        assert.equal(disassembler.translateOpcode(0x9FFF), '9FFF: SNE VF, VF');

        assert.equal(disassembler.translateOpcode(0xA000), 'A000: LD I, 0x000');
        assert.equal(disassembler.translateOpcode(0xAFFF), 'AFFF: LD I, 0xFFF');

        assert.equal(disassembler.translateOpcode(0xB000), 'B000: JP V0, 0x000');
        assert.equal(disassembler.translateOpcode(0xBFFF), 'BFFF: JP V0, 0xFFF');

        assert.equal(disassembler.translateOpcode(0xC000), 'C000: RND V0, 0x00');
        assert.equal(disassembler.translateOpcode(0xCFFF), 'CFFF: RND VF, 0xFF');

        assert.equal(disassembler.translateOpcode(0xDABF), 'DABF: DRW VA, VB, 0xF');

        assert.equal(disassembler.translateOpcode(0xE09E), 'E09E: SKP V0');
        assert.equal(disassembler.translateOpcode(0xE0A1), 'E0A1: SKNP V0');

        assert.equal(disassembler.translateOpcode(0xF007), 'F007: LD V0, DT');
        assert.equal(disassembler.translateOpcode(0xFF07), 'FF07: LD VF, DT');

        assert.equal(disassembler.translateOpcode(0xF00A), 'F00A: LD V0, K');
        assert.equal(disassembler.translateOpcode(0xFF0A), 'FF0A: LD VF, K');

        assert.equal(disassembler.translateOpcode(0xF015), 'F015: LD DT, V0');
        assert.equal(disassembler.translateOpcode(0xFF15), 'FF15: LD DT, VF');

        assert.equal(disassembler.translateOpcode(0xF018), 'F018: LD ST, V0');
        assert.equal(disassembler.translateOpcode(0xFF18), 'FF18: LD ST, VF');

        assert.equal(disassembler.translateOpcode(0xF01E), 'F01E: ADD I, V0');
        assert.equal(disassembler.translateOpcode(0xFF1E), 'FF1E: ADD I, VF');

        assert.equal(disassembler.translateOpcode(0xF029), 'F029: ADD F, V0');
        assert.equal(disassembler.translateOpcode(0xFF29), 'FF29: ADD F, VF');

        assert.equal(disassembler.translateOpcode(0xF033), 'F033: LD B, V0');
        assert.equal(disassembler.translateOpcode(0xFF33), 'FF33: LD B, VF');

        assert.equal(disassembler.translateOpcode(0xF055), 'F055: LD [I], V0');
        assert.equal(disassembler.translateOpcode(0xFF55), 'FF55: LD [I], VF');

        assert.equal(disassembler.translateOpcode(0xF065), 'F065: LD V0, [I]');
        assert.equal(disassembler.translateOpcode(0xFF65), 'FF65: LD VF, [I]');

    });
});