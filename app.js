import { buildInitialGfx } from './chip8/ppu.js';
import { buildInitialMemory } from './chip8/memory.js';
import { createDisplay, drawScreen } from './chip8/display.js';
import { buildInitialCpu, execOpcode } from './chip8/cpu.js';

const display = createDisplay('myCanvas', document.body, 640, 320);
const gpu = buildInitialGfx();
const cpu = buildInitialCpu();
const memory = buildInitialMemory();

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


