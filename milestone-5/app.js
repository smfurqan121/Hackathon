"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jspdf_1 = require("jspdf"); // Static import at the top of the file
require("es6-promise/auto"); // Polyfill for Promises
// Resume Builder Logic
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resume-form');
    var generatedResume = document.getElementById('generated-resume');
    var profilePicPreview = document.getElementById('profile-pic-preview');
    var editBtn = document.getElementById('edit-btn');
    var downloadBtn = document.getElementById('download-btn');
    // Elements for adding education, experience, and skills
    var addEducationBtn = document.getElementById('add-education');
    var addExperienceBtn = document.getElementById('add-experience');
    var addSkillBtn = document.getElementById('add-skill');
    var educationContainer = document.getElementById('education-container');
    var experienceContainer = document.getElementById('experience-container');
    var skillsContainer = document.getElementById('skills-container');
    // Event listeners for adding new education, experience, and skill entries
    addEducationBtn.addEventListener('click', function () {
        var _a;
        var educationDiv = document.createElement('div');
        educationDiv.innerHTML = "\n            <input type=\"text\" class=\"education-institution\" placeholder=\"Institution\" required>\n            <input type=\"text\" class=\"education-degree\" placeholder=\"Degree\" required>\n            <input type=\"text\" class=\"education-year\" placeholder=\"Year\" required>\n            <button type=\"button\" class=\"remove-education\">Remove</button>\n        ";
        educationContainer.appendChild(educationDiv);
        // Adding event listener to remove button
        (_a = educationDiv.querySelector('.remove-education')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
            educationDiv.remove();
        });
    });
    addExperienceBtn.addEventListener('click', function () {
        var _a;
        var experienceDiv = document.createElement('div');
        experienceDiv.innerHTML = "\n            <input type=\"text\" class=\"experience-company\" placeholder=\"Company\" required>\n            <input type=\"text\" class=\"experience-position\" placeholder=\"Position\" required>\n            <input type=\"text\" class=\"experience-year\" placeholder=\"Year\" required>\n            <button type=\"button\" class=\"remove-experience\">Remove</button>\n        ";
        experienceContainer.appendChild(experienceDiv);
        // Adding event listener to remove button
        (_a = experienceDiv.querySelector('.remove-experience')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
            experienceDiv.remove();
        });
    });
    addSkillBtn.addEventListener('click', function () {
        var _a;
        var skillDiv = document.createElement('div');
        skillDiv.innerHTML = "\n            <input type=\"text\" class=\"skill-name\" placeholder=\"Skill\" required>\n            <input type=\"number\" class=\"skill-level\" placeholder=\"Level (0-100)\" min=\"0\" max=\"100\" required>\n            <button type=\"button\" class=\"remove-skill\">Remove</button>\n        ";
        skillsContainer.appendChild(skillDiv);
        // Adding event listener to remove button
        (_a = skillDiv.querySelector('.remove-skill')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
            skillDiv.remove();
        });
    });
    // Handle form submission
    form.addEventListener('submit', function (e) {
        var _a;
        e.preventDefault();
        // Gather form data and update resume display
        var name = document.getElementById('name').value;
        var jobTitle = document.getElementById('job-title').value;
        var profilePic = (_a = document.getElementById('profile-pic-upload').files) === null || _a === void 0 ? void 0 : _a[0];
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var linkedin = document.getElementById('linkedin').value;
        var portfolio = document.getElementById('portfolio').value;
        var personalInfo = document.getElementById('personal-info').value;
        // Set profile picture preview
        if (profilePic) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                profilePicPreview.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            };
            reader.readAsDataURL(profilePic);
        }
        // Update resume display
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
        // Update skills list
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
        editBtn.style.display = 'inline-block';
    });
    // Edit button to toggle back to form
    editBtn.addEventListener('click', function () {
        form.style.display = 'block';
        generatedResume.style.display = 'none';
        editBtn.style.display = 'none';
    });
    // Download resume as PDF
    downloadBtn.addEventListener('click', function () {
        var resume = document.getElementById('generated-resume');
        var doc = new jspdf_1.default();
        doc.html(resume, {
            callback: function (doc) {
                doc.save('resume.pdf');
            },
            x: 10,
            y: 10,
        });
    });
});
