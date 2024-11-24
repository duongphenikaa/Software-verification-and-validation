document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.navbar a');

    let totalTaxPayers = 0;
    let totalIncome = 0;
    let totalTaxesPaid = 0;
    let totalTaxesDue = 0;

    // Chuyển đổi giữa các phần
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            sections.forEach(section => {
                section.classList.remove('active');
            });
            const activeSection = document.querySelector(`#${this.id}-section`);
            activeSection.classList.add('active');
        });
    });

    // Xử lý form đăng ký
    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const income = parseFloat(document.getElementById('income').value);
        totalTaxPayers += 1;
        totalIncome += income;
        updateDashboard();
        alert('Đăng ký thành công!');
        this.reset();
    });

    // Xử lý form khai báo thuế
    const declareForm = document.getElementById('declare-form');
    declareForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const income = parseFloat(document.getElementById('income-declare').value);
        const personalDeduction = parseFloat(document.getElementById('personal-deduction').value);
        const dependentDeduction = parseFloat(document.getElementById('dependent-deduction').value);
        const taxableIncome = income - personalDeduction - dependentDeduction;

        let tax = 0;
        if (taxableIncome <= 5000000) {
            tax = taxableIncome * 0.05;
        } else if (taxableIncome <= 10000000) {
            tax = 5000000 * 0.05 + (taxableIncome - 5000000) * 0.10;
        } else {
            tax = 5000000 * 0.05 + 5000000 * 0.10 + (taxableIncome - 10000000) * 0.15;
        }

        totalTaxesDue += tax;
        updateDashboard();
        alert('Khai báo thuế thành công!');
        this.reset();
    });

    // Xử lý form tính thuế
    const calculateForm = document.getElementById('calculate-form');
    calculateForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const income = parseFloat(document.getElementById('income-calculate').value);
        const personalDeduction = parseFloat(document.getElementById('personal-deduction-calculate').value);
        const dependentDeduction = parseFloat(document.getElementById('dependent-deduction-calculate').value);
        const taxableIncome = income - personalDeduction - dependentDeduction;

        let tax = 0;
        if (taxableIncome <= 5000000) {
            tax = taxableIncome * 0.05;
        } else if (taxableIncome <= 10000000) {
            tax = 5000000 * 0.05 + (taxableIncome - 5000000) * 0.10;
        } else {
            tax = 5000000 * 0.05 + 5000000 * 0.10 + (taxableIncome - 10000000) * 0.15;
        }

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `<h3>Thuế thu nhập cá nhân phải nộp: ${tax.toLocaleString()} VND</h3>`;
    });

    // Xử lý form nộp thuế
    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const amount = parseFloat(document.getElementById('amount-payment').value);
        totalTaxesPaid += amount;
        totalTaxesDue -= amount;
        updateDashboard();
        alert('Nộp thuế thành công!');
        this.reset();
    });

    // Cập nhật trang tổng quan tài chính
    function updateDashboard() {
        document.querySelector('.card:nth-child(1) p').textContent = totalTaxPayers;
        document.querySelector('.card:nth-child(2) p').textContent = `${totalIncome.toLocaleString()} VND`;
        document.querySelector('.card:nth-child(3) p').textContent = `${totalTaxesPaid.toLocaleString()} VND`;
        document.querySelector('.card:nth-child(4) p').textContent = `${totalTaxesDue.toLocaleString()} VND`;
    }

    // Khởi tạo trang tổng quan tài chính
    updateDashboard();
});
