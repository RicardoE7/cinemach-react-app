import { Client, Databases, Query, ID } from 'appwrite'

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT

let database = null

const getDatabase = () => {
  if (database) return database

  if (!ENDPOINT || !PROJECT_ID || !DATABASE_ID || !COLLECTION_ID) {
    console.warn('Appwrite env vars missing — search analytics disabled')
    return null
  }

  const client = new Client()
  client.setEndpoint(ENDPOINT).setProject(PROJECT_ID)
  database = new Databases(client)
  return database
}

export const updateSearchCount = async (searchTerm, movie) => {
  const db = getDatabase()
  if (!db) return

  try {
    const result = await db.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', searchTerm),
    ])

    if (result.documents.length > 0) {
      const doc = result.documents[0]

      await db.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      })
    } else {
      await db.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : '/no-movie.png',
      })
    }
  } catch (error) {
    console.error('Error updating search count:', error.message ?? error)
  }
}

export const getTrendingMovies = async () => {
  const db = getDatabase()
  if (!db) return []

  try {
    const result = await db.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc('count'),
      Query.limit(5),
    ])
    return result.documents
  } catch (error) {
    console.error('Error getting trending movies:', error.message ?? error)
    return []
  }
}
