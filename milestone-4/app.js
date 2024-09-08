document.addEventListener('DOMContentLoaded', function () {
    var _a, _b, _c;
    var form = document.getElementById('resume-form');
    var generatedResume = document.getElementById('generated-resume');
    var profilePicPreview = document.getElementById('profile-pic-preview');
    var educationContainer = document.getElementById('education-container');
    var experienceContainer = document.getElementById('experience-container');
    var skillsContainer = document.getElementById('skills-container');
    var editBtn = document.getElementById('edit-btn');
    // Function to add a new education entry
    function addEducationEntry() {
        var _a;
        var educationDiv = document.createElement('div');
        educationDiv.innerHTML = "\n            <input type=\"text\" placeholder=\"Institution\" class=\"education-institution\">\n            <input type=\"text\" placeholder=\"Degree\" class=\"education-degree\">\n            <input type=\"text\" placeholder=\"Year\" class=\"education-year\">\n            <button type=\"button\" class=\"remove-btn\">Remove</button>\n        ";
        educationContainer.appendChild(educationDiv);
        (_a = educationDiv.querySelector('.remove-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
            educationContainer.removeChild(educationDiv);
        });
    }
    // Function to add a new experience entry
    function addExperienceEntry() {
        var _a;
        var experienceDiv = document.createElement('div');
        experienceDiv.innerHTML = "\n            <input type=\"text\" placeholder=\"Company\" class=\"experience-company\">\n            <input type=\"text\" placeholder=\"Position\" class=\"experience-position\">\n            <input type=\"text\" placeholder=\"Year\" class=\"experience-year\">\n            <button type=\"button\" class=\"remove-btn\">Remove</button>\n        ";
        experienceContainer.appendChild(experienceDiv);
        (_a = experienceDiv.querySelector('.remove-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
            experienceContainer.removeChild(experienceDiv);
        });
    }
    // Function to add a new skill entry
    function addSkillEntry() {
        var _a;
        var skillDiv = document.createElement('div');
        skillDiv.innerHTML = "\n            <input type=\"text\" placeholder=\"Skill\" class=\"skill-name\">\n            <input type=\"text\" placeholder=\"Level (1-100)\" class=\"skill-level\">\n            <button type=\"button\" class=\"remove-btn\">Remove</button>\n            <div class=\"skill-bar\">\n                <div class=\"skill-bar-inner\"></div>\n            </div>\n        ";
        skillsContainer.appendChild(skillDiv);
        (_a = skillDiv.querySelector('.remove-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
            skillsContainer.removeChild(skillDiv);
        });
    }
    (_a = document.getElementById('add-education')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', addEducationEntry);
    (_b = document.getElementById('add-experience')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', addExperienceEntry);
    (_c = document.getElementById('add-skill')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', addSkillEntry);
    form.addEventListener('submit', function (e) {
        var _a;
        e.preventDefault();
        // Gather form data
        var name = document.getElementById('name').value;
        var jobTitle = document.getElementById('job-title').value;
        var profilePic = (_a = document.getElementById('profile-pic-upload').files) === null || _a === void 0 ? void 0 : _a[0];
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var linkedin = document.getElementById('linkedin').value;
        var portfolio = document.getElementById('portfolio').value;
        var personalInfo = document.getElementById('personal-info').value;
        var skillLevel = document.getElementById('skill-level').value;
        // Set profile picture
        if (profilePic) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                profilePicPreview.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            };
            reader.readAsDataURL(profilePic);
        }
        // Update generated resume with form data
        document.getElementById('name-display').textContent = name;
        document.getElementById('job-title-display').textContent = jobTitle;
        document.getElementById('email-display').textContent = email;
        document.getElementById('phone-display').textContent = phone;
        document.getElementById('linkedin-display').href = linkedin;
        document.getElementById('portfolio-display').href = portfolio;
        document.getElementById('personal-info-display').textContent = personalInfo;
        // Update education list
        var educationList = document.getElementById('education-list');
        educationList.innerHTML = '';
        document.querySelectorAll('#education-container > div').forEach(function (eduDiv) {
            var institution = eduDiv.querySelector('.education-institution').value;
            var degree = eduDiv.querySelector('.education-degree').value;
            var year = eduDiv.querySelector('.education-year').value;
            var listItem = document.createElement('li');
            listItem.textContent = "".concat(institution, ", ").concat(degree, ", ").concat(year);
            educationList.appendChild(listItem);
        });
        // Update experience list
        var experienceList = document.getElementById('experience-list');
        experienceList.innerHTML = '';
        document.querySelectorAll('#experience-container > div').forEach(function (expDiv) {
            var company = expDiv.querySelector('.experience-company').value;
            var position = expDiv.querySelector('.experience-position').value;
            var year = expDiv.querySelector('.experience-year').value;
            var listItem = document.createElement('li');
            listItem.textContent = "".concat(company, ", ").concat(position, ", ").concat(year);
            experienceList.appendChild(listItem);
        });
        // Update skills list with skill level bars
        var skillsList = document.getElementById('skills-list');
        skillsList.innerHTML = '';
        document.querySelectorAll('#skills-container > div').forEach(function (skillDiv) {
            var skill = skillDiv.querySelector('.skill-name').value;
            var level = parseInt(skillDiv.querySelector('.skill-level').value, 10);
            var listItem = document.createElement('li');
            listItem.innerHTML = "".concat(skill, " <div class=\"skill-bar\"><div class=\"skill-bar-inner\" style=\"width: ").concat(level, "%;\"></div></div>");
            skillsList.appendChild(listItem);
        });
        // Hide form and show resume
        form.style.display = 'none';
        generatedResume.style.display = 'block';
        editBtn.style.display = 'inline-block'; // Show the Edit button
    });
    // Add functionality to the Edit button
    editBtn.addEventListener('click', function () {
        form.style.display = 'block';
        generatedResume.style.display = 'none';
        editBtn.style.display = 'none'; // Hide the Edit button
    });
});
