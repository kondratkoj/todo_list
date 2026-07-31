export function saveProjects(projects) {
  localStorage.setItem(
    "projects",
    JSON.stringify(projects)
  )
}

export function loadProjects() {
  let loadedProjects =  JSON.parse(localStorage.getItem("projects"));
  
  if (!loadedProjects) {  //prevents error if there's nothing in localStorage yet
    return [];
  } else {
    return loadedProjects
  }
}