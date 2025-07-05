window.onload = function() {
  fetch('projects.json')
    .then(text => text.json())
    .then(projects => {
      const listDiv = document.getElementById('project-list');

      projects.forEach((pr) => {
        const card = document.createElement('div');
        card.className = 'project-card';

        // Use thumbnail if available, else show placeholder
        let thumbnailHTML = '';
        if (pr.thumbnail) {
          thumbnailHTML = `<img src="${pr.thumbnail}" alt="${pr.repo} thumbnail" class="thumbnail">`;
        } else {
          thumbnailHTML = `<div class="thumbnail placeholder"></div>`;
        }
        card.innerHTML = `
          ${thumbnailHTML}
          <h3>${projects.repo}</h3>
          <p>Team: ${pr.team}</p>
          <button onclick="viewDetails('${pr.owner}', '${pr.repo}')">View Details</button>
        `;

        listDiv.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error loading projects.json:', error);
    });
}
function viewDetails(owner, repo) {
  window.location.href = `details.html?owner=${owner}&repo=${repo}`;
}