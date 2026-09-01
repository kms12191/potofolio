export const projectFilters = ['전체', 'Web', 'Data', 'AI', 'Flask']

export function filterProjects(projects, activeFilter = '전체', query = '') {
  const normalizedQuery = query.trim().toLowerCase()

  return projects.filter((project) => {
    const matchesFilter = activeFilter === '전체' || project.filters.includes(activeFilter)
    const searchableText = [
      project.title,
      project.category,
      project.summary,
      project.description,
      ...project.tags,
      ...project.filters,
    ]
      .join(' ')
      .toLowerCase()
    const matchesQuery = normalizedQuery === '' || searchableText.includes(normalizedQuery)

    return matchesFilter && matchesQuery
  })
}
