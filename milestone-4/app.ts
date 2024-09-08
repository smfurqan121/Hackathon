document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form') as HTMLFormElement;
    const generatedResume = document.getElementById('generated-resume') as HTMLDivElement;
    const profilePicPreview = document.getElementById('profile-pic-preview') as HTMLImageElement;
    const educationContainer = document.getElementById('education-container') as HTMLDivElement;
    const experienceContainer = document.getElementById('experience-container') as HTMLDivElement;
    const skillsContainer = document.getElementById('skills-container') as HTMLDivElement;
    const editBtn = document.getElementById('edit-btn') as HTMLButtonElement;

    // Function to add a new education entry
    function addEducationEntry(): void {
        const educationDiv = document.createElement('div');
        educationDiv.innerHTML = `
            <input type="text" placeholder="Institution" class="education-institution">
            <input type="text" placeholder="Degree" class="education-degree">
            <input type="text" placeholder="Year" class="education-year">
            <button type="button" class="remove-btn">Remove</button>
        `;
        educationContainer.appendChild(educationDiv);
        educationDiv.querySelector('.remove-btn')?.addEventListener('click', () => {
            educationContainer.removeChild(educationDiv);
        });
    }

    // Function to add a new experience entry
    function addExperienceEntry(): void {
        const experienceDiv = document.createElement('div');
        experienceDiv.innerHTML = `
            <input type="text" placeholder="Company" class="experience-company">
            <input type="text" placeholder="Position" class="experience-position">
            <input type="text" placeholder="Year" class="experience-year">
            <button type="button" class="remove-btn">Remove</button>
        `;
        experienceContainer.appendChild(experienceDiv);
        experienceDiv.querySelector('.remove-btn')?.addEventListener('click', () => {
            experienceContainer.removeChild(experienceDiv);
        });
    }

    // Function to add a new skill entry
    function addSkillEntry(): void {
        const skillDiv = document.createElement('div');
        skillDiv.innerHTML = `
            <input type="text" placeholder="Skill" class="skill-name">
            <input type="text" placeholder="Level (1-100)" class="skill-level">
            <button type="button" class="remove-btn">Remove</button>
            <div class="skill-bar">
                <div class="skill-bar-inner"></div>
            </div>
        `;
        skillsContainer.appendChild(skillDiv);
        skillDiv.querySelector('.remove-btn')?.addEventListener('click', () => {
            skillsContainer.removeChild(skillDiv);
        });
    }

    document.getElementById('add-education')?.addEventListener('click', addEducationEntry);
    document.getElementById('add-experience')?.addEventListener('click', addExperienceEntry);
    document.getElementById('add-skill')?.addEventListener('click', addSkillEntry);

    form.addEventListener('submit', (e: Event) => {
        e.preventDefault();

        // Gather form data
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const jobTitle = (document.getElementById('job-title') as HTMLInputElement).value;
        const profilePic = (document.getElementById('profile-pic-upload') as HTMLInputElement).files?.[0];
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const linkedin = (document.getElementById('linkedin') as HTMLInputElement).value;
        const portfolio = (document.getElementById('portfolio') as HTMLInputElement).value;
        const personalInfo = (document.getElementById('personal-info') as HTMLTextAreaElement).value;
        const skillLevel = (document.getElementById('skill-level') as HTMLSelectElement).value;

        // Set profile picture
        if (profilePic) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePicPreview.src = e.target?.result as string;
            };
            reader.readAsDataURL(profilePic);
        }

        // Update generated resume with form data
        (document.getElementById('name-display') as HTMLHeadingElement).textContent = name;
        (document.getElementById('job-title-display') as HTMLParagraphElement).textContent = jobTitle;
        (document.getElementById('email-display') as HTMLParagraphElement).textContent = email;
        (document.getElementById('phone-display') as HTMLParagraphElement).textContent = phone;
        (document.getElementById('linkedin-display') as HTMLAnchorElement).href = linkedin;
        (document.getElementById('portfolio-display') as HTMLAnchorElement).href = portfolio;
        (document.getElementById('personal-info-display') as HTMLParagraphElement).textContent = personalInfo;

        // Update education list
        const educationList = document.getElementById('education-list') as HTMLUListElement;
        educationList.innerHTML = '';
        document.querySelectorAll('#education-container > div').forEach((eduDiv) => {
            const institution = (eduDiv.querySelector('.education-institution') as HTMLInputElement).value;
            const degree = (eduDiv.querySelector('.education-degree') as HTMLInputElement).value;
            const year = (eduDiv.querySelector('.education-year') as HTMLInputElement).value;
            const listItem = document.createElement('li');
            listItem.textContent = `${institution}, ${degree}, ${year}`;
            educationList.appendChild(listItem);
        });

        // Update experience list
        const experienceList = document.getElementById('experience-list') as HTMLUListElement;
        experienceList.innerHTML = '';
        document.querySelectorAll('#experience-container > div').forEach((expDiv) => {
            const company = (expDiv.querySelector('.experience-company') as HTMLInputElement).value;
            const position = (expDiv.querySelector('.experience-position') as HTMLInputElement).value;
            const year = (expDiv.querySelector('.experience-year') as HTMLInputElement).value;
            const listItem = document.createElement('li');
            listItem.textContent = `${company}, ${position}, ${year}`;
            experienceList.appendChild(listItem);
        });

        // Update skills list with skill level bars
        const skillsList = document.getElementById('skills-list') as HTMLUListElement;
        skillsList.innerHTML = '';
        document.querySelectorAll('#skills-container > div').forEach((skillDiv) => {
            const skill = (skillDiv.querySelector('.skill-name') as HTMLInputElement).value;
            const level = parseInt((skillDiv.querySelector('.skill-level') as HTMLInputElement).value, 10);
            const listItem = document.createElement('li');
            listItem.innerHTML = `${skill} <div class="skill-bar"><div class="skill-bar-inner" style="width: ${level}%;"></div></div>`;
            skillsList.appendChild(listItem);
        });

        // Hide form and show resume
        form.style.display = 'none';
        generatedResume.style.display = 'block';
        editBtn.style.display = 'inline-block'; 
    });

    // Add functionality to the Edit button
    editBtn.addEventListener('click', () => {
        form.style.display = 'block';
        generatedResume.style.display = 'none';
        editBtn.style.display = 'none'; 
    });
});
