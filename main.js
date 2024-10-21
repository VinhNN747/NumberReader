
const button = document.getElementById("button")
button.addEventListener("click", () => {
    const inputNumber = document.getElementById("numberInput").value.trim();
    let validPattern = /^[0-9\s]*$/;
    if (inputNumber === "") {
        document.getElementById("result").textContent = "Input cannot be empty!";
    } else if (!validPattern.test(inputNumber)) {
        document.getElementById("result").textContent = "Please enter only a number!";
    } else {
        var nums = Array.from(String(parseInt(inputNumber.replace(/\s+/g, ''))), Number);
        const displayResult = docSoTiengNhat(nums)
        document.getElementById("result").textContent = displayResult
    }
})

function docSoTiengNhat(nums) {
    let result = "";
    const wordNum = ["rei ", "ichi ", "ni ", "san ", "yon ", "go ", "roku ", "nana ", "hachi ", "kyuu "];
    var manLayer = Math.ceil(nums.length / 4);
    const manLayerWord = {
        2: "man ",
        3: "oku ",
        4: "kei ",
        5: "gai ",
        6: "jo "
    };
    
    let hang = 3;
    const a = nums.length % 4;
    if (a === 0) {
        hang = 0;
    } else if (a === 3) {
        hang = 1;
    } else if (a === 2) {
        hang = 2;
    }

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        if (num === 0) {
            if (hang !== 3) {
                hang += 1;
            } else {
                hang = 0;
            }
            // continue;
        }
        if (hang === 0) { // hàng nghìn
            if (num === 8) {
                result += "hassen ";
            } else {
                if (num !== 1) {
                    result += wordNum[num];
                }
                if (num === 3) {
                    result += "zen ";
                } else {
                    result += "sen ";
                }
            }
            hang += 1;
        } else if (hang === 1) { // hàng trăm
            if (num === 6) {
                result += "roppyaku ";
            } else if (num === 8) {
                result += "happyaku ";
            } else {
                if (num !== 1) {
                    result += wordNum[num];
                }
                if (num === 3) {
                    result += "byaku ";
                } else {
                    result += "hyaku ";
                }
            }
            hang += 1;
        } else if (hang === 2) { // hàng chục
            if (num !== 1) {
                result += wordNum[num];
            }
            result += "juu ";
            hang += 1;
        } else { // hàng đơn vị
            result += wordNum[num];
            if (manLayer > 1) {
                result += manLayerWord[manLayer];
                manLayer -= 1;
            }
            hang = 0;
        }
    }
    return result
}

function docSoTiengViet(nums) {
    let result = "";
    const wordNum = ["không ", "một ", "hai ", "ba ", "bốn ", "năm ", "sáu ", "bảy ", "tám ", "chín "];
    let hang = 2;
    const a = nums.length % 3;
    if (a === 0) {
        hang = 0;
    } else if (a === 2) {
        hang = 1;
    }
    let soLopTy = Math.floor(nums.length / 10); // số lớp tỷ
    let soLop = Math.ceil(nums.length / 3) - 3 * soLopTy; // số lớp

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        if (hang === 0) {  // hàng trăm
            if (num !== 0 || (i + 1 < nums.length && nums[i + 1] !== 0) || (i + 2 < nums.length && nums[i + 2] !== 0)) {
                result += wordNum[num];
                result += "trăm ";
            }
            hang += 1;
        } else if (hang === 1) {  // hàng chục
            if (num === 1) {
                result += "mười ";
            } else if (num === 0) {
                if (nums[i + 1] !== 0) {
                    result += "linh ";
                }
            } else {
                result += wordNum[num];
                result += "mươi ";
            }
            if (nums[i + 1] === 1 && num !== 1 && num !== 0) {
                wordNum[1] = "mốt ";
            } else if (nums[i + 1] === 5 && num !== 0) {
                wordNum[5] = "lăm ";
            }
            hang += 1;
        } else {  // hàng đơn vị
            if (num !== 0) {
                if (num === 1) {
                    result += wordNum[num];
                    wordNum[1] = "một ";
                } else if (num === 5) {
                    result += wordNum[num];
                    wordNum[5] = "năm ";
                } else {
                    result += wordNum[num];
                }
            }
            if (num || nums[i - 1] || nums[i - 2]) {
                if (soLop === 3) {
                    result += "triệu ";
                    soLop -= 1;
                } else if (soLop === 2) {
                    result += "nghìn ";
                    soLop -= 1;
                } else {
                    result += "tỷ ".repeat(soLopTy);
                    if (soLopTy) {
                        soLop = 3
                    }
                    soLopTy -= 1
                }
            }
            hang = 0
        }
    }
    return result
}
