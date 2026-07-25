function add(a, b) {
    if (Number.isNaN(a) || Number.isNaN(b)) {
        throw new TypeError();
    }

    return a + b;
}

module.exports = add;