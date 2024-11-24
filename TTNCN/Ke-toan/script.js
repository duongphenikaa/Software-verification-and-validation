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

    // Xử lý form miễn giảm trừ
    const taxExemptionForm = document.getElementById('tax-exemption-form');
    taxExemptionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const employeeId = document.getElementById('employee-id-exempt').value;
        const exemptionAmount = parseFloat(document.getElementById('exemption-amount').value);
        totalTaxesDue -= exemptionAmount;
        updateDashboard();
        alert(`Miễn giảm ${exemptionAmount} VND cho nhân viên ${employeeId} thành công!`);
        this.reset();
    });

    // Xử lý form tính thử thuế
    const tryTaxForm = document.getElementById('try-tax-form');
    tryTaxForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const income = parseFloat(document.getElementById('income-try').value);
        const personalDeduction = parseFloat(document.getElementById('personal-deduction-try').value);
        const dependentDeduction = parseFloat(document.getElementById('dependent-deduction-try').value);
        const taxableIncome = income - personalDeduction - dependentDeduction;

        let tax = 0;
        if (taxableIncome <= 5000000) {
            tax = taxableIncome * 0.05;
        } else if (taxableIncome <= 10000000) {
            tax = 5000000 * 0.05 + (taxableIncome - 5000000) * 0.10;
        } else {
            tax = 5000000 * 0.05 + 5000000 * 0.10 + (taxableIncome - 10000000) * 0.15;
        }

        const resultDiv = document.getElementById('try-tax-result');
        resultDiv.innerHTML = `<h3>Thuế thu nhập cá nhân dự tính: ${tax.toLocaleString()} VND</h3>`;
    });

    // Xử lý form tính thuế theo tháng
    const monthlyTaxForm = document.getElementById('monthly-tax-form');
    monthlyTaxForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const employeeId = document.getElementById('employee-id-monthly').value;
        const month = document.getElementById('month').value;
        // Logic tính thuế theo tháng cho nhân viên
        // ...
        updateDashboard();
        alert(`Tính thuế cho nhân viên ${employeeId} trong tháng ${month} thành công!`);
        this.reset();
    });

    // Xử lý form tính thuế theo năm
    const annualTaxForm = document.getElementById('annual-tax-form');
    annualTaxForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const employeeId = document.getElementById('employee-id-annual').value;
        const year = document.getElementById('year').value;
        // Logic tính thuế theo năm cho nhân viên
        // ...
        updateDashboard();
        alert(`Tính thuế cho nhân viên ${employeeId} trong năm ${year} thành công!`);
        this.reset();
    });

    // Xử lý form quản lý phòng ban
    const manageDepartmentsForm = document.getElementById('manage-departments-form');
    manageDepartmentsForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const departmentName = document.getElementById('department-name').value;
        alert(`Phòng ban ${departmentName} đã được thêm thành công!`);
        this.reset();
    });

    // Xử lý form quản lý nhân viên
    const manageEmployeesForm = document.getElementById('manage-employees-form');
    manageEmployeesForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const employeeName = document.getElementById('employee-name').value;
        const employeeId = document.getElementById('employee-id').value;
        const employeeIncome = parseFloat(document.getElementById('employee-income').value);
        totalTaxPayers += 1;
        totalIncome += employeeIncome;
        updateDashboard();
        alert(`Nhân viên ${employeeName} (${employeeId}) đã được thêm thành công với thu nhập ${employeeIncome} VND!`);
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
