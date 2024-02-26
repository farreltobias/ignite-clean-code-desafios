// Nomenclatura de variáveis

const titleCategories = [
  {
    title: 'User',
    followers: 5,
  },
  {
    title: 'Friendly',
    followers: 50,
  },
  {
    title: 'Famous',
    followers: 500,
  },
  {
    title: 'Super Star',
    followers: 1000,
  },
]

export default async function getData(request, response) {
  const githubUsername = String(request.query.username)

  if (!githubUsername) {
    return response.status(400).json({
      message: `Please provide an username to search on the github API`,
    })
  }

  const githubUserResponse = await fetch(
    `https://api.github.com/users/${githubUsername}`
  )

  if (githubUserResponse.status === 404) {
    return response.status(400).json({
      message: `User with username "${githubUsername}" not found`,
    })
  }

  const githubUser = await githubUserResponse.json()

  const categoriesSortedDesc = titleCategories.sort(
    (firstCategory, nextCategory) =>
      nextCategory.followers - firstCategory.followers
  )

  const userCategory = categoriesSortedDesc.find(
    (category) => githubUser.followers > category.followers
  )

  const result = {
    github: githubUsername,
    category: userCategory.title,
  }

  return result
}

getData(
  {
    query: {
      username: 'josepholiveira',
    },
  },
  {}
)
