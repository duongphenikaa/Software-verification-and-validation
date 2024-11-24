document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.navbar a');

    let totalReportsPending = 10;
    let totalTaxesApproved = 5000000;
    let totalDepartments = 3;

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

    // Xử lý form xem báo cáo
    const reviewReportsForm = document.getElementById('review-reports-form');
    reviewReportsForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const reportDate = document.getElementById('report-date').value;
        totalReportsPending -= 1;
        updateDashboard();
        alert(`Báo cáo cho ngày ${reportDate} đã được xem!`);
    });

    // Xử lý form phê duyệt thuế
    const approveTaxesForm = document.getElementById('approve-taxes-form');
    approveTaxesForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taxId = document.getElementById('tax-id-approve').value;
        totalTaxesApproved += 1000000;  // Giả sử mỗi lần phê duyệt thêm 1,000,000 VND
        updateDashboard();
        alert(`Mã số thuế ${taxId} đã được phê duyệt!`);
    });

    // Xử lý form quản lý phòng ban
    const manageDepartmentForm = document.getElementById('manage-department-form');
    manageDepartmentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const departmentName = document.getElementById('department-name').value;
        totalDepartments += 1;
        updateDashboard();
        alert(`Phòng ban ${departmentName} đã được thêm thành công!`);
    });

    // Cập nhật trang tổng quan quản lý
    function updateDashboard() {
        document.querySelector('.card:nth-child(1) p').textContent = totalReportsPending;
        document.querySelector('.card:nth-child(2) p').textContent = `${totalTaxesApproved.toLocaleString()} VND`;
        document.querySelector('.card:nth-child(3) p').textContent = totalDepartments;
    }

    // Khởi tạo trang tổng quan quản lý
    updateDashboard();
});
