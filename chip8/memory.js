export function buildInitialMemory() {
    const m = new Uint8Array(4096);
    //
    // // 0
    // m[0] = 0xF0;
    // m[1] = 0x90;
    // m[2] = 0x90;
    // m[3] = 0x90;
    // m[4] = 0xF0;
    //
    // // 1
    // m[5] = 0x20;
    // m[6] = 0x60;
    // m[7] = 0x20;
    // m[8] = 0x20;
    // m[9] = 0x70;
    //
    // // 2
    // m[10] = 0xF0;
    // m[11] = 0x10;
    // m[12] = 0xF0;
    // m[13] = 0x80;
    // m[14] = 0xF0;
    //
    // // 3
    // m[15] = 0xF0;
    // m[16] = 0x10;
    // m[17] = 0xF0;
    // m[18] = 0x10;
    // m[19] = 0xF0;
    //
    // // 4
    // m[20] = 0x90;
    // m[21] = 0x90;
    // m[22] = 0xF0;
    // m[23] = 0x10;
    // m[24] = 0x10;
    //
    // // 5
    // m[25] = 0xF0;
    // m[26] = 0x80;
    // m[27] = 0xF0;
    // m[28] = 0x10;
    // m[29] = 0xF0;


    // 0
    return [
        0xF0,
        0x90,
        0x90,
        0x90,
        0xF0,

        // 1
        0x20,
        0x60,
        0x20,
        0x20,
        0x70,

        // 2
        0xF0,
        0x10,
        0xF0,
        0x80,
        0xF0,

        // 3
        0xF0,
        0x10,
        0xF0,
        0x10,
        0xF0,

        // 4
        0x90,
        0x90,
        0xF0,
        0x10,
        0x10,

        // 5
        0xF0,
        0x80,
        0xF0,
        0x10,
        0xF0,

        // 6
        0xF0,
        0x80,
        0xF0,
        0x90,
        0xF0,

        // 7
        0xF0,
        0x10,
        0x20,
        0x40,
        0x40,

        // 8
        0xF0,
        0x90,
        0xF0,
        0x90,
        0xF0,

        // 9
        0xF0,
        0x90,
        0xF0,
        0x10,
        0xF0,

        // A
        0xF0,
        0x90,
        0xF0,
        0x90,
        0x90,

        // B
        0xE0,
        0x90,
        0xE0,
        0x90,
        0xE0,

        // C
        0xF0,
        0x80,
        0x80,
        0x80,
        0xF0,

        // D
        0xE0,
        0x90,
        0x90,
        0x90,
        0xE0,

        // E
        0xF0,
        0x80,
        0xF0,
        0x80,
        0xF0,

        // F
        0xF0,
        0x80,
        0xF0,
        0x80,
        0x80,
    ];

    // return m;
}