function getFirstFiveRatings(ratings) {
  return ratings.length >= 5 ? ratings.slice(0, 5) : null
}

function sumFirstFiveRatings(ratings?: string[]) {
  const doesRatingsExist = Boolean(ratings)

  if (!doesRatingsExist) return { error: 'ratings is required' }

  const firstFiveRatings = getFirstFiveRatings(ratings)

  if (!firstFiveRatings) return { error: 'there must be at least 5 ratings' }

  let ratingsSum = 0

  for (const rating of firstFiveRatings) {
    ratingsSum += Number(rating)
  }

  return { ratingsSum, created_at: Number(new Date()) }
}

const appRatings = ['5', '3', '4', '4', '5', '1', '5', '4', '4', '3']
sumFirstFiveRatings(appRatings)
