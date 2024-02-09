function validateSelection() {
    var selectedCollege = document.getElementById("collegeName").value;
    var selectedBranch = document.getElementById("branchName").value;

    
    if (selectedCollege && selectedBranch) {
        document.getElementById("validationMessage").textContent = "";
    } else {
        document.getElementById("validationMessage").textContent = "Please select both College and Branch.";
    }
}
