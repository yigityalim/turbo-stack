use wasm_bindgen::prelude::*;

/// FNV-1a 64-bit hash of a string, returned as a zero-padded hex string.
/// An example of exposing a small, fast Rust function to JS through wasm.
#[wasm_bindgen]
pub fn fnv1a_hex(input: &str) -> String {
    let mut hash: u64 = 0xcbf2_9ce4_8422_2325;
    for byte in input.as_bytes() {
        hash ^= u64::from(*byte);
        hash = hash.wrapping_mul(0x0000_0100_0000_01b3);
    }
    format!("{hash:016x}")
}

#[cfg(test)]
mod tests {
    use super::fnv1a_hex;

    #[test]
    fn empty_string_is_the_offset_basis() {
        assert_eq!(fnv1a_hex(""), "cbf29ce484222325");
    }

    #[test]
    fn hashes_are_stable() {
        assert_eq!(fnv1a_hex("turbo-stack"), fnv1a_hex("turbo-stack"));
        assert_ne!(fnv1a_hex("a"), fnv1a_hex("b"));
    }
}
