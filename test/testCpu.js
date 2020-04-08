import { buildInitialCpu, execOpcode, buildInitialGfx} from "../chip8/cpu";
import assert from "assert";

describe('Cpu Opcode 0x1nnn', function() {
    it('Should set PC to nnn', function () {
        const cpu = buildInitialCpu();
        for (let nnn = 0x0000; nnn <= 0x0FFF; nnn++) {
            const opcode = 0x1000 + nnn;
            execOpcode(opcode, cpu);
            assert.equal(nnn, cpu.PC);
        }
    });
});

describe('Gfx', function() {
    it('split byte into 2 adjacent bytes based on x position', function() {
        let first, second;
        let gfx = buildInitialGfx();

        const test_cases = [
            {'byte': 0xFF, 'x': 0, 'expected_first': 0xFF, 'expected_second': 0x00},
            {'byte': 0xFF, 'x': 1, 'expected_first': 0x7F, 'expected_second': 0x80},
            {'byte': 0xFF, 'x': 4, 'expected_first': 0x0F, 'expected_second': 0xF0},
            {'byte': 0xFF, 'x': 7, 'expected_first': 0x01, 'expected_second': 0xFE},
            {'byte': 0xFF, 'x': 9, 'expected_first': 0x7F, 'expected_second': 0x80},
            {'byte': 0xFF, 'x': 15, 'expected_first': 0x01, 'expected_second': 0xFE},
            {'byte': 0xFF, 'x': 128, 'expected_first': 0xFF, 'expected_second': 0x00},
        ];

        for (const test_case of test_cases) {
            [first, second] = gfx.splitByte(test_case.x, test_case.byte);
            assert.equal(first, test_case.expected_first);
            assert.equal(second, test_case.expected_second);
        }
    });

    it('Byte position from X and Y coordinates', function() {
        let gfx = buildInitialGfx();

        const test_cases = [
            {'x': 0, 'y': 0, 'expected': {'first': 0, 'second': 1}},
            {'x': 7, 'y': 0, 'expected': {'first': 0, 'second': 1}},

            {'x': 8, 'y': 0, 'expected': {'first': 1, 'second': 2}},
            {'x': 15, 'y': 0, 'expected': {'first': 1, 'second': 2}},

            {'x': 63, 'y': 0, 'expected': {'first': 7, 'second': 0}},
            {'x': 64, 'y': 0, 'expected': {'first': 0, 'second': 1}},

            {'x': 0, 'y': 1, 'expected': {'first': 8, 'second': 9}},
            {'x': 7, 'y': 1, 'expected': {'first': 8, 'second': 9}},

            {'x': 0, 'y': 2, 'expected': {'first': 16, 'second': 17}},

            {'x': 8, 'y': 2, 'expected': {'first': 17, 'second': 18}},

            {'x': 64, 'y': 32, 'expected': {'first': 0, 'second': 1}},
        ];

        for (const test_case of test_cases) {
            let [first_pos, second_pos] = gfx.posFromXY(test_case.x, test_case.y);
            assert.equal(first_pos, test_case.expected.first);
            assert.equal(second_pos, test_case.expected.second);
        }
    });

    it('Gfx setByte', function() {
        let gfx = buildInitialGfx();
        let changed;

        changed = gfx.setByte(4, 0, 0xFF);

        assert.equal(gfx.state[0], 0x0F);
        assert.equal(gfx.state[1], 0xF0);
        assert.equal(changed, false);

        changed = gfx.setByte(8, 0, 0xFF);

        assert.equal(gfx.state[0], 0x0F);
        assert.equal(gfx.state[1], 0x0F);
        assert.equal(changed, true);
    });
});
