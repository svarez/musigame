export const getRandomElements = (arr = {}, n) => {

    let array = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        return [];
    while (n--) {
        let x = Math.floor(Math.random() * len);
        array[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }

    return array;
}