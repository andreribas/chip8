export function translateOpcode (opcode) {
    const nnn = opcode & 0x0FFF;
    const kk = opcode & 0x00FF;
    const x = (opcode & 0x0F00) >> 8;
    const y = (opcode & 0x00F0) >> 4;
    const n = opcode & 0x000F;

    const hex = function(value, left_pad = 0) {
        return value.toString(16).padStart(left_pad, "0").toUpperCase();
    };

    switch (opcode & 0xF000) {
        case 0x0000:
            switch (nnn) {
                case 0x0E0: return `${hex(opcode, 4)}: CLS`;
                case 0x0EE: return `${hex(opcode, 4)}: RET`;
                default: return `${hex(opcode, 4)}: `;
            }
        case 0x1000: return `${hex(opcode, 4)}: JP 0x${hex(nnn, 3)}`;
        case 0x2000: return `${hex(opcode, 4)}: CALL 0x${hex(nnn, 3)}`;
        case 0x3000: return `${hex(opcode, 4)}: SE V${hex(x)}, 0x${hex(kk, 2)}`;
        case 0x4000: return `${hex(opcode, 4)}: SNE V${hex(x)}, 0x${hex(kk, 2)}`;
        case 0x5000: return `${hex(opcode, 4)}: SE V${hex(x)}, V${hex(y)}`;
        case 0x6000: return `${hex(opcode, 4)}: LD V${hex(x)}, 0x${hex(kk, 2)}`;
        case 0x7000: return `${hex(opcode, 4)}: ADD V${hex(x)}, 0x${hex(kk, 2)}`;
        case 0x8000:
            switch (n) {
                case 0x0: return `${hex(opcode, 4)}: LD V${hex(x)}, V${hex(y)}`;
                case 0x1: return `${hex(opcode, 4)}: OR V${hex(x)}, V${hex(y)}`;
                case 0x2: return `${hex(opcode, 4)}: AND V${hex(x)}, V${hex(y)}`;
                case 0x3: return `${hex(opcode, 4)}: XOR V${hex(x)}, V${hex(y)}`;
                case 0x4: return `${hex(opcode, 4)}: ADD V${hex(x)}, V${hex(y)}`;
                case 0x5: return `${hex(opcode, 4)}: SUB V${hex(x)}, V${hex(y)}`;
                case 0x6: return `${hex(opcode, 4)}: SHR V${hex(x)} {, V${hex(y)}}`;
                case 0x7: return `${hex(opcode, 4)}: SUBN V${hex(x)}, V${hex(y)}`;
                case 0xE: return `${hex(opcode, 4)}: SHL V${hex(x)} {, V${hex(y)}}`;
                default: return `${hex(opcode, 4)}: `;
            }
        case 0x9000: return `${hex(opcode, 4)}: SNE V${hex(x)}, V${hex(y)}`;
        case 0xA000: return `${hex(opcode, 4)}: LD I, 0x${hex(nnn, 3)}`;
        case 0xB000: return `${hex(opcode, 4)}: JP V0, 0x${hex(nnn, 3)}`;
        case 0xC000: return `${hex(opcode, 4)}: RND V${hex(x)}, 0x${hex(kk, 2)}`;
        case 0xD000: return `${hex(opcode, 4)}: DRW V${hex(x)}, V${hex(y)}, 0x${hex(n)}`;
        case 0xE000:
            switch (kk) {
                case 0x9E: return `${hex(opcode, 4)}: SKP V${hex(x)}`;
                case 0xA1: return `${hex(opcode, 4)}: SKNP V${hex(x)}`;
                default: return `${hex(opcode, 4)}: `;
            }
        case 0xF000:
            switch (kk) {
                case 0x07: return `${hex(opcode, 4)}: LD V${hex(x)}, DT`;
                case 0x0A: return `${hex(opcode, 4)}: LD V${hex(x)}, K`;
                case 0x15: return `${hex(opcode, 4)}: LD DT, V${hex(x)}`;
                case 0x18: return `${hex(opcode, 4)}: LD ST, V${hex(x)}`;
                case 0x1E: return `${hex(opcode, 4)}: ADD I, V${hex(x)}`;
                case 0x29: return `${hex(opcode, 4)}: ADD F, V${hex(x)}`;
                case 0x33: return `${hex(opcode, 4)}: LD B, V${hex(x)}`;
                case 0x55: return `${hex(opcode, 4)}: LD [I], V${hex(x)}`;
                case 0x65: return `${hex(opcode, 4)}: LD V${hex(x)}, [I]`;
                default: return `${hex(opcode, 4)}: `;
            }
        default: return `${hex(opcode, 4)}: `;
    }
}
