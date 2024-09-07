const toggleButton = document.getElementById('toggle-skills') as HTMLButtonElement;
const skillsSection = document.getElementById('skills') as HTMLElement;

toggleButton.addEventListener('click', () => {
  const skillsList = skillsSection.querySelector('ul') as HTMLUListElement;
  
  if (skillsList.style.display === 'none' || !skillsList.style.display) {
    skillsList.style.display = 'block';  
    toggleButton.innerText = 'Hide Skills'; 
  } else {
    skillsList.style.display = 'none';  
    toggleButton.innerText = 'Show Skills';  
  }
});
