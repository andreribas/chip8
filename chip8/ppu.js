export function buildInitialGfx() {
    return {
        state: new Uint8Array(8 * 32), // 8 bytes (64 bits) x 32 positions
        clear() {
            this.state.fill(0);

            // H
            this.state[8] = 0x42;
            this.state[16] = 0x42;
            this.state[24] = 0x7E;
            this.state[32] = 0x42;
            this.state[40] = 0x42;

            // E
            this.state[9] = 0x7E;
            this.state[17] = 0x40;
            this.state[25] = 0x7E;
            this.state[33] = 0x40;
            this.state[41] = 0x7E;

            // L
            this.state[10] = 0x40;
            this.state[18] = 0x40;
            this.state[26] = 0x40;
            this.state[34] = 0x40;
            this.state[42] = 0x7E;

            // O
            this.state[11] = 0x7E;
            this.state[19] = 0x42;
            this.state[27] = 0x42;
            this.state[35] = 0x42;
            this.state[43] = 0x7E;
        },
        setByte(x, y, byte) {
            let changed = false;

            const [first, second] = this.splitByte(x, byte);
            const [first_pos, second_pos] = this.posFromXY(x, y);

            changed = changed || (this.state[first_pos] & first) !== 0x00;
            changed = changed || (this.state[second_pos] & second) !== 0x00;

            this.state[first_pos] ^= first;
            this.state[second_pos] ^= second;

            return changed ? 1 : 0;
        },
        splitByte(x_pos, byte) {
            let first_part_size = x_pos % 8;

            let first_part = byte >> first_part_size;
            let second_part = (byte << (8 - first_part_size)) & 0xFF;

            return [first_part, second_part];
        },
        posFromXY(x, y) {
            y = y % 32;
            let first_x = Math.floor(x / 8) % 8;
            let second_x = (Math.floor(x / 8) + 1) % 8;

            return [y * 8 + first_x, y * 8 + second_x];
        },
        isBitSet(x, y) {
            let byte_pos = y * 8 + Math.floor(x / 8);
            let byte = this.state[byte_pos];
            let bit_pos = 7 - x % 8;
            let bit_mask = 0x1 << bit_pos;
            let bit = (byte & bit_mask) >> bit_pos;
            return bit === 0x1;
        }
    };
}
