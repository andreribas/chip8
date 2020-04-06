import { buildInitialGfx } from './chip8/ppu.js';
import { buildInitialMemory } from './chip8/memory.js';
import { createDisplay, drawScreen } from './chip8/display.js';
import { buildInitialCpu, execOpcode, decompileOpcode } from './chip8/cpu.js';

const display = createDisplay('myCanvas', document.body, 640, 320);
const gpu = buildInitialGfx();
const cpu = buildInitialCpu();
const memory = buildInitialMemory();




function loadMemory(memory, data, address) {
    for (let word of data) {
        memory[address++] = word >> 8;
        memory[address++] = word & 0xFF;
    }
}

function clearMemory(memory) {
    for (let i = 0; i < memory.length; i++) {
        memory[i] = 0;
    }
}
let particle = [
0xa321, 0x6000, 0x6100, 0x6208, 0xd015, 0xf21e, 0x8024, 0xd015,
0xf21e, 0x8024, 0xd015, 0xf21e, 0x8024, 0xd015, 0xf21e, 0x8024,
0xd015, 0xf21e, 0x8024, 0xd015, 0xf21e, 0x8024, 0xd015, 0xf21e,
0x8024, 0xd015, 0x6605, 0x6702, 0x6a00, 0x12b8, 0x6b00, 0x6c00,
0xa2d8, 0xfb1e, 0xf365, 0x22ce, 0x225c, 0x1262, 0x22ce, 0x225c,
0x7b04, 0x7c01, 0x5c60, 0x1240, 0x123c, 0x1200, 0xa320, 0xded1,
0x00ee, 0xa2d8, 0xfb1e, 0xf365, 0x8024, 0x8134, 0x8e00, 0x8d10,
0x8ee6, 0x8dd6, 0x84e0, 0x65c2, 0x8454, 0x4f01, 0x1292, 0x4d00,
0x6301, 0x84d0, 0x65e1, 0x8454, 0x4f01, 0x1292, 0x3302, 0x7301,
0x1294, 0x229c, 0xa2d8, 0xfb1e, 0xf355, 0x124c, 0xa300, 0xfa1e,
0xf065, 0x8200, 0x7a01, 0x641f, 0x8a42, 0x6020, 0x611e, 0x800e,
0x811e, 0xc303, 0x73f8, 0x00ee, 0x6b00, 0x6c00, 0x229c, 0xa2d8,
0xfb1e, 0xf355, 0x7b04, 0x7c01, 0x5c60, 0x12bc, 0x123c, 0x8e00,
0x8d10, 0x8ee6, 0x8dd6, 0x00ee, 0x0000, 0x0000, 0x0000, 0x0000,
0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000,
0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000,
0xf8fa, 0xf9fe, 0xfbfc, 0xfdff, 0x0201, 0x0305, 0x0406, 0x0708,
0x0607, 0x0405, 0x0301, 0x02fe, 0xfffc, 0xfbfd, 0xfaf9, 0xf8fa,
0x80f7, 0x0677, 0x0636, 0x0000, 0x00c7, 0x6ccf, 0x0c0c, 0x0000,
0x009f, 0xd9df, 0xd9d9, 0x0000, 0x003f, 0x8c0c, 0x8c8c, 0x0000,
0x0067, 0x6c6c, 0x6c67, 0x0000, 0x00b0, 0x3030, 0x30be, 0x0000,
0x00f9, 0xc3f1, 0xc0fb, 0x0000, 0x00ef, 0x00ce, 0x60cc, 0x0000,
];


// maze
let data = [
    0xa21e,
    0xc201,
    0x3201,
    0xa21a,
    0xd014,
    0x7004,
    0x3040,
    0x1200,
    0x6000,
    0x7104,
    0x3120,
    0x1200,
    0x1218,
    0x8040,
    0x2010,
    0x2040,
    0x8010,
];

let opcodes = particle.map(opcode => decompileOpcode(opcode));
console.log(opcodes);
// clearMemory(memory);
// loadMemory(memory, data, 0x200);
// console.log(memory);

