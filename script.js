// Minimal JS: load projects and posts, simple nav toggle
document.addEventListener('DOMContentLoaded',()=>{
  const toggle=document.querySelector('.nav-toggle');
  if(toggle){toggle.addEventListener('click',()=>{
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    document.querySelector('.nav-links').classList.toggle('open');
  })}

  fetch('projects.json').then(r=>r.json()).then(renderProjects).catch(()=>{
    const el=document.getElementById('projects-grid');
    el.innerHTML='<div class="card">No projects found. Replace projects.json</div>';
  });

  fetch('posts/index.json').then(r=>r.json()).then(renderPosts).catch(()=>{
    const el=document.getElementById('posts-list');
    el.innerHTML='<li class="muted">No posts. Add markdown files in /posts</li>';
  });
});

function renderProjects(list){
  const grid=document.getElementById('projects-grid');
  grid.innerHTML='';
  list.forEach(p=>{
    const el=document.createElement('article');
    el.className='card';
    el.innerHTML=`<h3>${p.title}</h3>
      <p class="muted">${p.summary}</p>
      <p>${p.tech.map(t=>`<span class="tech">${t}</span>`).join(' ')}</p>
      <p><a href="${p.repo}" target="_blank">Repo</a>${p.demo?` • <a href="${p.demo}" target="_blank">Demo</a>`:''}</p>`;
    grid.appendChild(el);
  })
}

function renderPosts(list){
  const ul=document.getElementById('posts-list');
  ul.innerHTML='';
  list.forEach(p=>{
    const li=document.createElement('li');
    li.innerHTML=`<a href="posts/${p.file}">${p.title}</a> <span class="muted">— ${p.date}</span>`;
    ul.appendChild(li);
  })
}

function contactSubmit(e){
  e.preventDefault();
  const form=e.target;
  const email=form.email.value;
  const message=form.message.value;
  // default behaviour: open mail client
  window.location.href = `mailto:${email}?subject=Portfolio%20Contact&body=${encodeURIComponent(message)}`;
  return false;
}
