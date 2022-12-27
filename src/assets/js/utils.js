export function getCounters(root) {
    let sum = 0;
    let sumChecked = 0;
    const stack = [];
    stack.push(root);

    while (stack.length) {
        const temp = stack.pop();
        sum += temp.count;
        if (temp.isChecked) {
            sumChecked += temp.count;
        }

        if (temp.children && temp.children.length) {
            for (const child of temp.children) {
                stack.push(child);
            }
        }
    }
    return { sum, sumChecked };
}

export function checkCategory(category, isChecked) {
    const stack = [];
    stack.push(category);

    while (stack.length) {
        const temp = stack.pop();
        temp.isChecked = isChecked;

        if (temp.children && temp.children.length) {
            for (const child of temp.children) {
                stack.push(child);
            }
        }
    }
}

export function initAllCategories(categories) {
    for (const category of categories) {
        checkCategory(category, false);
    }
}

export function sumAllCheckedCategories(categories) {
    let sum = 0;
    for (const category of categories) {
        sum += getCounters(category).sumChecked;
    }
    return sum;
}