execOpcode(0xa21e, cpu, memory, gpu);
execOpcode(0xc201, cpu, memory, gpu);
execOpcode(0x3201, cpu, memory, gpu);
execOpcode(0xa21a, cpu, memory, gpu);
execOpcode(0xd014, cpu, memory, gpu);
execOpcode(0x7004, cpu, memory, gpu);
execOpcode(0x3040, cpu, memory, gpu);
execOpcode(0x1200, cpu, memory, gpu);
execOpcode(0x6000, cpu, memory, gpu);
execOpcode(0x7104, cpu, memory, gpu);
execOpcode(0x3120, cpu, memory, gpu);
execOpcode(0x1200, cpu, memory, gpu);
execOpcode(0x1218, cpu, memory, gpu);
execOpcode(0x8040, cpu, memory, gpu);
execOpcode(0x2010, cpu, memory, gpu);
execOpcode(0x2040, cpu, memory, gpu);
execOpcode(0x8010, cpu, memory, gpu);

drawScreen(gpu, display);

function loadRom(name) {
    let request = new XMLHttpRequest;
    request.onload = function() {
        if (request.response) {
            cpu.screen = self.screen;
            cpu.input = self.input;
            cpu.speaker = self.speaker;
            self.stop();
            cpu.reset();
            cpu.loadProgram(new Uint8Array(request.response));
            self.start();
        }
    }
    request.open("GET", "roms/" + name, true);
    request.responseType = "arraybuffer";
    request.send();
}



function printDigits() {
    // gpu.clear();
    execOpcode(0x620A, cpu, memory, gpu);

    execOpcode(0xB000, cpu, memory, gpu); //I = V0
    execOpcode(0x7005, cpu, memory, gpu); //V0 += 5
    execOpcode(0xD025, cpu, memory, gpu); //draw(X:V[0], Y:V[2], 8x[5])

    execOpcode(0xB000, cpu, memory, gpu);
    execOpcode(0x7005, cpu, memory, gpu);
    execOpcode(0xD025, cpu, memory, gpu);

    execOpcode(0xB000, cpu, memory, gpu);
    execOpcode(0x7005, cpu, memory, gpu);
    execOpcode(0xD025, cpu, memory, gpu);

    execOpcode(0xB000, cpu, memory, gpu);
    execOpcode(0x7005, cpu, memory, gpu);
    execOpcode(0xD025, cpu, memory, gpu);

    execOpcode(0xB000, cpu, memory, gpu);
    execOpcode(0x7005, cpu, memory, gpu);
    execOpcode(0xD025, cpu, memory, gpu);

    execOpcode(0xB000, cpu, memory, gpu);
    execOpcode(0x7005, cpu, memory, gpu);
    execOpcode(0xD025, cpu, memory, gpu);

    execOpcode(0xB000, cpu, memory, gpu);
    execOpcode(0x7005, cpu, memory, gpu);
    execOpcode(0xD025, cpu, memory, gpu);

    execOpcode(0xB000, cpu, memory, gpu);
    execOpcode(0x7005, cpu, memory, gpu);
    execOpcode(0xD025, cpu, memory, gpu);

// =============================
    execOpcode(0x6000, cpu, memory, gpu);
    execOpcode(0x6210, cpu, memory, gpu);

    execOpcode(0xB028, cpu, memory, gpu);
    execOpcode(0x7005, cpu, memory, gpu);
    execOpcode(0xD025, cpu, memory, gpu);

    execOpcode(0xB028, cpu, memory, gpu);
    execOpcode(0x7005, cpu, memory, gpu);
    execOpcode(0xD025, cpu, memory, gpu);

    execOpcode(0xB028, cpu, memory, gpu);
    execOpcode(0x7005, cpu, memory, gpu);
    execOpcode(0xD025, cpu, memory, gpu);

    execOpcode(0xB028, cpu, memory, gpu);
    execOpcode(0x7005, cpu, memory, gpu);
    execOpcode(0xD025, cpu, memory, gpu);

    execOpcode(0xB028, cpu, memory, gpu);
    execOpcode(0x7005, cpu, memory, gpu);
    execOpcode(0xD025, cpu, memory, gpu);

    execOpcode(0xB028, cpu, memory, gpu);
    execOpcode(0x7005, cpu, memory, gpu);
    execOpcode(0xD025, cpu, memory, gpu);

    execOpcode(0xB028, cpu, memory, gpu);
    execOpcode(0x7005, cpu, memory, gpu);
    execOpcode(0xD025, cpu, memory, gpu);

    execOpcode(0xB028, cpu, memory, gpu);
    execOpcode(0x7005, cpu, memory, gpu);
    execOpcode(0xD025, cpu, memory, gpu);

    drawScreen(gpu, display);
}