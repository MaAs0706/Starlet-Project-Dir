const params = new URLSearchParams(window.location.search);
const owner = params.get('owner');
const repo = params.get('repo');

// fetch readme

document.getElementById('project-title').textContent = repo;
fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
  headers: { Accept: 'application/vnd.github.v3.raw' }
})
.then(res => {
  if (!res.ok) throw new Error('README not found');
  return res.text();
})
.then(readmeText => {
    document.getElementById('readme').textContent = readmeText;
  })
  .catch(err => {
    document.getElementById('readme').textContent = 'No README available.';
    console.error(err);
  });

// Fetch commits

fetch(`https://api.github.com/repos/${owner}/${repo}/commits`)
.then(res => res.json())
.then(commits => {
    const commitsList = document.getElementById('commits');
    commits.forEach(commit => {
  const li = document.createElement('li');
  
  const message = commit.commit.message;
  const date = new Date(commit.commit.author.date).toLocaleString();

  li.innerHTML = `
    <div class="commit-item">
      <div class="commit-message">${message}</div>
      <div class="commit-date">${date}</div>
    </div>
  `;

  commitsList.appendChild(li);
});

})
  .catch(err => {
    document.getElementById('commits').textContent = 'Could not load commits.';
    console.error(err);
  });