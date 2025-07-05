const params = new URLSearchParams(window.location.search);
const owner = params.get('owner');
const repo = params.get('repo');


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

  fetch(`https://api.github.com/repos/${owner}/${repo}/commits`)
  .then(res => res.json())
  .then(commits => {
    const commitsList = document.getElementById('commits');
    commits.forEach(commit => {
       const li = document.createElement('li');
       li.textContent = commit.commit.message;
       commitsList.appendChild(li);
    });
  })
  .catch(err => {
    document.getElementById('commits').textContent = 'Could not load commits.';
    console.error(err);
  });