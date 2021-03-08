export function buildInitialCpu () {
    return {
        V: new Uint8Array(16),      // General Registers: 8 bits
        I: 0,                       // Memory Address: 16 bits
        PC: 0,                      // Program Counter: 16 bits
        SP: 0,                      // Stack Pointer: 16 bits
        stack: new Uint16Array(16), // Stack
    };
}

export function decompileOpcode(opcode) {
    const nnn = opcode & 0x0FFF;
    const kk = opcode & 0x00FF;
    const x = (opcode & 0x0F00) >> 8;
    const y = (opcode & 0x00F0) >> 4;
    const n = opcode & 0x000F;

    switch (opcode & 0xF000) {
        case 0x0000:
            switch (nnn) {
                case 0x0E0: return `00E0: CLS`;
                case 0x0EE: return `00EE: RET`;
                default: return `${opcode.toString(16)}: `;
            }
        case 0x1000: return `${opcode.toString(16)}: JP 0x${nnn.toString(16)}`;
        case 0x2000: return `${opcode.toString(16)}: CALL 0x${nnn.toString(16)}`;
        case 0x3000: return `${opcode.toString(16)}: SE V${x}, 0x${kk.toString(16)}`;
        case 0x4000: return `${opcode.toString(16)}: SNE V${x}, 0x${kk.toString(16)}`;
        case 0x5000: return `${opcode.toString(16)}: SE V${x}, V${y}`;
        case 0x6000: return `${opcode.toString(16)}: LD V${x}, 0x${kk.toString(16)}`;
        case 0x7000: return `${opcode.toString(16)}: ADD V${x}, 0x${kk.toString(16)}`;
        case 0x8000:
            switch (n) {
                case 0x0: return `${opcode.toString(16)}: LD V${x}, V${y}`;
                case 0x1: return `${opcode.toString(16)}: OR V${x}, V${y}`;
                case 0x2: return `${opcode.toString(16)}: AND V${x}, V${y}`;
                case 0x3: return `${opcode.toString(16)}: XOR V${x}, V${y}`;
                case 0x4: return `${opcode.toString(16)}: ADD V${x}, V${y}`;
                case 0x5: return `${opcode.toString(16)}: SUB V${x}, V${y}`;
                case 0x6: return `${opcode.toString(16)}: SHR V${x} {, V${y}}`;
                case 0x7: return `${opcode.toString(16)}: SUBN V${x}, V${y}`;
                case 0xE: return `${opcode.toString(16)}: SHL V${x} {, V${y}}`;
                default: return `${opcode.toString(16)}: `;
            }
        case 0x9000: return `${opcode.toString(16)}: SNE V${x}, V${y}`;
        case 0xA000: return `${opcode.toString(16)}: LD I, 0x${nnn.toString(16)}`;
        case 0xB000: return `${opcode.toString(16)}: JP V0, 0x${nnn.toString(16)}`;
        case 0xC000: return `${opcode.toString(16)}: RND V${x}, 0x${kk.toString(16)}`;
        case 0xD000: return `${opcode.toString(16)}: DRW V${x}, V${y}, ${n}`;
        case 0xE000:
            switch (kk) {
                case 0x9E: return `${opcode.toString(16)}: SKP V${x}`;
                case 0xA1: return `${opcode.toString(16)}: SKNP V${x}`;
                default: return `${opcode.toString(16)}: `;
            }
        case 0xF000:
            switch (kk) {
                case 0x07: return `${opcode.toString(16)}: LD V${x}, DT`;
                case 0x0A: return `${opcode.toString(16)}: LD V${x}, K`;
                case 0x15: return `${opcode.toString(16)}: LD DT, V${x}`;
                case 0x18: return `${opcode.toString(16)}: LD ST, V${x}`;
                case 0x1E: return `${opcode.toString(16)}: ADD I, V${x}`;
                case 0x29: return `${opcode.toString(16)}: ADD F, V${x}`;
                case 0x33: return `${opcode.toString(16)}: LD B, V${x}`;
                case 0x55: return `${opcode.toString(16)}: LD [I], V${x}`;
                case 0x65: return `${opcode.toString(16)}: LD V${x}, [I]`;
                default: return `${opcode.toString(16)}: `;
            }
        default: return `${opcode.toString(16)}: `;
    }
}

