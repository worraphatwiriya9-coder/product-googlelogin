export type Member = {
  name: string
  role: string
  image: string
}

export type Band = {
  id: number
  name: string
  genre: string
  image: string
  info: string
  members: Member[]
}