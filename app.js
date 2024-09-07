var toggleButton = document.getElementById('toggle-skills');
var skillsSection = document.getElementById('skills');
toggleButton.addEventListener('click', function () {
    var skillsList = skillsSection.querySelector('ul');
    if (skillsList.style.display === 'none' || !skillsList.style.display) {
        skillsList.style.display = 'block';
        toggleButton.innerText = 'Hide Skills';
    }
    else {
        skillsList.style.display = 'none';
        toggleButton.innerText = 'Show Skills';
    }
});
