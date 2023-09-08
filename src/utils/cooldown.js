let isCooldown = false;

export const executeWithCooldown = (func, coolTime) => {
    if (!isCooldown) {
        isCooldown = true;
        func();
        setTimeout(() => {
            isCooldown = false;
        }, coolTime);
    } else {
        console.log("クールダウン中");
    }
};
