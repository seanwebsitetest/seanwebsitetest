/**
 * PBS Designs - Service Estimator Logic
 * Version: 2.0 (Formspree Integrated)
 */

const checkboxes = document.querySelectorAll('.service-item');
const totalPriceElement = document.getElementById('totalPrice');
const hiddenTotalInput = document.getElementById('hiddenTotal');
const detailsElement = document.getElementById('details');

// 1. Live Price Calculation
checkboxes.forEach(item => {
    item.addEventListener('change', () => {
        let total = 0;
        let selectedList = [];

        checkboxes.forEach(cb => {
            if(cb.checked) {
                total += parseInt(cb.getAttribute('data-price'));
                selectedList.push(cb.value);
            }
        });

        // 更新畫面與隱藏欄位
        const formattedTotal = total.toLocaleString();
        totalPriceElement.innerText = formattedTotal;
        hiddenTotalInput.value = "$" + formattedTotal;

        detailsElement.innerText = selectedList.length > 0
            ? "Selected: " + selectedList.join(", ")
            : "Please select services to see the breakdown.";
    });
});

// 2. Industry Field Toggle
function toggleOtherIndustry() {
    const industrySelect = document.getElementById('industry');
    const otherInput = document.getElementById('otherIndustry');
    otherInput.style.display = (industrySelect.value === 'Other') ? 'block' : 'none';
}

// 3. Form Submission
function submitQuote() {
    // 1. 檢查 Google reCAPTCHA 驗證狀態
    const response = grecaptcha.getResponse();
    if (response.length === 0) {
        alert("Please complete the 'I'm not a robot' verification first.");
        return;
    }

    // 2. 原本的表單驗證邏輯
    const form = document.getElementById('quoteForm');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const total = document.getElementById('totalPrice').innerText;

    if (!name || !email) {
        alert("Please provide your name and email.");
        return;
    }

    if (total === "0") {
        alert("Please select at least one service.");
        return;
    }

    // 3. 確認提交
    const userConfirmed = confirm(`Estimated total is $${total}. \n\nSubmit this request to Sean?`);
    if (userConfirmed) {
        form.submit();
    }
}