// http://devernay.free.fr/hacks/chip8/C8TECH10.HTM#3.1
export function execOpcode(opcode, cpu, memory, gfx, keyboard) {
    const nnn = opcode & 0x0FFF;
    const kk = opcode & 0x00FF;
    const x = (opcode & 0x0F00) >> 8;
    const y = (opcode & 0x00F0) >> 4;
    const n = opcode & 0x000F;

    switch (opcode & 0xF000) {
        case 0x0000:
            // 0nnn - SYS addr
            // Jump to a machine code routine at nnn.
            //
            // This instruction is only used on the old computers
            // on which Chip-8 was originally implemented.
            // It is ignored by modern interpreters.

            // 00E0 - CLS
            // Clear the display.
            if (nnn === 0x00E0) {
                cpu.clear();
                break;
            }

            // 00EE - RET
            // Return from a subroutine.
            //
            // The interpreter sets the program counter
            // to the address at the top of the stack,
            // then subtracts 1 from the stack pointer.
            // TODO: validate stack size
            if (nnn === 0x00EE) {
                cpu.PC = nnn;
                cpu.SP--;
                break;
            }

            break;

        case 0x1000:
            // 1nnn - JP addr
            // Jump to location nnn.
            //
            // The interpreter sets the program counter to nnn.
            cpu.PC = nnn;
            break;

        case 0x2000:
            // 2nnn - CALL addr
            // Call subroutine at nnn.
            //
            // The interpreter increments the stack pointer,
            // then puts the current PC on the top of the stack.
            // The PC is then set to nnn.
            // TODO: validate stack size
            cpu.SP++;
            cpu.stack[cpu.SP] = cpu.PC;
            cpu.PC = nnn;
            break;

        case 0x3000:
            // 3xkk - SE Vx, byte
            // Skip next instruction if Vx = kk.
            //
            // The interpreter compares register Vx to kk, and if
            // they are equal, increments the program counter by 2.
            if (cpu.V[x] === kk) cpu.PC += 2;
            break;

        case 0x4000:
            // 4xkk - SNE Vx, byte
            // Skip next instruction if Vx != kk.
            //
            // The interpreter compares register Vx to kk, and if
            // they are not equal, increments the program counter by 2.
            if (cpu.V[x] !== kk) cpu.PC += 2;
            break;

        case 0x5000:
            // 5xy0 - SE Vx, Vy
            // Skip next instruction if Vx = Vy.
            //
            // The interpreter compares register Vx to register Vy, and
            // if they are equal, increments the program counter by 2.
            if (cpu.V[x] === cpu.V[y]) cpu.PC += 2;
            break;

        case 0x6000:
            // 6xkk - LD Vx, byte
            // Set Vx = kk.
            //
            // The interpreter puts the value kk into register Vx.
            cpu.V[x] = kk;
            break;

        case 0x7000:
            // 7xkk - ADD Vx, byte
            // Set Vx = Vx + kk.
            //
            // Adds the value kk to the value of register Vx,
            // then stores the result in Vx.
            cpu.V[x] += kk;
            break;

        case 0x8000:
            switch (n) {
                case 0x0:
                    // 8xy0 - LD Vx, Vy
                    // Set Vx = Vy.
                    //
                    // Stores the value of register Vy in register Vx.
                    cpu.V[x] += cpu.V[y];
                    break;

                case 0x1:
                    // 8xy1 - OR Vx, Vy
                    // Set Vx = Vx OR Vy.
                    //
                    // Performs a bitwise OR on the values of Vx and Vy,
                    // then stores the result in Vx. A bitwise OR compares
                    // the corresponding bits from two values, and if either
                    // bit is 1, then the same bit in the result is also 1.
                    // Otherwise, it is 0.
                    cpu.V[x] = cpu.V[x] | cpu.V[y];
                    break;

                case 0x2:
                    // 8xy2 - AND Vx, Vy
                    // Set Vx = Vx AND Vy.
                    //
                    // Performs a bitwise AND on the values of Vx and Vy,
                    // then stores the result in Vx. A bitwise AND compares
                    // the corresponding bits from two values, and if both
                    // bits are 1, then the same bit in the result is also 1.
                    // Otherwise, it is 0.
                    cpu.V[x] = cpu.V[x] & cpu.V[y];
                    break;

                case 0x3:
                    // 8xy3 - XOR Vx, Vy
                    // Set Vx = Vx XOR Vy.
                    //
                    // Performs a bitwise exclusive OR on the values of Vx and Vy,
                    // then stores the result in Vx. An exclusive OR compares the
                    // corresponding bits from two values, and if the bits are not
                    // both the same, then the corresponding bit in the result
                    // is set to 1. Otherwise, it is 0.
                    cpu.V[x] = cpu.V[x] ^ cpu.V[y];
                    break;

                case 0x4:
                    // 8xy4 - ADD Vx, Vy
                    // Set Vx = Vx + Vy, set VF = carry.
                    //
                    // The values of Vx and Vy are added together. If the result
                    // is greater than 8 bits (i.e., > 255,) VF is set to 1, otherwise 0.
                    // Only the lowest 8 bits of the result are kept, and stored in Vx.
                    cpu.V[x] = (cpu.V[x] + cpu.V[y]) % 0xFFFF;
                    cpu.V[0xF] = (cpu.V[x] + cpu.V[y]) > 0xFFFF ? 1 : 0;
                    break;

                case 0x5:
                    // 8xy5 - SUB Vx, Vy
                    // Set Vx = Vx - Vy, set VF = NOT borrow.
                    //
                    // If Vx > Vy, then VF is set to 1, otherwise 0. Then Vy
                    // is subtracted from Vx, and the results stored in Vx.
                    cpu.V[x] = (cpu.V[x] + cpu.V[y]) & 0xFFFF;
                    cpu.V[0xF] = cpu.V[x] > cpu.V[y] ? 1 : 0;
                    break;

                case 0x6:
                    // 8xy6 - SHR Vx {, Vy}
                    // Set Vx = Vx SHR 1. (SHR - shift right >>)
                    //
                    // If the least-significant bit of Vx is 1, then VF is set to 1,
                    // otherwise 0. Then Vx is divided by 2.
                    cpu.V[0xF] = cpu.V[x] & 0x01;
                    cpu.V[x] = cpu.V[x] >> 1;
                    break;

                case 0x7:
                    // 8xy7 - SUBN Vx, Vy
                    // Set Vx = Vy - Vx, set VF = NOT borrow.
                    //
                    // If Vy > Vx, then VF is set to 1, otherwise 0.
                    // Then Vx is subtracted from Vy, and the results stored in Vx.
                    cpu.V[0xF] = cpu.V[y] > cpu.V[x] ? 1 : 0;
                    cpu.V[x] = cpu.V[y] - cpu.V[x];
                    break;

                case 0xE:
                    // 8xyE - SHL Vx {, Vy} (SHL - shift left <<)
                    // Set Vx = Vx SHL 1.
                    //
                    // If the most-significant bit of Vx is 1, then VF is set to 1,
                    // otherwise to 0. Then Vx is multiplied by 2.
                    cpu.V[0xF] = (cpu.V[x] & 0x8000) >> 16;
                    cpu.V[x] = (cpu.V[x] << 1) & 0xFFFF;
                    break;
            }
            break; // case 0x8000:

        case 0x9000:
            // 9xy0 - SNE Vx, Vy
            // Skip next instruction if Vx != Vy.
            //
            // The values of Vx and Vy are compared, and if they are not equal,
            // the program counter is increased by 2.
            if (cpu.V[x] !== cpu.V[y]) cpu.PC += 2;
            break;

        case 0xA000:
            // Annn - LD I, addr
            // Set I = nnn.
            //
            // The value of register I is set to nnn.
            cpu.I = nnn;
            break;

        case 0xB000:
            // Bnnn - JP V0, addr
            // Jump to location nnn + V0.
            //
            // The program counter is set to nnn plus the value of V0.
            cpu.I = cpu.V[0] + nnn;
            break;

        case 0xC000:
            // Cxkk - RND Vx, byte
            // Set Vx = random byte AND kk.
            //
            // The interpreter generates a random number from 0 to 255,
            // which is then ANDed with the value kk. The results are
            // stored in Vx. See instruction 8xy2 for more information on AND.
            cpu.V[x] = Math.floor(Math.random() * 0x10000) & kk;
            break;

        case 0xD000:
            // Dxyn - DRW Vx, Vy, nibble
            // Display n-byte sprite starting at memory location I at (Vx, Vy),
            // set VF = collision.
            //
            // The interpreter reads n bytes from memory, starting at the address
            // stored in I. These bytes are then displayed as sprites on screen
            // at coordinates (Vx, Vy). Sprites are XORed onto the existing screen.
            // If this causes any pixels to be erased, VF is set to 1, otherwise
            // it is set to 0. If the sprite is positioned so part of it is outside
            // the coordinates of the display, it wraps around to the opposite
            // side of the screen. See instruction 8xy3 for more information on XOR,
            // and section 2.4, Display, for more information on the Chip-8
            // screen and sprites.
            for (let i = 0; i < n; i++)
                cpu.V[0xF] |= gfx.setByte(cpu.V[x], cpu.V[y] + i, memory[cpu.I + i]);
            break;

        case 0xE:
            // Ex9E - SKP Vx
            // Skip next instruction if key with the value of Vx is pressed.
            //
            // Checks the keyboard, and if the key corresponding to the value of Vx
            // is currently in the down position, PC is increased by 2.
            if (kk === 0x9E) {
                if (keyboard.pressed(cpu.V[x]))
                    cpu.PC += 2;
                break;
            }

            // ExA1 - SKNP Vx
            // Skip next instruction if key with the value of Vx is not pressed.
            //
            // Checks the keyboard, and if the key corresponding to the value of Vx
            // is currently in the up position, PC is increased by 2.
            if (kk === 0xA1) {
                if ( ! keyboard.pressed(cpu.V[x]))
                    cpu.PC += 2;
                break;
            }

    }
}
