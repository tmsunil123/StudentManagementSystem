document.addEventListener('DOMContentLoaded', function () {
    // Fetch registration counts when the page is loaded
    fetchRegistrationCounts();

    function fetchRegistrationCounts() {
        // Assuming you have an API endpoint to fetch registration counts
        fetch('http://localhost:8090/collegeRegistrationcontroller/counts')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => displayRegistrationCounts(data))
            .catch(error => console.error('Error fetching registration counts:', error));
    }

    function displayRegistrationCounts(counts) {
        var tableBody = document.getElementById('registrationCountsTableBody');

        // Clear existing rows
        tableBody.innerHTML = '';

        if (!Array.isArray(counts)) {
            console.error('Invalid data format. Expected an array.');
            return;
        }

        // Populate table rows with registration counts
        counts.forEach(count => {
            var row = document.createElement('tr');

            // Display college name
            var collegeCell = document.createElement('td');
            collegeCell.textContent = count.college;

            // Display registration count
            var countCell = document.createElement('td');
            countCell.textContent = count.count;

            row.appendChild(collegeCell);
            row.appendChild(countCell);
            tableBody.appendChild(row);
        });
    }

   function goBack() {
        window.history.back();
    }

    // Attach the goBack function to the button click event
    document.getElementById('goBackButton').addEventListener('click', goBack);
});
