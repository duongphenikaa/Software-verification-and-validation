document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.navbar a');

    let employeeIncome = 22000000;
    let employeeTaxesPaid = 410000;
    let employeeDependents = 1;

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

    // Xử lý form cập nhật thông tin cá nhân
    const personalInfoForm = document.getElementById('personal-info-form');
    personalInfoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const taxId = document.getElementById('tax-id').value;
        employeeIncome = parseFloat(document.getElementById('income').value);
        employeeDependents = parseInt(document.getElementById('dependents').value);
        updateDashboard();
        alert('Thông tin cá nhân đã được cập nhật!');
        this.reset();
    });

    // Xử lý form khai báo thuế
    const declareTaxesForm = document.getElementById('declare-taxes-form');
    declareTaxesForm.addEventListener('submit', function(event) {
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

        updateDashboard();
        alert(`Thuế thu nhập cá nhân phải nộp: ${tax.toLocaleString()} VND`);
        this.reset();
    });

    // Xử lý form nộp thuế
    const payTaxesForm = document.getElementById('pay-taxes-form');
    payTaxesForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const amount = parseFloat(document.getElementById('amount-pay').value);
        employeeTaxesPaid += amount;
        updateDashboard();
        alert('Nộp thuế thành công!');
        this.reset();
    });

    // Cập nhật trang tổng quan nhân viên
    function updateDashboard() {
        document.querySelector('.card:nth-child(1) p').textContent = `${employeeIncome.toLocaleString()} VND`;
        document.querySelector('.card:nth-child(2) p').textContent = `${employeeTaxesPaid.toLocaleString()} VND`;
        document.querySelector('.card:nth-child(3) p').textContent = employeeDependents;
    }

    // Khởi tạo trang tổng quan nhân viên
    updateDashboard();
});
