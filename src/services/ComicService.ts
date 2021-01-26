import mongoose from 'mongoose'
import Comic, { Comic as IComic } from '../models/Comic'

type Query = {
  sort?: 'visited' | 'avgRating' | 'recommend' | 'searches' | 'releaseDate'
  order?: '-1' | '1'
  limit?: number
  offset?: number
}

async function createComic(comic: IComic) {
  try {
    const createdComic = new Comic(comic)
    await createdComic.save()
    return createdComic
  } catch (error) {
    throw new Error(`Cannot create comic: ${error}`)
  }
}

async function updateComic(nextComic: IComic, id: string) {
  try {
    const updatedComic = await Comic.findOneAndUpdate({ _id: id }, nextComic)

    return updatedComic
  } catch (error) {
    throw new Error(`Cannot update comic: ${error}`)
  }
}

async function deleteComic(id: string) {
  try {
    await Comic.deleteOne({ _id: id })

    return { message: 'Comic deleted successfully' }
  } catch (error) {
    throw new Error(`Cannot delete comic: ${error}`)
  }
}

async function getComic(id: string) {
  try {
    const aggregateQuery = [
      {
        $match: {
          _id: { $in: [mongoose.Types.ObjectId(id)] },
        },
      },
      {
        $lookup: {
          from: 'ratings',
          localField: 'ratings',
          foreignField: '_id',
          as: 'ratingList',
        },
      },
      {
        $addFields: {
          avgRating: { $avg: '$ratingList.value' },
        },
      },
    ]

    const result = await Comic.aggregate(aggregateQuery).exec()
    const foundComic = result[0]

    if (!foundComic) {
      throw new Error('Cannot find comic')
    }

    return foundComic
  } catch (error) {
    throw new Error(`Error on getting comic: ${error}`)
  }
}

async function getComics(query: Query) {
  try {
    const { sort, order } = query
    const offset = Number(query.offset)
    const limit = Number(query.limit)
    let aggregateSort: any[] = []
    let aggregatePagination: any[] = []

    if (sort && order) {
      let sortCriteria
      if (sort === 'visited' || sort === 'searches') {
        sortCriteria = `statistics.${sort}`
      } else {
        sortCriteria = sort
      }

      aggregateSort = [
        {
          $sort: {
            [sortCriteria]: Number(order),
          },
        },
        {
          $unwind: {
            path: `$${sortCriteria}`,
            preserveNullAndEmptyArrays: true,
          },
        },
      ]
    }

    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(offset) && !isNaN(limit)) {
      aggregatePagination = [
        {
          $skip: offset,
        },
        {
          $limit: limit,
        },
      ]
    }

    const aggregateQuery = [
      {
        $lookup: {
          from: 'ratings',
          localField: 'ratings',
          foreignField: '_id',
          as: 'ratingList',
        },
      },
      {
        $addFields: {
          avgRating: { $avg: '$ratingList.value' },
        },
      },
      {
        $lookup: {
          from: 'statistics',
          localField: '_id',
          foreignField: 'comic',
          as: 'statistics',
        },
      },
      ...aggregateSort,
      ...aggregatePagination,
    ]

    const comics = await Comic.aggregate(aggregateQuery).exec()
    const total = await Comic.count({})

    let count
    if (offset + limit > total) {
      count = total - offset
    } else {
      count = limit
    }

    return {
      comics,
      offset,
      limit,
      count,
      total,
    }
  } catch (error) {
    throw new Error(`Error on getting comics: ${error}`)
  }
}

export default { createComic, updateComic, deleteComic, getComic, getComics }
