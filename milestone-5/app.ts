// Import jsPDF if using dynamic import
const { jsPDF } = window.jspdf;

document.addEventListener('DOMContentLoaded', () => {
    const addEducationBtn = document.getElementById('add-education') as HTMLButtonElement;
    const addExperienceBtn = document.getElementById('add-experience') as HTMLButtonElement;
    const addSkillBtn = document.getElementById('add-skill') as HTMLButtonElement;
    const resumeForm = document.getElementById('resume-form') as HTMLFormElement;
    const generatedResume = document.getElementById('generated-resume') as HTMLDivElement;
    const profilePicPreview = document.getElementById('profile-pic-preview') as HTMLImageElement;
    const editBtn = document.getElementById('edit-btn') as HTMLButtonElement;
    const downloadBtn = document.getElementById('download-btn') as HTMLButtonElement;

    const educationContainer = document.getElementById('education-container') as HTMLDivElement;
    const experienceContainer = document.getElementById('experience-container') as HTMLDivElement;
    const skillsContainer = document.getElementById('skills-container') as HTMLDivElement;

    function addButtonListener(button: HTMLButtonElement, container: HTMLDivElement, type: string, fields: string[]) {
        button.addEventListener('click', () => {
            const entryDiv = document.createElement('div');
            entryDiv.className = 'entry';
            entryDiv.innerHTML = fields.map(field => `
                <input type="text" class="${type}-${field}" placeholder="${field.charAt(0).toUpperCase() + field.slice(1)}" required>
            `).join('') + `
                <button type="button" class="remove-${type}">Remove</button>
            `;
            container.appendChild(entryDiv);

            // Remove entry listener
            entryDiv.querySelector(`.remove-${type}`)?.addEventListener('click', () => {
                entryDiv.remove();
            });
        });
    }

    addButtonListener(addEducationBtn, educationContainer, 'education', ['institution', 'degree', 'year']);
    addButtonListener(addExperienceBtn, experienceContainer, 'experience', ['company', 'position', 'year']);
    addButtonListener(addSkillBtn, skillsContainer, 'skill', ['name', 'level']);

    resumeForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Gather resume data
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const jobTitle = (document.getElementById('job-title') as HTMLInputElement).value;
        const profilePicUpload = document.getElementById('profile-pic-upload') as HTMLInputElement;
        const personalInfo = (document.getElementById('personal-info') as HTMLTextAreaElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const linkedin = (document.getElementById('linkedin') as HTMLInputElement).value;
        const portfolio = (document.getElementById('portfolio') as HTMLInputElement).value;

        // Set profile picture preview
        if (profilePicUpload.files && profilePicUpload.files[0]) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                profilePicPreview.src = e.target?.result as string;
            };
            reader.readAsDataURL(profilePicUpload.files[0]);
        }

        // Populate generated resume
        (document.getElementById('name-display') as HTMLHeadingElement).textContent = name;
        (document.getElementById('job-title-display') as HTMLParagraphElement).textContent = jobTitle;
        (document.getElementById('personal-info-display') as HTMLParagraphElement).textContent = personalInfo;
        (document.getElementById('email-display') as HTMLParagraphElement).textContent = email;
        (document.getElementById('phone-display') as HTMLParagraphElement).textContent = phone;

        // Cast to HTMLAnchorElement
        const linkedinDisplay = document.getElementById('linkedin-display') as HTMLAnchorElement;
        linkedinDisplay.href = linkedin;
        linkedinDisplay.textContent = linkedin;

        const portfolioDisplay = document.getElementById('portfolio-display') as HTMLAnchorElement;
        portfolioDisplay.href = portfolio;
        portfolioDisplay.textContent = portfolio;

        // Add education entries
        const educationList = document.getElementById('education-list') as HTMLUListElement;
        educationList.innerHTML = '';
        document.querySelectorAll('#education-container .entry').forEach((entry: HTMLElement) => {
            const institution = (entry.querySelector('.education-institution') as HTMLInputElement).value;
            const degree = (entry.querySelector('.education-degree') as HTMLInputElement).value;
            const year = (entry.querySelector('.education-year') as HTMLInputElement).value;
            educationList.innerHTML += `<li>${institution}, ${degree}, ${year}</li>`;
        });

        // Add experience entries
        const experienceList = document.getElementById('experience-list') as HTMLUListElement;
        experienceList.innerHTML = '';
        document.querySelectorAll('#experience-container .entry').forEach((entry: HTMLElement) => {
            const company = (entry.querySelector('.experience-company') as HTMLInputElement).value;
            const position = (entry.querySelector('.experience-position') as HTMLInputElement).value;
            const year = (entry.querySelector('.experience-year') as HTMLInputElement).value;
            experienceList.innerHTML += `<li>${company}, ${position}, ${year}</li>`;
        });

        // Add skills entries
        const skillsList = document.getElementById('skills-list') as HTMLUListElement;
        skillsList.innerHTML = '';
        document.querySelectorAll('#skills-container .entry').forEach((entry: HTMLElement) => {
            const skillName = (entry.querySelector('.skill-name') as HTMLInputElement).value;
            const skillLevel = (entry.querySelector('.skill-level') as HTMLInputElement).value;
            skillsList.innerHTML += `<li>${skillName}: ${skillLevel}</li>`;
        });

        // Hide form and show resume
        resumeForm.style.display = 'none';
        generatedResume.style.display = 'block';

        // Show edit and download buttons
        editBtn.style.display = 'inline-block';
        downloadBtn.style.display = 'inline-block';
    });

    editBtn.addEventListener('click', () => {
        // Show form and hide generated resume
        resumeForm.style.display = 'block';
        generatedResume.style.display = 'none';
    });

    downloadBtn.addEventListener('click', () => {
        if (!jsPDF) {
            alert('jsPDF library is not loaded.');
            return;
        }

        const pdf = new jsPDF();
        pdf.text((document.getElementById('name-display') as HTMLHeadingElement).textContent || '', 10, 10);
        pdf.text((document.getElementById('job-title-display') as HTMLParagraphElement).textContent || '', 10, 20);
        pdf.text((document.getElementById('personal-info-display') as HTMLParagraphElement).textContent || '', 10, 30);
        pdf.text((document.getElementById('email-display') as HTMLParagraphElement).textContent || '', 10, 40);
        pdf.text((document.getElementById('phone-display') as HTMLParagraphElement).textContent || '', 10, 50);
        pdf.text((document.getElementById('linkedin-display') as HTMLAnchorElement).href || '', 10, 60);
        pdf.text((document.getElementById('portfolio-display') as HTMLAnchorElement).href || '', 10, 70);

        pdf.save('resume.pdf');
    });
});
