document.querySelector('.button-container')
    .addEventListener('click', () => {
        let text = document.getElementById('filter-jobs').value;
        getJobs().then(jobs => {
            let filteredJobs = filterJobs(jobs, text);
            showJobs(filteredJobs);
        })
    });
var defInit = {
    method : 'GET', 
    headers:{
        'Content-Type':'application/json'
    },
    mode: 'cors',
    cache: 'default'
};
var myRequest = new Request("./iti2.json", defInit);
function getJobs() {
    return fetch(myRequest)
        .then(response => response.json())
        .then(data => {
            return data
        })
}

function filterJobs(jobs, searchText) {
    document.getElementById("countJobs").innerHTML = "Suggested Results...";
    if(searchText) {
        let filteredJobs = jobs.filter(job => {
            if(job.post.toLowerCase().includes(searchText)
                || job.eligibility.toLowerCase().includes(searchText)
                || job.company.toLowerCase().includes(searchText)
                || job.place.toLowerCase().includes(searchText)
            ){
                return true;
            }else{
                return false;
            }
        })
        return filteredJobs;
    }
    else{
        return jobs;
    }
}


function showJobs(jobs) {
    let jobsContainer = document.querySelector('.jobs-container');
    let jobsHTML = "";
    jobs.forEach(job => {
        jobsHTML += `
        <div class="job-tile">
            <div class="top">
                <h2>${job.post}</h2>
                <span class="dots"><i class="fas fa-ellipsis-h"></i></span>
            </div>
            <div class="role-name">
                <span>${job.company}</span>
            </div>
            <div class="description">
                <span>योग्यता : </span>
                <span>${job.eligibility}</span>
            </div>
            <div>
                <table>
                    <tr>
                        <td>स्थान : </td>
                        <td>${job.place}</td>
                    </tr>
                    <tr>
                        <td>रिक्त पद : </td>
                        <td>${job.openings}</td>
                    </tr>
                    <tr>    
                        <td>प्रकाशित तिथि :</td>
                        <td>${job.dateOfPublished}</td>
                    </tr>    
                    <tr>
                        <td>अंतिम तिथि :</td>
                        <td>${job.lastDateForApplication}</td>
                    </tr>
                </table>
            </div>

            <div class="buttons">
                <div class="button apply-now">
                    <a href="${job.link}" target="_blank">Apply Now</a>
                </div>
            </div>
        </div>
        `
    });
    jobsContainer.innerHTML = jobsHTML;
}


getJobs().then(data => {
    showJobs(data);
});