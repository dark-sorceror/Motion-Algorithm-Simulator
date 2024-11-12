export const merge = (obj1, obj2) => {
    let result = { ...obj1 };

    for (let key in obj2) {
        if (obj2.hasOwnProperty(key)) {
            if (typeof obj2[key] === 'object' && obj2[key] !== null && typeof result[key] === 'object' && result[key] !== null) {
                result[key] = merge(result[key], obj2[key]);
            } else {
                result[key] = obj2[key];
            }
        }
    }

    return result;
};