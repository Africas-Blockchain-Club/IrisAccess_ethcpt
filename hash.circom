pragma circom 2.0.0;

include "circomlib/circuits/sha256/sha256.circom";

template ImageHash() {
    signal input imgBytes[64];     // Image data as 64 bytes
    signal input expectedHash[256];  // Expected hash in 256 bits

    signal output isValid;         // Output to check if valid

    // Instantiate the SHA-256 hash component
    component hash = Sha256(512);

    // Convert 64 bytes to 256 2-bit inputs
    var byte;
    for (var i = 0; i < 64; i++) {
        byte = imgBytes[i];
        hash.in[i*4]   <== byte / 64;                     // Extract the first 2 bits (>> 6)
        hash.in[i*4+1] <== (byte / 16) % 4;               // Extract the next 2 bits (>> 4) & 3
        hash.in[i*4+2] <== (byte / 4) % 4;                // Extract the next 2 bits (>> 2) & 3
        hash.in[i*4+3] <== byte % 4;                      // Extract the last 2 bits (& 3)
    }

    // Verify that the computed hash matches the expected hash
    signal hashCheck[256];
    var allEqual = 1;
    for (var i = 0; i < 256; i++) {
        hashCheck[i] <== hash.out[i] - expectedHash[i];
        allEqual *= (1 - hashCheck[i]);
    }

    isValid <== allEqual;
}


component main = ImageHash();
