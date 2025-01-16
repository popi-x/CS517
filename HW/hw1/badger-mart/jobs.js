function submitApplication(e) {
    e.preventDefault(); // You can ignore this; prevents the default form submission!

    // TODO: Alert the user of the job that they applied for!
    var jobList = document.getElementsByName('job');
    for (var job of jobList){
        if (job.checked){
            alert("Thank you for applying to be a " + job.value);
            return;
        }
    }
    alert("Please select a job!");
}

document.getElementById("apply-btn").addEventListener("click", submitApplication);