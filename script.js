window.onload = function() {
  fetch('https://script.google.com/macros/s/AKfycbzu_dVptpAw0kVXP-GHwH3tjjp04qmxkDSpkF9p6OkBTYh0cuWQDdgacQnhYyE0RfuW/exec') // live JSON from Google Sheet
    .then(res => res.json())
    .then(projects => {
      const listDiv = document.getElementById('project-list');

      projects.forEach((pr) => {
        const card = document.createElement('div');
        card.className = 'project-card';

        let thumbnailHTML = '';
        if (pr.thumbnail) {
          thumbnailHTML = `<img src="${pr.thumbnail}" alt="${pr.repo} thumbnail" class="thumbnail">`;
        } else {
          thumbnailHTML = `<div class="thumbnail placeholder"></div>`;
        }

        card.innerHTML = `
          ${thumbnailHTML}
          <h3>${pr.repo}</h3>
          <p>Team: ${pr.team}</p>
          <button onclick="viewDetails('${pr.owner}', '${pr.repo}')">View Details</button>
        `;

      listDiv.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error loading projects:', error);
    });
}

function viewDetails(owner, repo) {
  window.location.href = `details.html?owner=${owner}&repo=${repo}`;
}
